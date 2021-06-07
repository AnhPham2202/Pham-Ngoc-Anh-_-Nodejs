

/**
 * 
--save: (thông thường là default) cài trong project (cài khi mà cần khi cả khi code xong và user dùng vẫn dùng package) 
-g: cài vào global (ổ C) xài cho tất cả dự án
--save-dev: cài trong project (các package chỉ cần dùng lúc code như các tool test,... )
 * 
 */
const yargs = require('yargs')
const { addTask } = require("./task.js")
const { deleteTask } = require("./task.js")
const { updateTask } = require("./task.js")  
const { listAllTask } = require("./task.js") 
const { listTaskDetail } = require("./task.js")   
const { listType } = require("./task.js") 



// command add
yargs.command({
    command: 'add', // tên command 
    builder: {// data gửi vào khi dùng command
        title: {
            type: "string",
            demandOption: true, // bắt buộc phải nhập title vào
        },
        desc: {
            type: "string",
            demandOption: true
        },
        type: {
            type: "string",
            demandOption: true
        }
    },
    handler: function(args){//hanfhd động của command
        addTask(args.title, args.desc, args.type)
    }
})
// command del
yargs.command({
    command: "del",
    builder: {
        id:{
            type: "string",
        },
    },
    handler: function(args){
        deleteTask(args.id)
    }
})


// command update
yargs.command({
    command: "update",
    builder: {
        id: {
            type: "string",
            demandOption: true
        },
        title:{
            type: "string",
        },
        desc:{
            type: "string",
        },
        type: {
            type: "string",
        }
    },
    handler: function(args){
        updateTask(args.id, args.title, args.desc, args.type);
    }
})

// command view all tasks 
yargs.command({
    command: "list",
    handler: function(){
        listAllTask()
    }
})

// command view tasks detail
yargs.command({
    command: "taskDetail",
    builder: {
        id:{
            type: "string"
        }
    },
    handler: function(args){
        listTaskDetail(args.id)
        }
})


// command view tasks by type
yargs.command({
    command: "listType",
    builder: {
        type: {
            type: "string"
        },
    },
    handler: function(args){
        listType(args.type)    
    }
})

yargs.parse(); //listen user 



