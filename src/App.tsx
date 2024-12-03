import React, { useState } from 'react';
import { Send } from 'lucide-react';
import EmailEditor from './components/EmailEditor';
import AIAssistant from './components/AIAssistant';
import Header from './components/Header';
import Footer from './components/Footer';
import UserGuide from './components/UserGuide';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [email, setEmail] = useState({
    from: '',
    to: '',
    subject: '',
    body: ''
  });

  const handleSend = () => {
    if (!email.to || !email.subject || !email.body) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!email.to.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email.to)}&su=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="top-right" />
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Email Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">From</label>
                  <input
                    type="email"
                    value={email.from}
                    onChange={(e) => setEmail({ ...email, from: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">To</label>
                  <input
                    type="email"
                    value={email.to}
                    onChange={(e) => setEmail({ ...email, to: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="recipient@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  value={email.subject}
                  onChange={(e) => setEmail({ ...email, subject: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <EmailEditor
                  content={email.body}
                  onChange={(html) => setEmail({ ...email, body: html })}
                />
              </div>

              <button
                onClick={handleSend}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
                Send with Gmail
              </button>
            </div>

            {/* AI Assistant Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold mb-4">AI Writing Assistant</h2>
                <AIAssistant
                  content={email.body}
                  onSuggestion={(text) => setEmail({ ...email, body: text })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* User Guide Section */}
        <UserGuide />
      </main>

      <Footer />
    </div>
  );
}

export default App;