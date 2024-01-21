package com.ldt.REPOSITORY;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ldt.DOMAIN.Account;
import com.ldt.DOMAIN.User;

@Repository
public interface AccountRepository extends JpaRepository<User, Long> {

}
