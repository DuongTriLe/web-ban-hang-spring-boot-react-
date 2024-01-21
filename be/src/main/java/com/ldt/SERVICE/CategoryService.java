package com.ldt.SERVICE;

import com.ldt.DOMAIN.Category;
import com.ldt.DOMAIN.PageResult;

public interface CategoryService {

	PageResult<Category> getCategorys(int page, int size, String keyword);

}
