using System.Threading.Tasks;

namespace AppName.Web.Services
{
    public interface ISmsSender {
        Task SendSmsAsync(string number, string message);
    }
}
