import { cancelReservation } from "@/lib/mutations";
import Modal from "./Modal";
import { Reservation } from "@/types/types";

const CancelModal = ({
  reservation,
  isCancelModalOpen,
  onClose,
}: {
  reservation: Reservation;
  isCancelModalOpen: boolean;
  onClose: () => void;
}) => {
  const handleCancel = async () => {
    "use server";
    await cancelReservation(reservation.id, reservation.user_id);
  };

  return (
    <Modal isOpen={isCancelModalOpen} onClose={onClose}>
      <h1>Jesteś pewien, że chcesz anulować rezerwację?</h1>
      <button onClick={handleCancel}>Anuluj</button>
    </Modal>
  );
};

export default CancelModal;
