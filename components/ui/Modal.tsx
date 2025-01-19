const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-bronzelog p-4 rounded-md">{children}</div>
    </div>
  );
};

export default Modal;
