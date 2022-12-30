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
        public async void AddMessage(string message, int senderId, int chatId)
        {
           Chat chat = await Repository.GetAsync(x => x.Id == chatId);
            if (chat.Messages == null)
                chat.Messages = new List<Message>();
            chat.Messages.Add(new Message() { Content = message, Date = DateTime.Now, UserId = senderId, ChatId = chatId });
                await Repository.UpdateAsync(chat);

           
        }
    }
}
