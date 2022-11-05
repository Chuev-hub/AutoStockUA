using AutoStockUA.DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Type = AutoStockUA.DAL.Context.Models.Ad.Type;
namespace AutoStockUA.DAL.Repositories.Ad
{
    public class TypeRepository : GenericRepository<Type>
    {
        public TypeRepository(AutoStockContext context) : base(context)
        {

        }
    }
}
