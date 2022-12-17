using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoStockUA.DAL.Migrations
{
    public partial class ununique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
       name: "IX_Models_Name",
       table: "Models");


        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
         
        }
    }
}
