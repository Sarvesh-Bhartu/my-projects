
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HeartPulse, Bot, Users, Trophy, ArrowRight, CheckCircle, Circle, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';


const features = [
    {
        icon: <Bot className="w-8 h-8 text-[#F26B6B]" />,
        title: "AI-Powered Insights",
        description: "Get personalized recommendations and insights tailored to your unique wellness journey. Our AI learns from your patterns and suggests the perfect next steps.",
        color: "border-[#F26B6B]"
    },
    {
        icon: <Users className="w-8 h-8 text-[#33C2C2]" />,
        title: "Community Connection",
        description: "Join a vibrant community of wellness enthusiasts. Share your journey, celebrate wins together, and find accountability partners who truly understand.",
        color: "border-[#33C2C2]"
    },
    {
        icon: <Trophy className="w-8 h-8 text-[#F5D565]" />,
        title: "Gamified Challenges",
        description: "Turn your wellness goals into exciting challenges. Earn points, unlock achievements, and compete with friends in a fun, supportive environment.",
        color: "border-[#F5D565]"
    }
]

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-800">
            <header className="px-4 lg:px-12 h-20 flex items-center justify-between border-b bg-[#F26B6B]">
                <Link href="/" className="flex items-center justify-center">
                    <div className="bg-white rounded-full p-2">
                        <BrainCircuit className="h-6 w-6 text-[#F26B6B]" />
                    </div>
                    <span className="ml-3 text-2xl font-bold text-white">mindX Agent</span>
                </Link>
                <nav className="flex gap-4 sm:gap-6 items-center">
                    <Button variant="ghost" asChild className="text-white hover:bg-white/20 hover:text-white">
                        <Link href="/sign-in">
                            Login
                        </Link>
                    </Button>
                    <Button asChild className="bg-[#F5D565] text-gray-900 hover:bg-[#F5D565]/90">
                        <Link href="/sign-up">Demo</Link>
                    </Button>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                            <div className="space-y-6">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                                    Transform Your
                                    <br />
                                    <span className="text-[#F26B6B]">Wellness Journey</span>
                                    <br />
                                    <span className="text-[#33C2C2]">With Joy!</span>
                                </h1>
                                <p className="max-w-[600px] text-gray-600 md:text-xl">
                                    Discover the power of community-driven wellness with AI-powered insights, playful challenges, and real connections that inspire lasting change through our vibrant 80s-inspired platform.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button size="lg" className="bg-[#F26B6B] hover:bg-[#F26B6B]/90 text-white" asChild>
                                        <Link href="/sign-up">
                                            Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" className="border-[#33C2C2] text-[#33C2C2] hover:bg-[#33C2C2] hover:text-white">
                                        Watch Demo
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <Card className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 border-2 border-gray-100">
                                    <CardContent className="p-0">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold">Daily Challenge</h3>
                                                <p className="text-sm text-gray-500">Complete 3 wellness activites</p>
                                            </div>
                                            <Trophy className="w-6 h-6 text-[#F5D565]" />
                                        </div>
                                        <ul className="space-y-3 mb-4">
                                            <li className="flex items-center gap-3">
                                                <FaCheckCircle className="w-5 h-5 text-green-500" />
                                                <span className="text-sm">Morning meditation (15 min)</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <FaCheckCircle className="w-5 h-5 text-green-500" />
                                                <span className="text-sm">Hydration tracking</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <FaRegCircle className="w-5 h-5 text-gray-400" />
                                                <span className="text-sm">Evening reflection</span>
                                            </li>
                                        </ul>
                                        <div className="text-right mb-2">
                                            <p className="font-bold text-xl">2/3 Complete</p>
                                            <p className="text-xs text-gray-500">You&apos;re crushing it today!</p>
                                        </div>
                                        <Progress value={66} className="h-2 [&>div]:bg-gradient-to-r from-[#F5D565] to-[#F26B6B]" />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Why Choose mindX Agent?</h2>
                            <p className="max-w-[700px] text-gray-600 md:text-lg">
                                Experience wellness like never before with our unique blend of AI intelligence, community support, and gamified challenges in a joyful, vibrant environment.
                            </p>
                        </div>
                        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                            {features.map((feature, index) => (
                                <Card key={index} className={`bg-white shadow-md rounded-xl p-6 border-t-4 ${feature.color}`}>
                                    <div className="flex items-center justify-center bg-gray-100 rounded-lg w-16 h-16 mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F26B6B]">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-6 text-center text-white">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Ready to Transform Your Life?</h2>
                            <p className="max-w-[600px] text-white/90 md:text-lg">
                                Join thousands of people who have already started their wellness transformation. Your journey to a healthier, happier you starts with a single step.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="bg-white text-[#F26B6B] hover:bg-gray-100" asChild>
                                    <Link href="/sign-up">
                                        Start Free Today <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#F26B6B]">
                                    Learn More
                                </Button>
                            </div>
                            <p className="text-xs text-white/80">No credit card required • 14-day free trial</p>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
                <p className="text-xs text-gray-500">
                    © 2024 mindX Agent. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
