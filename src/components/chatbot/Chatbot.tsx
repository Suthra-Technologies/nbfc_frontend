import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { chatbotService } from '@/services/chatbot.service';
import type { ChatMessage } from '@/services/chatbot.service';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
    const [history, setHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!message.trim() || isLoading) return;

        const userText = message;
        setMessage('');
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setIsLoading(true);

        try {
            const botResponse = await chatbotService.sendMessage(userText, history);

            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);

            // Update history for Gemini
            setHistory(prev => [
                ...prev,
                { role: 'user', parts: [{ text: userText }] },
                { role: 'model', parts: [{ text: botResponse }] }
            ]);
        } catch (error) {
            console.error('Chatbot error:', error);
            setMessages(prev => [...prev, { role: 'bot', text: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (isMinimized) setIsMinimized(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            height: isMinimized ? '60px' : '500px',
                            width: '380px'
                        }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={cn(
                            "bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col mb-4",
                            isMinimized && "w-64"
                        )}
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">FinAssist AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                                        <span className="text-[10px] text-white/80">Always Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
                                >
                                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages */}
                                <div
                                    ref={scrollRef}
                                    className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-950/50"
                                >
                                    {messages.length === 0 && (
                                        <div className="text-center py-8 space-y-3">
                                            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-primary">
                                                <Bot size={24} />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="font-medium text-sm text-slate-800 dark:text-slate-200">Welcome to FinAssist!</p>
                                                <p className="text-xs text-slate-500">How can I help you today with your NBFC operations?</p>
                                            </div>
                                            <div className="flex flex-wrap gap-2 justify-center mt-4">
                                                {['How to apply loan?', 'Calc EMI', 'Customer help'].map(suggestion => (
                                                    <button
                                                        key={suggestion}
                                                        onClick={() => {
                                                            setMessage(suggestion);
                                                        }}
                                                        className="text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                                    >
                                                        {suggestion}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {messages.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "flex w-full mb-2",
                                                msg.role === 'user' ? "justify-end" : "justify-start"
                                            )}
                                        >
                                            <div className={cn(
                                                "max-w-[80%] p-3 rounded-2xl text-sm shadow-sm",
                                                msg.role === 'user'
                                                    ? "bg-primary text-white rounded-tr-none"
                                                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none"
                                            )}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}

                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                                                <motion.span
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                    className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                                                />
                                                <motion.span
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                                    className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                                                />
                                                <motion.span
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                                    className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Input */}
                                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                                    <form
                                        className="flex gap-2"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSend();
                                        }}
                                    >
                                        <Input
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Type your message..."
                                            className="flex-1 bg-slate-50 dark:bg-slate-950 border-none focus-visible:ring-1 focus-visible:ring-primary/50"
                                        />
                                        <Button
                                            size="icon"
                                            disabled={!message.trim() || isLoading}
                                            className="rounded-xl aspect-square"
                                        >
                                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                        </Button>
                                    </form>
                                    <p className="text-[10px] text-center text-slate-400 mt-2">
                                        Powered by Finware AI • Gemini 1.5
                                    </p>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleChat}
                className={cn(
                    "w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300",
                    isOpen ? "bg-slate-800 text-green" : "bg-primary text-green"
                )}
            >
                {isOpen ? <X size={24} /> : (
                    <div className="relative">
                        <MessageCircle size={24} />
                        {!isOpen && messages.length === 0 && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-primary rounded-full"></span>
                        )}
                    </div>
                )}
            </motion.button>
        </div>
    );
};
