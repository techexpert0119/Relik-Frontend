import Footer from '@/components/Footer';
import { NavLink, Outlet } from 'react-router-dom';
import wideLogo from '/wide-logo.svg';
import logo from '/logo.svg';
import stickyNote from '/sticky-note.svg';
import { useAuthStore } from '@/stores/auth-store';
import AccountPopover from '@/components/AccountPopover';
import { Shield, Users } from 'lucide-react';
import { Role } from '@/data/enums/role';

const SuperUserLayout = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 w-full px-5 py-4 sm:py-4 bg-white sm:px-4 border">
        <div className="container flex justify-between items-center gap-8">
          <NavLink to="/">
            <img src={wideLogo} alt="logo" className="h-8 hidden md:block" />
            <img src={logo} alt="logo" className="h-8 block md:hidden" />
          </NavLink>

          {user && (
            <nav className="flex items-center flex-1 gap-8 md:gap-4 text-sm">
              <NavLink to="/agencies" className="flex gap-1 items-center">
                <img src={stickyNote} alt="note" className="h-4 w-4" />
                <div className="hidden font-black md:block">
                  Managed accounts
                </div>
              </NavLink>

              <NavLink to="/users" className="flex gap-1 items-center">
                <Users className="h-4 w-4" />
                <div className="hidden font-black md:block">Users</div>
              </NavLink>

              {user.role.type === Role.SUPER_ADMIN && (
                <NavLink to="/roles" className="flex gap-1 items-center">
                  <Shield className="h-4 w-4" />
                  <div className="hidden font-black md:block">Roles</div>
                </NavLink>
              )}
            </nav>
          )}

          <AccountPopover />
        </div>
      </header>

      <Outlet />

      <div className="container my-10">
        <Footer />
      </div>
    </div>
  );
};

export default SuperUserLayout;
