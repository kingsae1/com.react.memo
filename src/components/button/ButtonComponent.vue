<template>
    <button v-bind:type=type @click.left="onSubmit">{{bName}}</button>
</template>

<script>
    export default {
        name: "ButtonComponent",
        props: [
            'bName',
            'mSubmit',
            'type'
        ],
        data () {
            return {
                onSubmit: undefined
            }
        },
        mounted() {
            this.onSubmit = () => {
                this.mSubmit();
            };
        }
    }
</script>

<style scoped>
    button[type='submit'] {
        text-decoration: none;
        color: #fff;
        background-color: #494949;
        text-align: center;
        letter-spacing: .5px;
        transition: .2s ease-out;
        cursor: pointer;
        width: 130px;
        height: 30px;
        margin-bottom: 10px;
    }

    button[type='button'] {
        visibility: hidden;
        font-family: 'Material Icons';
        text-decoration: none;
        font-size: 20px;
        color: #fff;
        background-color: transparent;
        border: transparent;
        text-align: center;
        letter-spacing: .5px;
        transition: .2s ease-out;
        cursor: pointer;
        width: 40px;
        height: 25px;
        margin: auto 2px;
    }
</style>
