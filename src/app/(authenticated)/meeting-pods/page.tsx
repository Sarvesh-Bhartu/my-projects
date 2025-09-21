import { PodCard } from "@/components/pod-card";
import { meetingPods } from "@/lib/data";

export default function MeetingPodsPage() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">Meeting Pods</h1>
                <p className="text-muted-foreground">Find your tribe. Join a peer support group.</p>
            </header>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {meetingPods.map((pod) => (
                    <PodCard key={pod.id} pod={pod} />
                ))}
            </div>
        </div>
    );
}
