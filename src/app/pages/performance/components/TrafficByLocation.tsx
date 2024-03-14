import { cn, formatNumber } from '@/lib/utils';
import { Chart } from 'react-google-charts';
import { useEffect, useMemo, useState } from 'react';
import { PerformanceService } from '@/services/api/performance-service';
import moment from 'moment';
import {
  IGetPerformanceTrafficByLocationResult,
  IPerformanceCountry,
} from '@/data/dtos';
import { BasePerformanceSubPage } from '@/data/interfaces/performance';

export default function TrafficByLocation({
  className,
  pages,
  duration,
  singleView,
}: BasePerformanceSubPage) {
  const [data, setData] = useState<IPerformanceCountry[]>();

  useEffect(() => {
    if (singleView && !(pages && pages.length)) return;
    onInit();
  }, [duration, pages]);

  function onInit() {
    void loadData();
  }

  const [modifiedData, colorOptions] = useMemo(
    () =>
      data
        ? [
            [
              ['Country', 'Percent'],
              ...data.map((curData) => [curData.name, curData.value]),
            ],
            {
              colors: data.map((curData) => curData.color),
            },
          ]
        : [['Country', 'Percent'], {}],
    [data]
  );

  async function loadData() {
    let result: IGetPerformanceTrafficByLocationResult;
    try {
      result = await PerformanceService.getTrafficByLocation({
        dateFrom: moment().subtract(duration, 'days').format('YYYY-MM-DD'),
        dateTo: moment().format('YYYY-MM-DD'),
        pages,
      });
    } catch (err) {
      console.error(err);
      return;
    }

    // console.debug('PerformanceService.getTrafficByLocation', result);
    setData(result.countries);
  }

  const options = {
    colorAxis: colorOptions,
    legend: 'none',
  };

  return (
    <div className={cn('bg-white rounded px-5 py-7', className)}>
      <h2 className="text-lg text-gray-900 font-bold">Traffic by location</h2>
      <div className="flex flex-row flex-wrap items-center justify-center">
        <div className="w-full px-4 pt-8 pb-4">
          {!modifiedData ? (
            <></>
          ) : (
            <Chart
              chartType="GeoChart"
              data={modifiedData}
              className="h-36 lg:h-48"
              options={options}
            />
          )}
        </div>

        <div className="w-full flex flex-col gap-3 px-4 pt-4">
          {data?.map((curData, index) => (
            <div className="flex gap-3 justify-between" key={index}>
              <div className="flex gap-3 items-center">
                <div
                  className="w-[6px] h-[6px] rounded"
                  style={{ backgroundColor: curData.color }}
                />
                <p>{curData.name}</p>
              </div>
              <p className="text-[#101828]">{formatNumber(curData.value)}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
