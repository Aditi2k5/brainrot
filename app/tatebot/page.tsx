'use client'

import { useState, useRef, useEffect } from 'react'
import { Layout } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Phone, Bot, User } from 'lucide-react'

export default function TateBotPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "What wisdom do you seek today, young pleb?",
      sender: 'bot'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const [currentBotMessage, setCurrentBotMessage] = useState('')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, currentBotMessage])

  const handleSendMessage = async () => {
    if (input.trim() === '') return

    // Prepare user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    }

    // Prepare messages for API call
    const messagesToSend = [
      ...messages.map(msg => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text
      })),
      { role: 'user', content: input }
    ]

    // Reset states
    setCurrentBotMessage('')
    setIsLoading(true)

    // Update messages with user message
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')

    try {
      const response = await fetch('pages/api/tatebot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messagesToSend)
      })

      if (!response.body) {
        throw new Error('No response body')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulatedMessage = ''

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break

        const decodedChunk = decoder.decode(value, { stream: true })
        accumulatedMessage += decodedChunk
        setCurrentBotMessage(accumulatedMessage)
      }

      // Add final bot message
      const botResponse = {
        id: updatedMessages.length + 1,
        text: accumulatedMessage,
        sender: 'bot'
      }

      setMessages(prev => [...prev, botResponse])
      setCurrentBotMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Error handling message
      const errorMessage = {
        id: messages.length + 2,
        text: "Oops! Something went wrong. Please try again.",
        sender: 'bot'
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <Layout>
      <div className="flex flex-col h-screen max-w mx-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-bold">Tatebot</h2>
          </div>
          <Button 
            variant="outline" 
            className="flex items-center space-x-2"
          >
            <Phone className="h-4 w-4" />
            <span>Call Me</span>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${
                message.sender === 'bot' 
                  ? 'justify-start' 
                  : 'justify-end'
              }`}
            >
              <div 
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === 'bot'
                    ? 'bg-gray-100 text-black'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {message.sender === 'bot' ? (
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <span>{message.text}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>{message.text}</span>
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {currentBotMessage && (
            <div className="flex justify-start">
              <div 
                className="max-w-[70%] p-3 rounded-lg bg-gray-100 text-black flex items-center space-x-2"
              >
                <Bot className="h-4 w-4" />
                <span>{currentBotMessage}</span>
              </div>
            </div>
          )}

          {isLoading && !currentBotMessage && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-black p-3 rounded-lg flex items-center space-x-2">
                <Bot className="h-4 w-4" />
                <span>Typing...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t flex space-x-2">
          <Input 
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={input.trim() === '' || isLoading}
            className="flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>Send</span>
          </Button>
        </div>
      </div>
    </Layout>
  )
}