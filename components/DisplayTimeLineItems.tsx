"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ExhibitionItem } from "@prisma/client";
import { useDroppable } from "@dnd-kit/core";

interface DisplayTimeLineItemsProps {
  items: ExhibitionItem[];
  onRemoveItem?: (id: number) => void;
}

const DisplayTimeLineItems: React.FC<DisplayTimeLineItemsProps> = ({
  items,
  onRemoveItem,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [itemsOnTimeline, setItemsOnTimeline] =
    useState<ExhibitionItem[]>(items);

  // Update local state when props change
  useEffect(() => {
    setItemsOnTimeline(items);
  }, [items]);

  const { setNodeRef, isOver } = useDroppable({
    id: "timeline",
  });

  const handleMoveLeft = (index: number) => {
    if (index === 0) return;
    const newItems = [...itemsOnTimeline];
    [newItems[index - 1], newItems[index]] = [
      newItems[index],
      newItems[index - 1],
    ];
    setItemsOnTimeline(newItems);
  };

  const handleMoveRight = (index: number) => {
    if (index === itemsOnTimeline.length - 1) return;
    const newItems = [...itemsOnTimeline];
    [newItems[index + 1], newItems[index]] = [
      newItems[index],
      newItems[index + 1],
    ];
    setItemsOnTimeline(newItems);
  };

  const handleDelete = (id: number) => {
    if (onRemoveItem) {
      onRemoveItem(id);
    }
  };

  return (
    <div className="w-full border-t-2 border-t-gray-400 pt-6 pb-4 relative">
      <div
        ref={setNodeRef}
        className={`flex items-center space-x-4 overflow-x-auto px-4 max-w-full min-h-24 ${isOver ? "bg-gray-100" : ""}`}
      >
        {itemsOnTimeline.length === 0 ? (
          <h1 className="text-xl text-center mx-auto my-4">
            Złap za eksponat i przerzuć go tutaj, aby dodać go do wyświetlania
          </h1>
        ) : (
          itemsOnTimeline.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center relative flex-shrink-0"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative mt-5 mb-1">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white border-2 border-black rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                  {index + 1}
                </div>

                <Image
                  src={item.img}
                  alt={item.title ? item.title : "Image"}
                  width={120}
                  height={120}
                  className={`rounded-md shadow-md object-cover transition duration-300 ease-in-out ${
                    hoveredIndex === index ? "blur-sm" : ""
                  }`}
                />

                {hoveredIndex === index && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveLeft(index);
                      }}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
                      disabled={index === 0}
                    >
                      ←
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveRight(index);
                      }}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
                      disabled={index === itemsOnTimeline.length - 1}
                    >
                      →
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md z-10"
                      title="Usuń z osi czasu"
                    >
                      ×
                    </button>
                  </>
                )}
              </div>

              {index < itemsOnTimeline.length - 1 && (
                <span className="mx-2 text-3xl flex-shrink-0">→</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DisplayTimeLineItems;
