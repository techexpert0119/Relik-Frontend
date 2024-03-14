import useGeneralAPIQuery from '@/hooks/useGeneralQuery';
import useApiMutation from '@/hooks/useApiMutation';
import IGetAllPagesResult from '@/data/dtos/user-pages-dto';
import { api } from '@/services/api/api';
import { IGetPageWithFeatureResult } from '@/data/dtos/get-page-with-feature-result';
import { AxiosResponse } from 'axios';
import { IPageTheme } from '@/data/interfaces/page-theme';
import { UpdatePage } from '@/data/interfaces/update-page';
import { IPage } from '@/data/interfaces/page';
import { HeaderLayoutType } from '@/data/enums/header-layout-type';
import { IPageDocument } from '@/data/interfaces/document';

const controller = 'page';
export const getPagesOfUserQuery = (query?: {
  pageSize: string;
  pageNumber: string;
  searchText: string;
  status?: string;
  agencyId?: string;
}) => {
  const pageSize = query?.pageSize;
  const pageNumber = query?.pageNumber;
  return useGeneralAPIQuery<IGetAllPagesResult>(controller, {
    ...query,
    pageSize,
    pageNumber,
  });
};
export const postPageMutation = () =>
  useApiMutation<unknown, IPageTheme & IPageDocument>(controller, 'post');
export const updatePageStatusMutation = (id: string) =>
  useApiMutation(`${controller}/${id}`, 'patch');

export class PageService {
  static controller = 'page';

  static async getPublicPage(pageLink: string) {
    return api
      .get(`${this.controller}/public/${pageLink}`)
      .then((res: AxiosResponse<IGetPageWithFeatureResult>) => res.data);
  }

  static async getPageWithFeatures(id: string) {
    return api
      .get(`${this.controller}/${id}`)
      .then((res: AxiosResponse<IGetPageWithFeatureResult>) => res.data);
  }

  static async updatePageLink(id: string, body: { pageLink: string }) {
    return api
      .patch(`${this.controller}/${id}/link`, body)
      .then((res: AxiosResponse<IPage>) => res.data);
  }

  static async deactivatePage(id: string) {
    return api
      .post(`${this.controller}/${id}/deactivate`)
      .then((res: AxiosResponse<IPage>) => res.data);
  }

  static async updateTheme(pageId: string, body: IPageTheme) {
    return api
      .patch(`${this.controller}/theme/${pageId}`, body)
      .then((res: AxiosResponse<IPage>) => res.data);
  }

  static async updatePage(pageId: string, body: UpdatePage) {
    return api
      .patch(`${this.controller}/${pageId}`, body)
      .then((res: AxiosResponse<IPage>) => res.data);
  }

  static async updatePageHeader(
    pageId: string,
    body: {
      pageName?: string;
      pageDescription?: string;
      headerLayoutType?: HeaderLayoutType;
    }
  ) {
    return api
      .patch(`${this.controller}/${pageId}/header`, body)
      .then((res: AxiosResponse<IPage>) => res.data);
  }

  static async undoOperation(pageId: string) {
    return api
      .post(`${this.controller}/undo-operation/${pageId}`)
      .then((res: AxiosResponse<IGetPageWithFeatureResult>) => res.data);
  }

  static async redoOperation(pageId: string) {
    return api
      .post(`${this.controller}/redo-operation/${pageId}`)
      .then((res: AxiosResponse<IGetPageWithFeatureResult>) => res.data);
  }
}
