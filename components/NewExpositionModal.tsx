"use client"
import React, {useState} from 'react'
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Input} from "@/components/ui/input";
import NewButton from "@/components/NewButton";
interface CreateExhibitionData {
    title: string;
}
const NewExpositionModal = () => {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
    const [newExhibitionName, setNewExhibitionName] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const handleCreateExhibition = async (): Promise<void> => {
        if (!newExhibitionName.trim()) return;
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Creating exhibition:', newExhibitionName);
            // const response = await fetch('/api/exhibitions', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         title: newExhibitionName,
            //     }),
            // });
            //
            // if (!response.ok) {
            //     throw new Error('Failed to create exhibition');
            // }

            setNewExhibitionName('');
            setIsCreateDialogOpen(false);

        } catch (error) {
            console.error('Error creating exhibition:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
    <>
        <NewButton setIsCreateDialogOpen={
            setIsCreateDialogOpen
        } label={"Stwórz"}/>

        <AlertDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Dodaj nową wystawę</AlertDialogTitle>
                    <AlertDialogDescription>
                        Wprowadź nazwę nowej wystawy
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4">
                    <Input
                        placeholder="Nazwa wystawy"
                        value={newExhibitionName}
                        onChange={(e) => setNewExhibitionName(e.target.value)}
                        className="w-full"
                    />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            setNewExhibitionName('');
                            setIsCreateDialogOpen(false);
                        }}
                    >
                        Anuluj
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleCreateExhibition}
                        disabled={isSubmitting || !newExhibitionName.trim()}
                    >
                        {isSubmitting ? 'Tworzenie...' : 'Stwórz'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
    )
}
export default NewExpositionModal
