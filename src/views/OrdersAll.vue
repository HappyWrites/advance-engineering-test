<script setup>
import { useOrdersStore } from '../store/useOrdersStore.js';
import { useAuthStore } from '../store/useAuthStore.js';
import { computed } from 'vue';

const ordersStore = useOrdersStore()
const orders = computed(() => ordersStore.orders)

const headersTable = {
  id: '№',
  name: 'Имя клиента',
  address: 'Адрес',
  date: 'Дата заказа',
  status: 'Статус',
  comment: 'Комментарий'
}

function getHeaderTableMobile(key) {
  return headersTable[key]
}

const authStore = useAuthStore()
const role = computed(() => authStore.role)
const isAdmin = computed(() => {
  return role.value === "ADMIN"
})

</script>

<template>
  <section class="orders-all-page">
    <table>
      <thead>
        <tr>
          <th v-for="headerTable in headersTable" :key="headerTable">{{ headerTable }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-for="order in orders" :key="order.id">
        <tr>
          <td v-for="(value, key) in order" :key="value">
            <span class="mobile-text">
              {{ getHeaderTableMobile(key) }}
            </span>
            {{ value }}
          </td>
          <td v-show="isAdmin">
            <button class="button-table check"><span></span></button>
            <button class="button-table delete"><span></span></button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>