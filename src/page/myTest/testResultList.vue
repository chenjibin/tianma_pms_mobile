<template>
  <div id="my-test-list-page">
    <div class="fs-list-wrapper">
      <mu-paper
        class="fs-list-item"
        :zDepth="1"
        v-for="item,index in testResultList"
        :key="index">
        <div class="top-area" >
          <p class="content">
            <mu-badge :content="index + 1 + ''" secondary circle />
            <span class="title">{{item.name}}</span>
          </p>
          <mu-flexbox class="op-item">
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">考试日期:</span>
              <span>{{item.starttime}}</span>
            </mu-flexbox-item>
          </mu-flexbox>
          <mu-divider />
          <mu-flexbox class="op-item">
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">总成绩:</span>
              <span>{{item.score}}</span>
            </mu-flexbox-item>
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">用时:</span>
              <span>{{item.totletime}}分钟</span>
            </mu-flexbox-item>
          </mu-flexbox>
          <mu-divider />
          <mu-flexbox class="op-item">
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">单选成绩:</span>
              <span>{{item.singlescore}}</span>
            </mu-flexbox-item>
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">多选成绩:</span>
              <span>{{item.multiplescore}}</span>
            </mu-flexbox-item>
          </mu-flexbox>
          <mu-divider />
          <mu-flexbox class="op-item">
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">判断成绩:</span>
              <span>{{item.torfscore}}</span>
            </mu-flexbox-item>
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">填空成绩:</span>
              <span>{{item.fillscore}}</span>
            </mu-flexbox-item>
          </mu-flexbox>
          <mu-divider />
          <mu-flexbox class="op-item">
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">问答成绩:</span>
              <span>{{item.qandascore}}</span>
            </mu-flexbox-item>
          </mu-flexbox>
          <mu-divider />
          <mu-flexbox class="op-item">
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">总人数:</span>
              <span>{{item.sumstu}}</span>
            </mu-flexbox-item>
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">排名:</span>
              <span>{{item.ranking}}</span>
            </mu-flexbox-item>
          </mu-flexbox>
        </div>
        <mu-divider />
        <div class="bottom-area">
          <mu-flexbox>
          <mu-raised-button
          label="查看试卷"
          @click="_checkExam(item.paperid)"
          fullWidth
          secondary/>
          </mu-flexbox>
        </div>
      </mu-paper>
    </div>
    <back-btn></back-btn>
  </div>
</template>

<style lang="less" scoped>
#my-test-list-page {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background-color: #f8f8f8;
  .fs-float-button {
    position: fixed;
    z-index: 100;
    right: 16px;
    bottom: 16px;
  }
  .fs-list-wrapper {
    padding: 16px;
    .fs-list-item {
      padding: 8px;
      .top-area {
        .content {
          margin-bottom: 10px;
          display: flex;
          .title {
            display: inline-block;
            vertical-align: top;
            margin-top: 2px;
            margin-left: 6px;
          }
        }
        .op-item {
          padding: 10px 0;
        }
        time {
          display: inline-block;
          margin-top: 4px;
          color: rgba(0,0,0,0.4);
        }
      }
      .bottom-area {
        margin-top: 8px;
      }
    }
    .fs-list-item:not(:first-child) {
      margin-top: 16px;

    }
  }
}

</style>

<script>
import backBtn from '@components/backBtn'
export default {
  data () {
    return {
      scroller: null,
      loading: false,
      start: null,
      showRemind: false,
      reqFlag: true,
      pageData: {
        total: 0,
        totalPage: null,
        current: 1,
        pageSize: 10
      },
      sendData: {
        id: null,
        paperId: null
      },
      testResultList: []
    }
  },
  created() {
    this._getTestList()
  },
  mounted() {
    this.scroller = this.$el
  },
  methods: {
    _getTestList() {
      if (!this.reqFlag) {
        this.showRemind = true
        return
      }
      let data = {
        page: 1,
        pageSize: 1000
      }
      this.$http.post('/examtest/queryScoreList', data).then((res) => {
        console.log(res)
        this.testResultList = res.data
      }).catch((error) => {
        console.log(error)
      })
    },
    _checkExam(id) {
      console.log(id)
      this.$router.push({name: 'testResult', query: {id: id}})
    }
  },
  components: {
    backBtn
  }
}
</script>
