using AutoMapper;
using AutoStockUA.BLL.DTO.Ad;
using AutoStockUA.DAL.Context.Models.Ad;
using AutoStockUA.DAL.Context;
using AutoStockUA.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoStockUA.DAL.Context.Models.Identity;
using AutoStockUA.BLL.DTO.Identity;
using System.Linq.Expressions;
using System.Diagnostics.Contracts;
using System.Security.Principal;
using Abp.Domain.Uow;

namespace AutoStockUA.BLL.Services
{
    public class ChatService : GenericService<ChatDTO, Chat>
    {
        private readonly GenericRepository<Message> _messageRepository;
        public ChatService(AutoStockContext context) : base(context)
        {
            MapperConfiguration config = new MapperConfiguration(con =>
            {
                con.CreateMap<ChatDTO, Chat>().ReverseMap();
                con.CreateMap<UserDTO, User>().ReverseMap();
                con.CreateMap<MessageDTO, Message>().ReverseMap();
            });
            Mapper = new Mapper(config);
            _messageRepository = new GenericRepository<Message>(context);
            Repository = new ChatRepository(context);
        }
        [UnitOfWork]
        public async Task<Message> AddMessage(string message, int senderId, int chatId)
        {
           Chat chat = await Repository.GetAsync(x => x.Id == chatId);
            if (chat.Messages == null)
                chat.Messages = new List<Message>();
            AutoStockUA.DAL.Context.Models.Identity.Message m 
                = new Message() { Content = message,
                    Date = DateTime.Now,
                    UserId = senderId,
                    ChatId = chatId };
            chat.Messages.Add(m);
                await Repository.UpdateAsync(chat);
            return m;


        }

        public async Task<IEnumerable<Message>> GetMessages(int chatId, int? last)
        {
            var chat = await Repository.GetAsync(x => x.Id == (chatId));
             chat.Messages.Reverse();
            var list = chat.Messages;
            if (last ==null)
                return list.Take(10).Select(x => { x.Chat = null;if (x.User!=null) { x.User.Messages = null; x.User.Chats = null; } return x; }).Reverse();
            return list.Where(Messages => Messages.Id < last).Take(10).Select(x => { x.Chat = null; if (x.User != null) { x.User.Messages = null; x.User.Chats = null; } return x; }).Reverse();
        }
    }
}
