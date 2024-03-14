import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import TrafficByLocation from './components/TrafficByLocation';
import TrafficByChannel from './components/TrafficByChannel';
import TrafficByDevice from './components/TrafficByDevice';
import QuickTip from './components/QuickTip';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Views from './components/Views';
import IndividualPages from './components/IndividualPages';
import NotFound from '@/components/NotFound';
import { PageService } from '@/services/api/page-service';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IPage } from '@/data/interfaces/page';
import { getPublicImageURL } from '@/lib/utils';
import moment from 'moment';

type Params = {
  readonly id: string;
};

interface Props {
  duration: number;
  pages?: string[];
  singleView?: boolean;
}

const singlePageDomain = import.meta.env.VITE_SINGLE_PAGE_DOMAIN;

export default function SinglePerformance() {
  const navigate = useNavigate();
  const monthDay = moment().subtract(1, 'months').daysInMonth() - 1;
  const { id } = useParams<Params>();
  const [page, setPage] = useState<IPage>();
  const [isError, setIsError] = useState(false);
  const [duration, setDuration] = useState<number>(monthDay);

  const props = useMemo<Props>(
    () => ({
      pages: page ? [page?._id] : undefined,
      duration,
      singleView: true,
    }),
    [page, duration]
  );

  const loadData = () => {
    if (id)
      PageService.getPublicPage(id)
        .then((res) => {
          if (!res) return;
          setPage(res.page);
        })
        .catch(() => setIsError(true));
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isError) {
    return (
      <NotFound
        className="grow h-full bg-slate"
        statusCode={404}
        title=" Page not found"
        description="Sorry, we couldn’t find the page you’re looking for."
      />
    );
  }

  return (
    <div className="container py-10 text-[#667085]">
      <div className="flex flex-wrap gap-3 mb-4 justify-between items-center border-b pb-5">
        <div className="flex gap-3 items-center">
          <ArrowLeft
            onClick={() => navigate('/performance')}
            className="w-4 h-4 cursor-pointer"
            color="#101828"
          />

          {page?.pageProfilePhoto &&
            typeof page?.pageProfilePhoto === 'object' && (
              <LazyLoadImage
                src={getPublicImageURL(page?.pageProfilePhoto?.url)}
                alt="image"
                className="inline-block h-10 w-10 rounded-full"
              />
            )}

          <div>
            <h3 className="text-base text-gray-900 font-bold">
              {page?.pageName}
            </h3>
            {page?.pageLink && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap max-w-xs"
                href={`${singlePageDomain}${page?.pageLink}`}
              >
                {`${singlePageDomain}${page?.pageLink}`}
                <ExternalLink className="text-gray-600 h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <Select
          onValueChange={(val: string) => setDuration(+val)}
          defaultValue={monthDay.toString()}
        >
          <SelectTrigger
            id="buttonRadius"
            className="bg-white h-10 min-w-33 max-w-33 rounded-full border border-gray-400 pl-4 text-[#344054] font-semibold"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={'0'}>
                <p>Today</p>
              </SelectItem>
              <SelectItem value={'7'}>
                <p>Last Week</p>
              </SelectItem>
              <SelectItem value={monthDay.toString()}>
                <p>Last 30 days</p>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3 xl:grid xl:grid-cols-5">
        <IndividualPages className="xl:col-start-1 xl:col-end-4" {...props} />

        <div className="xl:col-start-4 xl:col-end-6 flex flex-col xl:grid xl:grid-cols-2 gap-3">
          <Views className="xl:col-start-1 xl:col-end-3" {...props} />

          <TrafficByLocation
            className="xl:col-start-1 xl:col-end-3"
            {...props}
          />

          <TrafficByChannel
            className="xl:col-start-1 xl:col-end-2"
            {...props}
          />

          <div className="xl:col-start-2 xl:col-end-3 flex flex-col gap-3">
            <TrafficByDevice {...props} />

            <QuickTip className="flex-grow xl:col-start-5 xl:col-end-6 xl:row-start-6 xl:row-end-7 flex flex-col justify-center" />
          </div>
        </div>
      </div>
    </div>
  );
}
