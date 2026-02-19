import { api } from '@/lib/api-client';

export interface UploadResponse {
  message: string;
  fileName: string;
  s3Location: string;
  contentType: string;
}

export const uploadService = {
  /**
   * Upload a file to S3 via the backend
   * @param file The file to upload
   * @returns The S3 location and other metadata
   */
  uploadFile: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<any>('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Based on the backend controller response:
    // res.status(201).json({
    //   status: 'success',
    //   data: {
    //     message: 'File uploaded successfully',
    //     fileName: finalFileName,
    //     s3Location: result.Location,
    //     contentType: finalContentType,
    //   },
    // });
    
    // Note: api.post uses unwrap() which returns res.data.data if success exists
    return response.s3Location;
  }
};
