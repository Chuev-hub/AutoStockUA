using AutoStockUA.DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoStockUA.DAL.Context.Models.Ad;

namespace AutoStockUA.DAL.Repositories.Ad
{
    public class ConditionTypeRepository : GenericRepository<ConditionType>
    {
        public ConditionTypeRepository(AutoStockContext context) : base(context)
        {

        }
    }
}
