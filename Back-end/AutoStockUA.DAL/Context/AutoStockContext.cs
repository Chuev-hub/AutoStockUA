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
 

namespace AutoStockUA.DAL.Context
{
    public class AutoStockContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public DbSet<Advertisement> Advertisements { get; set; }
        public DbSet<AccidentStatus> AccidentStatuses { get; set; }
        public DbSet<BodyType> BodyTypes { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<ConditionType> ConditionTypes { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<DriveType> DriveTypes { get; set; }
        public DbSet<EngineType> EngineTypes { get; set; }
        public DbSet<GearboxType> GearboxTypes { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<NumberOfDoors> NumberOfDoors { get; set; }
        public DbSet<NumberOfDoors> NumberOfPlaces { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Favourites> Favourites { get; set; }
        public AutoStockContext(DbContextOptions<AutoStockContext> options) : base(options)
        {
            
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AccidentStatus>().HasIndex(x => x.Name).IsUnique();
            modelBuilder.Entity<Region>().HasIndex(x => x.Name).IsUnique();
            modelBuilder.Entity<NumberOfDoors>().HasIndex(x => x.Name).IsUnique();
            modelBuilder.Entity<NumberOfPlaces>().HasIndex(x => x.Name).IsUnique();
            modelBuilder.Entity<Model>().HasIndex(x => x.Name).IsUnique(false);
            modelBuilder.Entity<Model>().HasIndex(x => x.Id).IsUnique();
            modelBuilder.Entity<BodyType>().HasIndex(x => x.Name).IsUnique();
            modelBuilder.Entity<Brand>().HasIndex(x => x.Name).IsUnique();
            modelBuilder.Entity<Color>().HasIndex(x => x.Name).IsUnique();
            modelBuilder.Entity<ConditionType>().HasIndex(x => x.Name).IsUnique();
            modelBuilder.Entity<Country>().HasIndex(x => x.Name).IsUnique();
            modelBuilder.Entity<DriveType>().HasIndex(x => x.Name).IsUnique();
            modelBuilder.Entity<EngineType>().HasIndex(x => x.Name).IsUnique();
            modelBuilder.Entity<GearboxType>().HasIndex(x => x.Name).IsUnique();
            modelBuilder.Entity<User>()
                .HasMany(city => city.Advertisements)
                .WithOne(con => con.Owner);

            modelBuilder.Entity<Favourites>()
                .HasKey(sc => new { sc.UserId, sc.AdvertisementId });

            modelBuilder.Entity<Favourites>()
                .HasOne<Advertisement>(sc => sc.Advertisement)
                .WithMany(s => s.Favourites)
                .HasForeignKey(sc => sc.AdvertisementId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Favourites>()
                .HasOne<User>(sc => sc.User)
                .WithMany(s => s.Favourites)
                .HasForeignKey(sc => sc.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Models.Ad.Comment>()
                .HasOne<Advertisement>(sc => sc.Advertisement)
                .WithMany(s => s.Comments)
                .HasForeignKey(sc => sc.AdvertisementId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Comment>()
               .HasOne<User>(sc => sc.User)
               .WithMany(s => s.Comments)
               .HasForeignKey(sc => sc.UserId)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<IdentityRole<int>>().HasData(new IdentityRole<int>
            {
                Id = 2,
                Name = "admin",
                NormalizedName = "admin"
            });
            modelBuilder.Entity<IdentityRole<int>>().HasData(new IdentityRole<int>
            {
                Id = 1,
                Name = "user",
                NormalizedName = "user"
            });

            var hasher = new PasswordHasher<IdentityUser>();
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                Avatar = "",
                UserName = "admin",
                NormalizedUserName = "admin",
                Email = "admin@gmail.com",
                NormalizedEmail = "admin@gmail.com",
                EmailConfirmed = false,
                PasswordHash = hasher.HashPassword(null, "admin"),
                SecurityStamp = string.Empty
            });

            modelBuilder.Entity<IdentityUserRole<int>>().HasData(new IdentityUserRole<int>
            {
                RoleId = 2,
                UserId = 1
            });
            base.OnModelCreating(modelBuilder);

        }
    }
}
