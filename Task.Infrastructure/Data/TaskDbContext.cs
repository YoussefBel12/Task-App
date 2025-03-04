using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Task.Domain.Entities;
using Task.Infrastructure.Entities;

namespace Task.Infrastructure.Data
{
    public class TaskDbContext : IdentityDbContext<ApplicationUser , ApplicationRole , string >
    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options) { }

        public DbSet<AppTask> AppTasks { get; set; }

       
    }



}

