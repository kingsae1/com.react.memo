<template>
    <div id='memo' class="view" @click="onClickMemo">
        <ul v-if="mode === 'write' || mode === 'modify'">
            <li id="title">Memo</li>
            <input class='innerInput' type='text' placeholder="제목" v-model="curTitle">
            <textarea class='innerInput' type="text" placeholder="내용">{{message}}</textarea>
            <ButtonComponent v-if="mode==='write'" bName="ADD MEMO" type="submit"
                             :mSubmit="onAddMemo"></ButtonComponent>
            <ButtonComponent v-else bName="MODIFY MEMO" type="submit" :mSubmit="onUpdateMemo"></ButtonComponent>
        </ul>
        <ul v-else>
            <li id="title">Memo</li>
            <li id="memoTop">
                <span id="memoTitle">{{title}}</span>
                <span id="memoDate">메모 수정일 : {{date}}</span>
            </li>
            <div id="memoContent">{{message}}</div>
            <ButtonComponent bName="DELETE MEMO" type="submit" :mSubmit="onDeleteMemo"></ButtonComponent>
        </ul>
    </div>
</template>

<script>
    import ButtonComponent from '../components/button/ButtonComponent';

    export default {
        name: "MemoView",
        components: {
            ButtonComponent
        },
        props: ['mode', 'data'],
        data () {
            return {
                curTitle: this.title || "",
                curMessage: this.message || ""
            }
        },
        methods: {
            onAddMemo() {
                const labelId = this.$store.getters.getCurrentLabelId;
                const memo = {
                    title: this.curTitle,
                    content: this.curMessage,
                    labelId
                };
                this.$store.dispatch('addMemo', memo);
            },
            onClickMemo() {
                if (this.data && this.data.updatedAt) {
                    this.$store.dispatch('changeMemoMode', 'modify');
                } else {
                    this.$store.dispatch('changeMemoMode', 'write');
                }
            },
            onUpdateMemo() {
                if (this.curTitle.length !== 0 && this.curMessage.length !== 0) {
                    this.$store.dispatch('updateMemo', {
                        id: this.data._id,
                        title: this.curTitle,
                        content: this.curMessage
                    })
                }
            },
            onDeleteMemo() {
                const callback = this.$store.dispatch('deleteMemo', this.data._id);
                this.$store.dispatch('showPopup', {
                    title: '경고',
                    message: '메모를 삭제하시겠습니까?',
                    callback () {
                        callback();
                    }
                })
            }
        },
        computed: {
            title() {
                try {
                    return this.data.title;
                } catch (e) {
                    return ''
                }
            },
            message() {
                try {
                    return this.data.content;
                } catch (e) {
                    return ''
                }
            },
            date() {
                try {
                    const updatedAt = this.data.updatedAt;
                    return this.$util.dateFormat(updatedAt);
                } catch (e) {
                    return ''
                }
            }
        }
    }
</script>

<style scoped>
    .view {
        width: 600px;
        min-width: 40%;
    }

    .view input {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #9e9e9e;
        border-radius: 0;
        outline: none;
        height: 1.5rem;
        width: 85%;
        margin: 0 0 10px 0;
        padding: 0;
        box-shadow: none;
        box-sizing: content-box;
        transition: all 0.3s;
        font-size: 20px;
        font-weight: bold;
    }

    .view .innerInput {
        width: 80%;
        padding: 10px;
    }

    .view textarea {
        resize: vertical;
        font-size: 1rem;
        min-height: 400px;
        border: 1px solid gray;
        border-radius: 3px;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.08);
    }

    #memo button {
        float: right;
        margin-right: 3%;
    }

    #memoTop {
        width: 80%;
        height: 40px;
        margin: 0px auto;
    }

    #memoTitle {
        font-size: 20px;
        font-weight: bold;
        float: left;
    }

    #memoDate {
        font-size: 12px;
        float: right;

    }

    #memoContent {
        width: 80%;
        height: 400px;
        margin: 15px auto;
        text-align: left;
    }
</style>
