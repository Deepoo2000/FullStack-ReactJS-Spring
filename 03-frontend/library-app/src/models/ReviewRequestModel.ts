class ReviewRequestModel{
    rating: number;
    bookId: number;
    reviewDescription?: String;
    
    constructor(rating: number, boolId: number, reviewDescription: String){
        this.rating = rating;
        this.bookId = boolId;
        this.reviewDescription = reviewDescription
    }
}

export default ReviewRequestModel;