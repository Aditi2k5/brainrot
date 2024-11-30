"use client"

import { useState, useRef } from 'react'
import { motion, PanInfo, useAnimation } from 'framer-motion'
import { questions, calculateGenZScore, Question } from '@/util/quizData'
import { Layout } from '@/components/sidebar'

const SWIPE_THRESHOLD = 100

export default function GenZQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState<number[]>([])
  const [quizComplete, setQuizComplete] = useState(false)
  const controls = useAnimation()
  const constraintsRef = useRef(null)

  const handleSwipe = (direction: 'left' | 'right') => {
    const newScores = [...scores, questions[currentQuestion].scores[direction]]
    setScores(newScores)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizComplete(true)
    }
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x
    if (Math.abs(offset) > SWIPE_THRESHOLD) {
      if (offset > 0) {
        handleSwipe('right')
      } else {
        handleSwipe('left')
      }
    } else {
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } })
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScores([])
    setQuizComplete(false)
  }

  return (
    <Layout>
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-primary text-center mb-8">Gen Z Vibe Check</h1>
        {!quizComplete ? (
          <div ref={constraintsRef} className="relative h-[400px]">
            <motion.div
              drag="x"
              dragConstraints={constraintsRef}
              onDragEnd={handleDragEnd}
              animate={controls}
              className="absolute w-full bg-card text-card-foreground rounded-lg shadow-xl p-6 cursor-grab active:cursor-grabbing"
            >
              <h2 className="text-2xl font-semibold mb-4">{questions[currentQuestion].text}</h2>
              <div className="flex justify-between mt-8">
                <div className="text-center">
                  <div className="text-6xl mb-2">{questions[currentQuestion].emojis.left}</div>
                  <div className="text-sm text-muted-foreground">{questions[currentQuestion].answers.left}</div>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-2">{questions[currentQuestion].emojis.right}</div>
                  <div className="text-sm text-muted-foreground">{questions[currentQuestion].answers.right}</div>
                </div>
              </div>
              <div className="mt-8 text-center text-muted-foreground">
                Swipe left or right to answer
              </div>
              <div className="mt-4 text-center text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-card text-card-foreground rounded-lg shadow-xl p-6 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-xl mb-4 text-muted-foreground">Your Gen Z Vibe is:</p>
            <p className="text-4xl font-extrabold mb-6 text-primary">{calculateGenZScore(scores)}</p>
            <button
              onClick={resetQuiz}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Take Quiz Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
    </Layout>
  )
}