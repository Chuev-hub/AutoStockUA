# AUTO STOCK UA 🛴 🚘 

## Description ✏️
This is a copy of the [AUTO-RIA](https://auto.ria.com/) website where we can:

- View information about each car that is for sale;
- Chating with their owners;
- A lot of characteristics that can be selected to filter all ads to find one that you searching for;
- Authentication and authorization are implemented;
- User can leave a comment under the advertisement;
- User can add it to "Favourites" selection;
- Administrator account added, it has access to do Create-Read-Update-Delete operations with Ads, Users;

### Also you can try to sell your car by creating advertisement.
 
But you should register and login to your personal account if you want to do more than just view advertisements.
## Stack 📋
- ASP.NET Core MVC
- REST Api
- JWT 
- SQL Server
- 3tier
- EF6
- React
- SignalR
- Bootstrap 
- ...?

## Stack description 💻
Project has two parts - back-end on ASP.NET Core MVC and front-end on ReactJs library.
The first one has a 3tier architecture:

- DAL (Data access layer)
- BLL (Business logic layer)
- UI (Here it is API Controllers layer)

Registration and login are implemented with using JWT authentication.

Data is stored in the SQL Server database. EF6 was used to access the data.

Bootstrap was used in the front-end part.
