package com.ldt.API_USER;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ldt.DOMAIN.Category;
import com.ldt.DOMAIN.Color;
import com.ldt.DOMAIN.PageResult;
import com.ldt.DOMAIN.Product;
import com.ldt.DOMAIN.Size;
import com.ldt.DOMAIN.TypeProduct;
import com.ldt.REPOSITORY.CategoryRepository;
import com.ldt.REPOSITORY.ColorRepository;
import com.ldt.REPOSITORY.ProductRepository;
import com.ldt.REPOSITORY.SizeRepository;
import com.ldt.REPOSITORY.TypeProductRepository;
import com.ldt.SERVICE.ProductService;

@CrossOrigin("*")
@RestController
@RequestMapping("home")
public class ListProduct_API {

    @Autowired
    TypeProductRepository typeProductRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ColorRepository colorRepository;

    @Autowired
    SizeRepository sizeRepository;

    @Autowired
    private ProductService productService;

    @GetMapping("xuatxu")
    public List<String> getAllXuatXu() {
        return productRepository.findAllXuatXus();
    }

    @GetMapping("category/list")
    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    @GetMapping("typeproduct/{idTypeProduct}")
    public List<Category> getCategoriesByTypeProduct(@PathVariable Long idTypeProduct) {
        return categoryRepository.findByidTypeProduct_Id(idTypeProduct);
    }

    @GetMapping("product/list")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("typeproduct/list")
    public List<TypeProduct> getAllTypeProduct() {
        return typeProductRepository.findAll();
    }

    @GetMapping("product/detail/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            return ResponseEntity.ok(product);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("product/color/{id}")
    public List<Color> getColorById(@PathVariable Long id) {
        return colorRepository.findByColorProductProductId(id);
    }

    @GetMapping("product/size/{id}")
    public List<Size> getCSizeyId(@PathVariable Long id) {
        return sizeRepository.findBySizeProductProductId(id);
    }

    @GetMapping("product/typeproduct")
    public ResponseEntity<PageResult<Product>> getProducts(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size,
            @RequestParam("typeProductId") Long typeProductId) {

        TypeProduct typeProduct = typeProductRepository.findById(typeProductId)
                .orElseThrow(() -> new IllegalArgumentException("TypeProduct not found with id: " + typeProductId));

        PageResult<Product> products = productService.getProductsByTypeProduct(typeProduct, page, size);
        return ResponseEntity.ok(products);
    }

    @GetMapping("product/category")
    public ResponseEntity<PageResult<Product>> getProductsByCategory(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size,
            @RequestParam("categoryId") Long categoryId) {

        PageResult<Product> products = productService.getProductsByCategory(categoryId, page, size);
        return ResponseEntity.ok(products);
    }

}
