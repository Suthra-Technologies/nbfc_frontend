import { api } from '@/lib/api-client';

export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

export const chatbotService = {
    sendMessage: (message: string, history: ChatMessage[] = []) => {
        return api.post('/chatbot', { message, history });
    },
};
