import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatNumber, getPublicImageURL } from '@/lib/utils';
import { PerformanceService } from '@/services/api/performance-service';
import { IGetPerformanceTopPagesResult, IPerformancePage } from '@/data/dtos';
import { BasePerformanceSubPage } from '@/data/interfaces/performance';

const singlePageDomain = import.meta.env.VITE_SINGLE_PAGE_DOMAIN;

export default function TopPages(props: BasePerformanceSubPage) {
  const { duration, pages } = props;
  const navigate = useNavigate();

  const [topPages, setTopPages] = useState<IPerformancePage[]>();

  useEffect(() => {
    onInit();
  }, [pages, duration]);

  function onInit() {
    void loadTopPages();
  }

  async function loadTopPages() {
    let result: IGetPerformanceTopPagesResult;
    try {
      result = await PerformanceService.getTopPages({
        dateFrom: moment().subtract(duration, 'days').format('YYYY-MM-DD'),
        dateTo: moment().format('YYYY-MM-DD'),
        pageSize: 1000, // TODO: Until we add pagination to the top pages
        pages,
      });
    } catch (err) {
      console.error(err);
      return;
    }

    // console.debug('PerformanceService.getTopPages', result);
    setTopPages(result.pages);
  }

  return (
    <div>
      <Table style={{ maxHeight: '1060px' }}>
        <TableHeader>
          <TableRow>
            <TableCell>
              <h2 className="text-lg text-gray-900 font-bold">Top pages</h2>
            </TableCell>

            <TableCell className="text-center">Views</TableCell>

            <TableCell className="text-center">Click</TableCell>

            <TableCell className="text-center">CTR</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-[#F7F8F9]">
          {topPages?.map((curData, index) => (
            <TableRow key={index}>
              <TableCell>
                <div
                  onClick={() => navigate(`/performance/${curData.pageLink}`)}
                  className="flex gap-3 items-center cursor-pointer"
                >
                  <LazyLoadImage
                    src={
                      curData.imageUrl
                        ? getPublicImageURL(curData.imageUrl)
                        : // TODO: Add a Relik placeholder image from s3
                          'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg'
                    }
                    alt="image"
                    className="inline-block h-10 w-10 rounded-full"
                  />

                  <div>
                    <h3 className="text-base text-gray-900 font-bold">
                      {curData.pageName}
                    </h3>
                    <p>{`${singlePageDomain}${curData.pageLink}`}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="text-center">
                {formatNumber(curData.viewCount ?? 0)}
              </TableCell>

              <TableCell className="text-center">
                {formatNumber(curData.clickCount ?? 0)}
              </TableCell>

              <TableCell className="text-center">
                {curData.CTR > 0 ? '+' : curData.CTR < 0 ? '-' : ''}
                {formatNumber(curData.CTR)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
