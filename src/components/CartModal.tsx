import { FormEvent, useState } from "react";
import Modal from "react-modal";
import { PlusCircle, XCircle, MinusCircle } from "react-feather";
import { useCart } from "../hooks/useCart";
import { Product } from "../types";
import { formatPrice } from "../util/format";

import "../styles/modal.scss";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function CartModal({ isOpen, onRequestClose }: ModalProps) {
  const { cart, removeProduct, updateProductAmount } = useCart();
  const [shipping, setShipping] = useState("");
  const [total, setTotal] = useState("");

  const cartFormatted = cart.map((product) => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * (product?.amount || 0)),
  }));

  useEffect(() => {
    // const auxtotal = formatPrice(
    //   cart.reduce((sumTotal, product) => {
    //     sumTotal += product.price * (product?.amount || 0);
    //     return sumTotal;
    //   }, 0)
    // );
    let auxtotal = cart.reduce((sumTotal, product) => {
      sumTotal += product.price * (product?.amount || 0);
      return sumTotal;
    }, 0);
   
    const productsPurched = cart.reduce((sumSize, product) => {
      sumSize +=  (product?.amount || 0);
      return sumSize;
    }, 0);
 
    if (auxtotal  > 250) {
      setTotal(formatPrice(auxtotal));
      setShipping(formatPrice(0));
    } else {
      auxtotal += productsPurched * 10
      setTotal(formatPrice(auxtotal));
      setShipping(formatPrice(productsPurched * 10));
    }
  }, [cart]);

  // async function handleAdd(event: FormEvent) {
  //   event.preventDefault();

  //   onRequestClose();
  // }

  function handleProductIncrement(product: Product) {
    updateProductAmount({
      productId: product.id,
      amount: (product?.amount || 0) + 1,
    });
  }

  function handleProductDecrement(product: Product) {
    updateProductAmount({
      productId: product.id,
      amount: (product?.amount || 0) - 1,
    });
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
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

      <div className="container-modal">
        <div className="table-modal">
          <thead>
            <tr>
              <th aria-label="product image" />
              <th>PRODUTO</th>
              <th>QTD</th>
              <th>SUBTOTAL</th>
              <th aria-label="delete icon" />
            </tr>
          </thead>
          <tbody className="table-body-list">
            {cartFormatted.map((product) => {
              return (
                <tr key={product.id}>
                  <td>
                    <img src={`/assets/${product.image}`} alt={product.name} />
                  </td>
                  <td>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </td>
                  <td>
                    <div>
                      <button
                        type="button"
                        disabled={(product?.amount || 0) <= 1}
                        onClick={() => handleProductDecrement(product)}
                      >
                        <MinusCircle size={20} />
                      </button>
                      <input type="text" readOnly value={product.amount} />
                      <button
                        type="button"
                        onClick={() => handleProductIncrement(product)}
                      >
                        <PlusCircle size={20} />
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>{product.subTotal}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      <XCircle size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </div>

        <footer>
          <button type="button">Finalizar pedido</button>

          <div className="card-total">
            <span>FRETE</span>
            <strong>{shipping}</strong>
          </div>
          <div className="card-total">
            <span>TOTAL</span>
            <strong>{total}</strong>
          </div>
        </footer>
      </div>
    </Modal>
  );
}
