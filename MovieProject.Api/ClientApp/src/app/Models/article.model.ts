export class ArticleModel{
    public id: number;
    public title: string;
    public text: string;
    public pictureUrl: string;
    public userId: string;

    constructor(){
        this.id = null;
        this.title = null;
        this.text = null;
        this.pictureUrl = null;
        this.userId = null;
    }
}