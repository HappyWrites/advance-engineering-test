<script setup>
import { Form, Field, configure } from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from '../store/useAuthStore.js';

const schema = Yup.object().shape({
  user: Yup.string().required('Логин обязателен'),
  password: Yup.string().required('Пароль обязателен').min(8, 'Пароль должен быть не менee 8 символов')
});

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

const authStore = useAuthStore();

function onSubmit(values, { setErrors }) {  
  const { user, password } = values;

  return authStore.login(user, password)
    .catch(error => {
      setErrors({ apiError: error })
    });
}
</script>

<template>
  <section class="login-page">
    <div class="container">
      <Form 
        @submit="onSubmit"        
        :validation-schema="schema" 
        v-slot="{ errors }" 
        class="form">
        <div class="container-input">
          <Field 
            name="user" 
            type="text" 
            class="input" 
            placeholder="Введите логин"
            :class="{ 'input-error': errors.user }" />
          <span class="error">
            {{ errors.user }}
          </span>
        </div>
        <div class="container-input">
          <Field 
            name="password" 
            type="password" 
            class="input" 
            placeholder="Введите пароль"
            :class="{ 'input-error': errors.password }" />
          <span class="error">
            {{ errors.password }}
          </span>
        </div>
        <button class="button">Войти</button>
        <span 
        v-if="errors.apiError" 
        class="error error-api">
          {{ errors.apiError }}
        </span>
      </Form>
    </div>
  </section>
</template>