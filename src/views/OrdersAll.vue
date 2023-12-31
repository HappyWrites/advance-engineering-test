<script setup>
import { useOrdersStore } from '../store/useOrdersStore.js';
import { useAuthStore } from '../store/useAuthStore.js';
import { computed, ref, toRaw } from 'vue';
import { sort } from '../helpers/sorting.js'

import HeaderTable from '../components/HeaderTable.vue';
import PopupConfirmation from '../components/PopupConfirmation.vue';

const ordersStore = useOrdersStore()
const orders = computed(() => ordersStore.orders)
const sortingParameters = ref({
  column: '',
  sorting: ''
})

const filteredOrders = computed(() => {
  const newOrders = structuredClone(toRaw(orders.value))
  if (sortingParameters.value.sorting.length) {
    return sort(newOrders, sortingParameters.value.column, sortingParameters.value.sorting)
  } else {
    return orders.value
  }
})

function changeSortingParameters(columnParameter, sortParameter) {
  sortingParameters.value.column = columnParameter;
  sortingParameters.value.sorting = sortParameter;

  console.log(sortingParameters.value.column)
}

const sortableColumns = ['Адрес', 'Дата заказа']
const headersTable = {
  id: '№',
  name: 'Имя клиента',
  address: 'Адрес',
  date: 'Дата заказа',
  status: 'Статус',
  comment: 'Комментарий'
}


const authStore = useAuthStore()
const role = computed(() => authStore.role)
const isAdmin = computed(() => {
  return role.value === "ADMIN"
})


const orderToDelete = ref(null)
function deleteOrder() {
  return ordersStore.deleteOrder(orderToDelete.value)
    .catch(error => {
      console.log(error)
    });
}

function changeStatus(id) {
  return ordersStore.changeStatusOrder(id, 'Выполнен')
    .catch(error => {
      console.log(error)
    });
}

const isOpenPopup = ref(false)
function openPopup(id) {
  isOpenPopup.value = true;
  orderToDelete.value = id
}

function closePopup() {
  isOpenPopup.value = false
}

function popupConfirmed() {
  deleteOrder()
  isOpenPopup.value = false;
}
</script>

<template>
  <section class="orders-all-page">
    <PopupConfirmation 
      :isOpen="isOpenPopup" 
      @confirm="popupConfirmed"
      @close="closePopup">
      <template #header>
        <h2 class="popup-title">Вы действительно хотите удалить заказ?</h2>
      </template>
      <template #actions="{ confirm, close }">
        <button @click="confirm" class="popup-button">Ok</button>
        <button @click="close" class="popup-button">Отмена</button>
      </template>
    </PopupConfirmation>

    <table v-if="filteredOrders.length > 0">
      <thead>
        <tr>
          <HeaderTable 
            v-for="(headerTable, key) in headersTable" 
            :key="key" 
            :headerTableKey="key"
            :headerTable="headerTable"
            :sortableColumns="sortableColumns" 
            :sortingParameterColumn="sortingParameters.column"
            @changeSortingParameters="changeSortingParameters"/>
          <th></th>
        </tr>
      </thead>
      <tbody v-for="order in filteredOrders" :key="order.id">
        <tr :class="{'completed': order.status === 'Выполнен'}">
          <td> {{ order.id }} </td>
          <td> {{ order.name }} </td>
          <td> {{ order.address }} </td>
          <td> {{ order.date }} </td>
          <td> {{ order.status }} </td>
          <td> {{ order.comment }} </td>
          <td v-show="isAdmin">
            <button 
              v-if="order.status === 'Новый'" 
              class="button-table check"
              @click="changeStatus(order.id)">
              <span></span>
            </button>
            <button 
              class="button-table delete" 
              @click="openPopup(order.id)">
              <span></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="empty" v-else>
      <h2 class="empty-title">Список пуст</h2>
    </div>
  </section>
</template>