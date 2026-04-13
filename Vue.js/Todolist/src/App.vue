<script setup>
import { computed, ref } from 'vue';

const isHidDone = ref(false)  
const newtodo = ref('')
const todos = ref([
  { text: '学习vue1', done: false },
  { text: '学习vue2', done: true },
  { text: '学习vue3', done: false },
])

const add = function () {
  todos.value.push({
    text: newtodo.value,
    done: false,
  })
  newtodo.value = ''
}

const del = function (deltodo) {
  // 对象变量是引用类型所以比较的是地址,地址不同删除也行,效果一样的
  todos.value = todos.value.filter((t) => t != deltodo)
}

const filtertodos = computed(() => {
  return isHidDone.value
    ? todos.value.filter((t) => !t.done)
    : todos.value
})

</script>

<template>
  <div>
    <h1>Todolist</h1>
    <input v-model="newtodo" placeholder="add todo item">
    <button @click="add">add</button>
    <ul>
      <li v-for="todo in filtertodos">
        <!-- 这里的v-model是改变时自己获取复选框的状态来重新赋值 -->
        <input type="checkbox" :checked="todo.done" v-model="todo.done">
        <span :class="todo.done ? 'done' : ''">{{ todo.text }}</span>
        <button @click="del(todo)">del</button>
      </li>
    </ul>
    <button @click="isHidDone = !isHidDone">
      {{ isHidDone ? 'show done' : 'hidden done' }}
    </button>
  </div>
</template>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
