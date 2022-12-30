using AutoStockUA.DAL.Context.Models.Ad;
using AutoStockUA.DAL.Context;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using AutoStockUA.DAL.Context.Models.Identity;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace AutoStockUA.DAL.Repositories
{
    public class ChatRepository : GenericRepository<Chat>
    {
        private DbSet<User> _users;
        public ChatRepository(AutoStockContext c) : base(c)
        {
            _users = c.Users;

        }
        public override async Task<IEnumerable<Chat>> GetAll(Expression<Func<Chat, bool>> expression)
        {
            var lisd =  table
                 .Include(x => x.Users)
                 .Where(expression).AsNoTracking();
            return lisd;
        }
        public override async Task<Chat> GetAsync(Expression<Func<Chat, bool>> expression)
        {
            var lisd =  table.AsNoTracking()
                .Include(x => x.Users).Include(t => t.Messages)
                .SingleOrDefault(expression); 
            return lisd;
        }
        public override async Task<int> AddAsync(Chat entity)
        {
            var user = _users.SingleOrDefault(x => x.Id == entity.Users[0].Id);
            var user2 = _users.SingleOrDefault(x => x.Id == entity.Users[1].Id);
            if (user.Chats?.Where(x => x.Users.Where(t => t.Id == user2.Id).Count() > 0).Count() > 0)
                throw new Exception("Exists");



                Chat c = new Chat();
                table.Add(c);
            
            if (user.Chats == null)
                user.Chats = new List<Chat>();
            if (user2.Chats == null)
                user2.Chats = new List<Chat>();
            user.Chats.Add(c);
            user2.Chats.Add(c);
            context.SaveChanges();
            return c.Id;
        }
    }
}
