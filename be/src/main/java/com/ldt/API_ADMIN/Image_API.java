package com.ldt.API_ADMIN;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.core.io.Resource;
import com.ldt.SERVICE.IStorageService;

@RestController
@RequestMapping("display")
public class Image_API {

	@Autowired
	IStorageService storageService;

	// @GetMapping("/files/{fileName:.+}")
	// public ResponseEntity<byte[]> readDetailFile(@PathVariable String fileName) {
	// try {
	// byte[] bytes = storageService.readFileContent(fileName);
	// return ResponseEntity
	// .ok()
	// .contentType(MediaType.IMAGE_JPEG)
	// .body(bytes);
	// } catch (Exception exception) {
	// return ResponseEntity.noContent().build();
	// }
	// }

	@GetMapping("/files/{fileName:.+}")
	public ResponseEntity<Resource> serveFile(@PathVariable String fileName) {

		Resource file = storageService.loadAsResource(fileName);

		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(file);

	}
}
