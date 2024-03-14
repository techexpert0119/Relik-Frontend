import { NavLink } from 'react-router-dom';

export interface IBreadCrumb {
  name: string;
  link: string | null | undefined;
}
interface IBreadCrumbProps {
  items: Array<IBreadCrumb>;
  classNames?: {
    wrapper: string;
    item: string;
    lastItem: string;
  };
}

function BreadCrumb({ items, classNames }: IBreadCrumbProps) {
  return (
    <div className={`flex gap-3 ${classNames?.wrapper}`}>
      {items.map((item, key) => {
        if (item.link !== null) {
          if (item.link === undefined) {
            return (
              <div
                key={key}
                className="hidden text-purple-900 font-black md:block border-r-2 pr-2 border-r-[#eaecf0]"
              >
                {item.name}
              </div>
            );
          }
          return (
            <NavLink
              to={item.link}
              key={key}
              className={`flex gap-1 items-center ${classNames?.item}`}
            >
              <div className="hidden text-purple-900 font-black md:block border-r-2 pr-2 border-r-[#eaecf0]">
                {item.name}
              </div>
            </NavLink>
          );
        } else {
          return (
            <div
              key={key}
              className={`hidden font-[#667085] md:block ${classNames?.lastItem}`}
            >
              {item.name}
            </div>
          );
        }
      })}
    </div>
  );
}

export default BreadCrumb;
