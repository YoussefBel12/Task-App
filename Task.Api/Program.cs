using FluentValidation;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Task.Application.Interfaces;
using Task.Application.Mappings;
using Task.Application.Validators;
using Task.Infrastructure.Data;
using Task.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Task.Application.Commands;
using Task.Application.Queries;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Add CORS services to the container
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:51479") // Frontend URL (Vite dev server URL)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Important to allow cookies/credentials
    });
});




// Add DbContext
builder.Services.AddDbContext<TaskDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Repositories
builder.Services.AddScoped<IAppTaskRepository, AppTaskRepository>();

// Add AutoMapper
builder.Services.AddAutoMapper(typeof(AppTaskProfile));

// Add Fluent Validation
builder.Services.AddValidatorsFromAssemblyContaining<AppTaskValidator>();


// Add MediatR
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));


// Register MediatR handlers

builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(typeof(GetAllAppTasksQueryHandler).Assembly);
    cfg.RegisterServicesFromAssembly(typeof(DeleteAppTaskCommandHandler).Assembly);
    cfg.RegisterServicesFromAssembly(typeof(CreateAppTaskCommandHandler).Assembly);
    cfg.RegisterServicesFromAssembly(typeof(UpdateAppTaskCommandHandler).Assembly);
    cfg.RegisterServicesFromAssembly(typeof(GetAppTaskByIdQueryHandler).Assembly);
    // Add other assemblies if needed
});





builder.Services.AddControllers();
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

// Apply CORS policy globally
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
