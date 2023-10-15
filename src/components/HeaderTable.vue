<script setup>
import { ref, computed, defineProps } from 'vue'

const props = defineProps({
  headerTable: {
    type: String,
    required: true
  },

  sortableColumns: {
    type: Array,
    required: true
  }
})

const sort = ref('')
const isActiveSort = computed(() => sort.value !== '')
const sortIsDesc = computed(() => sort.value === 'desc')
const isSortableColumn = computed(() => props.sortableColumns.includes(props.headerTable))

function changeSort() {
  sort.value = sort.value === ''? 'asc' 
             : sort.value === 'asc'? 'desc' 
             : ''
}
</script>

<template>
  <th>
    {{ headerTable }}
    <button 
    class="arrow-sort" 
    :class="{ 'active': isActiveSort, 'desc': sortIsDesc }" 
    @click="changeSort"
    v-if="isSortableColumn">
    </button>
  </th>
</template>
