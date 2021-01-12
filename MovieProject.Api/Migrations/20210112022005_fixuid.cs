using Microsoft.EntityFrameworkCore.Migrations;

namespace MovieProject.Api.Migrations
{
    public partial class fixuid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_articles_AspNetUsers_newsArcticleUserId",
                table: "articles");

            migrationBuilder.DropIndex(
                name: "IX_articles_newsArcticleUserId",
                table: "articles");

            migrationBuilder.DropColumn(
                name: "newsArcticleUserId",
                table: "articles");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "articles",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_articles_UserId",
                table: "articles",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_articles_AspNetUsers_UserId",
                table: "articles",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_articles_AspNetUsers_UserId",
                table: "articles");

            migrationBuilder.DropIndex(
                name: "IX_articles_UserId",
                table: "articles");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "articles",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "newsArcticleUserId",
                table: "articles",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_articles_newsArcticleUserId",
                table: "articles",
                column: "newsArcticleUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_articles_AspNetUsers_newsArcticleUserId",
                table: "articles",
                column: "newsArcticleUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
