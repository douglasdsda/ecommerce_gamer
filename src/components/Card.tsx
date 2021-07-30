import { Star, Bookmark, PlusCircle, XCircle } from "react-feather";
import { useCart } from "../hooks/useCart";

import "../styles/card.scss";
import { Product } from "../types";

interface Props extends Product {
  onOpenModal: () => void
}

export function Card({ id,image,name,onOpenModal,price, score }: Props) {
   const { addProduct } = useCart()

  function handleAdd(productId: number){
    addProduct(productId)
    onOpenModal()
  }

  return (
    <div className="card-wrapper">
      <div className="card cursor">
        <img src={`/assets/${image}`} alt={name} />

        <div>
          <div className="info">
            <span>{name}</span>
            <div className="meta">
              <div>
                <Star /> {score}
              </div>

              <div>
                <Bookmark /> R$ {price.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="buttons">
        <div onClick={() => handleAdd(id)} className="button">
          <span>Comprar</span>
          <PlusCircle />
        </div>
      </div>
    </div>
  );
}
