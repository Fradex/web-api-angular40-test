using LightInject;

namespace WebApi
{
	/// <summary>
	/// DI Контейнер 
	/// </summary>
	public class Container
	{
		/// <summary>
		/// Синглтон контейнера.
		/// </summary>
		private static ServiceContainer _instance;

		public static ServiceContainer GetContainer()
		{
			if (_instance == null)
			{
				lock (typeof(Container))
				{
					if (_instance == null)
					{
						_instance = new ServiceContainer();

						_instance.RegisterAssembly(typeof(Container).Assembly, () => new PerRequestLifeTime());
					}
				}
			}

			return _instance;
		}
	}
}