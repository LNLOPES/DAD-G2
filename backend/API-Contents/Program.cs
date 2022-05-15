using API_Contents.Services;
using API_Contents.Helpers;
using API_Contents.Repository;

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
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
