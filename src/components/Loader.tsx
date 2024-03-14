import Spinner from './Spinner';

export default function Loader() {
  return (
    <main className="h-screen grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Spinner />
        </div>
        {/* <p className="mt-6 text-base leading-7 text-gray-600">Hang on</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Loading
        </h1> */}
      </div>
    </main>
  );
}
