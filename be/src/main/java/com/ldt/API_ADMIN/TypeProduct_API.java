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

import com.ldt.DOMAIN.TypeProduct;
import com.ldt.DOMAIN.PageResult;

import com.ldt.DOMAIN.ResponseObject;

import com.ldt.REPOSITORY.TypeProductRepository;
import com.ldt.SERVICE.TypeProductService;
import com.ldt.SERVICE.IStorageService;

@CrossOrigin("*") // cấu hình cho việc chia sẻ tài nguyên
@RestController
@RequestMapping("admin/typeproduct")
public class TypeProduct_API {

	@Autowired
	TypeProductRepository typeProductRepository;

	@Autowired
	private TypeProductService typeProductService;

	@Autowired
	IStorageService storageService;

	@GetMapping("")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<PageResult<TypeProduct>> getTypeProducts(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size) {
		PageResult<TypeProduct> typeProducts = typeProductService.getTypeProducts(page, size);
		return ResponseEntity.ok(typeProducts);
	}

	@GetMapping("list")
	@PreAuthorize("hasRole('ADMIN')")
	public List<TypeProduct> getAllProducts() {
		return typeProductRepository.findAll();
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Optional<TypeProduct>> getTypeProductById(@PathVariable Long id) {
		Optional<TypeProduct> TypeProduct = typeProductRepository.findById(id);
		if (TypeProduct.isPresent()) {
			return ResponseEntity.ok(TypeProduct);
		}
		return ResponseEntity.notFound().build();
	}

	@PostMapping("")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseObject> createTypeProduct(@RequestParam("file") MultipartFile file,
			@RequestParam("name") String name) {
		try {

			String generatedFileName = storageService.storageFile(file);

			TypeProduct typeProduct = new TypeProduct();
			typeProduct.setName(name);
			typeProduct.setImage(generatedFileName);

			TypeProduct saveTypeProduct = typeProductRepository.save(typeProduct);

			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("ok", "up thành công", saveTypeProduct));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject("ok", e.getMessage(), ""));
		}

	}

	@PutMapping("/update/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseObject> updateProduct(
			@PathVariable Long id,
			@RequestParam(name = "file", required = false) MultipartFile file,
			@RequestParam(name = "name", required = false) String name) {
		try {

			TypeProduct existingTypeProduct = typeProductRepository.findById(id).orElse(null);

			// Nếu không tìm thấy danh mục, trả về mã lỗi 404 Not Found
			if (existingTypeProduct == null) {
				return ResponseEntity.notFound().build();
			}

			if (file != null) {
				String generatedFileName = storageService.storageFile(file);
				existingTypeProduct.setImage(generatedFileName);
			}

			if (name != null) {
				existingTypeProduct.setName(name);
			}

			// Cập nhật thông tin của danh mục
			TypeProduct updatedTypeProduct = typeProductRepository.save(existingTypeProduct);

			return ResponseEntity
					.ok(new ResponseObject("success", "TypeProduct updated successfully", updatedTypeProduct));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ResponseObject("error", "Failed to update product: " + e.getMessage(), null));
		}
	}

	@DeleteMapping("delete/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseObject> deleteProduct(@PathVariable Long id) {

		Optional<TypeProduct> opt = typeProductRepository.findById(id);
		if (opt.isPresent()) {
			TypeProduct TypeProduct = opt.get();

			typeProductRepository.delete(TypeProduct);
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "delete product Thành công", ""));
		}
		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Không tìm thấy product", ""));

	}

}
