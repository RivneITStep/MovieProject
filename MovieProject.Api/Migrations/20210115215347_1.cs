using Microsoft.EntityFrameworkCore.Migrations;

namespace MovieProject.Api.Migrations
{
    public partial class _1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_filmActors_actors_ActorId",
                table: "filmActors");

            migrationBuilder.DropForeignKey(
                name: "FK_filmActors_movies_MovieId",
                table: "filmActors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_filmActors",
                table: "filmActors");

            migrationBuilder.RenameTable(
                name: "filmActors",
                newName: "FilmActor");

            migrationBuilder.RenameIndex(
                name: "IX_filmActors_MovieId",
                table: "FilmActor",
                newName: "IX_FilmActor_MovieId");

            migrationBuilder.RenameIndex(
                name: "IX_filmActors_ActorId",
                table: "FilmActor",
                newName: "IX_FilmActor_ActorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FilmActor",
                table: "FilmActor",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FilmActor_actors_ActorId",
                table: "FilmActor",
                column: "ActorId",
                principalTable: "actors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FilmActor_movies_MovieId",
                table: "FilmActor",
                column: "MovieId",
                principalTable: "movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FilmActor_actors_ActorId",
                table: "FilmActor");

            migrationBuilder.DropForeignKey(
                name: "FK_FilmActor_movies_MovieId",
                table: "FilmActor");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FilmActor",
                table: "FilmActor");

            migrationBuilder.RenameTable(
                name: "FilmActor",
                newName: "filmActors");

            migrationBuilder.RenameIndex(
                name: "IX_FilmActor_MovieId",
                table: "filmActors",
                newName: "IX_filmActors_MovieId");

            migrationBuilder.RenameIndex(
                name: "IX_FilmActor_ActorId",
                table: "filmActors",
                newName: "IX_filmActors_ActorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_filmActors",
                table: "filmActors",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_filmActors_actors_ActorId",
                table: "filmActors",
                column: "ActorId",
                principalTable: "actors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_filmActors_movies_MovieId",
                table: "filmActors",
                column: "MovieId",
                principalTable: "movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
