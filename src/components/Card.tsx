import { Star, Bookmark, PlusCircle, XCircle } from "react-feather";

import "../styles/card.scss";
import { Product } from "../types";

export function Card(props: Product) {
  return (
    <div className="card-wrapper">
      <div className="card cursor">
        <img src={`/assets/${props.image}`} alt={props.name} />

        <div>
          <div className="info">
            <span>{props.name}</span>
            <div className="meta">
              <div>
                <Star /> {props.score}
              </div>

              <div>
                <Bookmark /> R$ {props.price.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="buttons">
        <div className="button">
          <span>Adicionar</span>
          <PlusCircle />
        </div>
        <div className="button">
          <span>Remover</span>
          <XCircle />
        </div>
      </div>
    </div>
  );
}
