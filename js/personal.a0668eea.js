(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["personal"],{"56c3":function(t,s,e){t.exports=e.p+"img/mushroom.0591e4c6.svg"},"8e4f":function(t,s,e){t.exports=e.p+"img/startTest.e63950e1.svg"},"90ab":function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t._self._c;return s("div",{staticClass:"bg_personal one_page_min_h p-5",attrs:{id:"personal"}},[t._m(0),s("div",{staticClass:"columns p-5 is-justify-content-space-around"},[s("div",{staticClass:"column is-2 is-flex is-justify-content-center h-100 mb-4",attrs:{id:"per_content"}},[s("div",{staticClass:"columns position_relative box_per_profile is-flex-direction-column p-4"},[t.isEdit?s("button",{staticClass:"btn_persinal_edit ml-2",on:{click:function(s){return t.edit(t.users)}}},[s("b-icon",{attrs:{icon:"cog"}})],1):t._e(),s("div",{staticClass:"column w-100 is-flex is-justify-content-center is-align-items-center"},[s("div",{staticClass:"columns is-flex-direction-column is-align-items-center is-mobile"},[s("div",{staticClass:"column image is-150x150"},[s("div",{staticClass:"box_avator"},["bear"===t.users.avator?s("img",{staticClass:"is-rounded",attrs:{src:e("37fb"),alt:"Your avator."}}):"fox"===t.users.avator?s("img",{staticClass:"is-rounded",attrs:{src:e("432a"),alt:"Your avator."}}):"deer"===t.users.avator?s("img",{staticClass:"is-rounded",attrs:{src:e("0e7c"),alt:"Your avator."}}):s("img",{staticClass:"is-rounded",attrs:{src:e("96c6"),alt:"Your avator."}})])]),t.isEdit?t._e():s("div",{staticClass:"column block columns is-mobile"},[s("b-radio",{staticClass:"column is-flex is-justify-content-center is-align-items-center is-flex-direction-column mx-0 px-0",attrs:{name:"avator","native-value":"bear"},model:{value:t.model02,callback:function(s){t.model02=s},expression:"model02"}},[s("figure",{staticClass:"image is-48x48 mt-2"},[s("img",{staticClass:"is-rounded",attrs:{src:e("37fb")}})])]),s("b-radio",{staticClass:"column is-flex is-justify-content-center is-align-items-center is-flex-direction-column mx-0 px-0",attrs:{name:"avator","native-value":"fox"},model:{value:t.model02,callback:function(s){t.model02=s},expression:"model02"}},[s("figure",{staticClass:"image is-48x48 mt-2"},[s("img",{staticClass:"is-rounded",attrs:{src:e("432a")}})])]),s("b-radio",{staticClass:"column is-flex is-justify-content-center is-align-items-center is-flex-direction-column mx-0 px-0",attrs:{name:"avator","native-value":"deer"},model:{value:t.model02,callback:function(s){t.model02=s},expression:"model02"}},[s("figure",{staticClass:"image is-48x48 mt-2"},[s("img",{staticClass:"is-rounded",attrs:{src:e("0e7c")}})])]),s("b-radio",{staticClass:"column is-flex is-justify-content-center is-align-items-center is-flex-direction-column mx-0 px-0",attrs:{name:"avator","native-value":"owl"},model:{value:t.model02,callback:function(s){t.model02=s},expression:"model02"}},[s("figure",{staticClass:"image is-48x48 mt-2"},[s("img",{staticClass:"is-rounded",attrs:{src:e("96c6")}})])])],1)])]),s("div",{staticClass:"column"},[s("div",{staticClass:"columns is-flex-direction-column"},[s("div",{staticClass:"column"},[t._m(1),t.isEdit?s("div",{staticClass:"is-size-5"},[t._v(t._s(t.users.name))]):s("b-input",{attrs:{state:t.nameState},model:{value:t.model01,callback:function(s){t.model01=s},expression:"model01"}})],1),s("div",{staticClass:"column"},[t._m(2),s("div",{staticClass:"is-size-5"},[t._v(t._s(t.users.email))])]),s("div",{staticClass:"column"},[t._m(3),s("div",{staticClass:"is-size-5"},[t._v(t._s(t.registeredDate))])]),s("div",{staticClass:"column is-align-self-center has-text-centered"},[t.isEdit?t._e():s("b-button",{staticClass:"btn_enter mr-2",on:{click:function(s){return t.save(t.users)}}},[t._v(" 保存 ")]),t.isEdit?t._e():s("b-button",{staticClass:"btn_cancel",on:{click:function(s){return t.cancel(t.users)}}},[t._v(" 取消 ")])],1)])])])]),s("div",{staticClass:"column is-8 box_per_result h-100",attrs:{id:"per_result"}},[s("b-tabs",{staticClass:"h-100",attrs:{expanded:"",animated:!1},model:{value:t.activeTab,callback:function(s){t.activeTab=s},expression:"activeTab"}},[s("b-notification",{staticClass:"color_primaryColor01 notification_style"},[s("img",{staticClass:"mr-2",attrs:{width:"45",src:e("56c3"),alt:"Check it out!"}}),s("span",{staticClass:"mx-3"},[t._v("點選上方測驗名稱，查看結果吧～")])]),t._l(t.tests,(function(i,a){return[s("b-tab-item",{key:a,staticClass:"h-100",scopedSlots:t._u([{key:"header",fn:function(){return[s("span",{attrs:{id:"tab"+a}},[t._v(" "+t._s(i.title)+" ")])]},proxy:!0}],null,!0)},[s("div",{staticClass:"h-100 columns is-justify-content-center is-align-items-flex-start"},[s("div",{staticClass:"column is-5 p-5 is-flex is-justify-content-flex-start is-align-items-flex-start"},[s("div",{staticClass:"columns is-flex-direction-column"},[s("div",{staticClass:"column"},[s("div",{staticClass:"mb-2"},[s("b",[t._v("測驗名稱")])]),s("div",{staticClass:"is-size-5"},[t._v(" "+t._s(i.title)+" ")])]),s("div",{staticClass:"column"},[s("div",{staticClass:"mb-2"},[s("b",[t._v("測驗類別")])]),s("div",{staticClass:"is-size-5"},[t._v(t._s(i.type))])]),s("div",{staticClass:"column"},[s("div",{staticClass:"mb-2"},[s("b",[t._v("測驗次數")])]),s("div",{staticClass:"is-size-5"},[t._v(t._s(t.resultData.length))])]),s("div",{staticClass:"column"},[s("div",{staticClass:"mb-2"},[s("b",[t._v("結果說明")])]),s("b-collapse",{attrs:{open:!1,position:"is-bottom","aria-id":"contentIdForA11y1"},scopedSlots:t._u([{key:"trigger",fn:function(e){return[s("a",{attrs:{"aria-controls":"contentIdForA11y1"}},[s("b-icon",{attrs:{icon:e.open?"menu-up":"menu-down"}}),t._v(" "+t._s(e.open?"Close":"Open")+" ")],1)]}}],null,!0)},[s("div",{staticClass:"is-size-5"},[t._v(t._s(i.description))])])],1)])]),s("div",{staticClass:"column is-7 is-three-quarters p-5 is-flex is-justify-content-center is-align-content-center",attrs:{id:"chart"}},[s("div",{staticClass:"container is-flex is-justify-content-center is-align-items-flex-start"},[0===t.resultData.length?s("div",{staticClass:"is-size-4 color_primaryColor01"},[s("div",{staticClass:"columns is-flex-direction-column"},[s("div",{staticClass:"column mb-3"},[s("b-button",{attrs:{tag:"router-link",type:"btn_goToTest",to:"test/"+i._id}},[t._v("開始你的第一個 "+t._s(i.title)+" 測驗吧！")])],1),s("div",{staticClass:"column has-text-centered"},[s("img",{attrs:{src:e("8e4f"),alt:"Start your first test.",width:"200"}})])])]):"加總計分"==i.scoringMethod?s("div",{staticStyle:{width:"100%"}},[s("highcharts",{attrs:{options:t.chartLine}})],1):s("div",{staticStyle:{width:"100%"}},[s("highcharts",{attrs:{options:t.chartRadar}})],1)])])])])]}))],2)],1)])])},a=[function(){var t=this,s=t._self._c;return s("nav",{staticClass:"breadcrumb has-bullet-separator"},[s("ul",[s("li",[s("a",{attrs:{href:"#/"}},[t._v("首頁")])]),s("li",{staticClass:"is-active"},[s("a",{attrs:{href:"#"}},[t._v("個人資料")])])])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"mb-2"},[s("b",[t._v("暱稱")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"mb-2"},[s("b",[t._v("信箱")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"mb-2"},[s("b",[t._v("加入日期")])])}],r=(e("14d9"),{data(){return{users:[],name:"",avator:"",registeredDate:"",model01:"",model02:"",isEdit:!0,results:[],resultGroup:[],activeTab:0,tests:[]}},computed:{user(){return this.$store.state.user},nameState(){return 0===this.model01.length?null:this.model01.length>=2&&this.model01.length<=10},resultData(){return this.results.filter(t=>t.testData_id._id===this.tests[this.activeTab]._id)},chartLine(){let t=this.resultData;const s=t.map(t=>{const s={name:"",y:null};return s.name=t.date.substr(0,10),s.y=t.scores,s}),e={title:{text:"測驗結果 ❤"},yAxis:{title:{text:null}},xAxis:{type:"category"},style:{color:"#f17c67"},series:[{name:"分數",type:"line",data:s,color:"#f17c67",showInLegend:!1}],plotOptions:{line:{dataLabels:{enabled:!0}}},credits:{enabled:!1}};return e},chartRadar(){const t=this.resultData,s=t.map(t=>{const s=[];for(let i=1;i<=4;i++)t.result.length>0&&t.result[0][i]?s.push(t.result[0][i]):s.push(0);const e={name:t.date.substr(0,10),data:s,pointPlacement:"on"};return e}),e={chart:{polar:!0,type:"line"},title:{text:"測驗結果 ❤"},pane:{size:"80%"},xAxis:{categories:["A","B","C","D"],tickmarkPlacement:"on",lineWidth:0},yAxis:{gridLineInterpolation:"polygon",lineWidth:0,min:0},tooltip:{shared:!0,pointFormat:'<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'},legend:{align:"right",verticalAlign:"top",y:70,layout:"vertical"},colors:["#f17c67","#60584b","#D18A40","#f4c7a5","#8a8174","#f4c7a5","#D15740","#AE3620","#B1366C","#931B50"],series:s};return e}},methods:{cancel(t){this.isEdit=!0,this.model01=t.name,this.model02=t.avator},save(t){this.nameState?this.axios.patch("https://vue-readyourmind.onrender.com/users/"+this.user.id,{name:this.model01,avator:this.model02}).then(s=>{s.data.success?(this.isEdit=!0,t.name=this.model01,t.avator=this.model02,this.$store.state.user.avator=this.model02,this.$buefy.dialog.alert({title:"Success!",message:"保存成功！",type:"is-danger",hasIcon:!0,icon:"heart-circle"})):this.$buefy.dialog.alert({title:"Error!",message:"發生錯誤！",type:"is-danger",hasIcon:!0,icon:"heart-broken"})}).catch(t=>{this.$buefy.dialog.alert({title:"Error!",message:t.response.data.message,type:"is-danger",hasIcon:!0,icon:"heart-broken"})}):this.$buefy.dialog.alert({title:"Error!",message:"暱稱必須介於 2 至 10 字元。",type:"is-danger",hasIcon:!0,icon:"heart-broken"})},edit(t){this.isEdit=!1,t.name=this.model01,t.avator=this.model02}},async mounted(){try{let t=await this.axios.get("https://vue-readyourmind.onrender.com/users/"+this.user.id);if(t.data.success?(this.users=t.data.result,this.model01=t.data.result.name,this.model02=t.data.result.avator,this.registeredDate=this.users.regDate.substr(0,10)):this.$swal({icon:"error",title:"發生錯誤",text:t.data.message}),t=await this.axios.get("https://vue-readyourmind.onrender.com/users/result/"+this.user.id),t.data.success?this.results=t.data.result.pesonalTestResults:this.$swal({icon:"error",title:"發生錯誤",text:t.data.message}),t=await this.axios.get("https://vue-readyourmind.onrender.com/tests/"),t.data.success){if(this.tests=t.data.result,this.$route.query.test){const t=this.tests.findIndex(t=>t._id===this.$route.query.test);t>-1&&setTimeout(()=>{document.querySelector("#tab"+t).parentElement.click()},10)}}else this.$swal({icon:"error",title:"發生錯誤",text:t.data.message})}catch(t){console.log(t),this.$buefy.dialog.alert({title:"Error!",message:t.response.data.message,type:"is-danger",hasIcon:!0,icon:"heart-broken"})}}}),l=r,n=e("2877"),o=Object(n["a"])(l,i,a,!1,null,null,null);s["default"]=o.exports}}]);
//# sourceMappingURL=personal.a0668eea.js.map