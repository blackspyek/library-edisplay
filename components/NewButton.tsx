import React, {FC} from 'react'
import {PlusIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

interface NewButtonProps {
    setIsCreateDialogOpen: (value: boolean) => void;
    label: string;
}
const NewButton: FC<NewButtonProps> = ({setIsCreateDialogOpen, label}) => {
    return (
        <div className="relative">
            <Button
                className="absolute bottom-4 right-14 border border-black font-bold hover:bg-black hover:text-white"
                variant="secondary"
                onClick={() => setIsCreateDialogOpen(true)}
            >
                {label}
                <PlusIcon className="w-6 h-6 ml-2"/>
            </Button>
        </div>
    )
}
export default NewButton
