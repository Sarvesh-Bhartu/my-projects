import { ChallengeCard } from "@/components/challenge-card";
import { CreateChallenge } from "@/components/create-challenge";
import { raceChallenges } from "@/lib/data";

export default function RaceChallengesPage() {
    return (
        <div className="flex flex-col gap-8">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">Race Challenges</h1>
                    <p className="text-muted-foreground">Compete with others and push your limits.</p>
                </div>
                <CreateChallenge />
            </header>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {raceChallenges.map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
            </div>
        </div>
    );
}
