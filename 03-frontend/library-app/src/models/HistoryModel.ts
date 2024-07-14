class HistoryModel{
    id: number;
    userEmail: String;
    checkoutDate: String;
    returnedDate: String;
    title: string;
    author: string;
    description: string;
    img: string;

    constructor(
        id: number,
        userEmail: String,
        checkoutDate: String,
        returnedDate: String,
        title: string,
        author: string,
        description: string,
        img: string) {

        this.id = id;
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.returnedDate = returnedDate;
        this.title = title;
        this.author = author;
        this.description = description;
        this.img = img;
    }
}

export default HistoryModel;