import { useState, type FC } from 'react';
import { Term } from './components/Term';
import { Description } from './components/Description';
import { Preview } from './components/Preview';
import { X, HelpCircle } from 'react-feather';
import { Heading } from './components/Heading';

export const Help: FC = () => {
    const [expanded, setExpanded] = useState<boolean>(false);

    if (expanded) {
        return (
            <div
                className="w-screen h-screen bg-white cursor-pointer"
                onClick={() => setExpanded(false)}
            >
                <button
                    type="button"
                    onClick={() => setExpanded(false)}
                    className="absolute top-4 right-4 cursor-pointer border rounded p-2 border-slate-200 hover:border-slate-500 bg-white"
                >
                    <X size={13} />
                </button>
                <section className="p-4 space-y-12 w-full h-full overflow-y-scroll max-w-2xl mx-auto">
                    <div className="space-y-2">
                        <Heading>Introduction</Heading>
                        <ul className="pl-4 list-disc">
                            <li>
                                In general, every block of text separated with
                                two line breaks is considered a separate todo,
                                with a separate timer.
                            </li>
                            <li>
                                You can use Markdown-like syntax, as described
                                below to structure or highlight parts, or create
                                sub-todo items
                            </li>
                            <li>
                                The todos are stored in the URL, so that you can
                                easily share the list with others, or send them
                                to other devices to proceed working on the todos
                                there.
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <Heading>Markdown-like syntax</Heading>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <Term term="# <header title>" />
                            <Description>
                                <p>Header to distinguish groups of todos.</p>
                                <Preview value="# Some header title" />
                            </Description>

                            <Term term="## <Header title>" />
                            <Description>
                                <p>
                                    Secondary header to distinguish sub groups
                                    of todos.
                                </p>
                                <Preview value="## Some todo title" />
                            </Description>

                            <Term term="- [ ] <todo title>" />
                            <Description>
                                <p>Level two todo in open status</p>
                                <Preview value="- [ ] Feed the dogs" />
                            </Description>

                            <Term term="- [x] <todo title>" />
                            <Description>
                                <p>Level two todo in done status.</p>
                                <Preview value="- [x] Feed the birds" />
                            </Description>

                            <Term term="`<inline code>`" />
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

                            <Term term="> <some quote>" />
                            <Description>
                                <p>Add a quote block.</p>
                                <Preview value="> some quoted text" />
                            </Description>

                            <Term term="---" />
                            <Description>
                                <p>
                                    Add a horizontal line by adding at minimum 3
                                    dashes.
                                </p>
                                <Preview value="-------------------------" />
                            </Description>

                            <Term term="[!]" />
                            <Description>
                                <p>Minorly important.</p>
                                <Preview value="[!]" />
                            </Description>

                            <Term term="[!!]" />
                            <Description>
                                <p>Very important.</p>
                                <Preview value="[!!]" />
                            </Description>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Heading>Keyboard shortcuts</Heading>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <Term term="SHIFT + CTRL + UP" />
                            <Description>
                                <p>Move the current todo or heading up</p>
                            </Description>

                            <Term term="SHIFT + CTRL + DOWN" />
                            <Description>
                                <p>Move the current todo or heading down</p>
                            </Description>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <button
            type="button"
            className="rounded hover:underline p-4 hover:cursor-pointer text-sm flex items-center gap-1"
            onClick={() => {
                setExpanded((current) => !current);
            }}
        >
            <HelpCircle size={13} /> help
        </button>
    );
};
