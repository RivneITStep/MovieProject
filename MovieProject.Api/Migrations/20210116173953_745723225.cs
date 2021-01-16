using Microsoft.EntityFrameworkCore.Migrations;

namespace MovieProject.Api.Migrations
{
    public partial class _745723225 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Mark",
                table: "reviews");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Mark",
                table: "reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
