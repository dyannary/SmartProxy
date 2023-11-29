using ELearning.Domain.Entities;
using ELearning.Infrastructure.Repositories;
using ELearning.Infrastructure.Settings;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("SourceDbSettings"));

builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("DestinationDbSettings"));

builder.Services.AddSingleton<IMongoDbSettings>(provider =>
    provider.GetRequiredService<IOptions<MongoDbSettings>>().Value);

builder.Services.AddScoped<ISourceRepository<Course>, SourceRepository<Course>>();

builder.Services.AddScoped<IDestinationRepository<Course>, DestinationRepository<Course>>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseRouting();

app.MapControllers();

app.Run();
