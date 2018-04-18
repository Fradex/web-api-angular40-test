using System.Collections.Generic;
using WebApi.DbContext;

namespace WebApi.Repository.Interface
{
	/// <summary>
	/// Репозитория для товаров
	/// </summary>
	public interface IGoodsRepository
	{
		/// <summary>
		/// Получить ысе товары
		/// </summary>
		/// <returns>товары</returns>
		List<Goods> GetAll();

		/// <summary>
		/// Добавить запись
		/// </summary>
		/// <param name="goods">товар</param>
		int Insert(Goods goods);

		/// <summary>
		/// Обновить запись
		/// </summary>
		/// <param name="goods">товар</param>
		int Update(Goods goods);

		/// <summary>
		/// Удалить запись
		/// </summary>
		/// <param name="id">Идентификатор товара</param>
		int Delete(int id);
	}
}
