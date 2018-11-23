<template>
  <div id="fs-main-content-wrapper">
    <mu-appbar title="天马人事" >
      <mu-icon-button icon="menu" slot="left" @click="toggle"/>
    </mu-appbar>
    <mu-drawer :open="open" :docked="false" width="40%" @close="toggle" class="fs-drawer">
      <div class="fs-self-info">
        <mu-avatar src="http://img2.xyyzi.com/Upload/images/20170319/58ce32999c257.jpg" :size="60"/>
        <p class="name">{{selfData.realName}}</p>
        <div class="coin-wrapper">
          <mu-icon value="monetization_on" class="fs-icon"/>
          <span class="count">{{selfData.coin}}</span>
        </div>
        <mu-divider />
      </div>
      <mu-list :value="itemValue" @change="itemChangeHandler">
        <mu-list-item
          v-for="item,index in listData"
          :key="index"
          :value="item.name"
          :title="item.title"></mu-list-item>
      </mu-list>
      <mu-list>
        <mu-list-item
          @click="_toQingjia"
          title="我的请假">
        </mu-list-item>
      </mu-list>
      <mu-list>
        <mu-list-item
          @click="logOut"
          title="退出登录">
        </mu-list-item>
      </mu-list>
    </mu-drawer>
    <div class="fs-main-content-router-wrapper">
      <transition
        name="fade"
        mode="out-in">
        <!-- <keep-alive exclude="a"> -->
          <router-view></router-view>
        <!-- </keep-alive> -->
      </transition>
    </div>
  </div>
</template>

<style lang="less">
#fs-main-content-wrapper{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .fs-main-content-router-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 56px;
    bottom: 0;
    overflow: hidden;
  }
  & > .fs-drawer {
    .fs-self-info {
      text-align: center;
      padding: 10px;
      .coin-wrapper {
        margin-bottom: 10px;
        .fs-icon {
          vertical-align: top;
          color: #FCA555;
        }
        .count {
          display: inline-block;
          vertical-align: top;
          margin-top: 3px;
        }

      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      selfData: {
        realName: '',
        coin: 0
      },
      itemValue: 'myLog',
      open: false,
      listData: [
        {
          title: '首页',
          name: 'home',
          router: {name: 'home'}
        },
        {
          title: '我的日志',
          name: 'myLog',
          router: {name: 'myLog'}
        },
        {
          title: '我的考试',
          name: 'myTest',
          router: {name: 'myTest'}
        }
        // {
        //   title: '抽奖',
        //   name: 'lottery',
        //   router: {name: 'lottery'}
        // }
        //  {
        //   title: '测试webp',
        //   name: 'testWebp',
        //   router: {name: 'testWebp'}
        // }
      ]
    }
  },
  mounted() {
    this.$http.get('/user/myUserInfo').then((res) => {
      this.selfData.realName = res.data.realname
      this.selfData.coin = res.data.tm_coin
    })
  },
  methods: {
    itemChangeHandler(val) {
      if (val !== this.itemValue) {
        this.itemValue = val
        this.toggle()
        this.$router.push({name: val})
      }
    },
    _toQingjia() {
      window.location.href = '/oa/mobile/index.html'
    },
    toggle() {
      this.open = !this.open
    },
    logOut() {
      this.$http.get('/login/logout').then((res) => {
        if (res.success) {
          this.$router.replace({name: 'login'})
        }
      })
    }
  }
}
</script>
