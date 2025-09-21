'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { processWellnessImage, ProcessWellnessImageOutput } from '@/ai/flows/process-wellness-image';
import { Loader2, UploadCloud, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export function ImageSubmission() {
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ProcessWellnessImageOutput | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const res = await processWellnessImage({ imageDescription: description });
            setResult(res);
        } catch (err) {
            setError('Failed to generate image. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><UploadCloud /> Submit Your Activity</CardTitle>
                    <CardDescription>Describe your completed wellness activity to generate an image and earn a badge.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="description">Activity Description</Label>
                        <Input
                            id="description"
                            placeholder="e.g., A peaceful morning yoga session by the window"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    {loading && (
                        <div className="flex items-center justify-center p-8 text-muted-foreground">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="ml-2">Generating your wellness image...</p>
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
                            <Alert>
                                <CheckCircle className="h-4 w-4" />
                                <AlertTitle>Success!</AlertTitle>
                                <AlertDescription>{result.feedback}</AlertDescription>
                            </Alert>
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                                <Image src={result.imageUrl} alt={description} fill className="object-cover" />
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={loading || !description}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Generate & Submit
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
