<template>
    <b-list-group-item>
        <b-row v-if="onEdit">
            <b-col cols="8">
                <b-form-input type="text" v-model="newName" placeholder="Enter a new Name">
                </b-form-input>
            </b-col>
            <b-col>
                <b-button v-on:click="save">Save</b-button>
                <b-button v-on:click="cancel">Cancel</b-button>
            </b-col>
        </b-row>
        <b-row v-else>
            <b-col cols="8">
                {{ title }}
            </b-col>
            <b-col class="text-right">
                <b-button v-on:click="$emit('remove')">Delete</b-button>
                <b-button v-on:click="edit">Edit</b-button>
            </b-col>
        </b-row>
    </b-list-group-item>
</template>

<script>

export default {
    name: 'TodoItem',
    props: [ 'title' , 'id' ],
    data: function() {
        return {
            onEdit: false,
            newName: this.title,
        };
    },
    methods: {
        edit: function() {
            this.newName = this.title;
            this.onEdit = true;
        },
        save: function() {
            this.onEdit = false;
            this.$emit('update', {'id': this.id, 'newName': this.newName});
        },
        cancel: function() {
            this.onEdit = false;
            this.newName = this.title;
        }
    }
}

</script>

<style>

</style>
