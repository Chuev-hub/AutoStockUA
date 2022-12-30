using AutoMapper;
using AutoStockUA.BLL.DTO.Ad;
using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Context.Models;
using AutoStockUA.DAL.Context.Models.Ad;
using AutoStockUA.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.BLL.Services
{
    public class GenericService<T, T1> : IService<T, T1> where T : class where T1 : class, IItem
    {
        protected IRepository<T1> Repository { get; set; }
        protected IMapper Mapper { get; set; }
        public GenericService(AutoStockContext context)
        {
            Repository = new GenericRepository<T1>(context);
            MapperConfiguration config = new MapperConfiguration(con =>
            {
                con.CreateMap<T, T1>().ReverseMap();
            });
            Mapper = new Mapper(config);
        }
        
        public virtual async Task AddAsync(T entity)
        {
            var t1 = Mapper.Map<T, T1>(entity);
            await Repository.AddAsync(t1);
            await Repository.SaveChanges();
        }

        public virtual async Task<T> Get(Expression<Func<T1, bool>> expression) => Mapper.Map<T1, T>(await Repository.GetAsync(expression));

        public virtual async Task RemoveAtAsync(Expression<Func<T1, bool>> expression)
        {
            await Repository.RemoveAtAsync(expression);
            await Repository.SaveChanges();
        }

        public virtual async Task UpdateAsync(T entity)
        {
            var entity2 = Mapper.Map<T, T1>(entity);
          
            await Repository.UpdateAsync(entity2);
            await Repository.SaveChanges();
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T1, bool>> expression)
        {
            return Mapper.Map<IEnumerable<T1>, IEnumerable<T>>(await Repository.GetAll(expression));
        }
        public virtual async Task RemoveAllAsync()
        {
            await Repository.RemoveAllAsync();
            await Repository.SaveChanges();
        }
    }
}
