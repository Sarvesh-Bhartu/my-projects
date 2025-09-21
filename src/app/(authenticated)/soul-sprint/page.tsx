'use client';

import { useState, ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { soulSprintBadges } from "@/lib/data";
import { HexagonBadge } from "@/components/hexagon-badge";
import { Award, CheckCircle, Loader2, Sparkles, Upload, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';
import { processWellnessImage } from '@/ai/flows/process-wellness-image';
import type { ProcessWellnessImageOutput } from '@/ai/flows/process-wellness-image';
import type { IconName } from '@/components/hexagon-badge';


type Badge = {
    id: number;
    name: string;
    icon: IconName;
    completed: boolean;
};

export default function SoulSprintPage() {
    const [badges, setBadges] = useState<Badge[]>(
        soulSprintBadges.map(b => ({ ...b, completed: false, icon: b.icon as IconName }))
    );
    const [selectedTask, setSelectedTask] = useState<Badge | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ProcessWellnessImageOutput | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleBadgeClick = (badge: Badge) => {
        if (badge.completed) return;
        setSelectedTask(badge);
        setDescription('');
        setImageFile(null);
        setResult(null);
        setError(null);
        setIsDialogOpen(true);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleImageProcessing = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTask) return;

        setLoading(true);
        setError(null);
        setResult(null);

        const processImage = async (imageDataUri?: string) => {
            try {
                const res = await processWellnessImage({
                    imageDescription: description || selectedTask.name,
                    imageDataUri,
                });
                setResult(res);
                if (res.isValid) {
                    setBadges(currentBadges =>
                        currentBadges.map(b =>
                            b.id === selectedTask.id ? { ...b, completed: true } : b
                        )
                    );
                }
            } catch (err) {
                setError(`Failed to ${imageDataUri ? 'validate' : 'generate'} image. Please try again.`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (imageFile) {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onload = () => processImage(reader.result as string);
            reader.onerror = () => {
                setError('Failed to read image file.');
                setLoading(false);
            };
        } else {
            processImage();
        }
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedTask(null);
    };

    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">Soul Sprint</h1>
                <p className="text-muted-foreground">Complete wellness tasks, submit proof, and earn badges.</p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Award /> your task</CardTitle>
                    <CardDescription>Collect them all by completing Soul Sprints.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
                        {badges.map(badge => (
                            <button key={badge.id} onClick={() => handleBadgeClick(badge)} disabled={badge.completed} className="disabled:cursor-not-allowed">
                                <HexagonBadge
                                    iconName={badge.icon}
                                    label={badge.name}
                                    isUnlocked={!badge.completed}
                                />
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

             <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleImageProcessing}>
                        <DialogHeader>
                        <DialogTitle>Complete: {selectedTask?.name}</DialogTitle>
                        <DialogDescription>
                            Upload an image as proof of your activity, or describe it to generate an image.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="image-upload">Upload Proof (Optional)</Label>
                                <Input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Activity Description</Label>
                                <Input
                                    id="description"
                                    placeholder={`e.g., "A photo of my healthy meal"`}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            {loading && (
                                <div className="flex items-center justify-center p-4 text-muted-foreground">
                                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                    <p className="ml-2">Processing image...</p>
                                </div>
                            )}
                            {error && (
                                <Alert variant="destructive">
                                    <XCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            {result && (
                                <div className="space-y-4">
                                    <Alert variant={result.isValid ? "default" : "destructive"}>
                                        {result.isValid ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                                        <AlertTitle>{result.isValid ? "Task Complete!" : "Validation Failed"}</AlertTitle>
                                        <AlertDescription>
                                            {result.feedback}
                                        </AlertDescription>
                                    </Alert>
                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                                        <Image src={result.imageUrl} alt={description} fill className="object-cover" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                        <Button type="button" variant="secondary" onClick={closeDialog}>
                            {result?.isValid ? 'Close' : 'Cancel'}
                            </Button>
                        {!result?.isValid && <Button type="submit" disabled={loading || !description}>
                            {imageFile ? <Upload className="mr-2 h-4 w-4" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            {imageFile ? 'Upload & Validate' : 'Generate Proof'}
                        </Button>}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
