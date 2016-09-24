using System.Threading.Tasks;

namespace AppName.Web.Services {
    public interface IEmailSender {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
