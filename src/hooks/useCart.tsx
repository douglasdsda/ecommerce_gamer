import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import DataProducts from "../services/products.json";
import { Product } from "../types";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@cardList:douglas517:cart"); //Buscar dados do localStorage

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const prevCartRef = useRef<Product[]>();

  const cartPreviousValue = prevCartRef.current ?? cart;

  useEffect(() => {
    prevCartRef.current = cart;
  });

  useEffect(() => {
    if (cartPreviousValue !== cart) {
      localStorage.setItem("@cardList:douglas517:cart", JSON.stringify(cart));
    }
  }, [cart, cartPreviousValue]);

  const addProduct = async (productId: number) => {
    try {
      // TODO
      const updateCart = [...cart];
      const productExist = updateCart.find((item) => item.id === productId);

      const currentAmout = productExist ? productExist.amount : 0;
      const amount = (currentAmout || 0) + 1;

      if (productExist) {
        productExist.amount = amount;
      } else {
        const listAuxProducts = [...DataProducts];
        const product = listAuxProducts.find((item) => item.id === productId);
        if (product) {
          const newProduct = { ...product, amount: 1 };
          updateCart.push(newProduct);
        } else toast.error("Erro ao tentar adicionar o produto");
      }
      setCart([...updateCart]);
    } catch {
      // TODO
      toast.error("Erro na adição do produto");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
      const updateCart = [...cart];
      const productIndex = updateCart.findIndex(
        (item) => item.id === productId
      );

      if (productIndex >= 0) {
        updateCart.splice(productIndex, 1);
        setCart([...updateCart]);
      } else {
        throw Error();
      }
    } catch {
      // TODO
      toast.error("Erro na remoção do produto");
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
      if (amount <= 0) return;

      const updateCart = [...cart];
      const productExist = updateCart.find((item) => item.id === productId);

      if (productExist) {
        productExist.amount = amount;
        setCart([...updateCart]);
      } else {
        throw Error();
      }
    } catch {
      // TODO
      toast.error("Erro na alteração de quantidade do produto");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
