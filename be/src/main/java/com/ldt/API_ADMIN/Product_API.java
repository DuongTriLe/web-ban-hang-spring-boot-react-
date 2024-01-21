package com.ldt.API_ADMIN;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ldt.DOMAIN.Category;
import com.ldt.DOMAIN.PageResult;
import com.ldt.DOMAIN.Product;
import com.ldt.DOMAIN.ResponseObject;
import com.ldt.REPOSITORY.CategoryRepository;
import com.ldt.REPOSITORY.ProductRepository;
import com.ldt.SERVICE.IStorageService;
import com.ldt.SERVICE.ProductService;

@CrossOrigin("*")
@RestController
@RequestMapping("admin/products")
public class Product_API {

	@Autowired
	ProductRepository productRepository;

	@Autowired
	IStorageService storageService;

	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	private ProductService productService;

	@GetMapping("")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<PageResult<Product>> getProducts(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size,
			@RequestParam(value = "keyword", required = false) String keyword) {
		PageResult<Product> products = productService.getProducts(page, size, keyword);
		return ResponseEntity.ok(products);
	}

	@GetMapping("/list")
	@PreAuthorize("hasRole('ADMIN')")
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Optional<Product>> getProductById(@PathVariable Long id) {
		Optional<Product> product = productRepository.findById(id);
		if (product.isPresent()) {
			return ResponseEntity.ok(product);
		}
		return ResponseEntity.notFound().build();
	}

	@PostMapping("")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseObject> createProduct(
			@RequestParam("file") MultipartFile file,
			@RequestParam("name") String name, @RequestParam("quantity") int quantity,
			@RequestParam("unitPrice") int unitPrice, @RequestParam("description") String description,
			@RequestParam("discount") int discount, @RequestParam("xuatXu") String xuatXu,
			@RequestParam("categoryId") Long categoryId) {

		try {
			String generatedFileName = storageService.storageFile(file);

			Product product = new Product();
			product.setName(name);
			product.setQuantity(quantity);
			product.setUnitPrice(unitPrice);
			product.setImage(generatedFileName);
			product.setDescription(description);
			product.setDiscount(discount);
			product.setXuatXu(xuatXu);
			product.setEnteredDate(new Date());

			// Lấy đối tượng Category từ cơ sở dữ liệu
			Category category = categoryRepository.findById(categoryId)
					.orElseThrow(() -> new RuntimeException("Category not found"));

			product.setCategory(category);
			// Lưu đối tượng Product vào cơ sở dữ liệu
			Product savedProduct = productRepository.save(product);

			return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "up thành công", savedProduct));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject("ok", e.getMessage(), ""));
		}

	}

	@PutMapping("/update/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseObject> updateProduct(@PathVariable("id") Long id,
			@RequestParam(name = "file", required = false) MultipartFile file,
			@RequestParam(name = "name", required = false) String name,
			@RequestParam(name = "quantity", required = false) Integer quantity,
			@RequestParam(name = "unitPrice", required = false) Integer unitPrice,
			@RequestParam(name = "description", required = false) String description,
			@RequestParam(name = "discount", required = false) Integer discount,
			@RequestParam(name = "xuatXu", required = false) String xuatXu,
			@RequestParam(name = "categoryId", required = false) Long categoryId) {
		try {
			Product product = productRepository.findById(id)
					.orElseThrow(() -> new RuntimeException("Product not found"));

			if (file != null) {
				String generatedFileName = storageService.storageFile(file);
				product.setImage(generatedFileName);
			}

			if (name != null) {
				product.setName(name);
			}

			if (quantity != null) {
				product.setQuantity(quantity);
			}

			if (unitPrice != null) {
				product.setUnitPrice(unitPrice);
			}

			if (description != null) {
				product.setDescription(description);
			}

			if (discount != null) {
				product.setDiscount(discount);
			}

			if (xuatXu != null) {
				product.setXuatXu(xuatXu);
			}

			if (categoryId != null) {
				Category category = categoryRepository.findById(categoryId)
						.orElseThrow(() -> new RuntimeException("Category not found"));
				product.setCategory(category);
			}

			Product updatedProduct = productRepository.save(product);

			return ResponseEntity.ok(new ResponseObject("success", "Product updated successfully", updatedProduct));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ResponseObject("error", "Failed to update product: " + e.getMessage(), null));
		}
	}

	@DeleteMapping("delete/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseObject> deleteProduct(@PathVariable Long id) {
		Optional<Product> productOptional = productRepository.findById(id);
		if (productOptional.isPresent()) {
			Product product = productOptional.get();
			// storageService.deleteImage(product.getImage());
			// Xóa sản phẩm khỏi cơ sở dữ liệu
			productRepository.delete(product);
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "delete product Thành công", ""));
		}
		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Không tìm thấy product", ""));

	}
}
