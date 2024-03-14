export interface IPerformanceChannel {
  key: string;
  value: number;
}

export interface IGetPerformanceTrafficByChannelResult {
  channels: IPerformanceChannel[];
}
