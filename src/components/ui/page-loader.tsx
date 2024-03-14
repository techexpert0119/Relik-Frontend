import logo from '../../assets/svg/logo.svg';
export const PageLoader = () => {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 h-screen w-screen flex items-center justify-center bg-white bg-opacity-90 overflow-hidden z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-32 h-32 border-3 border-solid border-opacity-10 border-stone-950 rounded-full animate-spin"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${logo})` }}
        ></div>
      </div>
    </div>
  );
};
