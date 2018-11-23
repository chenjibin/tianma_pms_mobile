<template>
    <div id="login-page">
        <mu-flexbox orient="vertical" justify="center" align="center" class="fs-flex-block">
            <mu-flexbox-item class="item" grow="0" shrink="0">
                <p class="title">天马人事系统</p>
            </mu-flexbox-item>
            <mu-flexbox-item class="item" grow="0" shrink="0">
                <mu-text-field
                    v-model="submitData.userName"
                    label="用户名"
                    hintText="请输入用户名"
                    type="text"
                    :errorText="yanzhengData.userName"
                    @blur="verifyEmptyHandler('userName', '用户名')"
                    @input="initErrorTextHandler('userName')"
                    labelFloat/>
            </mu-flexbox-item>
            <mu-flexbox-item class="item" grow="0" shrink="0">
                <mu-text-field
                    v-model="submitData.passWord"
                    label="密码"
                    hintText="请输入密码"
                    type="password"
                    :errorText="yanzhengData.passWord"
                    @blur="verifyEmptyHandler('passWord', '密码')"
                    @input="initErrorTextHandler('passWord')"
                    labelFloat/>
            </mu-flexbox-item>
            <mu-flexbox-item class="item" grow="0" shrink="0">
                <mu-text-field
                    style="width: 150px;"
                    v-model="submitData.code"
                    label="验证码"
                    hintText="验证码"
                    type="tel"
                    :errorText="yanzhengData.code"
                    @blur="verifyEmptyHandler('code', '验证码')"
                    @input="initErrorTextHandler('code')"
                    labelFloat/>
                <img src="/oa/login/geneCode" width="100" class="yanzhengma"/>
            </mu-flexbox-item>
            <mu-flexbox-item class="item" grow="0" shrink="0">
                <mu-raised-button
                    style="width: 256px;margin-top: 16px;"
                    class="demo-raised-button"
                    label="登录"
                    @click="login"
                    primary/>
            </mu-flexbox-item>
        </mu-flexbox>
        <mu-popup
            position="top"
            :overlay="false"
            popupClass="fs-popup-top"
            :open="topPopup">
            {{errorContent}}
        </mu-popup>
    </div>
</template>

<style lang="less">
    #login-page {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-image: url(/static/images/aaa.jpg);
        .title {
            font-size: 20px;
            font-weight: 700;
            color: #7e57c2;
        }
        .fs-flex-block {
            width: 100%;
            height: 100%;
            overflow: hidden;
            .item {
                text-align: center;
            }
            .yanzhengma {
                display: inline-block;
                vertical-align: middle;
            }
        }
    }

    .fs-popup-top {
        width: 100%;
        background-color: rgba(126, 87, 194, 0.8);
        height: 48px;
        line-height: 48px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>

<script>
    export default {
        data() {
            return {
                errorContent: '',
                topPopup: false,
                yanzhengData: {
                    userName: '',
                    passWord: '',
                    code: ''
                },
                submitData: {
                    userName: '',
                    passWord: '',
                    code: ''
                }
            }
        },
        mounted() {

        },
        watch: {
            topPopup(val) {
                if (val) {
                    setTimeout(() => {
                        this.topPopup = false
                    }, 2000)
                }
            }
        },
        methods: {
            login() {
                let submitData = this.submitData
                if (!submitData.userName || !submitData.passWord || !submitData.code) {
                    this.verifyEmptyHandler('userName', '用户名')
                    this.verifyEmptyHandler('passWord', '密码')
                    this.verifyEmptyHandler('code', '验证码')
                    return
                }
                let data = this.submitData
                this.$http.post('/login/login', data).then((res) => {
                    if (res.success) {
                        if (this.$store.state.app.storeUrl) {
                            this.$router.replace({path: this.$store.state.app.storeUrl})
                        } else {
                            this.$router.replace({name: 'main'})
                        }
                    } else {
                        this.topPopup = true
                        this.errorContent = res.message
                    }
                }).catch((erro) => {
                })
            },
            verifyEmptyHandler(key, name) {
                if (this.submitData[key] === '') {
                    this.yanzhengData[key] = name + '不能为空!'
                }
            },
            initErrorTextHandler(key) {
                this.yanzhengData[key] = ''
            }
        }
    }
</script>
