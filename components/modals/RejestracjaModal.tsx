import Modal from "@/components/modals/Modal";

export default function RejestracjaModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-2xl font-medium uppercase  text-center">
        Konto zostało utworzone pomyślnie!
      </h1>
      <p className="text-center">
        Możesz się teraz zalogować na swoje konto oraz zarezerwować stolik.
      </p>
    </Modal>
  );
}
