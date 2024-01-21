package com.ldt.SERVICE.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ldt.DOMAIN.Category;
import com.ldt.DOMAIN.PageResult;

import com.ldt.REPOSITORY.CategoryRepository;

import com.ldt.SERVICE.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public PageResult<Category> getCategorys(int page, int size, String keyword) {
        // xác định trang hiện tại và kích thước của trang muốn lấy.
        Pageable pageable = PageRequest.of(page, size);
        Page<Category> Categorys;

        if (keyword != null && !keyword.isEmpty()) {
            Categorys = categoryRepository.findByNameContaining(keyword, pageable);
        } else {
            Categorys = categoryRepository.findAll(pageable);
        }

        // products.getContent() là một phương thức của đối tượng Page<Product>
        // trả về danh sách các sản phẩm trên trang hiện tại của kết quả phân trang.
        return new PageResult<>(Categorys.getContent(), Categorys.getTotalPages());
    }
}
