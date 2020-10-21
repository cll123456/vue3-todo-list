// 添加一个新的任务
import { ref } from 'vue';
import * as util from './../utils/localStorage'

/**
 * 添加一个代办任务
 * @param todoList
 * @returns {{todoListRef: *, inputValueRef: Ref<UnwrapRef<string>>}}
 */
export function useAddToDo(todoList){
    const inputValueRef = ref('');
    // 添加代办
    const addTodo = () => {
        if(!inputValueRef.value){
            alert('请输入todo，再进行添加');
            return ;
        }
        const addObj = {
            id: util.generateID(),
            title: inputValueRef.value,
            completed: false
        }

        todoList.value.push(addObj);
        inputValueRef.value = '';
    }

    return {
        inputValueRef,
        todoListRef: todoList,
        addTodo
    }
}
