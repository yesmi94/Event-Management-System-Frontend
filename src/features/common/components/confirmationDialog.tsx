import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  dialogTitle: string;
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  message,
  dialogTitle,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onConfirm();
          onClose();
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild onClick={onClose}>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={onConfirm}>
              Yes, Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
