using System.Text.Json.Serialization;
using DefaultNamespace;
using Microsoft.EntityFrameworkCore;

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
        // add scoped services
        services.AddProblemDetails();

        /* dbContext
        services.AddDbContext<DbContext>((services, options) =>
        {
            options.UseNpgsql(services.GetService<AppOptions>().DbConnectionString);
        });
        */

        services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });
    }
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        ConfigureServices(builder.Services);
        
        var app = builder.Build();
        app.MapControllers();
        app.UseOpenApi();
        app.UseSwaggerUi();

        // config færdig her
        app.GenerateApiClientsFromOpenApi("/../client/src/LibAPI.ts").GetAwaiter().GetResult();
        
        app.Run();
        
    }
}