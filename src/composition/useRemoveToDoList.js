// 删除对应的任务列表
export function useRemoveToDoList(todoListRef){
    // 删除单个
    const removeOne = (todo) => {
        todoListRef.value.splice(todoListRef.value.indexOf(todo), 1);
    }
    // 删除全部完成的
    const removeAllCompleted = () => {
        todoListRef.value = todoListRef.value.filter(td => !td.completed);
    }
    return{
        removeOne,
        removeAllCompleted
    }
}
