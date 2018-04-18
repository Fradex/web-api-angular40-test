using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebApi.DbContext;
using WebApi.Repository.Interface;

namespace WebApi.Controllers
{
	/// <summary>
	/// Контроллер для пользовательских товаров
	/// </summary>
	public class UserProductsController : ApiController
	{
		public IUserProductRepository UserProductRepository { get; set; }

		/// <summary>
		/// Получить записи
		/// </summary>
		public IEnumerable<object> Get()
		{
			return UserProductRepository.GetAll().Select(x => new { x.Id, x.UserId, x.GoodId, UserName = x.User.Name, ProductName = x.Goods.Name });
		}

		/// <summary>
		/// Добавить запись 
		/// </summary>
		/// <param name="userGoods">Запись</param>
		public int Post([FromBody] UserGoods userGoods)
		{
			if (userGoods == null)
			{
				throw new ArgumentException("Не передан объект для сохранения.");
			}
			return UserProductRepository.Insert(userGoods);
		}

		/// <summary>
		/// Обновить запись 
		/// </summary>
		/// <param name="userGoods">Запись</param>
		public int Put([FromBody] UserGoods userGoods)
		{
			if (userGoods == null)
			{
				throw new ArgumentException("Не передан объект для сохранения.");
			}
			return UserProductRepository.Update(userGoods);
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
			return UserProductRepository.Delete(id.Value);
		}
	}
}
