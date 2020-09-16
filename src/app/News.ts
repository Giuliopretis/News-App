export class News {
    _id: string;
    title: string;
    author: string;
    number: number;

    constructor(data) {
        console.log(data);
        
        this.title = data.title
        this.author = data.author
        this.number = data.number
    }

    
}