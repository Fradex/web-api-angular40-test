using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using WebApi.DbContext;
using WebApi.Repository.Interface;

namespace WebApi.Repository
{
	/// <inheritdoc />
	public class UserProductRepository : IUserProductRepository, IDisposable
	{
		private readonly DbEntities _dbEntities = new DbEntities();

		/// <inheritdoc />
		public List<UserGoods> GetAll()
		{
			return _dbEntities.UserGoods.ToList();
		}

		/// <inheritdoc />
		public int Insert(UserGoods userGoods)
		{
			if (userGoods == null)
			{
				throw new ArgumentException("Не указан объект для сохранения.");
			}

			_dbEntities.UserGoods.Add(userGoods);
			return _dbEntities.SaveChanges();
		}

		/// <inheritdoc />
		public int Update(UserGoods userGoods)
		{
			if (userGoods == null)
			{
				throw new ArgumentException("Не указан объект для сохранения.");
			}

			_dbEntities.Entry(userGoods).State = EntityState.Modified;
			return _dbEntities.SaveChanges();
		}

		/// <inheritdoc />
		public int Delete(int id)
		{
			var userProduct = _dbEntities.UserGoods.FirstOrDefault(x => x.Id == id);

			if (userProduct != null)
			{
				_dbEntities.UserGoods.Remove(userProduct);
			}
			else
			{
				throw new Exception("Не найден объект с данным идентификатором");
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