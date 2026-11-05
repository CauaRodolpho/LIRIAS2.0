'use client';

import { useState, type FormEvent } from 'react';
import { useNavigate } from '@/lib/routing';
import Link from '@/components/navigation/app-link';
import { User, Mail, Lock, Eye, EyeOff, Info } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { cn } from '@/lib/utils';

import type { RegisterDTO } from '@/types';

const initialState: RegisterDTO = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: 'BR',
    acceptTerms: false,
};

export function RegisterForm({ onSwitchMode }: { onSwitchMode?: () => void }) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<RegisterDTO>(initialState);
    const [errors, setErrors] = useState<
        Partial<Record<keyof RegisterDTO, string>>
    >({});

    function validate(): boolean {
        const newErrors: Partial<Record<keyof RegisterDTO, string>> = {};
        if (!formData.name) newErrors.name = 'Informe seu nome completo';
        if (!formData.email) newErrors.email = 'Informe seu email';
        else if (!/^\S+@\S+\.\S+$/.test(formData.email))
            newErrors.email = 'Email inválido';
        if (!formData.password) newErrors.password = 'Crie uma senha';
        else if (formData.password.length < 8)
            newErrors.password = 'Mínimo de 8 caracteres';
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'As senhas não coincidem';
        if (!formData.acceptTerms)
            newErrors.acceptTerms = 'Você precisa aceitar os termos';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 700));
        window.localStorage.setItem(
            'lirias-demo-session',
            JSON.stringify({
                email: formData.email,
                name: formData.name,
                createdAt: new Date().toISOString(),
                demo: true,
            }),
        );
        navigate('/dashboard');
    }

    const passwordStrength =
        formData.password.length === 0
            ? 0
            : formData.password.length < 6
              ? 1
              : formData.password.length < 10
                ? 2
                : 3;

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            noValidate
        >
            <div
                role="status"
                className="flex items-start gap-2 rounded-xl border border-primary/25 bg-primary/10 p-3 text-xs leading-5 text-muted-foreground"
            >
                <Info
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary-light"
                    aria-hidden="true"
                />
                <span>
                    Cadastro demonstrativo: os dados ficam somente neste
                    navegador e não criam uma conta real.
                </span>
            </div>

            <Input
                type="text"
                name="name"
                label="Nome completo"
                placeholder="João da Silva"
                leftIcon={<User className="h-4 w-4" />}
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
                error={errors.name}
                autoComplete="name"
                required
            />

            <Input
                type="email"
                name="email"
                label="Email"
                placeholder="voce@empresa.com"
                leftIcon={<Mail className="h-4 w-4" />}
                value={formData.email}
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                }
                error={errors.email}
                autoComplete="email"
                required
            />

            <div className="relative">
                <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    label="Senha"
                    placeholder="Mínimo 8 caracteres"
                    leftIcon={<Lock className="h-4 w-4" />}
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                    error={errors.password}
                    autoComplete="new-password"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-[34px] right-3.5 text-muted-foreground hover:text-muted-foreground"
                    aria-label={
                        showPassword ? 'Ocultar senha' : 'Mostrar senha'
                    }
                >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </button>
            </div>

            <div className="-mt-3" aria-live="polite">
                <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
                    {[1, 2, 3].map((level) => (
                        <span
                            key={level}
                            className={cn(
                                'h-1 rounded-full bg-border',
                                passwordStrength >= level &&
                                    (passwordStrength === 1
                                        ? 'bg-danger'
                                        : passwordStrength === 2
                                          ? 'bg-warning'
                                          : 'bg-success'),
                            )}
                        />
                    ))}
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                    {passwordStrength === 0
                        ? 'Use pelo menos 8 caracteres.'
                        : passwordStrength === 1
                          ? 'Senha fraca'
                          : passwordStrength === 2
                            ? 'Senha média'
                            : 'Senha forte'}
                </p>
            </div>

            <Input
                type="password"
                name="confirmPassword"
                label="Confirmar senha"
                placeholder="Repita a senha"
                leftIcon={<Lock className="h-4 w-4" />}
                value={formData.confirmPassword}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                    })
                }
                error={errors.confirmPassword}
                autoComplete="new-password"
                required
            />

            <div className="flex flex-col gap-1">
                <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                acceptTerms: e.target.checked,
                            })
                        }
                        className="mt-0.5 h-4 w-4 rounded border-border bg-background-tertiary text-primary focus:ring-primary"
                    />
                    <span>
                        Concordo com os{' '}
                        <Link
                            href="/terms"
                            className="text-primary-light hover:underline"
                        >
                            Termos de Uso
                        </Link>{' '}
                        e a{' '}
                        <Link
                            href="/privacy"
                            className="text-primary-light hover:underline"
                        >
                            Política de Privacidade
                        </Link>
                    </span>
                </label>
                {errors.acceptTerms && (
                    <p className="text-xs text-danger">{errors.acceptTerms}</p>
                )}
            </div>

            <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full"
            >
                Criar conta
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                Já tem uma conta?{' '}
                {onSwitchMode ? (
                    <button
                        type="button"
                        onClick={onSwitchMode}
                        className="font-medium text-primary-light hover:underline"
                    >
                        Fazer login
                    </button>
                ) : (
                    <Link
                        href="/login"
                        className="font-medium text-primary-light hover:underline"
                    >
                        Fazer login
                    </Link>
                )}
            </p>
        </form>
    );
}
