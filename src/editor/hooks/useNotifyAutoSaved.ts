import { useEffect } from 'react';
import { toast } from 'react-toastify';

export function useNotifyAutoSaved(): void {
    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']): void => {
            if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                event.stopPropagation();

                toast.info(
                    'The changes are auto-saved, so no need to manually save',
                );
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);
}
