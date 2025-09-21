'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Badge } from './ui/badge';
import { Loader2, Bot, ArrowRight, Play } from 'lucide-react';
import { analyzeRiskLevel } from '@/ai/flows/analyze-risk-level';
import type { AnalyzeRiskLevelOutput } from '@/ai/flows/analyze-risk-level';

const gad9Questions = [
  "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
  "Over the last 2 weeks, how often have you been bothered by not being able to stop or control worrying?",
  "Over the last 2 weeks, how often have you been bothered by worrying too much about different things?",
  "Over the last 2 weeks, how often have you been bothered by having trouble relaxing?",
  "Over the last 2 weeks, how often have you been bothered by being so restless that it is hard to sit still?",
  "Over the last 2 weeks, how often have you been bothered by becoming easily annoyed or irritable?",
  "Over the last 2 weeks, how often have you been bothered by feeling afraid as if something awful might happen?"
];

const answerOptions = [
  { text: "Not at all", value: 0 },
  { text: "Several days", value: 1 },
  { text: "More than half the days", value: 2 },
  { text: "Nearly every day", value: 3 }
];

export type Gad9Result = AnalyzeRiskLevelOutput & { score: number };

interface Gad9OnboardingProps {
    setAssessmentResult: (result: Gad9Result) => void;
}

export function Gad9Onboarding({ setAssessmentResult }: Gad9OnboardingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [finalResult, setFinalResult] = useState<Gad9Result | null>(null);

  const startAssessment = () => {
    setIsOpen(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setFinalResult(null);
  };

  const handleSelectAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestionIndex < gad9Questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateAndSetResult(newAnswers);
    }
  };

  const calculateAndSetResult = async (finalAnswers: number[]) => {
    setIsLoading(true);
    const totalScore = finalAnswers.reduce((sum, val) => sum + val, 0);
    try {
      const result = await analyzeRiskLevel({ score: totalScore });
      const fullResult = { ...result, score: totalScore };
      setFinalResult(fullResult);
    } catch (error) {
      console.error("Failed to analyze risk level", error);
    } finally {
        setIsLoading(false);
    }
  };

  const finishOnboarding = () => {
    if (finalResult) {
      setAssessmentResult(finalResult);
    }
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-card border rounded-lg p-8 text-center">
        <Bot className="w-16 h-16 text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-2">Welcome to Nirvana AI</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
            To help personalize your experience, you can start with a quick, private wellness assessment. Your responses are confidential.
        </p>
        <Button size="lg" onClick={startAssessment}>
            <Play className="mr-2 h-5 w-5" />
            Start Wellness Assessment
        </Button>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Wellness Assessment</DialogTitle>
                    <DialogDescription>
                        {finalResult ? "Here is your assessment summary." : `Question ${currentQuestionIndex + 1} of ${gad9Questions.length}`}
                    </DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center p-8 text-muted-foreground gap-4">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <p>Analyzing your results...</p>
                    </div>
                ) : finalResult ? (
                    <div className="py-4 space-y-4 text-center">
                        <Badge variant={finalResult.riskLevel === 'high' ? 'destructive' : finalResult.riskLevel === 'medium' ? 'secondary' : 'default'} className="text-lg px-4 py-1 capitalize">
                            {finalResult.riskLevel} Risk
                        </Badge>
                        <p className="text-2xl font-bold">Score: {finalResult.score} / 21</p>
                        <p className="text-muted-foreground">{finalResult.summary}</p>
                    </div>
                ) : (
                    <div className="py-4 space-y-6">
                        <div className="flex items-start gap-4">
                            <Bot className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                            <p className="text-lg font-semibold">{gad9Questions[currentQuestionIndex]}</p>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                             <div className="grid grid-cols-2 gap-3 w-full">
                                {answerOptions.map((opt) => (
                                    <Button key={opt.value} variant="outline" onClick={() => handleSelectAnswer(opt.value)}>
                                        {opt.text}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                
                <DialogFooter>
                    {finalResult && !isLoading && (
                        <Button onClick={finishOnboarding}>
                            Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
