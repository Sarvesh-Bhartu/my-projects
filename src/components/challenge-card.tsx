import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { TrendingUp, Star } from "lucide-react";

type Challenge = {
    id: number;
    title: string;
    points: number;
    streak: number;
    creator: {
        name: string;
        avatarId: string;
    };
    bgImageId: string;
};

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
    const creatorAvatar = PlaceHolderImages.find(p => p.id === challenge.creator.avatarId);
    const bgImage = PlaceHolderImages.find(p => p.id === challenge.bgImageId);

    return (
        <Card className="overflow-hidden flex flex-col group shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0 relative h-40">
                {bgImage && (
                    <Image
                        src={bgImage.imageUrl}
                        alt={challenge.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        data-ai-hint={bgImage.imageHint}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-lg font-bold text-white">{challenge.title}</h3>
                </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
                <div className="flex justify-between text-sm mb-4">
                    <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-secondary" />
                        <span className="font-semibold">{challenge.points}</span>
                        <span className="text-muted-foreground">Points</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-secondary" />
                        <span className="font-semibold">{challenge.streak}</span>
                        <span className="text-muted-foreground">Day Streak</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={creatorAvatar?.imageUrl} data-ai-hint={creatorAvatar?.imageHint} />
                        <AvatarFallback>{challenge.creator.name.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-xs text-muted-foreground">Created by</p>
                        <p className="text-sm font-semibold">{challenge.creator.name}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button className="w-full">Join Challenge</Button>
            </CardFooter>
        </Card>
    );
}
