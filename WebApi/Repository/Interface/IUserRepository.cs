using System.Collections.Generic;
using WebApi.DbContext;

namespace WebApi.Repository.Interface
{
	/// <summary>
	/// Сервис для пользователей
	/// </summary>
	public interface IUserRepository
	{
		/// <summary>
		/// Получить ысех пользователей
		/// </summary>
		/// <returns>Пользователи</returns>
		List<User> GetAll();

		/// <summary>
		/// Добавить запись
		/// </summary>
		/// <param name="user">Пользователь</param>
		int Insert(User user);

		/// <summary>
		/// Обновить запись
		/// </summary>
		/// <param name="user">Пользователь</param>
		int Update(User user);

		/// <summary>
		/// Удалить запись
		/// </summary>
		/// <param name="id">Идентификатор пользователя</param>
		int Delete(int id);
	}
}
