using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Newtonsoft.Json;

namespace WebApi.Controllers
{
	/// <summary>
	/// Базовый контроллер для ApiController-ов
	/// </summary>
    public class BaseApiController : ApiController
    {
		/// <summary>
		/// Создать ответ в формате JSON
		/// </summary>
	    protected HttpResponseMessage ToJsonResult(dynamic obj)
	    {
		    var response = Request.CreateResponse(HttpStatusCode.OK);
		    response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
		    return response;
	    }
	}
}
