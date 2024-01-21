package com.ldt.SERVICE;

import com.ldt.DOMAIN.PageResult;
import com.ldt.DOMAIN.Product;
import com.ldt.DOMAIN.TypeProduct;

public interface ProductService {

	PageResult<Product> getProducts(int page, int size, String keyword);

	PageResult<Product> getProductsByTypeProduct(TypeProduct typeProduct, int page, int size);

	PageResult<Product> getProductsByCategory(Long categoryId, int page, int size);
}
