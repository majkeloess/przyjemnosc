import Modal from "../modals/Modal";

const ValidLoyaltyCodeModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-2xl font-medium uppercase">
        Kod lojalnościowy poprawny!
      </h1>
      <p className="text-lg">
        Kod lojalnościowy został zastosowany. Od rachunku zostanie odjęta
        odliczona kwota.
      </p>
    </Modal>
  );
};

export default ValidLoyaltyCodeModal;
