using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using SendGrid;

namespace OAuthAPI.WebApi.Api.Services
{
    public class EmailService : IIdentityMessageService
    {
        public async Task SendAsync(IdentityMessage message)
        {
            await SendViaSmtp(message);
        }

        public async Task SendViaSendGrid(IdentityMessage message)
        {
            // Create the email object first, then add the properties.
            SendGridMessage myMessage = new SendGridMessage();
            myMessage.AddTo(message.Destination);
            myMessage.From = new MailAddress("fabianwiles@live.com", "OAuthAPi Mailer");
            myMessage.Subject = message.Subject;
            myMessage.Html = message.Body;

            // true indicates that links in plain text portions of the email 
            // should also be overwritten for link tracking purposes. 
            //myMessage.EnableClickTracking(true);
            // Create an Web transport for sending email.

            //TODO: don't put cred here pls
            var reds = new NetworkCredential("azure_e606206f27b64b694a04c18325ba7928@azure.com", "luv86tox8");
            var transportWeb = new Web(reds);

            // Send the email, which returns an awaitable task.
            await transportWeb.DeliverAsync(myMessage);
        }

        public async Task SendViaSmtp(IdentityMessage message)
        {
            MailMessage mailMsg = new MailMessage();
            mailMsg.To.Add(new MailAddress(message.Destination));
            // From
            MailAddress mailAddress = new MailAddress("fabianwiles@live.com", "OAuth Api mailer");
            mailMsg.From = mailAddress;

            //Content
            mailMsg.Subject = message.Subject;
            mailMsg.Body = message.Body;
            mailMsg.IsBodyHtml = true;

            //SmtpClient
            SmtpClient smtpConnection = new SmtpClient("smtp-mail.outlook.com", 587);
            smtpConnection.Credentials = new System.Net.NetworkCredential("fabianwiles@live.com", "luv86tox7");

            smtpConnection.EnableSsl = true;
            await smtpConnection.SendMailAsync(mailMsg);
        }
    }
}