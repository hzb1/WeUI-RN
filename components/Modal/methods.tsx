import Modal, { ModalProps } from '@/components/Modal';
import { Portal } from '@/components/Portal/PortalProvider';

type ModalOpenProps = Omit<ModalProps, 'open' | 'onClose'>;

export const openModal = (props: ModalOpenProps) => {
  const portalId = Portal.open({
    content: ({ open, onOpenChange }) => (
      <Modal {...props} open={open} onClose={() => onOpenChange(false)} />
    ),
  });
  return () => {
    Portal.closeAndUnload(portalId);
  };
};
