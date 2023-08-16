package com.example.codingexercise;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class FileCompressionController {
    @PostMapping("/compress")
    public ResponseEntity<byte[]> compressFiles(@RequestParam("files") MultipartFile[] files) {
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ZipOutputStream zipOutputStream = new ZipOutputStream(outputStream);

            for (MultipartFile file : files) {
                ZipEntry zipEntry = new ZipEntry(file.getOriginalFilename());
                zipOutputStream.putNextEntry(zipEntry);
                zipOutputStream.write(file.getBytes());
                zipOutputStream.closeEntry();
            }

            zipOutputStream.close();

            byte[] compressedBytes = outputStream.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentDispositionFormData("attachment", "compressed_files.zip");
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            return new ResponseEntity<>(compressedBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while compressing files.".getBytes());
        }
    }
}