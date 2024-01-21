package com.ldt.SERVICE;

import com.ldt.DOMAIN.PageResult;
import com.ldt.DOMAIN.Size;

public interface SizeService {
    PageResult<Size> getSize(int page, int size);
}
