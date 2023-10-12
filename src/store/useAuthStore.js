import { defineStore } from 'pinia';
import { getUserInfo, logout } from '../utils/api.js'
import { useOrdersStore } from './useOrdersStore.js';
import router from '../router/router.js';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: null,
      name: null,
      role: null
    }
  },

  actions: {
    async login(user, password) {
      const result = await getUserInfo(user, password);

      if (result && result.length) {
        this.user = result[0].user;
        this.name = result[0].name;
        this.role = result[0].role;

        const ordersStore = useOrdersStore()
        ordersStore.getOrdersList()

        router.push({ name: 'orders-all' })
      } else {
        throw new Error('Неверный логин или пароль');
      }
    },

    logout() {
      const result = logout();

      if (result) {
        this.user = null;
        this.name = null;
        this.role = null;

        router.push({ name: 'login' })
      }
    }
  },
})