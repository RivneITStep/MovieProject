export class MovieAddModel{
    public name: string;
    public originalName: string;
    public year: number;
    public description: string;
    public country: string;
    public director: string;
    public operator: string;
    public composer: string;
    public genre: string;
    public slogan: string;
    public budget: number;
    public length: number;
    public countViews: number;
    public pictureUrl: string;
    public trailerUrl: string;

    constructor(){
        this.name = null;
        this.originalName = null;
        this.year = null;
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
        }
}