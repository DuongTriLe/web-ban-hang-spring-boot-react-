package com.ldt.REPOSITORY;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ldt.DOMAIN.Color;
import com.ldt.DOMAIN.Size;

@Repository
public interface SizeRepository extends JpaRepository<Size, Long> {

    Page<Size> findAll(Pageable pageable);

    // SizeProduct

    List<Size> findBySizeProductProductId(Long productId);
}
