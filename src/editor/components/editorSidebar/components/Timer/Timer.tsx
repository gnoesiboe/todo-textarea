import { type FC } from 'react';
import { Play, Loader } from 'react-feather';
import Duration from './components/duration/Duration';
import useEditorContext from '../../../../../context/hooks/useEditorContext';
import {
    formatAsTime,
    formatDuration,
} from '../../../../../utilities/dateTimeUtilities';

type Props = {
    index: number;
};

type TimerStatus = 'started' | 'stopped';

const startedAtRegex = /@startedAt\([0-9]{2}:[0-9]{2}:[0-9]{2}\)/;

const Timer: FC<Props> = ({ index }) => {
    const { text, appendToLine, replaceLine } = useEditorContext();

    const sentence = text.split('\n')[index] || '';

    const status: TimerStatus = startedAtRegex.test(sentence)
        ? 'started'
        : 'stopped';

    const buttonSize = 12;
    const buttonSharedClassNames =
        'h-4 w-4 hover:cursor-pointer flex items-center justify-center';

    switch (status) {
        case 'stopped': {
            return (
                <button
                    className={buttonSharedClassNames}
                    onClick={() => {
                        if (startedAtRegex.test(text[index])) {
                            console.warn('Timer already started');

                            return;
                        }

                        appendToLine(
                            index,
                            ` @startedAt(${formatAsTime(new Date())})`,
                        );
                    }}
                >
                    <Play size={buttonSize} />
                </button>
            );
        }

        case 'started': {
            const startedAtTime = sentence
                .match(startedAtRegex)?.[0]
                .replace('@startedAt(', '')
                .replace(')', '');

            let startedAt: Date | null = null;
            if (startedAtTime) {
                const [hours, minutes, seconds] = startedAtTime
                    .split(':')
                    .map((part) => parseInt(part, 10));

                const now = new Date();
                startedAt = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate(),
                    hours,
                    minutes,
                    seconds,
                );
            }

            return (
                <div className="flex gap-1 items-center">
                    {startedAt ? (
                        <Duration startedAt={startedAt} />
                    ) : (
                        <div>--</div>
                    )}
                    <button
                        className={buttonSharedClassNames}
                        onClick={() => {
                            if (!startedAtRegex.test(sentence)) {
                                console.warn('Timer not started');

                                return;
                            }

                            let newLine = sentence
                                .replace(startedAtRegex, '')
                                .trim();

                            if (startedAt) {
                                const now = new Date();
                                const durationInSeconds = Math.floor(
                                    (now.getTime() - startedAt.getTime()) /
                                        1000,
                                );

                                const durationString =
                                    formatDuration(durationInSeconds);

                                newLine += ` @spent(${durationString})`;
                            }

                            replaceLine(index, newLine);
                        }}
                    >
                        <Loader size={buttonSize} className="animate-spin" />
                    </button>
                </div>
            );
        }

        default: {
            throw new Error(`Unexpected timer state`);
        }
    }
};

export default Timer;
