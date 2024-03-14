import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { Chart } from 'react-google-charts';
import { BasePerformanceSubPage } from '@/data/interfaces/performance';
import moment from 'moment/moment';
import { PerformanceService } from '@/services/api/performance-service';
import { IGetPerformanceViewsResult, IPerformanceView } from '@/data/dtos';

export default function Views(props: BasePerformanceSubPage) {
  const { className, duration, pages } = props;
  const [views, setViews] = useState<IPerformanceView[]>();

  const data = useMemo(() => {
    if (views) {
      const v = views.map((view) => [view.date, view.value]);
      v.unshift(['Years', 'Views']);
      return v;
    } else {
      return [['Years', 'Views'], []];
    }
  }, [views]);

  useEffect(() => {
    if (pages && pages.length) onInit();
  }, [pages, duration]);

  function onInit() {
    void loadViews();
  }

  async function loadViews() {
    let result: IGetPerformanceViewsResult;
    try {
      result = await PerformanceService.getViews({
        dateFrom: moment().subtract(duration, 'days').format('YYYY-MM-DD'),
        dateTo: moment().format('YYYY-MM-DD'),
        page: pages![0],
      });
    } catch (err) {
      console.error(err);
      return;
    }
    // console.debug('PerformanceService.getOverall', result.views);
    setViews(result.views);
  }

  const options = {
    vAxis: { minValue: 0 },
    chartArea: { width: '80%', height: '80%' },
    colors: ['#54BC84'],
    legend: { position: 'none' },
  };

  return (
    <div className={cn('bg-white rounded px-5 py-7', className)}>
      <h2 className="text-lg text-gray-900 font-bold">Views</h2>
      <div className="h-[300px] items-center">
        <Chart
          chartType="AreaChart"
          width="100%"
          height="100%"
          data={data}
          options={options}
          className="flex flex-col items-center text-[#667085] font-xs"
        />
      </div>
    </div>
  );
}
