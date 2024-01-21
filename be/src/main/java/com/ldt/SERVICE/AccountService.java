package com.ldt.SERVICE;

import java.util.Optional;

import com.ldt.DOMAIN.User;

public interface AccountService {

    Optional<User> findById(Long id);

    User save(User entity);
}
