import { MovieModel } from "../movie/movie.model";
import { PhotoModel } from "../photo.model";

export class ActorModel{
    public id: number;
    public name: string;
    public surname: string;
    public fathername: string;
    public country: string;
    public countFilms: number;
    public description: string;
    public birthYear: number;
    public age: number;
    public pictureUrl: string;

    construstor(){
        this.id = null;
        this.name = null;
        this.surname = null;
        this.fathername = null;
        this.country = null;
        this.countFilms = null;
        this.description = null;
        this.birthYear = null;
        this.age = null;
        this.pictureUrl = null;
    }
}
