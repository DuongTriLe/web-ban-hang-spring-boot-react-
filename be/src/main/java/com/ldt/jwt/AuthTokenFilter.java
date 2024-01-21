package com.ldt.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ldt.SERVICE.impl.UserDetailsServiceImpl;

// Nhiệm vụ của lớp này là xác thực token JWT (JSON Web Token) trong mỗi yêu cầu đến.
public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    // Phương thức doFilterInternal() được ghi đè từ lớp cha OncePerRequestFilter và
    // được gọi mỗi khi yêu cầu đến
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            // Phương thức parseJwt() được sử dụng để trích xuất token JWT từ tiêu đề
            // Authorization của yêu cầu. Token được trích xuất bằng cách kiểm tra tiêu đề
            // có chứa chuỗi "Bearer " và sau đó lấy phần còn lại của chuỗi làm token JWT.
            String jwt = parseJwt(request);

            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {

                // jwtUtils.getUserNameFromJwtToken() để lấy tên người dùng từ token JWT
                String username = jwtUtils.getUserNameFromJwtToken(jwt);

                // tải thông tin chi tiết về người dùng từ cơ sở dữ liệu dựa trên tên người
                // dùng.
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // Tạo một đối tượng UsernamePasswordAuthenticationToken với thông tin người
                // dùng, không có mật khẩu (vì đây là xác thực dựa trên token), và các quyền
                // (authorities) của người dùng.
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());

                // được sử dụng để thiết lập chi tiết xác thực (authentication details) cho đối
                // tượng authentication. Trong Spring Security, thông tin chi tiết xác thực giúp
                // lưu trữ các thông tin bổ sung về yêu cầu xác thực, chẳng hạn như địa chỉ IP,
                // cổng và thông tin khác
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // SecurityContextHolder là một lớp trong Spring Security được sử dụng để lưu
                // trữ thông tin xác thực của người dùng hiện tại trong quá trình xử lý yêu cầu
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }

        // filterChain.doFilter(request, response) được gọi để tiếp tục xử lý yêu cầu
        // bởi các bộ lọc và bộ xử lý (handlers) khác trong chuỗi bộ lọc (filter chain).
        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) {
        // const response = await axios.get('http://example.com/api/user/profile', {
        // headers: {
        // Authorization: `Bearer ${token}`,
        // },
        // });

        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }

        return null;
    }
}
