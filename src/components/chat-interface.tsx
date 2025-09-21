'use client';

import { wellnessGuidanceChat, WellnessGuidanceChatInput } from "@/ai/flows/wellness-guidance-chat";
import { youtubeRecommendation, YouTubeRecommendationOutput } from "@/ai/flows/youtube-recommendation-flow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { Bot, Loader2, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Gad9Result } from "./gad-9-onboarding";

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
}

interface ChatInterfaceProps {
    setRecommendations: (recommendations: YouTubeRecommendationOutput | null) => void;
    assessmentResult: Gad9Result | null;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
}

export function ChatInterface({ setRecommendations, assessmentResult, messages, setMessages }: ChatInterfaceProps) {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar-1');
    
    useEffect(() => {
        if (scrollAreaRef.current) {
            const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
            if(viewport) {
                viewport.scrollTo({
                    top: viewport.scrollHeight,
                    behavior: 'smooth',
                });
            }
        }
    }, [messages]);


    const handleSendMessage = async (messageText?: string) => {
        const text = messageText || input;
        if (!text.trim()) return;

        const newUserMessage: Message = { id: Date.now().toString(), text, sender: 'user' };
        setMessages([...messages, newUserMessage]);
        
        setInput('');
        setIsLoading(true);
        setRecommendations(null);

        try {
            const chatInput: WellnessGuidanceChatInput = { 
                message: text,
            };
            if (assessmentResult?.riskLevel) {
                chatInput.riskLevel = assessmentResult.riskLevel;
            }

            const [chatResponse, recommendationResponse] = await Promise.all([
                wellnessGuidanceChat(chatInput),
                youtubeRecommendation({ query: text })
            ]);

            const aiResponse: Message = { id: (Date.now() + 1).toString(), text: chatResponse.response, sender: 'ai' };
            setMessages(prev => [...prev, aiResponse]);
            setRecommendations(recommendationResponse);

        } catch (error) {
            const errorResponse: Message = { id: (Date.now() + 1).toString(), text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'ai' };
            setMessages(prev => [...prev, errorResponse]);
            setRecommendations(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-card border rounded-lg shadow-sm">
            <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
                <div className="space-y-6">
                    {messages.map((message) => (
                        <div key={message.id} className={cn("flex items-start gap-3", message.sender === 'user' ? 'justify-end' : 'justify-start')}>
                            {message.sender === 'ai' && (
                                <Avatar className="w-8 h-8 border-2 border-primary">
                                    <AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={cn("max-w-md p-3 rounded-lg shadow-sm", message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                <p className="text-sm">{message.text}</p>
                            </div>
                             {message.sender === 'user' && (
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={userAvatar?.imageUrl} data-ai-hint={userAvatar?.imageHint} />
                                    <AvatarFallback><User className="w-4 h-4"/></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3 justify-start">
                             <Avatar className="w-8 h-8 border-2 border-primary">
                                <AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback>
                            </Avatar>
                            <div className="max-w-md p-3 rounded-lg bg-muted flex items-center">
                                <Loader2 className="w-5 h-5 animate-spin text-primary"/>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
            <div className="p-4 border-t bg-background/50 rounded-b-lg">
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={"Type your message..."}
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
