import type { FC } from 'react';
import { useTitle } from './hooks/useTitle';
import { EditTitle } from './components/editTitle/EditTitle';

export const Title: FC = () => {
    const { title } = useTitle();

    return <EditTitle title={title} />;
};
