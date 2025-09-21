'use client';

import { useState } from 'react';
import { ChatInterface } from "@/components/chat-interface";
import { VideoCard } from '@/components/video-card';
import type { YouTubeRecommendationOutput } from '@/ai/flows/youtube-recommendation-flow';
import { Badge } from '@/components/ui/badge';
import { Youtube } from 'lucide-react';
import { ChatAnalysis } from '@/components/chat-analysis';
import { Gad9Onboarding } from '@/components/gad-9-onboarding';
import type { Gad9Result } from '@/components/gad-9-onboarding';
import type { Message } from '@/components/chat-interface';
import { DailyTasks } from '@/components/daily-tasks';
import { ConvaiWidget } from '@/components/convai-widget';


export default function NirvanaAiPage() {
    const [recommendations, setRecommendations] = useState<YouTubeRecommendationOutput | null>(null);
    const [assessmentResult, setAssessmentResult] = useState<Gad9Result | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    const getIntensityVariant = (intensity?: 'low' | 'medium' | 'high') => {
        switch (intensity) {
            case 'high':
                return 'destructive';
            case 'medium':
                return 'secondary';
            case 'low':
                return 'default';
            default:
                return 'outline';
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <header className="mb-4 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">Nirvana AI</h1>
                    <p className="text-muted-foreground">Your personal AI wellness guide. Ask me anything.</p>
                </div>
                <div className="flex items-center gap-4">
                    {assessmentResult && (
                         <Badge variant={getIntensityVariant(assessmentResult.riskLevel)} className="text-sm">
                            Risk Level: <span className="capitalize ml-1 font-semibold">{assessmentResult.riskLevel}</span>
                        </Badge>
                    )}
                    <ChatAnalysis messages={messages}/>
                </div>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 flex-grow">
                <div className="lg:col-span-3 h-full">
                    {!assessmentResult ? (
                        <Gad9Onboarding setAssessmentResult={setAssessmentResult} />
                    ) : (
                        <div className="flex flex-col gap-8 h-full">
                            <ChatInterface 
                                setRecommendations={setRecommendations} 
                                assessmentResult={assessmentResult}
                                messages={messages}
                                setMessages={setMessages}
                            />
                            <DailyTasks riskLevel={assessmentResult.riskLevel} />
                        </div>
                    )}
                </div>
                <div className="lg:col-span-2 space-y-8">
                    <ConvaiWidget />
                    <div className="sticky top-6 space-y-8">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Youtube className="w-5 h-5 text-primary" />
                                    Video Recommendations
                                </h2>
                                {recommendations?.intensity && (
                                    <Badge variant={getIntensityVariant(recommendations.intensity)} className="capitalize">
                                        {recommendations.intensity} Intensity
                                    </Badge>
                                )}
                            </div>
                            <div className="flex flex-col gap-4">
                                {recommendations?.videos && recommendations.videos.length > 0 ? (
                                    recommendations.videos.map((video) => (
                                        <VideoCard key={video.videoId} video={video} />
                                    ))
                                ) : (
                                    <div className="text-center text-muted-foreground py-10">
                                        <p>Ask a question in the chat to see video recommendations here.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
