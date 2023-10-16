<script setup>
import { 
  ref, 
  computed, 
  defineProps, 
  defineEmits, 
  watch 
} from 'vue'

const props = defineProps({
  headerTableKey: {
    type: String,
    required: true
  },

  headerTable: {
    type: String,
    required: true
  },

  sortingParameterColumn: {
    type: String,
    required: true
  },

  sortableColumns: {
    type: Array,
    required: true
  }
})

const emit = defineEmits({
  changeSortingParameters: null
})

const sorting = ref('')
const isActiveSort = computed(() => sorting.value !== '')
const sortIsDesc = computed(() => sorting.value === 'desc')
const isSortableColumn = computed(() => props.sortableColumns.includes(props.headerTable))

function checkSorting() {
  if (sorting.value === '') {
    sorting.value = 'asc'
    changeSorting()
  } else if (sorting.value === 'asc') {
    sorting.value = 'desc'
    changeSorting()
  } else {
    sorting.value = ''
    changeSorting()
  }
}

function changeSorting() {
  emit('changeSortingParameters', props.headerTableKey, sorting.value)
}

watch(() => [props.sortingParameterColumn], (newValues, oldValues) => {
      if (newValues[0] !== props.headerTableKey) {
        sorting.value = ''
      }
    });
</script>

<template>
  <th>
    {{ headerTable }} 
    <button 
      class="arrow-sort" 
      :class="{ 'active': isActiveSort, 'desc': sortIsDesc }" 
      @click="checkSorting"
      v-if="isSortableColumn">
    </button>
  </th>
</template>
