package com.ldt.REPOSITORY;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ldt.DOMAIN.Color;
import com.ldt.DOMAIN.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Page<Order> findAll(Pageable pageable);


    Page<Order> findByUsername_Username(String username, Pageable pageable);

}