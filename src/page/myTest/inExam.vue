<template>
    <div id="in-exam-page" @contextmenu.prevent>
        <mu-dialog :open="alertFlag" title="提示">
            {{alertText}}
            <mu-flat-button label="结束本场考试" slot="actions" primary @click="_overExam"/>
        </mu-dialog>
        <mu-dialog :open="comfirmSubmitFlag" title="提示">
            {{comfirmSubmitText}}
            <mu-flat-button slot="actions" @click="comfirmSubmitFlag = false" primary label="继续做题"/>
            <mu-flat-button slot="actions" @click="_submitExam" primary label="立即交卷"/>
        </mu-dialog>
        <div class="timer-block">
            <p class="time-title">考试剩余</p>
            <div class="time">
                <span>{{minTime}}</span>
                <span>:</span>
                <span>{{secTime}}</span>
            </div>
        </div>
        <div class="fs-list-wrapper">
            <div class="test-paper-info">
                <h2 class="paper-name">{{paperInfo.name}}</h2>
                <p>
                    <span>总时长:</span>
                    <span>{{paperInfo.totalTime}}分钟</span>
                    <span style="margin-left: 20px;">满分:</span>
                    <span>{{paperInfo.fullMark}}</span>
                </p>
            </div>
            <mu-paper
                class="fs-list-item"
                :zDepth="1"
                v-for="item,index in questionList"
                :key="index">
                <mu-flexbox justify="space-between" class="head">
                    <mu-flexbox-item>
                        <mu-badge :content="index + 1 + ''" secondary/>
                        <span class="exam-type">{{item.type | _returnTypeName}}</span>
                    </mu-flexbox-item>
                    <mu-flexbox-item>
                        <span>{{item.questionmark}}分</span>
                    </mu-flexbox-item>
                </mu-flexbox>
                <mu-divider/>
                <p class="exam-name">{{item.name}}</p>
                <img :src="item.questionpic | _returnPicUrl" v-if="!!item.questionpic" class="exam-pic"/>
                <mu-flexbox justify="space-between" orient="vertical" class="fs-radio-group choose"
                            v-if="item.type === 1">
                    <mu-flexbox-item v-for="option in item.optionlist" class="fs-choose-item"
                                     :key="'option' + option.id">
                        <mu-radio
                            :label="option.content ? option.optionnum + '.' +option.content : option.optionnum"
                            :name="'radio-' + item.id"
                            :nativeValue="option.optionnum"
                            v-model="item.answerNew"
                            class="fs-radio"/>
                        <img :src="option.optionPic | _returnPicUrl" v-if="!!option.optionPic"/>
                    </mu-flexbox-item>
                </mu-flexbox>
                <mu-flexbox justify="space-between" orient="vertical" class="fs-radio-group choose"
                            v-if="item.type === 2">
                    <mu-flexbox-item v-for="option in item.optionlist" :key="'option' + option.id"
                                     class="fs-choose-item">
                        <mu-checkbox
                            :label="option.content ? option.optionnum + '.' +option.content : option.optionnum"
                            :name="'checkbox-' + item.id"
                            :nativeValue="option.optionnum"
                            v-model="item.answerNew"
                            class="fs-radio"/>
                        <img :src="option.optionpic | _returnPicUrl" v-if="!!option.optionpic"/>
                    </mu-flexbox-item>
                </mu-flexbox>
                <mu-flexbox justify="space-between" class="fs-radio-group" v-if="item.type === 3">
                    <mu-flexbox-item>
                        <mu-radio
                            label="正确" :name="'radio-' + item.id"
                            nativeValue="正确"
                            v-model="item.answerNew"
                            class="fs-radio"/>
                    </mu-flexbox-item>
                    <mu-flexbox-item>
                        <mu-radio
                            label="错误" :name="'radio-' + item.id"
                            nativeValue="错误"
                            v-model="item.answerNew"
                            class="fs-radio"/>
                    </mu-flexbox-item>
                </mu-flexbox>
                <mu-flexbox justify="space-between" class="fs-radio-group" v-if="item.type === 4">
                    <mu-flexbox-item>
                        <mu-text-field
                            label="请输入填空题答案"
                            @paste.native.prevent
                            v-model="item.answerNew"
                            multiLine :rows="3" :rowsMax="6"
                            labelFloat fullWidth/>
                    </mu-flexbox-item>
                </mu-flexbox>
                <mu-flexbox justify="space-between" class="fs-radio-group" v-if="item.type === 5">
                    <mu-flexbox-item>
                        <mu-text-field
                            label="请输入问答题答案"
                            @paste.native.prevent
                            v-model="item.answerNew"
                            multiLine :rows="3" :rowsMax="6"
                            labelFloat fullWidth/>
                    </mu-flexbox-item>
                </mu-flexbox>
            </mu-paper>
            <mu-raised-button
                label="交卷" class="submit-btn"
                @click="_confirmSubmitExam"
                fullWidth secondary/>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .mu-radio {
        height: auto;
        line-height: 1.5;
        .mu-radio-wrapper {
            height: auto;
            line-height: 1.5;
        }
    }
    #in-exam-page {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        .timer-block {
            position: fixed;
            right: 0;
            top: 75px;
            padding: 10px;
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;
            font-weight: 700;
            .time {
                font-size: 16px;
            }
            .time-title {
                font-size: 12px;
            }
        }
        .fs-list-wrapper {
            .test-paper-info {
                text-align: center;
                .paper-name {
                    font-size: 18px;
                }
            }
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
                        img {
                            max-width: 100%;
                            height: auto;
                            margin-top: 8px;
                        }
                    }
                }
            }
            .exam-pic {
                max-width: 100%;
            }
        }
    }
</style>

<script>
    export default {
        data() {
            return {
                alertFlag: false,
                alertText: '',
                comfirmSubmitFlag: false,
                comfirmSubmitText: '',
                paperInfo: {
                    name: null,
                    fullMark: null,
                    totalTime: null
                },
                minTime: 0,
                secTime: 0,
                submitTime: null,
                questionList: []
            }
        },
        watch: {
            'submitTime': function (val) {
                let min = Math.floor(val / 60)
                let sec = val % 60
                this.minTime = (min + '').length === 1 ? ('0' + min) : min
                this.secTime = (sec + '').length === 1 ? ('0' + sec) : sec
            }
        },
        filters: {
            _returnTypeName(val) {
                let name = ''
                switch (val) {
                    case 1:
                        name = '单选题'
                        break
                    case 2:
                        name = '多选题'
                        break
                    case 3:
                        name = '判断题'
                        break
                    case 4:
                        name = '填空题'
                        break
                    case 5:
                        name = '问答题'
                        break
                }
                return name
            },
            _returnPicUrl(val) {
                return '/oa' + val
            }
        },
        created() {
            this._getExamInfo()
            this._submitStartTime()
        },
        methods: {
            checkOnchange(item, e) {
                console.log(item)
                if (!e.data) {
                    item.answerNew = ''
                }
                console.log(e)
            },
            onPaste(e) {
                console.log(e)
            },
            _submitStartTime() {
                this.$http.post('/examtest/startTime', {id: this.$router.currentRoute.query.paperId}).then((res) => {
                })
            },
            _submitTimeRun() {
                this.submitTime = this.paperInfo.totalTime * 60
                this.timer = setInterval(() => {
                    this.submitTime--
                    if (this.submitTime <= 0) {
                        this._submitExam()
                        this.alertText = '考试时间到啦,已自动交卷O(∩_∩)O~'
                        this.alertFlag = true
                    }
                }, 1000)
            },
            _getExamInfo() {
                let params = this.$router.currentRoute.query
                this.$http.post('/exampaper/editPaper', params).then((res) => {
                    this.paperInfo.name = res.testPaper.name
                    this.paperInfo.fullMark = res.testPaper.totlemark
                    this.paperInfo.totalTime = res.testPaper.totletime
                    res.questionList.forEach((item) => {
                        if (item.type === 2) item.answerNew = []
                        else item.answerNew = ''
                    })
                    this.questionList = res.questionList
                    this._submitTimeRun()
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
                    this.comfirmSubmitText = '您还有' + arr.join(',') + '还未作答,是否提交试卷？'
                } else {
                    this.comfirmSubmitText = '恭喜您完成全部试题,是否立即交卷？'
                }
                this.comfirmSubmitFlag = true
            },
            _submitExam() {
                clearInterval(this.timer)
                let sendData = {
                    pid: this.$router.currentRoute.query.paperId,
                    paperName: this.paperInfo.name,
                    answerList: []
                }
                this.questionList.forEach((item) => {
                    let obj = {}
                    obj.id = item.id
                    obj.type = item.type
                    obj.answer = (item.type === 2 && typeof item.answerNew === 'object') ? item.answerNew.sort().join('') : item.answerNew
                    sendData.answerList = [...sendData.answerList, obj]
                })
                sendData.answerList = JSON.stringify(sendData.answerList)
                this.$http.post('/examtest/submitAnswerApp', sendData).then((resp) => {
                    if (resp.success) {
                        this.alertText = '交卷成功!'
                        this.alertFlag = true
                    }
                })
            },
            _overExam() {
                this.$router.replace({name: 'myTest'})
            }
        }
    }
</script>
