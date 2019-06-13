<template>
    <div id='listView' class='view'>
        <ul @click.capture="onClickList">
            <li id='title'>전체 메모 ({{total}})</li>
            <ListComponent v-for='(item, index) in list' :val='item' v-bind:key='item.name' :id='index'
                           type="label"></ListComponent>
            <AddButtonComponent :mToggle='onToggleShowForm' :mSubmit='onClickSubmit' key="listAdd"></AddButtonComponent>
        </ul>
    </div>
</template>

<script>
    import ListComponent from '../components/list/ListComponent';
    import AddButtonComponent from '../components/button/AddButtonComponent';

    export default {
        name: 'LabelListView',
        components: {
            ListComponent,
            AddButtonComponent
        },
        props: ['list', 'total'],
        created() {
            this.getLabels(true);
        },
        methods: {
            getLabels(populate) {
                this.$store.dispatch('getLabelList', populate)
            },
            addLabel(title) {
                this.$store.dispatch('addLabel', {
                    title: title,
                    content: ''
                });
            },
            onToggleShowForm(forceState) {
                if (typeof forceState === 'boolean') {
                    this.$store.dispatch('toggleShowForm', forceState);
                } else {
                    this.$store.dispatch('toggleShowForm');
                }
            },
            onClickSubmit(title) {
                this.addLabel(title);
                this.onToggleShowForm(false);
            },
            onClickList(evt) {
                // Event Delegation 기법
                evt.path.forEach((tag)=> {
                    const targetId = String(evt.target.id) || '';
                    if (targetId.indexOf('_') !== -1) {
                        const tempArr = targetId.split('_');
                        this.$store.dispatch('changeLabelIndex', tempArr[1]);
                        this.onToggleShowForm(false);
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .view {
        width: 150px;
    }

</style>
