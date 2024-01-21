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

import com.ldt.DOMAIN.Category;
import com.ldt.DOMAIN.PageResult;

import com.ldt.DOMAIN.ResponseObject;
import com.ldt.DOMAIN.TypeProduct;
import com.ldt.REPOSITORY.CategoryRepository;
import com.ldt.REPOSITORY.TypeProductRepository;
import com.ldt.SERVICE.CategoryService;

@CrossOrigin("*")
@RestController
@RequestMapping("admin/category")
public class Category_API {

	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	TypeProductRepository typeProductRepository;

	@GetMapping("")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<PageResult<Category>> getCategorys(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size,
			@RequestParam(value = "keyword", required = false) String keyword) {
		PageResult<Category> Categorys = categoryService.getCategorys(page, size, keyword);
		return ResponseEntity.ok(Categorys);
	}

	@GetMapping("list")
	@PreAuthorize("hasRole('ADMIN')")
	public List<Category> getAllProducts() {
		return categoryRepository.findAll();
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Optional<Category>> getCategoryById(@PathVariable Long id) {
		Optional<Category> Category = categoryRepository.findById(id);
		if (Category.isPresent()) {
			return ResponseEntity.ok(Category);
		}
		return ResponseEntity.notFound().build();
	}

	@PostMapping("")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseObject> createCategory(@RequestParam("name") String name,
			@RequestParam("idTypeProduct") Long idTypeProduct) {

		try {
			Category category = new Category();
			category.setName(name);

			TypeProduct typeProduct = typeProductRepository.findById(idTypeProduct)
					.orElseThrow(() -> new RuntimeException("TypeProduct not found"));

			category.setIdTypeProduct(typeProduct);

			Category savedCategory = categoryRepository.save(category);

			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("ok", "Thêm thành công", savedCategory));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ResponseObject("error", e.getMessage(), null));
		}
	}

	@PutMapping("/update/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseObject> updateProduct(
			@PathVariable Long id, @RequestParam("name") String name,
			@RequestParam("idTypeProduct") Long idTypeProduct) {
		try {
			Category existingCategory = categoryRepository.findById(id).orElse(null);

			// Nếu không tìm thấy danh mục, trả về mã lỗi 404 Not Found
			if (existingCategory == null) {
				return ResponseEntity.notFound().build();
			}

			// Cập nhật thông tin của danh mục
			existingCategory.setName(name);

			TypeProduct typeProduct = typeProductRepository.findById(idTypeProduct)
					.orElseThrow(() -> new RuntimeException("TypeProduct not found"));

			existingCategory.setIdTypeProduct(typeProduct);

			Category updatedCategory = categoryRepository.save(existingCategory);

			return ResponseEntity.ok(new ResponseObject("success", "Category updated successfully", updatedCategory));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ResponseObject("error", "Failed to update product: " + e.getMessage(), null));
		}
	}

	@DeleteMapping("delete/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseObject> deleteProduct(@PathVariable Long id) {

		Optional<Category> opt = categoryRepository.findById(id);
		if (opt.isPresent()) {
			Category category = opt.get();

			categoryRepository.delete(category);
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "delete product Thành công", ""));
		}
		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Không tìm thấy product", ""));

	}

}
