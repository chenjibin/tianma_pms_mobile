<template>
  <div id="lottery-square">
    <div class="title-wrapper">
      <img src="./oa_lottery_title.png" />
    </div>
    <div class="marquee-wrapper">
      <marquee
            :list-arr="getPriceNameList"></marquee>
    </div>
    <div class="lottery-content">
      <lottery @start-roll="_startRoll"
            @roll-down="_rollDownHandler"
            :price-index="priceIndex"
            :price-list="priceInfo"
            :center-pic="centerPic"
            :lottery-type="lotteryType"
            ref="lottery"></lottery>
    </div>
    <div class="btn-wrapper">
      <span class="btn" @click="isRuleShow = true">活动规则</span>
    </div>
    <mu-dialog :open="isConfirmSHow"  @close="close" dialogClass="fs-dialog" bodyClass="fs-dialog-body">
      <div class="fs-dialog-block">
        <div class="top-wrapper">
          <div class="close-btn" @click.stop="close">
            <mu-icon value="clear" :size="24"/>
          </div>
          <div class="price-name" v-show="isPrice === 1">
            <p>{{confirmContent}}</p>
          </div>
          <div class="fs-square-img top">
            <img src="./oa_lottery_pop_nocoin.png" v-show="isPrice === 2"/>
            <img src="./oa_lottery_popbg_yes.png" v-show="isPrice === 1"/>
            <img src="./oa_lottery_popbg_no.png" v-show="isPrice == 0" />
          </div>
        </div>
        <div class="bottom-wrapper">
          <div class="fs-square-img bottom">
            <img src="./oa_lottery_popbg_btn.png" @click.stop="_continueRoll" v-show="isPrice !== 2"/>
            <div class="to-editor-btn" v-show="isPrice === 2" @click="_toEditorLog">写日志 赚金币</div>
          </div>
        </div>
      </div>
    </mu-dialog>
    <mu-dialog :open="isRuleShow" @close="isRuleShow = false" title="活动规则">
      <div class="rule-list">
        <ul>
          <li>1、每次抽奖需扣除10个金币，扣除金币不退还，每天参与抽奖次数不限。</li>
          <li>2、奖品可直接到人事部领取，有效期至当月月底，预期作废！</li>
          <li>3、活动解释权归天马人事部所有。</li>
        </ul>
      </div>
      <mu-flat-button primary label="关闭" @click="isRuleShow = false" slot="actions"/>
    </mu-dialog>
  </div>
</template>

<style lang="less" scoped>
.fs-dialog-block {
  .top-wrapper {
    position: relative;
    .close-btn {
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border: 1px solid #fff;
        border-radius: 50%;
        color: #fff;
    }
    .price-name {
        position: absolute;
        z-index: 1000;
        width: 100%;
        text-align: center;
        top: 50%;
        font-size: 20px;
        font-weight: 700;
        color: #dc0707;
        text-shadow: 0px 0px 5px #fff;
        p {
          width: 66%;
          margin: 0 auto;
        }
    }
    .top {
      border-top-left-radius: 25px;
      overflow: hidden;
      border-top-right-radius: 25px;
      padding-top: 82%;
    }
  }
  .bottom-wrapper {
    padding: 16px 0;
    .bottom {
      margin: 0 auto;
      padding-top: 20%;
      width: 60%;
      .to-editor-btn {
        position: absolute;
        left: 4%;
        top: 12%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 92%;
        height: 75%;
        background-color: #f33401;
        color: #fff;
        border-radius: 30px;
        box-shadow:0px 0px 0px 4px #ffd864;
        font-weight: 700;
      }
    }
  }
}
.marquee-wrapper {
  margin-bottom: 20px;
}
  #lottery-square {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow-x: hidden;
    overflow-y: auto;
    background-size: 100% 100%;
    background-image: url(./oa_mobil_lottery_bg.png);
    background-repeat: no-repeat;
    background-position: center;
    .btn-wrapper {
      padding: 20px 0;
      text-align: center;
      .btn {
        display: inline-block;
        padding: 8px 20px;
        border-radius: 20px;
        background-color: #ff0036;
        color: #fff;
        font-weight: 700;
        box-shadow: 0px 0px 0px 2px #fff;
      }
    }
    .title-wrapper {
      padding: 20px 0;
      width: 100%;
      text-align: center;
      img {
        width: 40%;
      }
    }
    .lottery-content {
      width: 90%;
      margin: 0 auto;
    }
  }
</style>

<script>
import lottery from '@/components/lotterySquare'
import marquee from '@/components/marquee'
export default {
  data() {
    return {
      centerPic: '/static/images/oa_lottery_btn.png',
      priceIndex: 0,
      lotteryType: 5,
      priceInfo: [],
      isPrice: 0,
      confirmTitle: '恭喜你，中奖啦！',
      confirmContent: '10个金币',
      isConfirmSHow: false,
      isRuleShow: false,
      getPriceNameList: []
    }
  },
  methods: {
    _startRoll() {
      this.$http.get('/lottery_shakeItUp').then((res) => {
        if (res.status_code === 'success') {
          if (+res.type === 0) {
            setTimeout(() => {
              this.isPrice = 0
            }, 500)
            this.priceIndex = this._returnGetNoPriceIndex()
          } else {
            setTimeout(() => {
              this.isPrice = 1
              this.confirmContent = res.name
            }, 500)
            this.priceIndex = this._returnGetPriceIndex(res.id)
          }
          this.$refs.lottery._roll()
        } else {
          this.$refs.lottery.canClick = true
          this.isPrice = 2
          this.isConfirmSHow = true
        }
      })
    },
    _continueRoll() {
        this.close()
        this.$refs.lottery._startRoll()
    },
    _rollDownHandler() {
        this.isConfirmSHow = true
    },
    close() {
      this.isConfirmSHow = false
    },
    _returnGetNoPriceIndex() {
      let arr = []
      this.priceInfo && this.priceInfo.forEach((item, index) => {
        if (item.type === 0) arr.push(index)
      })
      arr.sort(() => {
        return Math.floor(Math.random() * 3) - 1
      })
      return arr[0]
    },
    _returnGetPriceIndex(id) {
      let priceIndex
      this.priceInfo && this.priceInfo.forEach((item, index) => {
        if (+item.id === +id) priceIndex = index
      })
      return priceIndex || 0
    },
    _toEditorLog() {
      this.close()
      this.$router.push('logEditor')
    }
  },
  created() {
    this.$http.get('/lottery_ImageList').then((res) => {
      if (res.status_code === 'success') {
        this.priceInfo = res.result
        this.getPriceNameList = res.orderlist
      }
    })
  },
  components: {
    lottery,
    marquee
  }
}
</script>
