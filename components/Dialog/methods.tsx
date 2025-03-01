import Dialog, { DialogProps } from '@/components/Dialog/Dialog';
import { Portal } from '@/components/Portal/PortalProvider';

export type DialogConfirmProps = Omit<DialogProps, 'open' | 'onClose'>;

export const openConfirm = ({ ...dialogProps }: DialogConfirmProps) => {
  const portalId = Portal.open({
    content: ({ open, onOpenChange }) => (
      <Dialog
        {...dialogProps}
        open={open}
        onClose={() => onOpenChange(false)}
      />
    ),
  });

  return () => {
    Portal.closeAndUnload(portalId);
  };
};
