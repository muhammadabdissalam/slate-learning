const CodeElement = ({ attributes, children }) => {
  return (
    <pre {...attributes} className="text-main-black font-paragraph">
      <code>{children}</code>
    </pre>
  );
};
export default CodeElement;
