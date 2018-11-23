<template>
  <div id="my-test-list-page">
    <div class="fs-list-wrapper">
      <mu-paper
        class="fs-list-item"
        :zDepth="1"
        v-for="item,index in testList"
        :key="index">
        <div class="top-area" >
          <p class="content">
            <mu-badge :content="index + 1 + ''" secondary circle />
            <span class="title">{{item.name}}</span>
          </p>
          <mu-flexbox class="op-item">
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">考试时间:</span>
              <span>{{item.starttime}}</span>
            </mu-flexbox-item>
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">考试时长:</span>
              <span>{{item.totletime}}分钟</span>
            </mu-flexbox-item>
          </mu-flexbox>
          <mu-divider />
          <mu-flexbox class="op-item">
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">总分:</span>
              <span>{{item.totlemark}}</span>
            </mu-flexbox-item>
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">出卷人:</span>
              <span>{{item.createbyname}}</span>
            </mu-flexbox-item>
          </mu-flexbox>
        </div>
        <mu-divider />
        <div class="bottom-area">
          <mu-flexbox>
          <mu-raised-button
          label="开始考试"
          @click="_startExam(item.paperid, item.id, item.name)"
          fullWidth
          secondary/>
          </mu-flexbox>
        </div>
      </mu-paper>
    </div>
  <mu-dialog :open="dialog" title="提示">
    <span>确定开始<strong style="margin:0 6px;">{{testTitle}}</strong>的考试么？</span>
    <mu-flat-button slot="actions" @click="dialog = false" primary label="取消"/>
    <mu-flat-button slot="actions" primary @click="_confirmStartExam" label="确定"/>
  </mu-dialog>
    <p style="text-align: center;"
       v-if="showRemind">没有更多啦~~</p>
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
      dialog: false,
      scroller: null,
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
      testTitle: '',
      testList: []
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
      let data = {}
      data.page = 1
      data.pageSize = 1000
      this.$http.post('/examtest/getTestList', data).then((res) => {
        this.testList = res.data
        console.log(this.testList)
      }).catch((error) => {
        console.log(error)
      })
    },
    _confirmStartExam() {
      this.dialog = false
      this.$router.replace({name: 'inExam', query: {id: this.sendData.id, paperId: this.sendData.paperId}})
    },
    _startExam(id, paperId, title) {
      this.sendData.id = id
      this.sendData.paperId = paperId
      this.testTitle = title
      this.dialog = true
    }
  },
  components: {
    backBtn
  }
}
</script>
