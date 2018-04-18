using System.Web.Optimization;

namespace WebApi
{
	public class BundleConfig
	{
		// For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/early_scripts").Include(
				"~/node_modules/core-js/client/shim.min.js",
				"~/node_modules/zone.js/dist/zone.js",
				"~/node_modules/systemjs/dist/system.src.js",
				"~/Scripts/modernizr-2.6.2.js",
				"~/systemjs.config.js"));

			bundles.Add(new StyleBundle("~/Content/css").Include(
				"~/Content/Site.css",
				"~/Content/bootstrap.min.css"));
		}
	}
}
