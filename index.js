// Firebase config
var config = {
    apiKey: "AIzaSyDXTnqM1_gCNui8EW9uAqWof7lpnbGolEc",
    authDomain: "firetodo666.firebaseapp.com",
    databaseURL: "https://firetodo666.firebaseio.com",
    storageBucket: "firetodo666.appspot.com",
};

firebase.initializeApp(config);
var TodosRef = firebase.database().ref('Todolist');
var todoList = new Vue({
    el: '#todolistApp',
    data: {
        todos: [],
        newTodo: '',
        editOption: false,
        tempKey: '',
        warningLabel: '',
        redWarning: false,
    },
    methods: {
        testt() {
            console.log(this.getDate(todo.time))
        },
        inputTyping() {
            this.warningLabel = '';
            this.redWarning = false;
        },
        submitHandler() {
            if (this.newTodo.length == 0
                || this.newTodo.length == ""
                || this.redWarning == "true"
            ) {
                this.warningLabel = 'Todo can not be empty!';
                this.redWarning = true;
                return
            }
            else {
                let newTodoList = {
                    newTodo: this.newTodo, 
                    newTime: firebase.database.ServerValue.TIMESTAMP,
                };
                TodosRef.push(newTodoList)
                this.newTodo = '';
                this.warningLabel = '';
                this.redWarning = false;
            }
        },

        removeHandler(idx) {
            if (this.newTodo.length != 0
                || this.newTodo.length != ""
            ) {
                return
            } else {
                let target = this.todos[idx];
                if (confirm(`Do you want to Del this \n" ${target.newTodo} " ?`)) {
                    TodosRef.child(idx).remove()
                }
            }
        },

        getTime(newTime) {
            if (typeof newTime === 'undefined') return;
            let time = new Date(newTime);
            let year = time.getFullYear();
            let month = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
            let day = time.getDate();
            let week = time.day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            let hour = time.getHours();
            let minute = time.getMinutes();
            return month[time.getMonth()] + "/" + (parseInt(day, 10) < 10 ? '0' + day : day) + "/" + year + "<br> " + hour + ":" + (parseInt(minute, 10) < 10 ? '0' + minute : minute) + "&nbsp;" + week[time.getDay()];
        },
    },

    mounted() {
        TodosRef.on('value', (snapshot) => {
            todoList.todos = snapshot.val();
        })
    },
})