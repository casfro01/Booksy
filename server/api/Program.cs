using System.Text.Json.Serialization;
using api.Controllers;
using dataaccess;
using DefaultNamespace;
using Microsoft.EntityFrameworkCore;
using services;
using services.Abstractions;
using services.DTOs.Request;
using services.DTOs.Response;

namespace api;
public class Program
{
    public static void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<AppOptions>(provider =>
        {
            var configuration = provider.GetRequiredService<IConfiguration>();
            var appOptions = new AppOptions();
            configuration.GetSection(nameof(AppOptions)).Bind(appOptions);
            return appOptions;
        });
        services.AddOpenApiDocument();

        services.AddScoped<IService<BaseBookResponse, CreateBookDto, UpdateBookDto>, BookService>();
        
        services.AddProblemDetails();
        
        services.AddDbContext<MyDbContext>((services, options) =>
        {
            options.UseNpgsql(services.GetRequiredService<AppOptions>().DbConnectionString);
        });

        services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });

        services.AddCors();
    }
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        ConfigureServices(builder.Services);
        
        var app = builder.Build();
        app.MapControllers();
        app.UseOpenApi();
        app.UseSwaggerUi();
        
        app.UseCors(config => config.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().SetIsOriginAllowed(x => true));

        // config færdig her
        app.GenerateApiClientsFromOpenApi("/../client/src/LibAPI.ts").GetAwaiter().GetResult();
        
        app.Run();
        
    }
}