export const enum Status { Read, ReRead , DNF, CurrentlyReading, ReturnedUnread, WantRead};
export const enum Format { Print, PDF, Ebook, AudioBook};

export class Book {
    id : number ;
    title : string;
    author: string;
    numberPages : number;
    status : Status;
    price : number;
    numberPagesRead : number;
    format : Format;
    suggestedBy : string;
    finished : boolean = false;

    constructor(
        id : number,
        title : string, 
        author: string,
        numberPages : number,
        status : Status,
        price : number,
        numberPagesRead : number,
        format : Format,
        suggestedBy : string
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.numberPages = numberPages;
        this.status = status;
        this.price = price;
        this.numberPagesRead = numberPagesRead < numberPages ? numberPagesRead : 0;
        this.format = format;
        this.suggestedBy = suggestedBy;
    }

    currentlyAt(): number {
        return this.numberPagesRead;
    }
       
}