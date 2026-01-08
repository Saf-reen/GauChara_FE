import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatbotAPI } from '@/lib/api';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Gauchara's virtual assistant. How can I help you today? You can ask me about our causes, how to donate, or anything about our organization.",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Try to call the backend API
      const response = await chatbotAPI.sendMessage(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // Fallback response when backend is not available
      const fallbackResponses = getFallbackResponse(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: fallbackResponses,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('donate') || lowerQuery.includes('donation')) {
      return "You can donate to our causes through PayPal or SWIFT bank transfer. Visit our Donate page to choose a cause and make a contribution. Every donation helps us make a difference!";
    }
    
    if (lowerQuery.includes('about') || lowerQuery.includes('gauchara')) {
      return "Gauchara is a non-profit organization dedicated to empowering communities through education, healthcare, and sustainable development. We've been serving communities since our founding and have helped thousands of people.";
    }
    
    if (lowerQuery.includes('cause') || lowerQuery.includes('project')) {
      return "We support various causes including education for underprivileged children, healthcare access, clean water initiatives, and environmental conservation. Visit our Causes page to learn more and contribute!";
    }
    
    if (lowerQuery.includes('contact') || lowerQuery.includes('reach')) {
      return "You can reach us at info@gauchara.com or call +977 123 456 7890. You can also visit our Contact page to send us a message directly.";
    }
    
    if (lowerQuery.includes('volunteer')) {
      return "We welcome volunteers! Please visit our Contact page and send us a message expressing your interest. We'll get back to you with available opportunities.";
    }
    
    return "Thank you for your question! For more detailed information, please visit our About page or Contact us directly. Our team is always happy to help!";
  };

  const quickActions = [
    'How can I donate?',
    'Tell me about Gauchara',
    'What causes do you support?',
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary rounded-full 
                   flex items-center justify-center shadow-lg hover:shadow-xl 
                   transition-all duration-300 hover:scale-105 animate-pulse-glow
                   ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] 
                   bg-background rounded-2xl shadow-2xl overflow-hidden
                   transition-all duration-300 transform origin-bottom-right
                   ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-primary p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-primary-foreground">Gauchara Assistant</h3>
              <p className="text-sm text-primary-foreground/80">Always here to help</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 ${message.isBot ? '' : 'flex-row-reverse'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                           ${message.isBot ? 'bg-primary' : 'bg-secondary'}`}
              >
                {message.isBot ? (
                  <Bot className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <User className="w-4 h-4 text-secondary-foreground" />
                )}
              </div>
              <div
                className={`max-w-[75%] p-3 rounded-2xl ${
                  message.isBot
                    ? 'bg-background rounded-tl-none shadow-sm'
                    : 'bg-primary text-primary-foreground rounded-tr-none'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-background p-3 rounded-2xl rounded-tl-none shadow-sm">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <button
                key={action}
                onClick={() => setInputValue(action)}
                className="text-xs px-3 py-1.5 bg-muted rounded-full hover:bg-primary 
                         hover:text-primary-foreground transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
