﻿using AutoStockUA.BLL.DTO.Identity;
using AutoStockUA.BLL.Services;
using AutoStockUA.DAL.Context;
using Microsoft.AspNetCore.SignalR;
using NuGet.Protocol.Plugins;
using System.Collections.Concurrent;
using System.Text.RegularExpressions;

namespace AutoStockUA.API.Hubs
{
    public class ChatHub: Hub
    {
        private static readonly ConcurrentDictionary<string, string> Map = new ConcurrentDictionary<string, string>();
        private ChatService _chatService;
        public ChatHub(ChatService chatService) 
        {
            _chatService = chatService;
        }
        public async void JoinGroup(string name)
        {
            string group = Map.GetValueOrDefault(Context.ConnectionId);
            if (group != null && group != "") 
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, group);

            Map[Context.ConnectionId] = name;
            await Groups.AddToGroupAsync(Context.ConnectionId, name);
        }
   
        public async Task SendMessageToGroup(string sender,string senderId, string receiver, string message)
        {
            AutoStockUA.DAL.Context.Models.Identity.Message msg = 
                await _chatService.AddMessage(message, Convert.ToInt32(senderId),
                Convert.ToInt32(receiver));
            msg.User = null;
            msg.Chat =  null;
            await Clients.Group(receiver).SendAsync("ReceiveMessage", sender, msg);
        }
       

        //public void Connect(string UserName, int UserID)
        //{
        //    var id = Context.ConnectionId;

        //    if (ConnectedUsers.Count(x => x.ConnectionId == id) == 0)
        //    {
        //        ConnectedUsers.Add(new UserDetail { ConnectionId = id, UserName = UserName + "-" + UserID, UserID = UserID });
        //    }
        //    UserDetail CurrentUser = ConnectedUsers.Where(u => u.ConnectionId == id).FirstOrDefault();
        //    // send to caller           
        //    Clients.Caller.onConnected(CurrentUser.UserID.ToString(), CurrentUser.UserName, ConnectedUsers, CurrentMessage, CurrentUser.UserID);
        //    // send to all except caller client           
        //    Clients.AllExcept(CurrentUser.ConnectionId).onNewUserConnected(CurrentUser.UserID.ToString(), CurrentUser.UserName, CurrentUser.UserID);
        //}

        //public void SendMessageToAll(string userName, string message)
        //{
        //    // store last 100 messages in cache
        //    //AddMessageinCache(userName, message);

        //    // Broad cast message
        //    //Clients.All.messageReceived(userName, message);
        //}

        //public void SendPrivateMessage(string toUserId, string message)
        //{
        //    try
        //    {
        //        string fromconnectionid = Context.ConnectionId;
        //        string strfromUserId = (ConnectedUsers.Where(u => u.ConnectionId == Context.ConnectionId).Select(u => u.UserID).FirstOrDefault()).ToString();
        //        int _fromUserId = 0;
        //        int.TryParse(strfromUserId, out _fromUserId);
        //        int _toUserId = 0;
        //        int.TryParse(toUserId, out _toUserId);
        //        List<UserDetail> FromUsers = ConnectedUsers.Where(u => u.UserID == _fromUserId).ToList();
        //        List<UserDetail> ToUsers = ConnectedUsers.Where(x => x.UserID == _toUserId).ToList();

        //        if (FromUsers.Count != 0 && ToUsers.Count() != 0)
        //        {
        //            foreach (var ToUser in ToUsers)
        //            {
        //                // send to                                                                                            //Chat Title
        //                Clients.Client(ToUser.ConnectionId).sendPrivateMessage(_fromUserId.ToString(), FromUsers[0].UserName, FromUsers[0].UserName, message);
        //            }


        //            foreach (var FromUser in FromUsers)
        //            {
        //                // send to caller user                                                                                //Chat Title
        //                Clients.Client(FromUser.ConnectionId).sendPrivateMessage(_toUserId.ToString(), FromUsers[0].UserName, ToUsers[0].UserName, message);
        //            }
        //            // send to caller user
        //            //Clients.Caller.sendPrivateMessage(_toUserId.ToString(), FromUsers[0].UserName, message);
        //            //ChatDB.Instance.SaveChatHistory(_fromUserId, _toUserId, message);
        //            MessageDetail _MessageDeail = new MessageDetail { FromUserID = _fromUserId, FromUserName = FromUsers[0].UserName, ToUserID = _toUserId, ToUserName = ToUsers[0].UserName, Message = message };
        //            AddMessageinCache(_MessageDeail);
        //        }
        //    }
        //    catch { }
        //}

        ////public void RequestLastMessage(int FromUserID, int ToUserID)
        ////{
        ////    List<MessageDetail> CurrentChatMessages = (from u in CurrentMessage where ((u.FromUserID == FromUserID && u.ToUserID == ToUserID) || (u.FromUserID == ToUserID && u.ToUserID == FromUserID)) select u).ToList();
        ////    //send to caller user
        ////    Clients.Caller.GetLastMessages(ToUserID, CurrentChatMessages);
        ////}

        ////public void SendUserTypingRequest(string toUserId)
        ////{
        ////    string strfromUserId = (ConnectedUsers.Where(u => u.ConnectionId == Context.ConnectionId).Select(u => u.UserID).FirstOrDefault()).ToString();

        ////    int _toUserId = 0;
        ////    int.TryParse(toUserId, out _toUserId);
        ////    List<UserDetail> ToUsers = ConnectedUsers.Where(x => x.UserID == _toUserId).ToList();

        ////    foreach (var ToUser in ToUsers)
        ////    {
        ////        // send to                                                                                            
        ////        Clients.Client(ToUser.ConnectionId).ReceiveTypingRequest(strfromUserId);
        ////    }
        ////}
       
    }
}
