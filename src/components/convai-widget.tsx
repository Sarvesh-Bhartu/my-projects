'use client';

import Script from 'next/script';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Bot } from 'lucide-react';

export function ConvaiWidget() {
  return (
    <>
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
                <Bot className="w-5 h-5 text-primary" />
                AI Voice Agent
            </CardTitle>
        </CardHeader>
        <CardContent>
            <elevenlabs-convai agent-id="agent_4901k5m5r864egat3aqdxnttdvp8" show-watermark="false"></elevenlabs-convai>
        </CardContent>
      </Card>
      <Script 
        src="https://unpkg.com/@elevenlabs/convai-widget-embed" 
        async 
        strategy="lazyOnload"
      />
    </>
  );
}
