<template>
    <div id="popupView">
        <div id="popup">
            <div id="popTitle">
                {{title}}
            </div>
            <div id="popMessage">
                {{message}}
            </div>
            <ButtonComponent bName="확인" type="submit" :mSubmit="onOk"></ButtonComponent>
            <ButtonComponent bName="닫기" type="submit" :mSubmit="onCancel"></ButtonComponent>
        </div>
    </div>
</template>

<script>
    import ButtonComponent from '../components/button/ButtonComponent';

    export default {
        name: "PopupView",
        data() {
            return {
                title : this.$store.state.popupData.title,
                message : this.$store.state.popupData.message,
                callback : this.$store.state.popupData.callback
            }
        },
        components: {
            ButtonComponent
        },
        methods: {
            onOk() {
                if (this.$store.state.popupData.callback) {
                    this.$store.state.popupData.callback();
                }
                this.$store.dispatch('closePopup');
            },
            onCancel() {
                this.$store.dispatch('closePopup');
            }
        }
    }
</script>

<style scoped>
    #popupView {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }

    #popup {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 16px;
        width: 400px;
        height: 200px;
        border-radius: 4px;
        background-color: white;
        box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.3);
        margin: -100px 0 0 -200px;
    }

    #popup #popTitle {
        margin: 20px 10px;
        font-size: 20px;
        font-weight: bold;
    }

    #popup #popMessage {
        margin: 0 10px;
        font-size:15px;
        height: 80px;
    }

    #popup button {
        position: relative;
        bottom: 10px;
        margin: 10px auto;
    }
</style>
