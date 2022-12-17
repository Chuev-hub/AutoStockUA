using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoStockUA.DAL.Migrations
{
    public partial class adUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Advertisements_Types_TypeId",
                table: "Advertisements");

            migrationBuilder.DropTable(
                name: "Types");

            migrationBuilder.DropIndex(
                name: "IX_Advertisements_TypeId",
                table: "Advertisements");

            migrationBuilder.DropColumn(
                name: "CarManufactureYear",
                table: "Advertisements");

            migrationBuilder.DropColumn(
                name: "IsWanted",
                table: "Advertisements");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "Advertisements");

            migrationBuilder.DropColumn(
                name: "WasCrushed",
                table: "Advertisements");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Models",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

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

            migrationBuilder.CreateIndex(
                name: "IX_Models_Name",
                table: "Models",
                column: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Models_Name",
                table: "Models");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Models",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Mileage",
                table: "Advertisements",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddColumn<string>(
                name: "CarManufactureYear",
                table: "Advertisements",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsWanted",
                table: "Advertisements",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "Advertisements",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "WasCrushed",
                table: "Advertisements",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Types",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Types", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "c4bf264a-c868-43ed-a9bc-16db3e467b19");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "baa236d1-f18a-4b3f-b062-3682a3291212");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "d9aac2f4-71f9-4798-ba53-97480eedb55a", "AQAAAAEAACcQAAAAEC4Y7gv6or5NqevkSoJlQZobXq0pqSUQec1HV7MvxC2++bliKpnumIeAoNS6VWUXiQ==" });

            migrationBuilder.CreateIndex(
                name: "IX_Advertisements_TypeId",
                table: "Advertisements",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Types_Name",
                table: "Types",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisements_Types_TypeId",
                table: "Advertisements",
                column: "TypeId",
                principalTable: "Types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
