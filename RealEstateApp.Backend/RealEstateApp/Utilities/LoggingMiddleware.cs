using Serilog;
using System.Diagnostics;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace RealEstateApp.Utilities
{
    public class LoggingMiddleware
    {
        // Bir sonraki middleware'i temsil eder
        private readonly RequestDelegate _next;

        // Middleware oluşturulurken bir RequestDelegate alır
        public LoggingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        // Asenkron olarak HTTP isteğini işler ve yanıtı loglar
        public async Task InvokeAsync(HttpContext context)
        {
            // Zaman ölçümüne başla
            var stopwatch = Stopwatch.StartNew();

            // İsteği logla: HTTP metodu ve URL
            Log.Information("Handling request: {Method} {Url}", context.Request.Method, context.Request.Path);

            // İsteğin işlenmesine devam et
            await _next(context);

            // Zaman ölçümünü durdur
            stopwatch.Stop();

            // Yanıtı logla: Yanıt durumu kodu ve geçen süre
            Log.Information("Finished handling request. Response status code: {StatusCode}. Elapsed time: {ElapsedMilliseconds}ms",
                context.Response.StatusCode,
                stopwatch.ElapsedMilliseconds);
        }
    }
}
