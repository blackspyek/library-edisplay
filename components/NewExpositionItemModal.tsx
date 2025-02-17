"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import NewButton from "@/components/NewButton";
import Image from "next/image";

interface CreateExhibitionItemData {
    title: string;
    author?: string;
    img: File | null;
    audio: File | null;
}

const NewExpositionItemModal = ({ exhibitionId }: { exhibitionId: number }) => {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<CreateExhibitionItemData>({
        title: "",
        author: "",
        img: null,
        audio: null,
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [previewImg, setPreviewImg] = useState<string | null>(null);
    const [audioName, setAudioName] = useState<string | null>(null);

    const { getRootProps: getImgRootProps, getInputProps: getImgInputProps } = useDropzone({
        accept: { "image/*": [] },
        multiple: false,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            setFormData((prev) => ({ ...prev, img: file }));
            setPreviewImg(URL.createObjectURL(file));
        },
    });

    const { getRootProps: getAudioRootProps, getInputProps: getAudioInputProps } = useDropzone({
        accept: { "audio/*": [] },
        multiple: false,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            setFormData((prev) => ({ ...prev, audio: file }));
            setAudioName(file.name);
        },
    });

    const handleUpload = async (file: File, endpoint: string): Promise<string | null> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", endpoint);

        const res = await fetch(`/api/upload`, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            console.error("Upload failed:", await res.text());
            return null;
        }

        const data = await res.json();
        return data.filePath;
    };

    const handleCreateExhibitionItem = async (): Promise<void> => {
        if (!formData.title.trim() || !formData.img) return;
        setIsSubmitting(true);

        try {
            console.log("Uploading files...");

            const imgUploadUrl = formData.img ? await handleUpload(formData.img, "image") : null;
            const audioUploadUrl = formData.audio ? await handleUpload(formData.audio, "audio") : null;

            console.log("Image URL:", imgUploadUrl);
            console.log("Audio URL:", audioUploadUrl);

            // Save exhibition item in your database
            console.log("Creating exhibition item:", {
                title: formData.title,
                author: formData.author,
                img: imgUploadUrl,
                audio: audioUploadUrl,
                exhibitionId,
            });

            // Reset form
            setFormData({ title: "", author: "", img: null, audio: null });
            setPreviewImg(null);
            setAudioName(null);
            setIsCreateDialogOpen(false);
        } catch (error) {
            console.error("Error creating exhibition item:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <NewButton setIsCreateDialogOpen={setIsCreateDialogOpen} label={"Dodaj eksponat"} />

            <AlertDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Dodaj nowy eksponat</AlertDialogTitle>
                        <AlertDialogDescription>Wprowadź dane nowego eksponatu</AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="py-4 space-y-3">
                        <Input placeholder="Tytuł" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                        <Input placeholder="Autor (opcjonalnie)" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />

                        <div {...getImgRootProps()} className="border border-gray-300 p-4 rounded-md text-center cursor-pointer">
                            <input {...getImgInputProps()} />
                            {previewImg ? (
                                <Image src={previewImg} alt="Preview" width={100} height={100} className="mx-auto" />
                            ) : (
                                <p>Przeciągnij i upuść obraz tutaj lub kliknij</p>
                            )}
                        </div>

                        <div {...getAudioRootProps()} className="border border-gray-300 p-4 rounded-md text-center cursor-pointer">
                            <input {...getAudioInputProps()} />
                            {audioName ? <p>{audioName}</p> : <p>Przeciągnij i upuść plik audio tutaj lub kliknij (opcjonalne)</p>}
                        </div>
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => {
                                setFormData({ title: "", author: "", img: null, audio: null });
                                setPreviewImg(null);
                                setAudioName(null);
                                setIsCreateDialogOpen(false);
                            }}
                        >
                            Anuluj
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleCreateExhibitionItem} disabled={isSubmitting || !formData.title.trim() || !formData.img}>
                            {isSubmitting ? "Dodawanie..." : "Dodaj"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default NewExpositionItemModal;
