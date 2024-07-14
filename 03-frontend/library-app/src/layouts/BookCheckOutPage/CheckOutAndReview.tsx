import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";
import { LeaveAReview } from "../Utils/LeaveAReview";

export const CheckOutAndReview: React.FC<{ book: BookModel | undefined, mobile: boolean, 
    currentLoansCount: number, isAuthenticated: any, isCheckedOut: boolean, checkoutBook: any,
    isReviewLeft: boolean, submitReview: any}> = (props) => {

    function ButtonRender(){
        if(props.isAuthenticated){
            if(!props.isCheckedOut && props.currentLoansCount < 5){
                return(<button onClick={() => props.checkoutBook()} className="btn btn-success btn-lg">Checkout</button>)
            }else if(props.isCheckedOut){
                return(<p><b>Book Checked Out. Enjoy!</b></p>)
            }else if(!props.isCheckedOut){
                return(<p className="text-danger">Too many books checked out.</p>)
            }
        }

        return(<Link to={'/login'} className="btn btn-success btn-lg"> Sign In</Link>)
    }

    function reveiwRender(){
        if(props.isAuthenticated && !props.isReviewLeft){
            return(
            <p>
                <LeaveAReview submitReview={props.submitReview}/>
            </p>
        )
        }
        else if(props.isAuthenticated && props.isReviewLeft){
            return(
            <p>
                <b>
                    thanks for your review!
                </b>
            </p>)
        }
        return(
        <div>
            <hr/>
            <p>
                Sign in to able to leave a review.
            </p>
        </div>)
    }


    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>{props.currentLoansCount}/5 </b>
                        books checked out
                    </p>
                    <hr />
                    {
                        props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                            <h4 className="text-success">
                                Available
                            </h4>
                            :
                            <h4 className="text-danger">
                                Wait List
                            </h4>
                    }
                    <div className="row">
                        <p className="col-6 lead">
                            <b>{props.book?.copies} </b>
                            copies
                        </p>
                        <p className="col-6 lead">
                            <b>{props.book?.copiesAvailable} </b>
                            available
                        </p>
                    </div>
                </div>
                {ButtonRender()}
                <hr/>
                <p className="mt-3">
                    this number can change until placing order has been complete
                </p>
                {reveiwRender()}
            </div>
        </div>
    );
}