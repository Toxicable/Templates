using AspNetIdentity.Data;
using AspNetIdentity.Data.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace AspNetIdentity.WebApi.Api.Identity.Managers
{
    public class ClientManager : BaseManager
    {
        public Client FindClient(string id)
        {
            return Context.Clients.SingleOrDefault(x => x.Id == id);
        }
    }

    public class ManagerResult
    {
        public bool Success { get; set; }
    }
}