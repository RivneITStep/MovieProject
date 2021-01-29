export class ReviewModel{
    public id: number;
    public title: string;
    public text: string;
    public movieId: number;
    public userId: string;

    constructor(){
        this.id = null;
        this.title = null;
        this.text = null;
        this.movieId = null;
        this.userId = null;
    }
}