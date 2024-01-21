package com.ldt.REPOSITORY;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ldt.DOMAIN.Product;
import com.ldt.DOMAIN.TypeProduct;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContaining(String name);

    Page<Product> findByNameContaining(String name, Pageable pageable);

    @Query("SELECT DISTINCT p.xuatXu FROM Product p")
    List<String> findAllXuatXus();

    List<Product> findByXuatXuIn(List<String> xuatXus);

    Page<Product> findByXuatXuContaining(String xuatXu, Pageable pageable);

    Page<Product> findByCategory_IdTypeProduct(TypeProduct typeProduct, Pageable pageable);

    Page<Product> findByCategory_CategoryId(Long categoryId, Pageable pageable);

}
