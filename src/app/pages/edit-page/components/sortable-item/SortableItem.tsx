import React, { FC, ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem: FC<{ children: ReactNode; id: number | string }> = ({
  children,
  id,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });
  const style = {
    opacity: isDragging ? 0.666 : undefined,
    transform: CSS.Translate.toString(transform),
    transition: transition,
  };

  return (
    <div
      ref={setNodeRef}
      className="p-2 flex gap-4 w-full relative"
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export default SortableItem;
