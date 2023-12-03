import { useCallback, useEffect, useRef } from "react";
import { ModalContent, ModalOverlay } from "./styles";

declare interface ModalProps {
  isOpen: boolean;
  setIsOpen:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((_: boolean) => void);
  onClose?: () => void;
  closeOnClickOutside?: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  onClose,
  closeOnClickOutside = true,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (closeOnClickOutside && event.target === modalRef.current) {
        setIsOpen(false);
      }
    },
    [closeOnClickOutside, setIsOpen]
  );

  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleEscapeKey]);

  return (
    <ModalOverlay ref={modalRef} isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent>{children}</ModalContent>
    </ModalOverlay>
  );
};
