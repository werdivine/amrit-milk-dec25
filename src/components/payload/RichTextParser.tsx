import React from 'react';
import escapeHTML from 'escape-html';
import { Text } from 'slate';

interface Props {
    content: any;
    className?: string;
}

const RichTextParser: React.FC<Props> = ({ content, className }) => {
    if (!content) {
        return null;
    }

    const serialize = (children: any[]) =>
        children.map((node, i) => {
            if (Text.isText(node)) {
                let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />;

                if (node.bold) {
                    text = <strong key={i}>{text}</strong>;
                }

                if (node.code) {
                    text = <code key={i}>{text}</code>;
                }

                if (node.italic) {
                    text = <em key={i}>{text}</em>;
                }

                if (node.underline) {
                    text =
                        <span style={{ textDecoration: 'underline' }} key={i}>
                            {text}
                        </span>
                        ;
                }

                if (node.strikethrough) {
                    text =
                        <span style={{ textDecoration: 'line-through' }} key={i}>
                            {text}
                        </span>
                        ;
                }

                return <React.Fragment key={i}>{text}</React.Fragment>;
            }

            if (!node) {
                return null;
            }

            switch (node.type) {
                case 'h1':
                    return <h1 className="text-5xl font-serif font-bold mb-6" key={i}>{serialize(node.children)}</h1>;
                case 'h2':
                    return <h2 className="text-4xl font-serif font-bold mb-4" key={i}>{serialize(node.children)}</h2>;
                case 'h3':
                    return <h3 className="text-3xl font-serif font-bold mb-3" key={i}>{serialize(node.children)}</h3>;
                case 'h4':
                    return <h4 className="text-2xl font-bold mb-2" key={i}>{serialize(node.children)}</h4>;
                case 'h5':
                    return <h5 className="text-xl font-bold mb-2" key={i}>{serialize(node.children)}</h5>;
                case 'h6':
                    return <h6 className="text-lg font-bold mb-2" key={i}>{serialize(node.children)}</h6>;
                case 'quote':
                    return <blockquote className="border-l-4 border-gold pl-4 italic my-4" key={i}>{serialize(node.children)}</blockquote>;
                case 'ul':
                    return <ul className="list-disc list-inside mb-4" key={i}>{serialize(node.children)}</ul>;
                case 'ol':
                    return <ol className="list-decimal list-inside mb-4" key={i}>{serialize(node.children)}</ol>;
                case 'li':
                    return <li key={i}>{serialize(node.children)}</li>;
                case 'link':
                    return (
                        <a
                            href={escapeHTML(node.url)}
                            key={i}
                            className="text-terracotta dark:text-gold hover:underline"
                        >
                            {serialize(node.children)}
                        </a>
                    );

                default:
                    return <p className="mb-4 leading-relaxed" key={i}>{serialize(node.children)}</p>;
            }
        });

    return (
        <div className={`rich-text ${className}`}>
            {serialize(content)}
        </div>
    );
};

export default RichTextParser;
