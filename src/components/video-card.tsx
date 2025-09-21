'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Youtube } from 'lucide-react';

type Video = {
  videoId: string;
  title: string;
  channel: string;
  thumbnailUrl: string;
};

export function VideoCard({ video }: { video: Video }) {
  return (
    <Link href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer">
      <Card className="group hover:bg-accent transition-colors">
        <CardContent className="flex gap-4 p-3">
          <div className="relative w-32 h-20 flex-shrink-0 overflow-hidden rounded-md">
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
             <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Youtube className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h4 className="font-semibold text-sm leading-tight line-clamp-2">{video.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{video.channel}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
