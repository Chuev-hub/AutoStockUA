using AutoStockUA.DAL.Context.Models.Identity;
using AutoStockUA.DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoStockUA.DAL.Repositories.Identity
{
    public class ChatRepository : GenericRepository<Chat>
    {
        public ChatRepository(AutoStockContext context) : base(context)
        {

        }
    }
}
