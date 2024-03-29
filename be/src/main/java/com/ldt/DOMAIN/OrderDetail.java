package com.ldt.DOMAIN;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orderdetails")
public class OrderDetail implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long orderDetailId;

	@Column(name = "quantity")
	private Integer quantity;

	@Column(name = "unit_price")
	private Integer unitPrice;

	@ManyToOne()
	@JoinColumn(name = "productId")
	private Product product;

	@Column(name = "color", columnDefinition = "nvarchar(50)")
	private String color;

	@Column(name = "size", columnDefinition = "nvarchar(50)")
	private String size;

	@ManyToOne
	@JoinColumn(name = "orderId")
	private Order order;
}
