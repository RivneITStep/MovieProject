export class MovieModel{
    public id : number;
    public name: string;
    public originalName: string;
    public description: string;
    public country: string;
    public director: string;
    public operator: string;
    public composer: string;
    public genre: string;
    public slogan: string;
    public budget: string;
    public length: number;
    public countViews: number;
    public pictureUrl: number;
    public trailerUrl: string;
    public rating: number;

    constructor(){
        this.id = null;
        this.name = null;
        this.originalName = null;
        this.description = null;
        this.country = null;
        this.director = null;
        this.operator = null;
        this.composer = null;
        this.genre = null;
        this.slogan = null;
        this.budget = null;
        this.length = null;
        this.countViews = null;
        this.pictureUrl = null;
        this.trailerUrl = null;
        this.rating = null;
        }
}