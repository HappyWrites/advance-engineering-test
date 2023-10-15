import { defineStore } from 'pinia';
import { 
  getOrders, 
  deleteOrderFromList, 
  changeStatusOrderFromList,
  createAnOrderFromList
} from '../utils/api.js'

export const useOrdersStore = defineStore('orders', {
  state: () => {
    return {
      orders: []
    }
  },

  actions: {
    async getOrdersList() {
      const result = await getOrders();

      if (result) {
        this.orders = result
      } else {
        throw new Error('Ошибка получения списка заказов');
      }
    },

    async deleteOrder(id) {
      const result = await deleteOrderFromList(id);

      if (result) {
        this.getOrdersList()
      } else {
        throw new Error('Ошибка удаления заказа из списка');
      }
    },

    async changeStatusOrder(id, status) {
      const result = await changeStatusOrderFromList(id, status);

      if (result) {
        this.getOrdersList()
      } else {
        throw new Error('Ошибка изменения статуса заказа');
      }
    },

    async createAnOrder(data) {
      const result = await createAnOrderFromList(data);

      if (result) {
        this.getOrdersList()
      } else {
        throw new Error('Ошибка добавления нового заказа');
      }
    }
  },
})