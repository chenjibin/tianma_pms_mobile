<template>
  <div id="in-exam-page">
    <div class="fs-list-wrapper">
      <div class="test-paper-info">
        <h2 class="paper-name">{{paperInfo.name}}</h2>
        <p>
          <span>用时:</span>
          <span>{{paperInfo.costTime}}分钟</span>
          <span style="margin-left: 20px;">得分:</span>
          <span>{{paperInfo.getScore}}</span>
        </p>
      </div>
      <mu-paper
        class="fs-list-item"
        :zDepth="1"
        v-for="item,index in questionList"
        :key="index">
          <mu-flexbox justify="space-between" class="head">
            <mu-flexbox-item>
              <mu-badge :content="index + 1 + ''" secondary />
              <span class="exam-type">{{item.type | _returnTypeName}}</span>
            </mu-flexbox-item>
            <mu-flexbox-item>
              <span>得{{item.scorenew}}分</span>
            </mu-flexbox-item>
          </mu-flexbox>
          <mu-divider />
          <p class="exam-name">{{item.name}}</p>
          <img :src="item.questionpic | _returnPicUrl" v-if="!!item.questionpic" class="exam-pic"/>
          <mu-flexbox justify="space-between" orient="vertical" class="fs-radio-group choose" v-if="item.type === 1 || item.type === 2">
            <mu-flexbox-item v-for="option in item.optionList" class="fs-choose-item" :key="'option' + option.id">
              <div>
                <span>{{option.optionnum}}.</span>
                <span>{{option.content}}</span>
              </div>
              <img :src="option.optionpic | _returnPicUrl"  v-if="!!option.optionpic"/>
            </mu-flexbox-item>
          </mu-flexbox>
          <div class="answer-block">
            <span>我的答案:</span>
            <span>{{item.answernew}}</span>
          </div>
          <div class="answer-block">
            <span>正确答案:</span>
            <span>{{item.answer}}</span>
          </div>
      </mu-paper>
    </div>
    <back-btn></back-btn>
  </div>
</template>

<style lang="less" scoped>
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
    background-color: rgba(0,0,0,0.5);
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
      .answer-block {
        margin-top: 10px;
        font-size: 16px;
      }
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
            display: flex;
            flex-direction: column;
            align-items: left;
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
import backBtn from '@components/backBtn'
export default {
  name: 'a',
  data () {
    return {
      paperInfo: {
        name: null,
        getScore: null,
        costTime: null
      },
      questionList: []
    }
  },
  watch: {
    'submitTime': function(val) {
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
        case 1: name = '单选题'
        break
        case 2: name = '多选题'
        break
        case 3: name = '判断题'
        break
        case 4: name = '填空题'
        break
        case 5: name = '问答题'
        break
      }
      return name
    },
    _returnPicUrl(val) {
      // let host = 'http://192.168.18.182:8080'
      // let pic = val.replace('..', '')
      // return host + pic
      return val
    }
  },
  created() {
    this._getExamInfo()
  },
  methods: {
    _getExamInfo() {
      let params = this.$router.currentRoute.query
      this.$http.post('/examtest/queryLookTest', params).then((res) => {
        console.log(res)
        this.paperInfo.name = res.data.test.name
        this.paperInfo.getScore = res.data.test.score
        this.paperInfo.costTime = res.data.test.totletime
        this.questionList = res.data.questionList
      })
    },
    _returnAnswer(answer, type) {
      if (type === 3) answer = +answer === 1 ? '正确' : '错误'
      return answer
    }
  },
  components: {
    backBtn
  }
}
</script>
