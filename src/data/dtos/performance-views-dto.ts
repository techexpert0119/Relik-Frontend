export interface IPerformanceView {
  date: string;
  value: number;
}

export interface IGetPerformanceViewsResult {
  views: IPerformanceView[];
}
