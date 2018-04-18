using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using WebApi.DbContext;
using WebApi.Repository.Interface;

namespace WebApi.Repository
{
	/// <inheritdoc />
	public class UserRepository : IUserRepository, IDisposable
	{
		private readonly DbEntities _dbEntities = new DbEntities();

		/// <inheritdoc />
		public List<User> GetAll()
		{
			return _dbEntities.User.ToList();
		}

		/// <inheritdoc />
		public int Insert(User user)
		{
			if (user == null)
			{
				throw new ArgumentException("Не указан объект для сохранения.");
			}

			_dbEntities.User.Add(user);
			return _dbEntities.SaveChanges();
		}

		/// <inheritdoc />
		public int Update(User user)
		{
			if (user == null)
			{
				throw new ArgumentException("Не указан объект для сохранения.");
			}

			_dbEntities.Entry(user).State = EntityState.Modified;
			return _dbEntities.SaveChanges();
		}

		/// <inheritdoc />
		public int Delete(int id)
		{
			var user = _dbEntities.User.FirstOrDefault(x => x.Id == id);

			if (user != null)
			{
				_dbEntities.User.Remove(user);
			}
			else
			{
				throw new Exception("Не найден пользователь с данным идентификатором");
			}

			return _dbEntities.SaveChanges();
		}

		/// <inheritdoc />
		public void Dispose()
		{
			_dbEntities?.Dispose();
		}
	}
}