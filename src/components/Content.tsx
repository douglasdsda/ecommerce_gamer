import { useEffect, useState } from "react";

import { Card } from "../components/Card";
import DataProducts from "../services/products.json";

import "../styles/content.scss";
import { Product } from "../types";

interface GameProps {
  id: number;
  name: string;
  price: number;
  score: number;
  image: string;
}

interface Props {
  onOpenModal: () => void;
}

export function Content({ onOpenModal }: Props) {
  const [products, setProducts] = useState<GameProps[]>([])
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    let responseProducts = [...DataProducts];
    let result: Product[] = []
     
     if(selected === 0) {
      result = responseProducts.sort((a, b) => {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
      });
     } else if(selected === 1) {
      result = responseProducts.sort((a, b) => {
        if (a.score > b.score) return -1;
        if (a.score < b.score) return 1;
        return 0;
      });
     } else {
      result = responseProducts.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
     }

    setProducts(result);
  }, [selected]);

  return (
    <div className="container">
      <header>
        <span className="content-title">
          Lista de<span> Games </span>
        </span>
      </header>

      <main>

         

        <div className="list-sort">
          <h3 style={{marginRight: 20}}>Ordernar por: </h3>
          <div className="button-sort" onClick={() => setSelected(0)}>Preço</div>
          <div className="button-sort"  onClick={() => setSelected(1)}>Score</div>
          <div className="button-sort"  onClick={() => setSelected(2)}>Ordem alfabética.</div>
        </div>

        <div className="content-list">
          {products.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              score={product.score}
              image={product.image}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
