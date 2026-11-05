import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from '@/lib/routing';
import { AuthShell, type AuthMode } from '@/components/shared/auth-shell';
import { LoginForm, RegisterForm } from '@/features/auth';

export default function AuthPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const routeMode: AuthMode =
        location.pathname === '/register' ? 'register' : 'login';
    const [mode, setMode] = useState<AuthMode>(routeMode);
    const navigationTimer = useRef<number | null>(null);

    useEffect(() => {
        setMode(routeMode);
    }, [routeMode]);

    useEffect(
        () => () => {
            if (navigationTimer.current)
                window.clearTimeout(navigationTimer.current);
        },
        [],
    );

    function changeMode(nextMode: AuthMode) {
        if (nextMode === mode) return;
        setMode(nextMode);
        if (navigationTimer.current)
            window.clearTimeout(navigationTimer.current);
        navigationTimer.current = window.setTimeout(() => {
            navigate(nextMode === 'login' ? '/login' : '/register');
        }, 460);
    }

    return (
        <AuthShell mode={mode} onModeChange={changeMode}>
            {mode === 'login' ? (
                <LoginForm onSwitchMode={() => changeMode('register')} />
            ) : (
                <RegisterForm onSwitchMode={() => changeMode('login')} />
            )}
        </AuthShell>
    );
}
