package com.ldt.DOMAIN;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "TypeProduct")
public class TypeProduct implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 100, columnDefinition = "nvarchar(100) not null")
	private String name;

	@Column(length = 400)
	private String image;

	@JsonIgnore
	@OneToMany(mappedBy = "idTypeProduct", cascade = CascadeType.ALL)
	private Set<Category> categorys;
}
