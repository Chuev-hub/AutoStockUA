using AutoStockUA.DAL.Context.Models;
using AutoStockUA.DAL.Context.Models.Ad;
using Microsoft.AspNetCore.Identity;
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
    public class GenericRepository<T> : IRepository<T> where T : class, IItem
    {
        protected DbContext context;
        protected DbSet<T> table;
        public GenericRepository(DbContext context)
        {
            this.context = context;
            table = context.Set<T>();
        }
        public virtual async Task<int> AddAsync(T entity)
        {
            await table.AddAsync(entity);
            await context.SaveChangesAsync();
            return entity.Id;
        }

        public virtual async Task<T> GetAsync(Expression<Func<T, bool>> expression)
        {
            var entity = await table.AsNoTracking().FirstOrDefaultAsync(expression);
            //context.Entry<T>(entity).State = EntityState.Detached;
            return entity;
        }

        public virtual async Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> expression)
        {
            return table.AsNoTracking().Where(expression);
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
            table.Attach(entity);
            context.Entry(entity).State = EntityState.Modified;
            await context.SaveChangesAsync();
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
            return table.AsNoTracking().Where(expression).Skip(skip).Take(take);
        }

        public async Task<IEnumerable<T>> GetAll(int skip, int take)
        {
            return table.AsNoTracking().Skip(skip).Take(take);
        }
    }
}
