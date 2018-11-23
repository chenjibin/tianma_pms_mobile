<template>
  <div id="my-log-page">
    <div class="fs-list-wrapper">
      <mu-paper
        class="fs-list-item"
        :zDepth="1"
        v-for="item,index in listData"
        v-if="item.type !== 0"
        :key="index">
        <div @click="lookAtContent(item.content)" class="top-area">
          <p class="content">
            <mu-badge :content="getDay(item.date)" secondary circle />
            <span class="title" v-if="[1,5,6].indexOf(item.type) > -1">{{item.content | returnContent}}</span>
            <span v-if="item.type === 4" style="margin-left: 8px;">未写</span>
            <span v-if="item.type === 2" style="margin-left: 8px;color: #dc0707;">补写</span>
            <span v-if="item.type === 3" style="margin-left: 8px;color: rgb(255, 153, 0);">待写</span>
          </p>
          <mu-flexbox class="mt8" v-if="[1,5,6].indexOf(item.type) > -1">
            <mu-flexbox-item class="flex-demo">
              <time>{{item.date}}</time>
            </mu-flexbox-item>
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">类型:</span>
              <span v-html="checkType(item.logType)"></span>
            </mu-flexbox-item>
          </mu-flexbox>
        </div>
        <mu-divider v-if="[1,5,6].indexOf(item.type) > -1"/>
        <div class="bottom-area" v-if="[1,5,6].indexOf(item.type) > -1">
          <mu-flexbox class="mt8">
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">指导状态:</span>
              <span v-html="checkStates(item.type)"></span>
            </mu-flexbox-item>
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">评级结果:</span>
              <span v-html="checkLevel(item.commentResult)"></span>
            </mu-flexbox-item>
          </mu-flexbox>
        </div>
      </mu-paper>
    </div>
    <mu-popup position="bottom" popupClass="fs-popup-bottom" :open="bottomPopup" @close="closePopUp()">
      <mu-appbar title="日志详情">
        <mu-flat-button slot="right" label="关闭" color="white" @click="closePopUp()"/>
      </mu-appbar>
      <mu-content-block class="fs-popup-content">
        <p v-html="htmlContent"></p>
      </mu-content-block>
    </mu-popup>
    <mu-float-button
      icon="border_color"
      @click="editorLog"
      class="fs-float-button"/>
  </div>
</template>

<style lang="less" >
#my-log-page {
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
          display: flex;
          .title {
            display: inline-block;
            vertical-align: top;
            margin-top: 2px;
            margin-left: 6px;
          }
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
.fs-popup-bottom {
  width: 100%;
  .fs-popup-content {
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>

<script>
import moment from 'moment'
const NOW_MONTH = moment().format('YYYY-MM')
export default {
  data() {
    return {
      htmlContent: '',
      bottomPopup: false,
      num: 10,
      loading: false,
      scroller: null,
      pageSize: 15,
      start: 0,
      count: 0,
      totalCount: 0,
      showRemind: false,
      listData: []
    }
  },
  mounted() {
    this.scroller = this.$el
    let data = {
     time: NOW_MONTH
    }
    this.$http.post('/journal/typeList', data).then((res) => {
      if (res.success) {
        this.listData = res.data.reverse()
      }
    })
  },
  filters: {
    returnContent(val) {
      if (val) {
        val = val.replace(/<\/?[^>]*>/g, '')  // 去除HTML tag
        val = val.replace(/[ | ]*\n/g, '\n') // 去除行尾空白
        val = val.replace(/&nbsp;/ig, '') // 去掉&nbsp;
        return val.substring(0, 60) + '...'
      } else {
        return ''
      }
    }
  },
  methods: {
    getDay(date) {
      return date.split('-')[2]
    },
    lookAtContent(content) {
      this.htmlContent = content
      this.bottomPopup = true
    },
    closePopUp() {
      this.bottomPopup = false
    },
    editorLog() {
      this.$router.push('logEditor')
    },
    checkType(type) {
        switch (type) {
          case 0:
            return "<span style='color:#50a14f;'>出勤</span>"
          case 1:
            return "<span style='color:#dc0707;'>休息</span>"
        }
      },
      checkStates(states) {
        if (states === 5 || states === 6) {
          return "<span style='color:green;'>已指导</span>"
        } else {
          return "<span style='color:#dc0707;'>未指导</span>"
        }
      },
      checkLevel(level) {
        switch (level) {
          case 0:
            return "<span style='color:#999;'>未评级</span>"
          case 1:
            return "<span style='color:green;'>优秀</span>"
          case 2:
            return "<span style='color:green;'>合格</span>"
          case 3:
            return "<span style='color:#dc0707;'>不合格</span>"
        }
      }
  }
}
</script>
