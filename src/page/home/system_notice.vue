 <template>
   <div id="system-page" class="aa bb cc">
      <div class="fs-list-wrapper">
      <mu-paper
        class="fs-list-item"
        :zDepth="1"
        v-for="item,index in listData"
        :key="index">
        <div @click="lookAtContent(item.content)" class="top-area" >
          <p class="content">
            <mu-badge :content="index + 1 + ''" secondary circle />
            <span class="title">{{item.title}}</span>
          </p>
          <mu-flexbox class="mt8">
            <mu-flexbox-item class="flex-demo">
              <time>{{item.notTime}}</time>
            </mu-flexbox-item>
            <mu-flexbox-item class="flex-demo">
              <span style="color: rgba(0,0,0,0.4);">发布人员:</span>
              <span class="fs-aa" :class="[classa]">{{item.operater}}</span>
            </mu-flexbox-item>
          </mu-flexbox>
        </div>
      </mu-paper>
    </div>
    <p style="text-align: center;"
       v-if="showRemind">没有更多啦~~</p>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="getDateList"/>
    <mu-popup position="bottom" popupClass="fs-popup-bottom" :open="bottomPopup" @close="closePopUp()">
      <mu-appbar title="公告详情">
        <mu-flat-button slot="right" label="关闭" color="white" @click="closePopUp()"/>
      </mu-appbar>
      <mu-content-block class="fs-popup-content">
        <p v-html="htmlContent"></p>
      </mu-content-block>
    </mu-popup>
   </div>
 </template>

 <script>
 import initScroll from '@/mixins/initscroller'
   export default {
    data() {
      return {
        htmlContent: '',
        bottomPopup: false,
        loading: false,
        scroller: null,
        pageSize: 15,
        start: 0,
        count: 0,
        totalCount: 0,
        showRemind: false,
        listData: [],
        classa: 'fs-bb'
      }
    },
    mixins: [initScroll],
    mounted() {
      this.scroller = this.$el
      let data = {
        limit: this.pageSize,
        start: this.start
      }
      this.$http.post('/notice_noticeUserlist', data).then((res) => {
        this.count += 1
        this.listData = res.resultlist
        this.totalCount = res.totalrecord
      })
    },
    methods: {
      getDateList() {
        this.start = this.count * this.pageSize
        if (this.start >= (this.totalCount - 1)) {
          this.showRemind = true
          return
        }
        this.loading = true
        let data = {
          limit: this.pageSize,
          start: this.start
        }
        this.$http.post('/notice_noticeUserlist', data).then((res) => {
          this.count += 1
          this.listData = [...this.listData, ...res.resultlist]
          this.loading = false
        }).catch((error) => {
          console.log(error)
        })
      },
      lookAtContent(content) {
        this.htmlContent = content
        this.bottomPopup = true
      },
      closePopUp() {
        this.bottomPopup = false
      }
      }
   }
 </script>

 <style lang="less">
  #system-page {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: auto;
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
      overflow-x: auto;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
 </style>

