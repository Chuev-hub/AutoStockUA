using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.DAL.Repositories
{
    public interface IRepository<T> where T : class
    {
        public Task<T> GetAsync(Expression<Func<T, bool>> expression);
        public Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> expression);
        public Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> expression, int skip, int take);
        public Task<IEnumerable<T>> GetAll(int skip, int take);
        public Task UpdateAsync(T entity);
        public Task<int> AddAsync(T entity);
        public Task AddRangeAsync(IEnumerable<T> entiies);
        public Task RemoveAllAsync();
        public Task RemoveAtAsync(Expression<Func<T, bool>> expression);
        public Task SaveChanges();
    }
}
