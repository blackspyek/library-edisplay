"use client";
import React, {useState} from 'react'
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {PlusIcon} from "lucide-react";
import NewExpositionModal from "@/components/NewExpositionModal";

interface CardData {
    id: number;
    title: string;
    year: string;
}


const cards: CardData[] = [
    {
        id: 1,
        title: "Adam Mickiewicz",
        year: "2024"
    },
    {
        id: 2,
        title: "Jan Kochanowski",
        year: "2024"
    }
];
const DisplayCards = () => {
    const [activeCardId, setActiveCardId] = useState<number | null>(1);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [pendingCardId, setPendingCardId] = useState<number | null>(null);

    const handleCardClick = (cardId: number): void => {
        if (cardId !== activeCardId) {
            setPendingCardId(cardId);
            setIsDialogOpen(true);
        }
    };

    const handleConfirm = (): void => {
        setActiveCardId(pendingCardId);
        setIsDialogOpen(false);
        setPendingCardId(null);
    };

    const handleCancel = (): void => {
        setIsDialogOpen(false);
        setPendingCardId(null);
    };
    const getPendingCardTitle = (): string => {
        return cards.find(card => card.id === pendingCardId)?.title || '';
    };

    return (
        <main className="flex flex-wrap gap-4 p-10 w-full">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    className={`flex flex-col w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] h-40 
                                      ${activeCardId === card.id ? 'border-green-500' : 'border-red-500'} 
                                      border-2 transition-colors duration-200 cursor-pointer`}
                    onClick={() => handleCardClick(card.id)}
                >
                    <CardHeader>
                        <CardTitle>{card.title}</CardTitle>
                        <CardDescription>{card.year}</CardDescription>
                    </CardHeader>
                    <CardFooter className="w-full">
                        <Button className="w-full">Edytuj Wystawę</Button>
                    </CardFooter>
                </Card>
            ))}
            <NewExpositionModal/>

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Potwierdzenie zmiany aktywnej wystawy na {getPendingCardTitle()}</AlertDialogTitle>
                        <AlertDialogDescription>
                            Czy na pewno chcesz zmienić aktywną wystawę? Poprzednia wystawa zostanie wyłączona.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancel}>Anuluj</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirm}>Potwierdź</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    )
}
export default DisplayCards
