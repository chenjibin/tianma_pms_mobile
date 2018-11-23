<template>
    <div class="question-button">
        <h2 style="margin-bottom: 160px;">{{$route.params.title}}</h2>
        <mu-raised-button label="签到" secondary class="button" @click.native="_qiandaoHadler"/>
        <mu-raised-button label="反馈" class="button" @click.native="_toFankuiPage"/>
        <mu-dialog :open="alertFlag" title="提示">
            {{alertText}}
            <mu-flat-button label="确定" slot="actions" primary @click="alertFlag = false" />
        </mu-dialog>
    </div>
</template>
<style lang="less" scoped>
    .question-button {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        .button {
            width: 30%;
            margin-bottom: 24px;
        }
    }
</style>
<script>
    export default {
        name: 'questionButton',
        data() {
            return {
                alertFlag: false,
                alertText: ''
            }
        },
        methods: {
            _qiandaoHadler() {
                let sendData = {};
                sendData.id = this.$route.params.id;
                sendData.opeartetype = 0;
                this.$http.post('/train/train_signin_evaluate', sendData).then((resp) => {
                    if (resp.success) {
                        this.alertText = '签到成功'
                        this.alertFlag = true;
                    }
                })
            },
            _toFankuiPage() {
                this.$router.replace({name: 'questionAnswer', params: {id: this.$route.params.id, title: this.$route.params.title}})
            }
        },
        components: {}
    }
</script>
