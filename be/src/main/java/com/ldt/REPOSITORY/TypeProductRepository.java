package com.ldt.REPOSITORY;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ldt.DOMAIN.Category;
import com.ldt.DOMAIN.TypeProduct;

@Repository
public interface TypeProductRepository extends JpaRepository<TypeProduct, Long> {

   
}
