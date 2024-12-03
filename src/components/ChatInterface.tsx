import React, { useState } from 'react';
import { Send, Loader } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  onUpdateContent: (content: string) => void;
}

export default function ChatInterface({ onUpdateContent }: ChatInterfaceProps) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: prompt,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      let finalPrompt = prompt;
      if (prompt.startsWith('Generate email about')) {
        finalPrompt = `Write a professional email about ${prompt.replace('Generate email about', '').trim()}`;
      } else if (prompt.startsWith('Review')) {
        finalPrompt = `Review and improve this email content, maintaining its core message but making it more professional and effective.`;
      }

      const result = await model.generateContent(finalPrompt);
      const response = await result.response;
      const text = response.text();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: text,
        type: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      onUpdateContent(text);
      setPrompt('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to get AI response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white ml-4'
                  : 'bg-white border border-gray-200 mr-4'
              }`}
            >
              <p className={message.type === 'user' ? 'text-white' : 'text-gray-800'}>
                {message.content}
              </p>
              <p className={`text-xs mt-1 ${
                message.type === 'user' ? 'text-blue-100' : 'text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-4 rounded-lg">
              <Loader className="w-5 h-5 animate-spin text-blue-600" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message or 'Generate email about...'"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </form>
    </div>
  );
}