import { api } from '@/services/api/api';
import { AxiosResponse } from 'axios';
import { IPageVersionHistory } from '@/data/interfaces/page-version-history';
import { IGetPageWithFeatureResult } from '@/data/dtos/get-page-with-feature-result';
import { IPage } from '@/data/interfaces/page';

export interface IDraftData extends IGetPageWithFeatureResult {
  readonly pageVersionHistories: ReadonlyArray<IPageVersionHistory>;
}

export class PageVersionHistoryService {
  static controller = 'page-version-history';

  static async getAll(pageId: string) {
    return api
      .get(`${this.controller}/${pageId}`)
      .then(
        (res: AxiosResponse<ReadonlyArray<IPageVersionHistory>>) => res.data
      );
  }

  static async updateOne(
    id: string,
    body: { title?: string; description?: string }
  ) {
    return api
      .patch(`${this.controller}/${id}`, body)
      .then((res: AxiosResponse<IPageVersionHistory>) => res.data);
  }

  static async createOne(body: {
    pageDraftId: string;
    title?: string;
    description?: string;
  }) {
    return api.post(this.controller, body).then(
      (
        res: AxiosResponse<{
          page: IPage;
          pageVersionHistories: ReadonlyArray<IPageVersionHistory>;
        }>
      ) => res.data
    );
  }

  static async rollback(id: string) {
    return api
      .post(`${this.controller}/rollback/${id}`)
      .then((res: AxiosResponse<IDraftData>) => res.data);
  }
}
