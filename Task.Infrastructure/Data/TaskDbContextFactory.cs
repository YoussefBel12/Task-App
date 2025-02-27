using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Task.Infrastructure.Data;


namespace Task.Infrastructure.Factories
{
    public class TaskDbContextFactory : IDesignTimeDbContextFactory<TaskDbContext>
    {
        public TaskDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TaskDbContext>();

            // Hardcoding the connection string
            optionsBuilder.UseSqlServer("Server=TOMMY\\SQLEXPRESS;Database=TaskDb;Trusted_Connection=True;TrustServerCertificate=True;");

            return new TaskDbContext(optionsBuilder.Options);
        }
    }
}
