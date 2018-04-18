using System.Collections.Generic;
using WebApi.DbContext;

namespace WebApi.Repository.Interface
{
	/// <summary>
	/// Репозиторий пользовательских товаров
	/// </summary>
	public interface IUserProductRepository
	{

		/// <summary>
		/// Получить ысе товары пользователей
		/// </summary>
		/// <returns>товары</returns>
		List<UserGoods> GetAll();

		/// <summary>
		/// Добавить запись
		/// </summary>
		/// <param name="userGoods">пользовательский товар</param>
		int Insert(UserGoods userGoods);

		/// <summary>
		/// Обновить запись
		/// </summary>
		/// <param name="userGoods">пользовательский товар</param>
		int Update(UserGoods userGoods);

		/// <summary>
		/// Удалить запись
		/// </summary>
		/// <param name="id">Идентификатор</param>
		int Delete(int id);
	}
}