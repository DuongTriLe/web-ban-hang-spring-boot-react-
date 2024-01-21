package com.ldt.SERVICE.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ldt.DOMAIN.PageResult;
import com.ldt.DOMAIN.Product;
import com.ldt.DOMAIN.TypeProduct;
import com.ldt.REPOSITORY.ProductRepository;
import com.ldt.SERVICE.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public PageResult<Product> getProducts(int page, int size, String keyword) {
        // xác định trang hiện tại và kích thước của trang muốn lấy.
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products;

        if (keyword != null && !keyword.isEmpty()) {
            products = productRepository.findByNameContaining(keyword, pageable);
        } else {
            products = productRepository.findAll(pageable);
        }

        // products.getContent() là một phương thức của đối tượng Page<Product>
        // trả về danh sách các sản phẩm trên trang hiện tại của kết quả phân trang.
        return new PageResult<>(products.getContent(), products.getTotalPages());
    }

    @Override
    public PageResult<Product> getProductsByTypeProduct(TypeProduct typeProduct, int page, int size) {
        // xác định trang hiện tại và kích thước của trang muốn lấy.
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products;

        products = productRepository.findByCategory_IdTypeProduct(typeProduct, pageable);

        // products.getContent() là một phương thức của đối tượng Page<Product>
        // trả về danh sách các sản phẩm trên trang hiện tại của kết quả phân trang.
        return new PageResult<>(products.getContent(), products.getTotalPages());
    }

    @Override
    public PageResult<Product> getProductsByCategory(Long categoryId, int page, int size) {
        // xác định trang hiện tại và kích thước của trang muốn lấy.
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products;

        products = productRepository.findByCategory_CategoryId(categoryId, pageable);

        // products.getContent() là một phương thức của đối tượng Page<Product>
        // trả về danh sách các sản phẩm trên trang hiện tại của kết quả phân trang.
        return new PageResult<>(products.getContent(), products.getTotalPages());
    }
}
