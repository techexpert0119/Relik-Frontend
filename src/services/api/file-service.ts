import { api } from '@/services/api/api';
import { AxiosResponse } from 'axios';
import IUploadedImageResponse from '@/data/dtos/uploaded-image-response';
import IUploadedFileResponse from '@/data/dtos/uploaded-file-response';

const controller = 'file';

export class FileService {
  static async uploadImage(image: File): Promise<IUploadedImageResponse> {
    const formData = new FormData();
    formData.append('file', image);

    return api
      .post(`${controller}/image`, formData)
      .then((res: AxiosResponse<IUploadedImageResponse>) => res.data);
  }

  static async uploadFile(file: File): Promise<IUploadedFileResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return api
      .post(`${controller}/file`, formData)
      .then((res: AxiosResponse<IUploadedFileResponse>) => res.data);
  }
}
