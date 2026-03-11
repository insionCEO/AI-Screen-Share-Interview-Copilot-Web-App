# Real-Time Interview Copilot

An AI-powered desktop application that provides real-time interview copilot. The app listens to live audio, transcribes speech in real-time using OpenAI Whisper, detects questions, and generates professional answers using OpenAI GPT-4.

## Features

- 🎤 **Real-time Speech Recognition** - Captures microphone audio and transcribes in real-time using OpenAI Whisper
- 🤖 **AI-Powered Answers** - Generates professional interview answers using OpenAI GPT-4
- 🔒 **Screen Share Safe** - Window is hidden from screen sharing (Zoom, Teams, Google Meet)
- ⚡ **Low Latency** - Sub-2 second response time from question detection to answer generation
- 🎯 **Smart Question Detection** - Uses linguistic patterns and pause detection to identify questions
- 📌 **Always on Top** - Keeps the copilot visible during interviews
- 🌙 **Dark Theme** - Easy on the eyes during long interview sessions

## Tech Stack

- **Electron** - Cross-platform desktop app framework
- **React 19** - UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **OpenAI SDK** - GPT-4o answer generation

## Prerequisites

Before running this application, you'll need:

1. **Node.js** (v18 or higher)
2. **pnpm** package manager
3. **OpenAI API Key** - Get one at [platform.openai.com](https://platform.openai.com/api-keys)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd interview-copilot
```

2. Install dependencies:

```bash
pnpm install
```

## Development

Run the app in development mode with hot reload:

```bash
pnpm dev
```

## Building

Build for Windows:

```bash
pnpm build:win
```

Build for other platforms:

```bash
pnpm build:mac    # macOS
pnpm build:linux  # Linux
```

## Usage

1. **Launch the app** - The settings modal will open if API keys aren't configured
2. **Configure API keys** - Enter your OpenAI API key in Settings
3. **Click "Start"** - Begin listening for interview questions
4. **Speak or let the interviewer speak** - The app transcribes audio in real-time
5. **Wait for question detection** - When a pause is detected after a question, an answer is generated
6. **View suggested answers** - Professional answers appear in the bottom panel
7. **Click "Stop"** when done

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Electron Main Process                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  Audio Capture  │  │  OpenAI Whisper │  │  OpenAI LLM     │  │
│  │  (System Audio) │  │  (WebSocket)    │  │  (Answer Gen)   │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │ IPC
┌─────────────────────────────────────────────────────────────────┐
│                      Electron Renderer (React)                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  Mic Capture    │  │  Transcript     │  │  Answer         │  │
│  │  (Web Audio)    │  │  Display        │  │  Display        │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
src/
├── main/
│   ├── index.ts                    # Main process entry
│   ├── ipc/
│   │   └── handlers.ts             # IPC handlers
│   └── services/
│       ├── whisperService.ts      # Speech-to-text service
│       ├── openaiService.ts        # Answer generation service
│       ├── questionDetector.ts     # Question detection logic
│       └── settingsManager.ts      # Settings persistence
├── preload/
│   ├── index.ts                    # Preload scripts
│   └── index.d.ts                  # Type definitions
└── renderer/src/
    ├── App.tsx                     # Main React component
    ├── components/
    │   ├── Header.tsx              # Title bar with controls
    │   ├── StatusBar.tsx           # Recording status
    │   ├── TranscriptPanel.tsx     # Live transcription display
    │   ├── AnswerPanel.tsx         # Generated answers display
    │   └── SettingsModal.tsx       # Settings configuration
    ├── hooks/
    │   ├── useAudioCapture.ts      # Audio capture hook
    │   └── useInterview.ts         # Main interview logic
    ├── store/
    │   └── interviewStore.ts       # Zustand state management
    └── services/
        └── audioCapture.ts         # Web Audio implementation
```

## Configuration Options

| Setting         | Description                             | Default     |
| --------------- | --------------------------------------- | ----------- |
| OpenAI API Key  | Key for Whisper speech-to-text service  | Required    |
| OpenAI API Key  | Key for answer generation               | Required    |
| OpenAI Model    | GPT model to use                        | gpt-4o-mini |
| Pause Threshold | Silence duration before processing (ms) | 1500        |
| Window Opacity  | Window transparency                     | 100%        |
| Always on Top   | Keep window above others                | Enabled     |

## Security Features

- **Content Protection** - Window is hidden from screen capture software
- **Secure Storage** - API keys are encrypted using Electron's safeStorage API in local storage
- **Context Isolation** - Renderer process is isolated from main process
- **CSP Headers** - Content Security Policy restricts resource loading

## Troubleshooting

### Microphone not working

- Ensure microphone permissions are granted in Windows Settings
- Try selecting a different audio input device

### No transcription appearing

- Check that your OpenAI API key is valid
- Ensure you have an active internet connection

### Answers not generating

- Verify your OpenAI API key has sufficient credits
- Check the console for error messages

### Window visible in screen share

- The content protection feature works on Windows 10/11
- Some older screen sharing methods may still capture the window

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

# Interview Copilot

## Deployment (Vercel)

Recommended setup for deploying the web renderer on Vercel:

- Build Command: `npm run build`
- Output Directory: `src/renderer/dist`
- Environment: Node 18+, Package Manager: `pnpm` (Vercel detects via `pnpm-lock.yaml`)

Notes:

- The repository includes `scripts/ci-build.js` which runs a web-only build on Vercel:
  - `npm run typecheck:web` (TypeScript check using `tsconfig.web.json`)
  - `pnpm exec vite build` (run in `src/renderer` to produce the static `dist`)
- `scripts/postinstall.js` skips Electron-native postinstall steps on Vercel.

If you prefer to configure via `vercel.json`, you can add a minimal file or set the settings in the Vercel dashboard. Example settings to add to the dashboard:

1. Build Command: `npm run build`
2. Output Directory: `src/renderer/dist`

Optional: if you want Vercel to use a `vercel.json`, create one with the following content (dashboard settings are equivalent):

```json
{
  "version": 2
}
```

After pushing to `main`, Vercel will auto-deploy. If deployment fails, check the deployment logs in the Vercel dashboard (Project → Deployments → Logs) and paste the failing block here for help.
