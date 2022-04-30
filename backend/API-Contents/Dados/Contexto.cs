using API_Contents.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace API_Contents.Dados
{
    public partial class Contexto : DbContext
    {
        public IConfiguration Configuration;
        public Contexto()
        {

        }

        public Contexto(DbContextOptions<Contexto> options) : base(options)
        {

        }

        public virtual DbSet<Content> Contents { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            try
            {
                if (!optionsBuilder.IsConfigured)
                {
                    var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                    var builder = new ConfigurationBuilder()
                            .AddJsonFile($"appsettings.json", true, true)
                            .AddJsonFile($"appsettings.{env}.json", true, true)
                            .AddEnvironmentVariables();

                    Configuration = builder.Build();
                    var stringConexao = Configuration.GetConnectionString("DefaultConnection");
                    optionsBuilder.UseSqlServer(stringConexao, opt =>
                    {
                        opt.CommandTimeout(360);
                    });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Content>(entity =>
            {
                entity.ToTable("Content");

                entity.Property(e => e.Id).HasColumnName("Id");

                entity.Property(e => e.Title).HasColumnName("Title");

                entity.Property(e => e.Description).HasColumnName("Description");

                entity.Property(e => e.Url).HasColumnName("Url");

                entity.Property(e => e.DisciplineId).HasColumnName("DisciplineId");

                entity.Property(e => e.TopicId).HasColumnName("TopicId");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
