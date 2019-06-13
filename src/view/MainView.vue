<template>
    <div id='main'>
        <PopupView v-if="$store.state.showPopup"></PopupView>
        <div id='inner' @click="onClickEvt">
            <LabelListView :list=totalList :total=totalMemoLen></LabelListView>
            <LabelMemoListView v-if="totalList.length>0" :curList=currentLabel></LabelMemoListView>
            <MemoView :data=currentMemo :mode=currentMode></MemoView>
        </div>
    </div>
</template>

<script>
    import LabelListView from './LabelListView'
    import LabelMemoListView from './LabelMemoListView'
    import MemoView from './MemoView';
    import PopupView from './PopupView'

    export default {
        name: 'MainView',
        components: {
            PopupView,
            LabelListView,
            LabelMemoListView,
            MemoView
        },
        computed: {
            totalList() {
                return this.$store.getters.getTotalList;
            },
            currentLabel() {
                return this.$store.getters.getCurrentLabel;
            },
            totalMemoLen() {
                return this.$store.getters.getTotalMemoLength;
            },
            currentMode() {
                return this.$store.getters.getMemoMode;
            },
            currentMemo() {
                return this.$store.getters.getCurrentMemo;
            }
        },
        methods: {
            onClickEvt () {

            }
        }
    }
</script>

<style scoped>
    #main {
        display: inline-flex;
        width: 100%;
    }

    #main #inner {
        margin: 0 auto;
    }

</style>
