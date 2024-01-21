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
@Table(name = "accounts")
// implements Serializable chuyển đổi thành một chuỗi byte để lưu trữ hoặc
// truyền qua mạng
public class Account implements Serializable {

	@Id
	@Column(length = 30)
	private String username;

	@Column(length = 100, nullable = false)
	private String password;

	@Column(columnDefinition = "nvarchar(100)")
	private String fullname;

	@Column(length = 100)
	private String email;

	private boolean admin;

	// CascadeType.ALL Khi một thay đổi trạng thái xảy ra trên đối tượng Parent (ví
	// dụ: khi nó được xóa),
	// tất cả các đối tượng con của nó (được đặt trong danh sách children) sẽ cũng
	// bị xóa.
	// @JsonIgnore
	// @OneToMany(mappedBy = "username", cascade = CascadeType.ALL)
	// private Set<Order> orders;
}