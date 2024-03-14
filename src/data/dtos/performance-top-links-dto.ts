export interface IPerformanceLink {
  key: string;
  value: number;
}

export interface IGetPerformanceTopLinksResult {
  outlinks: IPerformanceLink[];
}
