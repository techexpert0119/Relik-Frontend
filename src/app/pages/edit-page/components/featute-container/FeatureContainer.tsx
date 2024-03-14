import React, { useContext, useState } from 'react';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import SortableItem from '@/app/pages/edit-page/components/sortable-item/SortableItem';
import FeatureRender from '@/components/features/FeatureRender';
import { api } from '@/services/api/api';
import ActionContainer from '@/app/pages/edit-page/components/action-container/ActionContainer';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { MenuContext } from '@/app/pages/user-single-page/context/menu-context';

const FeatureContainer = () => {
  const { features, setFeatures, page, disabled, setDisabled } =
    useContext(PageContext) ?? {};
  const menuContext = useContext(MenuContext);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 300, tolerance: 8 },
    })
  );
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragCancel = () => {
    setIsDragging(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over?.id && features && setFeatures) {
      const activeIndex = features.findIndex((f) => f._id === active.id);
      const overIndex = features.findIndex((f) => f._id === over.id);
      const backup = [...features];

      setDisabled && setDisabled(true);
      api
        .patch('page-feature/move', {
          pageId: page?._id,
          featureId: active.id,
          moveTo: overIndex + 1,
        })
        .catch(() => {
          setFeatures(backup);
        })
        .finally(() => setDisabled && setDisabled(false));

      // It's made on purpose so states could be merged by React
      setIsDragging(false);
      setFeatures((feats) => arrayMove(feats, activeIndex, overIndex));
    } else {
      setIsDragging(false);
    }
  };

  if (!features) return null;

  const handleClickAddFeature = () => {
    const featureOrder = features && features[features.length - 1]?.order;
    menuContext?.setMenuType('select-feature', {
      orderToPlace: featureOrder ? featureOrder + 1 : 1,
    });
    menuContext?.setTab('content');
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={features.map((f) => f._id)}
        disabled={disabled || menuContext?.menuType === 'version-history'}
      >
        {features.map((f) => (
          <SortableItem id={f._id} key={f._id}>
            {isDragging || disabled ? (
              <FeatureRender feature={f} />
            ) : (
              <ActionContainer
                withCopy
                withDelete
                featureId={f._id}
                featureName={f.featureId?.name}
              >
                <FeatureRender feature={f} />
              </ActionContainer>
            )}
          </SortableItem>
        ))}
        {menuContext?.menuType !== 'version-history' && (
          <div className="w-full px-6">
            <Button
              variant={'destructive'}
              className="w-full h-full mt-10 py-4 rounded-lg text-black text-lg font-bold bg-transparent border-[#828282] border-dashed hover:bg-white hover:bg-opacity-10"
              onClick={() => handleClickAddFeature()}
            >
              <div className="flex gap-3 items-center">
                <Plus className="w-4" />
                Add element
              </div>
            </Button>
          </div>
        )}
      </SortableContext>
    </DndContext>
  );
};

export default FeatureContainer;
