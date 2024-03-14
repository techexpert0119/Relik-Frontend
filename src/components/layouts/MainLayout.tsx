import Footer from '@/components/Footer';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import AccountPopover from '@/components/AccountPopover';
import { File, PieChart } from 'lucide-react';
import wideLogo from '/wide-logo.svg';

const MainLayout = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 w-full pt-4 md:pb-4 bg-white shadow-sm">
        <div className="container flex justify-between items-center gap-8">
          <NavLink to="/">
            <img src={wideLogo} alt="logo" className="h-8" />
          </NavLink>

          {user && (
            <nav className="hidden md:flex items-center flex-1 gap-8 text-sm">
              {user.isActive ? (
                <>
                  <NavLink
                    to="/pages"
                    className={() => `flex gap-2 items-center font-[600]`}
                  >
                    <File className="h-4 w-4" /> Pages
                  </NavLink>

                  <NavLink
                    to="/performance"
                    className={() => `flex gap-2 items-center font-[600]`}
                  >
                    <PieChart className="h-4 w-4" /> Performance
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="flex gap-2 items-center font-[600] text-grey cursor-not-allowed	">
                    <File className="h-4 w-4" /> Pages
                  </div>

                  <div className="flex gap-2 items-center font-[600] text-grey cursor-not-allowed	">
                    <PieChart className="h-4 w-4" /> Performance
                  </div>
                </>
              )}
            </nav>
          )}
          <AccountPopover />
        </div>

        <nav className="flex md:hidden mt-6 justify-between">
          {user?.isActive ? (
            <>
              <NavLink
                to="/pages"
                className={({ isActive }) =>
                  `grow border-b border-black flex flex-col gap-1 items-center font-[600] pb-2 ${!isActive && 'border-b-0'}`
                }
              >
                <File className="h-4 w-4" /> Pages
              </NavLink>

              <NavLink
                to="/performance"
                className={({ isActive }) =>
                  `grow border-b border-black flex flex-col gap-1 items-center font-[600] pb-2 ${!isActive && 'border-b-0'}`
                }
              >
                <PieChart className="h-4 w-4" /> Performance
              </NavLink>
            </>
          ) : (
            <>
              <div className="grow border-black flex flex-col gap-1 items-center font-[600] pb-2 text-grey border-b-0 cursor-not-allowed">
                <File className="h-4 w-4" /> Pages
              </div>

              <div className="grow border-black flex flex-col gap-1 items-center font-[600] pb-2 text-grey border-b-0 cursor-not-allowed">
                <PieChart className="h-4 w-4" /> Performance
              </div>
            </>
          )}
        </nav>
      </header>

      <Outlet />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
