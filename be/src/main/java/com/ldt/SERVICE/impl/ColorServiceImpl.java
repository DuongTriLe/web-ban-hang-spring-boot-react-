package com.ldt.SERVICE.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import com.ldt.DOMAIN.Color;
import com.ldt.DOMAIN.PageResult;


import com.ldt.REPOSITORY.ColorRepository;
import com.ldt.SERVICE.ColorService;



@Service
public class ColorServiceImpl implements ColorService {

    @Autowired
    private ColorRepository colorRepository;

    @Override
    public PageResult<Color> getColor(int page, int size) {
        // xác định trang hiện tại và kích thước của trang muốn lấy.
        Pageable pageable = PageRequest.of(page, size);
        Page<Color> colors; 
            colors = colorRepository.findAll(pageable);
        // products.getContent() là một phương thức của đối tượng Page<Product>
        // trả về danh sách các sản phẩm trên trang hiện tại của kết quả phân trang.
        return new PageResult<>(colors.getContent(), colors.getTotalPages());
    }
}
