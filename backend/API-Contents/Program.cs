using API_Contents.Services;
using API_Contents.Helpers;
using API_Contents.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddScoped<Contexto>();
builder.Services.AddScoped<IContentsService, ContentService>();
builder.Services.AddScoped<IFirebaseService, FirebaseService>();
builder.Services.AddScoped<IContentsRepository, ContentsRepository>();
builder.Services.AddScoped<ITopicsService, TopicService>();
builder.Services.AddScoped<ITopicsRepository, TopicsRepository>();
builder.Services.AddScoped<IDisciplinesService, DisciplineService>();
builder.Services.AddScoped<IDisciplinesRepository, DisciplinesRepository>();


// Add controllers to the container.
builder.Services.AddControllers(options =>
{
    // Add HttpException handler
    options.Filters.Add<HttpResponseExceptionFilter>();
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// Enabling cors from any origin
string _policyName = "CorsPolicy";
builder.Services.AddCors(opt =>
{
    opt.AddPolicy(name: _policyName, builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

string jwtSecret = builder.Configuration["Jwt:Secret"];

// Adding Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
                // Adding Jwt Bearer
                .AddJwtBearer(options =>
                {
                    options.SaveToken = true;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret))
                    };
                });

builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Insira o token JWT desta maneira: Bearer {seu token}",
        Name = "Authorization",
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
            });
});

var app = builder.Build();

app.UseCors(_policyName);



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsStaging() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}


app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();
