using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Http;
using System.Web.Optimization;
using LightInject;

namespace WebApi
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
            AreaRegistration.RegisterAllAreas();
	        BundleConfig.RegisterBundles(BundleTable.Bundles);
			GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

	        var container = Container.GetContainer();

			container.RegisterApiControllers();
	        container.RegisterControllers();
	        //register other services
	        container.ScopeManagerProvider = new PerLogicalCallContextScopeManagerProvider();
	        container.EnableWebApi(GlobalConfiguration.Configuration);
	        container.EnableMvc();
	        //container.RegisterInstance(container);
		}
    }
}