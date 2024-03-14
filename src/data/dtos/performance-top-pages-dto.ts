export interface IPerformancePage {
  pageName: string;
  pageLink: string;
  viewCount: number;
  clickCount: number;
  CTR: number;
  imageUrl: string;
  id: string;
}

export interface IGetPerformanceTopPagesResult {
  pages: IPerformancePage[];
}
