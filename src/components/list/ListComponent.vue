<template>
    <li v-bind:id=listId v-bind:class=listClass v-if='listData'>
        <div v-bind:id=itemId v-if="type==='label'">{{itemContent}}</div>
        <div v-bind:id=itemId v-else>
            <input type="checkbox">
            <div id="top" class="textMemo">
                <div id="memoTitle">{{itemContent.title}}</div>
                <div id="memoDate">{{itemContent.date}}</div>
            </div>
            <div id="memo" class="textMemo">
                {{itemContent.content}}
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: 'ListComponent',
        props: ['val', 'id', 'type'],
        data() {
            return {
                item: this.val
            }
        },
        computed: {
            listData() {
                return this.val;
            },
            listId() {
                return 'list_' + this.id;
            },
            itemId() {
                return 'item_' + this.id;
            },
            listClass() {
                if (this.$store.state.labelIndex === this.id) {
                    return 'selected'
                } else {
                    return 'notSelect'
                }
            },
            itemContent() {
                if (this.type === 'label') {
                    // Type Label
                    return this.item.title + " (" + this.item.memos.length + ")";
                } else {
                    // Type Memo
                    return {
                        title: this.item.title || "제목",
                        date: this.$util.dateFormat(this.item.updatedAt || Date.now()),
                        content: this.item.content || "내용"
                    }
                }
            }
        }
    }
</script>

<style scoped>
    li {
        border-bottom: 1px solid #ddd;
    }

    .selected {
        background-color: bisque;
    }

    .notSelect {
        background-color: white;
    }

    input {
        float: left;
        margin: 40px 5px
    }

    #top {
        width: 85%;
        height: 45px;
    }

    .textMemo {
        float: right;
        text-align: left;
        width: 85%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    #top #memoTitle {
        text-align: left;
        float: left;
        font-weight: bold;
    }

    #top #memoDate {
        text-align: left;
        float: right;
        font-size: 12px;
    }
</style>
