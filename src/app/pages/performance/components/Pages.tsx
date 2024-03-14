import { useEffect, useState } from 'react';
import moment from 'moment';

import Card from './Card';
import TopPages from './TopPages';
import { cn, formatNumber } from '@/lib/utils';
import { PerformanceService } from '@/services/api/performance-service';
import { IGetPerformanceOverallResult } from '@/data/dtos/performance-overall-dto';
import { BasePerformanceSubPage } from '@/data/interfaces/performance';

export default function Pages(props: BasePerformanceSubPage) {
  const { className, pages, duration } = props;
  const [dataOverall, setDataOverall] =
    useState<IGetPerformanceOverallResult>();

  useEffect(() => {
    onInit();
  }, [pages, duration]);

  function onInit() {
    void loadOverall();
  }

  async function loadOverall() {
    let result: IGetPerformanceOverallResult;
    try {
      result = await PerformanceService.getOverall({
        dateFrom: moment().subtract(duration, 'days').format('YYYY-MM-DD'),
        dateTo: moment().format('YYYY-MM-DD'),
        pages,
      });
    } catch (err) {
      console.error(err);
      return;
    }

    // console.debug('PerformanceService.getOverall', result);
    setDataOverall(result);
  }

  return (
    <div className={cn('bg-white rounded px-5 py-7', className)}>
      <div className="flex flex-col gap-5">
        <h2 className="text-lg text-center text-gray-900 font-bold mb-3">
          Your pages got {dataOverall?.uniqueViewsCount ?? 0} unique visitors{' '}
          {duration === 30
            ? 'in the last 30 days'
            : duration === 7
              ? 'in the last week'
              : 'today'}
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <Card
            amount={formatNumber(dataOverall?.viewCount ?? 0)}
            growthRate={+formatNumber(dataOverall?.viewGrowthRate ?? 0)}
            title="Views"
          />
          <Card
            amount={formatNumber(dataOverall?.clickCount ?? 0)}
            growthRate={+formatNumber(dataOverall?.clickGrowthRate ?? 0)}
            title="Clicks"
          />
          <Card
            amount={`${formatNumber(dataOverall?.CTR ?? 0)}%`}
            growthRate={+formatNumber(dataOverall?.CTRGrowthRate ?? 0)}
            title="CTR"
          />
        </div>

        <TopPages {...props} />

        {/* TODO: Re-enable when we have the pagination logic*/}
        {/*<Button*/}
        {/*  size="sm"*/}
        {/*  variant="ghost"*/}
        {/*  className="font-bold justify-start w-min"*/}
        {/*>*/}
        {/*  <p className="mr-2">See More</p>*/}
        {/*  <ArrowRight className="w-4 h-4" />*/}
        {/*</Button>*/}
      </div>
    </div>
  );
}
