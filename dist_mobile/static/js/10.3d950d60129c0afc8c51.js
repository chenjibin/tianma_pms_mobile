webpackJsonp([10],{300:function(t,e,n){n(510);var i=n(123)(n(471),n(544),"data-v-943261de",null);t.exports=i.exports},471:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"questionButton",data:function(){return{alertFlag:!1,alertText:""}},methods:{_qiandaoHadler:function(){var t=this,e={};e.id=this.$route.params.id,e.opeartetype=0,this.$http.post("/train/train_signin_evaluate",e).then(function(e){e.success&&(t.alertText="签到成功",t.alertFlag=!0)})},_toFankuiPage:function(){this.$router.replace({name:"questionAnswer",params:{id:this.$route.params.id,title:this.$route.params.title}})}},components:{}}},489:function(t,e,n){e=t.exports=n(285)(!0),e.push([t.i,".question-button[data-v-943261de]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:100%}.question-button .button[data-v-943261de]{width:30%;margin-bottom:24px}","",{version:3,sources:["C:/Users/Administrator/tianma_pms_mobile/src/page/questionAnswer/button.vue"],names:[],mappings:"AACA,kCACE,oBAAqB,AACrB,qBAAsB,AACtB,oBAAqB,AACrB,aAAc,AACd,4BAA6B,AAC7B,6BAA8B,AAC9B,8BAA+B,AAC3B,0BAA2B,AACvB,sBAAuB,AAC/B,wBAAyB,AACzB,+BAAgC,AAC5B,qBAAsB,AAClB,uBAAwB,AAChC,yBAA0B,AAC1B,2BAA4B,AACxB,sBAAuB,AACnB,mBAAoB,AAC5B,WAAa,CACd,AACD,0CACE,UAAW,AACX,kBAAoB,CACrB",file:"button.vue",sourcesContent:["\n.question-button[data-v-943261de] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 100%;\n}\n.question-button .button[data-v-943261de] {\n  width: 30%;\n  margin-bottom: 24px;\n}\n"],sourceRoot:""}])},510:function(t,e,n){var i=n(489);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(286)("69a6511d",i,!0)},544:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"question-button"},[n("h2",{staticStyle:{"margin-bottom":"160px"}},[t._v(t._s(t.$route.params.title))]),t._v(" "),n("mu-raised-button",{staticClass:"button",attrs:{label:"签到",secondary:""},nativeOn:{click:function(e){t._qiandaoHadler(e)}}}),t._v(" "),n("mu-raised-button",{staticClass:"button",attrs:{label:"反馈"},nativeOn:{click:function(e){t._toFankuiPage(e)}}}),t._v(" "),n("mu-dialog",{attrs:{open:t.alertFlag,title:"提示"}},[t._v("\n        "+t._s(t.alertText)+"\n        "),n("mu-flat-button",{attrs:{label:"确定",primary:""},on:{click:function(e){t.alertFlag=!1}},slot:"actions"})],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=10.3d950d60129c0afc8c51.js.map