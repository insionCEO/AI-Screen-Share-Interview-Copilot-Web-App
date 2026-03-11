import { History, Minus, Pin, PinOff, Play, Settings, Square, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSessionTimer } from '../hooks/useSessionTimer'
import { useInterviewStore } from '../store/interviewStore'

export function Header(): React.JSX.Element {
  const {
    settings,
    setShowSettings,
    showHistory,
    setShowHistory,
    isSessionActive,
    startSession,
    endSession
  } = useInterviewStore()
  const [isAlwaysOnTop, setIsAlwaysOnTop] = useState(settings.alwaysOnTop)

  // Initialize session timer hook
  useSessionTimer()

  useEffect(() => {
    setTimeout(() => {
      setIsAlwaysOnTop(settings.alwaysOnTop)
    }, 100)
  }, [settings.alwaysOnTop])

  const handleMinimize = (): void => {
    window.api.minimizeWindow()
  }

  const handleClose = (): void => {
    window.api.closeWindow()
  }

  const toggleAlwaysOnTop = async (): Promise<void> => {
    const newValue = !isAlwaysOnTop
    await window.api.setAlwaysOnTop(newValue)
    setIsAlwaysOnTop(newValue)
  }

  const handleSessionToggle = (): void => {
    if (isSessionActive) {
      endSession()
    } else {
      startSession()
    }
  }

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-dark-900 border-b border-dark-700 select-none app-drag">
      {/* Session Timer Display */}
      <div className="flex items-center gap-3 app-no-drag">
        <button
          onClick={handleSessionToggle}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-all
            ${
              isSessionActive
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600'
            }
          `}
          title={isSessionActive ? 'End Session' : 'Start Session'}
        >
          {isSessionActive ? (
            <>
              <Square size={13} />
              <span className="text-xs font-medium">End Session</span>
            </>
          ) : (
            <>
              <Play size={13} />
              <span className="text-xs font-medium">Start Session</span>
            </>
          )}
        </button>
      </div>

      <div className="flex items-center gap-2 app-no-drag">
        {/* <button
          onClick={handleBuyMeACoffee}
          className="p-1.5 rounded hover:bg-dark-700 transition-colors text-yellow-500 hover:text-yellow-400"
          title="Buy me a coffee"
        >
          <Coffee size={14} />
        </button> */}

        <button
          onClick={() => setShowHistory(!showHistory)}
          className={`p-1.5 rounded hover:bg-dark-700 transition-colors ${
            showHistory ? 'text-purple-400' : 'text-dark-400'
          } hover:text-purple-400`}
          title={showHistory ? 'Show current session' : 'Show history'}
        >
          <History size={14} />
        </button>

        <a
          href="https://github.com/insionCEO/AI-Screen-Share-Interview-Copilot-Web-App"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded hover:bg-dark-700 transition-colors text-dark-400 hover:text-purple-400"
          title="View this repo on GitHub"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.111.82-.261.82-.58 0-.287-.011-1.244-.017-2.253-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.76-1.605-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.468-2.381 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.007-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.295-1.23 3.295-1.23.654 1.653.243 2.874.12 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.103.823 2.222 0 1.604-.015 2.896-.015 3.289 0 .322.216.697.825.579C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>

        <a
          href="https://github.com/elias-soykat/interview-copilot"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded hover:bg-dark-700 transition-colors text-dark-400 hover:text-purple-400"
          title="Original repo on GitHub"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.111.82-.261.82-.58 0-.287-.011-1.244-.017-2.253-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.76-1.605-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.468-2.381 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.007-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.295-1.23 3.295-1.23.654 1.653.243 2.874.12 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.103.823 2.222 0 1.604-.015 2.896-.015 3.289 0 .322.216.697.825.579C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>

        <button
          onClick={toggleAlwaysOnTop}
          className={`p-1.5 rounded hover:bg-dark-700 transition-colors ${
            isAlwaysOnTop ? 'text-purple-400' : 'text-dark-400'
          }`}
          title={isAlwaysOnTop ? 'Unpin window' : 'Pin window on top'}
        >
          {isAlwaysOnTop ? <Pin size={14} /> : <PinOff size={14} />}
        </button>

        <button
          onClick={() => setShowSettings(true)}
          className="p-1.5 rounded hover:bg-dark-700 transition-colors text-dark-400 hover:text-dark-200"
          title="Settings"
        >
          <Settings size={14} />
        </button>

        <button
          onClick={handleMinimize}
          className="p-1.5 rounded hover:bg-dark-700 transition-colors text-dark-400 hover:text-dark-200"
          title="Minimize"
        >
          <Minus size={14} />
        </button>

        <button
          onClick={handleClose}
          className="p-1.5 rounded hover:bg-red-500/20 transition-colors text-dark-400 hover:text-red-400"
          title="Close"
        >
          <X size={14} />
        </button>
      </div>
    </header>
  )
}
