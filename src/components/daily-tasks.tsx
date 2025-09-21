'use client';

import { useState, ChangeEvent } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Circle, Loader2, Sparkles, XCircle, Upload, ListTodo } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { processWellnessImage, ProcessWellnessImageOutput } from '@/ai/flows/process-wellness-image';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type Task = {
  id: number;
  name: string;
  icon: keyof typeof LucideIcons;
  completed: boolean;
};

const allTasks = [
    { id: 1, name: 'Mindful Morning', icon: 'Sunrise', risk: ['low', 'medium'] },
    { id: 2, name: 'Digital Detox', icon: 'SmartphoneNfc', risk: ['medium', 'high'] },
    { id: 3, name: 'Nature Walk', icon: 'Mountain', risk: ['low', 'medium'] },
    { id: 4, name: 'Gratitude Journal', icon: 'BookHeart', risk: ['low', 'medium', 'high'] },
    { id: 5, name: 'Hydration Hero', icon: 'GlassWater', risk: ['low'] },
    { id: 6, name: 'Creative Hour', icon: 'Paintbrush', risk: ['low', 'medium'] },
    { id: 7, name: 'Meditation Master', icon: 'BrainCircuit', risk: ['medium', 'high'] },
    { id: 8, name: 'Connect with a Friend', icon: 'Users', risk: ['medium', 'high']},
    { id: 9, name: 'Deep Breathing', icon: 'Wind', risk: ['high']},
];

export function DailyTasks({ riskLevel }: { riskLevel: 'low' | 'medium' | 'high' }) {
  const [tasks, setTasks] = useState<Task[]>(() => 
    allTasks
        .filter(task => task.risk.includes(riskLevel))
        .slice(0, 3)
        .map(({ id, name, icon }) => ({ id, name, icon, completed: false }))
  );
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProcessWellnessImageOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompleteClick = (task: Task) => {
    setSelectedTask(task);
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

    let imageDataUri: string | undefined = undefined;
    if (imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = async () => {
        try {
          imageDataUri = reader.result as string;
          const res = await processWellnessImage({ imageDescription: description || selectedTask.name, imageDataUri });
          setResult(res);
          if (res.isValid) {
              setTasks(currentTasks =>
                  currentTasks.map(t =>
                      t.id === selectedTask.id ? { ...t, completed: true } : t
                  )
              );
          }
        } catch (err) {
            setError('Failed to validate image. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
      };
      reader.onerror = () => {
        setError('Failed to read image file.');
        setLoading(false);
      }
    } else {
        try {
            const res = await processWellnessImage({ imageDescription: description || selectedTask.name });
            setResult(res);
             if (res.isValid) {
                setTasks(currentTasks =>
                    currentTasks.map(t =>
                        t.id === selectedTask.id ? { ...t, completed: true } : t
                    )
                );
            }
        } catch (err) {
            setError('Failed to generate image. Please try again.');
        } finally {
            setLoading(false);
        }
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedTask(null);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ListTodo /> Suggested Tasks for You</CardTitle>
          <CardDescription>Based on your assessment, here are some tasks that might help.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-3">
            {tasks.map(task => {
                const Icon = LucideIcons[task.icon] as React.ElementType;
                return (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                        {task.completed ? <CheckCircle className="w-6 h-6 text-green-500" /> : <Circle className="w-6 h-6 text-muted-foreground" />}
                        <p className="font-semibold">{task.name}</p>
                    </div>
                    {!task.completed && (
                        <Button size="sm" onClick={() => handleCompleteClick(task)}>Complete</Button>
                    )}
                </div>
                );
            })}
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
    </>
  );
}
