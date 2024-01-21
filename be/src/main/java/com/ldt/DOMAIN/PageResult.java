package com.ldt.DOMAIN;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageResult<T> {

    private List<T> items;
    private int totalPages;

    public PageResult(List<T> items, int totalPages) {
        this.items = items;
        this.totalPages = totalPages;
    }
}
