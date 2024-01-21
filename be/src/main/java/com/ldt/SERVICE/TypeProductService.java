package com.ldt.SERVICE;

import com.ldt.DOMAIN.PageResult;
import com.ldt.DOMAIN.Size;
import com.ldt.DOMAIN.TypeProduct;

public interface TypeProductService {
    PageResult<TypeProduct> getTypeProducts(int page, int size);
}
