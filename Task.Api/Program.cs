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
using Microsoft.AspNetCore.Identity;
using Task.Infrastructure;
using Task.Domain.Entities;
using Task.Infrastructure.Entities;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;


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




// Add Identity services
builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddEntityFrameworkStores<TaskDbContext>()
    .AddDefaultTokenProviders();

// Add JWT authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"]))
    };
});

builder.Services.AddAuthorization();







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
// Configure Swagger/OpenAPI to include JWT authentication
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    // Enable Swagger to recognize the Bearer token
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter your Bearer token"
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
            new string[] { }
        }
    });
});


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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
