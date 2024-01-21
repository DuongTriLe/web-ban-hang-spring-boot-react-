package com.ldt.jwt;

import java.security.Key;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.ldt.SERVICE.impl.UserDetailsImpl;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
// Lớp JwtUtils trong ví dụ trên được sử dụng để tạo và xác thực token JWT trong
// ứng dụng Spring Boot.
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class); // để ghi log các thông báo.

    @Value("${bezkoder.app.jwtSecret}") // jwtSecret (Chuỗi bí mật cho chữ ký)
    private String jwtSecret;

    @Value("${bezkoder.app.jwtExpirationMs}") // jwtExpirationMs (Thời gian hết hạn của JWT)
    private int jwtExpirationMs;

    // Phương thức này được sử dụng để tạo token JWT dựa trên thông tin xác thực của
    // người dùng (Authentication)
    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Phương thức này trả về khóa (Key) được sử dụng để ký và xác thực token JWT
    // dựa trên jwtSecret được cung cấp trong tệp cấu hình.
    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    // Phương thức này giải mã token JWT và trích xuất tên người dùng từ nội dung
    // của token. Nó sử dụng key() để xác thực token và trả về tên người dùng
    // (subject) từ các khẳng định của token.
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}
