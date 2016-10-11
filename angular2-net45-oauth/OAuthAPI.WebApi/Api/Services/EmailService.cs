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