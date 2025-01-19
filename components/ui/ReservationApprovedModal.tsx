import Modal from "./Modal";

const ReservationApprovedModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-2xl font-medium uppercase">
        Rezerwacja zatwierdzona!
      </h1>
      <p className="text-lg">
        Rezerwacja została zatwierdzona. Poniżej w panelu znajdziesz swoją
        rezerwację.
      </p>
    </Modal>
  );
};

export default ReservationApprovedModal;
