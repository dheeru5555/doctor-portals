(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{a20b8df0ac7cfa325f29:function(e,t,a){"use strict";a.r(t);var n,i=a("8af190b70a6bc55c6f1b"),r=a.n(i),o=a("e95a63b25fb92ed15721"),l=a("6938d226fd372a75cbf9"),c=a("0d7f0986bcd2f33d8a2a"),d=a("1037a6e0d5914309f74c"),s=a.n(d),u=a("ab039aecd4a1d4fedc0e"),p=a("0b3cb19af78752326f59"),m=a("2aea235afd5c55b8b19b"),f=a.n(m),g=a("435859b6b76fb67a754a"),v=a.n(g),b=a("921c0b8c557fe6ba5da8"),y=a.n(b),h=a("9d875bb0756edadf37b2"),w=a.n(h),S=a("ef58856f4f875bd36582"),D=a.n(S),x=a("29df10ef1bee6d38fd67"),_=a.n(x),C=a("2e6789347e39d24a0ca4"),O=a("31814fb44cd61ae46066"),k=a.n(O);function N(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function I(e,t,a,i){n||(n="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),1===o)t.children=i;else if(o>1){for(var l=new Array(o),c=0;c<o;c++)l[c]=arguments[c+3];t.children=l}if(t&&r)for(var d in r)void 0===t[d]&&(t[d]=r[d]);else t||(t=r||{});return{$$typeof:n,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function j(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var a=[],n=!0,i=!1,r=void 0;try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){i=!0,r=e}finally{try{n||null==l.return||l.return()}finally{if(i)throw r}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var R=Object(l.makeStyles)(function(e){return{root:{background:"#fff",border:"1px solid #dedede"},patientDetails:{border:"1px solid #dedede",borderRadius:5,marginBottom:15},column:{display:"flex",flexDirection:"column"},row:{display:"flex",flexDirection:"row"},symptoms:{},table:{margin:0,border:"1px solid rgba(224, 224, 224, 1)"},Medicines:{"& .MuiTableCell-root":{borderBottom:"1px solid rgba(224, 224, 224, 1)",borderRight:"1px solid rgba(224, 224, 224, 1)"}},logo:{display:"flex",justifyContent:"flex-end",alignItems:"center"},footer:{background:"#f5f5f5",padding:"10px 20px",borderRadius:4},RxHeader:{borderBottom:"1px solid #dedede",display:"flex",alignItems:"center",justifyContent:"space-between",margin:"auto",padding:11,background:"white","& p":{margin:0}},navigation:{margin:"auto 0",display:"flex","& span":{width:"2rem",height:"2rem",textAlign:"center",verticalAlign:"middle",border:"1px solid #dedede",borderRadius:5,marginRight:10,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",background:"#eeeeee"}},actions:{height:"100%",background:"#eeeeee",border:"1px solid #dedede","& .MuiButton-startIcon":{marginLeft:0,marginRight:0},"&:hover":{boxShadow:"none"}},RxDatepicker:{border:"1px solid rgba(0, 0, 0, 0.23)",borderRadius:e.spacing(1),"& .MuiFormControl-marginNormal":{margin:0},"& .MuiInput-root":{border:0},"& input":{fontSize:16,width:100},"& .MuiInput-underline:after":{boxShadow:"none",border:"none"}},rightHeader:{display:"flex","& button":{marginRight:e.spacing(1)},"& .MuiIcon-root":{fontSize:"1rem"}}}});function B(e,t,a,n,i,r){return{id:e,name:t,composition:a,frequency:n,duration:i,notes:r}}B(1,"Powder Gudlax","Lactulose(10 gm) + Ispaghula husk(3.5 gm)","0 - 1 - 1","5 Days","After Lunch, After Dinner"),B(2,"Sachet Vitanova D3","Cholecalciferol (Vitamin D3)","3/4 sachet - 6 hourly (O--O--O--O)","3 Days"),B(3,"Syrup Crocin 120","Paracetamol(120 mg)","4 ml - Thrice a day","3 Days"),B(4,"Capsule Rejunex OD","Folic Acid + Methylcobalamin + Pyridoxine + Alpha Lipoic Acid","0 - 1 - 1","Stat","After Lunch, After Dinner"),B(5,"Tablet Novex-DS","Ormeloxifene(60 mg)","1 tablet - 12 hourly (O--O)","3 Days");var P=I(D.a,{},void 0,"file_download"),T=I(D.a,{},void 0,"print"),A=I(D.a,{},void 0,"chevron_left"),F=I(D.a,{},void 0,"chevron_right"),L=I(y.a,{variant:"h6"},void 0,"No Records Found");var M,E=function(e){var t=R(),a=e.prescriptionTemplates.filter(function(e){return null!==e.appointment_rx}),n=j(r.a.useState(1),2),o=n[0],l=n[1],c=Object(i.useRef)(),d=Object(C.useReactToPrint)({content:function(){return c.current}});return r.a.createElement(r.a.Fragment,null,I("div",{className:t.RxHeader},void 0,I("h6",{style:{marginBottom:0}}),I("div",{className:t.rightHeader},void 0,I(k.a,{targetRef:c,filename:"invoice.pdf"},void 0,function(e){var t=e.toPdf;return I(_.a,{title:"Download",arrow:!0},void 0,I(f.a,{variant:"outlined",onClick:t,disabled:0==a.length},void 0,P))}),I(_.a,{title:"Print",arrow:!0},void 0,I(f.a,{variant:"outlined",onClick:d,disabled:0==a.length},void 0,T)),I("div",{},void 0,I(f.a,N({variant:"contained",className:t.button,onClick:function(){o>0&&o<=a.length&&l(o-1)},disabled:1==o,startIcon:A},"className",t.actions)),I(f.a,N({variant:"contained",className:t.button,onClick:function(){o<=a.length&&l(o+1)},disabled:o==a.length||0==a.length,startIcon:F},"className",t.actions))))),0==a.length?I("div",{style:{display:"flex",color:"#e0e0e0",alignItems:"center",justifyContent:"center",flexDirection:"column",height:600}},void 0,I(w.a,{style:{fontSize:120}}),L):r.a.createElement("div",{ref:c},I("div",{style:{width:"100%",border:"1px solid",padding:20,background:"#fff"},dangerouslySetInnerHTML:{__html:a[o-1].appointment_rx}})))},V=(a("02b185abdbff04d8a73d"),a("d7dd51e1bf6bfc2c9c3d")),H=a("17a826745d7905c7f263"),z=a("bcf62943f039319845be"),W=a("0d939196e59ed73c94e6"),U=(a("b5f9e0c375240aeaffec"),a("8a2d1b95e05b6a321e74"),a("e727e731a9bed8ec3c2a")),Y=a.n(U),$=a("eb6b79030a47f0b10efc"),G=a.n($),Q=a("1551459233b95bf53af9"),J=a.n(Q),q=a("ab7ebb4f5c369f043e8f"),K=a.n(q),X=a("7b322cdd2181307222e4");function Z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var a=[],n=!0,i=!1,r=void 0;try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){i=!0,r=e}finally{try{n||null==l.return||l.return()}finally{if(i)throw r}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function ee(){return(ee=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function te(e,t,a,n){M||(M="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,r=arguments.length-3;if(t||0===r||(t={children:void 0}),1===r)t.children=n;else if(r>1){for(var o=new Array(r),l=0;l<r;l++)o[l]=arguments[l+3];t.children=o}if(t&&i)for(var c in i)void 0===t[c]&&(t[c]=i[c]);else t||(t=i||{});return{$$typeof:M,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function ae(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var ne=function(e){return{root:{margin:0,padding:e.spacing(2)},actionButtons:{margin:0,padding:e.spacing(2),display:"flex",justifyContent:"space-between"},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]},Button:{marginLeft:e.spacing(1),marginRight:e.spacing(1)},customButton:{justifyContent:"space-between",background:"none",padding:"15px 0px","&:hover":{background:"inherit"}},textField:{marginLeft:e.spacing(1),marginRight:e.spacing(1),width:150},withoutLabel:{marginBottom:e.spacing(1),marginTop:e.spacing(1)},bold:{fontWeight:700},ml10:{marginLeft:10},mb10:{marginBottom:10},p4:{padding:20}}},ie=te(K.a,{}),re=Object(l.withStyles)(ne)(function(e){var t=e.children,a=e.classes,n=e.onClose,i=ae(e,["children","classes","onClose"]);return r.a.createElement(G.a,ee({disableTypography:!0,className:a.actionButtons},i),te(y.a,{variant:"h6"},void 0,t),te("div",{},void 0,n?te(f.a,{autoFocus:!0,color:"primary",variant:"outlined",onClick:n,"aria-label":"close"},void 0,"Close",ie):null))}),oe=Object(l.withStyles)(function(e){return{root:{padding:e.spacing(2)}}})(J.a),le=te("b",{},void 0,"Medical Problems"),ce=te("b",{},void 0,"Allergies"),de=te("b",{},void 0,"Family History"),se=te("b",{},void 0,"Life Style"),ue=te("b",{},void 0,"Procedures"),pe=te("b",{},void 0,"Risk Factor");Object(l.withStyles)(ne)(function(e){var t=e.classes,a=e.patientMedicalHistory,n=Z(r.a.useState(!1),2),i=n[0],o=n[1],l=function(){o(!1)};return r.a.createElement(r.a.Fragment,null,te(f.a,{variant:"contained",onClick:function(){o(!0)}},void 0,"Medical History"),te("div",{style:{display:"inline-flex"}},void 0,te(Y.a,{onClose:l,fullWidth:!0,maxWidth:"sm","aria-labelledby":"customized-dialog-title",open:i},void 0,te(re,{id:"customized-dialog-title",onClose:l},void 0,"Medical History"),null===a?te(y.a,{component:"p",align:"center",style:{padding:50}},void 0,"No Medical History Found"):te(oe,{dividers:!0},void 0,0!==a.medical_problems_array.length&&null!==a.medical_problems_array&&void 0!==a.medical_problems_array&&te("div",{className:t.mb10},void 0,le,te(y.a,{},void 0,a.medical_problems_array.map(function(e){return"".concat(e.name,", ")}))),0!==a.allergies_array.length&&null!==a.allergies_array&&void 0!==a.allergies_array&&te("div",{className:t.mb10},void 0,ce,te(y.a,{},void 0,a.allergies_array.map(function(e){return"".concat(e.name,", ")}))),0!==a.family_histories_array.length&&null!==a.family_histories_array&&void 0!==a.family_histories_array&&te("div",{className:t.mb10},void 0,de,te(y.a,{},void 0,a.family_histories_array.map(function(e){return"".concat(e.name,", ")}))),0!==a.lifestyles_array.length&&null!==a.lifestyles_array&&void 0!==a.lifestyles_array&&te("div",{className:t.mb10},void 0,se,te(y.a,{},void 0,a.lifestyles_array.map(function(e){return"".concat(e.name,", ")}))),0!==a.procedures_array.length&&null!==a.procedures_array&&void 0!==a.procedures_array&&te("div",{className:t.mb10},void 0,ue,te(y.a,{},void 0,a.procedures_array.map(function(e){return"".concat(e.name,", ")}))),0!==a.risk_factors_array.length&&null!==a.risk_factors_array&&void 0!==a.risk_factors_array&&te("div",{className:t.mb10},void 0,pe,te(y.a,{},void 0,a.risk_factors_array.map(function(e){return"".concat(e.name,", ")})))))))});var me,fe=a("c7fd554010f79f6c0ef8"),ge=a.n(fe),ve=a("16c7abd7abc407b9f247"),be=a.n(ve),ye=a("bc75856162e63311fb97"),he=a.n(ye),we=a("ad4fea5d1d5c5e03445f"),Se=a.n(we),De=a("d18b150bf005d511c70c"),xe=a.n(De),_e=a("8e8be3dfc3937f600de1"),Ce=a.n(_e),Oe=a("b912ecc4473ae8a2ff0b"),ke=a.n(Oe),Ne=a("e799c547a20a503b338f"),Ie=a.n(Ne),je=a("3bddc3aa1d456d6486dd"),Re=a.n(je),Be=a("4dd2a92e69dcbe1bab10");function Pe(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function Te(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?Pe(Object(a),!0).forEach(function(t){Ae(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Pe(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function Ae(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function Fe(e,t,a,n,i,r,o){try{var l=e[r](o),c=l.value}catch(e){return void a(e)}l.done?t(c):Promise.resolve(c).then(n,i)}function Le(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var a=[],n=!0,i=!1,r=void 0;try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){i=!0,r=e}finally{try{n||null==l.return||l.return()}finally{if(i)throw r}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function Me(){return(Me=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function Ee(e,t,a,n){me||(me="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,r=arguments.length-3;if(t||0===r||(t={children:void 0}),1===r)t.children=n;else if(r>1){for(var o=new Array(r),l=0;l<r;l++)o[l]=arguments[l+3];t.children=o}if(t&&i)for(var c in i)void 0===t[c]&&(t[c]=i[c]);else t||(t=i||{});return{$$typeof:me,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function Ve(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var He=function(e){return{root:{margin:0,padding:e.spacing(2)},actionButtons:{margin:0,padding:e.spacing(2),display:"flex",justifyContent:"space-between"},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]},Button:{marginLeft:e.spacing(1),marginRight:e.spacing(1)},customButton:{justifyContent:"space-between",background:"none",padding:"15px 0px","&:hover":{background:"inherit"}},textField:{marginLeft:e.spacing(1),marginRight:e.spacing(1),width:150},withoutLabel:{marginBottom:e.spacing(1),marginTop:e.spacing(1)},bold:{fontWeight:700},ml10:{marginLeft:10},mb10:{marginBottom:10},p4:{padding:10},datePicker:{marginRight:16,display:"inline-block",verticalAlign:"middle",alignItems:"center",border:"1px solid #bdbdbd",background:"#fff",borderRadius:10,"& .MuiInput-root":{border:"none"},"& .MuiInput-underline:after":{border:"none",boxShadow:"none"},"& .MuiIcon-root":{cursor:"pointer",verticalAlign:"-webkit-baseline-middle"}},danger:{background:"#f8d7da",paddingLeft:30,borderRadius:5,marginBottom:5},warning:{background:"#fff3cd",paddingLeft:30,borderRadius:5,marginBottom:5},success:{background:"#d1e7dd",paddingLeft:30,borderRadius:5,marginBottom:5},normal:{paddingLeft:30,borderRadius:5,marginBottom:5},verticalRule:{height:"90%",borderLeft:"5px solid #f5f5f5",position:"absolute",left:"55%",marginLeft:-3,top:"50%",transform:"translate(-50%, -50%)"},secondary:{color:"gray"},divider:{marginTop:e.spacing(1),marginBottom:e.spacing(1)}}},ze=Ee(K.a,{}),We=Object(l.withStyles)(He)(function(e){var t=e.children,a=e.classes,n=e.handleNextDay,i=e.currentDate,o=(e.handleVitalAdd,e.handlePreviousDay),l=e.setCurrentDate,c=e.onClose,d=e.handleOpenNewVitalForm,s=e.openForm,u=Ve(e,["children","classes","handleNextDay","currentDate","handleVitalAdd","handlePreviousDay","setCurrentDate","onClose","handleOpenNewVitalForm","openForm"]);return r.a.createElement(G.a,Me({disableTypography:!0,className:a.actionButtons},u),Ee(y.a,{variant:"h6"},void 0,t),Ee("div",{},void 0,Ee(f.a,{variant:"outlined",className:a.Button,onClick:d},void 0,s?"Back":"Add New Vital"),!s&&Ee("div",{className:a.datePicker},void 0,Ee(D.a,{onClick:function(){return o()}},void 0,"chevron_left"),Ee(ge.a,{id:"date",type:"date",value:i,onChange:function(e){return l(e.target.value)},InputLabelProps:{shrink:!0}}),Ee(D.a,{onClick:function(){return n()}},void 0,"chevron_right")),c?Ee(f.a,{autoFocus:!0,color:"primary",variant:"outlined",onClick:c,"aria-label":"close"},void 0,"Close",ze):null))}),Ue=Object(l.withStyles)(function(e){return{root:{padding:e.spacing(2)}}})(J.a),Ye=Ee(Be.o,{}),$e=Ee(Re.a,{}),Ge=Ee("small",{},void 0,Ee("b",{},void 0,"Vital Name")),Qe=Ee("small",{},void 0,Ee("b",{},void 0,"UOM")),Je=Ee("small",{},void 0,Ee("b",{},void 0,"Green LCL")),qe=Ee("small",{},void 0,Ee("b",{},void 0,"Green UCL")),Ke=Ee("small",{},void 0,Ee("b",{},void 0,"Orange LCL")),Xe=Ee("small",{},void 0,Ee("b",{},void 0,"Orange UCL")),Ze=Ee("small",{},void 0,Ee("b",{},void 0,"Red LCL")),et=Ee("small",{},void 0,Ee("b",{},void 0,"Red UCL"));var tt,at=Object(V.connect)(function(e){return{masterData:e.get("dashboardReducer").masterData}})(Object(l.withStyles)(He)(function(e){var t=e.classes,a=e.isProfile,n=e.patientId,o=e.fetchVitals,l=Le(Object(i.useState)([]),2),c=l[0],d=l[1],s=Le(r.a.useState(!1),2),u=s[0],p=s[1],m=Le(r.a.useState({name:"",uom:"",glcl:"",gucl:"",olcl:"",oucl:"",rlcl:"",rucl:""}),2),g=m[0],b=m[1],h=Le(r.a.useState(!0),2),w=h[0],S=h[1],D=Le(r.a.useState(!1),2),x=D[0],_=D[1],C=Le(r.a.useState(!1),2),O=C[0],k=C[1],N=Le(r.a.useState("".concat((new Date).getFullYear(),"-").concat(((new Date).getMonth()+1).toString().padStart(2,"0"),"-").concat((new Date).getDate().toString().padStart(2,"0"))),2),I=N[0],j=N[1],R=new X.a,B=Le(r.a.useState({isSnackBarOpen:!1,snackBarText:"",snackBarSeverity:"success"}),2),P=B[0],T=B[1],A=function(e,t){"clickaway"!==t&&T({isSnackBarOpen:!1,snackBarText:"",snackBarSeverity:"success"})},F=function(){p(!0)};r.a.useEffect(function(){!function(){x&&(d([]),_(!1)),"".concat((new Date).getFullYear(),"-").concat(((new Date).getMonth()+1).toString().padStart(2,"0"),"-").concat((new Date).getDate().toString().padStart(2,"0"));var e={patient_id:n,date:I};R.ACCOUNTS_URI().get("patients/getVitalsByDate",{params:e}).then(function(e){if(e.data.patient_vital.length>0){var t=e.data.patient_vital;d(t)}}).catch(function(e){return console.log(e)})}()},[w,u,I]);var L=function(e,t,a,n,i,r,o){return e>0&&e<=a?(console.log("Green"),1):e>=n&&e<=i?(console.log("Orange"),2):e>=r?(console.log("Red"),3):void 0},M=(V=regeneratorRuntime.mark(function e(t,a,i,r,o,l,c){var d,s,u,p,m;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return d=t.target,s=d.id,u=d.value,p={vital_id:parseInt(s),value:parseInt(u)},m={patient_id:n,measured_time:I,vitals:p,severity:L(u,0,i,r,o,l)},e.next=5,R.ACCOUNTS_URI().post("patients/addEditVitals",m).then(function(e){e.data.success?S(!w):T({isSnackBarOpen:!0,snackBarText:"Some Error occured",snackBarSeverity:"error"})}).catch(function(e){return console.log("err is",e)});case 5:case"end":return e.stop()}},e)}),H=function(){var e=this,t=arguments;return new Promise(function(a,n){var i=V.apply(e,t);function r(e){Fe(i,a,n,r,o,"next",e)}function o(e){Fe(i,a,n,r,o,"throw",e)}r(void 0)})},function(e,t,a,n,i,r,o){return H.apply(this,arguments)}),E=function(e,t){var a=Te({},g);a[e]=t,b(Te({},a))};var V,H;return 0==c.length?Ye:r.a.createElement(r.a.Fragment,null,a?Ee(Ie.a,{onClick:F},void 0,$e):Ee(f.a,{variant:"contained",onClick:F,style:{marginRight:10}},void 0,"Add Vital"),Ee(Y.a,{fullWidth:!0,"aria-labelledby":"customized-dialog-title",open:u},void 0,Ee(We,{id:"customized-dialog-title",onClose:function(){p(!1),k(!1),o(),j("".concat((new Date).getFullYear(),"-").concat(((new Date).getMonth()+1).toString().padStart(2,"0"),"-").concat((new Date).getDate().toString().padStart(2,"0")))},currentDate:I,setCurrentDate:function(e){console.log(e)},handlePreviousDay:function(){var e=new Date(I);e.setTime(e.getTime()-864e5);var t="".concat(new Date(e).getFullYear(),"-").concat((new Date(e).getMonth()+1).toString().padStart(2,"0"),"-").concat(new Date(e).getDate().toString().padStart(2,"0"));j(t),_(!0)},handleNextDay:function(){var e=new Date(I);e.setTime(e.getTime()+864e5);var t="".concat(new Date(e).getFullYear(),"-").concat((new Date(e).getMonth()+1).toString().padStart(2,"0"),"-").concat(new Date(e).getDate().toString().padStart(2,"0"));j(t),_(!0)},handleVitalAdd:M,handleOpenNewVitalForm:function(){k(!O)},openForm:O},void 0,"Vitals"),O?r.a.createElement(r.a.Fragment,null,Ee("div",{style:{padding:20}},void 0,Ee(v.a,{container:!0,spacing:2},void 0,Ee(v.a,{item:!0,sm:6},void 0,Ge,Ee(he.a,{fullWidth:!0,name:"name",onChange:function(e){return E(e.target.name,e.target.value)},className:t.input,autoComplete:"off",inputProps:{"aria-label":"Description"}})),Ee(v.a,{item:!0,sm:6},void 0,Qe,Ee(he.a,{fullWidth:!0,name:"uom",onChange:function(e){return E(e.target.name,e.target.value)},className:t.input,autoComplete:"off",inputProps:{"aria-label":"Description"}})),Ee(v.a,{item:!0,sm:6},void 0,Je,Ee(he.a,{fullWidth:!0,name:"glcl",type:"number",onChange:function(e){return E(e.target.name,e.target.value)},className:t.input,autoComplete:"off",inputProps:{"aria-label":"Description"}})),Ee(v.a,{item:!0,sm:6},void 0,qe,Ee(he.a,{fullWidth:!0,name:"gucl",type:"number",onChange:function(e){return E(e.target.name,e.target.value)},className:t.input,autoComplete:"off",inputProps:{"aria-label":"Description"}})),Ee(v.a,{item:!0,sm:6},void 0,Ke,Ee(he.a,{fullWidth:!0,name:"olcl",type:"number",onChange:function(e){return E(e.target.name,e.target.value)},className:t.input,autoComplete:"off",inputProps:{"aria-label":"Description"}})),Ee(v.a,{item:!0,sm:6},void 0,Xe,Ee(he.a,{fullWidth:!0,name:"oucl",type:"number",onChange:function(e){return E(e.target.name,e.target.value)},className:t.input,autoComplete:"off",inputProps:{"aria-label":"Description"}})),Ee(v.a,{item:!0,sm:6},void 0,Ze,Ee(he.a,{fullWidth:!0,name:"rlcl",type:"number",onChange:function(e){return E(e.target.name,e.target.value)},className:t.input,autoComplete:"off",inputProps:{"aria-label":"Description"}})),Ee(v.a,{item:!0,sm:6},void 0,et,Ee(he.a,{fullWidth:!0,name:"rucl",type:"number",onChange:function(e){return E(e.target.name,e.target.value)},className:t.input,autoComplete:"off",inputProps:{"aria-label":"Description"}})),Ee(v.a,{item:!0,sm:12,style:{textAlign:"center"}},void 0,Ee(f.a,{color:"primary",variant:"contained",onClick:function(){var e=Te({},g);R.ACCOUNTS_URI().post("appointments/consultation/addNewVital",e).then(function(e){!0===e.data.success?(k(!O),S(!w),T({isSnackBarOpen:!0,snackBarText:"Vital Added Successfully",snackBarSeverity:"success"})):T({isSnackBarOpen:!0,snackBarText:"Error While Adding New Vital",snackBarSeverity:"error"})}).catch(function(){T({isSnackBarOpen:!0,snackBarText:"Internal Server Error",snackBarSeverity:"error"})})}},void 0,"Save"))))):Ee(Ue,{dividers:!0},void 0,Ee(v.a,{container:!0,style:{justifyContent:"space-between",position:"relative"}},void 0,Ee(v.a,{item:!0,sm:12},void 0,c.map(function(e){return Ee(v.a,{container:!0,justify:"space-between",alignItems:"center",className:(a=e.vital_value,e.green_lcl,n=e.green_ucl,i=e.orange_lcl,r=e.orange_ucl,o=e.red_lcl,e.red_ucl,a>0&&a<=n?t.success:a>=i&&a<=r?t.warning:a>=o?t.danger:t.normal)},e.id,Ee(v.a,{item:!0,sm:4},void 0,Ee(y.a,{},void 0,e.name)),Ee(v.a,{item:!0,sm:4},void 0,Ee(be.a,{className:ke()(t.withoutLabel,t.textField),"aria-describedby":"weight-helper-text",style:{float:"right"}},void 0,Ee(he.a,{id:e.id,type:"number",defaultValue:null==e.vital_value?"":e.vital_value,onBlur:function(t){return M(t,e.green_lcl,e.green_ucl,e.orange_lcl,e.orange_ucl,e.red_lcl,e.red_ucl)},endAdornment:Ee(Ce.a,{position:"end"},void 0,Ee(y.a,{variant:"caption",style:{marginRight:5,whiteSpace:"nowrap"}},void 0,"/",e.uom)),inputProps:{"aria-label":"Weight"}}))));var a,n,i,r,o})))),Ee(xe.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:P.isSnackBarOpen,autoHideDuration:2e3,onClose:A},void 0,Ee(function(e){return r.a.createElement(Se.a,Me({elevation:6,variant:"filled"},e))},{severity:P.snackBarSeverity,onClose:A},void 0,P.snackBarText))))})),nt=a("2411adc7ace59bb896d4");function it(e,t,a,n){tt||(tt="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,r=arguments.length-3;if(t||0===r||(t={children:void 0}),1===r)t.children=n;else if(r>1){for(var o=new Array(r),l=0;l<r;l++)o[l]=arguments[l+3];t.children=o}if(t&&i)for(var c in i)void 0===t[c]&&(t[c]=i[c]);else t||(t=i||{});return{$$typeof:tt,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function rt(e,t,a,n,i,r,o){try{var l=e[r](o),c=l.value}catch(e){return void a(e)}l.done?t(c):Promise.resolve(c).then(n,i)}function ot(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var a=[],n=!0,i=!1,r=void 0;try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){i=!0,r=e}finally{try{n||null==l.return||l.return()}finally{if(i)throw r}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var lt=Object(p.default)("div").withConfig({displayName:"PatientProfile__ActionButtons",componentId:"sc-8j1sqo-0"})(["display:flex;justify-content:space-between;margin-bottom:10px;"]),ct=Object(l.makeStyles)(function(e){return{button:{marginLeft:e.spacing(1),marginRight:e.spacing(1)},spaceBetween:{display:"flex",justifyContent:"space-between"},btnLink:{color:"blue",textDecoration:"underline",cursor:"pointer"},profileCard:{display:"flex",alignItems:"center",background:"#fff",border:"1px solid #9090909c",borderRadius:8,padding:10,marginBottom:10},rightcontent:{marginLeft:15,fontSize:14,width:"100%","& h4":{margin:0},"& span":{margin:0}},details:{display:"flex",justifyContent:"space-between",background:"#f2f5f8",color:"#000",padding:"5px 10px",borderRadius:4,marginBottom:5,marginTop:5,fontSize:14,"& .column":{display:"flex",flexDirection:"column","& .heading":{fontSize:11,color:"#a1aab9"},"& .number1":{fontWeight:600}}},vitalsCard:{display:"flex",background:"#fff",border:"1px solid #9090909c",borderRadius:8,padding:15,marginBottom:10,fontSize:14},vitalcontent:{width:"100%","& h4":{margin:0},"& span":{margin:0}},vitalsDetails:{borderRadius:4,height:190,marginTop:7,overflow:"auto","& p":{borderBottom:"1px solid #dedede",paddingBottom:7,paddingTop:7,margin:0,marginRight:5},"& p:lastchild":{borderBottom:"none",paddingBottom:7,paddingTop:7,margin:0},"&::-webkit-scrollbar":{width:8},"&::-webkit-scrollbar-thumb":{borderRadius:12,backgroundColor:"rgba(0,0,0,0)"},"&:hover":{"&::-webkit-scrollbar-thumb":{backgroundColor:"rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.3)"}}},vitalHeader:{display:"flex",justifyContent:"space-between",alignItems:"center"},complaintCard:{display:"flex",background:"#fff",border:"1px solid #9090909c",borderRadius:8,padding:15,marginBottom:10},complaintcontent:{width:"100%","& h4":{margin:0},"& span":{margin:0}},complaintDetails:{borderRadius:8,marginTop:15,maxHeight:110,"& p":{paddingBottom:7,paddingTop:7,margin:0}},complaintHeader:{display:"flex",justifyContent:"space-between",alignItems:"center"},RxHeader:{border:"1px solid #dedede",display:"flex",alignItems:"center",justifyContent:"space-between",margin:"auto",padding:11,background:"white","& p":{margin:0}},navigation:{margin:"auto 0",display:"flex","& span":{width:"2rem",height:"2rem",textAlign:"center",verticalAlign:"middle",border:"1px solid #dedede",borderRadius:5,marginRight:10,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",background:"#eeeeee"}},RxDatepicker:{border:"1px solid rgba(0, 0, 0, 0.23)",borderRadius:e.spacing(1),"& .MuiFormControl-marginNormal":{margin:0},"& .MuiInput-root":{border:0},"& input":{fontSize:16,width:100},"& .MuiInput-underline:after":{boxShadow:"none",border:"none"}},rightHeader:{display:"flex","& button":{marginRight:e.spacing(1)},"& .MuiIcon-root":{fontSize:"1rem"}}}}),dt=it(H.a,{}),st=it(H.a,{}),ut=it("div",{}),pt=it("br",{}),mt=it("b",{},void 0,"Gender"),ft=it("br",{}),gt=it("b",{},void 0,"Age"),vt=it("br",{}),bt=it("b",{},void 0,"Blood group"),yt=it("br",{}),ht=it(W.Typography,{},void 0,"No Records Found"),wt=it(W.Typography,{},void 0,"No Records Found"),St=it("h4",{},void 0,"Chief Complaint"),Dt=it(W.Typography,{},void 0,"No Records Found"),xt=it("h4",{},void 0,"Critical notes"),_t=it(W.Typography,{},void 0,"No Records Found"),Ct=it("h4",{},void 0,"Critical notes"),Ot=it(W.Typography,{},void 0,"No Records Found");t.default=Object(V.connect)(function(e){return{selectedQueueId:e.get("appointmentReducer").selectedQueueId,selectedPatientId:e.get("appointmentReducer").selectedPatientId,masterData:e.get("dashboardReducer").masterData,consultationDetails:e.get("appointmentReducer").consultaitionDetails,patientDetails:e.get("appointmentReducer").patientDetails,imagesOrDocs:e.get("dashboardReducer").imagesOrDocs,billables:e.get("appointmentReducer").billables}},{fetchConsultationDetails:z.e,fetchPatientDetails:z.h,setSelectedQueueId:z.n,setSelectedPatientId:z.m})(Object(u.injectIntl)(function(e){var t=localStorage.getItem("userInfo"),a=JSON.parse(t),n=!!a&&a.frontdesk,i=new X.a,l=ct(),d=Object(o.useHistory)(),u=s.a.name+" - Consult",p=s.a.desc,m=e.location,g=ot(r.a.useState([]),2),b=g[0],y=g[1],h=ot(r.a.useState(!1),2),S=(h[0],h[1],ot(r.a.useState(!0),2)),D=S[0],x=S[1],_="";r.a.useEffect(function(){setTimeout(function(){x(!1)},500),m&&m.state&&m.state.patientId&&(e.setSelectedQueueId(m.state.appointmentId),e.setSelectedPatientId(m.state.patientId),e.fetchPatientDetails(m.state.patientId))},[]),r.a.useEffect(function(){void 0!==m.state.appointmentId&&e.fetchConsultationDetails(m.state.appointmentId)},[]),r.a.useEffect(function(){null==e.patientDetails&&e.fetchPatientDetails(m.state.patientId),C()},[]);var C=function(){var e="".concat((new Date).getFullYear(),"-").concat(((new Date).getMonth()+1).toString().padStart(2,"0"),"-").concat((new Date).getDate().toString().padStart(2,"0")),t={patient_id:m.state.patientId,date:e};i.ACCOUNTS_URI().get("patients/getVitalsByDate",{params:t}).then(function(e){if(e.data.patient_vital.length>0){console.log("jhj");var t=e.data.patient_vital.filter(function(e){return""!==e.value});y(t)}}).catch(function(e){return console.log(e)})};_=e.imagesOrDocs&&e.imagesOrDocs.patient_avatar_prefix_url&&e.patientDetails&&e.patientDetails.avatar&&null!==e.patientDetails.avatar?e.imagesOrDocs.patient_avatar_prefix_url+e.patientDetails.avatar:"https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png";var O=(k=regeneratorRuntime.mark(function t(a){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=new X.a,t.next=3,n.ACCOUNTS_URI().post("appointments/updateCounsultationStatus",{appointment_id:a,consultation_status:"s"}).then(function(t){200===t.status&&!0===t.data.success&&(window.sessionStorage.setItem("selectedQueueId",a),e.setSelectedQueueId(a),d.push("/consult"))}).catch(function(e){console.log("error is:",e)});case 3:case"end":return t.stop()}},t)}),N=function(){var e=this,t=arguments;return new Promise(function(a,n){var i=k.apply(e,t);function r(e){rt(i,a,n,r,o,"next",e)}function o(e){rt(i,a,n,r,o,"throw",e)}r(void 0)})},function(e){return N.apply(this,arguments)});var k,N;return D?dt:null==e.patientDetails?st:it("div",{style:{fontSize:14}},void 0,it(c.Helmet,{},void 0,it("title",{},void 0,u),it("meta",{name:"description",content:p}),it("meta",{property:"og:title",content:u}),it("meta",{property:"og:description",content:p}),it("meta",{property:"twitter:title",content:u}),it("meta",{property:"twitter:description",content:p})),it(lt,{},void 0,ut,it("div",{},void 0,!n&&void 0!==m.state.appointmentId&&4!==e.consultationDetails.appointment_status_id&&3!==e.consultationDetails.appointment_status_id&&6!==e.consultationDetails.appointment_status_id&&r.a.createElement(r.a.Fragment,null,it(f.a,{variant:"contained",style:{marginRight:8},onClick:function(){return O(m.state.appointmentId)}},void 0,9===e.consultationDetails.appointment_status_id?"Resume Consultation":"Start Consultation")))),it(v.a,{container:!0,spacing:2},void 0,it(v.a,{item:!0,sm:5},void 0,it("div",{className:l.profileCard},void 0,it("div",{className:l.Image},void 0,it("img",{src:_,style:{width:150,height:120,objectFit:"cover",borderRadius:8}})),it("div",{className:l.rightcontent},void 0,it("h4",{},void 0,e.patientDetails.first_name," ",e.patientDetails.last_name),it("span",{style:{marginBottom:5}},void 0,e.patientDetails.email),pt,it("span",{},void 0,e.patientDetails.mobile),it("div",{className:l.details},void 0,it("div",{},void 0,mt,ft,it("span",{},void 0,nt.a.genderName(e.patientDetails.gender))),it("div",{},void 0,gt,vt,it("span",{},void 0,nt.a.getAge(e.patientDetails.dob))),it("div",{},void 0,bt,yt,it("span",{},void 0,nt.a.bloodGroup(e.patientDetails.blood_group_id)))))),""!==localStorage.getItem("selectedTag")&&null!==localStorage.getItem("selectedTag")&&JSON.parse(localStorage.getItem("selectedTag")).access_array.includes("vitals")&&it("div",{className:l.vitalsCard},void 0,it("div",{className:l.vitalcontent},void 0,it("div",{className:l.vitalHeader},void 0,it("h4",{},void 0,"Vitals",it("small",{style:{fontSize:10,color:"green",fontWeight:500,marginLeft:5}},void 0,"".concat((new Date).getFullYear(),"-").concat(((new Date).getMonth()+1).toString().padStart(2,"0"),"-").concat((new Date).getDate().toString().padStart(2,"0")))),it(at,{patientId:m.state.patientId,fetchVitals:C,isProfile:!0})),it("div",{className:l.vitalsDetails},void 0,0!==b.length?r.a.createElement(r.a.Fragment,null,b.map(function(e){return r.a.createElement(r.a.Fragment,null,it("p",{className:l.spaceBetween},void 0,it("span",{},void 0,e.name,"(/",e.uom,")"),it("span",{},void 0,e.vital_value)))})):it("div",{className:l.complaintDetails},void 0,it("div",{style:{display:"flex",color:"#e0e0e0",alignItems:"center",justifyContent:"center"}},void 0,it(w.a,{style:{fontSize:80}}),ht))))),!n&&it("div",{className:l.vitalsCard},void 0,it("div",{className:l.vitalcontent},void 0,it("div",{className:l.vitalHeader},void 0,it("h4",{},void 0,"Vitals",it("small",{style:{fontSize:10,color:"green",fontWeight:500,marginLeft:5}},void 0,"".concat((new Date).getFullYear(),"-").concat(((new Date).getMonth()+1).toString().padStart(2,"0"),"-").concat((new Date).getDate().toString().padStart(2,"0")))),it(at,{patientId:m.state.patientId,fetchVitals:C,isProfile:!0})),it("div",{className:l.vitalsDetails},void 0,0!==b.length?r.a.createElement(r.a.Fragment,null,b.map(function(e){return r.a.createElement(r.a.Fragment,null,it("p",{className:l.spaceBetween},void 0,it("span",{},void 0,e.name,"(/",e.uom,")"),it("span",{},void 0,e.vital_value)))})):it("div",{className:l.complaintDetails},void 0,it("div",{style:{display:"flex",color:"#e0e0e0",alignItems:"center",justifyContent:"center"}},void 0,it(w.a,{style:{fontSize:80}}),wt))))),void 0!==m.state.appointmentId&&it("div",{className:l.complaintCard},void 0,it("div",{className:l.complaintcontent},void 0,it("div",{className:l.complaintHeader},void 0,St),it("div",{className:l.complaintDetails},void 0,null!==e.consultationDetails.chief_complaint&&""!==e.consultationDetails.chief_complaint?e.consultationDetails.chief_complaint:it("div",{style:{display:"flex",color:"#e0e0e0",alignItems:"center",justifyContent:"center"}},void 0,it(w.a,{style:{fontSize:80}}),Dt)))),""!==localStorage.getItem("selectedTag")&&null!==localStorage.getItem("selectedTag")&&JSON.parse(localStorage.getItem("selectedTag")).access_array.includes("critical_notes")&&it("div",{className:l.complaintCard},void 0,it("div",{className:l.complaintcontent},void 0,it("div",{className:l.complaintHeader},void 0,xt),it("div",{className:l.complaintDetails},void 0,""!==e.patientDetails.critical_note&&null!==e.patientDetails.critical_note?e.patientDetails.critical_note:it("div",{style:{display:"flex",color:"#e0e0e0",alignItems:"center",justifyContent:"center"}},void 0,it(w.a,{style:{fontSize:80}}),_t)))),!n&&it("div",{className:l.complaintCard},void 0,it("div",{className:l.complaintcontent},void 0,it("div",{className:l.complaintHeader},void 0,Ct),it("div",{className:l.complaintDetails},void 0,""!==e.patientDetails.critical_note&&null!==e.patientDetails.critical_note?e.patientDetails.critical_note:it("div",{style:{display:"flex",color:"#e0e0e0",alignItems:"center",justifyContent:"center"}},void 0,it(w.a,{style:{fontSize:80}}),Ot))))),it(v.a,{item:!0,sm:7},void 0,it("div",{style:{background:"#fff",border:"1px solid #dedede"}},void 0,it(E,{prescriptionTemplates:e.patientDetails.appointments})))))}))}}]);