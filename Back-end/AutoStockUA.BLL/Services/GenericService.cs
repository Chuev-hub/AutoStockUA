using AutoMapper;
using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.BLL.Services
{
    public class GenericService<T, T1> : IService<T, T1> where T : class where T1 : class
    {
        protected IRepository<T1> Repository { get; set; }
        protected IMapper Mapper { get; set; }
        public GenericService(AutoStockContext context)
        {
            Repository = new GenericRepository<T1>(context);
            MapperConfiguration config = new MapperConfiguration(con => con.CreateMap<T, T1>().ReverseMap());
            Mapper = new Mapper(config);
        }
        
        public virtual async Task AddAsync(T entity)
        {
            await Repository.AddAsync(Mapper.Map<T, T1>(entity));
            await Repository.SaveChanges();
        }

        public async Task<T> Get(Expression<Func<T1, bool>> expression) => Mapper.Map<T1, T>(await Repository.GetAsync(expression));

        public async Task RemoveAtAsync(Expression<Func<T1, bool>> expression)
        {
            await Repository.RemoveAtAsync(expression);
            await Repository.SaveChanges();
        }

        public async Task UpdateAsync(T entity)
        {
            await Repository.UpdateAsync(Mapper.Map<T, T1>(entity));
            await Repository.SaveChanges();
        }

        public async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T1, bool>> expression)
        {
            return Mapper.Map<IEnumerable<T1>, IEnumerable<T>>(await Repository.GetAll(expression));
        }
        public async Task RemoveAllAsync()
        {
            await Repository.RemoveAllAsync();
            await Repository.SaveChanges();
        }
    }
}
