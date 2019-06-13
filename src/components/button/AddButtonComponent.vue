<template>
    <div >
        <div class='button' v-show="!$store.state.showForm">
            <CircleComponent :mExec="mToggle"></CircleComponent>
        </div>
        <div class='button' v-show="$store.state.showForm">
            <input type="text" id="newInput" @keyup.esc="mToggle" @keyup.enter="submitData" v-model="inputData">
            <ButtonComponent bName="ADD" :mSubmit="submitData" type="submit"></ButtonComponent>
        </div>
    </div>
</template>

<script>
    import ButtonComponent from './ButtonComponent';
    import CircleComponent from './CircleComponent';

    export default {
        name: "AddButtonComponent",
        components: {
            ButtonComponent,
            CircleComponent
        },
        props: [
            'mToggle',
            'mSubmit'
        ],
        mounted() {
            this.submitData = () => {
                this.mSubmit(this.inputData);
            }
        },
        data() {
            return {
                inputData: "",
                submitData: undefined
            }
        }

    }
</script>

<style scoped>
    .button {
        padding: 0;
        margin: 10px 0;
    }

    .button input {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #9e9e9e;
        border-radius: 0;
        outline: none;
        height: 2.5rem;
        width: 85%;
        font-size: 1rem;
        margin: 0 0 10px 0;
        padding: 0;
        box-shadow: none;
        box-sizing: content-box;
        transition: all 0.3s;
    }

    .button input:hover {
        color: #726f70;
    }
</style>
