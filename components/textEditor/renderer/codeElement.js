const CodeElement = ({ attributes, children }) => {
  return (
    <pre {...attributes} className="text-gray-600">
      <code>{children}</code>
    </pre>
  );
};
export default CodeElement;
