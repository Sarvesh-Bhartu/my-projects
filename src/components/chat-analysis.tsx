'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { analyzeChatHistory, ChatAnalysisOutput } from '@/ai/flows/analyze-chat-history';
import { BarChart, Heart, Loader2, Sparkles, Users, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Message } from './chat-interface';

interface ChatAnalysisProps {
  messages: Message[];
}

export function ChatAnalysis({ messages }: ChatAnalysisProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ChatAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const getIntensityVariant = (intensity?: 'low' | 'medium' | 'high') => {
    switch (intensity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      default: return 'default';
    }
  };

  const handleAnalyze = async () => {
    if (messages.length === 0) {
        toast({
            title: "No History",
            description: "There are no chat messages to analyze yet.",
            variant: "destructive"
        });
        return;
    }

    setIsLoading(true);
    setIsOpen(true);
    setError(null);
    setAnalysis(null);

    try {
      const historyText = messages.map(m => `${m.sender === 'user' ? 'User' : 'AI'}: ${m.text}`).join('\n');
      const result = await analyzeChatHistory({ chatHistory: historyText });
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during analysis.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderRecommendationAction = () => {
    if (!analysis) return null;

    switch (analysis.suggestedAction) {
      case 'soulSprints':
        return (
          <Button asChild className="mt-4">
            <Link href="/soul-sprint">
              <Sparkles className="mr-2 h-4 w-4" />
              Explore Soul Sprints
            </Link>
          </Button>
        );
      case 'meetingPods':
        return (
          <Button asChild className="mt-4">
            <Link href="/meeting-pods">
              <Users className="mr-2 h-4 w-4" />
              Find a Meeting Pod
            </Link>
          </Button>
        );
      case 'professionalHelp':
        return (
          <Alert variant="destructive" className="mt-4">
            <Heart className="h-4 w-4" />
            <AlertTitle>Immediate Support</AlertTitle>
            <AlertDescription>
              Please consider reaching out to a mental health professional or a support hotline. Your well-being is the top priority.
            </AlertDescription>
          </Alert>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Button onClick={handleAnalyze} disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <BarChart className="mr-2 h-4 w-4" />
        )}
        Analyze My Chat
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your Wellness Analysis</DialogTitle>
            <DialogDescription>
              Based on your conversation, here is a summary of your needs.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {isLoading && (
              <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>Analyzing your chat history...</p>
              </div>
            )}
            {error && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Analysis Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {analysis && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Intensity Level</h3>
                    <Badge variant={getIntensityVariant(analysis.intensity)} className="capitalize">
                        {analysis.intensity}
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{analysis.recommendation}</p>
                <div>
                    {renderRecommendationAction()}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
