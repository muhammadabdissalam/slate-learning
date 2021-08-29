import { useMemo, useState, useRef, useCallback } from 'react';
import { createEditor, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import DefaultElement from './renderer/defaultElement';
import CodeElement from './renderer/codeElement';

const TextEditor = () => {
  const editorRef = useRef();
  if (!editorRef.current) {
    editorRef.current = withReact(createEditor());
  }
  const editor = editorRef.current;
  // const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);
  const handleKeyDownAnd = (event) => {
    if (event.key === '&') {
      // Prevent the ampersand character from being inserted.
      event.preventDefault();
      // Execute the `insertText` method when the event occurs.
      editor.insertText('and');
    }
  };
  const handleToCode = (event) => {
    if (event.key === '`' && event.ctrlKey) {
      // Prevent the "`" from being inserted by default.
      event.preventDefault();
      // Determine whether any of the currently selected blocks are code blocks.
      const [match] = Editor.nodes(editor, {
        match: (n) => n.type === 'code',
      });
      // Otherwise, set the currently selected blocks type to "code".
      Transforms.setNodes(
        editor,
        { type: match ? 'paragraph' : 'code' },
        { match: (n) => Editor.isBlock(editor, n) }
      );
    }
  };
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  return (
    <div className="">
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Editable
          autoCapitalize="false"
          autoCorrect="false"
          spellCheck="false"
          renderElement={renderElement}
          onKeyDown={handleToCode}
        />
      </Slate>
    </div>
  );
};

export default TextEditor;
