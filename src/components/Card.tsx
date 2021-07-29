import { Star, Bookmark } from "react-feather";

import "../styles/card.scss";

interface CardProps {
  id: number;
  name: string;
  price: number;
  score: number;
  image: string;
}

export function Card(props: CardProps) {
  return (
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
  );
}
