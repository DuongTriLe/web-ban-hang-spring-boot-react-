package com.ldt.REPOSITORY;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ldt.DOMAIN.Color;
import com.ldt.DOMAIN.OrderDetail;

@Repository
public interface ColorRepository extends JpaRepository<Color, Long> {

	Page<Color> findAll(Pageable pageable);

	List<Color> findByColorProductProductId(Long productId);
}
