const DefaultElement = ({ attributes, children }) => {
  return (
    <p {...attributes} className="font-paragraph text-main-black">
      {children}
    </p>
  );
};
export default DefaultElement;
