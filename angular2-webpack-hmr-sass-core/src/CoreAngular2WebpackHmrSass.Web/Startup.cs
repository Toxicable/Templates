using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore.Infrastructure;
using AppName.Web.Services;
using AppName.Data.Models;
using Microsoft.EntityFrameworkCore;
using CoreAngular2WebpackHmrSass.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Threading.Tasks;
using System.Security.Claims;

namespace CoreAngular2WebpackHmrSass
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddEntityFramework()
                .AddEntityFrameworkSqlServer()
                .AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(Configuration["ConnectionStrings:DefaultConnection"], builder => builder.MigrationsAssembly("AppName.Web")));

           

            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory, IHostingEnvironment env)
        {

            //loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            //loggerFactory.AddDebug();

            //var jwtOptions = new JwtBearerOptions
            //{
            //    Audience = "9RxODGmiDqzOFICzgWKmekLUMQSI1dSq",//Configuration["auth0:clientId"],
            //    Authority = "https://fabianwiles.au.auth0.com",//$"https://{Configuration["auth0:domain"]}/"
            //    RequireHttpsMetadata = false
            //};
            //app.UseJwtBearerAuthentication(jwtOptions);

            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                Audience = "JEXaDhlGnxvpvOOjdNTEHvspfK0RHj4u",
                Authority = "https://fabianwiles.au.auth0.com",
                Events = new JwtBearerEvents
                {                                       
                    OnTokenValidated = context =>
                    {
                        //var claimsIdentity = context.user as ClaimsIdentity;
                        //var claimsIdentity = context.HttpContext.User.Identity;

                        //claimsIdentity.
                        //claimsIdentity.AddClaim(new Claim("id_token",
                        //    context.Request.Headers["Authorization"][0].Substring(context.AuthenticationTicket.AuthenticationScheme.Length + 1)));

                        ////OPTIONAL: you can read / modify the claims that are populated based on the JWT
                        // claimsIdentity.AddClaim(new Claim(ClaimTypes.Name, claimsIdentity.FindFirst("name").Value));
                        return Task.FromResult(0);
                    }
                }
            });



            app.UseStaticFiles();

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {

                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }else
            {

                app.UseExceptionHandler("/Error");
                app.UseStatusCodePagesWithRedirects("~/errors/{0}");
            }

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }

        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseKestrel()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
