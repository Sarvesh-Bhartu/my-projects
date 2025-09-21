'use client';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Users, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Pod = {
    id: number;
    name: string;
    description: string;
    members: number;
    bgImageId: string;
};

export function PodCard({ pod }: { pod: Pod }) {
    const bgImage = PlaceHolderImages.find(p => p.id === pod.bgImageId);
    const { toast } = useToast();

    const handleJoin = () => {
        toast({
            title: "Joining Audio Call...",
            description: `Connecting you to the '${pod.name}' pod meeting.`,
        });
    };

    return (
        <Card className="overflow-hidden flex flex-col group shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0 relative h-32">
                {bgImage && (
                    <Image
                        src={bgImage.imageUrl}
                        alt={pod.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        data-ai-hint={bgImage.imageHint}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{pod.members}</span>
                </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
                <h3 className="font-bold text-md mb-2">{pod.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{pod.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button className="w-full" onClick={handleJoin}>
                    <Phone className="mr-2 h-4 w-4" />
                    Join Pod
                </Button>
            </CardFooter>
        </Card>
    );
}
