using AspNetIdentity.Data.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetIdentity.Data
{
    public class RefreshToken
    {
        public string Id { get; set; }
        public ApplicationUser User { get; set; }
        public Client Client { get; set; }
        public DateTimeOffset Issued { get; set; }
        public DateTimeOffset Expires { get; set; }
        public string ProtectedTicket { get; set; }
    }
}
