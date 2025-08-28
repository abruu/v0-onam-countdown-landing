"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function OnamCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isEnded, setIsEnded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  const targetDate = new Date("2025-09-02T09:00:00+05:30")

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = targetDate.getTime()
      const difference = target - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft((prevTime) => {
          setPrevTimeLeft(prevTime)
          return { days, hours, minutes, seconds }
        })
        setIsEnded(false)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsEnded(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, []) // Removed timeLeft from dependency array to fix infinite loop

  const shareCountdown = () => {
    if (navigator.share) {
      navigator.share({
        title: "Onam 2025 Countdown",
        text: "Join us in celebrating Onam 2025!",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-900 via-amber-800 to-orange-900">
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Header */}
          {isEnded ? (
            <div className="mb-8">
              {/* <h1 className="text-4xl md:text-6xl font-bold text-yellow-100 mb-4 text-balance">Onam 2025 Countdown</h1>
              <p className="text-lg md:text-xl text-yellow-200/90 text-pretty">
                Get ready for the grand Sadhya on September 2, 2025!
              </p> */}
            </div>
          ) : (
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-yellow-100 mb-4 text-balance">Onam 2025 Countdown</h1>
              <p className="text-lg md:text-xl text-yellow-200/90 text-pretty">
                Get ready for the grand Sadhya on September 2, 2025!
              </p>
            </div>
          )}


          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8 md:p-12 shadow-2xl hover:bg-white/15 transition-all duration-300 group">
            {isEnded ? (
              <div className="text-center">
                <div className="relative">
                  <div className="text-6xl md:text-8xl mb-4 animate-celebration-expand">✨</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-confetti-burst"
                        style={{
                          left: `${50 + (Math.random() - 0.5) * 200}%`,
                          top: `${50 + (Math.random() - 0.5) * 200}%`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-yellow-100 mb-4 animate-celebration-expand">
                ആർപ്പോ 2025
                </h2>
                <p className="text-xl text-yellow-200">The celebration has begun! 🌺🎉🌺</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[
                  { value: timeLeft.days, label: "Days", unit: "d", key: "days" },
                  { value: timeLeft.hours, label: "Hours", unit: "h", key: "hours" },
                  { value: timeLeft.minutes, label: "Minutes", unit: "m", key: "minutes" },
                  { value: timeLeft.seconds, label: "Seconds", unit: "s", key: "seconds" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="relative">
                      <div
                        className={`text-4xl md:text-6xl font-mono font-bold text-yellow-100 mb-2 transition-all duration-500 hover:scale-110 ${
                          prevTimeLeft[item.key as keyof TimeLeft] !== item.value ? "animate-flip-in" : ""
                        }`}
                      >
                        {item.value.toString().padStart(2, "0")}
                        <span className="text-2xl md:text-3xl text-yellow-300 ml-1">{item.unit}</span>
                      </div>
                      <div className="text-sm md:text-base text-yellow-200/80 uppercase tracking-wider font-medium">
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <div className="mt-12 flex justify-center space-x-12 text-6xl opacity-80">
            <span className="animate-pulse hover:scale-125 transition-transform cursor-pointer hover:opacity-100">
              🌿
            </span>
            <span className="animate-pulse delay-500 hover:scale-125 transition-transform cursor-pointer hover:opacity-100">
              🪔
            </span>
            <span className="animate-pulse delay-1000 hover:scale-125 transition-transform cursor-pointer hover:opacity-100">
              🌺
            </span>
            <span className="animate-pulse delay-1500 hover:scale-125 transition-transform cursor-pointer hover:opacity-100">
              🥥
            </span>
            <span className="animate-pulse delay-2000 hover:scale-125 transition-transform cursor-pointer hover:opacity-100">
              🌿
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => {
          const flowers = ["🌺", "🌸", "🌼", "🏵️"]
          const flower = flowers[i % flowers.length]
          return (
            <div
              key={`rain-${i}`}
              className="absolute text-2xl animate-flower-rain opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            >
              {flower}
            </div>
          )
        })}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`petal-${i}`}
            className="absolute text-xl animate-petal-float opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            🌼
          </div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-12 h-16 bg-gradient-to-t from-yellow-600 to-yellow-300 rounded-t-full animate-lamp-glow shadow-lg" />
        <div
          className="absolute top-20 right-20 w-12 h-16 bg-gradient-to-t from-yellow-600 to-yellow-300 rounded-t-full animate-lamp-glow shadow-lg"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-20 w-12 h-16 bg-gradient-to-t from-yellow-600 to-yellow-300 rounded-t-full animate-lamp-glow shadow-lg"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 right-20 w-12 h-16 bg-gradient-to-t from-yellow-600 to-yellow-300 rounded-t-full animate-lamp-glow shadow-lg"
          style={{ animationDelay: "3s" }}
        />
      </div>
    </div>
  )
}
