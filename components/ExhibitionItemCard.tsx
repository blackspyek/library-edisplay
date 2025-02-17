import React, { FC } from "react";
import { ExhibitionItem } from "@prisma/client";
import { useDraggable } from "@dnd-kit/core";
interface ExhibitionItemProps {
  item: ExhibitionItem;
}
const ExhibitionItemCard: FC<ExhibitionItemProps> = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id.toString(),
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="w-1/12 bg-white rounded-md shadow-md flex flex-col"
      style={style}
    >
      <img
        src={item.img}
        alt={item.title ? item.title : "Image"}
        className="w-full rounded-t-md"
      />
      <div className="p-2 border-gray-400 border text-center flex-grow flex items-center justify-center">
        <h3 className="text-xs break-words">{item.title}</h3>
      </div>
    </div>
  );
};
export default ExhibitionItemCard;
