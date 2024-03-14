import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pages from './components/Pages';
import TrafficByLocation from './components/TrafficByLocation';
import TrafficByChannel from './components/TrafficByChannel';
import TrafficByDevice from './components/TrafficByDevice';
import QuickTip from './components/QuickTip';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  MultiSelectItem,
} from '@/components/ui/select';
import { getPagesOfUserQuery } from '@/services/api/page-service';
import { PageStatus } from '@/data/interfaces/page';
import moment from 'moment';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function Performance() {
  const monthDay = moment().subtract(1, 'months').daysInMonth() - 1;
  const [duration, setDuration] = useState<number>(monthDay);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPages, setSelectedPages] = useState<string[]>(
    Array.isArray(searchParams.get('selectedPages')?.split(','))
      ? (searchParams.get('selectedPages')?.split(',') as string[])
      : []
  );
  const [pages, setPages] = useState<string[]>(selectedPages);

  const props = useMemo(() => ({ pages, duration }), [pages, duration]);

  const { data: userPages } = getPagesOfUserQuery({
    pageSize: '0',
    pageNumber: '1000',
    searchText: '',
    status: PageStatus.ACTIVE,
  });

  const handleOptionCheckedChange = (optionValue: string, checked: boolean) => {
    const newSelectedPages = [...selectedPages];

    if (checked) {
      newSelectedPages.push(optionValue);
      if (userPages?.data?.length === newSelectedPages.length) {
        newSelectedPages.push('all');
      }
      setSelectedPages(newSelectedPages);
      setSearchParams(
        newSelectedPages.length > 0 ? `selectedPages=${newSelectedPages}` : ''
      );
    } else {
      const filteredPages = newSelectedPages.filter(
        (page) => page !== optionValue && page !== 'all'
      );
      setSelectedPages(filteredPages);
      setSearchParams(
        filteredPages.length > 0 ? `selectedPages=${filteredPages}` : ''
      );
    }
  };

  const compareArrays = (a: string[], b: string[]) => {
    return JSON.stringify(a.sort()) === JSON.stringify(b.sort());
  };

  const onOpenChange = (open: boolean) => {
    if (open) return;
    if (!compareArrays(pages ?? [], selectedPages ?? [])) {
      setPages(selectedPages);
    }
  };

  const handleSelectAllToggle = (_value: string, checked: boolean) => {
    if (checked) {
      const newSelectedPages = [
        'all',
        ...(userPages?.data?.map((page) => page._id) ?? []),
      ];
      setSelectedPages(newSelectedPages);
      setSearchParams(`selectedPages=${newSelectedPages}`);
    } else {
      setSelectedPages([]);
      setSearchParams('');
    }
  };

  return (
    <div className="container py-10 text-[#667085]">
      <div className="flex flex-wrap gap-3 mb-4 justify-between items-center border-b pb-5">
        <h1 className="text-gray-900 text-lg">Performance</h1>
        <div className="flex gap-3 items-center">
          <DropdownMenu onOpenChange={onOpenChange}>
            <DropdownMenuTrigger>
              <Button
                variant="outline"
                className="flex gap-3 text-[#344054] font-semibold"
              >
                <p>{pages && pages.length ? 'Custom' : 'All Pages'}</p>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-3 w-40 max-h-96 flex flex-col gap-3 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <MultiSelectItem
                label={'Select all'}
                value="all"
                checked={selectedPages.includes('all')}
                defaultChecked={selectedPages.includes('all')}
                onCheckedChange={handleSelectAllToggle}
              />
              {userPages?.data.map((item) => (
                <MultiSelectItem
                  key={item._id}
                  label={item.pageName}
                  checked={selectedPages.includes(item._id)}
                  value={item._id}
                  defaultChecked={pages?.includes(item._id)}
                  onCheckedChange={handleOptionCheckedChange}
                />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
      </div>

      <div className="flex flex-col gap-3 xl:grid xl:grid-cols-5 xl:grid-rows-5">
        <Pages
          className="xl:col-start-1 xl:col-end-4 xl:row-start-1 xl:row-end-6"
          {...props}
        />

        <TrafficByLocation
          className="xl:col-start-4 xl:col-end-6 xl:row-start-1 xl:row-end-3"
          {...props}
        />

        <TrafficByChannel
          className="xl:col-start-4 xl:col-end-5 xl:row-start-3 xl:row-end-6"
          {...props}
        />

        <TrafficByDevice
          className="xl:col-start-5 xl:col-end-6 xl:row-start-3 xl:row-end-5"
          {...props}
        />

        <QuickTip
          className="xl:col-start-5 xl:col-end-6 xl:row-start-5 xl:row-end-6 flex flex-col justify-center"
          {...props}
        />
      </div>
    </div>
  );
}
