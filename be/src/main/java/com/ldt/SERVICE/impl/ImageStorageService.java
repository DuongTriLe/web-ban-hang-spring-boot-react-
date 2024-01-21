package com.ldt.SERVICE.impl;

import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import com.ldt.SERVICE.IStorageService;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class ImageStorageService implements IStorageService {

	// Khai báo biến hằng 'storageFolder' kiểu 'Path', biểu diễn đường dẫn đến thư
	// mục lưu trữ.

	// Đường dẫn thư mục được xây dựng bằng phương thức Paths.get() với đường dẫn
	// tương đối "be/uploads".
	private final Path storageFolder = Paths.get("be", "uploads");

	// constructor
	public ImageStorageService() {
		try {
			// sử dụng để tạo thư mục lưu trữ hình ảnh nếu nó chưa tồn tại
			Files.createDirectories(storageFolder);
		} catch (Exception e) {

		}
	}

	private boolean isImageFile(MultipartFile file) {

		// getOriginalFilename() của đối tượng MultipartFile để lấy tên file gốc của tệp
		// phương thức getExtension() của FilenameUtils được sử dụng để lấy phần mở rộng
		// của tệp tin, tức là phần sau dấu chấm trong tên file.
		String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());

		// asList() của lớp Arrays được sử dụng để tạo ra một danh sách từ một mảng các
		// phần tử.
		// mảng các phần tử được tạo ra bao gồm hai chuỗi "png" và "jpg"
		// phương thức asList() được gọi trên mảng này để tạo ra một danh sách.
		return Arrays.asList(new String[] { "png", "jpg", "jfif" }).contains(fileExtension.trim().toLowerCase());
	}

	@Override
	public String storageFile(MultipartFile file) {
		try {

			if (file.isEmpty()) {
				// câu lệnh trong Java được sử dụng để ném ra một ngoại lệ (exception) tại thời
				// điểm thực thi
				throw new RuntimeException("File empty");
			}

			if (!isImageFile(file)) {
				throw new RuntimeException("Bạn chỉ úp load file png , jpg");
			}

			// file must be <= 5MB
			float fileSize = file.getSize() / 1_000_000.0f;
			if (fileSize > 5.0f) {
				throw new RuntimeException("File size <= 5MB");
			}

			// Biến fileExtension lấy phần mở rộng của tệp tin
			String fileExtention = FilenameUtils.getExtension(file.getOriginalFilename());

			// Phương thức UUID.randomUUID() được sử dụng để tạo ra một định danh ngẫu nhiên
			// (UUID) duy nhất
			// toString() được sử dụng để chuyển đổi UUID thành chuỗi
			// phương thức replace("-", "") được sử dụng để xóa các dấu gạch ngang (-) trong
			// chuỗi UUID
			String generatedFilename = UUID.randomUUID().toString().replace("-", "");

			generatedFilename = generatedFilename + "." + fileExtention;

			// resolve() của đối tượng Path để nối đường dẫn storageFolder với tên tệp tin
			// mới được tạo ra
			// phương thức normalize() được sử dụng để chuẩn hóa đường dẫn, loại bỏ các ký
			// tự đặc biệt
			// toAbsolutePath() được sử dụng để chuyển đổi đường dẫn tương đối thành đường
			// dẫn tuyệt đối
			// Paths.get(generatedFilename) để tạo ra đối tượng Path mới đại diện cho tên
			// file được tạo ra ngẫu nhiên.
			Path destinationFilePath = this.storageFolder.resolve(Paths.get(generatedFilename)).normalize()
					.toAbsolutePath();

			// phương thức getParent() của đối tượng Path để lấy đường dẫn tới thư mục chứa
			// tệp tin (destinationFilePath)
			if (!destinationFilePath.getParent().equals(this.storageFolder.toAbsolutePath())) {
				throw new RuntimeException("cannot store file outside current derectory");
			}

			// sao chép nội dung của một tệp (file) vào một đường dẫn đích
			try (InputStream inputStream = file.getInputStream()) {
				Files.copy(inputStream, destinationFilePath, StandardCopyOption.REPLACE_EXISTING);
			}

			return generatedFilename;
		} catch (Exception e) {
			throw new RuntimeException("Faile to store file", e);
		}
	}

	@Override
	public Stream<Path> loadAll() {
		try {
			// Files.walk() để liệt kê tất cả các tệp tin và thư mục trong thư mục lưu trữ
			// của ứng dụng
			// bắt đầu từ thư mục gốc (this.storageFolder). Tham số thứ hai của phương thức
			// walk() là một số nguyên, chỉ định độ sâu tối đa của cây thư mục được liệt kê.
			return Files.walk(this.storageFolder, 1)
					// filter() để loại bỏ các đường dẫn không hợp lệ khỏi danh sách tệp tin và thư
					// mục được liệt kê.
					.filter(path -> !path.equals(this.storageFolder) && !path.toString().contains("._"))
					// map() để chuyển đổi các đường dẫn tuyệt đối thành các đường dẫn tương đối
					.map(this.storageFolder::relativize);
		} catch (IOException e) {
			throw new RuntimeException("Failed to load stored files", e);
		}
	}

	@Override
	public Resource loadAsResource(String filename) {
		try {
			Path file = storageFolder.resolve(filename);
			Resource resource = new UrlResource(file.toUri());

			if (resource.exists() || resource.isReadable()) {
				return resource;
			} else {
				throw new RuntimeException("Could not read file: " + filename);
			}
		} catch (MalformedURLException e) {
			throw new RuntimeException("Could not read file: " + filename, e);
		}
	}

	@Override
	// đọc nội dung của một tệp tin được lưu trữ trong thư mục lưu trữ của ứng dụng.
	public byte[] readFileContent(String filenanme) {
		try {
			// resolve() để nối đường dẫn của thư mục lưu trữ với tên tệp cần đọc.
			Path file = storageFolder.resolve(filenanme);

			// đối tượng UrlResource để tạo một đối tượng Resource từ đường dẫn của tệp cần
			// đọc.
			// Resource được sử dụng để truy cập và thao tác với các tài nguyên này.
			Resource resource = new UrlResource(file.toUri());

			// Kiểm tra xem tệp cần đọc có tồn tại và có thể đọc được không
			if (resource.exists() || resource.isReadable()) {
				// getInputStream() của đối tượng Resource để lấy đối tượng InputStream của tệp
				// cần đọc.
				// StreamUtils để đọc nội dung của InputStream và trả về dưới dạng một mảng
				// byte.
				byte[] bytes = StreamUtils.copyToByteArray(resource.getInputStream());
				return bytes;
			} else {
				throw new RuntimeException(
						"Could not read file: " + filenanme);
			}
		} catch (IOException exception) {
			throw new RuntimeException("Could not read file: " + filenanme, exception);
		}
	}

	@Override
	public void deleteImage(String filename) {
		try {
			Path imagePath = storageFolder.resolve(filename);
			Files.deleteIfExists(imagePath);
		} catch (IOException e) {
			throw new RuntimeException("Failed to delete image: " + filename, e);
		}
	}

	@Override
	public void deleteAllFiles() {
		// TODO Auto-generated method stub

	}

}
