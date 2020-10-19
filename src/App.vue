<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
            class="new-todo"
            autofocus=""
            v-model="inputValueRef"
            autocomplete="off"
            placeholder="What needs to be done?"
            @keydown.enter.prevent="addTodo"
        />
      </header>
      <!--      主页面，-->
      <section class="main"  v-show="todoListRef.length > 0">
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="hasDoneCompletedRef"/>
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list" v-for="todo in filterTodoListRef" :key="todo.id">
          <li class="todo" :class="{'completed': todo.completed, 'editing': hasEditorRef === todo}">
            <div class="view">
              <input class="toggle"
                     type="checkbox"
                     v-model="todo.completed"/>
              <label @dblclick="editTotoObj(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="removeOne(todo)"></button>
            </div>
            <input class="edit"
                   type="text"
                   v-model="todo.title"
                   @blur="confirmEdit(todo)"
                   @keyup.enter.prevent="confirmEdit(todo)"
                   @keyup.escape = "cancelEdit(todo)"
            />
          </li>
        </ul>
      </section>
      <!--      底部 -->
      <footer class="footer" v-show="todoListRef.length > 0">
        <span class="todo-count">
          <strong>{{ remainingTodoListRef }}</strong>
          <span>{{ `item${remainingTodoListRef <= 1 ? '' : 's'} left ` }}</span>
        </span>
        <ul class="filters">
          <li><a href="#/all" :class="{selected: filterHashRef === 'all'}">All</a></li>
          <li><a href="#/active" :class="{selected: filterHashRef === 'active'}">Active</a></li>
          <li><a href="#/completed" :class="{selected: filterHashRef === 'completed'}">Completed</a></li>
        </ul>
        <button class="clear-completed"
                :style="{display: todoListOfCompleted === 0 ? 'none': 'block'}"
                @click="removeAllCompleted"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>

import {useToDoList} from "./composition/useToDoList";
import {useAddToDo} from "./composition/useAddToDo";
import {useFilterToDoList} from "./composition/useFilterToDoList";
import {useEditToDoList} from "./composition/useEditToDoList";
import {useRemoveToDoList} from "./composition/useRemoveToDoList";

export default {
  name: 'App',
  setup() {
    // 获取代办的列表
    const {todoListRef} = useToDoList();

    // 添加一个代办任务
    const addRes = useAddToDo(todoListRef);

    // 过滤筛选条件

    const filterRes = useFilterToDoList(todoListRef);
    // 修改任务列表
    const editRes = useEditToDoList(todoListRef);

    // 删除任务列表
    const removeRes = useRemoveToDoList(todoListRef);
    return {
      ...addRes,
      ...filterRes,
      ...editRes,
      ...removeRes
    }

  }
}
</script>
