import BreadCrumb, { IBreadCrumb } from '@/components/BreadCrumb';
import UseRolesUtils from './hooks/use-roles-utils';

const breadCrumbItems: Array<IBreadCrumb> = [
  {
    name: 'Users',
    link: '/users',
  },

  {
    name: 'User roles',
    link: undefined,
  },
  {
    name: 'Admin',
    link: null,
  },
];

export default function UserRoles() {
  const [tabs] = UseRolesUtils();

  return (
    <div className="container">
      <div className="mt-8">
        <BreadCrumb items={breadCrumbItems} />
      </div>

      <h1 className="text-3xl mt-5">Manage user roles</h1>
      {tabs}
    </div>
  );
}
