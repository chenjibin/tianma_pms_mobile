<template>
    <div id="in-question-page">
        <mu-dialog :open="alertFlag" title="提示">
            {{alertText}}
            <mu-flat-button label="确定" slot="actions" primary @click="$router.replace({name: 'main'})" />
        </mu-dialog>
        <mu-dialog :open="comfirmSubmitFlag" title="提示">
            {{comfirmSubmitText}}
            <mu-flat-button slot="actions" @click="comfirmSubmitFlag = false" primary label="取消" />
            <mu-flat-button slot="actions" @click="_submitExam" primary label="立即提交" />
        </mu-dialog>
        <h2 style="margin-bottom: 16px;padding:8px">{{$route.params.title}}</h2>
        <mu-paper
            class="fs-list-item"
            :zDepth="1"
            v-for="(item,index) in questionList"
            :key="index">
            <p class="exam-name">
                <mu-badge :content="index + 1 + ''" secondary />
                <span style="margin-left: 8px">{{item.name}}</span>
            </p>
            <mu-flexbox justify="space-between" orient="vertical" class="fs-radio-group choose" v-if="item.type === 1">
                <mu-flexbox-item v-for="option in item.optionlist" class="fs-choose-item" :key="'option' + option.id">
                    <mu-radio
                        :label="option.content ? option.optionnum + '.' +option.content : option.optionnum" :name="'radio-' + item.id"
                        :nativeValue="option.optionnum"
                        v-model="item.answerNew"
                        class="fs-radio"/>
                </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox justify="space-between" class="fs-radio-group" v-if="item.type === 5">
                <mu-flexbox-item>
                    <mu-text-field
                        label="请输入问答题答案"
                        @paste.native.prevent
                        v-model="item.answerNew"
                        multiLine :rows="3" :rowsMax="6"
                        labelFloat fullWidth />
                </mu-flexbox-item>
            </mu-flexbox>
        </mu-paper>
        <mu-raised-button
            label="提交问卷" class="submit-btn"
            @click="_confirmSubmitExam"
            fullWidth secondary/>
    </div>
</template>
<style lang="less" scoped>
    #in-question-page {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        .submit-btn {
            height: 50px;
            line-height: 50px;
        }
        .fs-list-item {
            width: 95%;
            padding: 8px;
            margin: 10px auto 20px auto;
            font-size: 0;
            .head {
                margin-bottom: 10px;
                font-size: 16px;
                .exam-type {
                    display: inline-block;
                    line-height: 28px;
                    vertical-align: top;
                }
            }
            .exam-name {
                display: flex;
                align-items: baseline;
                padding: 8px 0;
                font-size: 16px;
            }
            .fs-radio-group {
                padding: 10px 0;
                margin-top: 10px;
                text-align: center;
                &.choose {
                    text-align: left;
                    .fs-choose-item {
                        font-size: 16px;
                    }
                }
            }
        }
    }
</style>
<script>
    export default {
        name: 'questionAnswer',
        data() {
            return {
                alertText: '',
                alertFlag: false,
                comfirmSubmitFlag: false,
                comfirmSubmitText: '',
                questionList: []
            }
        },
        created() {
            this._getQuestionList()
        },
        methods: {
            _getQuestionList() {
                let params = this.$route.params
                console.log(params)
                this.$http.post('/questionnairepaper/editPaper', params).then((res) => {
                    res.questionList.forEach((item) => {
                        if (item.type === 2) item.answerNew = []
                        else item.answerNew = ''
                    })
                    this.questionList = res.questionList
                })
            },
            _confirmSubmitExam() {
                let flag = true
                let arr = []
                this.questionList.forEach((item, index) => {
                    if (item.answerNew === null || item.answerNew.length === 0) {
                        flag = false
                        let ti = '第' + (index + 1) + '题'
                        arr = [...arr, ti]
                    }
                })
                if (!flag) {
                    this.comfirmSubmitText = '您还有' + arr.join('问卷内容') + '还未作答,是否提交问卷？'
                } else {
                    this.comfirmSubmitText = '恭喜您完成全部,是否立即提交？'
                }
                this.comfirmSubmitFlag = true
            },
            _submitExam() {
                let sendData = {
                    id: this.$route.params.id,
                    answer: [],
                    totalscore: 0,
                    opeartetype: 1
                }
                this.questionList.forEach((item) => {
                    let obj = {}
                    obj.id = item.id
                    obj.type = item.type
                    if (item.type === 1) {
                        obj.score = +item.optionlist.filter(x => x.optionnum === item.answerNew)[0].score;
                        sendData.totalscore += obj.score
                    }
                    obj.answer = (item.type === 2 && typeof item.answerNew === 'object') ? item.answerNew.sort().join('') : item.answerNew
                    sendData.answer = [...sendData.answer, obj]
                })
                sendData.answer = JSON.stringify(sendData.answer)
                this.$http.post('/train/train_signin_evaluate', sendData).then((resp) => {
                    if (resp.success) {
                        this.comfirmSubmitFlag = false;
                        this.alertText = '问卷提交成功!';
                        this.alertFlag = true;
                    }
                })
            }
        },
        components: {}
    }
</script>
