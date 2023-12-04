(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"1a83":function(t,e,s){t.exports=s.p+"img/ryd_eng.a71398d0.svg"},f820:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"bg_color one_page_min_h p-5",attrs:{id:"about"}},[t._m(0),e("div",{staticClass:"title is-3 has-text-centered"},[t._v("關於讀心")]),t._m(1),e("br"),e("div",{staticClass:"is-flex is-align-items-center is-flex-direction-column is-justify-content-center",attrs:{id:"a_content"}},[e("section",{staticClass:"box_about mt-5 has-text-centered h-100 mb-6"},[e("b-steps",{staticClass:"w-100 h-100 is-flex is-flex-direction-column is-justify-content-space-between",attrs:{"icon-prev":t.prevIcon,"icon-next":t.nextIcon,"label-position":t.labelPosition,"mobile-mode":t.mobileMode,size:"is-large"},scopedSlots:t._u([{key:"navigation",fn:function({previous:s,next:i}){return t.customNavigation?[e("b-button",{attrs:{outlined:"",type:"is-danger","icon-pack":"fas","icon-left":"backward",disabled:s.disabled},on:{click:function(t){return t.preventDefault(),s.action.apply(null,arguments)}}},[t._v(" Previous ")]),e("b-button",{attrs:{outlined:"",type:"is-success","icon-pack":"fas","icon-right":"forward",disabled:i.disabled},on:{click:function(t){return t.preventDefault(),i.action.apply(null,arguments)}}},[t._v(" Next ")])]:void 0}}],null,!0)},[e("b-step-item",{staticClass:"p-4",attrs:{icon:"account-heart-outline",label:"註冊帳號",clickable:t.isStepsClickable}},[e("h1",{staticClass:"is-size-4 has-text-weight-semibold"},[t._v(" 註冊帳號 ")]),e("div",{staticClass:"box_about_content_h py-2 px-5"},[t._v(" 輸入您的電子郵件、密碼、暱稱，以及選擇代表頭像後，就可以成功擁有 "),e("b",{staticClass:"color_primaryColor01"},[t._v("讀心")]),t._v(" 的帳號。 "),e("br"),t._v(" 有了 "),e("b",{staticClass:"color_primaryColor01"},[t._v("讀心")]),t._v(" 的帳號，您可以使用本平台的心理測驗，並隨時檢視自己的測驗結果。 ")]),e("b-button",{staticClass:"btn_enter",on:{click:function(e){return t.toReg()}}},[t._v(" 前去註冊 ")]),e("br"),e("div",{staticClass:"mt-2",on:{click:function(e){return t.toLogIn()}}},[e("a",[e("small",[t._v("已有帳號？登入吧！")])])])],1),e("b-step-item",{staticClass:"p-4",attrs:{icon:"heart-settings-outline",label:"開始測驗",clickable:t.isStepsClickable}},[e("h1",{staticClass:"is-size-4 has-text-weight-semibold"},[t._v(" 開始測驗 ")]),e("div",{staticClass:"box_about_content_h py-2 px-5"},[t._v(" 點選導覽列中的心理測驗或下方按鈕，檢視本平台目前所有的心理測驗。 "),e("br"),t._v(" 選擇您有興趣的測驗後，將會傳送到測驗頁面，即可立即開始作答。 ")]),e("b-button",{staticClass:"btn_enter",on:{click:function(e){return t.toTest()}}},[t._v(" 選擇測驗 ")])],1),e("b-step-item",{staticClass:"p-4",attrs:{icon:"folder-heart-outline",label:"檢測結果",clickable:t.isStepsClickable}},[e("h1",{staticClass:"is-size-4 has-text-weight-semibold"},[t._v(" 檢測結果 ")]),e("div",{staticClass:"box_about_content_h py-2 px-5"},[t._v(" 完成測驗後，檢測結果會顯示在個人資料中。 "),e("br"),t._v(" 選擇心理測驗的名稱，查看剛剛作答完畢的測驗結果或是先前的測驗紀錄。 ")]),e("b-button",{staticClass:"btn_enter",on:{click:function(e){return t.toPersonalPage()}}},[t._v(" 查看結果 ")])],1)],1)],1)])])},a=[function(){var t=this,e=t._self._c;return e("nav",{staticClass:"breadcrumb has-bullet-separator"},[e("ul",[e("li",[e("a",{attrs:{href:"#/"}},[t._v("首頁")])]),e("li",{staticClass:"is-active"},[e("a",{attrs:{href:"#"}},[t._v("關於讀心")])])])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"is-flex is-flex-direction-column is-align-items-center pb-4"},[e("div",{staticClass:"box_about_text has-text-centered p-5 speech-bubble"},[e("img",{attrs:{src:s("1a83"),alt:"Read your mind"}}),e("div",{staticClass:"is-size-5 mt-2 about_slogan"},[t._v(" 藉由測驗來解讀自己的心 ")])])])}],o=(s("14d9"),{data(){return{activeStep:0,isStepsClickable:!0,customNavigation:!1,isProfileSuccess:!1,prevIcon:"chevron-left",nextIcon:"chevron-right",labelPosition:"bottom",mobileMode:"minimalist",abouts:[]}},computed:{user(){return this.$store.state.user}},methods:{toReg(){0===this.user.id.length?this.$router.push("/registered"):this.$buefy.dialog.alert({title:"Awww!",message:"你已經登入囉！",type:"is-danger",hasIcon:!0,icon:"account-heart-outline"})},toPersonalPage(){this.user.id.length>0?this.$router.push("/personal"):this.$buefy.dialog.alert({title:"Opps!",message:"尚未登入！",type:"is-danger",hasIcon:!0,icon:"heart-broken"})},toTest(){this.$router.push("/testList")},toLogIn(){0===this.user.id.length?this.$router.push("/login"):this.$buefy.dialog.alert({title:"Awww!",message:"你已經登入囉！",type:"is-danger",hasIcon:!0,icon:"account-heart-outline"})}},mounted(){this.axios.get("https://vue-readyourmind.onrender.com/abouts/").then(t=>{t.data.success?this.abouts=t.data.result.map(t=>(t.edit=!1,t.model01=t.title,t.model02=t.content,t)):this.$swal({icon:"error",title:"發生錯誤",text:t.data.message})}).catch(t=>{this.$buefy.dialog.alert({title:"Error!",message:t.response.data.message,type:"is-danger",hasIcon:!0,icon:"heart-broken"})})}}),n=o,l=s("2877"),r=Object(l["a"])(n,i,a,!1,null,null,null);e["default"]=r.exports}}]);
//# sourceMappingURL=about.f4f7876f.js.map