import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { dailyQuote, userStats } from '@/lib/data';
import { BarChart, CheckCircle, Trophy, CalendarDays, TrendingUp } from 'lucide-react';
import { StreakCalendar } from '@/components/streak-calendar';
import { TodaysProgress } from '@/components/todays-progress';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, Alex! Here&apos;s your wellness snapshot.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Check-ins</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.checkIns}</div>
            <p className="text-xs text-muted-foreground">+5 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sprints Completed</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.sprintsCompleted}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Challenges Won</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.challengesWon}</div>
            <p className="text-xs text-muted-foreground">+1 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.currentStreak} days</div>
            <p className="text-xs text-muted-foreground">Keep it going!</p>
          </CardContent>
        </Card>
      </div>

      <TodaysProgress />

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays />
              Your Progress Streak
            </CardTitle>
            <CardDescription>
              A visual look at your check-in consistency.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <StreakCalendar />
          </CardContent>
        </Card>

        <Card className="flex flex-col bg-card shadow-lg border-border">
          <CardHeader>
            <CardTitle>Quote of the Day</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow justify-center text-center">
            <blockquote className="text-lg font-semibold">
              &quot;{dailyQuote.quote}&quot;
            </blockquote>
            <cite className="mt-4 text-sm text-muted-foreground not-italic">
              - {dailyQuote.author}
            </cite>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}