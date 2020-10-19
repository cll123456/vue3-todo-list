import { ref, watchEffect } from 'vue'
import * as storage from './../utils/localStorage'

/**
 * 获取代办的列表
 * @returns {*|Ref<UnwrapRef<*[]>>}
 */
export function useToDoList(){
    const todoListRef = ref(storage.getData());
    watchEffect(() => {
        storage.saveData(todoListRef.value);
    })

    return {
        todoListRef
    };
}
