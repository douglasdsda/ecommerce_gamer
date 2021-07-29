import { SideBar } from "../../components/SideBar";
import { Content } from "../../components/Content";
import { useState } from "react";
import { CartModal } from "../../components/CartModal";

export function Home() {

  const [modalOpen, setModalOpen] = useState(
    false
  );

  function handleOpenModalOpen() {
    setModalOpen(true);
  }

  function handleCloseModalOpen() {
    setModalOpen(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar   onOpenModal={handleOpenModalOpen} />

      <CartModal
        isOpen={modalOpen}
        onRequestClose={handleCloseModalOpen}
      />

      <Content />
    </div>
  );
}
