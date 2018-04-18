using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using WebApi.DbContext;
using WebApi.Repository.Interface;

namespace WebApi.Controllers
{
	/// <summary>
	/// Контроллер для пользователей
	/// </summary>
	public class UserController : ApiController
	{
		public IUserRepository UserRepository { get; set; }

		/// <summary>
		/// Получить записи пользователей
		/// </summary>
		public IEnumerable<object> Get()
		{
			return UserRepository.GetAll().Select(x => new { x.Id, x.Age, x.City, x.Name, x.Email });
		}

		/// <summary>
		/// Добавить запись 
		/// </summary>
		/// <param name="user">Запись пользователя</param>
		public int Post([FromBody] User user)
		{
			if (user == null)
			{
				throw new ArgumentException("Не передан объект для сохранения.");
			}
			return UserRepository.Insert(user);
		}

		/// <summary>
		/// Обновить запись 
		/// </summary>
		/// <param name="user">Запись пользователя</param>
		public int Put([FromBody] User user)
		{
			if (user == null)
			{
				throw new ArgumentException("Не передан объект для сохранения.");
			}
			return UserRepository.Update(user);
		}

		/// <summary>
		/// Удлаить запись
		/// </summary>
		/// <param name="id">Идентификатор записи.</param>
		public int Delete(int? id)
		{
			if (id == null)
			{
				throw new ArgumentException("Не передан идентификатор для удаления.");
			}
			return UserRepository.Delete(id.Value);
		}
	}
}
