using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoStockUA.DAL.Migrations
{
    public partial class updating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Advertisements_AccidentStatuses_AccidentStatusId",
                table: "Advertisements");

            migrationBuilder.DropForeignKey(
                name: "FK_Advertisements_Brands_BrandId",
                table: "Advertisements");

            migrationBuilder.AlterColumn<int>(
                name: "BrandId",
                table: "Advertisements",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AccidentStatusId",
                table: "Advertisements",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisements_AccidentStatuses_AccidentStatusId",
                table: "Advertisements",
                column: "AccidentStatusId",
                principalTable: "AccidentStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisements_Brands_BrandId",
                table: "Advertisements",
                column: "BrandId",
                principalTable: "Brands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Advertisements_AccidentStatuses_AccidentStatusId",
                table: "Advertisements");

            migrationBuilder.DropForeignKey(
                name: "FK_Advertisements_Brands_BrandId",
                table: "Advertisements");

            migrationBuilder.AlterColumn<int>(
                name: "BrandId",
                table: "Advertisements",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "AccidentStatusId",
                table: "Advertisements",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisements_AccidentStatuses_AccidentStatusId",
                table: "Advertisements",
                column: "AccidentStatusId",
                principalTable: "AccidentStatuses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisements_Brands_BrandId",
                table: "Advertisements",
                column: "BrandId",
                principalTable: "Brands",
                principalColumn: "Id");
        }
    }
}
