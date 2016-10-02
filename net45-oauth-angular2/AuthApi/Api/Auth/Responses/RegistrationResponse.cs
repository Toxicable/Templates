using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AuthApi.Api.Auth.Controllers
{
    public class RegistrationResponse //: //Response
    {
        public RegistrationResponse(bool isSuccess, string userName) //: base(isSuccess)
        {
            UserName = userName;
        }
        public string UserName { get; set; }
    }
}