import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const url = new URL(import.meta.env.VITE_IP_LOOKUP_URL);
url.searchParams.set('key', import.meta.env.VITE_IP_LOOKUP_KEY);

export const getIPInformation = () => {
  return useQuery({
    queryFn: () => axios.get(url.toString()).then((data) => data?.data as IIP),
    queryKey: [url],
    retry: 0,
  });
};

export interface IIP {
  asn: string;
  asnName: string;
  asnOrg: string;
  businessName: string;
  businessWebsite: string;
  city: string;
  continent: string;
  country: string;
  countryCode: string;
  ipName: string;
  ipType: string;
  isp: string;
  lat: string;
  lon: string;
  message: string;
  org: string;
  query: string;
  region: string;
  status: string;
  timezone: string;
  utcOffset: string;
}
