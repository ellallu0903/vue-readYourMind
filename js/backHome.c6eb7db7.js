(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["backHome"],{9062:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t._self._c;return s("div",{staticClass:"p-5",attrs:{id:"backHome"}},[t._m(0),s("div",{staticClass:"columns is-flex-direction-column",attrs:{id:"backData"}},[s("div",{staticClass:"column"},[s("b-notification",{staticClass:"backData",attrs:{closable:!1}},[s("div",{staticClass:"is-flex is-justify-content-center is-align-items-center"},[s("b-icon",{staticClass:"mr-1",attrs:{icon:"account",size:"is-large"}}),t._v("會員總數： ")],1),s("div",{staticClass:"p-3 has-text-centered is-size-2 color_primaryColor01"},[t._v(" "+t._s(t.members.length)+" ")])])],1),s("div",{staticClass:"column"},[s("b-notification",{staticClass:"backData",attrs:{closable:!1}},[s("div",{staticClass:"is-flex is-justify-content-center is-align-items-center"},[s("b-icon",{staticClass:"mr-1",attrs:{icon:"notebook",size:"is-large"}}),t._v("測驗數量： ")],1),s("div",{staticClass:"p-3 has-text-centered is-size-2 color_primaryColor01"},[t._v(" "+t._s(t.tests.length)+" ")])])],1),s("div",{staticClass:"column"},[s("b-notification",{staticClass:"backData",attrs:{closable:!1}},[s("div",{staticClass:"is-flex is-justify-content-center is-align-items-center"},[s("b-icon",{staticClass:"mr-1",attrs:{icon:"lightbulb",size:"is-large"}}),t._v("小知識數量： ")],1),s("div",{staticClass:"p-3 has-text-centered is-size-2 color_primaryColor01"},[t._v(" "+t._s(t.knowledges.length)+" ")])])],1)]),s("div")])},i=[function(){var t=this,s=t._self._c;return s("nav",{staticClass:"breadcrumb has-bullet-separator"},[s("ul",[s("li",[s("a",{attrs:{href:"#/"}},[t._v("首頁")])]),s("li",[s("a",{attrs:{href:"#/backStage/home"}},[t._v("後台管理")])]),s("li",{staticClass:"is-active"},[s("a",{attrs:{href:"#"}},[t._v("後台數據")])])])])}],r={data(){return{members:[],tests:[],knowledges:[],openTest:!1,openKnowledge:!1}},mounted(){this.axios.get("https://vue-readyourmind.onrender.com/knowledges/").then(t=>{t.data.success?this.knowledges=t.data.result:this.$swal({icon:"error",title:"發生錯誤",text:t.data.message})}).catch(t=>{this.$buefy.dialog.alert({title:"Error!",message:t.response.data.message,type:"is-danger",hasIcon:!0,icon:"heart-broken"})}),this.axios.get("https://vue-readyourmind.onrender.com/users/").then(t=>{t.data.success?this.members=t.data.result:this.$swal({icon:"error",title:"發生錯誤",text:t.data.message})}).catch(t=>{this.$buefy.dialog.alert({title:"Error!",message:t.response.data.message,type:"is-danger",hasIcon:!0,icon:"heart-broken"})}),this.axios.get("https://vue-readyourmind.onrender.com/tests/").then(t=>{t.data.success?this.tests=t.data.result:this.$swal({icon:"error",title:"發生錯誤",text:t.data.message})}).catch(t=>{this.$buefy.dialog.alert({title:"Error!",message:t.response.data.message,type:"is-danger",hasIcon:!0,icon:"heart-broken"})})}},c=r,n=e("2877"),o=Object(n["a"])(c,a,i,!1,null,null,null);s["default"]=o.exports}}]);
//# sourceMappingURL=backHome.c6eb7db7.js.map