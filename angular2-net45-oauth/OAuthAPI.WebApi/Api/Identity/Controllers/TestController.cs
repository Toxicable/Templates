using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Tracing;
using System.Web.UI.WebControls;

namespace OAuthAPI.WebApi.Api.Identity.Controllers
{
	public class TestController : BaseApiController
	{
        [HttpPost]
        public async Task<HttpResponseMessage> FileUpload()
        {
            Configuration.Services.GetTraceWriter().Info(Request, "", "");

            var httpRequest = HttpContext.Current.Request;

            var imageStream = await Request.Content.ReadAsStreamAsync();
            //File.WriteAllBytes(@"C:\Users\Fabian\Pictures\imageuploadtest.jpeg", image);
                return Request.CreateResponse(HttpStatusCode.OK);
            // Check if the request contains multipart/form-data.

            //string root = HttpContext.Current.Server.MapPath("~/App_Data");
            //var provider = new MultipartFormDataStreamProvider(root);

            //try
            //{
            //    // Read the form data.
            //    await Request.Content.ReadAsMultipartAsync(provider);

            //    // This illustrates how to get the file names.
            //    foreach (MultipartFileData file in provider.FileData)
            //    {
            //        Trace.WriteLine(file.Headers.ContentDisposition.FileName);
            //        Trace.WriteLine("Server file path: " + file.LocalFileName);
            //    }
            //    return Request.CreateResponse(HttpStatusCode.OK);
            //}
            //catch (System.Exception e)
            //{
            //    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            //}
        }

    }
}