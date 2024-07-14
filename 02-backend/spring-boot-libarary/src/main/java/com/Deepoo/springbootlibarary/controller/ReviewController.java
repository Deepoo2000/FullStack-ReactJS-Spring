package com.Deepoo.springbootlibarary.controller;

import ch.qos.logback.core.encoder.EchoEncoder;
import com.Deepoo.springbootlibarary.entity.Book;
import com.Deepoo.springbootlibarary.requestmodels.ReviewRequest;
import com.Deepoo.springbootlibarary.service.BookService;
import com.Deepoo.springbootlibarary.service.ReviewService;
import com.Deepoo.springbootlibarary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/secure/user/book")
    public boolean postReview(@RequestHeader(value = "Authorization") String token,
                              @RequestParam Long bookId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if(userEmail == null){
            throw new Exception("username is missing");
        }
        System.out.println("userEmail: " + userEmail);
        return reviewService.userReviewListed(userEmail, bookId);
    }



    @PostMapping("/secure")
    public void postReview(@RequestHeader(value = "Authorization") String token,
                          @RequestBody ReviewRequest reviewRequest) throws Exception{
//      String userEmail = "ahmedalaa@gmail.com";
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        System.out.println("currentLoansCount Email: " + userEmail);
        if(userEmail == null){
            throw new Exception("username is missing");
        }
        reviewService.postReview(userEmail, reviewRequest);
    }




}
