using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Owin.Security.Cookies;

namespace AuthApi.Api
{
    public class Response
    {
        public Response(bool isSuccess)
        {
            IsSuccess = isSuccess;
        }
        public bool IsSuccess { get; set; }

        public ICollection<string> Errors { get; set; }
    }
}