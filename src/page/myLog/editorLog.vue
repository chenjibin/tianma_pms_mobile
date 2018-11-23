<template>
  <div id="editor-log-page">
    <mu-flexbox orient="vertical" justify="center" align="center" style="text-align: center;">
      <mu-flexbox-item>
        <mu-select-field
          v-model="submitData.diaryType"
          :labelFocusClass="['label-foucs']" label="选择日志类型">
          <mu-menu-item v-for="item,index in diaryTypeOptions" :key="index" :value="item.value" :title="item.label" />
        </mu-select-field>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-date-picker
          hintText="提交日期"
          autoOk
          :shouldDisableDate="disableNeedDays"
          :inputClass="'fs-input'"
          v-model="submitData.date"/>
      </mu-flexbox-item>
    </mu-flexbox>
    <v-html5-editor @change="htmlChange"  content="" :height="200"></v-html5-editor>
    <mu-flexbox class="fs-action-block">
      <mu-flexbox-item>
        <mu-raised-button
          label="返回"
          @click="returnIndex"
          primary/>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-raised-button
          label="提交日志"
          @click="submitLog"
          secondary/>
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
#editor-log-page {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 16px;
  -webkit-overflow-scrolling: touch;
  .fs-input {
    text-align: center;
  }
  .fs-action-block {
    text-align: center;
    margin-top: 16px;
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
import VueHtml5Editor from 'vue-html5-editor'
import moment from 'moment'
const option1 = {
    showModuleName: false,
    language: "zh-cn",
    visibleModules: [
        "text",
        "color",
        "font",
        "align",
        "list",
        "tabulation",
        "hr",
        "eraser",
        "undo"
    ]
}
const editor = new VueHtml5Editor(option1)
  export default {
    data() {
      return {
        topPopup: false,
        errorContent: '',
        content: '',
        diaryTypeOptions: [{
          value: '0',
          label: '出勤'
        }, {
          value: '1',
          label: '休息'
        }],
        submitData: {
          diaryType: '0',
          diaryContent: ' ',
          date: ''
        }
      }
    },
    mounted() {
      this.submitData.date = moment().format('YYYY-MM-DD')
    },
    components: {
      'v-html5-editor': editor
    },
    watch: {
      topPopup (val) {
        if (val) {
          setTimeout(() => {
            this.topPopup = false
          }, 2000)
        }
      }
    },
    methods: {
      disableNeedDays(date) {
        return date.getDate() + 2 < moment().format('DD')
      },
      htmlChange(val) {
        this.submitData.diaryContent = val
      },
      submitLog() {
        let data = {
          id: 0,
          type: this.submitData.diaryType,
          content: this.submitData.diaryContent,
          time: this.submitData.date
        }
        this.$http.post('/journal/addJournal', data).then((res) => {
          if (res.success) {
            this.returnIndex()
          } else {
            this.topPopup = true
            this.errorContent = '保存失败！'
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      returnIndex() {
        this.$router.go(-1)
      }
    }
  }
</script>
