<template>
    <div id="home-page">
        <div class="food-card">
            <h3>食堂明日预约</h3>
            <div class="btn-group">
                <div class="btn" v-if="morningStates === 0" @click.stop="openWar('morning', '早餐')">预约早餐</div>
                <div class="btn cancel" v-else @click.stop="openCan('morning', '早餐')">取消预约早餐</div>
                <div class="btn" v-if="afternoonStates === 0" @click.stop="openWar('afternoon', '午餐')">预约午餐</div>
                <div class="btn cancel" v-else @click.stop="openCan('afternoon', '午餐')">取消预约午餐</div>
                <div class="btn" v-if="dinnerStates === 0" @click.stop="openWar('dinner', '晚餐')">预约晚餐</div>
                <div class="btn cancel" v-else @click.stop="openCan('dinner', '晚餐')">取消预约晚餐</div>
            </div>
        </div>
        <mu-dialog :open="dialog" title="提醒">
            是否预定明日{{title}}
            <mu-flat-button slot="actions" @click="dialog = false" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="_appointmentHandler" label="确定"/>
        </mu-dialog>
        <mu-dialog :open="dialog2" title="提醒">
            是否取消预定明日{{title}}
            <mu-flat-button slot="actions" @click="dialog = false" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="_cancelAppointment" label="确定"/>
        </mu-dialog>
        <!-- <mu-tabs :value="activeTab" @change="handleTabChange" class="fs-tabs">
          <mu-tab value="tab3" title="系统公告"/>
          <mu-tab value="tab1" title="金币红榜"/>
          <mu-tab value="tab2" title="金币黑榜"/>
        </mu-tabs>
        <div class="fs-tab-panel" v-show="activeTab === 'tab3'">
          <system-notice ref="tab3"></system-notice>
        </div>
        <div class="fs-tab-panel" v-show="activeTab === 'tab1'">
          <coin-red ref="tab1"></coin-red>
        </div>
        <div class="fs-tab-panel" v-show="activeTab === 'tab2'">
          <coin-black ref="tab2"></coin-black>
        </div> -->
    </div>
</template>

<style lang="less" scoped>
    .food-card {
        text-align: center;
        .btn-group {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .btn {
                margin-bottom: 12px;
                width: 160px;
                padding: 12px 0;
                -webkit-border-radius: 6px;
                -moz-border-radius: 6px;
                border-radius: 6px;
                background-color: #dc0707;
                color: #fff;
                font-weight: 700;
                &.cancel {
                    background-color: #666;
                }
            }
        }
    }
    #home-page {
        position: relative;
        height: 100%;
        width: 100%;
        overflow: hidden;
        .fs-tabs {
            position: absolute;
            bottom: 0;
        }
        .fs-tab-panel {
            position: absolute;
            bottom: 48px;
            top: 0;
            width: 100%;
        }
    }

</style>

<script>
    import CoinRed from './coin_red'
    import CoinBlack from './coin_black'
    import SystemNotice from './system_notice'

    export default {
        components: {
            CoinRed,
            CoinBlack,
            SystemNotice
        },
        data() {
            return {
                title: '',
                nowType: '',
                activeTab: 'tab3',
                morningStates: 0,
                afternoonStates: 0,
                dinnerStates: 0,
                appointmentId: 0,
                dialog: false,
                dialog2: false
            }
        },
        created() {
            this._getMyAppintment()
        },
        methods: {
            openWar(type, title) {
                this.nowType = type
                this.title = title
                this.dialog = true
            },
            openCan(type, title) {
                this.nowType = type
                this.title = title
                this.dialog2 = true
            },
            _getMyAppintment() {
                this.$http.get('/card/getMyAppintment').then((res) => {
                    const data = res.data
                    this.appointmentId = data.id
                    this.morningStates = data.morning
                    this.afternoonStates = data.afternoon
                    this.dinnerStates = data.dinner
                })
            },
            _cancelAppointment() {
                let sendData = {}
                sendData.id = this.appointmentId
                sendData[this.nowType] = 0
                this.$http.post('/card/addAppointment', sendData).then((res) => {
                    if (res.success) {
                        this._getMyAppintment()
                    }
                    this.dialog2 = false
                })
            },
            _appointmentHandler() {
                let sendData = {}
                sendData.id = this.appointmentId
                sendData[this.nowType] = 1
                this.$http.post('/card/addAppointment', sendData).then((res) => {
                    if (res.success) {
                        this._getMyAppintment()
                    }
                    this.dialog = false
                })
            },
            handleTabChange(val) {
                this.activeTab = val
                this.$refs[val].resizeScroll()
            }
        }
    }
</script>
