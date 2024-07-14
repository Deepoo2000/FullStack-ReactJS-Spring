package com.Deepoo.springbootlibarary.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="checkout")
@Data
public class Checkout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email")
    private  String userEmail;

    @Column(name = "checkout_date")
    private  String checkoutData;

    @Column(name = "return_date")
    private  String returnDate;

    @Column(name = "book_id")
    private  Long bookId;

    public Checkout() {
    }

    public Checkout(String userEmail, String checkoutData, String returnDate, Long bookId) {
        this.userEmail = userEmail;
        this.checkoutData = checkoutData;
        this.returnDate = returnDate;
        this.bookId = bookId;

    }

    public long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(String returnDate) {
        this.returnDate = returnDate;
    }

    public String getCheckoutData() {
        return checkoutData;
    }

    public void setCheckoutData(String checkoutData) {
        this.checkoutData = checkoutData;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
