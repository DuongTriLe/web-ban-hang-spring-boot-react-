package com.ldt.API_USER;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ldt.DOMAIN.CartItem;
import com.ldt.DOMAIN.Color;
import com.ldt.DOMAIN.Order;
import com.ldt.DOMAIN.OrderDetail;
import com.ldt.DOMAIN.PageResult;
import com.ldt.DOMAIN.Product;
import com.ldt.DOMAIN.User;
import com.ldt.REPOSITORY.CartItemRepository;
import com.ldt.REPOSITORY.OrderDetailRepository;
import com.ldt.REPOSITORY.OrderRepository;
import com.ldt.REPOSITORY.ProductRepository;
import com.ldt.REPOSITORY.UserRepository;
import com.ldt.SERVICE.OrderService;
import com.ldt.SERVICE.VNPayService;

@CrossOrigin("*")
@RestController
@RequestMapping("home/cart")
public class Cart {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderDetailRepository orderDetailRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    VNPayService vnpayService;

    @Autowired
    HttpServletRequest request;

    @Autowired
    OrderService orderService;

    @GetMapping("/totalPrice")
    public Integer getTotalPrice() {
        return cartItemRepository.getTotalPrice();
    }

    @GetMapping("list")
    public List<CartItem> getAllProducts() {
        return cartItemRepository.findAll();
    }

    @GetMapping("/count")
    public int count() {
        return cartItemRepository.findAll().size();
    }

    @DeleteMapping("/delete-all")
    public String deleteAll() {
        cartItemRepository.deleteAll();
        return "Deleted all cart items";
    }

    @PostMapping("add")
    public ResponseEntity<String> addToCart(@RequestParam("productId") Long productId,
            @RequestParam("color") String color, @RequestParam("size") String size) {

        // Lấy sản phẩm từ database bằng ID
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {

            Product product = optionalProduct.get();
            CartItem cartItem = new CartItem();

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            List<CartItem> existingItems = cartItemRepository.findByCartItemAndSizeAndColor(product, size, color);

            if (!existingItems.isEmpty()) {
                // Sản phẩm đã tồn tại, tăng số lượng lên
                CartItem existingItem = existingItems.get(0);
                existingItem.setQuantity(existingItem.getQuantity() + 1);
                cartItemRepository.save(existingItem);
            } else {
                // Sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
                cartItem.setCartItem(product);
                cartItem.setColor(color);
                cartItem.setSize(size);
                cartItem.setQuantity(1);
                cartItem.setImage(product.getImage());
                cartItem.setName(product.getName());
                cartItem.setUnitPrice(product.getUnitPrice());

                cartItemRepository.save(cartItem);
            }

            return ResponseEntity.ok("Sản phẩm đã được thêm vào giỏ hàng");
        } else {
            return ResponseEntity.badRequest().body("Không tìm thấy sản phẩm");
        }
    }

    @PutMapping("update")
    public ResponseEntity<String> updateToCart(@RequestParam("productId") Long productId,
            @RequestParam("color") String color, @RequestParam("size") String size,
            @RequestParam("quantity") int quantity) {

        // Lấy sản phẩm từ database bằng ID
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {

            Product product = optionalProduct.get();

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            List<CartItem> existingItems = cartItemRepository.findByCartItemAndSizeAndColor(product, size, color);

            if (!existingItems.isEmpty()) {
                // Sản phẩm đã tồn tại, tăng số lượng lên
                CartItem existingItem = existingItems.get(0);
                existingItem.setQuantity(quantity);
                existingItem.setColor(color);
                existingItem.setSize(size);

                cartItemRepository.save(existingItem);
            }

            return ResponseEntity.ok("Sản phẩm đã được update vào giỏ hàng");
        } else {
            return ResponseEntity.badRequest().body("Không tìm thấy sản phẩm");
        }
    }

    @DeleteMapping("remove")
    public ResponseEntity<String> removeFromCart(@RequestParam("productId") Long productId,
            @RequestParam("color") String color, @RequestParam("size") String size) {

        // Lấy sản phẩm từ database bằng ID
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {

            Product product = optionalProduct.get();

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            List<CartItem> existingItems = cartItemRepository.findByCartItemAndSizeAndColor(product, size, color);

            if (!existingItems.isEmpty()) {
                // Sản phẩm đã tồn tại trong giỏ hàng, xóa sản phẩm
                CartItem existingItem = existingItems.get(0);

                cartItemRepository.delete(existingItem);
            }
            return ResponseEntity.ok("Sản phẩm đã được xóa khỏi giỏ hàng");
        } else {
            return ResponseEntity.badRequest().body("Không tìm thấy sản phẩm");
        }
    }

    @PostMapping("checkout")
    public String checkout(
            @RequestParam("phone") String phone,
            @RequestParam("address") String address,
            @RequestParam("paymentMethod") String paymentMethod,
            @RequestParam("total") Long total) throws UnsupportedEncodingException {

        String redirectUrl = "";
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        Optional<User> currentUser = userRepository.findByUsername(currentUsername);

        if (currentUser.isPresent()) {

            // Create a new order object
            Order order = new Order();
            order.setUsername(currentUser.get());
            order.setAddress(address);
            order.setPhone(phone);
            order.setPaymentMethod(paymentMethod);
            order.setOrderDate(new Date());
            // order.setUsername(userDetails.getUsername());
            order.setTotal(total);
            orderRepository.save(order);

            // Get list of cart items for the user
            List<CartItem> cartItems = cartItemRepository.findAll();

            // Create order detail objects and save them to the database
            for (CartItem cartItem : cartItems) {
                Optional<Product> optionalProduct = productRepository
                        .findById(cartItem.getCartItem().getProductId());

                if (optionalProduct.isPresent()) {
                    Product product = optionalProduct.get();

                    OrderDetail orderDetail = new OrderDetail();
                    orderDetail.setOrder(order);
                    orderDetail.setProduct(product);
                    orderDetail.setQuantity(cartItem.getQuantity());
                    orderDetail.setUnitPrice(
                            (product.getUnitPrice() - (product.getUnitPrice() * product.getDiscount() / 100)));
                    orderDetail.setColor(cartItem.getColor());
                    orderDetail.setSize(cartItem.getSize());
                    orderDetailRepository.save(orderDetail);
                }
            }

            cartItemRepository.deleteAll(cartItems);

            System.out.println("tong tien: " + total);
            if (paymentMethod.equals("vnpay")) {
                redirectUrl = vnpayService.createPayment(total, request);
            } else {
                redirectUrl = "http://localhost:3000/";
            }
            System.out.println("redirectUrl: " + redirectUrl);

        }

        return redirectUrl;

    }

    @GetMapping("/historyorder")
    public ResponseEntity<PageResult<Order>> getorderByUser(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        PageResult<Order> order = orderService.getorderByUser(page, size);
        return ResponseEntity.ok(order);
    }

}
