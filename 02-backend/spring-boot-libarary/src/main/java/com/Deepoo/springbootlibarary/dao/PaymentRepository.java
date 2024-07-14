package com.Deepoo.springbootlibarary.dao;

import com.Deepoo.springbootlibarary.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Payment findByUserEmail(String userEmail);
}
