import React, { useState } from 'react';
import { MessageCircle, Loader } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ChatInterface from './ChatInterface';
import toast from 'react-hot-toast';

const tones = ['Professional', 'Casual', 'Friendly', 'Formal'];

interface AIAssistantProps {
  content: string;
  onSuggestion: (text: string) => void;
}

export default function AIAssistant({ content, onSuggestion }: AIAssistantProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTone, setSelectedTone] = useState('Professional');

  const improveText = async () => {
    if (!content.trim()) {
      toast.error('Please enter some content first');
      return;
    }
    
    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Improve this email content in a ${selectedTone.toLowerCase()} tone. Make it more engaging and effective:\n\n${content}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      onSuggestion(text);
      toast.success('Content improved successfully!');
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      toast.error('Failed to improve content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tones.map((tone) => (
          <button
            key={tone}
            onClick={() => setSelectedTone(tone)}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedTone === tone
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {tone}
          </button>
        ))}
      </div>
      
      <button
        onClick={improveText}
        disabled={isLoading}
        className="flex items-center gap-2 w-full justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <MessageCircle className="w-4 h-4" />
        )}
        Improve with Selected Tone
      </button>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">AI Chat Assistant</h3>
        <ChatInterface onUpdateContent={onSuggestion} />
      </div>
    </div>
  );
}