import { useEffect, useState } from 'react';

type Output = {
    error: string | null;
    setError: (error: string | null) => void;
    clearError: () => void;
};

export function useTemporaryError(timeoutMs: number): Output {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(error);

        const handle = setTimeout(() => setError(null), timeoutMs);

        return () => clearTimeout(handle);
    }, [error, timeoutMs]);

    return {
        error,
        setError,
        clearError: () => setError(null),
    };
}
