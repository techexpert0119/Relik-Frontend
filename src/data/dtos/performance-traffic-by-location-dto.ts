export interface IPerformanceCountry {
  countryCode: string;
  name: string;
  color: string;
  value: number;
}

export interface IGetPerformanceTrafficByLocationResult {
  countries: IPerformanceCountry[];
}
