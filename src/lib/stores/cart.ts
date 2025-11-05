import { writable, derived } from 'svelte/store';

export type ServiceItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const createCart = () => {
  const { subscribe, update, set } = writable<ServiceItem[]>([]);

  return {
    subscribe,
    add(item: ServiceItem) {
      update((items) => {
        const idx = items.findIndex(i => i.id === item.id);
        if (idx > -1) {
          items[idx].quantity += item.quantity;
          return [...items];
        }
        return [...items, item];
      });
    },
    remove(id: string) {
      update((items) => items.filter(i => i.id !== id));
    },
    clear() {
      set([]);
    },
    set,
  };
};

export const cart = createCart();

export const cartTotal = derived(cart, ($cart) =>
  $cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
