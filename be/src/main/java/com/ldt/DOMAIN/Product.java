package com.ldt.DOMAIN;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
@Table(name = "Products")
public class Product implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productId;

	@Column(columnDefinition = "nvarchar(200) not null")
	private String name;

	@Column(nullable = false)
	private int quantity;

	@Column(nullable = false)
	private int unitPrice;

	@Column(length = 400)
	private String image;

	@Column(columnDefinition = "nvarchar(500) not null")
	private String description;

	@Column(nullable = false)
	private int discount;

	@Column(name = "xuat_xu", columnDefinition = "nvarchar(50)")
	private String xuatXu;

	@Temporal(TemporalType.DATE)
	private Date enteredDate;

	// fetch = FetchType.LAZY tức là khi bạn find, select đối tượng
	// Company từ database thì nó sẽ không lấy các đối tượng Employee liên quan

	@ManyToOne()
	@JoinColumn(name = "categoryId")
	private Category category;

	@JsonIgnore
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
	private Set<OrderDetail> orderDetail;

	@JsonIgnore
	@OneToMany(mappedBy = "sizeProduct", cascade = CascadeType.ALL)
	private List<Size> sizeProduct;

	@JsonIgnore
	@OneToMany(mappedBy = "colorProduct", cascade = CascadeType.ALL)
	private List<Color> colorProduct;

	@JsonIgnore
	@OneToMany(mappedBy = "cartItem", cascade = CascadeType.ALL)
	private List<CartItem> cartItem;
}