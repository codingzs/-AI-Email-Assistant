import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, BookOpen, Mail, Edit, FileText, HelpCircle } from 'lucide-react';
import { Disclosure } from '@headlessui/react';

const features = [
  {
    title: 'Smart Composition',
    description: 'AI-powered suggestions help you write better emails faster.',
    icon: Mail,
  },
  {
    title: 'Rich Text Editor',
    description: 'Format your emails with a powerful rich text editor.',
    icon: Edit,
  },
  {
    title: 'Email Templates',
    description: 'Start with professional templates for common scenarios.',
    icon: FileText,
  },
];

const faqs = [
  {
    question: 'How does the AI assistant work?',
    answer: 'The AI assistant uses advanced language models to help you compose, edit, and improve your emails. It can suggest better phrasing, fix grammar, and adjust the tone of your messages.',
  },
  {
    question: 'Can I use my own email templates?',
    answer: 'Yes! You can create and save your own email templates for future use. The AI assistant can also help you improve your existing templates.',
  },
  {
    question: 'Is my email content secure?',
    answer: 'We take privacy seriously. Your email content is processed securely and is never stored or used for training purposes.',
  },
];

export default function UserGuide() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-blue-600 mx-auto" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How to Use AI Email Assistant
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Everything you need to know to write better emails with AI assistance.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -5 }}
                className="relative p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <feature.icon className="h-8 w-8 text-blue-600" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as="div" className="mt-4">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-left text-gray-900 bg-white rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50">
                      <span className="font-medium">{faq.question}</span>
                      <ChevronDown
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-gray-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500">
                      {faq.answer}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <HelpCircle className="h-12 w-12 text-blue-600 mx-auto" />
          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            Need More Help?
          </h3>
          <p className="mt-4 text-gray-500">
            Check out our detailed documentation or contact support for assistance.
          </p>
          <button className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
}