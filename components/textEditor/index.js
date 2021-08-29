import { useMemo, useState, useRef, useCallback } from 'react';
import { createEditor, Editor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import DefaultElement from './renderer/defaultElement';
import CodeElement from './renderer/codeElement';
import Leaf from './leaf/leaf';
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
  const handleKeyDown = (event) => {
    if (!event.ctrlKey) {
      return;
    }

    switch (event.key) {
      // When "`" is pressed, keep our existing code block logic.
      case '`': {
        event.preventDefault();
        const [match] = Editor.nodes(editor, {
          match: (n) => n.type === 'code',
        });

        Transforms.setNodes(
          editor,
          { type: match ? 'paragraph' : 'code' },
          { match: (n) => Editor.isBlock(editor, n) }
        );
        break;
      }

      // When "B" is pressed, bold the text in the selection.
      case 'b': {
        event.preventDefault();
        const marks = Editor.marks(editor);
        Transforms.setNodes(
          editor,
          { bold: marks['bold'] ? false : true },
          // Apply it to text nodes, and split the text node up if the
          // selection is overlapping only part of it.
          { match: (n) => Text.isText(n), split: true }
        );
        break;
      }
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

  //custom formatting
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
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
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown}
        />
      </Slate>
    </div>
  );
};

export default TextEditor;
