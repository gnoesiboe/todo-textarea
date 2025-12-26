import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';

/**
 * Alloes logic in class name compositions, using the `classnames` utility, but also ensures that, when using Tailwind CSS class names, the last class name replaces the previous one. I.e. `text-black text-white` will end up being `text-white`.
 */
export const composeClassnames = (
    ...args: classnames.ArgumentArray
): string => {
    return twMerge(classnames(...args));
};
