import { useEffect, useState } from 'react';
import Card from './Card';
import TopPerformingLinks from './TopPerformingLinks';
import SocialIconsClicked from './SocialIconsClicked';
import { cn, formatNumber } from '@/lib/utils';
import { BasePerformanceSubPage } from '@/data/interfaces/performance';
import {
  IGetPerformanceOverallResult,
  IGetPerformanceTopLinksResult,
  IPerformanceLink,
  IPerformanceSocialLink,
  socialHandles,
} from '@/data/dtos';
import { PerformanceService } from '@/services/api/performance-service';
import moment from 'moment/moment';

export default function IndividualPages(props: BasePerformanceSubPage) {
  const { className, duration, pages } = props;
  const [dataOverall, setDataOverall] =
    useState<IGetPerformanceOverallResult>();
  const [topLinks, setTopLinks] = useState<IPerformanceLink[]>();
  const [socialLinks, setSocialLinks] = useState<IPerformanceLink[]>();

  useEffect(() => {
    if (pages && pages.length) onInit();
  }, [pages, duration]);

  function onInit() {
    void loadOverall();
    void loadTopPages();
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

  async function loadTopPages() {
    let result: IGetPerformanceTopLinksResult;
    try {
      result = await PerformanceService.getTopLinks({
        dateFrom: moment().subtract(duration, 'days').format('YYYY-MM-DD'),
        dateTo: moment().format('YYYY-MM-DD'),
        pages,
      });
    } catch (err) {
      console.error(err);
      return;
    }

    // console.debug('PerformanceService.getTopLinks', result);
    setTopLinks(result.outlinks);

    const newSocialLinks: IPerformanceLink[] = socialHandles
      .filter((social: IPerformanceSocialLink) =>
        result.outlinks.some((link) => link.key.includes(social.link))
      )
      .map((social: IPerformanceSocialLink) => {
        const matchingLink = result.outlinks.find((link) =>
          link.key.includes(social.link)
        );
        return {
          key: social.value,
          value: matchingLink ? matchingLink.value : 0,
        };
      })
      .sort((a, b) => b.value - a.value);

    // console.debug('PerformanceService.getSocialLinks', result);
    setSocialLinks(newSocialLinks);
  }

  return (
    <div className={cn('bg-white rounded px-5 py-7', className)}>
      <div className="flex flex-col gap-5">
        <h2 className="text-lg text-center text-gray-900 font-bold mb-3">
          Your pages got {dataOverall?.uniqueViewsCount ?? 0} unique views{' '}
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

        <TopPerformingLinks topLinks={topLinks} />

        <SocialIconsClicked socialLinks={socialLinks} />
      </div>
    </div>
  );
}
