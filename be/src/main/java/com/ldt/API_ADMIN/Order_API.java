package com.ldt.API_ADMIN;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ldt.DOMAIN.Order;
import com.ldt.DOMAIN.OrderDetail;
import com.ldt.DOMAIN.PageResult;
import com.ldt.DOMAIN.Product;
import com.ldt.DOMAIN.Size;
import com.ldt.REPOSITORY.OrderDetailRepository;
import com.ldt.REPOSITORY.OrderRepository;
import com.ldt.SERVICE.OrderService;
import com.ldt.SERVICE.SizeService;

@CrossOrigin("*")
@RestController
@RequestMapping("admin/order")
public class Order_API {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderDetailRepository orderDetailRepository;

    @Autowired
    OrderService orderService;

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PageResult<Order>> getOrder(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        PageResult<Order> order = orderService.getorder(page, size);
        return ResponseEntity.ok(order);
    }

    @GetMapping("find/{orderId}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<OrderDetail> getAllOrderDetails(@PathVariable("orderId") Long orderId) {

        return orderDetailRepository.findByOrderOrderId(orderId);
    }

}
