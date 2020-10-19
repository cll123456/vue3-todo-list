// 存入值的常量
const TODO_KEY = 'todoKey';

/**
 * 存入数据
 * @param data
 */
export function saveData(data){
    localStorage.setItem(TODO_KEY, JSON.stringify(data));
}

/**
 * 获取数据
 * @returns {any|*[]}
 */
export function getData(){
    return JSON.parse(localStorage.getItem(TODO_KEY)) || [];
}

/**
 * 获取uuid
 * @returns {string}
 */
export function generateID(){
    return Date.now() + Math.random().toString(16).substring(2, 9);
}

/**
 * 过滤数据
 * @param validator
 * @param todoList
 * @returns {*[]}
 */
export function filterData(validator = 'all', todoList = []){
    switch (validator){
        case "all":
            return todoList;
            break;
        case "active":
            return todoList.filter(td => !td.completed);
            break;
        case "completed":
            return todoList.filter(td => td.completed);
            break;
        default:
            throw  Error ('validator is invalidate !')
    }
}
