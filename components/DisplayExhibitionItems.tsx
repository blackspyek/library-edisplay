import React, { FC } from "react";
import { ExhibitionItem } from "@prisma/client";
import ExhibitionItemCard from "@/components/ExhibitionItemCard";

interface DisplayExhibitionItemsProps {
  items: ExhibitionItem[];
}
const DisplayExhibitionItems: FC<DisplayExhibitionItemsProps> = ({ items }) => {
  return (
    <div className="p-10 overflow-y-auto border-gray-300 border m-2">
      <div className="flex flex-wrap gap-4">
        {items.map((item) => (
          <ExhibitionItemCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
export default DisplayExhibitionItems;
