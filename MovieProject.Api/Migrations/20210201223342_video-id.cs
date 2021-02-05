using Microsoft.EntityFrameworkCore.Migrations;

namespace MovieProject.Api.Migrations
{
    public partial class videoid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Video_movies_MovieId",
                table: "Video");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Video",
                table: "Video");

            migrationBuilder.RenameTable(
                name: "Video",
                newName: "videos");

            migrationBuilder.RenameIndex(
                name: "IX_Video_MovieId",
                table: "videos",
                newName: "IX_videos_MovieId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_videos",
                table: "videos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_videos_movies_MovieId",
                table: "videos",
                column: "MovieId",
                principalTable: "movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_videos_movies_MovieId",
                table: "videos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_videos",
                table: "videos");

            migrationBuilder.RenameTable(
                name: "videos",
                newName: "Video");

            migrationBuilder.RenameIndex(
                name: "IX_videos_MovieId",
                table: "Video",
                newName: "IX_Video_MovieId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Video",
                table: "Video",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Video_movies_MovieId",
                table: "Video",
                column: "MovieId",
                principalTable: "movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
