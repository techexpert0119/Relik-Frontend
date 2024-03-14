import useApiMutation from '@/hooks/useApiMutation';
import { api } from '@/services/api/api';
import { AxiosResponse } from 'axios';
import { IFeature } from '@/data/dtos/feature';
import { IPageFeatureCreateDto } from '@/data/dtos/create-feature-dto';
import { ProcessContactFeatureDto } from '@/data/dtos/process-contact-feature.dto';

const controller = 'page-feature';
export const createPageFeature = () => useApiMutation(controller, 'post');

export class PageFeatureService {
  static controller = controller;

  static async updatePageSettings(
    id: string,
    body: { pageId: string; moveTo: number }
  ) {
    return api
      .patch(`${this.controller}/move`, body)
      .then((res: AxiosResponse<IFeature[]>) => res.data);
  }

  static async delete(id: string) {
    return api.delete(`page-feature/${id}`).then();
  }

  static async copy(featureId: string) {
    return api
      .post(`page-feature/copy`, { featureId: featureId })
      .then((res: AxiosResponse<IFeature[]>) => res.data);
  }

  static async create(body: IPageFeatureCreateDto) {
    return api
      .post(`${this.controller}`, body)
      .then((res: AxiosResponse<IFeature[]>) => res.data);
  }

  static async update(body: unknown) {
    return api
      .patch(`${this.controller}`, body)
      .then((res: AxiosResponse<IFeature>) => res.data);
  }

  static async processContact(body: ProcessContactFeatureDto) {
    return api
      .post(`${this.controller}/public/process/contact`, body)
      .then((res: AxiosResponse) => res.data);
  }
}
