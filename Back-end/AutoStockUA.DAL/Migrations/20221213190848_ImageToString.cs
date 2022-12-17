using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoStockUA.DAL.Migrations
{
    public partial class ImageToString : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ImageData",
                table: "Images",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "bd911feb-5228-46e0-8f07-f7f503caf972");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "55cfd239-d8c7-41dc-9587-51b979009f75");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "85d27ae1-01d4-45be-bacf-a9a635991642", "AQAAAAEAACcQAAAAEAItKOrS/R/intZx45zm9GA7UgP5OHaxYtq3BXQ2XMMQcYRuqy4rQQX5wyA/e4c/Gg==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "ImageData",
                table: "Images",
                type: "varbinary(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "5632a53f-e75c-4df2-a2db-c8b6da77f619");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "55797ac5-a300-4e9f-8ae8-b777be2d8711");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "0553114f-bff0-498a-a6d4-cec9cb27c51b", "AQAAAAEAACcQAAAAEL1a5d5VYbTaiCB3ZIajXP7d4joU3XwFoOQnA22fVJ0OgnwgCpPYKJ///2K9NVHgnA==" });
        }
    }
}
