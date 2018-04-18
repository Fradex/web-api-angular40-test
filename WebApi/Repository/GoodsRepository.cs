using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using WebApi.DbContext;
using WebApi.Repository.Interface;

namespace WebApi.Repository
{
	public class GoodsRepository : IGoodsRepository, IDisposable
	{
		private readonly DbEntities _dbEntities = new DbEntities();

		/// <inheritdoc />
		public List<Goods> GetAll()
		{
			return _dbEntities.Goods.ToList();
		}

		/// <inheritdoc />
		public int Insert(Goods goods)
		{
			if (goods == null)
			{
				throw new ArgumentException("Не указан объект для сохранения.");
			}

			_dbEntities.Goods.Add(goods);
			return _dbEntities.SaveChanges();
		}

		/// <inheritdoc />
		public int Update(Goods goods)
		{
			if (goods == null)
			{
				throw new ArgumentException("Не указан объект для сохранения.");
			}

			_dbEntities.Entry(goods).State = EntityState.Modified;
			return _dbEntities.SaveChanges();
		}

		/// <inheritdoc />
		public int Delete(int id)
		{
			var product = _dbEntities.Goods.FirstOrDefault(x => x.Id == id);

			if (product != null)
			{
				_dbEntities.Goods.Remove(product);
			}
			else
			{
				throw new Exception("Не найден товар с данным идентификатором.");
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