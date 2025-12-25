import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';

export const composeClassnames = (
    ...args: classnames.ArgumentArray
): string => {
    return twMerge(classnames(...args));
};
