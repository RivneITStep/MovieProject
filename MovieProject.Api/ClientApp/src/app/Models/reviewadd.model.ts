export class ReviewAddModel{
    public title: string;
    public text: string;
    public movieId: number;
    public userId: string;

    constructor(){
        this.title = null;
        this.text = null;
        this.movieId = null;
        this.userId = null;
    }
}