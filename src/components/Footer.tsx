import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { FC } from 'react';
import { cn } from '@/lib/utils';

const Footer: FC<{ className?: string }> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'container flex flex-col items-center sm:flex-row w-full justify-between font-[400] text-sm text-gray-500 gap-3 pb-10 pt-5 lg:gap-4 lg:py-10',
        className
      )}
    >
      <div className="text-center sm:text-left">
        © {currentYear} RELIK L.L.C-FZ
      </div>
      <Link
        className="flex gap-2 items-center"
        to="mailto:contact@relik.com"
        target="_blank"
      >
        <Mail className="h-4 w-4" /> contact@relik.com
      </Link>
    </footer>
  );
};

export default Footer;
