using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Context.Models.Ad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.DAL.Repositories.Ad
{
    public class CommentRepository : GenericRepository<Comment>
    {
        public CommentRepository(AutoStockContext context) : base(context)
        {

        }
    }
}
