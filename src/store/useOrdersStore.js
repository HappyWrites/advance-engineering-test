import { defineStore } from 'pinia';
import { getOrders } from '../utils/api.js'

export const useOrdersStore = defineStore('orders', {
  state: () => {
    return {
      orders: []
    }
  },

  actions: {
    async getOrdersList() {
      const result = await getOrders();

      if (result && result.length) {
        this.orders = result
      } else {
        throw new Error('Ошибка получения списка заказов');
      }
    },
  },
})