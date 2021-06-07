const fs = require('fs');
const addTask = (title, desc, type) => {
    // b1: Lấy danh sách task 
    const allTasks = fetchTask()
    // b2: Tạo động 1 cái id
    const task = {
        id: Math.round(Math.random() * 10000).toString(),
        title,
        desc,
        type,
    }
    // b3: Tạo đối tượng task 
    // b4: Thêm task vào danh sách
    allTasks.push(task)


    // b5: Lưu lại danh sách vào file
    fs.writeFileSync('task.json', JSON.stringify(allTasks))
}

const deleteTask = (id) => {
    const allTasks = fetchTask()
    const index = allTasks.findIndex(item => item.id == id)

    if(index === -1){
        console.log('id not found');
        return 
    }else{
        allTasks.splice(index, 1)
    }
    fs.writeFileSync("task.json", JSON.stringify(allTasks))

}
const updateTask = (id, title, desc, taskType) => {
    const tasks = fetchTask()
    const index = tasks.findIndex(task => task.id === id)

    tasks[index].title = title
    tasks[index].desc = desc
    tasks[index].type = taskType
    fs.writeFileSync('task.json', JSON.stringify(tasks))
}
const listAllTask = () => {
    const allTasks = fetchTask()
    if (allTasks !== []){
        allTasks.map((task, index)=> {
            console.log(task.title);
        })
    }
}
const listTaskDetail = (id) => {
    const allTasks = fetchTask()
    const index = allTasks.findIndex(task => task.id === id)
    console.log(allTasks[index].desc)

}
const listType = (type) => {
    const allTasks = fetchTask()
    let tasksWithType = allTasks.filter( task => task.type == type)
    tasksWithType.map((item, i ) => {
        console.log(item);
    })
}
const fetchTask = () => {
    try {
        const buffer = fs.readFileSync('task.json');
        console.log(buffer);
        // readFile lên thì sẽ nhận được 1 cái gọi là buffer, có nghĩa là load từ từ 
        //là 1 cái array buffer và nó sẽ đọc từ từ ( cơ chế coi phim hay video trên mạng)
        const taskJSON = buffer // .toString()
        return JSON.parse(taskJSON)
    } catch (error) {
        return []
    }
}

module.exports = {
    addTask,
    deleteTask,
    updateTask,
    listAllTask,
    listTaskDetail,
    listType
}