using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthApi.Data.Tables
{
    public class RefreshTokenEntity
    {
        public string Id { get; set; }
        public UserEntity User { get; set; }
        public ApiClientEntity ApiClient { get; set; }
        public DateTimeOffset Issued { get; set; }
        public DateTimeOffset Expires { get; set; }
        public string ProtectedTicket { get; set; }
    }
}
