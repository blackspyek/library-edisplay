import React from "react";
import { ExhibitionItem } from "@prisma/client";
import DisplayExhibitionItems from "@/components/DisplayExhibitionItems";
import { Button } from "@/components/ui/button";
import NewExpositionItemModal from "@/components/NewExpositionItemModal";
import DisplayTimeLineItems from "@/components/DisplayTimeLineItems";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import ExhibitionPageContent from "@/components/ExhibitionPageContent";

interface ExhibitionProps {
  params: {
    id: string;
  };
}

let data: ExhibitionItem[] = [
  {
    id: 1,
    title: "Adam Mickiewicz",
    year: "2024",
    img: "https://picsum.photos/180",
  },
  {
    id: 2,
    title: "Jan Kochanowski",
    year: "2024",
    img: "https://picsum.photos/181",
  },
  {
    id: 3,
    title: "Adam Mickiewicz",
    year: "2024",
    img: "https://picsum.photos/182",
  },
  {
    id: 4,
    title: "Jan Kochanowski",
    year: "2024",
    img: "https://picsum.photos/183",
  },
  {
    id: 5,
    title: "Adam Mickiewicz",
    year: "2024",
    img: "https://picsum.photos/184",
  },
  {
    id: 6,
    title: "Jan Kochanowski",
    year: "2024",
    img: "https://picsum.photos/185",
  },
  {
    id: 7,
    title: "Adam Mickiewicz",
    year: "2024",
    img: "https://picsum.photos/186",
  },
  {
    id: 8,
    title: "Jan Kochanowski",
    year: "2024",
    img: "https://picsum.photos/187",
  },
  {
    id: 9,
    title: "Adam Mickiewicz",
    year: "2024",
    img: "https://picsum.photos/188",
  },
  {
    id: 10,
    title: "Jan Kochanowski",
    year: "2024",
    img: "https://picsum.photos/186",
  },
  {
    id: 11,
    title: "Adam Mickiewicz",
    year: "2024",
    img: "https://picsum.photos/190",
  },
  {
    id: 12,
    title: "Jan Kochanowski",
    year: "2024",
    img: "https://picsum.photos/191",
  },
];

const ExhibitionPage: React.FC<ExhibitionProps> = async ({ params }) => {
  const { id } = await params;
  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId)) {
    return <div className=" text-red-500">Invalid ID</div>;
  }

  return (
    <main className="flex flex-wrap w-full flex-col">
      <ExhibitionPageContent data={data} parsedId={parsedId} />
    </main>
  );
};

export default ExhibitionPage;
