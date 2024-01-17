import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import EditorToolbar from "./toolbar/editor-toolbar";

interface EditorProps {
    content: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

const Editor = ({ content, placeholder, onChange }: EditorProps) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return <></>;

    return (
        <div className="border-input bg-background dark:prose-invert prose w-full max-w-none border border-gray-800 focus:outline-none focus:ring-0">
            <EditorToolbar editor={editor} />
            <div className="editor">
                <EditorContent editor={editor} placeholder={placeholder} />
            </div>
        </div>
    );
};

export default Editor;
