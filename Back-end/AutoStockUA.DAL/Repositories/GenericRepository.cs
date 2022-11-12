using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.DAL.Repositories
{
    public class GenericRepository<T> : IRepository<T> where T : class
    {
        protected DbContext context;
        protected DbSet<T> table;
        public GenericRepository(DbContext context)
        {
            this.context = context;
            table = context.Set<T>();
        }
        public async Task AddAsync(T entity)
        {
            await table.AddAsync(entity);
            await context.SaveChangesAsync();
        }

        public async Task<T> GetAsync(Expression<Func<T, bool>> expression)
        {
            var entity = await table.FirstOrDefaultAsync(expression);
            context.Entry<T>(entity).State = EntityState.Detached;
            return entity;
        }

        public async Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> expression)
        {
            return table.Where(expression).AsNoTracking();
        }

        public async Task RemoveAllAsync()
        {
            await Task.Run(() => table.RemoveRange(table));
        }
        public async Task RemoveAtAsync(Expression<Func<T, bool>> expression )
        {
            await Task.Run(async () => table.Remove(await table.FirstOrDefaultAsync(expression)));
        }

        public async Task UpdateAsync(T entity)
        {
            await Task.Run(() => table.Update(entity));
        }

        public async Task SaveChanges()
        {
            await context.SaveChangesAsync();
        }

        public async Task AddRangeAsync(IEnumerable<T> entiies)
        {
            await table.AddRangeAsync(entiies);
        }

        public async Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> expression, int skip, int take)
        {
            return table.Where(expression).Skip(skip).Take(take).AsNoTracking();
        }

        public async Task<IEnumerable<T>> GetAll(int skip, int take)
        {
            return table.Skip(skip).Take(take).AsNoTracking();
        }
    }
}
