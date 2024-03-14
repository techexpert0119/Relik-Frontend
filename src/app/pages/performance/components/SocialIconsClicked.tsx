import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IPerformanceLink } from '@/data/dtos';
import { formatNumber } from '@/lib/utils';

interface Props {
  socialLinks?: IPerformanceLink[];
}

export default function SocialIconsClicked({ socialLinks }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>
            <h2 className="text-lg text-gray-900 font-bold">
              Social Icons Clicked
            </h2>
          </TableCell>

          <TableCell className="text-center">Click</TableCell>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-[#F7F8F9]">
        {socialLinks?.slice(0, 5).map((curData, index) => (
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
