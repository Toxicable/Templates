using System;
using System.Configuration;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace AspNetIdentity.WebApi.Api.Services
{
    public class EmailService : IIdentityMessageService
    {
        public async Task SendAsync(IdentityMessage message)
        {
            await configSendGridasync(message);
        }

        // Use NuGet to install SendGrid (Basic C# client lib) 
        private async Task configSendGridasync(IdentityMessage message)
        {
            //string apiKey = Environment.GetEnvironmentVariable("NAME_OF_THE_ENVIRONMENT_VARIABLE_FOR_YOUR_SENDGRID_KEY", EnvironmentVariableTarget.User);
            //dynamic sg = new SendGridAPIClient(apiKey);

            //Email from = new Email("test@example.com");
            //string subject = "Hello World from the SendGrid CSharp Library!";
            //Email to = new Email("test@example.com");
            //Content content = new Content("text/plain", "Hello, Email!");
            //Mail mail = new Mail(from, subject, to, content);

            //dynamic response = await sg.client.mail.send.post(requestBody: mail.Get());

            //await Task.FromResult(0);

            //var myMessage = new SendGridMessage();
            //client.

            //myMessage.AddTo(message.Destination);
            //myMessage.From = new System.Net.Mail.MailAddress(ConfigurationManager.AppSettings["emailService:Account"],
            //                                                ConfigurationManager.AppSettings["emailService:Password"]);
            //myMessage.Subject = message.Subject;
            //myMessage.Text = message.Body;
            //myMessage.Html = message.Body;

            //var credentials = new NetworkCredential(ConfigurationManager.AppSettings["emailService:Account"],
            //                                        ConfigurationManager.AppSettings["emailService:Password"]);

            //// Create a Web transport for sending email.
            //var transportWeb = new Web(credentials);

            //// Send the email.
            //if (transportWeb != null)
            //{
            //    await transportWeb.DeliverAsync(myMessage);
            //}
            //else
            //{
            //    //Trace.TraceError("Failed to create Web transport.");
            //    await Task.FromResult(0);
            //}
        }
    }
}