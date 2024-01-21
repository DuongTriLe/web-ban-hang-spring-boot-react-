package com.ldt.jwt;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
// giao diện AuthenticationEntryPoint, một giao diện trong Spring Security được
// sử dụng để xử lý các ngoại lệ xác thực.
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    // AuthEntryPointJwt định nghĩa một phương thức commence() để xử lý một ngoại lệ
    // xác thực. Khi xác thực thất bại, phương thức này được gọi để tạo phản hồi trả
    // về lỗi

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException)
            throws IOException, ServletException {

        // đoạn mã ghi lại thông báo lỗi không được xác thực vào bộ ghi log.
        logger.error("Unauthorized error: {}", authException.getMessage());

        // nội dung của phản hồi là MediaType.APPLICATION_JSON_VALUE, tức là một đối
        // tượng JSON
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        // HttpServletResponse.SC_UNAUTHORIZED, tức là mã trạng thái 401 Unauthorized.
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        final Map<String, Object> body = new HashMap<>();
        // Đối tượng body chứa các khóa như "status" (mã trạng thái), "error" (lỗi),
        // "message" (thông báo lỗi), và "path" (đường dẫn của yêu cầu).
        body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
        body.put("error", "Unauthorized");
        body.put("message", authException.getMessage());
        body.put("path", request.getServletPath());

        // đoạn mã sử dụng đối tượng ObjectMapper để chuyển đổi đối tượng body thành
        // định dạng JSON và ghi nó vào luồng đầu ra của response.
        final ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(response.getOutputStream(), body);
    }

}
