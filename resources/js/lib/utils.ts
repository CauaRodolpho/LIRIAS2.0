import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = 'BRL'): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    }).format(value);
}

export function formatNumber(value: number): string {
    return new Intl.NumberFormat('pt-BR').format(value);
}

export function formatBytes(gb: number): string {
    if (gb >= 1000) return `${(gb / 1000).toFixed(1)} TB`;
    return `${gb} GB`;
}

export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date): string {
    const diff = Date.now() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `há ${days}d`;
    if (hours > 0) return `há ${hours}h`;
    if (minutes > 0) return `há ${minutes}min`;
    return 'agora mesmo';
}

export function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return `${text.slice(0, length)}...`;
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}
