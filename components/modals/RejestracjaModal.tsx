import Modal from "@/components/modals/Modal";
import Link from "next/link";

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
        Możesz się teraz{" "}
        <Link href="/rezerwacje" className="text-bronzelog font-bold underline">
          zalogować
        </Link>{" "}
        na swoje konto oraz zarezerwować stolik.
      </p>
    </Modal>
  );
}
