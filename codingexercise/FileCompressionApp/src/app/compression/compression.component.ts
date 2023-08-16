import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-compression',
  templateUrl: './compression.component.html',
  styleUrls: ['./compression.component.scss']
})
export class CompressionComponent {
  selectedFiles: File[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
  }

  compressAndUpload() {
    if (this.selectedFiles.length === 0) {
      this.errorMessage = 'Please select files to upload and compress.';
      return;
    }

    const formData = new FormData();
    for (const file of this.selectedFiles) {
      formData.append('files', file, file.name);
    }

    this.http.post('http://localhost:8080/api/compress', formData, { responseType: 'blob' }).subscribe(
      response => {
        this.successMessage = 'Files compressed and uploaded successfully.';
        this.errorMessage = '';

        // Create a blob URL for the downloaded file
        const blob = new Blob([response], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);

        // Create a download link and click it programmatically
        const link = document.createElement('a');
        link.href = url;
        link.download = 'compressed_files.zip';
        link.click();

        // Clean up the blob URL
        window.URL.revokeObjectURL(url);
      },
      error => {
        this.successMessage = '';
        this.errorMessage = 'An error occurred while uploading and compressing files.';
      }
    );
  }
}
