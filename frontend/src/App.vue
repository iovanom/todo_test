<template>
    <b-container id="app">
        <b-row>
            <b-col>
            
                <h1>{{ title }}</h1>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-alert
                    v-bind:show="showErrorAlert"
                    dismissible
                    variant="danger"
                    v-on:dismissed="showErrorAlert=0"
                    >{{ errorAlertMessage }}</b-alert>
            </b-col>
        </b-row>

        <b-row>
            <b-col cols="10">
                <b-form-input type="text" v-model="newTodoName" placeholder="Enter a new TODO"></b-form-input>
            </b-col>
            <b-col class="text-right">
                <b-button v-on:click="addNewTodo">Add</b-button>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-list-group>
                    <TodoItem 
                        v-for="(todo, index) in todos"
                        v-bind:key="todo.id"
                        v-bind:title="todo.name"
                        v-bind:id="todo.id"
                        v-on:remove="remove(index)"
                        v-on:update="update"
                        v-on:error="showError"
                        ></TodoItem>
                </b-list-group>
            </b-col>

        </b-row>

        <b-modal id='modal' v-on:ok="yes" v-on:cancel="no">
            <div class="d-block">Are you sure you want to delete this item?</div>
        </b-modal>
    </b-container>
</template>

<script>
import TodoItem from './components/TodoItem.vue';
import taskApi from './taskApi';

export default {
    name: 'app',
    components: {
        TodoItem,
    },
    data: function() {
        return { 
            title: 'Todos',
            todos: [],
            newTodoName: '',
            errorAlertMessage: '',
            showErrorAlert: 0,
            itemToDelete: null
        };
    },
    created: function() {
        console.log("Component App is created");
        taskApi.getAllTasks()
            .then(result => {
                this.todos = result.data;
            }).catch(err => {
                this.showError(err);
            });
    },
    methods: {
        remove: function(i) {
            this.itemToDelete = i;
            this.$root.$emit('bv::show::modal', 'modal');
        },
        addNewTodo: function() {
            if (this.newTodoName) {
                let name = this.newTodoName;
                this.newTodoName = '';

                if (!this.isValid(name)) {
                    this.showError(`The todo ${name} exist.`);
                    return;
                }

                // create a new todo element
                taskApi.addTask(name)
                    .then(result => {
                        console.log(`add new todo ${result.data.id}: ${result.data.name}`);
                        this.todos.push(result.data);
                    }).catch(err => {
                        this.showError(err);
                    });
            }
        },
        isValid: function(name) {
            // Check if we have an element with this name
            let res = this.todos.findIndex(el => {
                return el.name == name;
            });
            if (res != -1) {
                // we have an todo with this name
                return false;
            }
            return true;
        },
        update: function(newTodo) {
            console.log(`Update todo ${newTodo.newName}`);
            let fIndex = this.todos.findIndex(el => {
                return el.id == newTodo.id;
            });

            if (!this.isValid(newTodo.newName)) {
                this.showError(`The todo ${newTodo.newName} exist.`);
            } else if (fIndex != -1) {
                taskApi.updateTask(newTodo.id, newTodo.newName)
                    .then(result => {
                        this.$set(this.todos, fIndex, result.data);
                    }).catch(err => {
                        this.showError(err);
                    });
            }

        },
        showError: function(message) {
            console.log(`Show error ${message}`);
            this.showErrorAlert = 3;
            this.errorAlertMessage = message;
        },

        yes: function() {
            if (this.itemToDelete != null) {
                let task = this.todos[this.itemToDelete];
                taskApi.deleteTask(task.id)
                    .then(result => {
                        this.todos.splice(this.itemToDelete, 1);
                        this.itemToDelete = null
                    }).catch(err => {
                        this.showErrorAlert(err);
                    });
            }
        },

        no: function() {
            this.itemToDelete = null
        }
    },
    watch: {
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app > .row {
    margin-bottom: 15px;
}
</style>
