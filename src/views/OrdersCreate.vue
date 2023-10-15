<script setup>
import { Form, Field, configure } from 'vee-validate';
import * as Yup from 'yup';
import { useOrdersStore } from '../store/useOrdersStore.js';
import { ref, computed } from 'vue';
import { getDateNow } from '../helpers/dateСonversion.js'
import { useAuthStore } from '../store/useAuthStore.js';
import PopupConfirmation from '../components/PopupConfirmation.vue';

const authStore = useAuthStore()
const user = computed(() => authStore.user)

const schema = Yup.object().shape({
  name: Yup.string().required('Поле обязательно'),
  address: Yup.string().required('Поле обязательно')
});
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

const ordersStore = useOrdersStore();
const comment = ref('')
const isOpenPopup = ref(false)

function openPopup() {
  isOpenPopup.value = true
}

function closePopup() {
  isOpenPopup.value = false
}

function onSubmit(values, { setErrors, resetForm }) {
  const { name, address } = values

  const data = {
    name: name,
    address: address,
    date: getDateNow(),
    status: 'Новый',
    comment: comment.value
  }

  return ordersStore.createAnOrder(data)
    .then(result => {
      openPopup()
      resetForm({
        values: {
          name: user.value,
          address: ''
        }
      })
      comment.value = ''
    })
    .catch(error => {
      setErrors({ apiError: error })
    });
}

</script>

<template>
  <section class="create-order-page">
    <PopupConfirmation :isOpen="isOpenPopup" @close="closePopup">
      <template #header>
        <h2 class="popup-title">Новый заказ успешно добавлен!</h2>
      </template>
      <template #actions="{ close }">
        <button @click="close" class="popup-button">Отлично</button>
      </template>
    </PopupConfirmation>

    <h1 class="title">Добавить заказ</h1>
    <Form 
      @submit="onSubmit" 
      :validation-schema="schema" 
      v-slot="{ errors }" 
      class="form">
      <div class="container-input">
        <Field 
          name="name" 
          :value=user 
          type="text" 
          class="input" 
          placeholder="Введите ваше имя"
          :class="{ 'input-error': errors.name }" />
        <span class="error">
          {{ errors.name }}
        </span>
      </div>
      <div class="container-input">
        <Field 
          name="address" 
          type="text" 
          class="input" 
          placeholder="Введите ваш адрес"
          :class="{ 'input-error': errors.address }" />
        <span class="error">
          {{ errors.address }}
        </span>
      </div>
      <div class="container-input">
        <input 
          v-model="comment" 
          type="text" 
          class="input" 
          placeholder="Комментарий" />
      </div>
      <button class="button">Добавить заказ</button>
      <span v-if="errors.apiError" class="error error-api">
        {{ errors.apiError }}
      </span>
    </Form>
  </section>
</template>