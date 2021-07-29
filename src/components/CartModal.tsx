import { FormEvent, useState } from "react";
import Modal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function CartModal({ isOpen, onRequestClose }: ModalProps) {
  async function handleAdd(event: FormEvent) {
    event.preventDefault();

    onRequestClose();
  }

  return (
    <Modal
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <strong>X</strong>
      </button>
      {/* implementacao */}

      <button type="submit">Cadastrar</button>
    </Modal>
  );
}
