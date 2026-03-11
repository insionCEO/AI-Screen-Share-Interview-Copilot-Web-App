import type { Api, AppSettings } from '../env'

const DEFAULT_SETTINGS: AppSettings = {
  openaiApiKey: '',
  openaiModel: 'gpt-4o-mini',
  alwaysOnTop: true,
  windowOpacity: 1,
  pauseThreshold: 1500,
  autoStart: false,
  resumeDescription: ''
}

export function ensureWebApiFallback(): void {
  if (typeof window === 'undefined' || window.api) {
    return
  }

  let settings = { ...DEFAULT_SETTINGS }

  const noopUnsub = (): void => {}

  const webApi: Api = {
    getSettings: async () => ({ ...settings }),
    updateSettings: async (updates) => {
      settings = { ...settings, ...updates }
      return { ...settings }
    },
    hasApiKeys: async () => false,
    fetchOpenAIModels: async () => ({ success: false, models: [], error: 'Electron API unavailable on web.' }),

    startCapture: async () => ({ success: false }),
    stopCapture: async () => ({ success: true }),
    getCaptureStatus: async () => false,
    sendAudioData: () => {},
    getAudioSources: async () => [],

    setAlwaysOnTop: async (value) => value,
    setWindowOpacity: async (value) => value,
    minimizeWindow: async () => {},
    closeWindow: async () => {},

    clearHistory: async () => ({ success: true }),

    getHistory: async () => [],
    saveHistoryEntry: async () => ({ success: true }),
    saveHistoryEntries: async () => ({ success: true }),
    clearSavedHistory: async () => ({ success: true }),
    deleteHistoryEntry: async () => ({ success: true }),

    writeToClipboard: async (text) => {
      try {
        await navigator.clipboard.writeText(text)
        return { success: true }
      } catch {
        return { success: false, error: 'Clipboard API unavailable.' }
      }
    },

    captureScreenshot: async () => ({ success: false, error: 'Screenshot capture requires Electron.' }),
    analyzeScreenshot: async () => ({ success: false, error: 'Screenshot analysis requires Electron.' }),

    callSessionApi: async () => ({ success: false, error: 'Session API unavailable on web.' }),

    onTranscript: () => noopUnsub,
    onUtteranceEnd: () => noopUnsub,
    onSpeechStarted: () => noopUnsub,
    onQuestionDetected: () => noopUnsub,
    onAnswerStream: () => noopUnsub,
    onAnswerComplete: () => noopUnsub,
    onCaptureError: () => noopUnsub,
    onAnswerError: () => noopUnsub,
    onScreenshotCaptured: () => noopUnsub,
    onQuestionDetectedFromImage: () => noopUnsub,
    onScreenshotNoQuestion: () => noopUnsub
  }

  window.api = webApi
  console.warn('Running in web mode: Electron IPC API is unavailable; using fallback API.')
}
