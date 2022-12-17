using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoStockUA.DAL.Migrations
{
    public partial class update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Mileage",
                table: "Advertisements",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "4b9e7a5b-fc5c-4315-a744-feefbfed76a2");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "797588db-ca29-4d86-be83-f9e4c2e73e81");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "dfe20ae5-83e8-4762-894e-f80af8b20bf9", "AQAAAAEAACcQAAAAEK3Src4rktOxVDpdmTi+1fIhVv/wHWGgXi+xi+LcWbkf+HwuZAeYA+/wHNiRp+vq7w==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Mileage",
                table: "Advertisements",
                type: "float",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

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
    }
}
