using AspNetIdentity.Data;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AspNetIdentity.WebApi.Api
{
    public class BaseManager : IDisposable
    {
        public ApplicationDbContext Context { get; set; }

        public BaseManager()
        {
            Context = HttpContext.Current.GetOwinContext().Get<ApplicationDbContext>();
        }


        public void Dispose()
        {
            Context.Dispose();
        }
    }
}