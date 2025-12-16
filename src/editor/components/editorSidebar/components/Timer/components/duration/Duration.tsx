import { useEffect, useState, type FC } from 'react';
import { formatDuration } from '../../../../../../../utilities/dateTimeUtilities';

type Props = {
    startedAt: Date;
};

function calculateDurationInSeconds(startedAt: Date): number {
    return Math.floor((Date.now() - startedAt.getTime()) / 1000);
}

const Duration: FC<Props> = ({ startedAt }) => {
    const [lengthInSeconds, setLengthInSeconds] = useState(
        calculateDurationInSeconds(startedAt),
    );

    useEffect(() => {
        const handle = setInterval(() => {
            setLengthInSeconds(calculateDurationInSeconds(startedAt));
        }, 500);

        return () => clearInterval(handle);
    }, [startedAt]);

    const duration = formatDuration(lengthInSeconds);

    return <div>{duration}</div>;
};

export default Duration;
