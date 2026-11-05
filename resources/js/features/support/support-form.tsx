'use client';

import { useState, type FormEvent } from 'react';
import { Input, Button, StatePanel, Textarea } from '@/components/ui';
import { Send } from 'lucide-react';

export function SupportForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        // TODO: integrate with supportService.createTicket() when backend is available
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        setSubmitted(true);
    }

    if (submitted) {
        return (
            <StatePanel
                kind="success"
                title="Ticket enviado com sucesso"
                description="Nossa equipe responderá em até 2 horas. Você receberá uma confirmação por email."
                compact
            />
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Nome" placeholder="Seu nome" required />
                <Input
                    label="Email"
                    type="email"
                    placeholder="voce@empresa.com"
                    required
                />
            </div>
            <Input
                label="Assunto"
                placeholder="Como podemos ajudar?"
                required
            />
            <Textarea
                id="message"
                label="Mensagem"
                rows={5}
                required
                placeholder="Descreva sua dúvida ou problema em detalhes..."
            />
            <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                rightIcon={<Send className="h-4 w-4" />}
            >
                Enviar mensagem
            </Button>
        </form>
    );
}
