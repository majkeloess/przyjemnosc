import EditUserForm from "../panel-page/EditUserForm";
import Modal from "./Modal";

const EditUserModal = ({
  userId,
  isOpen,
  onClose,
}: {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCloseButtonVisible={false}>
      <EditUserForm userId={userId} setIsEditModalOpen={onClose} />
    </Modal>
  );
};

export default EditUserModal;
