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

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ldt.DOMAIN.Size;
import com.ldt.DOMAIN.PageResult;
import com.ldt.DOMAIN.Product;
import com.ldt.DOMAIN.ResponseObject;

import com.ldt.REPOSITORY.SizeRepository;
import com.ldt.REPOSITORY.ProductRepository;

import com.ldt.SERVICE.SizeService;

@CrossOrigin("*")
@RestController
@RequestMapping("admin/size")
public class Size_API {

	@Autowired
	SizeRepository SizeRepository;

	@Autowired
	SizeService SizeService;

	@Autowired
	ProductRepository productRepository;

	@GetMapping("")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<PageResult<Size>> getCategorys(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size) {
		PageResult<Size> Sizes = SizeService.getSize(page, size);
		return ResponseEntity.ok(Sizes);
	}

	@GetMapping("list")
	@PreAuthorize("hasRole('ADMIN')")
	public List<Size> getAllProducts() {
		return SizeRepository.findAll();
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Optional<Size>> getCategoryById(@PathVariable Long id) {
		Optional<Size> Size = SizeRepository.findById(id);
		if (Size.isPresent()) {
			return ResponseEntity.ok(Size);
		}
		return ResponseEntity.notFound().build();
	}

	@PostMapping("")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseObject> createCategory(@RequestParam("name") String name,
			@RequestParam("SizeProduct") long SizeProduct) {
		try {
			Size Size = new Size();
			Size.setName(name);

			Product product = productRepository.findById(SizeProduct)
					.orElseThrow(() -> new RuntimeException("Product not found"));

			Size.setSizeProduct(product);

			Size saveSize = SizeRepository.save(Size);

			return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("ok", "up thành công", saveSize));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject("ok", e.getMessage(), ""));
		}

	}

	@PutMapping("/update/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseObject> updateProduct(@PathVariable Long id, @RequestParam("name") String name,
			@RequestParam("SizeProduct") long SizeProduct) {
		try {
			Size existingSize = SizeRepository.findById(id).orElse(null);

			// Nếu không tìm thấy danh mục, trả về mã lỗi 404 Not Found
			if (existingSize == null) {
				return ResponseEntity.notFound().build();
			}

			Product prodcut = productRepository.findById(SizeProduct)
					.orElseThrow(() -> new RuntimeException("prodcut not found"));

			// Cập nhật thông tin của danh mục
			existingSize.setName(name);
			existingSize.setSizeProduct(prodcut);

			Size updatedCategory = SizeRepository.save(existingSize);

			return ResponseEntity.ok(new ResponseObject("success", "Category updated successfully", updatedCategory));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ResponseObject("error", "Failed to update product: " + e.getMessage(), null));
		}
	}

	@DeleteMapping("delete/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseObject> deleteProduct(@PathVariable Long id) {

		Optional<Size> opt = SizeRepository.findById(id);
		if (opt.isPresent()) {
			Size category = opt.get();

			SizeRepository.delete(category);
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "delete product Thành công", ""));
		}
		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Không tìm thấy product", ""));

	}

}
