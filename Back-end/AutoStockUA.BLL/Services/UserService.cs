using AutoStockUA.BLL.DTO.Ad;
using AutoStockUA.DAL.Context.Models.Ad;
using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoStockUA.BLL.DTO.Identity;
using AutoStockUA.DAL.Context.Models.Identity;
using AutoMapper;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Identity;

namespace AutoStockUA.BLL.Services
{
    public class UserService : GenericService<UserDTO, User>
    {
        protected IRepository<IdentityRole<int>> RepositoryRole { get; set; }
        public UserService(AutoStockContext context):base(context) 
        {
            RepositoryRole = new GenericRepository<IdentityRole<int>>(context);
        }
        public async Task<IEnumerable<IdentityRole<int>>> GetAllRolesAsync(Expression<Func<IdentityRole<int>, bool>> expression)
        {
            return await RepositoryRole.GetAll(expression);
        }
    }
}
