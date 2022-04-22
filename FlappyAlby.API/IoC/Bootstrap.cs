namespace FlappyAlby.API.IoC;

using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Prometheus;

public static class Bootstrap
{
    public static void AddServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddCors();

        builder.Services.AddDbContext<FlappyAlbyContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultDatabase") ?? throw new NullReferenceException("Cannot retrieve connection string")));
    }

    public static void UsePipeline(this WebApplication app)
    {
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseDefaultFiles();
        app.UseStaticFiles();

        app.UseRouting();
        app.UseAuthorization();

        // app.UseHttpMetrics();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapMetrics();
            endpoints.MapControllers();
        });
    }
}