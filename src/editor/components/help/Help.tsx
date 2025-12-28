import { useState, type FC } from 'react';
import { composeClassnames } from '../../../utilities/classNameUtilities';
import { Term } from './components/Term';
import { Description } from './components/Description';
import { Preview } from './components/Preview';
import { X } from 'react-feather';

export const Help: FC = () => {
    const [expanded, setExpanded] = useState<boolean>(false);

    const className = composeClassnames(
        'm-4 rounded border-3 max-h-90 overflow-y-scroll relative',
        {
            'bg-white border-amber-500': expanded,
            'border-transparent bg-transparent': !expanded,
        },
    );

    return (
        <div className={className}>
            {expanded && (
                <>
                    <button
                        type="button"
                        onClick={() => setExpanded(false)}
                        className="absolute top-4 right-4 cursor-pointer"
                    >
                        <X size={13} />
                    </button>
                    <section className="p-4 space-y-4">
                        <h1 className="text-lg">Syntax</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <Term term="# [header title]" />
                            <Description>
                                <p>Header to distinguish groups of todos.</p>
                                <Preview value="# Some header title" />
                            </Description>

                            <Term term="## [todo title]" />
                            <Description>
                                <p>
                                    {' '}
                                    Level one todo with timer and checkbox in
                                    the sidebar.
                                </p>
                                <Preview value="## Some todo title" />
                            </Description>

                            <Term term="- [ ] [todo title]" />
                            <Description>
                                <p>Level two todo in open status</p>
                                <Preview value="- [ ] Feed the dogs" />
                            </Description>

                            <Term term="- [x] [todo title]" />
                            <Description>
                                <p>Level two todo in done status.</p>
                                <Preview value="- [x] Feed the birds" />
                            </Description>

                            <Term term="`[inline code]`" />
                            <Description>
                                <p>Inline code snippet.</p>
                                <Preview value="Some text `some snippet` and some more." />
                            </Description>

                            <Term term="http://some-url.com" />
                            <Description>
                                <p>
                                    Urls are auto displayed as links. They are
                                    however not actual links, as we're still
                                    working in a plain text area. Copy paste
                                    them in the address bar of your browser.
                                </p>
                                <Preview value="https://wwww.google.nl" />
                            </Description>

                            <Term term="---" />
                            <Description>
                                <p>Show a horizontal rule.</p>
                                <Preview value="---" />
                            </Description>
                        </div>
                    </section>
                </>
            )}
            <button
                type="button"
                className="rounded hover:underline p-4 hover:cursor-pointer text-sm"
                onClick={() => {
                    setExpanded((current) => !current);
                }}
            >
                {expanded ? 'close' : 'help'}
            </button>
        </div>
    );
};
