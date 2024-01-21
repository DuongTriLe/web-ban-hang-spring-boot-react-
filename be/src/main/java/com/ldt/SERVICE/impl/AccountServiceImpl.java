package com.ldt.SERVICE.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import com.ldt.DOMAIN.Account;
import com.ldt.DOMAIN.User;
import com.ldt.REPOSITORY.AccountRepository;
import com.ldt.SERVICE.AccountService;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    PasswordEncoder bcryptPasswordEncoder;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public User save(User entity) {

        Optional<User> optExist = findById(entity.getId());

        if (optExist.isPresent()) {

            // Nếu mật khẩu của tài khoản mới là rỗng,
            // phương thức sẽ giữ nguyên mật khẩu cũ của tài khoản đã tồn tại.
            if (StringUtils.isEmpty(entity.getPassword())) {
                entity.setPassword(optExist.get().getPassword());
            } else {
                // Nếu mật khẩu của tài khoản mới không rỗng,
                // phương thức sẽ mã hóa mật khẩu mới bằng cách sử dụng bcryptPasswordEncoder
                // và cập nhật mật khẩu mới cho tài khoản.
                entity.setPassword(bcryptPasswordEncoder.encode(entity.getPassword()));
            }
        } else {
            entity.setPassword(bcryptPasswordEncoder.encode(entity.getPassword()));
        }

        return accountRepository.save(entity);
    }

    @Override
    public Optional<User> findById(Long id) {
        return accountRepository.findById(id);
    }
}
