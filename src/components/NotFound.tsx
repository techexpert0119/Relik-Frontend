import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface Props {
  readonly className?: string;
  readonly statusCode: number;
  readonly title: string;
  readonly description: string;
}

export default function NotFound(props: Props) {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }

  return (
    <main
      className={cn(
        'h-screen grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8',
        props.className
      )}
    >
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">
          {props.statusCode}
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {props.title}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {props.description}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleClick}
          >
            Go back home
          </button>
        </div>
      </div>
    </main>
  );
}
