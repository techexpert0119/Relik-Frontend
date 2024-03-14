import { useEffect, useState } from 'react';
import moment from 'moment/moment';

import { cn, formatNumber } from '@/lib/utils';
import { PerformanceService } from '@/services/api/performance-service';
import {
  IGetPerformanceTrafficByChannelResult,
  IPerformanceChannel,
} from '@/data/dtos';
import { BasePerformanceSubPage } from '@/data/interfaces/performance';

export default function TrafficByChannel({
  className,
  pages,
  duration,
  singleView,
}: BasePerformanceSubPage) {
  const [data, setData] = useState<IPerformanceChannel[]>();

  useEffect(() => {
    if (singleView && !(pages && pages.length)) return;
    onInit();
  }, [pages, duration]);

  function onInit() {
    void loadData();
  }

  async function loadData() {
    let result: IGetPerformanceTrafficByChannelResult;
    try {
      result = await PerformanceService.getTrafficByChannel({
        dateFrom: moment().subtract(duration, 'days').format('YYYY-MM-DD'),
        dateTo: moment().format('YYYY-MM-DD'),
        pages,
      });
    } catch (err) {
      console.error(err);
      return;
    }

    setData(result.channels);
  }

  return (
    <div className={cn('bg-white rounded px-5 py-7', className)}>
      <div className="flex flex-col gap-5">
        <h2 className="text-lg text-gray-900 font-bold">Traffic by channel</h2>

        {data?.map((curData, index) => (
          <div key={index}>
            <div className="flex justify-between text-base mb-2">
              <p>{curData.key}</p>
              <p className="text-[#101828]">{formatNumber(curData.value)}%</p>
            </div>
            <div className="w-full rounded-full h-2.5 bg-[#F7F8F9]">
              <div
                className="bg-[#54B8C7] h-2.5 rounded-full"
                style={{ width: `${curData.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
