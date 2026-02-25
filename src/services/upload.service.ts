import { api } from '@/lib/api-client';

export interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    url: string;
    key: string;
    mimetype: string;
    size: number;
  };
}

export const uploadService = {
  /**
   * Upload a single file to S3
   * @param file The file to upload
   * @returns The S3 upload data
   */
  uploadSingle: async (file: File): Promise<UploadResponse['data']> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<UploadResponse>('/upload/single', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // api-client unwrap() usually returns the 'data' part if the response has a data property
    // Looking at common patterns in this project, api.post might return the whole response or just data.
    // Let's assume it returns the structured response based on the type helper.
    return response.data;
  },

  /**
   * Upload multiple files to S3
   * @param files Array of files to upload
   * @returns Array of S3 upload data
   */
  uploadMultiple: async (files: File[]): Promise<UploadResponse['data'][]> => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    const response = await api.post<any>('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }
};
