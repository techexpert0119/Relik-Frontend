export interface IPerformanceDevice {
  key: string;
  value: number;
}

export interface IGetPerformanceTrafficByDeviceResult {
  devices: IPerformanceDevice[];
}
