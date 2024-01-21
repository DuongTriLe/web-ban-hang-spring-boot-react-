package com.ldt.DOMAIN;

import java.io.Serializable;
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

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Categories")
public class Category implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long categoryId;

	@Column(name = "category_name", length = 100, columnDefinition = "nvarchar(100) not null")
	private String name;

	// cascade = CascadeType.ALL được sử dụng để chỉ định rằng tất cả các thao tác
	// CRUD trên entity cha (One-side)
	// sẽ được áp dụng trên tất cả các instance của entity con (Many-side) tương ứng

	@JsonIgnore
	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
	private Set<Product> products;

	@ManyToOne()
	@JoinColumn(name = "idTypeProduct")
	private TypeProduct idTypeProduct;
}
