import { useState } from 'react';
import { ViewMode } from '@/data/enums/view-mode';

interface Filter {
  view: ViewMode;
  itemFilter: 'all' | 'published' | 'unpublished';
}

function UsePageFilter() {
  const [filter, setFilter] = useState<Filter>({
    itemFilter: 'all',
    view: ViewMode.GRID,
  });

  function changeView() {
    setFilter((p) => {
      if (p.view === ViewMode.GRID) return { ...p, view: ViewMode.LIST };
      return { ...p, view: ViewMode.GRID };
    });
  }

  function changeItemFilter(param: Filter['itemFilter']) {
    if (param === filter.itemFilter) return;
    setFilter((p) => ({ ...p, itemFilter: param }));
  }
  return { filter, changeView, changeItemFilter };
}

export default UsePageFilter;
