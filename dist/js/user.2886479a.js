(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user"],{"0ffc":function(e,r,t){},"1e80":function(e,r,t){},"386e":function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"login-container"},[t("h2",{staticClass:"login-title"},[e._v("项目管理系统")]),t("a-form-model",{ref:"ruleForm",staticClass:"login-form",attrs:{model:e.form,rules:e.rules,"label-col":e.labelCol,"wrapper-col":e.wrapperCol}},[t("h2",{staticClass:"title"},[e._v("用户注册 REGISTER")]),t("a-form-model-item",{ref:"name",attrs:{label:"姓名",prop:"name"}},[t("a-input",{staticClass:"inputBox",model:{value:e.form.name,callback:function(r){e.$set(e.form,"name",r)},expression:"form.name"}},[t("img",{attrs:{slot:"prefix",src:e.user,alt:""},slot:"prefix"})])],1),t("a-form-model-item",{ref:"username",attrs:{label:"用户名",prop:"username"}},[t("a-input",{staticClass:"inputBox",model:{value:e.form.username,callback:function(r){e.$set(e.form,"username",r)},expression:"form.username"}},[t("img",{attrs:{slot:"prefix",src:e.user,alt:""},slot:"prefix"})])],1),t("a-form-model-item",{ref:"password",attrs:{label:"密码",prop:"password"}},[t("a-input-password",{staticClass:"inputBox",model:{value:e.form.password,callback:function(r){e.$set(e.form,"password",r)},expression:"form.password"}},[t("img",{attrs:{slot:"prefix",src:e.mima,alt:""},slot:"prefix"})])],1),t("a-form-model-item",{attrs:{"wrapper-col":{span:14,offset:4}}},[t("a-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v(" 提交 ")]),t("a-button",{staticStyle:{"margin-left":"10px"},on:{click:e.toLogin}},[e._v(" 返回 ")])],1)],1)],1)},s=[],n=(t("96cf"),t("1da1")),o=t("c121"),i=t.n(o),u=t("bde0"),c=t.n(u),l={data:function(){var e=this,r=function(e,r,t){""===r?t(new Error("请输入姓名")):t()},t=function(r,t,a){""===t?a(new Error("请输入用户名2")):e.CheckRegisterInfo("username",t,(function(e){e?a():a(new Error("用户名已经存在2"))}))},a=function(e,r,t){var a=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;""===r?t(new Error("密码不可为空")):(a.test(r)||t(new Error("密码必须同时包含大写字母、小写字母和数字")),(r.length<8||r.length>30)&&t(new Error("密码长度8-30位"))),t()};return{user:i.a,mima:c.a,labelCol:{span:4},wrapperCol:{span:14},form:{name:"",username:"",password:""},rules:{name:[{required:!0,validator:r,trigger:"blur"}],username:[{required:!0,validator:t,trigger:"blur"}],password:[{required:!0,validator:a,trigger:"blur"}]}}},methods:{onSubmit:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:e.$refs.ruleForm.validate(function(){var r=Object(n["a"])(regeneratorRuntime.mark((function r(t){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!t){r.next=7;break}return r.next=3,e.$WebApi["user"].register(e.form);case 3:a=r.sent,"success"===a?(e.$message.success("注册成功, 为您跳转登录"),e.$router.push({name:"Login"})):e.$message.error("注册失败"+a),r.next=9;break;case 7:return console.log("error submit!!"),r.abrupt("return",!1);case 9:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},resetForm:function(){this.$refs.ruleForm.resetFields()},toLogin:function(){this.$router.push({name:"Login"})},CheckRegisterInfo:function(e,r,t){var a=this;return Object(n["a"])(regeneratorRuntime.mark((function s(){var n;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if("username"!==e){s.next=5;break}return s.next=3,a.$WebApi["user"].checkUsername({username:r});case 3:n=s.sent,t("success"===n);case 5:case"end":return s.stop()}}),s)})))()}}},m=l,f=(t("a620"),t("2877")),p=Object(f["a"])(m,a,s,!1,null,null,null);r["default"]=p.exports},"71a8":function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"login-container"},[t("h2",{staticClass:"login-title"},[e._v("项目管理系统")]),t("a-form-model",{ref:"ruleForm",staticClass:"login-form",attrs:{model:e.form,rules:e.rules,"label-col":e.labelCol,"wrapper-col":e.wrapperCol}},[t("h2",{staticClass:"title"},[e._v("用户注册 REGISTER")]),t("a-form-model-item",{ref:"username",attrs:{label:"用户名",prop:"username"}},[t("a-input",{model:{value:e.form.username,callback:function(r){e.$set(e.form,"username",r)},expression:"form.username"}},[t("img",{attrs:{slot:"prefix",src:e.user,alt:""},slot:"prefix"})])],1),t("a-form-model-item",{ref:"password",attrs:{label:"密码",prop:"password"}},[t("a-input-password",{model:{value:e.form.password,callback:function(r){e.$set(e.form,"password",r)},expression:"form.password"}},[t("img",{attrs:{slot:"prefix",src:e.mima,alt:""},slot:"prefix"})])],1),t("a-form-model-item",{attrs:{"wrapper-col":{span:14,offset:4}}},[t("a-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v(" 提交 ")]),t("a-button",{staticStyle:{"margin-left":"10px"},on:{click:e.toRegister}},[e._v(" 注册 ")])],1)],1)],1)},s=[],n=(t("b0c0"),t("96cf"),t("1da1")),o=t("c121"),i=t.n(o),u=t("bde0"),c=t.n(u),l={data:function(){return{user:i.a,mima:c.a,labelCol:{span:4},wrapperCol:{span:14},form:{username:"",password:""},rules:{username:[{required:!0,message:"用户名不可为空",trigger:"blur"}],password:[{required:!0,message:"密码不可为空",trigger:"blur"}]}}},methods:{onSubmit:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:e.$refs.ruleForm.validate(function(){var r=Object(n["a"])(regeneratorRuntime.mark((function r(t){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!t){r.next=7;break}return r.next=3,e.$WebApi["user"].login(e.form);case 3:a=r.sent,a.token&&(e.$ls.set("ACCESS_TOKEN","Bearer "+a.token),e.$router.push({name:"Home"}),e.$store.commit("SET_USER_INFO",a.user),e.$message.success("欢迎回来"+a.user.name)),r.next=9;break;case 7:return e.$message.error("登录失败"),r.abrupt("return",!1);case 9:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})))()},resetForm:function(){this.$refs.ruleForm.resetFields()},toRegister:function(){this.$router.push({name:"Register"})}}},m=l,f=(t("939a"),t("2877")),p=Object(f["a"])(m,a,s,!1,null,null,null);r["default"]=p.exports},"939a":function(e,r,t){"use strict";t("1e80")},a620:function(e,r,t){"use strict";t("0ffc")},bde0:function(e,r){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAbCAYAAAB4Kn/lAAABkUlEQVRIie3Vv0tVcRjH8de93gyEwkDIFCQll4aGtLYmhxaXJotwqkGX/gaXIGhoiGioxeFqUwSXG9EohC5SEJJGgqBEUGqhk92s4XsOnO6P4z1XRz/L8z3ny/N+vuc5n/OcXLFUdoAKGMAZtOE7VrGflpRP2evGc2xhBQt4h8/YxDNcyAq+hEXcwak6+524iyVMNAvuwdsoitY30IUTUdHHqKAdTzHZDPghzmIPt3Edr4THr+Aj7mEEv6KcR7iYBu7FWLS+hZk6hWPN4Sb+4iQepIFHhTc/j5cp0FhvUEzkxu2rAQ9F8XUT0Fj38Qc5oYUIHk2qP4prGcDLGBec8qEROK6Yav46mq2+Ud2K0xmBDRWfOIdzgk8Jn/BAk4xd/E5c76CSK5bK7YILLh/BQeEbhvMYPEIoYcZcK/i/z1N4Itgnq66gLLQ3X+2KafxoAUqYKV/RR60rstqsodLm8TH4GBx09RCsHuG/iNqx+QLrWvNzNzqS4A38FAZ1G863AE1qH58K2BaG0PAhgbG+4P0/HgtFJi4cGN8AAAAASUVORK5CYII="},c121:function(e,r){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAbCAYAAACX6BTbAAACQUlEQVRIiaXWS4iPURjH8c/8ZwxGaiTRyGWDDY2sUKJcVsptkJKUlLIYC5eFklLIQpOFiUIWCFkwkVzKgpCFyw4RFm6hhEQGi3Nec7ze/ztj5rc5zznnOd//cy7P839rjnWc142GYh7GoQ4vcCm2paormRuFnViB2oL5q9iIe9UAlSrjs/EAK6uAM587WFcNXhT5FJxDQ+x/xnHcwg9MxCqMiOv34wNOdQevxdEEfB3L8TLntwPtws5qcADX8DZ1yh/LwhgZPMH8AnC2m9XCxUIj1ued8vCWxN6OjwXgTJ3YlPSXdgdvTuyOEnCmB3gW7QnoXwYfFNuvyqNO9TphDUon8vBPsR2IIT2Ej4xtJ76UwW8n9uIegKcIyQZ38a0MfiKxt2FYCbgObVXWFsKvCu8VRuMixhaAG3EaM2L/DQ4V/XqqX1gjZOMwYdsPcSaOdWISlum6k+9CMv3zAIrS/yk240js1wvFa0WBLyFTrxRN5I+lFrsUbLFErcIRDc5PpJH3w0ksyvncx2Whfv9AE2Zhmq6K2SLU+zl4VwRvz4FvCOl9s0rE44V6vyT2m3EWM2MQf45loXCRmfZEp2pgeBQjbsXPODYdWzOHSox+d7LoILYIL6Mn2hf9M23C8Aw+Vyg68BwbeghNtVfIUEJ9WZvB0zLbJhSt/9VPf+9+QQafmgx2+ylQogviRWIyGioYkzg86QP8M15Fuw5NFQyIA526br23ep/Y9RXhD1nS9kWHhQBv4XFN/OIaqHcXWaQ/rN8cIHKbgEVfDwAAAABJRU5ErkJggg=="}}]);
//# sourceMappingURL=user.2886479a.js.map