package com.ldt.SERVICE;

import com.ldt.DOMAIN.Order;
import com.ldt.DOMAIN.PageResult;
import com.ldt.DOMAIN.Size;

public interface OrderService {
    PageResult<Order> getorder(int page, int size);

    PageResult<Order> getorderByUser(int page, int size);
}
