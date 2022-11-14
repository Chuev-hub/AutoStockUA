using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.BLL.Services
{
    public interface IService<T, T1> where T : class where T1 : class
    {
        public Task<T> Get(Expression<Func<T1, bool>> expression);
        public Task<IEnumerable<T>> GetAllAsync(Expression<Func<T1, bool>> expression);
        public Task AddAsync(T entity);
        public Task RemoveAtAsync(Expression<Func<T1, bool>> expression);
        public Task RemoveAllAsync();
        public Task UpdateAsync(T entity);
    }
}
