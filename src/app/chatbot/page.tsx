"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSend, FiArrowLeft } from "react-icons/fi";
import { FaUser, FaRobot, FaGraduationCap } from "react-icons/fa";
import { Sidebar } from "@/components/Sidebar";
import { chatbotResponse } from "@/utils/pinecone-utils";
import Link from "next/link";
import Image from "next/image";

interface Message {
  type: 'user' | 'bot';
  text: string;
}

const GradientBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
);

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute inset-0"
      style={{
        background: "radial-gradient(circle, rgba(255,0,0,0.1) 0%, rgba(0,0,0,0) 70%)",
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-red-500 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, Math.random() * 100 - 50],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    ))}
  </div>
);

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatbotResponse(input);
      const botMessage: Message = { type: 'bot', text: response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: Message = { type: 'bot', text: "Sorry, I encountered an error while processing your request." };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen overflow-hidden relative">
      <GradientBackground />
      <AnimatedBackground />
      <div className="relative flex flex-col min-h-screen">
        <Link href="/" passHref>
          <motion.button
            className="absolute top-4 left-4 px-4 py-2 text-lg font-semibold text-white bg-red-700 rounded-full transition-all duration-300 cursor-pointer flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft/>
          </motion.button>
        </Link>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex-grow flex flex-col items-center justify-center px-4 py-16"
        >
          <motion.h1
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-white text-center mb-8 flex flex-col sm:flex-row items-center justify-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, yoyo: Infinity, ease: "easeInOut" }}
          >
            <FaGraduationCap className="mb-2 sm:mb-0 sm:mr-4 text-4xl sm:text-5xl" />
            <span>Professor Rating Chatbot</span>
          </motion.h1>
          <Card className="w-full max-w-4xl bg-gray-800/80 backdrop-blur-md border-2 border-red-700 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-gray-700 bg-gray-900/50">
              <CardTitle className="text-2xl sm:text-3xl font-semibold text-white">Chat with AI</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <motion.div
                id="chat-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="h-[50vh] sm:h-[60vh] overflow-y-auto mb-4 p-4 rounded-lg bg-gray-700/50 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800"
              >
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`flex mb-4 ${
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div className={`flex items-start space-x-2 ${
                        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`p-3 rounded-full ${
                          message.type === 'user' ? 'bg-red-700' : 'bg-gray-600'
                        } flex items-center justify-center`}>
                          {message.type === 'user' ? <FaUser size={24} /> : <FaRobot size={24} />}
                        </div>
                        <div className={`p-3 sm:p-4 rounded-lg ${
                          message.type === 'user' ? 'bg-red-700' : 'bg-gray-600'
                        } max-w-[80%] text-white shadow-lg text-sm sm:text-base flex items-center`}>
                          {message.text}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-600 p-3 rounded-lg flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </CardContent>
            <CardFooter className="border-t border-gray-700 bg-gray-900/50 p-4">
              <div className="flex w-full items-center space-x-2">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about a professor..."
                  className="flex-grow bg-gray-700/70 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 rounded-full text-base px-4 py-2"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="px-6 py-2 text-lg font-semibold text-white bg-red-700 rounded-full transition-all duration-300 cursor-pointer"
                >
                  {isLoading ? (
                    <span className="animate-spin">⏳</span>
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      <span className="hidden sm:inline">Send</span>
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
          <div className="mt-4 flex items-center justify-center text-white">
            <span className="mr-2">Powered by</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Image src="/images/gemini-logo.svg" alt="Gemini Logo" width={24} height={24} />
            </motion.div>
            <span className="ml-2">Gemini</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}