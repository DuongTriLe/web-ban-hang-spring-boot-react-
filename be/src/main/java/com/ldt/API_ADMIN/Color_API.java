package com.ldt.API_ADMIN;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ldt.DOMAIN.Category;
import com.ldt.DOMAIN.Color;
import com.ldt.DOMAIN.PageResult;
import com.ldt.DOMAIN.Product;
import com.ldt.DOMAIN.ResponseObject;
import com.ldt.REPOSITORY.CategoryRepository;
import com.ldt.REPOSITORY.ColorRepository;
import com.ldt.REPOSITORY.ProductRepository;
import com.ldt.SERVICE.CategoryService;
import com.ldt.SERVICE.ColorService;
import com.ldt.SERVICE.ProductService;

@CrossOrigin("*")
@RestController
@RequestMapping("admin/color")
public class Color_API {

	@Autowired
	ColorRepository colorRepository;

	@Autowired
	ColorService colorService;

	@Autowired
	ProductRepository productRepository;

	@GetMapping("")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<PageResult<Color>> getCategorys(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size) {
		PageResult<Color> Colors = colorService.getColor(page, size);
		return ResponseEntity.ok(Colors);
	}

	@GetMapping("list")
	@PreAuthorize("hasRole('ADMIN')")
	public List<Color> getAllProducts() {
		return colorRepository.findAll();
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Optional<Color>> getCategoryById(@PathVariable Long id) {
		Optional<Color> Color = colorRepository.findById(id);
		if (Color.isPresent()) {
			return ResponseEntity.ok(Color);
		}
		return ResponseEntity.notFound().build();
	}

	@PostMapping("")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseObject> createCategory(@RequestParam("name") String name,
			@RequestParam("colorProduct") long colorProduct) {
		try {
			Color color = new Color();
			color.setName(name);

			Product product = productRepository.findById(colorProduct)
					.orElseThrow(() -> new RuntimeException("Product not found"));

			color.setColorProduct(product);

			Color saveColor = colorRepository.save(color);

			return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "up thành công", saveColor));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject("ok", e.getMessage(), ""));
		}

	}

	@PutMapping("/update/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseObject> updateProduct(@PathVariable Long id, @RequestParam("name") String name,
			@RequestParam("colorProduct") long colorProduct) {
		try {
			Color existingColor = colorRepository.findById(id).orElse(null);

			// Nếu không tìm thấy danh mục, trả về mã lỗi 404 Not Found
			if (existingColor == null) {
				return ResponseEntity.notFound().build();
			}

			Product prodcut = productRepository.findById(colorProduct)
					.orElseThrow(() -> new RuntimeException("prodcut not found"));

			// Cập nhật thông tin của danh mục
			existingColor.setName(name);
			existingColor.setColorProduct(prodcut);

			Color updatedCategory = colorRepository.save(existingColor);

			return ResponseEntity.ok(new ResponseObject("success", "Category updated successfully", updatedCategory));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ResponseObject("error", "Failed to update product: " + e.getMessage(), null));
		}
	}

	@DeleteMapping("delete/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseObject> deleteProduct(@PathVariable Long id) {

		Optional<Color> opt = colorRepository.findById(id);
		if (opt.isPresent()) {
			Color category = opt.get();

			colorRepository.delete(category);
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "delete product Thành công", ""));
		}
		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Không tìm thấy product", ""));

	}

}
