import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatNumber } from '@/lib/utils';
import { IPerformanceLink } from '@/data/dtos';

interface Props {
  topLinks?: IPerformanceLink[];
}

export default function TopPerformingLinks({ topLinks }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>
            <h2 className="text-lg text-gray-900 font-bold">
              Top Performing Links
            </h2>
          </TableCell>

          <TableCell className="text-center">Click</TableCell>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-[#F7F8F9]">
        {topLinks?.slice(0, 5).map((curData, index) => (
          <TableRow key={index}>
            <TableCell>
              <h2 className="text-lg text-gray-900 font-bold">
                {curData.key}
              </h2>
            </TableCell>

            <TableCell className="text-center">
              {formatNumber(curData.value)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
