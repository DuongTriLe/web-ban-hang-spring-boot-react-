package com.ldt.SERVICE;


import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;

public interface VNPayService {
    String createPayment(Long amount, HttpServletRequest req) throws UnsupportedEncodingException;
}
