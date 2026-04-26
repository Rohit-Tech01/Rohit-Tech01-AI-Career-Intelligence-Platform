import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Send, Bot, User, Sparkles, Brain, Target, Award, 
  Briefcase, BookOpen, TrendingUp, Heart, Zap, Lightbulb,
  MessageCircle, ThumbsUp, ThumbsDown, Copy, RefreshCw,
  MoreVertical, Mic, MicOff, Volume2, VolumeX
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  emotion?: 'happy' | 'excited' | 'thoughtful' | 'encouraging' | 'professional' | 'empathetic';
  typing?: boolean;
}

interface ConversationContext {
  topic: string;
  careerStage: string;
  interests: string[];
  skills: string[];
  goals: string[];
  lastInteraction: Date;
}

const AICareerChatbot: React.FC = () => {
  const { isDark } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [context, setContext] = useState<ConversationContext>({
    topic: 'general',
    careerStage: 'exploring',
    interests: [],
    skills: [],
    goals: [],
    lastInteraction: new Date()
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const careerKnowledgeBase = {
    'career advice': {
      responses: [
        "I'd be happy to help you with career advice! 🎯 What specific aspect of your career are you looking to explore?",
        "Career guidance is my specialty! 💼 Tell me about your current situation and goals.",
        "Let's work together on your career path! 🚀 What's most important to you right now?"
      ],
      emotion: 'encouraging'
    },
    'skills': {
      responses: [
        "Skills are the foundation of success! 🛠️ What skills are you interested in developing?",
        "Great question about skills! 📚 Which area would you like to focus on?",
        "I love discussing skill development! 💪 Let's explore what skills would benefit you most."
      ],
      emotion: 'excited'
    },
    'job search': {
      responses: [
        "Job searching can be challenging, but I'm here to help! 🔍 What type of role are you looking for?",
        "Let's tackle your job search together! 💼 What's your target industry or role?",
        "I understand the job search journey! 🎯 Tell me more about your ideal position."
      ],
      emotion: 'empathetic'
    },
    'resume': {
      responses: [
        "Your resume is your career story! 📄 What would you like to improve about it?",
        "Resume optimization is crucial! ✨ Which section needs attention?",
        "Let's make your resume stand out! 🌟 What's your current resume situation?"
      ],
      emotion: 'professional'
    },
    'interview': {
      responses: [
        "Interviews can be nerve-wracking, but preparation is key! 🎤 What type of interview are you preparing for?",
        "I'll help you ace that interview! 💪 What concerns do you have?",
        "Interview success is within reach! 🚀 Let's practice and prepare together."
      ],
      emotion: 'encouraging'
    },
    'salary': {
      responses: [
        "Salary discussions are important! 💰 What's your salary-related question?",
        "Let's talk about compensation! 📊 What's your situation?",
        "I can help with salary guidance! 💵 What would you like to know?"
      ],
      emotion: 'professional'
    },
    'career change': {
      responses: [
        "Career changes are exciting opportunities! 🌟 What's motivating your change?",
        "Transitioning careers is a brave step! 🚀 What new field interests you?",
        "I support your career change journey! 💪 What's your vision?"
      ],
      emotion: 'encouraging'
    },
    'greeting': {
      responses: [
        "Hello! 👋 I'm your AI Career Assistant, here to help you navigate your professional journey! How can I assist you today?",
        "Hi there! 🎯 I'm excited to help you with your career goals! What's on your mind?",
        "Welcome! 💼 I'm here to provide personalized career guidance. What would you like to explore?"
      ],
      emotion: 'happy'
    },
    'default': {
      responses: [
        "That's an interesting question! 🤔 Let me think about how I can best help you with that.",
        "I appreciate you sharing that! 💡 Could you tell me more so I can give you better guidance?",
        "Great topic! 🎯 I'd love to help you explore this further. What specific aspects interest you?"
      ],
      emotion: 'thoughtful'
    }
  };

  const detectIntent = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.match(/\b(hi|hello|hey|greetings)\b/)) return 'greeting';
    if (lowerText.match(/\b(advice|guidance|help|suggest|recommend)\b/)) return 'career advice';
    if (lowerText.match(/\b(skill|learn|develop|improve|training)\b/)) return 'skills';
    if (lowerText.match(/\b(job|work|employment|position|role)\b/)) return 'job search';
    if (lowerText.match(/\b(resume|cv|portfolio)\b/)) return 'resume';
    if (lowerText.match(/\b(interview|meeting|talk)\b/)) return 'interview';
    if (lowerText.match(/\b(salary|pay|compensation|income|money)\b/)) return 'salary';
    if (lowerText.match(/\b(change|switch|transition|pivot|new field)\b/)) return 'career change';
    
    return 'default';
  };

  const generateResponse = (userMessage: string, intent: string): string => {
    const knowledge = careerKnowledgeBase[intent as keyof typeof careerKnowledgeBase] || careerKnowledgeBase.default;
    const response = knowledge.responses[Math.floor(Math.random() * knowledge.responses.length)];
    
    // Add contextual follow-up based on conversation history
    const followUp = generateContextualFollowUp(intent, userMessage);
    
    return response + (followUp ? '\n\n' + followUp : '');
  };

  const generateContextualFollowUp = (intent: string, userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (intent === 'career advice') {
      if (lowerMessage.includes('stuck') || lowerMessage.includes('confused')) {
        return "It's completely normal to feel uncertain at times. Let's break this down together - what aspects of your career feel most unclear? 💭";
      }
      if (lowerMessage.includes('goal') || lowerMessage.includes('dream')) {
        return "I love that you have goals! 🌟 What's the biggest dream you'd like to achieve in your career?";
      }
    }
    
    if (intent === 'skills') {
      if (lowerMessage.includes('programming') || lowerMessage.includes('coding')) {
        return "Programming skills are in high demand! 🚀 Which languages or technologies interest you most?";
      }
      if (lowerMessage.includes('soft') || lowerMessage.includes('communication')) {
        return "Soft skills are incredibly valuable! 💪 Which soft skills would you like to develop?";
      }
    }
    
    if (intent === 'job search') {
      if (lowerMessage.includes('difficult') || lowerMessage.includes('hard')) {
        return "I understand the frustration! 🤗 Job searching has its challenges, but persistence pays off. What's been the toughest part?";
      }
    }
    
    return "";
  };

  const getEmotionIcon = (emotion?: string) => {
    switch (emotion) {
      case 'happy': return '😊';
      case 'excited': return '🎉';
      case 'thoughtful': return '🤔';
      case 'encouraging': return '💪';
      case 'professional': return '👔';
      case 'empathetic': return '🤗';
      default: return '🤖';
    }
  };

  const speakText = (text: string) => {
    if (!soundEnabled || !window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    const thinkingTime = 1000 + Math.random() * 2000;
    await new Promise(resolve => setTimeout(resolve, thinkingTime));

    const intent = detectIntent(input);
    const response = generateResponse(input, intent);
    const emotion = careerKnowledgeBase[intent as keyof typeof careerKnowledgeBase]?.emotion || 'thoughtful';

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
      emotion: emotion as any
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);

    // Update context
    setContext(prev => ({
      ...prev,
      topic: intent,
      lastInteraction: new Date()
    }));

    // Speak the response
    if (soundEnabled) {
      speakText(response);
    }

    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const regenerateResponse = (messageId: string) => {
    const messageIndex = messages.findIndex(m => m.id === messageId);
    if (messageIndex > 0 && messages[messageIndex - 1].role === 'user') {
      const userMessage = messages[messageIndex - 1];
      const intent = detectIntent(userMessage.content);
      const response = generateResponse(userMessage.content, intent);
      const emotion = careerKnowledgeBase[intent as keyof typeof careerKnowledgeBase]?.emotion || 'thoughtful';

      const newMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        emotion: emotion as any
      };

      setMessages(prev => [...prev.slice(0, messageIndex), newMessage]);
    }
  };

  useEffect(() => {
    // Initial greeting
    const greeting: Message = {
      id: '1',
      role: 'assistant',
      content: careerKnowledgeBase.greeting.responses[0],
      timestamp: new Date(),
      emotion: 'happy'
    };
    setMessages([greeting]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`flex flex-col h-full ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      {/* Header */}
      <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="text-white" size={20} />
          </div>
          <div>
            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              AI Career Assistant
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Online
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg transition ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            title={soundEnabled ? 'Disable sound' : 'Enable sound'}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button
            onClick={() => setMessages([])}
            className={`p-2 rounded-lg transition ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            title="Clear chat"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="text-white" size={16} />
              </div>
            )}
            <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
              <div
                className={`p-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : isDark
                    ? 'bg-gray-800 text-gray-100'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.emotion && message.role === 'assistant' && (
                  <span className="text-sm mr-2">{getEmotionIcon(message.emotion)}</span>
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              <div className={`flex items-center gap-2 mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'} text-xs`}>
                <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                {message.role === 'assistant' && (
                  <>
                    <button
                      onClick={() => copyMessage(message.content)}
                      className="hover:text-blue-500 transition"
                      title="Copy"
                    >
                      <Copy size={12} />
                    </button>
                    <button
                      onClick={() => regenerateResponse(message.id)}
                      className="hover:text-blue-500 transition"
                      title="Regenerate"
                    >
                      <RefreshCw size={12} />
                    </button>
                  </>
                )}
              </div>
            </div>
            {message.role === 'user' && (
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="text-white" size={16} />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="text-white" size={16} />
            </div>
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your career..."
            className={`flex-1 px-4 py-3 rounded-lg border ${
              isDark
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-blue-500'
            } focus:outline-none transition`}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
        
        {/* Quick suggestions */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {['Career advice', 'Skills development', 'Job search', 'Resume tips', 'Interview prep'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition ${
                isDark
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AICareerChatbot;
