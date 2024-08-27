"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSend } from "react-icons/fi";
import { Sidebar } from "@/components/Sidebar";

interface Message {
  type: 'user' | 'bot';
  text: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Sidebar />
      <div className="flex-grow p-4 md:ml-64">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center justify-center min-h-screen"
        >
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-8 text-center text-white"
          >
            Professor Rating Chatbot
          </motion.h1>
          <Card className="w-full max-w-3xl bg-gray-800 border-none shadow-2xl rounded-xl overflow-hidden">
            <CardHeader className="border-b border-gray-700 bg-gray-900">
              <CardTitle className="text-xl sm:text-2xl font-semibold text-white">Chat</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-y-auto mb-4 p-2 sm:p-4 rounded-lg bg-gray-700 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
              >
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-4 p-2 sm:p-3 rounded-lg ${
                        message.type === 'user' ? 'bg-blue-600 ml-auto' : 'bg-gray-600'
                      } max-w-[80%] text-white shadow-md text-sm sm:text-base`}
                    >
                      {message.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </CardContent>
            <CardFooter className="border-t border-gray-700 bg-gray-900">
              <div className="flex w-full items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Ask about a professor..."
                  className="flex-grow bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 rounded-full text-sm sm:text-base"
                />
                <Button className="bg-white hover:bg-gray-200 text-black font-semibold rounded-full transition-all duration-300 shadow-lg text-sm sm:text-base">
                  <FiSend className="mr-2" />
                  <span className="hidden sm:inline">Send</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}