package com.ldt.SERVICE;

import java.nio.file.Path;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface IStorageService {

	public String storageFile(MultipartFile file);

	public Stream<Path> loadAll();

	public byte[] readFileContent(String filenanme);

	public void deleteAllFiles();

	public void deleteImage(String filename);

	Resource loadAsResource(String filename);
}
