using FlappyAlby.API.Extensions;
using FlappyAlby.API.Infrastructure;
using FlappyAlby.API.IoC;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .CreateLogger();

builder.Services.AddLogging(b => b.AddSerilog(Log.Logger, true));

Log.Information("Bootstrapping ...");

builder.ConfigureServices();

Log.Information("Building ...");

var app = builder.Build();

await app.MigrateContextAsync<FlappyAlbyContext>();
app.Configure();

Log.Information("Starting ...");

await app.RunAsync();

Log.Information("Stopping ...");
