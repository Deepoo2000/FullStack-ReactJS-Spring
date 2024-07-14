import { useEffect, useState } from "react"
import BookModel from "../../models/BookModel"
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckOutAndReview } from "./CheckOutAndReview";
import ReviewModel from "../../models/ReviewModel";
import { error } from "console";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";
import ReviewRequestModel from "../../models/ReviewRequestModel";

export const BookCheckOutPage = () => {

    const { authState } = useOktaAuth();

    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Review State
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    // leave a review
    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);


    // Loans Count State
    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);

    // is book checked out
    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] = useState(true);

    //payment 
    const [displayError, setDisplayError] = useState(false);

    const bookId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `${process.env.REACT_APP_API}/books/${bookId}`;

            const url: string = `${baseUrl}?page=0&size=9`;

            // console.log("Url: " + url);

            const response = await fetch(url);

            // console.log("response: " + response.ok);

            if (!response.ok) {
                throw new Error('something error');
            }

            const responseJson = await response.json();

            // console.log("responseJson: " + responseJson);

            // const responseData = responseJson._embedded.book;

            // console.log("responseData: " + responseData);

            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img,
            };

            // console.log("loadedBook: " + loadedBook);
            setBook(loadedBook);
            setIsLoading(false);


        };
        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [isCheckedOut]);

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `${process.env.REACT_APP_API}/reviews/search/findByBookId?bookId=${bookId}`;

            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error('something error');
            }

            const responseJsonReviews = await responseReviews.json();

            const responseData = responseJsonReviews._embedded.reviews;

            const loadedReview: ReviewModel[] = [];

            let weightStarReviews: number = 0;

            for (const key in responseData) {
                loadedReview.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    book_id: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription
                })
                weightStarReviews += responseData[key].rating;
            }
            if (isLoadingReview) {
                const round = (Math.round((weightStarReviews / loadedReview.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReviews(loadedReview);
            setIsLoadingReview(false);
        };

        fetchBookReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })

    }, [isReviewLeft]);

    useEffect(() => {
        const fetchUserReviewBook = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/reviews/secure/user/book?bookId=${bookId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const userReview = await fetch(url, requestOptions);
                console.log("userReview: " + userReview.ok);
                if (!userReview.ok) {
                    throw new Error("Somthing Went Wrong");
                }
                const userReviewResponseJson = await userReview.json();
                console.log("userReviewResponseJson: " + userReviewResponseJson);
                setIsReviewLeft(userReviewResponseJson);
            }
            setIsLoadingUserReview(false);
        }
        fetchUserReviewBook().catch((error: any) => {
            setIsLoadingUserReview(false);
            setHttpError(error.message);
        })

    }, [authState]);

    useEffect(() => {
        const fetchUserCurrentLoansCount = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/books/secure/currentloans/count`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };

                const currentLoansCountResponse = await fetch(url, requestOptions);

                // console.log("1 " + currentLoansCountResponse);
                if (!currentLoansCountResponse.ok) {
                    throw new Error('Somthing went wrong!');
                }
                const currentLoansCountResponseJson = await currentLoansCountResponse.json();
                setCurrentLoansCount(currentLoansCountResponseJson);
            }
            setIsLoadingCurrentLoansCount(false);
        }

        fetchUserCurrentLoansCount().catch((error: any) => {
            setIsLoadingCurrentLoansCount(false);
            setHttpError(error.message);
        })
    }, [authState, isCheckedOut]);

    useEffect(() => {
        const fetchBookCheckecOutBook = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/books/secure/ischeckout/byuser?bookId=${bookId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const bookCheckOut = await fetch(url, requestOptions);
                console.log("bookCheckOut " + bookCheckOut.ok);
                if (!bookCheckOut.ok) {
                    throw new Error('Somthing went wrong!');
                }

                const bookCheckOutResponseJson = await bookCheckOut.json();
                setIsCheckedOut(bookCheckOutResponseJson);
            }
            setIsLoadingBookCheckedOut(false);
        }

        fetchBookCheckecOutBook().catch((error: any) => {
            setIsLoadingBookCheckedOut(false);
            setHttpError(error.message);
        })
    }, [authState]);

    if (isLoading || isLoadingReview || isLoadingCurrentLoansCount || isLoadingBookCheckedOut || isLoadingUserReview) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    async function checkoutBook() {
        const url = `${process.env.REACT_APP_API}/books/secure/checkout?bookId=${book?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const bookCheckOut = await fetch(url, requestOptions);
        if (!bookCheckOut.ok) {
            setDisplayError(true);
            // throw new Error('Somthing went wrong!');
            return;
        }
        console.log("DisplayError: " + displayError);
        setDisplayError(false);
        setIsCheckedOut(true);
    }

    async function submitReview(starInput: number, reviewDescription: String) {
        let bookId: number = 0;
        if (book?.id) {
            bookId = book.id;
        }

        const reviewReuestModel = new ReviewRequestModel(starInput, bookId, reviewDescription);

        const url = `${process.env.REACT_APP_API}/reviews/secure`;

        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewReuestModel)
        };
        const returnResponse = await fetch(url, requestOptions);

        if (!returnResponse.ok) {
            throw new Error('Somthing went wrong!');
        }

        setIsReviewLeft(true);

    }

    return (
        <div >
            <div className="container d-none d-lg-block">
                {
                    displayError && <div className="alert alert-danger mt-3" role="alert">
                        please pay outstanding fees and/or return late book(s).
                    </div>
                }
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-3">
                        {
                            book?.img ?
                                <img src={book?.img} width='226' height='349' alt='book' />
                                :
                                <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')}
                                    width='226' height='349' alt='book' />
                        }
                    </div>
                    <div className="col-4 col-md-6 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h2 className="text-primary">{book?.author}</h2>
                            <p className="lead">{book?.description}</p>
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckOutAndReview book={book} mobile={false} currentLoansCount={currentLoansCount}
                        isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut}
                        checkoutBook={checkoutBook} isReviewLeft={isReviewLeft} submitReview={submitReview} />
                </div>
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
            </div>
            <div className="container d-lg-none mt-5">
                {
                    displayError && <div className="alert alert-danger mt-3" role="alert">
                        please pay outstanding fees and/or return late book(s).
                    </div>
                }
                <div className="d-flex justify-content-center align-items-center">
                    {
                        book?.img ?
                            <img src={book?.img} width='226' height='349' alt='book' />
                            :
                            <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')}
                                width='226' height='349' alt='book' />
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarsReview rating={totalStars} size={32} />
                    </div>
                </div>
                <CheckOutAndReview book={book} mobile={true} currentLoansCount={currentLoansCount}
                    isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut}
                    checkoutBook={checkoutBook} isReviewLeft={isReviewLeft} submitReview={submitReview} />
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
            </div>
        </div>
    )
}