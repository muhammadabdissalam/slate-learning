// Define a React component to render leaves with bold text.
const Leaf = ({ attributes, leaf, children }) => {
  return (
    <span {...attributes} style={{ fontWeight: leaf.bold ? 'bold' : 'normal' }}>
      {children}
    </span>
  );
};

export default Leaf;
