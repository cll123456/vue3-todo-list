import { ref, onMounted, onUnmounted, computed } from 'vue'
import { filterData } from "../utils/localStorage";
const hashList = ['all', 'active', 'completed'];
export function useFilterToDoList(todoList){
    // 1. 根据hash值的变化来，改变当前选中的是 all, active, completed
    // 获取hash. #/xxx #xxx, 但是我们需要去除#/ #
   const filterHashRef = ref('all');
   // hash 改变
   const hashChange = () => {
       const currentHash = location.hash.replace(/#\/?/, '');
       // 判断当前的hash 值是不是 all active completed 三个其中一个
       if (hashList.includes(currentHash)){
           filterHashRef.value = currentHash;
       } else {
          location.hash = '';
          filterHashRef.value = 'all';
       }
   }
   // 组件挂载的时候监听hash变化
    onMounted(()=>{
        window.addEventListener('hashchange', hashChange);
    })

    // 组件销毁的时候，remove监听
    onUnmounted(() => {
        window.removeEventListener('hashchange', hashChange);
    });
    // 获取筛选数据
   const filterTodoListRef = computed(() =>{
       return filterData(filterHashRef.value, todoList.value)
   })
    // 筛选还有多少条任务在进行中
    const remainingTodoListRef = computed(() => {
        return filterData('active', todoList.value).length;
    })
    // 筛选有多少条完成的任务列表
    const todoListOfCompleted = computed(() => {
        return filterData('completed', todoList.value).length;
    })

    return{
        filterHashRef,
        filterTodoListRef,
        remainingTodoListRef,
        todoListOfCompleted
    }
}
