<template>
    <div id='memoListView' class='view'>
        <ul @click="onClickMemoList">
            <li id='title'>
                <div id="text">{{title}}</div>
                <ButtonComponent bName="edit" type="button"></ButtonComponent>
                <ButtonComponent bName="delete" type="button"></ButtonComponent>
            </li>
            <ListComponent v-for='(item, index) in memoList' :val='item' :id='index'
                           v-bind:key='item.name'></ListComponent>
            <CircleComponent :mExec="onClickAddButton"></CircleComponent>
        </ul>
    </div>
</template>

<script>
    import ListComponent from '../components/list/ListComponent';
    import ButtonComponent from '../components/button/ButtonComponent';
    import CircleComponent from '../components/button/CircleComponent';

    export default {
        name: 'LabelMemoListView',
        components: {
            ListComponent,
            CircleComponent,
            ButtonComponent
        },
        props: ['curList'],
        computed: {
            title() {
                return this.curList.title;
            },
            memoList() {
                return this.$store.state.labelList[this.$store.state.labelIndex].memos;
            }
        },
        methods: {
            onClickMemoList(evt) {
                // Event Delegation 기법
                evt.path.forEach((tag)=> {
                    const targetId = String(tag.id) || '';
                    if (targetId.indexOf('item_') !== -1) {
                        const tempArr = targetId.split('_');
                        this.$store.dispatch('changeMemoIndex', tempArr[1]);
                        this.$store.dispatch('changeMemoMode', 'read');
                        this.$store.dispatch('toggleShowForm', false);
                    }
                });
            },
            onClickAddButton() {

            }
        }
    }
</script>

<style scoped>
    #memoListView {
        width: 20%;
        min-width: 250px;
    }

    #memoListView #title #text {
        width: 58%;
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
    }

    #memoListView #title:hover button {
        visibility: visible;
    }
</style>
