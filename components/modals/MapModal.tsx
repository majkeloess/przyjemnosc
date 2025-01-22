import Modal from "./Modal";
import Image from "next/image";

const MapModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Image src="/uklad.webp" alt="Mapa" width={1000} height={1000} />
    </Modal>
  );
};

export default MapModal;
