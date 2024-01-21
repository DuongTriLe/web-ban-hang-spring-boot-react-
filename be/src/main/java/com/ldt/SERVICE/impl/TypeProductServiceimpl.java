package com.ldt.SERVICE.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ldt.DOMAIN.PageResult;

import com.ldt.DOMAIN.TypeProduct;
import com.ldt.REPOSITORY.SizeRepository;
import com.ldt.REPOSITORY.TypeProductRepository;

import com.ldt.SERVICE.TypeProductService;

@Service
public class TypeProductServiceimpl implements TypeProductService {

    @Autowired
    TypeProductRepository typeProductRepository;

    @Override
    public PageResult<TypeProduct> getTypeProducts(int page, int size) {

        // xác định trang hiện tại và kích thước của trang muốn lấy.
        Pageable pageable = PageRequest.of(page, size);

        Page<TypeProduct> typeProduct;

        typeProduct = typeProductRepository.findAll(pageable);
        // products.getContent() là một phương thức của đối tượng Page<Product>
        // trả về danh sách các sản phẩm trên trang hiện tại của kết quả phân trang.
        return new PageResult<>(typeProduct.getContent(), typeProduct.getTotalPages());
    }

}
