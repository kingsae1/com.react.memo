/**
 * Created by kingsae1004@gmail.com on 01/06/2019
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

const url = 'http://localhost:3000/';

export const store = new Vuex.Store({
    state: {
        labelList: [],
        label: {},
        memoData: {},
        showForm: false,
        labelIndex: 0,
        memoIndex: 0,
        mode: 'write', // Write , Read, Modify
        showPopup: false,
        popupData: {
            title: '',
            message: '',
            callback: undefined
        }
    },
    getters: {
        // State 조작하여 서비스로직을 입힌 State리턴
        // Computed에서 관리
        getCurrentTitle(state) {
            try {
                return state.labelList[state.labelIndex].title;
            } catch (e) {
                return '';
            }
        },
        getCurrentMemos(state) {
            try {
                return state.labelList[state.labelIndex].memos;
            } catch (e) {
                return [];
            }
        },
        getCurrentMemo(state) {
            try {
                return state.labelList[state.labelIndex].memos[state.memoIndex];
            } catch (e) {
                return {title: '', content: '', updatedAt: ''};
            }
        },
        getCurrentLabel(state) {
            return state.labelList[state.labelIndex];
        },
        getTotalMemoLength(state) {
            let count = 0;
            for (var i = 0; i < state.labelList.length; i++) {
                count += state.labelList[i].memos.length;
            }
            return count;
        },
        getCurrentLabelId(state) {
            return state.labelList[state.labelIndex]._id;
        },
        getTotalList(state) {
            return state.labelList;
        },
        getMemoMode(state) {
            return state.mode;
        }
    },
    mutations: {
        // 인자를 받아 서비스로직 (동기)
        // methods에서 관리 Commit
        getLabelList(state, payload) {
            console.log("[Axios] getLabelList = ", payload);
            state.labelList = payload;
            state.memoData = state.labelList[state.labelIndex].memos[state.memoIndex];

            if (state.memoData) {
                state.mode = 'read';
            } else {
                state.mode = 'write';
            }
        },
        getLabel(state, payload) {
            console.log("[Axios] getLabel = ", payload);
            state.labelList[state.labelIndex] = payload;
        },
        addLabel(state, payload) {
            state.labelList.push(payload);
        },
        updateLabel(state, payload) {
            console.log("[Axios] updateLabel = ", payload);
        },
        createMemo(state, payload) {
            console.log("[Axios] createMemo = ", payload);
            state.memoData = payload;
            return payload;
        },
        addMemo(state, payload) {
            console.log("[Axios] addMemo = ", payload);
            const curData = state.labelList[state.labelIndex];
            return curData.memos.push(payload);
        },
        updateMemo(state, payload) {
            console.log("[Axios] updateMemo = ", payload);
            state.memoData.title = payload.title;
            state.memoData.content = payload.content;
        },
        deleteMemo(state, payload) {
            const curData = state.labelList[state.labelIndex];
            curData.forEach((data, index) => {
                if (data._id === payload._id) {
                    return curData.splice(index, 1);
                }
            })
        },
        toggleShowForm(state, payload) {
            if (payload === undefined) {
                state.showForm = !state.showForm;
            } else {
                state.showForm = payload
            }
        },
        changeLabelIndex(state, payload) {
            state.labelIndex = payload || 0;
            state.memoIndex = 0;
            state.memoData = state.labelList[state.labelIndex].memos[state.memoIndex];

            if (state.memoData) {
                state.mode = 'read';
            } else {
                state.mode = 'write';
            }
        },
        changeMemoIndex(state, payload) {
            state.memoIndex = payload;
            state.memoData = state.labelList[state.labelIndex].memos[state.memoIndex];

            if (state.memoData) {
                state.mode = 'read';
            } else {
                state.mode = 'write';
            }
        },
        changeMemoMode(state, payload) {
            state.mode = payload;
        },
        showPopup(state, payload) {
            state.showPopup = true;
            state.popupData.title = payload.title;
            state.popupData.message = payload.message;
            state.popupData.callback = payload.callback;

            if (state.popupData.callback) {
                state.popupData.callback();
            }
        },
        closePopup(state) {
            state.showPopup = false;
        }
    },
    actions: {
        // 상태인지를 위해 Mutation을 이용
        // 비동기 Dispatch
        getLabelList: function (context, populate, index) {
            // 라벨 리스트 호출
            const callTotalLabelList = () => {
                return new Promise((resolve, reject) => {
                    axios.get(url + 'labels?populate=' + populate)
                        .then((res) => {
                            context.commit('getLabelList', res.data);
                            resolve(res.data);
                        })
                        .catch((e) => {
                            reject(e);
                        });
                })
            };

            return Promise.resolve()
                .then(callTotalLabelList)
                .catch((e) => {
                    console.error(e)
                });
        },
        getLabelData(context, id) {
            return new Promise((resolve, reject) => {
                axios.get(url + 'labels/' + id)
                    .then((res) => {
                        context.commit('getLabel', res.data);
                        resolve(res.data);
                    })
                    .catch((e) => {
                        reject(e);
                    });
            });
        },
        addLabel(context, {title, content}) {
            // 라벨 추가
            if (data.title) {
                axios.post(url + 'labels', {title, content})
                    .then((res) => {
                        return context.commit('addLabel', res.data);
                    })
            } else {
                context.commit('toggleShowForm', false);
            }
        },
        updateLabel(context, id) {
            // 라벨을 업데이트
            axios.put(url + 'labels/' + id)
                .then((res) => {
                    return context.commit('getLabelList', res.data);
                });
        },
        addMemo(context, {title, content, labelId}) {
            // 라벨에서 메모 생성
            const callCreateMemo = () => {
                return new Promise((resolve, reject) => {
                    axios.post(url + 'memos', {title, content})
                        .then((res) => {
                            context.commit('createMemo', res.data);
                            resolve(res.data);
                        })
                        .catch((e) => {
                            reject(e);
                        })
                })
            };

            const callAddLabel = (data) => {
                return new Promise((resolve, reject) => {
                    axios.post(url + 'labels/' + labelId + '/memos', {memoIds: [data._id]})
                        .then((res) => {
                            context.commit('addMemo', res.data);
                            resolve(res.data);
                        })
                        .catch((e) => {
                            reject(e);
                        })
                })
            };

            return Promise.resolve()
                .then(callCreateMemo)
                .then(callAddLabel)
                .catch((e) => {
                    console.error(e);
                })
        },
        deleteMemo(context, id) {
            return axios.delete(url + 'memos/' + id)
                .then((res) => {
                    context.commit('deleteMemo', res.data);
                })
                .catch((e) => {
                    console.error(e);
                });
        },
        updateMemo(context, {id, title, content}) {
            return axios.put(url + 'memos/' + id, {title, content})
                .then((res) => {
                    context.commit('updateMemo', res.data);
                })
                .catch((e) => {
                    console.error(e);
                });
        },
        toggleShowForm(context, forceState) {
            // 라벨리스트 추가버튼 토글
            return context.commit('toggleShowForm', forceState);
        },
        changeLabelIndex(context, id) {
            // 라벨 Index 체인지
            return context.commit('changeLabelIndex', id);
        },
        changeMemoIndex(context, index) {
            // 메모리스트 Index 체인지
            return context.commit('changeMemoIndex', index);
        },
        changeMemoMode(context, mode) {
            return context.commit('changeMemoMode', mode);
        },
        showPopup(context, data) {
            return context.commit('showPopup', data);
        },
        closePopup(context, data) {
            return context.commit('closePopup');
        }
    }
});
