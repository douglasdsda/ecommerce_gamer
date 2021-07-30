import "../styles/sidebar.scss";

interface Props {
  onOpenModal: () => void;
}

export function SideBar({ onOpenModal }: Props) {



  return (
    <nav className="sidebar">
      <span>
        Ecommerce<br/>
        <p>Games</p>
      </span>

       <div onClick={onOpenModal} className="cart">
          <img className="cardButton" src="/assets/cart-icon.svg" alt="Cart" />
       </div>

      

    </nav>
  );
}
