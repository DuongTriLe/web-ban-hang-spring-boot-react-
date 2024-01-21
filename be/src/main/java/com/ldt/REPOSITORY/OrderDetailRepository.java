package com.ldt.REPOSITORY;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ldt.DOMAIN.OrderDetail;



public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long>{
	
	
	List<OrderDetail> findByOrderOrderId(Long orderId);

}
