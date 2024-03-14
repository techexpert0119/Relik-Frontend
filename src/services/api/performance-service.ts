import { api } from '@/services/api/api';
import {
  IGetPerformanceOverallResult,
  IGetPerformanceTopLinksResult,
  IGetPerformanceTopPagesResult,
  IGetPerformanceTrafficByChannelResult,
  IGetPerformanceTrafficByDeviceResult,
  IGetPerformanceTrafficByLocationResult,
  IGetPerformanceViewsResult,
} from '@/data/dtos';

const controller = 'performance';

export class PerformanceService {
  static getOverall(params: {
    dateFrom: string;
    dateTo: string;
    pages?: string[];
  }) {
    return this.getHelper<IGetPerformanceOverallResult>({
      ...params,
      path: 'overall',
    });
  }

  static getViews(params: { dateFrom: string; dateTo: string; page: string }) {
    return this.getHelper<IGetPerformanceViewsResult>({
      ...params,
      path: 'views',
    });
  }

  static getTopPages(params: {
    dateFrom: string;
    dateTo: string;
    pages?: string[];
    pageNumber?: number;
    pageSize?: number;
  }) {
    return this.getHelper<IGetPerformanceTopPagesResult>({
      ...params,
      path: 'top-pages',
    });
  }

  static getTrafficByLocation(params: {
    dateFrom: string;
    dateTo: string;
    pages?: string[];
  }) {
    return this.getHelper<IGetPerformanceTrafficByLocationResult>({
      ...params,
      path: 'traffic-by-location',
    });
  }

  static getTrafficByChannel(params: {
    dateFrom: string;
    dateTo: string;
    pages?: string[];
  }) {
    return this.getHelper<IGetPerformanceTrafficByChannelResult>({
      ...params,
      path: 'traffic-by-channel',
    });
  }

  static getTrafficByDevice(params: {
    dateFrom: string;
    dateTo: string;
    pages?: string[];
  }) {
    return this.getHelper<IGetPerformanceTrafficByDeviceResult>({
      ...params,
      path: 'traffic-by-device',
    });
  }

  static getTopLinks(params: {
    dateFrom: string;
    dateTo: string;
    pages?: string[];
  }) {
    return this.getHelper<IGetPerformanceTopLinksResult>({
      ...params,
      path: 'top-links',
    });
  }

  private static async getHelper<T>({
    path,
    dateFrom,
    dateTo,
    pages,
    page,
  }: {
    path: string;
    dateFrom: string;
    dateTo: string;
    pages?: string[];
    page?: string;
  }) {
    const params = {
      dateFrom,
      dateTo,
    } as { [key: string]: string | string[] };
    if (pages) {
      params.pages = pages;
    } else if (page) {
      params.page = page;
    }
    const r = await api.get(`${controller}/${path}`, {
      params,
    });
    return r.data as Promise<T>;
  }
}
