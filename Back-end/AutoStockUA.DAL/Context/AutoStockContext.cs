using AutoStockUA.DAL.Context.Models.Ad;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoStockUA.DAL.Context.Models.Identity;
using DriveType = AutoStockUA.DAL.Context.Models.Ad.DriveType;
using Type = AutoStockUA.DAL.Context.Models.Ad.Type;

namespace AutoStockUA.DAL.Context
{
    public class AutoStockContext: IdentityDbContext<User, IdentityRole<int>, int>
    {
        public DbSet<Advertisement> Advertisements { get; set; }
        public DbSet<AccidentStatus> AccidentStatuses{ get; set; }
        public DbSet<BodyType> BodyTypes { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Models.Ad.Comment> Comments { get; set; }
        public DbSet<ConditionType> ConditionTypes { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<DriveType> DriveTypes { get; set; }
        public DbSet<EngineType> EngineTypes { get; set; }
        public DbSet<GearboxType> GearboxTypes { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<NumberOfDoors> NumberOfDoors { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<Type> Types { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Favourites> Favourites { get; set; }
        public AutoStockContext(DbContextOptions<AutoStockContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasMany(city => city.Advertisements)
               .WithOne(con => con.Owner);

            modelBuilder.Entity<Favourites>().HasKey(sc => new { sc.UserId, sc.AdvertisementId });

            modelBuilder.Entity<Favourites>()
                .HasOne<Advertisement>(sc => sc.Advertisement)
                .WithMany(s => s.Favourites)
                .HasForeignKey(sc => sc.AdvertisementId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Models.Ad.Comment>()
              .HasOne<Advertisement>(sc => sc.Advertisement)
              .WithMany(s => s.Comments)
              .HasForeignKey(sc => sc.AdvertisementId).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Comment>()
         .HasOne<User>(sc => sc.User)
         .WithMany(s => s.Comments)
         .HasForeignKey(sc => sc.UserId).OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<Favourites>()
                .HasOne<User>(sc => sc.User)
                .WithMany(s => s.Favourites)
                .HasForeignKey(sc => sc.UserId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
