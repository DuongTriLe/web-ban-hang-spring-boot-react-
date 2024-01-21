package com.ldt.DOMAIN;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long orderId;

	@Temporal(TemporalType.DATE)
	private Date orderDate;

	@Column(name = "payment_method", columnDefinition = "nvarchar(150)")
	private String paymentMethod;

	@Column(name = "address", columnDefinition = "nvarchar(150)")
	private String address;

	@Column(name = "phone")
	private String phone;

	@Column(name = "total")
	private Long total;

	@JsonIgnore
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	private Set<OrderDetail> orderDetails;

	@ManyToOne
	@JoinColumn(name = "username")
	private User username;
}
