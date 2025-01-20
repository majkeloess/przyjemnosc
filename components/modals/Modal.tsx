const Modal = ({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-xl z-50">
      <div className="bg-back p-8 rounded-xl flex flex-col gap-4">
        {children}
        <div className="flex justify-end">
          <button
            className="bg-bronzelog py-2 px-4 text-white rounded-xl"
            onClick={onClose}
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
