package com.ldt.REPOSITORY;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ldt.DOMAIN.CartItem;
import com.ldt.DOMAIN.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCartItemAndSizeAndColor(Product product, String size, String color);

    @Query("SELECT SUM(ci.quantity * (ci.unitPrice * (100 - ci.discount) / 100)) FROM CartItem ci")
    Integer getTotalPrice();
}
