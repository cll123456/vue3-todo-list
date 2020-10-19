// 修改任务列表
import { ref, computed } from 'vue';
export function useEditToDoList(todoListRef){
    // 当前选中的任务名称
    const hasEditorRef = ref('null');
    // 当前任务名称
    let currentValue = '';
    // 双击弹出修改框
    const editTotoObj = (todo) => {
        hasEditorRef.value = todo;
        currentValue = todo.title;
    };


    // 输入框失去焦点，或者按键盘的enter完成修改
    const confirmEdit = (todo) => {
        hasEditorRef.value = null;
        // 判断当前的title是否为空
        const title = todo.title && todo.title.trim();
        if (title){
            todo.title = title;
        }else {
            // 如果修改的值为空，那么需要删除
            todoListRef.value.splice(todoListRef.value.indexOf(todo), 1);
        }
    }
    // 取消修改
    const cancelEdit = (todo) => {
        todo.title = currentValue;
        hasEditorRef.value = null;

    }

    // 是否全部完成
    const hasDoneCompletedRef = computed({
        set(checked){
            todoListRef.value.forEach( td => {
                td.completed = checked;
            })
        },
        get(){
            return todoListRef.value.filter(td => !td.completed).length === 0;
        }
    })

    return{
        hasEditorRef,
        editTotoObj,
        confirmEdit,
        cancelEdit,
        hasDoneCompletedRef
    }
}
