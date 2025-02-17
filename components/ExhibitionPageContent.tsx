"use client";
import React, { FC, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCenter,
} from "@dnd-kit/core";
import { ExhibitionItem } from "@prisma/client";
import DisplayExhibitionItems from "@/components/DisplayExhibitionItems";
import NewExpositionItemModal from "@/components/NewExpositionItemModal";
import DisplayTimeLineItems from "@/components/DisplayTimeLineItems";
import ExhibitionItemCard from "@/components/ExhibitionItemCard";

interface ExhibitionPageContentProps {
  data: ExhibitionItem[];
  parsedId: number;
}

const ExhibitionPageContent: FC<ExhibitionPageContentProps> = ({
  data,
  parsedId,
}) => {
  const [exhibitionItems, setExhibitionItems] = useState(data);
  const [timelineItems, setTimelineItems] = useState<ExhibitionItem[]>([]);
  const [activeItem, setActiveItem] = useState<ExhibitionItem | null>(null);

  function handleDragStart(event: DragEndEvent) {
    const { active } = event;
    const itemId = parseInt(active.id as string, 10);
    const draggedItem = [...exhibitionItems, ...timelineItems].find(
      (item) => item.id === itemId,
    );

    if (draggedItem) {
      setActiveItem(draggedItem);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const itemId = parseInt(active.id as string, 10);

    // Check if dropping onto timeline
    if (over.id === "timeline") {
      // Find the item from exhibition items
      const item = exhibitionItems.find((item) => item.id === itemId);

      if (item && !timelineItems.some((i) => i.id === itemId)) {
        // Add to timeline
        setTimelineItems([...timelineItems, item]);

        setExhibitionItems(
          exhibitionItems.filter((item) => item.id !== itemId),
        );
      }
    } else {
      // Handle position changes within exhibition items if needed
      const newPosition = over.id as number;

      setExhibitionItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, position: newPosition } : item,
        ),
      );
    }

    setActiveItem(null);
  }

  const handleRemoveFromTimeline = (itemId: number) => {
    const item = timelineItems.find((item) => item.id === itemId);
    if (item) {
      setExhibitionItems([...exhibitionItems, item]);
    }
    setTimelineItems(timelineItems.filter((item) => item.id !== itemId));
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <div className="w-full h-3/4 overflow-hidden">
        <DisplayExhibitionItems items={exhibitionItems} />
        <NewExpositionItemModal exhibitionId={parsedId} />
      </div>
      <div className="w-full h-1/4">
        <DisplayTimeLineItems
          items={timelineItems}
          onRemoveItem={handleRemoveFromTimeline}
        />
      </div>

      <DragOverlay>
        {activeItem ? (
          <div className="opacity-50">
            <ExhibitionItemCard item={activeItem} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ExhibitionPageContent;
