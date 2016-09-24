using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace CoreAngular2WebpackHmrSass.Web.Api.Controllers
{
    [Route("api/[controller]")]
    public class AuthTestController : Controller
    {
        [HttpGet("ping")]
        //[Route("ping")]
        public string Ping()
        {
            var remoteIpAddress = Request.HttpContext.Connection.RemoteIpAddress;

            return "All good. You don't need to be authenticated to call this.";
            
        }

        [Authorize]
        [HttpGet("pingSecured")]
        public string PingSecured()
        {
            return "All good. You only get this message if you are authenticated.";
        }
        
    }
}
