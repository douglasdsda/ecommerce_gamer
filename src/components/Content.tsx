import { useEffect, useState } from "react";

import { Card } from "../components/Card";
import DataProducts from "../services/products.json";

import "../styles/content.scss";

interface GameProps {
  id: number;
  name: string;
  price: number;
  score: number;
  image: string;
}

export function Content() {
  const [products, setProducts] = useState<GameProps[]>([]);

  useEffect(() => {
    const responseProducts = [...DataProducts];

    setProducts(responseProducts);
  }, []);

  return (
    <div className="container">
      <header>
        <span className="content-title">
          Lista de<span> Games </span>
        </span>
      </header>

      <main>
        <div className="content-list">
          {products.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              score={product.score}
              image={product.image}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
