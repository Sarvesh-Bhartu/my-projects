 a
# mindX Agent: Your AI-Powered Wellness Companion

mindX Agent is a comprehensive web application designed to support users on their mental and emotional wellness journey. It combines AI-powered guidance, community features, and gamified challenges to create an engaging and personalized experience.

The platform is built on a modern, server-centric architecture, leveraging the power of Next.js with React Server Components and Genkit for integrated AI capabilities.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI Integration**: [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Deployment**: Firebase App Hosting

## Key Features

### 1. Personalized Dashboard
The user's journey starts on the dashboard, which provides a snapshot of their wellness progress.
- **Stats**: Displays key metrics like total check-ins, sprints completed, challenges won, and current streak.
- **Today's Progress**: A real-time look at daily tasks, powered by a radial progress chart.
- **Streak Calendar**: A visual representation of the user's daily check-in consistency.
- **Quote of the Day**: A daily dose of inspiration.

### 2. Nirvana AI
This is the core interactive feature of the app, providing a personalized AI wellness guide.
- **GAD-9 Wellness Assessment**: An initial 7-question assessment to gauge the user's anxiety level (low, medium, or high).
- **AI-Powered Chat**: A conversational interface where users can ask for advice. The AI's responses are tailored based on the user's assessed risk level.
- **AI Voice Agent**: An integrated ElevenLabs voice agent allows for voice-based interaction.
- **YouTube Recommendations**: Based on the chat query, the AI recommends relevant wellness videos from YouTube.
- **Suggested Daily Tasks**: The AI suggests 3 daily tasks tailored to the user's risk level, which can be completed with image-based proof.
- **Chat History Analysis**: Users can trigger an AI analysis of their conversation to get a deeper summary of their needs and recommended next steps (e.g., Soul Sprints, Meeting Pods).

### 3. Soul Sprint
A gamified feature to encourage consistent wellness habits.
- **Task-Based Badges**: Users complete wellness tasks (e.g., "Mindful Morning," "Nature Walk").
- **AI-Powered Proof of Completion**: To complete a task, users can either:
  1.  Upload an image as proof, which is validated by an AI model (`processWellnessImage` flow).
  2.  Describe the activity and have an AI model generate a proof-of-concept image.
- **Hexagon Badges**: Users collect unique hexagon-shaped badges for each completed task.

### 4. Race Challenges
A competitive feature where users can join challenges created by others.
- **Join Challenges**: Users can participate in time-bound challenges like a "30-Day Meditation Challenge."
- **Create Challenges**: A dialog allows users to create and launch their own challenges for the community.

### 5. Meeting Pods
A community feature for peer-to-peer support.
- **Themed Groups**: Users can join themed audio-based "pods" like "Mindfulness Mavericks" or "Fitness Fanatics."
- **Simulated Audio Calls**: Clicking "Join Pod" simulates connecting to a group audio call and shows a toast notification.

## Project Structure

The project follows a standard Next.js App Router structure.

```
src
├── app
│   ├── (authenticated)       # Routes protected by authentication
│   │   ├── dashboard/
│   │   ├── meeting-pods/
│   │   ├── nirvana-ai/
│   │   ├── race-challenges/
│   │   └── soul-sprint/
│   ├── (unauthenticated)     # Publicly accessible routes (landing page)
│   ├── sign-in/
│   ├── sign-up/
│   ├── actions/              # Server Actions (e.g., auth)
│   ├── globals.css           # Global styles and Tailwind directives
│   └── layout.tsx            # Root layout
├── ai
│   ├── flows/                # Genkit AI flow definitions
│   └── genkit.ts             # Genkit global configuration
├── components
│   ├── ui/                   # ShadCN UI components
│   └── *.tsx                 # Custom application components
├── hooks/
│   ├── use-mobile.ts         # Hook to detect mobile viewports
│   └── use-toast.ts          # Hook for managing toast notifications
└── lib
    ├── data.ts               # Static data for the application
    ├── firebase.ts           # Client-side Firebase initialization
    ├── firebase-admin.ts     # Server-side Firebase Admin SDK initialization
    └── placeholder-images.*  # Manages placeholder image data
```

## Genkit AI Flows

The application's intelligence is powered by several Genkit flows located in `src/ai/flows/`. All flows are defined with `use server` and are invoked from React Server Components or client components via Server Actions.

- **`analyze-chat-history.ts`**: Analyzes the user's chat history to determine an intensity level (`low`, `medium`, `high`) and suggest a relevant action (`soulSprints`, `meetingPods`, `professionalHelp`).
- **`analyze-risk-level.ts`**: Takes a GAD-9 score and returns a risk level and an empathetic summary.
- **`process-wellness-image.ts`**: Handles image-related tasks. It can either:
  - Generate an image from a text description using Imagen.
  - Validate a user-uploaded image against a description to confirm it's valid proof.
- **`text-to-speech.ts`**: Converts a string of text into speech audio (WAV format) using a TTS model.
- **`wellness-guidance-chat.ts`**: The main chat flow. It takes a user's message and optional risk level to generate a context-aware, empathetic response.
- **`youtube-recommendation-flow.ts`**: Takes a user query and returns a list of 3 plausible (but fake) YouTube video recommendations with placeholder data.

## Getting Started

Follow these steps to get the project running locally.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Firebase and Google AI API keys.
    ```
    # Example .env file
    GEMINI_API_KEY=your_google_ai_api_key
    ```

### Running the Development Server

The application uses `genkit` for AI flows, which runs as a separate development server alongside the Next.js app.

1.  **Start the Genkit server:**
    ```bash
    npm run genkit:watch
    ```
    This will start the Genkit development UI, typically on `http://localhost:4000`.

2.  **Start the Next.js application:**
    In a new terminal window, run:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

