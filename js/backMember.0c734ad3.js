(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["backMember"],{c1e4:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e._self._c;return t("div",{staticClass:"back_content"},[t("div",{staticClass:"p-5",attrs:{id:"backMember"}},[e._m(0),t("b-table",{attrs:{data:e.users,paginated:e.isPaginated,"per-page":e.perPage,"current-page":e.currentPage,"pagination-simple":e.isPaginationSimple,"pagination-position":e.paginationPosition,"pagination-rounded":e.isPaginationRounded,striped:"",hoverable:"","mobile-cards":e.hasMobileCards,"default-sort-direction":e.defaultSortDirection,"sort-icon":e.sortIcon,"sort-icon-size":e.sortIconSize},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}},[t("b-table-column",{attrs:{field:"number",label:"No.",centered:"",width:"100"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("h1",[e._v(e._s(a.row.number))])]}}])}),t("b-table-column",{attrs:{sortable:"",searchable:"",field:"email",label:"信箱",width:"250"},scopedSlots:e._u([{key:"default",fn:function(a){return[a.row.edit?t("b-input",{model:{value:a.row.model01,callback:function(t){e.$set(a.row,"model01",t)},expression:"props.row.model01"}}):t("h1",[e._v(e._s(a.row.email))])]}}])}),t("b-table-column",{attrs:{sortable:"",searchable:"",field:"name",label:"暱稱",width:"200"},scopedSlots:e._u([{key:"default",fn:function(a){return[a.row.edit?t("b-input",{model:{value:a.row.model02,callback:function(t){e.$set(a.row,"model02",t)},expression:"props.row.model02"}}):t("div",[e._v(e._s(a.row.name))])]}}])}),t("b-table-column",{attrs:{sortable:"",searchable:"",field:"avator",label:"頭像",width:"150"},scopedSlots:e._u([{key:"default",fn:function(a){return[a.row.edit?t("b-radio",{attrs:{name:"avator","native-value":"bear"},model:{value:a.row.model03,callback:function(t){e.$set(a.row,"model03",t)},expression:"props.row.model03"}},[e._v(" Bear ")]):e._e(),a.row.edit?t("b-radio",{attrs:{name:"avator","native-value":"fox"},model:{value:a.row.model03,callback:function(t){e.$set(a.row,"model03",t)},expression:"props.row.model03"}},[e._v(" Fox ")]):e._e(),a.row.edit?t("b-radio",{attrs:{name:"avator","native-value":"deer"},model:{value:a.row.model03,callback:function(t){e.$set(a.row,"model03",t)},expression:"props.row.model03"}},[e._v(" Deer ")]):e._e(),a.row.edit?t("b-radio",{attrs:{name:"avator","native-value":"owl"},model:{value:a.row.model03,callback:function(t){e.$set(a.row,"model03",t)},expression:"props.row.model03"}},[e._v(" Owl ")]):t("div",[e._v(e._s(a.row.avator))])]}}])}),t("b-table-column",{attrs:{sortable:"",searchable:"",field:"authority",label:"權限",width:"150"},scopedSlots:e._u([{key:"default",fn:function(a){return[a.row.edit?t("b-radio",{attrs:{name:"authority","native-value":"管理者"},model:{value:a.row.model04,callback:function(t){e.$set(a.row,"model04",t)},expression:"props.row.model04"}},[e._v(" 管理者 ")]):e._e(),a.row.edit?t("b-radio",{attrs:{name:"authority","native-value":"使用者"},model:{value:a.row.model04,callback:function(t){e.$set(a.row,"model04",t)},expression:"props.row.model04"}},[e._v(" 使用者 ")]):t("div",[e._v(e._s(a.row.authority))])]}}])}),t("b-table-column",{attrs:{field:"edit",label:"編輯",width:"150"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("div",[t("b-tooltip",{attrs:{label:"編輯使用者",type:"is-dark"}},[a.row.edit?e._e():t("button",{staticClass:"btn_cancel btn_back_size mr-2",on:{click:function(t){return e.edit(a)}}},[t("b-icon",{attrs:{icon:"pencil-outline"}})],1)]),t("b-tooltip",{attrs:{label:"刪除使用者",type:"is-dark"}},[a.row.edit?e._e():t("button",{staticClass:"btn_trash btn_back_size",on:{click:function(t){return e.confirmCustomDelete(a,a.index)}}},[t("b-icon",{attrs:{icon:"trash-can-outline"}})],1)]),t("b-tooltip",{attrs:{label:"保存",type:"is-dark"}},[a.row.edit?t("button",{staticClass:"btn_cancel btn_back_size mr-2",on:{click:function(t){return e.save(a)}}},[t("b-icon",{attrs:{icon:"content-save"}})],1):e._e()]),t("b-tooltip",{attrs:{label:"取消",type:"is-dark"}},[a.row.edit?t("button",{staticClass:"btn_trash btn_back_size",on:{click:function(t){return e.cancel(a)}}},[t("b-icon",{attrs:{icon:"close-outline"}})],1):e._e()])],1)]}}])})],1),t("b-button",{attrs:{type:"btn_member_add is-flex is-justify-content-center is-align-items-center"},on:{click:function(t){e.addModalActive=!0}}},[t("b-icon",{staticClass:"animate__animated animate__pulse animate__infinite animate__slow",attrs:{icon:"account-plus-outline"}})],1),t("b-modal",{attrs:{active:e.addModalActive},on:{"update:active":function(t){e.addModalActive=t}}},[t("form",{staticClass:"is-flex is-justify-content-center is-align-items-center",on:{submit:function(t){return t.preventDefault(),e.onSubmit.apply(null,arguments)},reset:e.onReset}},[t("div",{staticClass:"modal-card add_modal_size"},[t("header",{staticClass:"modal-card-head"},[t("p",{staticClass:"modal-card-title"},[e._v("Create Account")]),t("button",{staticClass:"delete",attrs:{type:"button"},on:{click:function(t){e.addModalActive=!1}}})]),t("section",{staticClass:"modal-card-body px-6 py-5"},[t("b-field",{attrs:{label:"信箱："}},[t("b-input",{attrs:{type:"email",icon:"account",placeholder:"Please enter valid email address . . .",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),t("b-field",{staticClass:"mb-0",attrs:{label:"密碼："}},[t("b-input",{attrs:{type:"password",icon:"lock","password-reveal":"",placeholder:"Password length must be between 6 and 30 characters . . .",required:"",minlength:"6",maxlength:"30"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),t("b-field",{staticClass:"mb-0",attrs:{label:"暱稱："}},[t("b-input",{attrs:{type:"text",icon:"face-shimmer",placeholder:"Password length must be between 2 and 10 characters . . .",required:"",minlength:"2",maxlength:"10"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),t("b-field",{attrs:{label:"頭像："}},[t("b-radio",{attrs:{name:"avator","native-value":"bear"},model:{value:e.avator,callback:function(t){e.avator=t},expression:"avator"}},[e._v(" Bear ")]),t("b-radio",{attrs:{name:"avator","native-value":"fox"},model:{value:e.avator,callback:function(t){e.avator=t},expression:"avator"}},[e._v(" Fox ")]),t("b-radio",{attrs:{name:"avator","native-value":"deer"},model:{value:e.avator,callback:function(t){e.avator=t},expression:"avator"}},[e._v(" Deer ")]),t("b-radio",{attrs:{name:"avator","native-value":"owl"},model:{value:e.avator,callback:function(t){e.avator=t},expression:"avator"}},[e._v(" Owl ")])],1),t("b-field",{attrs:{label:"權限："}},[t("b-radio",{attrs:{name:"authority","native-value":"管理者"},model:{value:e.authority,callback:function(t){e.authority=t},expression:"authority"}},[e._v(" 管理者 ")]),t("b-radio",{attrs:{name:"authority","native-value":"使用者"},model:{value:e.authority,callback:function(t){e.authority=t},expression:"authority"}},[e._v(" 使用者 ")])],1)],1),t("footer",{staticClass:"modal-card-foot is-justify-content-center is-align-items-center"},[t("button",{staticClass:"button btn_enter",attrs:{type:"submit"}},[e._v("建立")]),t("button",{staticClass:"button btn_cancel",attrs:{type:"reset"}},[e._v("重置")])])])])])],1)])},r=[function(){var e=this,t=e._self._c;return t("nav",{staticClass:"breadcrumb has-bullet-separator"},[t("ul",[t("li",[t("a",{attrs:{href:"#/"}},[e._v("首頁")])]),t("li",[t("a",{attrs:{href:"#/backStage/home"}},[e._v("後台管理")])]),t("li",{staticClass:"is-active"},[t("a",{attrs:{href:"#"}},[e._v("會員管理")])])])])}],s=(a("14d9"),{data(){return{hasMobileCards:!0,email:"",password:"",name:"",avator:"bear",authority:"使用者",users:[],defaultSortDirection:"asc",sortIcon:"arrow-up",sortIconSize:"is-small",addModalActive:!1,isPaginated:!0,isPaginationSimple:!1,isPaginationRounded:!1,paginationPosition:"bottom",currentPage:1,perPage:10}},methods:{onSubmit(){this.axios.post("https://vue-readyourmind.onrender.com/users/",this.$data).then(e=>{e.data.success?(this.$buefy.dialog.alert({title:"Success!",message:"新增成功！",type:"is-danger",hasIcon:!0,icon:"heart-circle"}),this.users.push({_id:e.data.result._id,email:this.email,name:this.name,avator:this.avator,authority:this.authority,model01:this.email,model02:this.name,model03:this.avator,model04:this.authority,number:this.users.length+1,edit:!1}),this.email="",this.password="",this.name="",this.avator="bear",this.authority="使用者",this.addModalActive=!1):this.$buefy.dialog.alert({title:"Error!",message:"發生錯誤！",type:"is-danger",hasIcon:!0,icon:"heart-broken"})}).catch(e=>{this.$buefy.dialog.alert({title:"Error!",message:e.response.data.message,type:"is-danger",hasIcon:!0,icon:"heart-circle"})})},onReset(){this.email="",this.password="",this.name="",this.avator="bear",this.authority="使用者"},cancel(e){e.row.edit=!1,e.row.model01=e.row.email,e.row.model02=e.row.name,e.row.model03=e.row.avator,e.row.model04=e.row.authority},save(e){this.axios.patch("https://vue-readyourmind.onrender.com/users/"+e.row._id,{email:e.row.model01,name:e.row.model02,avator:e.row.model03,authority:e.row.model04}).then(t=>{t.data.success?(e.row.edit=!1,e.row.email=e.row.model01,e.row.name=e.row.model02,e.row.avator=e.row.model03,e.row.authority=e.row.model04,this.$buefy.dialog.alert({title:"Success!",message:"保存成功！",type:"is-danger",hasIcon:!0,icon:"heart-circle"}),this.users[e.index].email=e.row.model01,this.users[e.index].name=e.row.model02,this.users[e.index].avator=e.row.model03,this.users[e.index].authority=e.row.model04):this.$buefy.dialog.alert({title:"Error!",message:"發生錯誤！",type:"is-danger",hasIcon:!0,icon:"heart-broken"})}).catch(e=>{this.$buefy.dialog.alert({title:"Error!",message:e.response.data.message,type:"is-danger",hasIcon:!0,icon:"heart-broken"})})},edit(e){e.row.edit=!0,e.row.email=e.row.model01,e.row.name=e.row.model02,e.row.avator=e.row.model03,e.row.authority=e.row.model04},del(e){this.axios.delete("https://vue-readyourmind.onrender.com/users/"+e.row._id).then(t=>{t.data.success?(this.$buefy.dialog.alert({title:"Success!",message:"刪除成功！",type:"is-danger",hasIcon:!0,icon:"heart-circle"}),this.users.splice(e.index,1)):this.$buefy.dialog.alert({title:"Error!",message:"發生錯誤！",type:"is-danger",hasIcon:!0,icon:"heart-broken"})}).catch(e=>{console.log(e),this.$buefy.dialog.alert({title:"Error!",message:e.response.data.message,type:"is-danger",hasIcon:!0,icon:"heart-circle"})})},confirmCustomDelete(e){this.$buefy.dialog.confirm({title:"Deleting member",message:"你確定要刪除這筆會員資料嗎？",confirmText:"Yes",type:"is-danger",hasIcon:!0,onConfirm:()=>this.axios.delete("https://vue-readyourmind.onrender.com/users/"+e.row._id).then(t=>{if(t.data.success){this.$buefy.dialog.alert({title:"Success!",message:"刪除成功！",type:"is-danger",hasIcon:!0,icon:"heart-circle"});const t=this.users.findIndex(t=>t._id===e.row._id);this.users.splice(t,1)}else this.$buefy.dialog.alert({title:"Error!",message:"發生錯誤！",type:"is-danger",hasIcon:!0,icon:"heart-broken"})}).catch(e=>{console.log(e),this.$buefy.dialog.alert({title:"Error!",message:e.response.data.message,type:"is-danger",hasIcon:!0,icon:"heart-circle"})})})}},mounted(){this.axios.get("https://vue-readyourmind.onrender.com/users/").then(e=>{if(e.data.success){let t=1;this.users=e.data.result.map(e=>(e.edit=!1,e.model01=e.email,e.model02=e.name,e.model03=e.avator,e.model04=e.authority,e.number=t++,e))}else this.$swal({icon:"error",title:"發生錯誤",text:e.data.message})}).catch(e=>{this.$buefy.dialog.alert({title:"Error!",message:e.response.data.message,type:"is-danger",hasIcon:!0,icon:"heart-broken"})})}}),i=s,n=a("2877"),l=Object(n["a"])(i,o,r,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=backMember.0c734ad3.js.map