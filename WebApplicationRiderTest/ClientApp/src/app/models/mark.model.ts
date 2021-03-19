import { MovieModel } from "./movie.model";

export class MarkModel{
    public id: number;
    public value: number;
    public movie: MovieModel = new MovieModel();

    public constructor(){
        this.id = null;
        this.value = null;
    }
}