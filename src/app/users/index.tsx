import { useUsersUtils } from './hooks/use-users-utils';

export default function Users() {
  const { tabs } = useUsersUtils();
  return (
    <div className="mt-8">
      <div className="container">
        <div>
          <h1 className="text-[30px]  font-semibold "> Users</h1>
          <p className="text-gray-500 text-sm  font-thin font-[Inter]">
            View your team’s trades and transactions.
          </p>
        </div>
        <div className=" mt-5 relative">{tabs}</div>
      </div>
    </div>
  );
}
