using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Context.Models.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.DAL.Repositories.Identity
{
    public class UserRepository : GenericRepository<User>
    {
        public UserRepository(AutoStockContext context) : base(context)
        {

        }
    }
}
