import { LayoutGrid, Monitor, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';
import moment from 'moment';

import { cn, formatCompactNumber } from '@/lib/utils';
import { PerformanceService } from '@/services/api/performance-service';
import {
  IGetPerformanceTrafficByDeviceResult,
  IPerformanceDevice,
} from '@/data/dtos';
import { BasePerformanceSubPage } from '@/data/interfaces/performance';

export default function TrafficByDevice({
  className,
  pages,
  duration,
  singleView,
}: BasePerformanceSubPage) {
  const [data, setData] = useState<IPerformanceDevice[]>();

  useEffect(() => {
    if (singleView && !(pages && pages.length)) return;
    onInit();
  }, [pages, duration]);

  function onInit() {
    void loadData();
  }

  async function loadData() {
    let result: IGetPerformanceTrafficByDeviceResult;
    try {
      result = await PerformanceService.getTrafficByDevice({
        dateFrom: moment().subtract(duration, 'days').format('YYYY-MM-DD'),
        dateTo: moment().format('YYYY-MM-DD'),
        pages,
      });
    } catch (err) {
      console.error(err);
      return;
    }

    setData(result.devices);
  }

  function getDeviceIcon(deviceName: string) {
    switch (deviceName) {
      case 'Desktop':
        return <Monitor />;
      case 'Mobile':
        return <Smartphone />;
      case 'Tablet':
        return <Smartphone />;
      default:
        return <LayoutGrid />;
    }
  }

  return (
    <div className={cn('bg-white rounded px-5 py-7', className)}>
      <div className="flex flex-col gap-5">
        <h2 className="text-lg text-gray-900 font-bold">Traffic by device</h2>

        {data?.map((curData, index) => (
          <div key={index} className="flex gap-3 justify-between items-center">
            <div className="flex gap-3 items-center">
              {getDeviceIcon(curData.key)}
              <p>{curData.key}</p>
            </div>
            <p>{formatCompactNumber(curData.value)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
