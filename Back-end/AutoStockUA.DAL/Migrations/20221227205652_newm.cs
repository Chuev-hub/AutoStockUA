using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoStockUA.DAL.Migrations
{
    public partial class newm : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "5963db02-6d4f-4256-a654-2ef5da836fa8");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "0af45c65-edeb-4c02-9e78-629f0a4094b4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "ea264b5f-801b-48d7-8e0d-6ee799ff2203", "AQAAAAEAACcQAAAAEA0R2jK6cR7/ln5wkerbmSIX8q8UCQSFfB0lwnMWpnsbLf9S7rOebinzhaCQ+qYOtw==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "48fba12a-eeab-42f8-8a2b-23525a28d878");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "7d2fa983-0967-4f2c-aa8e-e155d5ee61e8");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "c5033006-ea11-472e-bae4-b738356b01a7", "AQAAAAEAACcQAAAAEC/4LAY7UsGMqSvoxbVJ88RyzBpTFyzxy0LzK6oi+gqZvaNZc/BW/VY34XIqC1sM7Q==" });
        }
    }
}
