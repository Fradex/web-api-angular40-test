using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using WebApi.DbContext;
using WebApi.Repository.Interface;

namespace WebApi.Controllers
{
	public class GoodsController : ApiController //: BaseApiController
	{
		public IGoodsRepository GoodRepository { get; set; }

		/// <summary>
		/// Получить записи пользователей
		/// </summary>
		public IEnumerable<object> Get()
		{
			return GoodRepository.GetAll().Select(x => new { x.Id, x.Description, x.Name, x.Price });
		}

		/// <summary>
		/// Добавить запись 
		/// </summary>
		/// <param name="goods">Запись</param>
		public int Post([FromBody] Goods goods)
		{
			if (goods == null)
			{
				throw new ArgumentException("Не передан объект для сохранения.");
			}
			return GoodRepository.Insert(goods);
		}

		/// <summary>
		/// Обновить запись 
		/// </summary>
		/// <param name="goods">Запись</param>
		public int Put([FromBody] Goods goods)
		{
			if (goods == null)
			{
				throw new ArgumentException("Не передан объект для сохранения.");
			}
			return GoodRepository.Update(goods);
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
			return GoodRepository.Delete(id.Value);
		}
	}
}
