(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["backKnowledge"],{"8c21":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"back_content"},[e("div",{staticClass:"p-5",attrs:{id:"backKnowledge"}},[t._m(0),e("b-table",{attrs:{data:t.knowledges,paginated:t.isPaginated,"per-page":t.perPage,"current-page":t.currentPage,"pagination-simple":t.isPaginationSimple,"pagination-position":t.paginationPosition,"pagination-rounded":t.isPaginationRounded,striped:"",hoverable:"","mobile-cards":t.hasMobileCards},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}},[e("b-table-column",{attrs:{field:"number",label:"No.",centered:"",width:"100"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("h1",[t._v(t._s(a.row.number))])]}}])}),e("b-table-column",{attrs:{field:"title",label:"標題",width:"300"},scopedSlots:t._u([{key:"default",fn:function(a){return[a.row.edit?e("b-input",{model:{value:a.row.model01,callback:function(e){t.$set(a.row,"model01",e)},expression:"props.row.model01"}}):e("h1",[t._v(t._s(a.row.title))])]}}])}),e("b-table-column",{attrs:{field:"content",label:"內容",width:"800"},scopedSlots:t._u([{key:"default",fn:function(a){return[a.row.edit?e("b-input",{attrs:{type:"textarea"},model:{value:a.row.model02,callback:function(e){t.$set(a.row,"model02",e)},expression:"props.row.model02"}}):e("div",[t._v(t._s(a.row.content))])]}}])}),e("b-table-column",{attrs:{field:"edit",label:"編輯",width:"200"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",[e("b-tooltip",{attrs:{label:"編輯標題 / 內容",type:"is-dark"}},[a.row.edit?t._e():e("button",{staticClass:"btn_cancel btn_back_size mr-2",on:{click:function(e){return t.edit(a)}}},[e("b-icon",{attrs:{icon:"pencil-outline"}})],1)]),e("b-tooltip",{attrs:{label:"刪除小知識",type:"is-dark"}},[a.row.edit?t._e():e("button",{staticClass:"btn_trash btn_back_size",on:{click:function(e){return t.confirmCustomDelete(a,a.index)}}},[e("b-icon",{attrs:{icon:"trash-can-outline"}})],1)])],1),e("div",[e("b-tooltip",{attrs:{label:"保存",type:"is-dark"}},[a.row.edit?e("button",{staticClass:"btn_cancel btn_back_size mr-2",on:{click:function(e){return t.save(a)}}},[e("b-icon",{attrs:{icon:"content-save"}})],1):t._e()]),e("b-tooltip",{attrs:{label:"取消",type:"is-dark"}},[a.row.edit?e("button",{staticClass:"btn_trash btn_back_size",on:{click:function(e){return t.cancel(a)}}},[e("b-icon",{attrs:{icon:"close-outline"}})],1):t._e()])],1)]}}])})],1),e("b-button",{attrs:{type:"btn_Knowledge_add is-flex is-justify-content-center is-align-items-center"},on:{click:function(e){t.addModalActive=!0}}},[e("b-icon",{staticClass:"animate__animated animate__pulse animate__infinite animate__slow",attrs:{icon:"comment-plus"}})],1),e("b-modal",{attrs:{active:t.addModalActive},on:{"update:active":function(e){t.addModalActive=e}}},[e("form",{staticClass:"is-flex is-justify-content-center is-align-items-center",on:{submit:function(e){return e.preventDefault(),t.onSubmit.apply(null,arguments)},reset:t.onReset}},[e("div",{staticClass:"modal-card add_modal_size"},[e("header",{staticClass:"modal-card-head"},[e("p",{staticClass:"modal-card-title"},[t._v("新增")]),e("button",{staticClass:"delete",attrs:{type:"button"},on:{click:function(e){t.addModalActive=!1}}})]),e("section",{staticClass:"modal-card-body px-6 py-5"},[e("b-field",{attrs:{label:"標題："}},[e("b-input",{attrs:{type:"text",placeholder:"Please enter title . . .",required:"","validation-message":"請輸入標題。"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),e("b-field",{staticClass:"mb-0",attrs:{label:"內容："}},[e("b-input",{attrs:{type:"textarea",placeholder:"Please enter content . . .",required:"",minlength:"1",maxlength:"200","validation-message":"請輸入內容。"},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)],1),e("footer",{staticClass:"modal-card-foot is-justify-content-center is-align-items-center"},[e("button",{staticClass:"button btn_enter",attrs:{type:"submit"}},[t._v("新增")]),e("button",{staticClass:"button btn_cancel",attrs:{type:"reset"}},[t._v("重置")])])])])]),e("b-button",{attrs:{type:"btn_Knowledge_pre is-flex is-justify-content-center is-align-items-center"},on:{click:function(e){t.preModalActive=!0}}},[e("b-icon",{staticClass:"animate__animated animate__pulse animate__infinite animate__slow",attrs:{icon:"comment-eye-outline"}})],1),e("b-modal",{attrs:{active:t.preModalActive},on:{"update:active":function(e){t.preModalActive=e}}},[e("div",{staticClass:"is-flex is-justify-content-center is-align-items-center"},[e("div",{staticClass:"modal-card pre_modal_size"},[e("header",{staticClass:"modal-card-head"},[e("p",{staticClass:"modal-card-title"},[t._v("預覽")]),e("button",{staticClass:"delete",attrs:{type:"button"},on:{click:function(e){t.preModalActive=!1}}})]),e("section",{staticClass:"modal-card-body px-6 py-5"},t._l(t.knowledges,(function(a,s){return e("b-collapse",{key:s,staticClass:"card",attrs:{animation:"slide",open:t.isOpen==s},on:{open:function(e){t.isOpen=s}},scopedSlots:t._u([{key:"trigger",fn:function(s){return e("div",{staticClass:"card-header",attrs:{role:"button"}},[e("p",{staticClass:"card-header-title"},[t._v(" "+t._s(a.title)+" ")]),e("a",{staticClass:"card-header-icon"},[e("b-icon",{attrs:{icon:s.open?"menu-down":"menu-up"}})],1)])}}],null,!0)},[e("div",{staticClass:"card-content"},[e("div",{staticClass:"content"},[t._v(" "+t._s(a.content)+" ")])])])})),1)])])])],1)])},i=[function(){var t=this,e=t._self._c;return e("nav",{staticClass:"breadcrumb has-bullet-separator"},[e("ul",[e("li",[e("a",{attrs:{href:"#/"}},[t._v("首頁")])]),e("li",[e("a",{attrs:{href:"#/backStage/home"}},[t._v("後台管理")])]),e("li",[t._v("前台內容管理")]),e("li",{staticClass:"is-active"},[e("a",{attrs:{href:"#"}},[t._v("小知識")])])])])}],n=(a("14d9"),{data(){return{hasMobileCards:!0,title:"",content:"",knowledges:[],isOpen:-1,addModalActive:!1,preModalActive:!1,isPaginated:!0,isPaginationSimple:!1,isPaginationRounded:!1,paginationPosition:"bottom",currentPage:1,perPage:10}},methods:{onSubmit(){this.axios.post("https://vue-readyourmind.onrender.com/knowledges/",this.$data).then(t=>{t.data.success?(this.$buefy.dialog.alert({title:"Success!",message:"新增成功！",type:"is-danger",hasIcon:!0,icon:"heart-circle"}),this.knowledges.push({_id:t.data.result._id,title:this.title,content:this.content,model01:this.title,model02:this.content,edit:!1,number:this.knowledges.length+1}),this.title="",this.content="",this.addModalActive=!1):this.$buefy.dialog.alert({title:"Error!",message:"發生錯誤！",type:"is-danger",hasIcon:!0,icon:"heart-broken"})}).catch(t=>{console.log(t),this.$buefy.dialog.alert({title:"Error!",message:t.response.data.message,type:"is-danger",hasIcon:!0,icon:"heart-circle"})})},onReset(){this.title="",this.content=""},cancel(t){t.row.edit=!1,t.row.model01=t.row.title,t.row.model02=t.row.content},save(t){this.axios.patch("https://vue-readyourmind.onrender.com/knowledges/"+t.row._id,{title:t.row.model01,content:t.row.model02}).then(e=>{e.data.success?(t.row.edit=!1,t.row.title=t.row.model01,t.row.content=t.row.model02,this.$buefy.dialog.alert({title:"Success!",message:"保存成功！",type:"is-danger",hasIcon:!0,icon:"heart-circle"}),this.abouts[t.index].title=t.row.model01,this.abouts[t.index].content=t.row.model02):this.$buefy.dialog.alert({title:"Error!",message:"發生錯誤！",type:"is-danger",hasIcon:!0,icon:"heart-broken"})}).catch(t=>{this.$buefy.dialog.alert({title:"Error!",message:t.response.data.message,type:"is-danger",hasIcon:!0,icon:"heart-broken"})})},edit(t){t.row.edit=!0,t.row.title=t.row.model01,t.row.content=t.row.model02},del(t){this.axios.delete("https://vue-readyourmind.onrender.com/knowledges/"+t.row._id).then(e=>{e.data.success?(this.$buefy.dialog.alert({title:"Success!",message:"刪除成功！",type:"is-danger",hasIcon:!0,icon:"heart-circle"}),this.knowledges.splice(t.index,1)):this.$buefy.dialog.alert({title:"Error!",message:"發生錯誤！",type:"is-danger",hasIcon:!0,icon:"heart-broken"})}).catch(t=>{console.log(t),this.$buefy.dialog.alert({title:"Error!",message:t.response.data.message,type:"is-danger",hasIcon:!0,icon:"heart-circle"})})},confirmCustomDelete(t){this.$buefy.dialog.confirm({title:"Deleting knowledge",message:"你確定要刪除這筆小知識嗎？",confirmText:"Yes",type:"is-danger",hasIcon:!0,onConfirm:()=>this.axios.delete("https://vue-readyourmind.onrender.com/knowledges/"+t.row._id).then(e=>{if(e.data.success){this.$buefy.dialog.alert({title:"Success!",message:"刪除成功！",type:"is-danger",hasIcon:!0,icon:"heart-circle"});const e=this.knowledges.findIndex(e=>e._id===t.row._id);this.knowledges.splice(e,1)}else this.$buefy.dialog.alert({title:"Error!",message:"發生錯誤！",type:"is-danger",hasIcon:!0,icon:"heart-broken"})}).catch(t=>{console.log(t),this.$buefy.dialog.alert({title:"Error!",message:t.response.data.message,type:"is-danger",hasIcon:!0,icon:"heart-circle"})})})}},mounted(){this.axios.get("https://vue-readyourmind.onrender.com/knowledges/").then(t=>{if(t.data.success){let e=1;this.knowledges=t.data.result.map(t=>(t.edit=!1,t.model01=t.title,t.model02=t.content,t.number=e++,t))}else this.$swal({icon:"error",title:"發生錯誤",text:t.data.message})}).catch(t=>{this.$buefy.dialog.alert({title:"Error!",message:t.response.data.message,type:"is-danger",hasIcon:!0,icon:"heart-broken"})})}}),o=n,l=a("2877"),r=Object(l["a"])(o,s,i,!1,null,null,null);e["default"]=r.exports}}]);
//# sourceMappingURL=backKnowledge.d27599f9.js.map