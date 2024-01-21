package com.ldt.SERVICE;

import com.ldt.DOMAIN.Color;
import com.ldt.DOMAIN.PageResult;

public interface ColorService {
    PageResult<Color> getColor(int page, int size);
}
