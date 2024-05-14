"use strict";(self["webpackChunknew_mirna"]=self["webpackChunknew_mirna"]||[]).push([[149],{8576:function(e,l,a){a.d(l,{Z:function(){return v}});a(560);var t=a(6252),n=a(3577),i=a(2262);const o={class:"d-flex justify-space-between mb-2"},s={class:"mt-1 d-flex align-center"},u={key:0,class:"mr-2"},r={key:1,class:""},c={key:0,class:"d-flex align-center"};var d={__name:"DisplayTable",props:["table","useSearch","expresstablestyle"],emits:["select_miRNA_name"],setup(e,{emit:l}){const a=(0,i.iH)(25),d=e,m=l,v=(0,i.iH)(!1),p=(0,i.iH)([]),g=(0,i.iH)([]),f=(0,i.iH)([]),h=(0,i.iH)(""),w=(0,i.iH)(""),b=async()=>{const e=d.table;if(0===e.headers.length)return;p.value.length=0;let l=[];e.showCheckBox&&(v.value=!0);for(let a=0;e.body.length>a;a++){let t=-1;l[a]=[];for(let n=0;e.headers.length>n;n++){let i,o=-1;if(o=e.headers[n].indexOf("LSMean"),o>-1?(t++,i="lsmean"+t):i=e.headers[n].split(/\s/).join("").trim(),0===a){const l=e.headers[n].split(""),a=l.splice(0,1),s=a[0].toUpperCase(),u=s+l.join("");g.value.push({title:u,align:"center",sortable:!0,key:-1===o?i:"lsmean"+t})}l[a][i]||(l[a][i]=e.body[a][n])}}for(let a=0;g.value.length>a;a++)"condition"===g.value[a].key&&(l=l.sort(((e,l)=>{const a=e["condition"].toLowerCase(),t=l["condition"].toLowerCase();if(a<t)return-1})));for(let a=0;l.length>a;a++){const e=Object.keys(l[a]);for(let t=0;e.length>t;t++)if("Samplename"!==e[t]&&"condition"!==e[t]&&"microRNAID"!==e[t]&&"Up_Down"!==e[t]&&"significant"!==e[t]&&"Log2Ratio"!==e[t]&&"Ratio"!==e[t]){const[n,i]=l[a][e[t]].split("E").map(Number);if(void 0!==i&&0!==i)l[a][e[t]]=Number(l[a][e[t]]).toExponential(2);else{const i=Math.round(100*Number(n))/100;if(i>0)l[a][e[t]]=i;else{const n=Number(l[a][e[t]]).toExponential(2);0===Number(n)?l[a][e[t]]=0:l[a][e[t]]=n}}}}if(l.length>=20){const e=window.innerHeight,l="number"===typeof d.expresstablestyle?d.expresstablestyle:0;h.value=Math.ceil((e-330-l)/e*100)+"vh"}f.value=l},_=()=>{const e=[];p.value.forEach((l=>{e.push(l.microRNAID)})),m("select_miRNA_name",e)},y=()=>{p.value.length=0,m("select_miRNA_name",[])},x=(e,l,a)=>null!=e&&null!=l&&"string"===typeof e&&-1!==a.columns.microRNAID.indexOf(l)&&-1!==e.toString().toLocaleUpperCase().indexOf(l);return(0,t.YP)(d.table,(()=>{g.value.length=0,f.value.length=0,b()})),(0,t.bv)((()=>{f.value.length>0||b()})),(e,l)=>{const i=(0,t.up)("v-icon"),m=(0,t.up)("v-btn"),b=(0,t.up)("v-text-field"),S=(0,t.up)("v-data-table");return(0,t.wg)(),(0,t.iD)("div",null,[(0,t._)("div",o,[(0,t._)("div",s,[v.value?((0,t.wg)(),(0,t.iD)("div",u,[(0,t.Wm)(m,{color:"teal",density:"comfortable",onClick:_},{default:(0,t.w5)((()=>[(0,t.Wm)(i,{icon:"fa:fas fa-image",style:{"font-size":"16px"}})])),_:1})])):(0,t.kq)("",!0),v.value?((0,t.wg)(),(0,t.iD)("div",r,[(0,t.Wm)(m,{color:"primary",class:"text-none",density:"comfortable",onClick:y,disabled:0===p.value.length},{default:(0,t.w5)((()=>[(0,t.Uk)(" Reset ")])),_:1},8,["disabled"])])):(0,t.kq)("",!0)]),d.useSearch?((0,t.wg)(),(0,t.iD)("div",c,[(0,t.Wm)(i,{icon:"fa:fas fa-magnifying-glass mr-3"}),!0!==d.closeSearch?((0,t.wg)(),(0,t.j4)(b,{key:0,modelValue:w.value,"onUpdate:modelValue":l[0]||(l[0]=e=>w.value=e),variant:"solo-filled",label:"MicroRNA ID search","hide-details":"",style:{width:"300px"},"single-line":"",density:"compact"},null,8,["modelValue"])):(0,t.kq)("",!0)])):(0,t.kq)("",!0)]),(0,t.Wm)(S,{"items-per-page":a.value,"onUpdate:itemsPerPage":l[1]||(l[1]=e=>a.value=e),"fixed-header":"",items:f.value,headers:g.value,search:w.value,"onUpdate:search":l[2]||(l[2]=e=>w.value=e),"item-value":"Sample name",height:h.value,"show-select":v.value,"return-object":"",class:"elevation-1","custom-filter":x,modelValue:p.value,"onUpdate:modelValue":l[3]||(l[3]=e=>p.value=e)},{"item.Ratio":(0,t.w5)((({item:e})=>[(0,t._)("div",null,[(0,t._)("p",{style:(0,n.j5)({color:Number(e.Log2Ratio)>=0?"#D32F2F":"#2962FF"})},(0,n.zw)(Math.abs(e.Ratio)>.001?e.Ratio.toLocaleString("en-US"):e.Ratio),5)])])),"item.Log2Ratio":(0,t.w5)((({item:e})=>[(0,t._)("div",null,[(0,t._)("p",{style:(0,n.j5)({color:Number(e.Log2Ratio)>=0?"#D32F2F":"#2962FF"})},(0,n.zw)(Math.abs(e.Log2Ratio)>.01?e.Log2Ratio.toLocaleString("en-US"):e.Log2Ratio),5)])])),"item.Totalreads":(0,t.w5)((({item:e})=>[(0,t._)("div",null,(0,n.zw)(e.Totalreads.toLocaleString("en-US")),1)])),"item.Totalalignmentsreads":(0,t.w5)((({item:e})=>[(0,t._)("div",null,(0,n.zw)(e.Totalalignmentsreads.toLocaleString("en-US")),1)])),"item.Totalunalignedreads":(0,t.w5)((({item:e})=>[(0,t._)("div",null,(0,n.zw)(e.Totalunalignedreads.toLocaleString("en-US")),1)])),"item.Totalunique":(0,t.w5)((({item:e})=>[(0,t._)("div",null,(0,n.zw)(e.Totalunique.toLocaleString("en-US")),1)])),"item.Foldchange":(0,t.w5)((({item:e})=>[(0,t._)("div",null,(0,n.zw)(e.Foldchange.toLocaleString("en-US")),1)])),"item.lsmean0":(0,t.w5)((({item:e})=>[(0,t._)("div",null,(0,n.zw)(e.lsmean0.toLocaleString("en-US")),1)])),"item.lsmean1":(0,t.w5)((({item:e})=>[(0,t._)("div",null,(0,n.zw)(e.lsmean1.toLocaleString("en-US")),1)])),_:1},8,["items-per-page","items","headers","search","height","show-select","modelValue"])])}}};const m=d;var v=m},6149:function(e,l,a){a.r(l),a.d(l,{default:function(){return h}});var t=a(6252),n=a(2649),i=a(6385),o=a(2328),s=a(447),u=(a(560),a(3577)),r=a(2262),c=a(8576);const d={class:"d-flex align-center"};var m={__name:"MiRNATabs",props:["export_miRNA_Name"],setup(e){const l=(0,r.iH)([]),a=new n.x,o=(0,r.iH)(""),m=(0,r.iH)([]),v=(0,r.iH)({});s.c.transferMeg$.pipe((0,i.R)(a)).subscribe((e=>{l.value=e.tabs,o.value=e.tabs[0],m.value=e.tabsTable,g(e.tabsTable[0])}));const p=e=>{e>m.value.length||e<0||g(m.value[e])},g=e=>{v.value=e},f=()=>{const e=[],l=JSON.parse(JSON.stringify(m.value));for(let a=0;l.length>a;a++){const t=[];t.push(l[a].headers);for(let e=0;l[a].body.length>e;e++)t.push(l[a].body[e]);e.push(t)}s.c.exportXlsx(e,"readAndAlignment")};return(e,a)=>{const n=(0,t.up)("v-tab"),i=(0,t.up)("v-tabs"),s=(0,t.up)("v-icon"),r=(0,t.up)("v-window-item"),m=(0,t.up)("v-window"),g=(0,t.up)("v-card-text"),h=(0,t.up)("v-card");return(0,t.wg)(),(0,t.j4)(h,null,{default:(0,t.w5)((()=>[(0,t._)("div",d,[(0,t.Wm)(i,{modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=e=>o.value=e),color:"primary"},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(l.value,((e,l)=>((0,t.wg)(),(0,t.j4)(n,{class:"text-none",value:e,key:l,onClick:e=>p(l)},{default:(0,t.w5)((()=>[(0,t.Uk)((0,u.zw)(e),1)])),_:2},1032,["value","onClick"])))),128))])),_:1},8,["modelValue"]),(0,t._)("div",{class:"download_xlsx ml-auto",onClick:f},[(0,t.Wm)(s,{icon:"fa:fas fa-file-arrow-down",class:"mr-5 text-teal",style:{"font-size":"24px"}})])]),(0,t.Wm)(g,null,{default:(0,t.w5)((()=>[(0,t.Wm)(m,{modelValue:o.value,"onUpdate:modelValue":a[1]||(a[1]=e=>o.value=e)},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(l.value,((e,l)=>((0,t.wg)(),(0,t.j4)(r,{key:l,value:e},{default:(0,t.w5)((()=>[(0,t.Wm)(c.Z,{table:v.value,useSearch:!1},null,8,["table"])])),_:2},1032,["value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1})}}};const v=m;var p=v,g={__name:"ReadPage",setup(e){const l=(0,r.iH)("readAndAlignment"),a=new n.x;return s.c.ReadAlignmentSubject$.pipe((0,i.R)(a),(0,o.b)(100)).subscribe((e=>{s.c.transferHandleFinishMeg(e)})),(e,a)=>((0,t.wg)(),(0,t.iD)("div",null,[(0,t.Wm)(p,{class:"px-2 mt-3",export_miRNA_Name:l.value},null,8,["export_miRNA_Name"])]))}};const f=g;var h=f}}]);
//# sourceMappingURL=149.c2ef7109.js.map