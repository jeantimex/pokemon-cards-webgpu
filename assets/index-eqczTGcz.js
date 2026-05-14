(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();function R(n){const e=n.startsWith("/")?n.slice(1):n;return new URL(e,document.baseURI).href}function Oe(){const n=document.documentElement.style;n.setProperty("--asset-grain",`url(${R("img/grain.webp")})`),n.setProperty("--asset-glitter",`url(${R("img/glitter.png")})`),n.setProperty("--asset-cosmos-bottom",`url(${R("img/cosmos-bottom.png")})`),n.setProperty("--asset-cosmos-middle-trans",`url(${R("img/cosmos-middle-trans.png")})`),n.setProperty("--asset-cosmos-top-trans",`url(${R("img/cosmos-top-trans.png")})`),n.setProperty("--asset-illusion",`url(${R("img/illusion.png")})`),n.setProperty("--asset-illusion-mask",`url(${R("img/illusion-mask.png")})`),n.setProperty("--asset-geometric",`url(${R("img/geometric.png")})`),n.setProperty("--asset-trainerbg",`url(${R("img/trainerbg.png")})`),n.setProperty("--asset-vmaxbg",`url(${R("img/vmaxbg.jpg")})`),n.setProperty("--asset-ancient",`url(${R("img/ancient.png")})`)}function De(n){const e=new URL(n);return R(`cards${e.pathname}`)}function we(n,e,t){var o,c;const r=n.rarity.toLowerCase(),i=n.number.toLowerCase().startsWith("sv");return t==="reverse-holo"?`${r} reverse holo`:e==="Shiny Vault"&&i?r==="rare holo vmax"||(o=n.subtypes)!=null&&o.includes("VMAX")?"rare shiny vmax":r==="rare holo v"||(c=n.subtypes)!=null&&c.includes("V")?"rare shiny v":"rare shiny":e==="VMax (Alternate/Rainbow)"?"rare rainbow alt":r}const Ge={"amazing rare":{etch:"etched",style:"swsecret"},"rare holo cosmos":{etch:"holo",style:"cosmos"},"rare holo":{etch:"holo",style:"swholo"},"rare holo v":{etch:"holo",style:"sunpillar"},"rare holo vmax":{etch:"etched",style:"sunpillar"},"rare holo vstar":{etch:"etched",style:"sunpillar"},"rare ultra":{etch:"etched",style:"sunpillar"},"rare secret":{etch:"etched",style:"swsecret"},"rare rainbow":{etch:"etched",style:"swsecret"},"rare shiny":{etch:"etched",style:"sunpillar"},"rare shiny v":{etch:"etched",style:"sunpillar"},"rare shiny vmax":{etch:"etched",style:"swsecret"}};function $e(n,e){var t;return e.endsWith("reverse holo")?{etch:"holo",style:"reverse"}:e==="trainer gallery rare holo"?{etch:"holo",style:"rainbow"}:e==="rare holo v"?{etch:n.number.match(/^[tg]g/i)?"etched":"holo",style:"sunpillar"}:e==="rare rainbow alt"?{etch:"etched",style:(t=n.subtypes)!=null&&t.includes("VMAX")?"swsecret":"sunpillar"}:Ge[e]??null}function N(n,e,t,r){const i=we(n,t,r),o=i==="trainer gallery rare holo"?"rare holo":i,v=o==="rare holo"&&(i==="trainer gallery rare holo"||n.number.match(/^[tg]g/i))?{etch:"holo",style:"rainbow"}:$e(n,o);if(!v)return"";const m=n.number.toString().toLowerCase().replace("swsh","").padStart(3,"0"),s=n.set.toString().toLowerCase().replace(/(tg|gg|sv)/,""),d=(v==null?void 0:v.etch)??"holo",g=(v==null?void 0:v.style)??"cosmos";return R(`foils/${s}/${e}/upscaled/${m}_foil_${d}_${g}_2x.webp`)}function S(n,e,t,r="standard"){return{name:n,description:e,cards:t,variant:r}}function Ie(n){return S("Common & Uncommon","All cards get a 3d rotation with CSS based on the cursor position. The default basic non-holo cards simply apply a flare/glare effect.",n.slice(1,4))}function He(n){return S("Galaxy/Cosmos Holofoil","Special image background of a galaxy effect with a gradient rainbow set to color-dodge & color-burn on top.",n.slice(13,16))}function We(n){return S("Holofoil Amazing Rare","Unique shiny foil that extends past the frame and is much shinier than a regular holo effect, and textured.",n.slice(76,85))}function Ne(n){return S("Holofoil Rare","Holo cards have an additional vertical beam holo effect. This uses a combintation of repeating gradients and filters.",n.slice(7,13))}function Ye(n){return S("Trainer Gallery Holofoil","Kind of metallic effect with iridescent shine. Achieved with a large color dodge linear gradient.",n.filter(e=>e.rarity.toLowerCase()==="trainer gallery rare holo").sort((e,t)=>e.name.localeCompare(t.name)))}function Xe(n){const e=n.find(t=>t.id==="swsh12pt5-160");return S("Secret Rare (Gold)","GOLD! Here we apply two glitter layers on top of each other with a overlay effect and slide the two layers in opposite directions.",[n[58],n[59],n[60],n[61],n[62],n[63],e].filter(t=>!!t))}function qe(n){return S("Shiny Vault","Foil background is a shiny silver color. Applied with radial gradients to darken the foil over the background.",n.slice(85,91))}function je(n){return S("Pokemon V (Alternate Art)","Practically the same holo effect as the Ultra Rare (Full Art) cards. The only difference is the pattern texture.",n.slice(28,34))}function Ke(n){return S("Pokemon V","Diagonal holographic effect which that appears to travel in opposite directions when you tilt the card.",n.slice(22,25))}function Ze(n){return S("Pokemon V (Full Art)","Similar to the Pokemon V effect, but they have additional texture when looked at from certain angles.",n.slice(25,28))}function Je(n){return S("Radiant Holofoil","The newest holofoil added to the series! Uses a criss-cross linear gradient pattern that moves across the card.",n.slice(16,19))}function Qe(n){return S("Rainbow Rare","Super glittery effect on top of pastel gradients. Achieved with background glitter and color-burn/hard-light blends.",n.slice(52,58))}function en(n){return S("Reverse Holo non-rares","Reverse holo cards come in many shapes and sizes. The background uses a foil and a mask layer along with a glare.",[...n.slice(4,7),...n.slice(70,76)],"reverse-holo")}function nn(n){return S("VMax (Alternate/Rainbow)","Vibrant and glittery overlay. Achieved with a background image of glitter/sparkles sandwiching linear gradients.",n.slice(40,43).filter(e=>e.rarity.toLowerCase()==="rare rainbow").sort((e,t)=>e.name.localeCompare(t.name)))}function tn(n){return S("VMax","The gradient effect of Pokemon VMax is more subtle, using a larger background gradient which moves more slowly.",n.slice(37,40).filter(e=>e.rarity.toLowerCase()==="rare holo vmax").sort((e,t)=>e.name.localeCompare(t.name)))}function rn(n){return S("VStar","Diagonal gradients overlaying a texture. Brighter with a pastel hue, making the gradient and texture more subtle.",n.slice(43,46).filter(e=>e.rarity.toLowerCase()==="rare holo vstar").sort((e,t)=>e.name.localeCompare(t.name)))}function an(n){return S("Trainer Gallery (VMax)","Generally quite similar to the normal V and VMax cards, with a different background texture.",n.slice(64,70).filter(e=>e.rarity.toLowerCase()==="rare holo vmax").sort((e,t)=>e.name.localeCompare(t.name)))}function on(n){return S("Trainer Gallery (V)","Generally quite similar to the normal V and VMax cards, with a different background texture.",n.slice(64,70).filter(e=>e.rarity.toLowerCase()==="rare holo v").sort((e,t)=>e.name.localeCompare(t.name)))}function ln(n){return S("Trainer Holo","Diagonal gradients overlaying a texture, quite similar to the Ultra Rare cards but generally brighter.",n.filter(e=>{var t;return e.rarity.toLowerCase()==="rare ultra"&&((t=e.subtypes)==null?void 0:t.includes("Supporter"))}).sort((e,t)=>e.name.localeCompare(t.name)))}function sn(n){return[]}function cn(n,e){const t=[Xe(n),Ie(n),en(n),Ne(n),Ye(n),He(n),We(n),Je(n),Ke(n),Ze(n),je(n),Qe(n),qe(n),tn(n),nn(n),rn(n),on(n),an(n),ln(n),...sn()].map(s=>({...s,cards:s.cards.filter(d=>!e.has(d.id)).sort((d,g)=>d.name.localeCompare(g.name))})).filter(s=>s.cards.length>0).sort((s,d)=>s.name.localeCompare(d.name)),r=Object.fromEntries(t.map(s=>[s.name,s.cards])),i=Object.fromEntries(t.map(s=>[s.name,s.description])),o=Object.fromEntries(t.map(s=>[s.name,s.variant])),c=t.map(s=>s.name),v=c[0],m=r[v][0];return{categories:r,descriptions:i,variants:o,categoryNames:c,initialCategory:v,initialCard:m}}function ge(n,e){let t=e;for(let r=0;r<n.length;r+=1)t^=n.charCodeAt(r),t=Math.imul(t,16777619);return t>>>0}function be(n){return n/4294967295}function Se(n){const e=`${n.id}:${n.set}:${n.number}`,t=be(ge(e,2166136261)),r=be(ge(e,709607)),i={x:Math.floor(t*734),y:Math.floor(r*1280)};return{x:t,y:r,cosmosPixels:i}}function dn({cssCard:n,cssCardImage:e,cssCardFront:t,cssCardRotator:r}){function i(a,h=0,C=100){return Math.min(Math.max(a,h),C)}function o(a,h=3){return parseFloat(a.toFixed(h))}function c(a,h,C,U,B){return o(U+(B-U)*(a-h)/(C-h))}function v(a){return["card","interactive",...(a.types??[]).map(h=>h.toLowerCase())].join(" ")}let m={pointerX:50,pointerY:50,rotateX:0,rotateY:0,backgroundX:50,backgroundY:50,opacity:0},s={...m},d;function g(a){const h=i(Math.sqrt((a.pointerY-50)*(a.pointerY-50)+(a.pointerX-50)*(a.pointerX-50))/50,0,1);n.style.setProperty("--pointer-x",`${a.pointerX}%`),n.style.setProperty("--pointer-y",`${a.pointerY}%`),n.style.setProperty("--pointer-from-center",String(h)),n.style.setProperty("--pointer-from-top",String(a.pointerY/100)),n.style.setProperty("--pointer-from-left",String(a.pointerX/100)),n.style.setProperty("--card-opacity",String(a.opacity)),n.style.setProperty("--rotate-x",`${a.rotateX}deg`),n.style.setProperty("--rotate-y",`${a.rotateY}deg`),n.style.setProperty("--background-x",`${a.backgroundX}%`),n.style.setProperty("--background-y",`${a.backgroundY}%`),n.style.setProperty("--card-scale","1"),n.style.setProperty("--translate-x","0px"),n.style.setProperty("--translate-y","0px")}function b(a=500){window.clearTimeout(d),d=window.setTimeout(()=>{n.classList.remove("interacting"),m={pointerX:50,pointerY:50,rotateX:0,rotateY:0,backgroundX:50,backgroundY:50,opacity:0}},a)}function x(a,h,C,U){const B=Se(a);n.className=`${v(a)} loading`;const F=N(a,"masks",C,U),z=N(a,"foils",C,U);n.classList.toggle("masked",!!F),n.dataset.number=a.number.toLowerCase(),n.dataset.set=a.set,n.dataset.subtypes=(a.subtypes??[]).join(" ").toLowerCase(),n.dataset.supertype=a.supertype.toLowerCase(),n.dataset.rarity=we(a,C,U),n.dataset.trainerGallery=String(!!a.number.match(/^[tg]g/i)),r.setAttribute("aria-label",`Expand the Pokemon Card; ${a.name}.`),e.alt=`Front design of the ${a.name} Pokemon Card, with the stats and info around the edge`,t.style.setProperty("--seedx",String(B.x)),t.style.setProperty("--seedy",String(B.y)),t.style.setProperty("--cosmosbg",`${B.cosmosPixels.x}px ${B.cosmosPixels.y}px`),F?(t.style.setProperty("--mask",`url(${F})`),t.style.setProperty("--foil",`url(${z})`)):(t.style.removeProperty("--mask"),t.style.removeProperty("--foil")),e.onload=()=>{n.classList.remove("loading")},e.src=h}function P(a){window.clearTimeout(d),n.classList.add("interacting");const h={x:i(o(a.x*100)),y:i(o(a.y*100))},C={x:h.x-50,y:h.y-50};m={backgroundX:c(h.x,0,100,37,63),backgroundY:c(h.y,0,100,33,67),rotateX:o(-(C.x/3.5)),rotateY:o(C.y/3.5),pointerX:o(h.x),pointerY:o(h.y),opacity:1}}function L(a){const h=r.getBoundingClientRect(),C={x:a.clientX-h.left,y:a.clientY-h.top},U={x:i(C.x/h.width,0,1),y:i(C.y/h.height,0,1)};return P(U),U}function y(){b()}function f(){b(0)}function l(){s={pointerX:s.pointerX+(m.pointerX-s.pointerX)*.15,pointerY:s.pointerY+(m.pointerY-s.pointerY)*.15,rotateX:s.rotateX+(m.rotateX-s.rotateX)*.15,rotateY:s.rotateY+(m.rotateY-s.rotateY)*.15,backgroundX:s.backgroundX+(m.backgroundX-s.backgroundX)*.15,backgroundY:s.backgroundY+(m.backgroundY-s.backgroundY)*.15,opacity:s.opacity+(m.opacity-s.opacity)*.15},g(s)}return{updateCard:x,setPointer:P,handlePointerMove:L,handlePointerLeave:y,handleBlur:f,tick:l}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class A{constructor(e,t,r,i,o="div"){this.parent=e,this.object=t,this.property=r,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(o),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),A.nextNameID=A.nextNameID||0,this.$name.id=`lil-gui-name-${++A.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",c=>c.stopPropagation()),this.domElement.addEventListener("keyup",c=>c.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(r)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("lil-disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class fn extends A{constructor(e,t,r){super(e,t,r,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function ne(n){let e,t;return(e=n.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=n.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=n.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const un={isPrimitive:!0,match:n=>typeof n=="string",fromHexString:ne,toHexString:ne},E={isPrimitive:!0,match:n=>typeof n=="number",fromHexString:n=>parseInt(n.substring(1),16),toHexString:n=>"#"+n.toString(16).padStart(6,0)},pn={isPrimitive:!1,match:n=>Array.isArray(n)||ArrayBuffer.isView(n),fromHexString(n,e,t=1){const r=E.fromHexString(n);e[0]=(r>>16&255)/255*t,e[1]=(r>>8&255)/255*t,e[2]=(r&255)/255*t},toHexString([n,e,t],r=1){r=255/r;const i=n*r<<16^e*r<<8^t*r<<0;return E.toHexString(i)}},hn={isPrimitive:!1,match:n=>Object(n)===n,fromHexString(n,e,t=1){const r=E.fromHexString(n);e.r=(r>>16&255)/255*t,e.g=(r>>8&255)/255*t,e.b=(r&255)/255*t},toHexString({r:n,g:e,b:t},r=1){r=255/r;const i=n*r<<16^e*r<<8^t*r<<0;return E.toHexString(i)}},vn=[un,E,pn,hn];function mn(n){return vn.find(e=>e.match(n))}class gn extends A{constructor(e,t,r,i){super(e,t,r,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=mn(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const o=ne(this.$text.value);o&&this._setValueFromHexString(o)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class ee extends A{constructor(e,t,r){super(e,t,r,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class bn extends A{constructor(e,t,r,i,o,c){super(e,t,r,"lil-number"),this._initInput(),this.min(i),this.max(o);const v=c!==void 0;this.step(v?c:this._getImplicitStep(),v),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let l=parseFloat(this.$input.value);isNaN(l)||(this._stepExplicit&&(l=this._snap(l)),this.setValue(this._clamp(l)))},r=l=>{const a=parseFloat(this.$input.value);isNaN(a)||(this._snapClampSetValue(a+l),this.$input.value=this.getValue())},i=l=>{l.key==="Enter"&&this.$input.blur(),l.code==="ArrowUp"&&(l.preventDefault(),r(this._step*this._arrowKeyMultiplier(l))),l.code==="ArrowDown"&&(l.preventDefault(),r(this._step*this._arrowKeyMultiplier(l)*-1))},o=l=>{this._inputFocused&&(l.preventDefault(),r(this._step*this._normalizeMouseWheel(l)))};let c=!1,v,m,s,d,g;const b=5,x=l=>{v=l.clientX,m=s=l.clientY,c=!0,d=this.getValue(),g=0,window.addEventListener("mousemove",P),window.addEventListener("mouseup",L)},P=l=>{if(c){const a=l.clientX-v,h=l.clientY-m;Math.abs(h)>b?(l.preventDefault(),this.$input.blur(),c=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(a)>b&&L()}if(!c){const a=l.clientY-s;g-=a*this._step*this._arrowKeyMultiplier(l),d+g>this._max?g=this._max-d:d+g<this._min&&(g=this._min-d),this._snapClampSetValue(d+g)}s=l.clientY},L=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",P),window.removeEventListener("mouseup",L)},y=()=>{this._inputFocused=!0},f=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",i),this.$input.addEventListener("wheel",o,{passive:!1}),this.$input.addEventListener("mousedown",x),this.$input.addEventListener("focus",y),this.$input.addEventListener("blur",f)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const e=(f,l,a,h,C)=>(f-l)/(a-l)*(C-h)+h,t=f=>{const l=this.$slider.getBoundingClientRect();let a=e(f,l.left,l.right,this._min,this._max);this._snapClampSetValue(a)},r=f=>{this._setDraggingStyle(!0),t(f.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",o)},i=f=>{t(f.clientX)},o=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",o)};let c=!1,v,m;const s=f=>{f.preventDefault(),this._setDraggingStyle(!0),t(f.touches[0].clientX),c=!1},d=f=>{f.touches.length>1||(this._hasScrollBar?(v=f.touches[0].clientX,m=f.touches[0].clientY,c=!0):s(f),window.addEventListener("touchmove",g,{passive:!1}),window.addEventListener("touchend",b))},g=f=>{if(c){const l=f.touches[0].clientX-v,a=f.touches[0].clientY-m;Math.abs(l)>Math.abs(a)?s(f):(window.removeEventListener("touchmove",g),window.removeEventListener("touchend",b))}else f.preventDefault(),t(f.touches[0].clientX)},b=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",g),window.removeEventListener("touchend",b)},x=this._callOnFinishChange.bind(this),P=400;let L;const y=f=>{if(Math.abs(f.deltaX)<Math.abs(f.deltaY)&&this._hasScrollBar)return;f.preventDefault();const a=this._normalizeMouseWheel(f)*this._step;this._snapClampSetValue(this.getValue()+a),this.$input.value=this.getValue(),clearTimeout(L),L=setTimeout(x,P)};this.$slider.addEventListener("mousedown",r),this.$slider.addEventListener("touchstart",d,{passive:!1}),this.$slider.addEventListener("wheel",y,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",e),document.body.classList.toggle("lil-dragging",e),document.body.classList.toggle(`lil-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:r}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,r=-e.wheelDelta/120,r*=this._stepExplicit?1:10),t+-r}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class xn extends A{constructor(e,t,r,i){super(e,t,r,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(i)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const r=document.createElement("option");r.textContent=t,this.$select.appendChild(r)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class yn extends A{constructor(e,t,r){super(e,t,r,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var wn=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.lil-root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.lil-root > .lil-children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.lil-allow-touch-styles, .lil-gui.lil-allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.lil-force-touch-styles, .lil-gui.lil-force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.lil-auto-place, .lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-controller.lil-disabled {
  opacity: 0.5;
}
.lil-controller.lil-disabled, .lil-controller.lil-disabled * {
  pointer-events: none !important;
}
.lil-controller > .lil-name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-controller .lil-widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-controller.lil-string input {
  color: var(--string-color);
}
.lil-controller.lil-boolean {
  cursor: pointer;
}
.lil-controller.lil-color .lil-display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-controller.lil-color .lil-display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-controller.lil-color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-controller.lil-color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-controller.lil-option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-controller.lil-option .lil-display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-display.lil-focus {
    background: var(--focus-color);
  }
}
.lil-controller.lil-option .lil-display.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-option .lil-display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-controller.lil-option .lil-widget,
.lil-controller.lil-option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-widget:hover .lil-display {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number input {
  color: var(--number-color);
}
.lil-controller.lil-number.lil-has-slider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-controller.lil-number .lil-slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-controller.lil-number .lil-slider:hover {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number .lil-slider.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-number .lil-slider.lil-active .lil-fill {
  opacity: 0.95;
}
.lil-controller.lil-number .lil-fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-dragging * {
  cursor: ew-resize !important;
}
.lil-dragging.lil-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .lil-title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .lil-title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .lil-title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-dragging) .lil-gui .lil-title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .lil-title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.lil-root > .lil-title:focus {
  text-decoration: none !important;
}
.lil-gui.lil-closed > .lil-title:before {
  content: "▸";
}
.lil-gui.lil-closed > .lil-children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.lil-closed:not(.lil-transition) > .lil-children {
  display: none;
}
.lil-gui.lil-transition > .lil-children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .lil-children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.lil-root > .lil-children > .lil-gui > .lil-title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.lil-root > .lil-children > .lil-gui.lil-closed > .lil-title {
  border-bottom-color: transparent;
}
.lil-gui + .lil-controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .lil-title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .lil-children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .lil-controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .lil-controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .lil-controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .lil-controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .lil-controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAALkAAsAAAAABtQAAAKVAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDMgqBBIEbATYCJAMUCwwABCAFhAoHgQQbHAbIDiUFEYVARAAAYQTVWNmz9MxhEgodq49wYRUFKE8GWNiUBxI2LBRaVnc51U83Gmhs0Q7JXWMiz5eteLwrKwuxHO8VFxUX9UpZBs6pa5ABRwHA+t3UxUnH20EvVknRerzQgX6xC/GH6ZUvTcAjAv122dF28OTqCXrPuyaDER30YBA1xnkVutDDo4oCi71Ca7rrV9xS8dZHbPHefsuwIyCpmT7j+MnjAH5X3984UZoFFuJ0yiZ4XEJFxjagEBeqs+e1iyK8Xf/nOuwF+vVK0ur765+vf7txotUi0m3N0m/84RGSrBCNrh8Ee5GjODjF4gnWP+dJrH/Lk9k4oT6d+gr6g/wssA2j64JJGP6cmx554vUZnpZfn6ZfX2bMwPPrlANsB86/DiHjhl0OP+c87+gaJo/gY084s3HoYL/ZkWHTRfBXvvoHnnkHvngKun4KBE/ede7tvq3/vQOxDXB1/fdNz6XbPdcr0Vhpojj9dG+owuSKFsslCi1tgEjirjXdwMiov2EioadxmqTHUCIwo8NgQaeIasAi0fTYSPTbSmwbMOFduyh9wvBrESGY0MtgRjtgQR8Q1bRPohn2UoCRZf9wyYANMXFeJTysqAe0I4mrherOekFdKMrYvJjLvOIUM9SuwYB5DVZUwwVjJJOaUnZCmcEkIZZrKqNvRGRMvmFZsmhP4VMKCSXBhSqUBxgMS7h0cZvEd71AWkEhGWaeMFcNnpqyJkyXgYL7PQ1MoSq0wDAkRtJIijkZSmqYTiSImfLiSWXIZwhRh3Rug2X0kk1Dgj+Iu43u5p98ghopcpSo0Uyc8SnjlYX59WUeaMoDqmVD2TOWD9a4pCRAzf2ECgwGcrHjPOWY9bNxq/OL3I/QjwEAAAA=") format("woff2");
}`;function Sn(n){const e=document.createElement("style");e.innerHTML=n;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let xe=!1;class te{constructor({parent:e,autoPlace:t=e===void 0,container:r,width:i,title:o="Controls",closeFolders:c=!1,injectStyles:v=!0,touchStyles:m=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(o),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),m&&this.domElement.classList.add("lil-allow-touch-styles"),!xe&&v&&(Sn(wn),xe=!0),r?r.appendChild(this.domElement):t&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this._closeFolders=c}add(e,t,r,i,o){if(Object(r)===r)return new xn(this,e,t,r);const c=e[t];switch(typeof c){case"number":return new bn(this,e,t,r,i,o);case"boolean":return new fn(this,e,t);case"string":return new yn(this,e,t);case"function":return new ee(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,c)}addColor(e,t,r=1){return new gn(this,e,t,r)}addFolder(e){const t=new te({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(r=>{r instanceof ee||r._name in e.controllers&&r.load(e.controllers[r._name])}),t&&e.folders&&this.folders.forEach(r=>{r._title in e.folders&&r.load(e.folders[r._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(r=>{if(!(r instanceof ee)){if(r._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${r._name}"`);t.controllers[r._name]=r.save()}}),e&&this.folders.forEach(r=>{if(r._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${r._title}"`);t.folders[r._title]=r.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("lil-transition");const r=o=>{o.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",r))};this.$children.addEventListener("transitionend",r);const i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(r=>r.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}function Cn({cardLibrary:n,cards:e,initialCategory:t,initialCardId:r,onCardChange:i,onSelectionChange:o,webgpuRenderer:c}){var f;const v=new te({title:"Card Library"});v.close();const m={patternWidth:.2,patternHeight:.4};function s(l){l==="Radiant Holofoil"&&(c==null||c.setPatternParams(m.patternWidth,m.patternHeight))}const d={category:n.categoryNames.includes(t)?t:n.initialCategory,activeId:r},g=document.createElement("div");g.className="gui-description";const b=l=>Object.fromEntries(n.categories[l].map(a=>[a.name,a.id])),x=async(l,a)=>{d.category=a,d.activeId=l.id,g.textContent=n.descriptions[a],L.options(b(a)),L.updateDisplay(),s(a),o==null||o(l,a),await i(l,a)};(f=v.add(d,"category",n.categoryNames).name("Type").onChange(async l=>{const a=n.categories[l];a.length>0&&await x(a[0],l)}).domElement.parentElement)==null||f.appendChild(g),g.textContent=n.descriptions[d.category];const L=v.add(d,"activeId",b(d.category)).name("Select Card").onChange(async l=>{const a=e.find(h=>h.id===l);a&&await x(a,d.category)}),y=n.categories[d.category].find(l=>l.id===r)??n.categories[d.category][0];y&&(d.activeId=y.id,x(y,d.category))}const kn="secret-rare-gold",Ln="swsh12pt5-160";function Ce(n){return n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function Rn(n,e){return n.categoryNames.find(t=>t===e)??n.categoryNames.find(t=>Ce(t)===e)}function Pn(n,e){const t=new URLSearchParams(window.location.search),r=t.get("type")??kn,i=Rn(n,r)??n.initialCategory,o=n.categories[i],c=t.get("card")??Ln,v=o.find(m=>m.id===c)??o[0]??e[0];return{category:i,card:v}}function Un(n,e){const t=new URL(window.location.href);t.searchParams.set("type",Ce(n)),t.searchParams.set("card",e.id),history.replaceState({},"",t)}const An=`struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    perspective: f32,
    opacity: f32,
    _pad0: f32,
    _pad1: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var textureSampler: sampler;
@group(0) @binding(2) var textureData: texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) localPos: vec2f,
};

fn rotateX(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(
        p.x,
        p.y * c - p.z * s,
        p.y * s + p.z * c
    );
}

fn rotateY(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(
        p.x * c + p.z * s,
        p.y,
        -p.x * s + p.z * c
    );
}

@vertex
fn vertexMain(@location(0) pos: vec2f, @location(1) uv: vec2f) -> VertexOutput {
    var output: VertexOutput;
    
    let canvasAspect = uniforms.resolution.x / uniforms.resolution.y;
    
    // pos comes in as [-1.5, 1.5] scale relative to card size
    var p = vec3f(pos, 0.0);
    p = rotateX(p, uniforms.rotation.y);
    p = rotateY(p, uniforms.rotation.x);

    let perspective = uniforms.perspective;
    let w = perspective - p.z;
    
    let x = (p.x / canvasAspect) * perspective;
    let y = p.y * perspective;
    
    output.position = vec4f(x, y, 0.0, w);
    output.uv = uv;
    output.localPos = pos;
    return output;
}

// --- SDF Utilities ---

fn sdRoundedRect(p: vec2f, b: vec2f, r: f32) -> f32 {
    let q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2f(0.0))) - r;
}

fn getCardSize() -> vec2f {
    let cardAspect = 0.718;
    let canvasAspect = uniforms.resolution.x / uniforms.resolution.y;
    let panePadding = 48.0 * uniforms.dpr;
    let maxWidthFromHeight = 0.6;
    let maxWidthFromPane = max((uniforms.resolution.x - panePadding) / uniforms.resolution.y, 0.0);
    let cardWidth = min(maxWidthFromHeight, maxWidthFromPane);
    return vec2f(cardWidth, cardWidth / cardAspect);
}

@fragment
fn fragmentMain(@location(0) uv: vec2f, @location(1) localPos: vec2f) -> @location(0) vec4f {
    let cardSize = getCardSize();
    let cornerRadius = 0.04;
    let pxToLocal = 2.0 * uniforms.dpr / uniforms.resolution.y;
    
    // Distance to card edge (for clipping and rounding)
    let dist = sdRoundedRect(localPos, cardSize, cornerRadius);

    // Keep the shader shadow visually aligned with CSS box-shadow: 0 18px 34px -7px black.
    let shadowOffset = 22.0 * pxToLocal;
    let shadowBlur = 34.0 * pxToLocal;
    let shadowSpread = -7.0 * pxToLocal;
    let shadowPos = localPos - vec2f(0.0, -shadowOffset);
    let shadowSize = cardSize + vec2f(shadowSpread);
    let shadowRadius = max(cornerRadius + shadowSpread, 0.0);
    let shadowDist = sdRoundedRect(shadowPos, shadowSize, shadowRadius);
    let shadowAlpha = 1.0 - smoothstep(-shadowBlur, shadowBlur, shadowDist);
    let shadowColor = vec4f(0.0, 0.0, 0.0, shadowAlpha);
    
    // Sample texture only if within card bounds
    // Map localPos.y to UV.y inverting it for top-left origin
    let cardUV = vec2f(
        (localPos.x / (cardSize.x * 2.0)) + 0.5,
        0.5 - (localPos.y / (cardSize.y * 2.0))
    );
    let textureColor = textureSample(textureData, textureSampler, cardUV);
    
    // Antialiased clipping for card edges
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);
    let finalCard = vec4f(textureColor.rgb, textureColor.a * cardMask);

    let finalColor = vec4f(
        mix(shadowColor.rgb, finalCard.rgb, finalCard.a),
        max(shadowColor.a, finalCard.a)
    );

    if (finalColor.a <= 0.0) { discard; }

    return finalColor;
}
`,Bn=`struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    perspective: f32,
    opacity: f32,
    _pad0: f32,
    _pad1: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) localPos: vec2f,
};

fn rotateX(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

fn rotateY(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
}

@vertex
fn vertexMain(@location(0) pos: vec2f, @location(1) uv: vec2f) -> VertexOutput {
    var output: VertexOutput;
    let canvasAspect = uniforms.resolution.x / uniforms.resolution.y;
    var p = vec3f(pos, 0.0);
    p = rotateX(p, uniforms.rotation.y);
    p = rotateY(p, uniforms.rotation.x);
    let perspective = uniforms.perspective;
    let w = perspective - p.z;
    let x = (p.x / canvasAspect) * perspective;
    let y = p.y * perspective;
    output.position = vec4f(x, y, 0.0, w);
    output.uv = uv;
    output.localPos = pos;
    return output;
}

fn sdRoundedRect(p: vec2f, b: vec2f, r: f32) -> f32 {
    let q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2f(0.0))) - r;
}

fn getCardSize() -> vec2f {
    let cardAspect = 0.718;
    let panePadding = 48.0 * uniforms.dpr;
    let maxWidthFromHeight = 0.6;
    let maxWidthFromPane = max((uniforms.resolution.x - panePadding) / uniforms.resolution.y, 0.0);
    let cardWidth = min(maxWidthFromHeight, maxWidthFromPane);
    return vec2f(cardWidth, cardWidth / cardAspect);
}

// CSS: radial-gradient(farthest-corner circle at pointer, white 10%, white 20%, black 90%)
fn farthestCornerDist(uv: vec2f, p: vec2f) -> f32 {
    let d0 = distance(uv, vec2f(0.0, 0.0));
    let d1 = distance(uv, vec2f(1.0, 0.0));
    let d2 = distance(uv, vec2f(0.0, 1.0));
    let d3 = distance(uv, vec2f(1.0, 1.0));
    return max(max(d0, d1), max(d2, d3));
}

fn glareLayer(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let maxDist = farthestCornerDist(uv, uniforms.pointer);
    let t = clamp(dist / maxDist, 0.0, 1.0);

    var color: vec3f;
    var alpha: f32;
    if (t < 0.1) {
        color = vec3f(1.0);
        alpha = 0.8;
    } else if (t < 0.2) {
        color = vec3f(1.0);
        alpha = mix(0.8, 0.65, (t - 0.1) / 0.1);
    } else if (t < 0.9) {
        let s = (t - 0.2) / 0.7;
        color = mix(vec3f(1.0), vec3f(0.0), s);
        alpha = mix(0.65, 0.5, s);
    } else {
        color = vec3f(0.0);
        alpha = 0.5;
    }

    return vec4f(color, alpha * uniforms.opacity);
}

// CSS: mix-blend-mode: overlay
fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
}

@fragment
fn fragmentMain(@location(0) uv: vec2f, @location(1) localPos: vec2f) -> @location(0) vec4f {
    let cardSize = getCardSize();
    let cornerRadius = 0.04;
    let pxToLocal = 2.0 * uniforms.dpr / uniforms.resolution.y;

    let dist = sdRoundedRect(localPos, cardSize, cornerRadius);

    let shadowOffset = 22.0 * pxToLocal;
    let shadowBlur = 34.0 * pxToLocal;
    let shadowSpread = -7.0 * pxToLocal;
    let shadowPos = localPos - vec2f(0.0, -shadowOffset);
    let shadowSize = cardSize + vec2f(shadowSpread);
    let shadowRadius = max(cornerRadius + shadowSpread, 0.0);
    let shadowDist = sdRoundedRect(shadowPos, shadowSize, shadowRadius);
    let shadowAlpha = 1.0 - smoothstep(-shadowBlur, shadowBlur, shadowDist);
    let shadowColor = vec4f(0.0, 0.0, 0.0, shadowAlpha);

    let cardUV = vec2f(
        (localPos.x / (cardSize.x * 2.0)) + 0.5,
        0.5 - (localPos.y / (cardSize.y * 2.0))
    );

    let textureColor = textureSampleLevel(cardTexture, linearSampler, cardUV, 0.0);
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);

    var cardRgb = textureColor.rgb;

    let glare = glareLayer(cardUV);
    let glareBlended = overlayBlend(cardRgb, glare.rgb);
    cardRgb = mix(cardRgb, glareBlended, glare.a * cardMask);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = vec4f(
        mix(shadowColor.rgb, finalCard.rgb, finalCard.a),
        max(shadowColor.a, finalCard.a)
    );

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,_n=`struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    perspective: f32,
    opacity: f32,
    foilBrightness: f32,
    patternScaleX: f32,
    patternScaleY: f32,
    cosmosOffsetX: f32,
    cosmosOffsetY: f32,
    _pad2: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;
@group(0) @binding(5) var cosmosBottomTexture: texture_2d<f32>;
@group(0) @binding(6) var cosmosMiddleTexture: texture_2d<f32>;
@group(0) @binding(7) var cosmosTopTexture: texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) localPos: vec2f,
};

fn rotateX(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

fn rotateY(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
}

@vertex
fn vertexMain(@location(0) pos: vec2f, @location(1) uv: vec2f) -> VertexOutput {
    var output: VertexOutput;
    let canvasAspect = uniforms.resolution.x / uniforms.resolution.y;
    var p = vec3f(pos, 0.0);
    p = rotateX(p, uniforms.rotation.y);
    p = rotateY(p, uniforms.rotation.x);
    let w = uniforms.perspective - p.z;
    output.position = vec4f((p.x / canvasAspect) * uniforms.perspective, p.y * uniforms.perspective, 0.0, w);
    output.uv = uv;
    output.localPos = pos;
    return output;
}

fn sdRoundedRect(p: vec2f, b: vec2f, r: f32) -> f32 {
    let q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2f(0.0))) - r;
}

fn getCardSize() -> vec2f {
    let cardAspect = 0.718;
    let panePadding = 48.0 * uniforms.dpr;
    let maxWidthFromHeight = 0.6;
    let maxWidthFromPane = max((uniforms.resolution.x - panePadding) / uniforms.resolution.y, 0.0);
    let cardWidth = min(maxWidthFromHeight, maxWidthFromPane);
    return vec2f(cardWidth, cardWidth / cardAspect);
}

fn farthestCornerDist(p: vec2f) -> f32 {
    let d0 = distance(p, vec2f(0.0, 0.0));
    let d1 = distance(p, vec2f(1.0, 0.0));
    let d2 = distance(p, vec2f(0.0, 1.0));
    let d3 = distance(p, vec2f(1.0, 1.0));
    return max(max(d0, d1), max(d2, d3));
}

fn multiplyBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base * blend;
}

fn lightenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return max(base, blend);
}

fn screenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return vec3f(1.0) - (vec3f(1.0) - base) * (vec3f(1.0) - blend);
}

fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
}

fn softLightChannel(base: f32, blend: f32) -> f32 {
    let low = base - (1.0 - 2.0 * blend) * base * (1.0 - base);
    let d = select(((16.0 * base - 12.0) * base + 4.0) * base, sqrt(max(base, 0.0)), base > 0.25);
    let high = base + (2.0 * blend - 1.0) * (d - base);
    return mix(low, high, step(0.5, blend));
}

fn softLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return vec3f(
        softLightChannel(base.r, blend.r),
        softLightChannel(base.g, blend.g),
        softLightChannel(base.b, blend.b)
    );
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.00001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(0.99999));
}

fn colorBurnBlend(base: vec3f, blend: vec3f) -> vec3f {
    let burned = vec3f(1.0) - min((vec3f(1.0) - base) / max(blend, vec3f(0.00001)), vec3f(1.0));
    return select(burned, vec3f(0.0), blend <= vec3f(0.00001));
}

fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

fn coolRainbow(color: vec3f) -> vec3f {
    let luma = dot(color, vec3f(0.2126, 0.7152, 0.0722));
    let cool = vec3f(luma * 0.72, luma * 0.94, luma * 1.18);
    return clamp(mix(color, cool, 0.06), vec3f(0.0), vec3f(1.0));
}

fn pearlTone(color: vec3f) -> vec3f {
    let luma = dot(color, vec3f(0.2126, 0.7152, 0.0722));
    let pearl = vec3f(luma * 0.92, luma * 1.04, luma * 1.12);
    return clamp(mix(color, pearl, 0.10), vec3f(0.0), vec3f(1.0));
}

fn sparkleBoost(color: vec3f, amount: f32) -> vec3f {
    let luma = dot(color, vec3f(0.2126, 0.7152, 0.0722));
    let sparkle = smoothstep(0.52, 0.92, luma);
    let hueLight = mix(color, vec3f(1.0), 0.28);
    return clamp(color + hueLight * sparkle * amount, vec3f(0.0), vec3f(1.0));
}

fn specularBoost(color: vec3f, mask: f32, amount: f32) -> vec3f {
    let hot = pow(clamp(mask, 0.0, 1.0), 2.35);
    let hueSpecular = mix(color, vec3f(1.0), 0.18);
    return clamp(color + hueSpecular * hot * amount, vec3f(0.0), vec3f(1.0));
}

fn isInArtworkArea(uv: vec2f) -> f32 {
    let top = 0.0985;
    let right = 0.08;
    let bottom = 0.5285;
    let left = 0.08;

    let inX = step(left, uv.x) * step(uv.x, 1.0 - right);
    let inY = step(top, uv.y) * step(uv.y, 1.0 - bottom);
    return inX * inY;
}

fn backgroundUv(uv: vec2f, scale: vec2f, position: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - scale) * position;
    return (uv - origin) / scale;
}

fn cosmosUv(uv: vec2f, cardSize: vec2f) -> vec2f {
    let cardWidthPx = max(cardSize.x * uniforms.resolution.y / uniforms.dpr, 1.0);
    let cardHeightPx = max(cardSize.y * uniforms.resolution.y / uniforms.dpr, 1.0);
    let offset = vec2f(
        uniforms.cosmosOffsetX / cardWidthPx,
        uniforms.cosmosOffsetY / cardHeightPx
    );
    return fract(uv - offset);
}

fn cosmosRainbow(uv: vec2f, position: vec2f) -> vec3f {
    let layerUv = backgroundUv(uv, vec2f(4.0, 9.0), position);
    let angle = radians(82.0);
    let dir = vec2f(cos(angle), sin(angle));
    let t = fract(dot(layerUv, dir) / 0.48);

    let c1 = vec3f(0.804, 0.706, 0.396); // hsl(53, 65%, 60%)
    let c2 = vec3f(0.455, 0.780, 0.220); // hsl(93, 56%, 50%)
    let c3 = vec3f(0.225, 0.755, 0.720); // hsl(176, 54%, 49%)
    let c4 = vec3f(0.302, 0.396, 0.798); // hsl(228, 59%, 55%)
    let c5 = vec3f(0.616, 0.302, 0.798); // hsl(283, 60%, 55%)
    let c6 = vec3f(0.808, 0.212, 0.555); // hsl(326, 59%, 51%)

    if (t < 0.083) { return mix(c1, c2, t / 0.083); }
    if (t < 0.167) { return mix(c2, c3, (t - 0.083) / 0.084); }
    if (t < 0.250) { return mix(c3, c4, (t - 0.167) / 0.083); }
    if (t < 0.333) { return mix(c4, c5, (t - 0.250) / 0.083); }
    if (t < 0.417) { return mix(c5, c6, (t - 0.333) / 0.084); }
    if (t < 0.583) { return c6; }
    if (t < 0.667) { return mix(c6, c5, (t - 0.583) / 0.084); }
    if (t < 0.750) { return mix(c5, c4, (t - 0.667) / 0.083); }
    if (t < 0.833) { return mix(c4, c3, (t - 0.750) / 0.083); }
    if (t < 0.917) { return mix(c3, c2, (t - 0.833) / 0.084); }
    return mix(c2, c1, (t - 0.917) / 0.083);
}

fn shineRadial(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let t = clamp(dist / max(farthestCornerDist(uniforms.pointer), 0.001), 0.0, 1.0);
    if (t < 0.05) {
        return vec4f(0.78, 1.0, 1.0, 0.5);
    }
    if (t < 0.40) {
        return mix(
            vec4f(0.78, 1.0, 1.0, 0.5),
            vec4f(0.42, 0.49, 0.49, 0.3),
            (t - 0.05) / 0.35
        );
    }
    return mix(
        vec4f(0.42, 0.49, 0.49, 0.3),
        vec4f(0.0, 0.0, 0.0, 1.0),
        clamp((t - 0.40) / 0.90, 0.0, 1.0)
    );
}

fn glareGradient(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let t = clamp(dist / max(farthestCornerDist(uniforms.pointer), 0.001), 0.0, 1.0);
    let color = mix(vec3f(0.96, 0.995, 1.0), vec3f(0.12, 0.16, 0.26), clamp(t / 1.5, 0.0, 1.0));
    return vec4f(applyFilter(color, 0.75, 2.0, 2.0), 1.0);
}

fn glareAfterGradient(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let t = clamp(dist / max(farthestCornerDist(uniforms.pointer), 0.001), 0.0, 1.0);
    let color = mix(vec3f(0.99, 0.965, 1.0), vec3f(0.08, 0.08, 0.10), clamp(t / 0.60, 0.0, 1.0));
    return vec4f(applyFilter(color, 0.75, 2.5, 2.0), 1.0);
}

@fragment
fn fragmentMain(@location(0) uv: vec2f, @location(1) localPos: vec2f) -> @location(0) vec4f {
    let cardSize = getCardSize();
    let cornerRadius = 0.04;
    let pxToLocal = 2.0 * uniforms.dpr / uniforms.resolution.y;

    let dist = sdRoundedRect(localPos, cardSize, cornerRadius);

    let shadowOffset = 22.0 * pxToLocal;
    let shadowBlur = 34.0 * pxToLocal;
    let shadowSpread = -7.0 * pxToLocal;
    let shadowPos = localPos - vec2f(0.0, -shadowOffset);
    let shadowSize = cardSize + vec2f(shadowSpread);
    let shadowRadius = max(cornerRadius + shadowSpread, 0.0);
    let shadowDist = sdRoundedRect(shadowPos, shadowSize, shadowRadius);
    let shadowAlpha = 1.0 - smoothstep(-shadowBlur, shadowBlur, shadowDist);
    let shadowColor = vec4f(0.0, 0.0, 0.0, shadowAlpha);

    let cardUV = vec2f(
        (localPos.x / (cardSize.x * 2.0)) + 0.5,
        0.5 - (localPos.y / (cardSize.y * 2.0))
    );

    let textureColor = textureSampleLevel(cardTexture, linearSampler, cardUV, 0.0);
    let maskColor = textureSampleLevel(maskTexture, linearSampler, cardUV, 0.0);
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);
    let foilMask = maskColor.a;
    let artworkClip = isInArtworkArea(cardUV) * cardMask;
    let artworkMask = artworkClip * foilMask;

    let pointerFromCenter = clamp(length(uniforms.pointer - vec2f(0.5)) / 0.70710678, 0.0, 1.0);
    let pointerFromTop = uniforms.pointer.y;

    var cardRgb = textureColor.rgb;

    let cosmosSampleUv = cosmosUv(cardUV, cardSize);
    let bottomTex = textureSampleLevel(cosmosBottomTexture, linearSampler, cosmosSampleUv, 0.0).rgb;
    let middleSample = textureSampleLevel(cosmosMiddleTexture, linearSampler, cosmosSampleUv, 0.0);
    let topSample = textureSampleLevel(cosmosTopTexture, linearSampler, cosmosSampleUv, 0.0);
    let middleTex = middleSample;
    let topTex = topSample;

    let rainbow1 = coolRainbow(cosmosRainbow(cardUV, vec2f(0.10 + uniforms.pointer.x * 0.80, 0.10 + uniforms.pointer.y * 0.80)));
    let rainbow2 = coolRainbow(cosmosRainbow(cardUV, vec2f(0.15 + uniforms.pointer.x * 0.70, 0.15 + uniforms.pointer.y * 0.70)));
    let rainbow3 = coolRainbow(cosmosRainbow(cardUV, vec2f(0.20 + uniforms.pointer.x * 0.60, 0.20 + uniforms.pointer.y * 0.60)));

    let radial = shineRadial(cardUV);
    var shineMain = mix(vec3f(0.0), radial.rgb, radial.a);
    shineMain = multiplyBlend(shineMain, rainbow1);
    shineMain = colorBurnBlend(shineMain, bottomTex);
    shineMain = sparkleBoost(applyFilter(shineMain, 1.26, 1.46, 0.86), 1.16);
    cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, pearlTone(shineMain)), uniforms.opacity * artworkMask * 1.08);

    let beforeLayerAlpha = max(0.11, middleTex.a);
    var shineBefore = mix(rainbow2, lightenBlend(rainbow2, middleTex.rgb), middleTex.a);
    shineBefore = sparkleBoost(applyFilter(shineBefore, 1.38, 1.94, 0.86), 0.58);
    cardRgb = mix(cardRgb, overlayBlend(cardRgb, shineBefore), uniforms.opacity * artworkMask * beforeLayerAlpha * 0.44);

    let afterLayerAlpha = max(0.06, topTex.a);
    var shineAfter = mix(rainbow3, multiplyBlend(rainbow3, topTex.rgb), topTex.a);
    shineAfter = applyFilter(shineAfter, 1.25, 1.75, 0.8);
    cardRgb = mix(cardRgb, multiplyBlend(cardRgb, shineAfter), uniforms.opacity * artworkMask * afterLayerAlpha * 0.16);

    let bottomSpark = smoothstep(0.28, 0.70, dot(bottomTex, vec3f(0.2126, 0.7152, 0.0722)));
    let middleSpark = smoothstep(0.06, 0.34, dot(middleTex.rgb, vec3f(0.2126, 0.7152, 0.0722)) * middleTex.a);
    let topSpark = smoothstep(0.06, 0.34, dot(topTex.rgb, vec3f(0.2126, 0.7152, 0.0722)) * topTex.a);
    let pointerDist = distance(cardUV, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let glareWashout = smoothstep(0.10, 0.22, pointerDist);
    let mouseRange = 1.0 - smoothstep(0.42, 0.68, pointerDist);
    let speckMask = clamp(max(bottomSpark, max(middleSpark, topSpark)) * glareWashout * mouseRange, 0.0, 1.0);
    let speckTexture = max(bottomTex, max(middleTex.rgb * middleTex.a, topTex.rgb * topTex.a));
    var speckShine = screenBlend(speckTexture, rainbow2);
    speckShine = sparkleBoost(applyFilter(speckShine, 1.48, 2.08, 1.45), 1.28);
    speckShine = specularBoost(speckShine, speckMask, 1.12);
    cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, speckShine), uniforms.opacity * artworkMask * speckMask * 0.96);

    let glare = glareGradient(cardUV);
    let glareOpacity = uniforms.opacity * (0.25 + pointerFromCenter) * cardMask;
    cardRgb = mix(cardRgb, overlayBlend(cardRgb, glare.rgb), glare.a * glareOpacity);

    let glareAfter = glareAfterGradient(cardUV);
    let glareAfterOpacity = (1.0 - pointerFromTop * 0.75) * artworkClip * uniforms.opacity * 0.40;
    cardRgb = mix(cardRgb, softLightBlend(cardRgb, glareAfter.rgb), glareAfter.a * glareAfterOpacity);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = vec4f(
        mix(shadowColor.rgb, finalCard.rgb, finalCard.a),
        max(shadowColor.a, finalCard.a)
    );

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,Tn=`struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    perspective: f32,
    opacity: f32,
    foilBrightness: f32,
    patternScaleX: f32,
    patternScaleY: f32,
    cosmosOffsetX: f32,
    cosmosOffsetY: f32,
    clipMode: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) localPos: vec2f,
};

fn rotateX(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

fn rotateY(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
}

@vertex
fn vertexMain(@location(0) pos: vec2f, @location(1) uv: vec2f) -> VertexOutput {
    var output: VertexOutput;
    let canvasAspect = uniforms.resolution.x / uniforms.resolution.y;
    var p = vec3f(pos, 0.0);
    p = rotateX(p, uniforms.rotation.y);
    p = rotateY(p, uniforms.rotation.x);
    let w = uniforms.perspective - p.z;
    output.position = vec4f((p.x / canvasAspect) * uniforms.perspective, p.y * uniforms.perspective, 0.0, w);
    output.uv = uv;
    output.localPos = pos;
    return output;
}

fn sdRoundedRect(p: vec2f, b: vec2f, r: f32) -> f32 {
    let q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2f(0.0))) - r;
}

fn getCardSize() -> vec2f {
    let cardAspect = 0.718;
    let panePadding = 48.0 * uniforms.dpr;
    let maxWidthFromHeight = 0.6;
    let maxWidthFromPane = max((uniforms.resolution.x - panePadding) / uniforms.resolution.y, 0.0);
    let cardWidth = min(maxWidthFromHeight, maxWidthFromPane);
    return vec2f(cardWidth, cardWidth / cardAspect);
}

fn farthestCornerDist(p: vec2f) -> f32 {
    let d0 = distance(p, vec2f(0.0, 0.0));
    let d1 = distance(p, vec2f(1.0, 0.0));
    let d2 = distance(p, vec2f(0.0, 1.0));
    let d3 = distance(p, vec2f(1.0, 1.0));
    return max(max(d0, d1), max(d2, d3));
}

fn luma(color: vec3f) -> f32 {
    return dot(color, vec3f(0.299, 0.587, 0.114));
}

fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
}

fn screenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return vec3f(1.0) - (vec3f(1.0) - base) * (vec3f(1.0) - blend);
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return overlayBlend(blend, base);
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.00001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(0.99999));
}

fn luminosityBlend(base: vec3f, blend: vec3f) -> vec3f {
    let delta = luma(blend) - luma(base);
    return clamp(base + vec3f(delta), vec3f(0.0), vec3f(1.0));
}

fn isInRect(uv: vec2f, left: f32, top: f32, right: f32, bottom: f32) -> f32 {
    let inX = step(left, uv.x) * step(uv.x, 1.0 - right);
    let inY = step(top, uv.y) * step(uv.y, 1.0 - bottom);
    return inX * inY;
}

fn isInStageArtworkArea(uv: vec2f) -> f32 {
    let top = 0.0985;
    let bottom = 0.4715;
    let inY = step(top, uv.y) * step(uv.y, bottom);

    let right = mix(0.915, 0.92, clamp((uv.y - top) / (bottom - top), 0.0, 1.0));
    var left = 0.08;
    if (uv.y < 0.12) {
        left = mix(0.57, 0.54, clamp((uv.y - 0.0985) / (0.12 - 0.0985), 0.0, 1.0));
    } else if (uv.y < 0.14) {
        left = mix(0.17, 0.16, clamp((uv.y - 0.12) / (0.14 - 0.12), 0.0, 1.0));
    } else if (uv.y < 0.16) {
        left = mix(0.16, 0.12, clamp((uv.y - 0.14) / (0.16 - 0.14), 0.0, 1.0));
    }

    return inY * step(left, uv.x) * step(uv.x, right);
}

fn isInArtworkArea(uv: vec2f) -> f32 {
    if (uniforms.clipMode > 1.5) {
        return isInRect(uv, 0.085, 0.145, 0.085, 0.482);
    }
    if (uniforms.clipMode > 0.5) {
        return isInStageArtworkArea(uv);
    }
    return isInRect(uv, 0.08, 0.0985, 0.08, 0.5285);
}

fn backgroundUv(uv: vec2f, scale: vec2f, position: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - scale) * position;
    return (uv - origin) / scale;
}

fn cssBackground() -> vec2f {
    return vec2f(
        0.37 + uniforms.pointer.x * 0.26,
        0.33 + uniforms.pointer.y * 0.34
    );
}

fn rainbowStops(t: f32) -> vec3f {
    let red = vec3f(0.973, 0.055, 0.208);
    let yellow = vec3f(0.933, 0.875, 0.063);
    let green = vec3f(0.129, 0.914, 0.522);
    let blue = vec3f(0.051, 0.741, 0.914);
    let violet = vec3f(0.788, 0.161, 0.945);
    let p = fract(t) * 5.0;
    if (p < 1.0) { return mix(violet, blue, p); }
    if (p < 2.0) { return mix(blue, green, p - 1.0); }
    if (p < 3.0) { return mix(green, yellow, p - 2.0); }
    if (p < 4.0) { return mix(yellow, red, p - 3.0); }
    return mix(red, violet, p - 4.0);
}

fn rainbowLayer(uv: vec2f) -> vec3f {
    let bg = cssBackground();
    let pos = vec2f(((0.5 - bg.x) * 2.6) + 0.5, ((0.5 - bg.y) * 3.5) + 0.5);
    let layerUv = backgroundUv(uv, vec2f(4.0, 4.0), pos);
    let angle = radians(110.0);
    let dir = vec2f(cos(angle), sin(angle));
    return rainbowStops(dot(layerUv, dir) * 1.9);
}

fn scanlineLayer(uv: vec2f, cardSize: vec2f) -> vec3f {
    let cardWidthPx = max(cardSize.x * uniforms.resolution.y / uniforms.dpr, 1.0);
    let stripe = fract(uv.x * cardWidthPx / 4.0);
    let value = select(0.0, 0.4, stripe >= 0.5);
    return vec3f(value);
}

fn cssLinearGradientStop(t: f32, aPos: f32, aValue: f32, bPos: f32, bValue: f32) -> f32 {
    return mix(aValue, bValue, clamp((t - aPos) / (bPos - aPos), 0.0, 1.0));
}

fn barPattern(uv: vec2f, position: vec2f, repeatEnd: f32) -> vec3f {
    let layerUv = backgroundUv(uv, vec2f(2.0, 2.0), position);
    let bars = 0.03;
    let x = fract(layerUv.x / repeatEnd) * repeatEnd;
    let p0 = bars * 2.0;
    let p1 = bars * 3.0;
    let p2 = bars * 3.5;
    let p3 = bars * 4.0;
    let p4 = bars * 5.0;
    var value = 0.0;
    if (x < p0) {
        value = 0.0;
    } else if (x < p1) {
        value = cssLinearGradientStop(x, p0, 0.0, p1, 0.70);
    } else if (x < p2) {
        value = cssLinearGradientStop(x, p1, 0.70, p2, 0.0);
    } else if (x < p3) {
        value = cssLinearGradientStop(x, p2, 0.0, p3, 0.70);
    } else if (x < p4) {
        value = cssLinearGradientStop(x, p3, 0.70, p4, 0.0);
    }
    return vec3f(value);
}

fn movingBeamLineDetail(uv: vec2f, position: vec2f, repeatEnd: f32) -> vec3f {
    let layerUv = backgroundUv(uv, vec2f(2.0, 2.0), position);
    let beamPhase = fract(layerUv.x / repeatEnd);
    let fine = 1.0 - smoothstep(0.020, 0.045, fract(beamPhase * 18.0));
    let withinBeam = smoothstep(0.14, 0.22, beamPhase) * (1.0 - smoothstep(0.38, 0.52, beamPhase));
    return vec3f(fine * withinBeam * 0.22);
}

fn shineAfterLayer(uv: vec2f) -> vec3f {
    let dist = distance(uv, uniforms.pointer);
    let t = clamp(dist / max(farthestCornerDist(uniforms.pointer), 0.001), 0.0, 1.0);
    var gray: f32;
    if (t < 0.34) {
        gray = mix(0.98, 0.80, t / 0.34);
    } else {
        gray = mix(0.80, 0.0, clamp((t - 0.34) / 0.76, 0.0, 1.0));
    }
    return applyFilter(vec3f(gray), 0.86, 4.45, 1.0);
}

fn shineAfterAlpha(uv: vec2f) -> f32 {
    let dist = distance(uv, uniforms.pointer);
    let t = clamp(dist / max(farthestCornerDist(uniforms.pointer), 0.001), 0.0, 1.0);
    if (t < 0.34) {
        return mix(0.96, 0.20, t / 0.34);
    }
    return mix(0.20, 1.0, clamp((t - 0.34) / 0.76, 0.0, 1.0));
}

fn glareAfterLayer(uv: vec2f) -> vec3f {
    let dist = distance(uv, uniforms.pointer);
    let t = clamp(dist / max(farthestCornerDist(uniforms.pointer), 0.001), 0.0, 1.0);
    let c1 = vec3f(0.90, 1.0, 1.0);
    let c2 = vec3f(0.39);
    let c3 = vec3f(0.0);
    var color: vec3f;
    if (t < 0.05) {
        color = c1;
    } else if (t < 0.55) {
        color = mix(c1, c2, (t - 0.05) / 0.50);
    } else {
        color = mix(c2, c3, clamp((t - 0.55) / 0.55, 0.0, 1.0));
    }
    return applyFilter(color, 0.48, 2.4, 1.0);
}

fn baseGlareLayer(uv: vec2f) -> vec3f {
    let dist = distance(uv, uniforms.pointer);
    let t = clamp(dist / max(farthestCornerDist(uniforms.pointer), 0.001), 0.0, 1.0);
    let color = mix(vec3f(1.0), vec3f(0.0), smoothstep(0.20, 0.90, t));
    return applyFilter(color, 0.72, 1.38, 1.0);
}

@fragment
fn fragmentMain(@location(0) uv: vec2f, @location(1) localPos: vec2f) -> @location(0) vec4f {
    let cardSize = getCardSize();
    let cornerRadius = 0.04;
    let pxToLocal = 2.0 * uniforms.dpr / uniforms.resolution.y;

    let dist = sdRoundedRect(localPos, cardSize, cornerRadius);

    let shadowOffset = 22.0 * pxToLocal;
    let shadowBlur = 34.0 * pxToLocal;
    let shadowSpread = -7.0 * pxToLocal;
    let shadowPos = localPos - vec2f(0.0, -shadowOffset);
    let shadowSize = cardSize + vec2f(shadowSpread);
    let shadowRadius = max(cornerRadius + shadowSpread, 0.0);
    let shadowDist = sdRoundedRect(shadowPos, shadowSize, shadowRadius);
    let shadowAlpha = 1.0 - smoothstep(-shadowBlur, shadowBlur, shadowDist);
    let shadowColor = vec4f(0.0, 0.0, 0.0, shadowAlpha);

    let cardUV = vec2f(
        (localPos.x / (cardSize.x * 2.0)) + 0.5,
        0.5 - (localPos.y / (cardSize.y * 2.0))
    );

    let textureColor = textureSampleLevel(cardTexture, linearSampler, cardUV, 0.0);
    let maskColor = textureSampleLevel(maskTexture, linearSampler, cardUV, 0.0);
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);
    let foilMask = maskColor.a;
    let holoMask = isInArtworkArea(cardUV) * foilMask * cardMask;

    var cardRgb = textureColor.rgb;
    let bg = cssBackground();

    let rainbow = rainbowLayer(cardUV);
    var shine = overlayBlend(rainbow, scanlineLayer(cardUV, cardSize));
    shine = applyFilter(shine, 1.1, 1.1, 0.35);

    let barPos1 = vec2f((((0.5 - bg.x) * 1.65) + 0.5) + (bg.y * 0.5), bg.x);
    let barPos2 = vec2f((((0.5 - bg.x) * -0.9) + 0.5) - (bg.y * 0.75), bg.y);
    let bars1 = barPattern(cardUV, barPos1, 0.42);
    let bars2 = barPattern(cardUV, barPos2, 0.30);
    var bars = screenBlend(bars1, bars2);
    bars = applyFilter(bars, 1.08, 1.18, 1.0);
    let movingLines = screenBlend(
        movingBeamLineDetail(cardUV, barPos1, 0.42),
        movingBeamLineDetail(cardUV, barPos2, 0.30)
    );

    var shineGroup = hardLightBlend(shine, bars);
    shineGroup = screenBlend(shineGroup, movingLines);

    let luminosity = shineAfterLayer(cardUV);
    let luminosityCoverage = shineAfterAlpha(cardUV);
    shineGroup = mix(shineGroup, luminosityBlend(shineGroup, luminosity), luminosityCoverage);
    let shineCoverage = smoothstep(0.05, 0.66, luma(shineGroup));
    cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, shineGroup), uniforms.opacity * holoMask * shineCoverage * 0.82);

    let glare = baseGlareLayer(cardUV);
    cardRgb = mix(cardRgb, overlayBlend(cardRgb, glare), uniforms.opacity * cardMask * 0.68);

    let glareAfter = glareAfterLayer(cardUV);
    let glareAfterCoverage = smoothstep(0.10, 0.78, luma(glareAfter));
    cardRgb = mix(cardRgb, overlayBlend(cardRgb, glareAfter), uniforms.opacity * holoMask * glareAfterCoverage * 0.42);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = vec4f(
        mix(shadowColor.rgb, finalCard.rgb, finalCard.a),
        max(shadowColor.a, finalCard.a)
    );

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,Fn=`struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    perspective: f32,
    opacity: f32,
    foilBrightness: f32,
    _pad1: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) localPos: vec2f,
};

fn rotateX(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

fn rotateY(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
}

@vertex
fn vertexMain(@location(0) pos: vec2f, @location(1) uv: vec2f) -> VertexOutput {
    var output: VertexOutput;
    let canvasAspect = uniforms.resolution.x / uniforms.resolution.y;
    var p = vec3f(pos, 0.0);
    p = rotateX(p, uniforms.rotation.y);
    p = rotateY(p, uniforms.rotation.x);
    let w = uniforms.perspective - p.z;
    output.position = vec4f((p.x / canvasAspect) * uniforms.perspective, p.y * uniforms.perspective, 0.0, w);
    output.uv = uv;
    output.localPos = pos;
    return output;
}

fn sdRoundedRect(p: vec2f, b: vec2f, r: f32) -> f32 {
    let q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2f(0.0))) - r;
}

fn getCardSize() -> vec2f {
    let cardAspect = 0.718;
    let panePadding = 48.0 * uniforms.dpr;
    let maxWidthFromHeight = 0.6;
    let maxWidthFromPane = max((uniforms.resolution.x - panePadding) / uniforms.resolution.y, 0.0);
    let cardWidth = min(maxWidthFromHeight, maxWidthFromPane);
    return vec2f(cardWidth, cardWidth / cardAspect);
}

fn farthestCornerDist(p: vec2f) -> f32 {
    let d0 = distance(p, vec2f(0.0, 0.0));
    let d1 = distance(p, vec2f(1.0, 0.0));
    let d2 = distance(p, vec2f(0.0, 1.0));
    let d3 = distance(p, vec2f(1.0, 1.0));
    return max(max(d0, d1), max(d2, d3));
}

fn luminance(c: vec3f) -> f32 {
    return dot(c, vec3f(0.299, 0.587, 0.114));
}

fn adjustBrightnessContrast(color: vec3f, brightness: f32, contrast: f32) -> vec3f {
    return clamp((color * brightness - vec3f(0.5)) * contrast + vec3f(0.5), vec3f(0.0), vec3f(1.0));
}

fn differenceBlend(base: vec3f, blend: vec3f) -> vec3f {
    return abs(base - blend);
}

fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
}

fn softLightChannel(base: f32, blend: f32) -> f32 {
    let low = base - (1.0 - 2.0 * blend) * base * (1.0 - base);
    let d = select(((16.0 * base - 12.0) * base + 4.0) * base, sqrt(max(base, 0.0)), base > 0.25);
    let high = base + (2.0 * blend - 1.0) * (d - base);
    return mix(low, high, step(0.5, blend));
}

fn softLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return vec3f(
        softLightChannel(base.r, blend.r),
        softLightChannel(base.g, blend.g),
        softLightChannel(base.b, blend.b)
    );
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.00001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(1.0));
}

fn radialReversePattern(uv: vec2f) -> vec3f {
    let backgroundUv = ((uv - vec2f(0.5)) / 1.2) + vec2f(0.5);
    let dist = distance(backgroundUv, uniforms.pointer);
    let t = dist / max(farthestCornerDist(uniforms.pointer), 0.001);
    let whiteToBlack = 1.0 - clamp((t - 0.05) / 0.45, 0.0, 1.0);
    let blackToWhite = clamp((t - 0.5) / 0.3, 0.0, 1.0);
    return vec3f(max(whiteToBlack, blackToWhite));
}

fn diagonalPattern(uv: vec2f) -> vec3f {
    let backgroundUv = (uv + uniforms.pointer) * 0.5;
    let axis = dot(backgroundUv - vec2f(0.5), normalize(vec2f(-1.0, -1.0))) + 0.5;
    let blackToWhite = clamp((axis - 0.15) / 0.35, 0.0, 1.0);
    let whiteToBlack = 1.0 - clamp((axis - 0.5) / 0.35, 0.0, 1.0);
    let band = blackToWhite * whiteToBlack;
    return vec3f(band);
}

fn glareLayer(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let d0 = distance(uv, vec2f(0.0, 0.0));
    let d1 = distance(uv, vec2f(1.0, 0.0));
    let d2 = distance(uv, vec2f(0.0, 1.0));
    let d3 = distance(uv, vec2f(1.0, 1.0));
    let maxDist = max(max(d0, d1), max(d2, d3));
    let t = clamp(dist / maxDist, 0.0, 1.0);

    var color: vec3f;
    var alpha: f32;
    if (t < 0.1) {
        color = vec3f(1.0);
        alpha = 0.8;
    } else if (t < 0.2) {
        color = vec3f(1.0);
        alpha = mix(0.8, 0.65, (t - 0.1) / 0.1);
    } else if (t < 0.9) {
        let s = (t - 0.2) / 0.7;
        color = mix(vec3f(1.0), vec3f(0.0), s);
        alpha = mix(0.65, 0.5, s);
    } else {
        color = vec3f(0.0);
        alpha = 0.5;
    }

    return vec4f(color, alpha * uniforms.opacity * 0.72);
}

@fragment
fn fragmentMain(@location(0) uv: vec2f, @location(1) localPos: vec2f) -> @location(0) vec4f {
    let cardSize = getCardSize();
    let cornerRadius = 0.04;
    let pxToLocal = 2.0 * uniforms.dpr / uniforms.resolution.y;

    let dist = sdRoundedRect(localPos, cardSize, cornerRadius);

    let shadowOffset = 22.0 * pxToLocal;
    let shadowBlur = 34.0 * pxToLocal;
    let shadowSpread = -7.0 * pxToLocal;
    let shadowPos = localPos - vec2f(0.0, -shadowOffset);
    let shadowSize = cardSize + vec2f(shadowSpread);
    let shadowRadius = max(cornerRadius + shadowSpread, 0.0);
    let shadowDist = sdRoundedRect(shadowPos, shadowSize, shadowRadius);
    let shadowAlpha = 1.0 - smoothstep(-shadowBlur, shadowBlur, shadowDist);
    let shadowColor = vec4f(0.0, 0.0, 0.0, shadowAlpha);

    let cardUV = vec2f(
        (localPos.x / (cardSize.x * 2.0)) + 0.5,
        0.5 - (localPos.y / (cardSize.y * 2.0))
    );

    let textureColor = textureSampleLevel(cardTexture, linearSampler, cardUV, 0.0);
    let foilColor = textureSampleLevel(foilTexture, linearSampler, cardUV, 0.0).rgb;
    let maskColor = textureSampleLevel(maskTexture, linearSampler, cardUV, 0.0);
    let foilMask = maskColor.a;
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);

    let pointerCenter = length(uniforms.pointer - vec2f(0.5)) / 0.70710678;
    let reverseOpacity = clamp((1.5 * uniforms.opacity) - pointerCenter, 0.0, 1.0);

    var shine = foilColor;
    shine = differenceBlend(shine, diagonalPattern(cardUV));
    shine = softLightBlend(shine, radialReversePattern(cardUV));
    shine = adjustBrightnessContrast(shine, uniforms.foilBrightness, 1.5);

    var cardRgb = textureColor.rgb;
    let dodged = colorDodgeBlend(cardRgb, shine);
    cardRgb = mix(cardRgb, dodged, reverseOpacity * foilMask * cardMask);

    let glare = glareLayer(cardUV);
    let glareCombined = overlayBlend(cardRgb, glare.rgb);
    cardRgb = mix(cardRgb, glareCombined, glare.a * cardMask);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = vec4f(
        mix(shadowColor.rgb, finalCard.rgb, finalCard.a),
        max(shadowColor.a, finalCard.a)
    );

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,zn=`struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    perspective: f32,
    opacity: f32,
    _pad0: f32,
    _pad1: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;
@group(0) @binding(5) var glitterTexture: texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) localPos: vec2f,
};

fn rotateX(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

fn rotateY(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
}

@vertex
fn vertexMain(@location(0) pos: vec2f, @location(1) uv: vec2f) -> VertexOutput {
    var output: VertexOutput;
    let canvasAspect = uniforms.resolution.x / uniforms.resolution.y;
    var p = vec3f(pos, 0.0);
    p = rotateX(p, uniforms.rotation.y);
    p = rotateY(p, uniforms.rotation.x);
    let w = uniforms.perspective - p.z;
    output.position = vec4f((p.x / canvasAspect) * uniforms.perspective, p.y * uniforms.perspective, 0.0, w);
    output.uv = uv;
    output.localPos = pos;
    return output;
}

fn sdRoundedRect(p: vec2f, b: vec2f, r: f32) -> f32 {
    let q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2f(0.0))) - r;
}

fn getCardSize() -> vec2f {
    let cardAspect = 0.718;
    let panePadding = 48.0 * uniforms.dpr;
    let maxWidthFromHeight = 0.6;
    let maxWidthFromPane = max((uniforms.resolution.x - panePadding) / uniforms.resolution.y, 0.0);
    let cardWidth = min(maxWidthFromHeight, maxWidthFromPane);
    return vec2f(cardWidth, cardWidth / cardAspect);
}

fn farthestCornerDist(p: vec2f) -> f32 {
    let d0 = distance(p, vec2f(0.0, 0.0));
    let d1 = distance(p, vec2f(1.0, 0.0));
    let d2 = distance(p, vec2f(0.0, 1.0));
    let d3 = distance(p, vec2f(1.0, 1.0));
    return max(max(d0, d1), max(d2, d3));
}

// RGB to HSL conversion
fn rgbToHsl(rgb: vec3f) -> vec3f {
    let maxC = max(max(rgb.r, rgb.g), rgb.b);
    let minC = min(min(rgb.r, rgb.g), rgb.b);
    let l = (maxC + minC) * 0.5;

    if (maxC == minC) {
        return vec3f(0.0, 0.0, l);
    }

    let d = maxC - minC;
    let s = select(d / (2.0 - maxC - minC), d / (maxC + minC), l > 0.5);

    var h: f32;
    if (maxC == rgb.r) {
        h = (rgb.g - rgb.b) / d + select(0.0, 6.0, rgb.g < rgb.b);
    } else if (maxC == rgb.g) {
        h = (rgb.b - rgb.r) / d + 2.0;
    } else {
        h = (rgb.r - rgb.g) / d + 4.0;
    }
    h /= 6.0;

    return vec3f(h, s, l);
}

fn hueToRgb(p: f32, q: f32, t_in: f32) -> f32 {
    var t = t_in;
    if (t < 0.0) { t += 1.0; }
    if (t > 1.0) { t -= 1.0; }
    if (t < 1.0 / 6.0) { return p + (q - p) * 6.0 * t; }
    if (t < 1.0 / 2.0) { return q; }
    if (t < 2.0 / 3.0) { return p + (q - p) * (2.0 / 3.0 - t) * 6.0; }
    return p;
}

// HSL to RGB conversion
fn hslToRgb(hsl: vec3f) -> vec3f {
    if (hsl.y == 0.0) {
        return vec3f(hsl.z);
    }

    let q = select(hsl.z + hsl.y - hsl.z * hsl.y, hsl.z * (1.0 + hsl.y), hsl.z < 0.5);
    let p = 2.0 * hsl.z - q;

    return vec3f(
        hueToRgb(p, q, hsl.x + 1.0 / 3.0),
        hueToRgb(p, q, hsl.x),
        hueToRgb(p, q, hsl.x - 1.0 / 3.0)
    );
}

// Blend modes
fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    return min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
}

fn colorBurnBlend(base: vec3f, blend: vec3f) -> vec3f {
    return vec3f(1.0) - min((vec3f(1.0) - base) / max(blend, vec3f(0.0001)), vec3f(1.0));
}

fn softLightChannel(base: f32, blend: f32) -> f32 {
    if (blend <= 0.5) {
        return base - (1.0 - 2.0 * blend) * base * (1.0 - base);
    } else {
        let d = select(((16.0 * base - 12.0) * base + 4.0) * base, sqrt(base), base > 0.25);
        return base + (2.0 * blend - 1.0) * (d - base);
    }
}

fn softLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return vec3f(
        softLightChannel(base.r, blend.r),
        softLightChannel(base.g, blend.g),
        softLightChannel(base.b, blend.b)
    );
}

fn lightenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return max(base, blend);
}

fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
}

// Saturation blend: takes hue and luminance from base, saturation from blend
fn saturationBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseHsl = rgbToHsl(base);
    let blendHsl = rgbToHsl(blend);
    return hslToRgb(vec3f(baseHsl.x, blendHsl.y, baseHsl.z));
}

// Apply brightness, contrast, saturate filter
fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

// Sunpillar colors
const SUNPILLAR_1: vec3f = vec3f(0.973, 0.459, 0.459); // hsl(2, 100%, 73%)
const SUNPILLAR_2: vec3f = vec3f(0.969, 0.878, 0.376); // hsl(53, 100%, 69%)
const SUNPILLAR_3: vec3f = vec3f(0.573, 1.0, 0.376);   // hsl(93, 100%, 69%)
const SUNPILLAR_4: vec3f = vec3f(0.518, 1.0, 0.835);   // hsl(176, 100%, 76%)
const SUNPILLAR_5: vec3f = vec3f(0.478, 0.569, 0.969); // hsl(228, 100%, 74%)
const SUNPILLAR_6: vec3f = vec3f(0.780, 0.459, 0.973); // hsl(283, 100%, 73%)

// Sunpillar gradient (repeating linear gradient at 133deg)
fn sunpillarGradient(uv: vec2f, backgroundX: f32, backgroundY: f32) -> vec3f {
    let angle = radians(133.0);
    let dir = vec2f(cos(angle), sin(angle));

    // Background position offset based on pointer
    let offsetX = (0.5 - backgroundX) * 3.0;
    let offsetY = (0.5 - backgroundY) * 3.0;

    // Project UV onto gradient direction with large scale (400% x 800%)
    let scaledUv = (uv - 0.5) * vec2f(4.0, 8.0) + vec2f(0.5 + offsetX, 0.5 + offsetY);
    let t = dot(scaledUv, dir);

    // Space is 5% per color stop, 7 stops total = 35% repeat
    let space = 0.05;
    let cycleT = fract(t / (space * 7.0)) * 7.0;

    // Interpolate between colors based on position in cycle
    // Colors for :after are shifted: 6,1,2,3,4,5,6,1...
    if (cycleT < 1.0) {
        return mix(SUNPILLAR_6, SUNPILLAR_1, cycleT);
    } else if (cycleT < 2.0) {
        return mix(SUNPILLAR_1, SUNPILLAR_2, cycleT - 1.0);
    } else if (cycleT < 3.0) {
        return mix(SUNPILLAR_2, SUNPILLAR_3, cycleT - 2.0);
    } else if (cycleT < 4.0) {
        return mix(SUNPILLAR_3, SUNPILLAR_4, cycleT - 3.0);
    } else if (cycleT < 5.0) {
        return mix(SUNPILLAR_4, SUNPILLAR_5, cycleT - 4.0);
    } else if (cycleT < 6.0) {
        return mix(SUNPILLAR_5, SUNPILLAR_6, cycleT - 5.0);
    } else {
        return mix(SUNPILLAR_6, SUNPILLAR_1, cycleT - 6.0);
    }
}

// Shine layer radial gradient (returns vec4 with alpha for proper blending)
fn shineRadialGradient(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let maxDist = farthestCornerDist(uniforms.pointer);
    let t = clamp(dist / maxDist, 0.0, 1.0);

    // hsla(150, 20%, 10%, 1) at 10% -> hsla(177, 22%, 80%, 0.1) at 50% -> hsla(0, 0%, 95%, 0.98) at 90%
    // The alpha 0.1 at 50% is crucial - it makes the middle zone nearly transparent
    let color1 = vec4f(0.08, 0.12, 0.10, 1.0);     // alpha 1.0 at center
    let color2 = vec4f(0.624, 0.840, 0.824, 0.1);  // alpha 0.1 at 50% (very transparent!)
    let color3 = vec4f(0.95, 0.95, 0.95, 0.98);    // alpha 0.98 at edges

    if (t < 0.1) {
        return color1;
    } else if (t < 0.5) {
        return mix(color1, color2, (t - 0.1) / 0.4);
    } else if (t < 0.9) {
        return mix(color2, color3, (t - 0.5) / 0.4);
    } else {
        return color3;
    }
}

// Shine:before radial gradient
fn shineBeforeRadialGradient(uv: vec2f) -> vec3f {
    let dist = distance(uv, uniforms.pointer);
    let maxDist = farthestCornerDist(uniforms.pointer);
    let t = clamp(dist / maxDist, 0.0, 1.0);

    // hsla(50, 20%, 90%, 0.95) at 10% -> rgba(181, 139, 164, 0.5) at 50% -> hsl(0, 0%, 0%) at 60%
    let color1 = vec3f(0.918, 0.902, 0.863); // hsl(50, 20%, 90%)
    let color2 = vec3f(0.710, 0.545, 0.643); // rgb(181, 139, 164)
    let color3 = vec3f(0.0, 0.0, 0.0);

    if (t < 0.1) {
        return color1;
    } else if (t < 0.5) {
        return mix(color1, color2, (t - 0.1) / 0.4);
    } else if (t < 0.6) {
        return mix(color2, color3, (t - 0.5) / 0.1);
    } else {
        return color3;
    }
}

// Glare radial gradient (for masked cards)
fn glareGradient(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let maxDist = farthestCornerDist(uniforms.pointer);
    let t = clamp(dist / maxDist, 0.0, 1.0);

    // hsla(50, 20%, 90%, 0.45) at 0% -> hsla(150, 20%, 30%, 0.45) at 45% -> hsla(0, 0%, 0%, 0.9) at 120%
    let color1 = vec3f(0.918, 0.902, 0.863); // hsl(50, 20%, 90%)
    let color2 = vec3f(0.24, 0.36, 0.30);    // hsl(150, 20%, 30%)
    let color3 = vec3f(0.0, 0.0, 0.0);

    if (t < 0.45) {
        let s = t / 0.45;
        return vec4f(mix(color1, color2, s), 0.45);
    } else {
        let s = clamp((t - 0.45) / 0.75, 0.0, 1.0);
        return vec4f(mix(color2, color3, s), mix(0.45, 0.9, s));
    }
}

// Glare:after radial gradient (masked)
fn glareAfterGradient(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let maxDist = farthestCornerDist(uniforms.pointer);
    let t = clamp(dist / maxDist, 0.0, 1.0);

    // hsla(50, 20%, 90%, 0.75) at 0% -> hsla(150, 20%, 30%, 0.65) at 45% -> hsla(0, 0%, 0%, 1) at 90%
    let color1 = vec3f(0.918, 0.902, 0.863);
    let color2 = vec3f(0.24, 0.36, 0.30);
    let color3 = vec3f(0.0, 0.0, 0.0);

    if (t < 0.45) {
        let s = t / 0.45;
        return vec4f(mix(color1, color2, s), mix(0.75, 0.65, s));
    } else if (t < 0.9) {
        let s = (t - 0.45) / 0.45;
        return vec4f(mix(color2, color3, s), mix(0.65, 1.0, s));
    } else {
        return vec4f(color3, 1.0);
    }
}

@fragment
fn fragmentMain(@location(0) uv: vec2f, @location(1) localPos: vec2f) -> @location(0) vec4f {
    let cardSize = getCardSize();
    let cornerRadius = 0.04;
    let pxToLocal = 2.0 * uniforms.dpr / uniforms.resolution.y;

    let dist = sdRoundedRect(localPos, cardSize, cornerRadius);

    // Shadow
    let shadowOffset = 22.0 * pxToLocal;
    let shadowBlur = 34.0 * pxToLocal;
    let shadowSpread = -7.0 * pxToLocal;
    let shadowPos = localPos - vec2f(0.0, -shadowOffset);
    let shadowSize = cardSize + vec2f(shadowSpread);
    let shadowRadius = max(cornerRadius + shadowSpread, 0.0);
    let shadowDist = sdRoundedRect(shadowPos, shadowSize, shadowRadius);
    let shadowAlpha = 1.0 - smoothstep(-shadowBlur, shadowBlur, shadowDist);
    let shadowColor = vec4f(0.0, 0.0, 0.0, shadowAlpha);

    let cardUV = vec2f(
        (localPos.x / (cardSize.x * 2.0)) + 0.5,
        0.5 - (localPos.y / (cardSize.y * 2.0))
    );

    let textureColor = textureSampleLevel(cardTexture, linearSampler, cardUV, 0.0);
    let foilColor = textureSampleLevel(foilTexture, linearSampler, cardUV, 0.0).rgb;
    let maskColor = textureSampleLevel(maskTexture, linearSampler, cardUV, 0.0);
    let foilMask = maskColor.a;
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);

    // Sample glitter at two positions (--glittersize: 25%, positions: 40% 45% and 55% 55%)
    let glitterUv1 = fract(cardUV * 4.0 + vec2f(0.4, 0.45));
    let glitterUv2 = fract(cardUV * 4.0 + vec2f(0.55, 0.55));
    let glitter1 = textureSampleLevel(glitterTexture, linearSampler, glitterUv1, 0.0).rgb;
    let glitter2 = textureSampleLevel(glitterTexture, linearSampler, glitterUv2, 0.0).rgb;

    var cardRgb = textureColor.rgb;

    // Background position for gradients
    let backgroundX = mix(0.37, 0.63, uniforms.pointer.x);
    let backgroundY = mix(0.33, 0.67, uniforms.pointer.y);
    let pointerFromCenter = length(uniforms.pointer - vec2f(0.5)) / 0.70710678;

    // === Build .card__shine compositing group ===
    // In CSS, backgrounds are composited bottom-to-top:
    // 1. radial gradient (base)
    // 2. glitter2 color-burns onto radial
    // 3. glitter1 soft-lights onto result
    // The glitter positions are FIXED - they don't move with pointer.

    let shineRadial = shineRadialGradient(cardUV);
    let shineAlpha = shineRadial.a;

    // Combine glitter textures - soft-light blend between the two glitter layers
    let glitterCombined = softLightBlend(glitter1, glitter2);

    // Extract sparkle intensity - bright spots in glitter become sparkles
    let sparkleIntensity = max(max(glitterCombined.r, glitterCombined.g), glitterCombined.b);

    // Start with radial as base for the shine
    var shineMain = shineRadial.rgb;
    // Apply glitter via color-burn (darkens based on glitter, bright glitter = less darkening)
    shineMain = colorBurnBlend(shineMain, glitterCombined);
    shineMain = applyFilter(shineMain, 1.0, 1.0, 0.9);

    // Shine:before blends with shine main using lighten (NOT masked, opacity 0.5)
    var shineBefore = shineBeforeRadialGradient(cardUV);
    shineBefore = colorBurnBlend(shineBefore, foilColor);

    // Shine:after is sunpillar gradient with saturation blend
    var shineAfter = sunpillarGradient(cardUV, backgroundX, backgroundY);
    let shineAfterBrightness = 0.75 - (pointerFromCenter * 0.5);
    shineAfter = applyFilter(shineAfter, shineAfterBrightness, 1.0, 1.0);

    // Composite the shine group:
    // In artwork area: shineMain -> lighten(shineBefore) -> saturation(shineAfter)
    // Outside artwork: transparent -> lighten(shineBefore) -> saturation(shineAfter)

    // Inside artwork (foilMask > 0): full shine compositing
    var shineGroupArtwork = shineMain;
    shineGroupArtwork = mix(shineGroupArtwork, lightenBlend(shineGroupArtwork, shineBefore), 0.5);
    shineGroupArtwork = saturationBlend(shineGroupArtwork, shineAfter);

    // Outside artwork (foilMask = 0): only :before and :after
    var shineGroupOutside = shineBefore;
    shineGroupOutside = saturationBlend(shineGroupOutside, shineAfter);

    // Blend shine group with card using color-dodge
    // The shineAlpha controls how much the shine affects the card (key for matching CSS)
    // Artwork area: use full shine group, masked, modulated by shine alpha
    let shineArtworkBlended = colorDodgeBlend(cardRgb, shineGroupArtwork);
    cardRgb = mix(cardRgb, shineArtworkBlended, uniforms.opacity * foilMask * cardMask * shineAlpha);

    // Outside artwork: use shine:before + :after with lighten for :before, then color-dodge
    // But :before has opacity 0.5, so we blend it first
    let shineOutsideBase = mix(vec3f(0.0), shineBefore, 0.5);
    let shineOutsideWithSat = saturationBlend(shineOutsideBase, shineAfter);
    let shineOutsideBlended = colorDodgeBlend(cardRgb, shineOutsideWithSat);
    let outsideMask = (1.0 - foilMask) * cardMask;
    cardRgb = mix(cardRgb, shineOutsideBlended, uniforms.opacity * outsideMask * shineAlpha);

    // Add stable glitter sparkles overlay (fixed positions, not affected by pointer)
    // This creates the visible sparkle dots that stay in place
    let sparkleThreshold = 0.65;  // Only show brightest spots as sparkles
    let sparkle = smoothstep(sparkleThreshold, 0.9, sparkleIntensity);
    let sparkleColor = glitterCombined * sparkle;
    cardRgb = mix(cardRgb, cardRgb + sparkleColor * 0.4, uniforms.opacity * foilMask * cardMask);

    // === card__glare compositing group ===
    var glare = glareGradient(cardUV);
    let glareFiltered = applyFilter(glare.rgb, 1.0, 2.0, 1.0);
    let glareBlended = overlayBlend(cardRgb, glareFiltered);
    cardRgb = mix(cardRgb, glareBlended, min(glare.a * 1.08, 1.0) * uniforms.opacity * cardMask);

    // Glare:after (MASKED to artwork)
    var glareAfter = glareAfterGradient(cardUV);
    let glareAfterFiltered = applyFilter(glareAfter.rgb, 1.06, 1.5, 1.0);
    let glareAfterBlended = overlayBlend(cardRgb, glareAfterFiltered);
    cardRgb = mix(cardRgb, glareAfterBlended, glareAfter.a * foilMask * cardMask);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = vec4f(
        mix(shadowColor.rgb, finalCard.rgb, finalCard.a),
        max(shadowColor.a, finalCard.a)
    );

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,Mn=`struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    perspective: f32,
    opacity: f32,
    foilBrightness: f32,
    patternScaleX: f32,
    patternScaleY: f32,
    _pad0: f32,
    _pad1: f32,
    _pad2: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;
@group(0) @binding(5) var glitterTexture: texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) localPos: vec2f,
};

fn rotateX(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

fn rotateY(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
}

@vertex
fn vertexMain(@location(0) pos: vec2f, @location(1) uv: vec2f) -> VertexOutput {
    var output: VertexOutput;
    let canvasAspect = uniforms.resolution.x / uniforms.resolution.y;
    var p = vec3f(pos, 0.0);
    p = rotateX(p, uniforms.rotation.y);
    p = rotateY(p, uniforms.rotation.x);
    let w = uniforms.perspective - p.z;
    output.position = vec4f((p.x / canvasAspect) * uniforms.perspective, p.y * uniforms.perspective, 0.0, w);
    output.uv = uv;
    output.localPos = pos;
    return output;
}

fn sdRoundedRect(p: vec2f, b: vec2f, r: f32) -> f32 {
    let q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2f(0.0))) - r;
}

fn getCardSize() -> vec2f {
    let cardAspect = 0.718;
    let panePadding = 48.0 * uniforms.dpr;
    let maxWidthFromHeight = 0.6;
    let maxWidthFromPane = max((uniforms.resolution.x - panePadding) / uniforms.resolution.y, 0.0);
    let cardWidth = min(maxWidthFromHeight, maxWidthFromPane);
    return vec2f(cardWidth, cardWidth / cardAspect);
}

fn farthestCornerDist(p: vec2f) -> f32 {
    let d0 = distance(p, vec2f(0.0, 0.0));
    let d1 = distance(p, vec2f(1.0, 0.0));
    let d2 = distance(p, vec2f(0.0, 1.0));
    let d3 = distance(p, vec2f(1.0, 1.0));
    return max(max(d0, d1), max(d2, d3));
}

// Blend modes
fn exclusionBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base + blend - 2.0 * base * blend;
}

fn darkenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return min(base, blend);
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    return min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), blend)
    );
}

fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
}

fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

// Grayscale bar pattern for criss-cross effect
// Creates stepped gradient: 10% -> 20% -> 35% -> 42.5% -> 50% -> 42.5% -> 35% -> 20% -> 10% -> 0%
fn barPattern(t: f32) -> f32 {
    let barwidth = 0.012; // 1.2%
    let cycleLen = barwidth * 10.0;
    let pos = fract(t / cycleLen) * 10.0;

    // Step function matching CSS gradient stops
    if (pos < 1.0) { return 0.10; }
    if (pos < 2.0) { return 0.20; }
    if (pos < 3.0) { return 0.35; }
    if (pos < 4.0) { return 0.425; }
    if (pos < 5.0) { return 0.50; }
    if (pos < 6.0) { return 0.425; }
    if (pos < 7.0) { return 0.35; }
    if (pos < 8.0) { return 0.20; }
    if (pos < 9.0) { return 0.10; }
    return 0.0;
}

// Criss-cross diamond pattern from two opposing 45deg gradients
fn crissCrossPattern(uv: vec2f) -> vec3f {
    // Card aspect ratio (width/height)
    let cardAspect = 0.718;

    // Center the UV coordinates (0,0 at center instead of corner)
    let centeredUv = uv - vec2f(0.5, 0.5);

    // CSS: background-position: calc(((var(--background-x) - 50%) * 1.5) + 50%)
    let bgX = mix(0.37, 0.63, uniforms.pointer.x);
    let bgY = mix(0.33, 0.67, uniforms.pointer.y);
    let offsetX = (bgX - 0.5) * 1.5;
    let offsetY = (bgY - 0.5) * 1.5;

    // Apply offset
    let offsetUv = centeredUv + vec2f(offsetX, offsetY);

    // Multiply by card aspect ratio to stretch the pattern vertically even more,
    // matching the vertical elongation seen in the CSS implementation.
    let aspectCorrectedUv = vec2f(offsetUv.x, offsetUv.y * cardAspect);

    // Apply pattern scale
    let scaledUv = aspectCorrectedUv * vec2f(uniforms.patternScaleX, uniforms.patternScaleY);

    // Simple 45deg rotation: t45 = x + y, tNeg45 = x - y
    // This naturally creates perpendicular stripes at 45 and -45 degrees
    // Phase offset to align with CSS pattern positioning
    let shiftedUv = scaledUv + vec2f(0.0, 0.033);
    let t45 = shiftedUv.x + shiftedUv.y + 0.06;
    let pattern45 = barPattern(t45);

    let tNeg45 = shiftedUv.x - shiftedUv.y + 0.06;
    let patternNeg45 = barPattern(tNeg45);

    return vec3f(pattern45, patternNeg45, 0.0);
}

// Radial gradient for shine center
fn shineRadialGradient(uv: vec2f) -> vec3f {
    // CSS: farthest-corner ellipse at calc((var(--pointer-x) * 0.5) + 25%) calc((var(--pointer-y) * 0.5) + 25%)
    // Center moves less than pointer and is offset toward top-left
    let center = uniforms.pointer * 0.5 + vec2f(0.25, 0.25);

    // Calculate farthest corner distances for ellipse sizing
    let toFarX = max(center.x, 1.0 - center.x);
    let toFarY = max(center.y, 1.0 - center.y);

    // Elliptical distance - normalize by farthest corner in each axis
    let delta = (uv - center) / vec2f(toFarX, toFarY);
    let dist = length(delta);

    // CSS: hsl(0, 0%, 95%) 20%, var(--card-glow) 130%
    let t = smoothstep(0.55, 1.8, dist);
    let white = vec3f(1.0);
    let glow = vec3f(0.25, 0.25, 0.3);

    return mix(white, glow, t);
}

// Rainbow gradient for :after layer (55deg repeating)
fn rainbowGradient(uv: vec2f) -> vec3f {
    // Background position: ((background - 50%) * -2.5) + 50% (moves opposite)
    let bgX = mix(0.37, 0.63, uniforms.pointer.x);
    let bgY = mix(0.33, 0.67, uniforms.pointer.y);
    let offsetX = (bgX - 0.5) * -2.5;
    let offsetY = (bgY - 0.5) * -2.5;

    // Scale to 400% x 100%
    let scaledUv = (uv - 0.5) * vec2f(4.0, 1.0) + vec2f(0.5 + offsetX, 0.5 + offsetY);

    let angle = radians(55.0);
    let dir = vec2f(cos(angle), sin(angle));
    let t = dot(scaledUv, dir);

    // 7 color stops over 200px * 7 = 1400px total, repeating
    let space = 0.15; // approximate spacing in UV
    let cycleT = fract(t / (space * 7.0)) * 7.0;

    // Rainbow colors from CSS
    let color1 = vec3f(0.973, 0.667, 0.667); // hsl(3, 95%, 85%)
    let color2 = vec3f(0.635, 0.835, 0.976); // hsl(207, 100%, 84%)
    let color3 = vec3f(0.976, 0.804, 0.635); // hsl(29, 100%, 85%)
    let color4 = vec3f(0.635, 0.976, 0.827); // hsl(160, 100%, 86%)
    let color5 = vec3f(0.949, 0.663, 0.973); // hsl(309, 94%, 87%)
    let color6 = vec3f(0.635, 0.941, 0.976); // hsl(188, 95%, 85%)

    if (cycleT < 1.0) {
        return mix(color1, color2, cycleT);
    } else if (cycleT < 2.0) {
        return mix(color2, color3, cycleT - 1.0);
    } else if (cycleT < 3.0) {
        return mix(color3, color4, cycleT - 2.0);
    } else if (cycleT < 4.0) {
        return mix(color4, color5, cycleT - 3.0);
    } else if (cycleT < 5.0) {
        return mix(color5, color6, cycleT - 4.0);
    } else if (cycleT < 6.0) {
        return mix(color6, color1, cycleT - 5.0);
    } else {
        return mix(color1, color2, cycleT - 6.0);
    }
}

// Glitter radial gradient for :before layer
fn glitterRadialGradient(uv: vec2f) -> vec3f {
    let center = uniforms.pointer;
    let dist = distance(uv, center);
    
    // Soft glare for glitter
    let t = smoothstep(0.0, 0.8, dist);
    return mix(vec3f(0.58), vec3f(0.20), t);
}

// Glare layer radial gradient
fn glareGradient(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let maxDist = farthestCornerDist(uniforms.pointer);
    let t = clamp(dist / maxDist, 0.0, 1.0);

    // hsla(0, 0%, 100%, 0.33) at 0% -> hsl(0, 0%, 25%) at 110%
    let white = vec3f(1.0);
    let gray = vec3f(0.25);

    let s = t / 1.1; // extend to 110%
    let color = mix(white, gray, clamp(s, 0.0, 1.0));
    let alpha = mix(0.33, 1.0, clamp(s, 0.0, 1.0));

    return vec4f(color, alpha);
}

// Check if UV is within artwork clip area (--clip: inset(9.85% 8% 52.85% 8%))
fn isInArtworkArea(uv: vec2f) -> f32 {
    let top = 0.0985;
    let right = 0.08;
    let bottom = 0.5285;
    let left = 0.08;

    let inX = step(left, uv.x) * step(uv.x, 1.0 - right);
    let inY = step(top, uv.y) * step(uv.y, 1.0 - bottom);

    return inX * inY;
}

@fragment
fn fragmentMain(@location(0) uv: vec2f, @location(1) localPos: vec2f) -> @location(0) vec4f {
    let cardSize = getCardSize();
    let cornerRadius = 0.04;
    let pxToLocal = 2.0 * uniforms.dpr / uniforms.resolution.y;

    let dist = sdRoundedRect(localPos, cardSize, cornerRadius);

    // Shadow
    let shadowOffset = 22.0 * pxToLocal;
    let shadowBlur = 34.0 * pxToLocal;
    let shadowSpread = -7.0 * pxToLocal;
    let shadowPos = localPos - vec2f(0.0, -shadowOffset);
    let shadowSize = cardSize + vec2f(shadowSpread);
    let shadowRadius = max(cornerRadius + shadowSpread, 0.0);
    let shadowDist = sdRoundedRect(shadowPos, shadowSize, shadowRadius);
    let shadowAlpha = 1.0 - smoothstep(-shadowBlur, shadowBlur, shadowDist);
    let shadowColor = vec4f(0.0, 0.0, 0.0, shadowAlpha);

    let cardUV = vec2f(
        (localPos.x / (cardSize.x * 2.0)) + 0.5,
        0.5 - (localPos.y / (cardSize.y * 2.0))
    );

    let textureColor = textureSampleLevel(cardTexture, linearSampler, cardUV, 0.0);
    let foilColor = textureSampleLevel(foilTexture, linearSampler, cardUV, 0.0).rgb;
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);

    // Artwork area mask for :after layer
    let artworkMask = isInArtworkArea(cardUV);

    var cardRgb = textureColor.rgb;

    // === .card__shine layer ===
    // Build criss-cross pattern with blend modes
    let crissCross = crissCrossPattern(cardUV);
    let pattern45 = vec3f(crissCross.r);
    let patternNeg45 = vec3f(crissCross.g);
    let radialShine = shineRadialGradient(cardUV);

    // CSS blend order (bottom to top): -45deg base -> 45deg (darken) -> radial (exclusion)
    var shineBase = patternNeg45;
    shineBase = darkenBlend(shineBase, pattern45);
    shineBase = exclusionBlend(shineBase, radialShine);

    // CSS: filter: brightness(.44) contrast(1.85) saturate(1.5)
    // Boost brightness near pointer to match CSS bright spot
    let pointerDist = distance(cardUV, uniforms.pointer);
    let brightnessBoost = mix(0.52, 0.44, smoothstep(0.0, 0.5, pointerDist));
    shineBase = applyFilter(shineBase, brightnessBoost, 1.85, 1.5);

    // Mix-blend-mode: color-dodge (whole shine layer onto card)
    let shineBlended = colorDodgeBlend(cardRgb, shineBase);
    cardRgb = mix(cardRgb, shineBlended, uniforms.opacity * cardMask);

    // === .card__shine:after layer (rainbow, artwork area only) ===
    let rainbow = rainbowGradient(cardUV);

    // hard-light blend foil with rainbow
    var afterLayer = hardLightBlend(rainbow, foilColor);

    // CSS: filter: brightness(.6) contrast(3) saturate(2)
    afterLayer = applyFilter(afterLayer, 0.6, 3.0, 2.0);

    // Mix-blend-mode: color-dodge
    let afterBlended = colorDodgeBlend(cardRgb, afterLayer);
    cardRgb = mix(cardRgb, afterBlended, uniforms.opacity * artworkMask * cardMask);

    // === .card__shine:before layer (glitter sparkle overlay) ===
    let glitterUv = fract(cardUV / 0.15); // 15% size
    let glitter = textureSampleLevel(glitterTexture, linearSampler, glitterUv, 0.0).rgb;
    let glitterRadial = glitterRadialGradient(cardUV);

    // Use a softer multiply instead of color-dodge to combine glitter with radial glare
    var beforeLayer = glitter * glitterRadial;

    // CSS: filter: brightness(.56) contrast(1.75) saturate(.45)
    // Significantly lowered to remove the "coarse/rough" look
    beforeLayer = applyFilter(beforeLayer, 0.35, 1.2, 0.35);

    // Mix-blend-mode: overlay
    let beforeBlended = overlayBlend(cardRgb, beforeLayer);
    cardRgb = mix(cardRgb, beforeBlended, uniforms.opacity * 0.5 * cardMask);

    // === .card__glare layer ===
    let glare = glareGradient(cardUV);

    // CSS: filter: brightness(1) contrast(1.5)
    let glareFiltered = applyFilter(glare.rgb, 1.0, 1.5, 1.0);

    // CSS: mix-blend-mode: hard-light
    let glareBlended = hardLightBlend(cardRgb, glareFiltered);
    cardRgb = mix(cardRgb, glareBlended, glare.a * uniforms.opacity * cardMask);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = vec4f(
        mix(shadowColor.rgb, finalCard.rgb, finalCard.a),
        max(shadowColor.a, finalCard.a)
    );

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,Vn=`struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    perspective: f32,
    opacity: f32,
    foilBrightness: f32,
    patternScaleX: f32,
    patternScaleY: f32,
    _pad0: f32,
    _pad1: f32,
    _pad2: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;
@group(0) @binding(5) var glitterTexture: texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) localPos: vec2f,
};

fn rotateX(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

fn rotateY(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
}

@vertex
fn vertexMain(@location(0) pos: vec2f, @location(1) uv: vec2f) -> VertexOutput {
    var output: VertexOutput;
    let canvasAspect = uniforms.resolution.x / uniforms.resolution.y;
    var p = vec3f(pos, 0.0);
    p = rotateX(p, uniforms.rotation.y);
    p = rotateY(p, uniforms.rotation.x);
    let w = uniforms.perspective - p.z;
    output.position = vec4f((p.x / canvasAspect) * uniforms.perspective, p.y * uniforms.perspective, 0.0, w);
    output.uv = uv;
    output.localPos = pos;
    return output;
}

fn sdRoundedRect(p: vec2f, b: vec2f, r: f32) -> f32 {
    let q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2f(0.0))) - r;
}

fn getCardSize() -> vec2f {
    let cardAspect = 0.718;
    let panePadding = 48.0 * uniforms.dpr;
    let maxWidthFromHeight = 0.6;
    let maxWidthFromPane = max((uniforms.resolution.x - panePadding) / uniforms.resolution.y, 0.0);
    let cardWidth = min(maxWidthFromHeight, maxWidthFromPane);
    return vec2f(cardWidth, cardWidth / cardAspect);
}

fn farthestCornerDist(p: vec2f) -> f32 {
    let d0 = distance(p, vec2f(0.0, 0.0));
    let d1 = distance(p, vec2f(1.0, 0.0));
    let d2 = distance(p, vec2f(0.0, 1.0));
    let d3 = distance(p, vec2f(1.0, 1.0));
    return max(max(d0, d1), max(d2, d3));
}

// Rainbow colors from CSS
fn getRainbowColor(index: i32) -> vec3f {
    switch(index % 7) {
        case 0: { return vec3f(0.576, 0.200, 0.200); } // hsl(0, 57%, 37%) - Red
        case 1: { return vec3f(0.597, 0.424, 0.183); } // hsl(40, 53%, 39%) - Orange
        case 2: { return vec3f(0.350, 0.560, 0.140); } // hsl(90, 60%, 35%) - Green
        case 3: { return vec3f(0.140, 0.560, 0.560); } // hsl(180, 60%, 35%) - Cyan
        case 4: { return vec3f(0.140, 0.560, 0.560); } // hsl(180, 60%, 35%) - Cyan
        case 5: { return vec3f(0.218, 0.350, 0.612); } // hsl(210, 57%, 39%) - Blue
        case 6: { return vec3f(0.345, 0.140, 0.480); } // hsl(280, 55%, 31%) - Purple
        default: { return vec3f(0.576, 0.200, 0.200); }
    }
}

// Rainbow gradient along an angle (smooth gradient through 7 colors repeated 3x)
fn rainbowGradient(uv: vec2f, angleDeg: f32, bgPos: vec2f, scale: f32) -> vec3f {
    let angle = radians(angleDeg);
    let dir = vec2f(cos(angle), sin(angle));

    // Scale and offset UV - background-size is 400%, so divide by 4
    let scaledUv = (uv + bgPos) / scale;
    let t = dot(scaledUv, dir) + 0.5;

    // Smooth gradient through colors (not repeating bands)
    let cycleT = fract(t * 3.0) * 7.0; // 3 cycles of 7 colors
    let idx = i32(cycleT);
    let frac = fract(cycleT);

    let color1 = getRainbowColor(idx);
    let color2 = getRainbowColor(idx + 1);

    return mix(color1, color2, smoothstep(0.0, 1.0, frac));
}

// Simple diagonal gradient (2 colors)
fn diagonalGradient(uv: vec2f, bgPos: vec2f) -> vec3f {
    let angle = radians(-45.0);
    let dir = vec2f(cos(angle), sin(angle));

    // Scale 200% and offset
    let scaledUv = (uv - 0.5) * 2.0 + 0.5 + bgPos;
    let t = clamp(dot(scaledUv, dir), 0.0, 1.0);

    let color1 = vec3f(0.576, 0.200, 0.200); // Red
    let color5 = vec3f(0.140, 0.560, 0.560); // Cyan

    return mix(color1, color5, t);
}

// Blend modes
fn luminosityBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseLum = dot(base, vec3f(0.299, 0.587, 0.114));
    let blendLum = dot(blend, vec3f(0.299, 0.587, 0.114));
    let diff = blendLum - baseLum;
    return clamp(base + diff, vec3f(0.0), vec3f(1.0));
}

fn softLightChannel(base: f32, blend: f32) -> f32 {
    if (blend <= 0.5) {
        return base - (1.0 - 2.0 * blend) * base * (1.0 - base);
    } else {
        let d = select(((16.0 * base - 12.0) * base + 4.0) * base, sqrt(base), base > 0.25);
        return base + (2.0 * blend - 1.0) * (d - base);
    }
}

fn softLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return vec3f(
        softLightChannel(base.r, blend.r),
        softLightChannel(base.g, blend.g),
        softLightChannel(base.b, blend.b)
    );
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    return min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
}

fn differenceBlend(base: vec3f, blend: vec3f) -> vec3f {
    return abs(base - blend);
}

fn darkenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return min(base, blend);
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), blend)
    );
}

fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

// Glare radial gradient
fn glareGradient(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let maxDist = farthestCornerDist(uniforms.pointer);
    let t = clamp(dist / maxDist, 0.0, 1.0);

    // hsl(0, 0%, 80%) -> hsla(187, 10%, 85%, 0.25) at 30% -> hsl(197, 6%, 25%) at 120%
    let color1 = vec3f(0.8, 0.8, 0.8);
    let color2 = vec3f(0.81, 0.86, 0.87);
    let color3 = vec3f(0.235, 0.26, 0.265);

    var color: vec3f;
    var alpha: f32;

    if (t < 0.3) {
        let s = t / 0.3;
        color = mix(color1, color2, s);
        alpha = mix(1.0, 0.25, s);
    } else {
        let s = (t - 0.3) / 0.9; // extends to 120%
        color = mix(color2, color3, clamp(s, 0.0, 1.0));
        alpha = mix(0.25, 1.0, clamp(s, 0.0, 1.0));
    }

    return vec4f(color, alpha);
}

@fragment
fn fragmentMain(@location(0) uv: vec2f, @location(1) localPos: vec2f) -> @location(0) vec4f {
    let cardSize = getCardSize();
    let cornerRadius = 0.04;
    let pxToLocal = 2.0 * uniforms.dpr / uniforms.resolution.y;

    let dist = sdRoundedRect(localPos, cardSize, cornerRadius);

    // Shadow
    let shadowOffset = 22.0 * pxToLocal;
    let shadowBlur = 34.0 * pxToLocal;
    let shadowSpread = -7.0 * pxToLocal;
    let shadowPos = localPos - vec2f(0.0, -shadowOffset);
    let shadowSize = cardSize + vec2f(shadowSpread);
    let shadowRadius = max(cornerRadius + shadowSpread, 0.0);
    let shadowDist = sdRoundedRect(shadowPos, shadowSize, shadowRadius);
    let shadowAlpha = 1.0 - smoothstep(-shadowBlur, shadowBlur, shadowDist);
    let shadowColor = vec4f(0.0, 0.0, 0.0, shadowAlpha);

    let cardUV = vec2f(
        (localPos.x / (cardSize.x * 2.0)) + 0.5,
        0.5 - (localPos.y / (cardSize.y * 2.0))
    );

    let textureColor = textureSampleLevel(cardTexture, linearSampler, cardUV, 0.0);
    let foilColor = textureSampleLevel(foilTexture, linearSampler, cardUV, 0.0).rgb;
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);

    // Pointer calculations
    let pointerFromCenter = length(uniforms.pointer - vec2f(0.5)) / 0.7071;
    let pointerFromLeft = uniforms.pointer.x;
    let pointerFromTop = uniforms.pointer.y;

    var cardRgb = textureColor.rgb;

    // === .card__shine layer ===
    // Background position calculations
    let bgPos1 = vec2f(0.25 + 0.5 * pointerFromLeft, 0.25 + 0.5 * pointerFromTop) - 0.5;
    let bgPos3 = vec2f(0.25 + uniforms.pointer.x * 0.5, 0.25 + uniforms.pointer.y * 0.5) - 0.5;

    // Layer 1: -45deg diagonal gradient (red to cyan)
    let diag = diagonalGradient(cardUV, bgPos1);

    // Layer 2: Glitter (fixed position)
    let glitterUv = fract(cardUV / 0.15);
    let glitter = textureSampleLevel(glitterTexture, linearSampler, glitterUv, 0.0).rgb;

    // Layer 3: -30deg rainbow gradient (400% scale)
    let rainbow30 = rainbowGradient(cardUV, -30.0, bgPos3, 4.0);

    // CSS blend order: luminosity, soft-light (bottom to top)
    // rainbow30 is base, glitter blends with soft-light, then diag blends with luminosity
    var shineLayer = rainbow30;
    shineLayer = softLightBlend(shineLayer, glitter);
    shineLayer = luminosityBlend(shineLayer, diag);

    // Filter: brightness varies with pointer distance
    let shineBrightness = (pointerFromCenter * 0.25) + 0.6;
    shineLayer = applyFilter(shineLayer, shineBrightness, 2.2, 0.75);

    // === .card__shine:before (foil layer) ===
    // Filter: brightness(2.5) contrast(1)
    var foilLayer = applyFilter(foilColor, 2.5, 1.0, 1.0);
    // Background blend: difference (within the layer)
    // Mix blend: darken
    let foilOpacity = (pointerFromCenter + 0.4) * 0.6;

    // === .card__shine:after layer ===
    let bgPosAfter = uniforms.pointer - 0.5;
    let rainbow60 = rainbowGradient(cardUV, -60.0, bgPosAfter, 4.0);

    // Soft-light blend glitter with rainbow
    var afterLayer = softLightBlend(rainbow60, glitter);

    // Filter: brightness varies
    let afterBrightness = (pointerFromCenter * 0.3) + 0.55;
    afterLayer = applyFilter(afterLayer, afterBrightness, 2.0, 1.0);

    // === Composite layers ===
    // The shine layers overlay the card - they don't replace it
    // Use softer blending to keep card visible

    // Apply shine layer with soft-light to preserve card details
    let shineSoftLight = softLightBlend(cardRgb, shineLayer);
    cardRgb = mix(cardRgb, shineSoftLight, uniforms.opacity * 0.7 * cardMask);

    // Apply foil with darken blend (subtle)
    let foilDarkened = darkenBlend(cardRgb, foilLayer);
    cardRgb = mix(cardRgb, foilDarkened, foilOpacity * uniforms.opacity * 0.3 * cardMask);

    // Apply :after with color-dodge (this creates the rainbow shimmer)
    let afterDodged = colorDodgeBlend(cardRgb, afterLayer);
    cardRgb = mix(cardRgb, afterDodged, uniforms.opacity * 0.5 * cardMask);

    // === Subtle glitter sparkle overlay ===
    // Add just the brightest glitter spots as a gentle overlay
    let sparkleIntensity = max(max(glitter.r, glitter.g), glitter.b);
    let sparkle = smoothstep(0.65, 0.95, sparkleIntensity);
    let sparkleColor = glitter * sparkle;
    cardRgb = mix(cardRgb, cardRgb + sparkleColor * 0.15, uniforms.opacity * cardMask);

    // === .card__glare layer ===
    let glare = glareGradient(cardUV);
    let glareFiltered = applyFilter(glare.rgb, 0.9, 1.75, 1.0);
    let glareOpacity = pointerFromCenter * 0.9;

    // Hard-light blend
    let glareBlended = hardLightBlend(cardRgb, glareFiltered);
    cardRgb = mix(cardRgb, glareBlended, glare.a * glareOpacity * uniforms.opacity * cardMask);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = vec4f(
        mix(shadowColor.rgb, finalCard.rgb, finalCard.a),
        max(shadowColor.a, finalCard.a)
    );

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,En=`struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    perspective: f32,
    opacity: f32,
    foilBrightness: f32,
    patternScaleX: f32,
    patternScaleY: f32,
    _pad0: f32,
    _pad1: f32,
    _pad2: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;
@group(0) @binding(5) var glitterTexture: texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) localPos: vec2f,
};

fn rotateX(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

fn rotateY(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
}

@vertex
fn vertexMain(@location(0) pos: vec2f, @location(1) uv: vec2f) -> VertexOutput {
    var output: VertexOutput;
    let canvasAspect = uniforms.resolution.x / uniforms.resolution.y;
    var p = vec3f(pos, 0.0);
    p = rotateX(p, uniforms.rotation.y);
    p = rotateY(p, uniforms.rotation.x);
    let w = uniforms.perspective - p.z;
    output.position = vec4f((p.x / canvasAspect) * uniforms.perspective, p.y * uniforms.perspective, 0.0, w);
    output.uv = uv;
    output.localPos = pos;
    return output;
}

fn sdRoundedRect(p: vec2f, b: vec2f, r: f32) -> f32 {
    let q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2f(0.0))) - r;
}

fn getCardSize() -> vec2f {
    let cardAspect = 0.718;
    let panePadding = 48.0 * uniforms.dpr;
    let maxWidthFromHeight = 0.6;
    let maxWidthFromPane = max((uniforms.resolution.x - panePadding) / uniforms.resolution.y, 0.0);
    let cardWidth = min(maxWidthFromHeight, maxWidthFromPane);
    return vec2f(cardWidth, cardWidth / cardAspect);
}

fn farthestCornerDist(p: vec2f) -> f32 {
    let d0 = distance(p, vec2f(0.0, 0.0));
    let d1 = distance(p, vec2f(1.0, 0.0));
    let d2 = distance(p, vec2f(0.0, 1.0));
    let d3 = distance(p, vec2f(1.0, 1.0));
    return max(max(d0, d1), max(d2, d3));
}

fn softLightChannel(base: f32, blend: f32) -> f32 {
    let low = base - (1.0 - 2.0 * blend) * base * (1.0 - base);
    let d = select(((16.0 * base - 12.0) * base + 4.0) * base, sqrt(max(base, 0.0)), base > 0.25);
    let high = base + (2.0 * blend - 1.0) * (d - base);
    return mix(low, high, step(0.5, blend));
}

fn softLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return vec3f(
        softLightChannel(base.r, blend.r),
        softLightChannel(base.g, blend.g),
        softLightChannel(base.b, blend.b)
    );
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), blend)
    );
}

fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
}

fn multiplyBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base * blend;
}

fn lightenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return max(base, blend);
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(1.0));
}

fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

fn contrastMask(value: f32, contrast: f32) -> f32 {
    return clamp((value - 0.5) * contrast + 0.5, 0.0, 1.0);
}

fn alphaOver(bottom: vec4f, top: vec4f) -> vec4f {
    let a = top.a + bottom.a * (1.0 - top.a);
    let rgb = (top.rgb * top.a + bottom.rgb * bottom.a * (1.0 - top.a)) / max(a, 0.0001);
    return vec4f(rgb, a);
}

const SUNPILLAR_1: vec3f = vec3f(0.973, 0.459, 0.459);
const SUNPILLAR_4: vec3f = vec3f(0.518, 1.0, 0.835);
const SUNPILLAR_5: vec3f = vec3f(0.478, 0.569, 0.969);
const SUNPILLAR_6: vec3f = vec3f(0.780, 0.459, 0.973);

fn secretConicGradient(uv: vec2f) -> vec3f {
    let delta = uv - vec2f(0.5);
    var t = atan2(delta.y, delta.x) / 6.28318531 + 0.5;
    t = fract(t + 0.125);

    if (t < 0.25) {
        return mix(SUNPILLAR_4, SUNPILLAR_5, t * 4.0);
    }
    if (t < 0.5) {
        return mix(SUNPILLAR_5, SUNPILLAR_6, (t - 0.25) * 4.0);
    }
    if (t < 0.75) {
        return mix(SUNPILLAR_6, SUNPILLAR_1, (t - 0.5) * 4.0);
    }
    return mix(SUNPILLAR_1, SUNPILLAR_4, (t - 0.75) * 4.0);
}

// CSS radial-gradient uses LINEAR interpolation between color stops
fn linearStep(edge0: f32, edge1: f32, x: f32) -> f32 {
    return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

fn baseRadialGradient(uv: vec2f) -> vec4f {
    // CSS: radial-gradient(farthest-corner circle at pointer, hsla(150,0%,0%,.98) 10%, hsla(0,0%,95%,.15) 90%)
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let dark = vec4f(0.0, 0.0, 0.0, 0.98);
    let pale = vec4f(0.95, 0.95, 0.95, 0.15);
    let s = linearStep(0.10, 0.90, t);
    return mix(dark, pale, s);
}

fn beforeRadialGradient(uv: vec2f) -> vec4f {
    // CSS: radial-gradient(farthest-corner circle at pointer, hsla(10,20%,90%,0.95) 10%, hsl(0,0%,0%) 70%)
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let pale = vec4f(0.918, 0.882, 0.863, 0.95);
    let black = vec4f(0.0, 0.0, 0.0, 1.0);
    let s = linearStep(0.10, 0.70, t);
    return mix(pale, black, s);
}

fn glareGradient(uv: vec2f) -> vec4f {
    // CSS: radial-gradient(farthest-corner circle at pointer, hsla(45,8%,80%,0.3) 0%, hsl(22,15%,12%) 180%)
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.812, 0.807, 0.788, 0.30);
    let dark = vec4f(0.138, 0.116, 0.102, 1.0);
    let s = linearStep(0.0, 1.8, t);
    return mix(light, dark, s);
}

fn goldLinearGradient(uv: vec2f) -> vec3f {
    let dir = normalize(vec2f(1.0, 1.0));
    let t = clamp(dot(uv - vec2f(0.5), dir) + 0.5, 0.0, 1.0);
    return mix(vec3f(0.902, 0.718, 0.078), vec3f(0.969, 0.878, 0.376), t);
}

fn sampleGlitter(uv: vec2f, offset: vec2f) -> vec3f {
    let raw = textureSampleLevel(glitterTexture, linearSampler, fract((uv * 3.0) + offset), 0.0).rgb;
    let luma = dot(raw, vec3f(0.2126, 0.7152, 0.0722));
    let sparkle = smoothstep(0.70, 1.0, luma);
    return mix(vec3f(0.5), raw, sparkle * 0.45);
}

@fragment
fn fragmentMain(@location(0) uv: vec2f, @location(1) localPos: vec2f) -> @location(0) vec4f {
    let cardSize = getCardSize();
    let cornerRadius = 0.04;
    let pxToLocal = 2.0 * uniforms.dpr / uniforms.resolution.y;

    let dist = sdRoundedRect(localPos, cardSize, cornerRadius);

    let shadowOffset = 22.0 * pxToLocal;
    let shadowBlur = 34.0 * pxToLocal;
    let shadowSpread = -7.0 * pxToLocal;
    let shadowPos = localPos - vec2f(0.0, -shadowOffset);
    let shadowSize = cardSize + vec2f(shadowSpread);
    let shadowRadius = max(cornerRadius + shadowSpread, 0.0);
    let shadowDist = sdRoundedRect(shadowPos, shadowSize, shadowRadius);
    let shadowAlpha = 1.0 - smoothstep(-shadowBlur, shadowBlur, shadowDist);
    let shadowColor = vec4f(0.0, 0.0, 0.0, shadowAlpha);

    let cardUV = vec2f(
        (localPos.x / (cardSize.x * 2.0)) + 0.5,
        0.5 - (localPos.y / (cardSize.y * 2.0))
    );

    let textureColor = textureSampleLevel(cardTexture, linearSampler, cardUV, 0.0);
    let foilColor = textureSampleLevel(foilTexture, linearSampler, cardUV, 0.0).rgb;
    let maskColor = textureSampleLevel(maskTexture, linearSampler, cardUV, 0.0);
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);
    let foilMask = max(maskColor.a, 0.78);
    let pointerFromCenter = clamp(length(uniforms.pointer - vec2f(0.5)) / 0.70710678, 0.0, 1.0);

    var cardRgb = textureColor.rgb;

    let baseShine = baseRadialGradient(cardUV);
    var baseShineRgb = baseShine.rgb;
    let conic = secretConicGradient(cardUV);
    let glitterA = sampleGlitter(cardUV, vec2f(0.45, 0.45));
    let glitterB = sampleGlitter(cardUV, vec2f(0.55, 0.55));
    baseShineRgb = overlayBlend(baseShineRgb, conic);
    baseShineRgb = hardLightBlend(baseShineRgb, glitterB);
    baseShineRgb = softLightBlend(baseShineRgb, glitterA);
    baseShineRgb = applyFilter(baseShineRgb, 0.4 + pointerFromCenter * 0.2, 1.0, 2.7);

    let baseDodged = colorDodgeBlend(cardRgb, baseShineRgb);
    // In CSS, the radial gradient alpha (0.98 at pointer, 0.15 far) controls element opacity
    cardRgb = mix(cardRgb, baseDodged, baseShine.a * uniforms.opacity * foilMask * cardMask);

    let beforeLayer = beforeRadialGradient(cardUV);
    var beforeLayerRgb = beforeLayer.rgb;
    let gold = goldLinearGradient(cardUV);
    // CSS blend order: radial (base) -> gold with multiply -> foil with hard-light
    beforeLayerRgb = multiplyBlend(beforeLayerRgb, gold);
    beforeLayerRgb = hardLightBlend(beforeLayerRgb, foilColor);
    // CSS filter applies AFTER all background blending
    beforeLayerRgb = applyFilter(beforeLayerRgb, 1.25, 1.25, 0.35);
    let beforeLightened = lightenBlend(cardRgb, beforeLayerRgb);
    // CSS has opacity: 0.8 on :before element
    cardRgb = mix(cardRgb, beforeLightened, 0.8 * uniforms.opacity * foilMask * cardMask);

    let shiftedUv = cardUV + (vec2f(0.5) - uniforms.pointer) * 0.006;
    var afterGlitter = sampleGlitter(shiftedUv, vec2f(0.50, 0.50));
    // CSS: filter brightness varies with pointer position (0.6 at center, 1.2 at edge)
    afterGlitter = applyFilter(afterGlitter, pointerFromCenter * 0.6 + 0.6, 1.5, 1.0);
    let afterOverlay = overlayBlend(cardRgb, afterGlitter);
    // :after is child of .card__shine, so affected by parent's alpha (baseShine.a)
    cardRgb = mix(cardRgb, afterOverlay, baseShine.a * uniforms.opacity * cardMask);

    let glare = glareGradient(cardUV);
    let glareFiltered = applyFilter(glare.rgb, 1.3, 1.5, 1.0);
    let glareBlended = hardLightBlend(cardRgb, glareFiltered);
    cardRgb = mix(cardRgb, glareBlended, glare.a * uniforms.opacity * cardMask * 0.3);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,On=`struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    perspective: f32,
    opacity: f32,
    foilBrightness: f32,
    patternScaleX: f32,
    patternScaleY: f32,
    _pad0: f32,
    _pad1: f32,
    _pad2: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;
@group(0) @binding(5) var glitterTexture: texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) localPos: vec2f,
};

fn rotateX(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

fn rotateY(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
}

@vertex
fn vertexMain(@location(0) pos: vec2f, @location(1) uv: vec2f) -> VertexOutput {
    var output: VertexOutput;
    let canvasAspect = uniforms.resolution.x / uniforms.resolution.y;
    var p = vec3f(pos, 0.0);
    p = rotateX(p, uniforms.rotation.y);
    p = rotateY(p, uniforms.rotation.x);
    let w = uniforms.perspective - p.z;
    output.position = vec4f((p.x / canvasAspect) * uniforms.perspective, p.y * uniforms.perspective, 0.0, w);
    output.uv = uv;
    output.localPos = pos;
    return output;
}

fn sdRoundedRect(p: vec2f, b: vec2f, r: f32) -> f32 {
    let q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2f(0.0))) - r;
}

fn getCardSize() -> vec2f {
    let cardAspect = 0.718;
    let panePadding = 48.0 * uniforms.dpr;
    let maxWidthFromHeight = 0.6;
    let maxWidthFromPane = max((uniforms.resolution.x - panePadding) / uniforms.resolution.y, 0.0);
    let cardWidth = min(maxWidthFromHeight, maxWidthFromPane);
    return vec2f(cardWidth, cardWidth / cardAspect);
}

fn farthestCornerDist(p: vec2f) -> f32 {
    let d0 = distance(p, vec2f(0.0, 0.0));
    let d1 = distance(p, vec2f(1.0, 0.0));
    let d2 = distance(p, vec2f(0.0, 1.0));
    let d3 = distance(p, vec2f(1.0, 1.0));
    return max(max(d0, d1), max(d2, d3));
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.00001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(0.99999));
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), blend)
    );
}

fn softLightChannel(base: f32, blend: f32) -> f32 {
    let low = base - (1.0 - 2.0 * blend) * base * (1.0 - base);
    let d = select(((16.0 * base - 12.0) * base + 4.0) * base, sqrt(max(base, 0.0)), base > 0.25);
    let high = base + (2.0 * blend - 1.0) * (d - base);
    return mix(low, high, step(0.5, blend));
}

fn softLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return vec3f(
        softLightChannel(base.r, blend.r),
        softLightChannel(base.g, blend.g),
        softLightChannel(base.b, blend.b)
    );
}

fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

fn inClipBorders(uv: vec2f) -> f32 {
    let inX = step(0.04, uv.x) * step(uv.x, 0.96);
    let inY = step(0.028, uv.y) * step(uv.y, 0.972);
    return inX * inY;
}

fn backgroundPosition() -> vec2f {
    return vec2f(
        mix(0.37, 0.63, uniforms.pointer.x),
        mix(0.33, 0.67, uniforms.pointer.y)
    );
}

fn trainerGalleryRainbow(uv: vec2f) -> vec3f {
    let bg = backgroundPosition();
    let layerUv = vec2f(
        uv.x / 3.0,
        (uv.y - 0.65) / 4.0 + bg.y
    );
    let angle = radians(68.0);
    let dir = vec2f(cos(angle), sin(angle));
    let t = fract(dot(layerUv, dir) / 0.35);

    let c1 = vec3f(1.000, 0.560, 0.165);
    let c2 = vec3f(0.635, 0.310, 0.900);
    let c3 = vec3f(0.360, 0.880, 0.300);
    let c4 = vec3f(0.980, 0.900, 0.240);
    let c5 = vec3f(1.000, 0.560, 0.165);

    if (t < 0.25) { return mix(c1, c2, t / 0.25); }
    if (t < 0.50) { return mix(c2, c3, (t - 0.25) / 0.25); }
    if (t < 0.75) { return mix(c3, c4, (t - 0.50) / 0.25); }
    return mix(c4, c5, (t - 0.75) / 0.25);
}

fn radialAfterLayer(uv: vec2f) -> vec3f {
    let center = uniforms.pointer * 0.5 + vec2f(0.25);
    let toFarX = max(center.x, 1.0 - center.x);
    let toFarY = max(center.y, 1.0 - center.y);
    let dist = length((uv - center) / vec2f(toFarX, toFarY));

    let white = vec3f(1.0);
    let purple = vec3f(0.18, 0.04, 0.18);
    let gray = vec3f(0.28);

    if (dist < 0.05) {
        return white;
    }
    if (dist < 0.40) {
        return mix(white, purple, (dist - 0.05) / 0.35);
    }
    return mix(purple, gray, clamp((dist - 0.40) / 0.80, 0.0, 1.0));
}

fn glareLayer(uv: vec2f) -> vec4f {
    let dist = distance(uv, uniforms.pointer);
    let t = clamp(dist / max(farthestCornerDist(uniforms.pointer), 0.001), 0.0, 1.0);

    var color: vec3f;
    var alpha: f32;
    if (t < 0.10) {
        color = vec3f(1.0);
        alpha = 1.0;
    } else if (t < 0.35) {
        color = vec3f(1.0);
        alpha = mix(1.0, 0.6, (t - 0.10) / 0.25);
    } else {
        color = mix(vec3f(1.0), vec3f(0.312, 0.388, 0.388), clamp((t - 0.35) / 0.25, 0.0, 1.0));
        alpha = mix(0.55, 0.2, clamp((t - 0.35) / 0.65, 0.0, 1.0));
    }

    return vec4f(color, alpha);
}

fn pointerFalloff(uv: vec2f) -> f32 {
    let dist = distance(uv, uniforms.pointer);
    let maxDist = max(farthestCornerDist(uniforms.pointer), 0.001);
    let t = clamp(dist / maxDist, 0.0, 1.0);
    return 1.0 - smoothstep(0.20, 0.82, t);
}

@fragment
fn fragmentMain(@location(0) uv: vec2f, @location(1) localPos: vec2f) -> @location(0) vec4f {
    let cardSize = getCardSize();
    let cornerRadius = 0.04;
    let pxToLocal = 2.0 * uniforms.dpr / uniforms.resolution.y;

    let dist = sdRoundedRect(localPos, cardSize, cornerRadius);

    let shadowOffset = 22.0 * pxToLocal;
    let shadowBlur = 34.0 * pxToLocal;
    let shadowSpread = -7.0 * pxToLocal;
    let shadowPos = localPos - vec2f(0.0, -shadowOffset);
    let shadowSize = cardSize + vec2f(shadowSpread);
    let shadowRadius = max(cornerRadius + shadowSpread, 0.0);
    let shadowDist = sdRoundedRect(shadowPos, shadowSize, shadowRadius);
    let shadowAlpha = 1.0 - smoothstep(-shadowBlur, shadowBlur, shadowDist);
    let shadowColor = vec4f(0.0, 0.0, 0.0, shadowAlpha);

    let cardUV = vec2f(
        (localPos.x / (cardSize.x * 2.0)) + 0.5,
        0.5 - (localPos.y / (cardSize.y * 2.0))
    );

    let textureColor = textureSampleLevel(cardTexture, linearSampler, cardUV, 0.0);
    let foilColor = textureSampleLevel(foilTexture, linearSampler, cardUV, 0.0).rgb;
    let maskColor = textureSampleLevel(maskTexture, linearSampler, cardUV, 0.0);
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);
    let shineMask = maskColor.a * inClipBorders(cardUV) * cardMask;
    let pointerFromCenter = clamp(length(uniforms.pointer - vec2f(0.5)) / 0.70710678, 0.0, 1.0);

    var cardRgb = textureColor.rgb;

    var shine = trainerGalleryRainbow(cardUV);
    shine = applyFilter(shine, pointerFromCenter * 0.35 + 0.58, 2.15, 1.05);
    let shineBlended = colorDodgeBlend(cardRgb, shine);
    let shineFalloff = pointerFalloff(cardUV);
    cardRgb = mix(cardRgb, shineBlended, uniforms.opacity * 0.95 * shineMask * shineFalloff);

    var afterLayer = radialAfterLayer(cardUV);
    afterLayer = mix(afterLayer, foilColor, 0.08);
    afterLayer = applyFilter(afterLayer, pointerFromCenter * 0.2 + 0.48, 0.75, 1.05);
    let afterBlended = hardLightBlend(cardRgb, afterLayer);
    cardRgb = mix(cardRgb, afterBlended, uniforms.opacity * 0.24 * shineMask);

    let glare = glareLayer(cardUV);
    let glareBlended = softLightBlend(cardRgb, glare.rgb);
    cardRgb = mix(cardRgb, glareBlended, uniforms.opacity * glare.a * cardMask);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = vec4f(
        mix(shadowColor.rgb, finalCard.rgb, finalCard.a),
        max(shadowColor.a, finalCard.a)
    );

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,Dn=`struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    perspective: f32,
    opacity: f32,
    foilBrightness: f32,
    patternScaleX: f32,
    patternScaleY: f32,
    _pad0: f32,
    _pad1: f32,
    _pad2: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;
@group(0) @binding(5) var glitterTexture: texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) localPos: vec2f,
};

fn rotateX(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

fn rotateY(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
}

@vertex
fn vertexMain(@location(0) pos: vec2f, @location(1) uv: vec2f) -> VertexOutput {
    var output: VertexOutput;
    let canvasAspect = uniforms.resolution.x / uniforms.resolution.y;
    var p = vec3f(pos, 0.0);
    p = rotateX(p, uniforms.rotation.y);
    p = rotateY(p, uniforms.rotation.x);
    let w = uniforms.perspective - p.z;
    output.position = vec4f((p.x / canvasAspect) * uniforms.perspective, p.y * uniforms.perspective, 0.0, w);
    output.uv = uv;
    output.localPos = pos;
    return output;
}

fn sdRoundedRect(p: vec2f, b: vec2f, r: f32) -> f32 {
    let q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2f(0.0))) - r;
}

fn getCardSize() -> vec2f {
    let cardAspect = 0.718;
    let panePadding = 48.0 * uniforms.dpr;
    let maxWidthFromHeight = 0.6;
    let maxWidthFromPane = max((uniforms.resolution.x - panePadding) / uniforms.resolution.y, 0.0);
    let cardWidth = min(maxWidthFromHeight, maxWidthFromPane);
    return vec2f(cardWidth, cardWidth / cardAspect);
}

fn farthestCornerDist(p: vec2f) -> f32 {
    let d0 = distance(p, vec2f(0.0, 0.0));
    let d1 = distance(p, vec2f(1.0, 0.0));
    let d2 = distance(p, vec2f(0.0, 1.0));
    let d3 = distance(p, vec2f(1.0, 1.0));
    return max(max(d0, d1), max(d2, d3));
}

fn linearStep(edge0: f32, edge1: f32, x: f32) -> f32 {
    return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

// --- Blend Modes ---

fn screenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return 1.0 - (1.0 - base) * (1.0 - blend);
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), blend)
    );
}

fn softLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    let low = base - (1.0 - 2.0 * blend) * base * (1.0 - base);
    let d = select(((16.0 * base - 12.0) * base + 4.0) * base, sqrt(max(base, vec3f(0.0))), base > vec3f(0.25));
    let high = base + (2.0 * blend - 1.0) * (d - base);
    return mix(low, high, step(vec3f(0.5), blend));
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    return min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
}

fn rgb2hsl(c: vec3f) -> vec3f {
    let maxC = max(max(c.r, c.g), c.b);
    let minC = min(min(c.r, c.g), c.b);
    let l = (maxC + minC) * 0.5;

    if (maxC == minC) {
        return vec3f(0.0, 0.0, l);
    }

    let d = maxC - minC;
    let s = select(d / (2.0 - maxC - minC), d / (maxC + minC), l > 0.5);

    var h: f32;
    if (maxC == c.r) {
        h = (c.g - c.b) / d + select(0.0, 6.0, c.g < c.b);
    } else if (maxC == c.g) {
        h = (c.b - c.r) / d + 2.0;
    } else {
        h = (c.r - c.g) / d + 4.0;
    }
    h /= 6.0;

    return vec3f(h, s, l);
}

fn hue2rgb(p: f32, q: f32, t: f32) -> f32 {
    var tt = t;
    if (tt < 0.0) { tt += 1.0; }
    if (tt > 1.0) { tt -= 1.0; }
    if (tt < 1.0/6.0) { return p + (q - p) * 6.0 * tt; }
    if (tt < 1.0/2.0) { return q; }
    if (tt < 2.0/3.0) { return p + (q - p) * (2.0/3.0 - tt) * 6.0; }
    return p;
}

fn hsl2rgb(hsl: vec3f) -> vec3f {
    if (hsl.y == 0.0) {
        return vec3f(hsl.z);
    }
    let q = select(hsl.z + hsl.y - hsl.z * hsl.y, hsl.z * (1.0 + hsl.y), hsl.z < 0.5);
    let p = 2.0 * hsl.z - q;
    return vec3f(
        hue2rgb(p, q, hsl.x + 1.0/3.0),
        hue2rgb(p, q, hsl.x),
        hue2rgb(p, q, hsl.x - 1.0/3.0)
    );
}

fn hueBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseHSL = rgb2hsl(base);
    let blendHSL = rgb2hsl(blend);
    return hsl2rgb(vec3f(blendHSL.x, baseHSL.y, baseHSL.z));
}

fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

fn alphaOver(bottom: vec4f, top: vec4f) -> vec4f {
    let a = top.a + bottom.a * (1.0 - top.a);
    let rgb = (top.rgb * top.a + bottom.rgb * bottom.a * (1.0 - top.a)) / max(a, 0.0001);
    return vec4f(rgb, a);
}

// --- Sunpillar Colors ---
const SUNPILLAR_1: vec3f = vec3f(0.973, 0.459, 0.459); // hsl(2, 100%, 73%) - red
const SUNPILLAR_2: vec3f = vec3f(0.969, 0.878, 0.376); // hsl(53, 100%, 69%) - yellow
const SUNPILLAR_3: vec3f = vec3f(0.608, 0.969, 0.376); // hsl(93, 100%, 69%) - green
const SUNPILLAR_4: vec3f = vec3f(0.518, 1.0, 0.835);   // hsl(176, 100%, 76%) - cyan
const SUNPILLAR_5: vec3f = vec3f(0.478, 0.569, 0.969); // hsl(228, 100%, 74%) - blue
const SUNPILLAR_6: vec3f = vec3f(0.780, 0.459, 0.973); // hsl(283, 100%, 73%) - purple

fn backgroundSampleUv(uv: vec2f, size: vec2f, pos: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - size) * pos;
    return (uv - origin) / size;
}

fn cssBackgroundPosition() -> vec2f {
    return vec2f(
        mix(0.37, 0.63, uniforms.pointer.x),
        mix(0.33, 0.67, uniforms.pointer.y)
    );
}

// CSS repeating-linear-gradient(0deg, ...), with 5% stops over a 35% cycle.
fn verticalSunpillar(layerUv: vec2f) -> vec3f {
    let t = fract((1.0 - layerUv.y) / 0.35);

    if (t < 0.143) { return mix(SUNPILLAR_1, SUNPILLAR_2, t / 0.143); }
    if (t < 0.286) { return mix(SUNPILLAR_2, SUNPILLAR_3, (t - 0.143) / 0.143); }
    if (t < 0.429) { return mix(SUNPILLAR_3, SUNPILLAR_4, (t - 0.286) / 0.143); }
    if (t < 0.571) { return mix(SUNPILLAR_4, SUNPILLAR_5, (t - 0.429) / 0.143); }
    if (t < 0.714) { return mix(SUNPILLAR_5, SUNPILLAR_6, (t - 0.571) / 0.143); }
    return mix(SUNPILLAR_6, SUNPILLAR_1, (t - 0.714) / 0.286);
}

fn diagonalStripePhaseWithRepeat(layerUv: vec2f, repeatSize: f32) -> f32 {
    let angle = radians(115.0);
    let dir = vec2f(sin(angle), -cos(angle));
    let t = dot(layerUv, dir);
    return fract(t / repeatSize);
}

fn diagonalStripePhase(layerUv: vec2f) -> f32 {
    return diagonalStripePhaseWithRepeat(layerUv, 0.12);
}

// CSS repeating-linear-gradient(133deg, ... 12%).
fn diagonalStripeColor(layerUv: vec2f) -> vec3f {
    let cycle = diagonalStripePhase(layerUv);

    let dark = vec3f(0.055, 0.082, 0.18);      // #0e152e - dark blue
    let gray = vec3f(0.557, 0.612, 0.612);     // hsl(180, 10%, 60%) - desaturated cyan
    let cyan = vec3f(0.525, 0.725, 0.725);     // hsl(180, 29%, 66%) - cyan

    let s1 = 0.317;  // 3.8/12
    let s2 = 0.375;  // 4.5/12
    let s3 = 0.433;  // 5.2/12
    let s4 = 0.833;  // 10/12

    if (cycle < s1) { return mix(dark, gray, cycle / s1); }
    if (cycle < s2) { return mix(gray, cyan, (cycle - s1) / (s2 - s1)); }
    if (cycle < s3) { return mix(cyan, gray, (cycle - s2) / (s3 - s2)); }
    if (cycle < s4) { return mix(gray, dark, (cycle - s3) / (s4 - s3)); }
    return dark;
}

fn diagonalBeamMask(layerUv: vec2f) -> f32 {
    let cycle = diagonalStripePhase(layerUv);
    let distToPeak = abs(cycle - 0.375);
    let core = 1.0 - smoothstep(0.0, 0.12, distToPeak);
    let halo = 1.0 - smoothstep(0.06, 0.34, distToPeak);
    return clamp(core * 0.65 + halo * 0.5, 0.0, 1.0);
}

fn diagonalBeamHalo(layerUv: vec2f) -> f32 {
    let cycle = diagonalStripePhase(layerUv);
    let distToPeak = abs(cycle - 0.375);
    let broad = 1.0 - smoothstep(0.08, 0.43, distToPeak);
    let edge = smoothstep(0.035, 0.18, distToPeak);
    return broad * edge;
}

fn diagonalBackBeamMask(layerUv: vec2f) -> f32 {
    let cycle = diagonalStripePhaseWithRepeat(layerUv, 0.24);
    let distToPeak = abs(cycle - 0.375);
    let core = 1.0 - smoothstep(0.0, 0.033, distToPeak);
    let halo = 1.0 - smoothstep(0.02, 0.075, distToPeak);
    return clamp(core * 1.2 + halo * 0.16, 0.0, 1.0);
}

fn diagonalBackBeamHalo(layerUv: vec2f) -> f32 {
    let cycle = diagonalStripePhaseWithRepeat(layerUv, 0.24);
    let distToPeak = abs(cycle - 0.375);
    let broad = 1.0 - smoothstep(0.03, 0.18, distToPeak);
    let edge = smoothstep(0.015, 0.075, distToPeak);
    return broad * edge;
}

fn pokemonVBeamOverlap(uv: vec2f) -> vec3f {
    let bg = cssBackgroundPosition();
    let frontUv = backgroundSampleUv(uv, vec2f(3.0, 1.0), bg);
    let backUv = backgroundSampleUv(uv, vec2f(3.0, 1.0), -bg);
    let frontBeam = diagonalBeamMask(frontUv);
    let backBeam = diagonalBackBeamMask(backUv);
    let overlap = pow(clamp(frontBeam * backBeam, 0.0, 1.0), 0.72);

    let cardSize = getCardSize();
    let cardWidthPx = max(cardSize.x * uniforms.resolution.y / uniforms.dpr, 1.0);
    let grainWidth = 500.0 / cardWidthPx;
    let grainUv = backgroundSampleUv(uv, vec2f(grainWidth, 1.0), vec2f(0.5, 0.5));
    let grain = textureSampleLevel(glitterTexture, linearSampler, fract(grainUv), 0.0);
    let fineGrain = textureSampleLevel(
        glitterTexture,
        linearSampler,
        fract(grainUv * vec2f(1.85, 1.35) + vec2f(0.17, 0.39)),
        0.0
    );
    let grainLuma = dot(grain.rgb, vec3f(0.299, 0.587, 0.114));
    let fineGrainLuma = dot(fineGrain.rgb, vec3f(0.299, 0.587, 0.114));
    let particle = 0.34 + smoothstep(0.08, 0.3, grainLuma) * 0.9 +
        smoothstep(0.12, 0.34, fineGrainLuma) * 1.55;

    let sunColor = verticalSunpillar(backgroundSampleUv(uv, vec2f(2.0, 7.0), vec2f(0.0, bg.y)));
    let mergeTint = mix(sunColor * 1.35, vec3f(1.0, 0.94, 0.7), overlap * 0.45);
    return mergeTint * overlap * particle * 1.25;
}

// Base radial gradient - subtle darkening at pointer
fn baseRadialGradient(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    // CSS: hsla(0,0%,0%,0.1) 12%, hsla(0,0%,0%,0.15) 20%, hsla(0,0%,0%,0.25) 120%
    let a1 = 0.1;
    let a2 = 0.15;
    let a3 = 0.25;

    var alpha: f32;
    if (t < 0.12) {
        alpha = a1;
    } else if (t < 0.20) {
        alpha = mix(a1, a2, linearStep(0.12, 0.20, t));
    } else {
        alpha = mix(a2, a3, linearStep(0.20, 1.20, t));
    }

    return vec4f(0.0, 0.0, 0.0, alpha);
}

fn compositeBackgroundLayer(bottom: vec4f, top: vec4f, blendMode: i32) -> vec4f {
    var blended: vec3f;
    if (blendMode == 0) {
        blended = screenBlend(bottom.rgb, top.rgb);
    } else if (blendMode == 1) {
        blended = hueBlend(bottom.rgb, top.rgb);
    } else {
        blended = hardLightBlend(bottom.rgb, top.rgb);
    }
    let rgb = mix(bottom.rgb, blended, top.a);
    let alpha = top.a + bottom.a * (1.0 - top.a);
    return vec4f(rgb, alpha);
}

fn pokemonVShineLayer(uv: vec2f, afterLayer: bool) -> vec4f {
    let bg = cssBackgroundPosition();
    let diagonalPos = select(bg, -bg, afterLayer);
    let sunSize = select(vec2f(2.0, 7.0), vec2f(2.0, 4.0), afterLayer);
    let diagonalSize = select(vec2f(3.0, 1.0), vec2f(1.95, 1.0), afterLayer);

    let cardSize = getCardSize();
    let cardWidthPx = max(cardSize.x * uniforms.resolution.y / uniforms.dpr, 1.0);
    let grainWidth = 500.0 / cardWidthPx;
    let grainUv = backgroundSampleUv(uv, vec2f(grainWidth, 1.0), vec2f(0.5, 0.5));
    let grain = textureSampleLevel(glitterTexture, linearSampler, fract(grainUv), 0.0);
    let fineGrain = textureSampleLevel(
        glitterTexture,
        linearSampler,
        fract(grainUv * vec2f(1.85, 1.35) + vec2f(0.17, 0.39)),
        0.0
    );
    let sunUv = backgroundSampleUv(uv, sunSize, vec2f(0.0, bg.y));
    let diagonalUv = backgroundSampleUv(uv, diagonalSize, diagonalPos);
    let frontRotationDiagonalUv = backgroundSampleUv(uv, vec2f(3.0, 1.0), diagonalPos);
    let boostedBeamUv = select(diagonalUv, frontRotationDiagonalUv, afterLayer);
    let sunColor = verticalSunpillar(sunUv);
    let sun = vec4f(sunColor, 1.0);
    let diagonal = vec4f(diagonalStripeColor(diagonalUv), 1.0);
    let radial = baseRadialGradient(backgroundSampleUv(uv, vec2f(2.0, 1.0), bg));

    // CSS paints background images from bottom to top:
    // radial-gradient, diagonal gradient, sunpillar gradient, then grain.
    // The blend-mode list applies to each top layer over the already-composited
    // layers beneath it: grain=screen, sunpillar=hue, diagonal=hard-light.
    var layer = radial;
    layer = compositeBackgroundLayer(layer, diagonal, 2);
    layer = compositeBackgroundLayer(layer, sun, 1);
    layer = compositeBackgroundLayer(layer, grain, 0);

    var filtered = select(
        applyFilter(layer.rgb, 0.8, 2.95, 0.65),
        applyFilter(layer.rgb, 1.0, 2.5, 1.75),
        afterLayer
    );
    let beam = select(diagonalBeamMask(boostedBeamUv), diagonalBackBeamMask(boostedBeamUv), afterLayer);
    let beamHalo = select(diagonalBeamHalo(boostedBeamUv), diagonalBackBeamHalo(boostedBeamUv), afterLayer);
    let grainLuma = dot(grain.rgb, vec3f(0.299, 0.587, 0.114));
    let fineGrainLuma = dot(fineGrain.rgb, vec3f(0.299, 0.587, 0.114));
    let particleGrain = smoothstep(0.06, 0.26, grainLuma);
    let particleGrainFine = smoothstep(0.05, 0.21, fineGrainLuma);
    let particleFlecks = smoothstep(0.12, 0.36, max(grainLuma, fineGrainLuma));
    let edgeFlecks = pow(smoothstep(0.1, 0.34, fineGrainLuma), 1.65);
    let frontParticleMask = 0.32 + particleGrain * 1.12 + particleFlecks * 2.85;
    let backParticleMask = 0.07 + particleGrain * 0.92 + particleGrainFine * 1.18 + particleFlecks * 3.55;
    let particleMask = select(frontParticleMask, backParticleMask, afterLayer);
    let visibleBeam = select(beam, beam, afterLayer);
    let beamStrength = select(1.38, 1.45, afterLayer);
    let frontTint = mix(sunColor * 1.35, vec3f(1.0, 0.95, 0.76), particleFlecks * 0.38);
    let backTint = mix(sunColor * 1.15, vec3f(0.65, 0.86, 1.0), 0.32 + particleFlecks * 0.22);
    let beamTint = select(frontTint, backTint, afterLayer);
    filtered = screenBlend(filtered, beamTint * visibleBeam * particleMask * beamStrength);
    let fleckStrength = select(1.52, 1.175, afterLayer);
    let frontFleckTint = mix(sunColor * 1.45, vec3f(1.0, 0.86, 0.45), edgeFlecks * 0.55);
    let backFleckTint = mix(sunColor * 1.2, vec3f(0.7, 0.9, 1.0), 0.4);
    let fleckTint = select(frontFleckTint, backFleckTint, afterLayer);
    let backFleckDensity = particleGrainFine * 1.12 + edgeFlecks * 1.25;
    let fleckBeam = select(beamHalo + beam * 0.35, beam * (0.28 + edgeFlecks * 0.78 + backFleckDensity), afterLayer);
    filtered = screenBlend(filtered, fleckTint * fleckBeam * edgeFlecks * fleckStrength);
    return vec4f(filtered, layer.a);
}

// Glare gradient
fn glareGradient(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    // CSS: white 0%, hsla(210,3%,54%,0.33) 45%, hsla(0,0%,20%,0.9) 130%
    let white = vec4f(1.0, 1.0, 1.0, 1.0);
    let grayish = vec4f(0.533, 0.541, 0.549, 0.33);
    let dark = vec4f(0.2, 0.2, 0.2, 0.9);

    if (t < 0.45) {
        return mix(white, grayish, linearStep(0.0, 0.45, t));
    }
    return mix(grayish, dark, linearStep(0.45, 1.30, t));
}

@fragment
fn fragmentMain(@location(0) uv: vec2f, @location(1) localPos: vec2f) -> @location(0) vec4f {
    let cardSize = getCardSize();
    let cornerRadius = 0.04;
    let pxToLocal = 2.0 * uniforms.dpr / uniforms.resolution.y;

    let dist = sdRoundedRect(localPos, cardSize, cornerRadius);

    // Shadow
    let shadowOffset = 22.0 * pxToLocal;
    let shadowBlur = 34.0 * pxToLocal;
    let shadowSpread = -7.0 * pxToLocal;
    let shadowPos = localPos - vec2f(0.0, -shadowOffset);
    let shadowSize = cardSize + vec2f(shadowSpread);
    let shadowRadius = max(cornerRadius + shadowSpread, 0.0);
    let shadowDist = sdRoundedRect(shadowPos, shadowSize, shadowRadius);
    let shadowAlpha = 1.0 - smoothstep(-shadowBlur, shadowBlur, shadowDist);
    let shadowColor = vec4f(0.0, 0.0, 0.0, shadowAlpha);

    // Card UV
    let cardUV = vec2f(
        (localPos.x / (cardSize.x * 2.0)) + 0.5,
        0.5 - (localPos.y / (cardSize.y * 2.0))
    );

    let textureColor = textureSampleLevel(cardTexture, linearSampler, cardUV, 0.0);
    let maskColor = textureSampleLevel(maskTexture, linearSampler, cardUV, 0.0);
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);
    let foilMask = maskColor.a;

    var cardRgb = textureColor.rgb;

    // === .card__shine layer ===
    let shine = pokemonVShineLayer(cardUV, false);
    let shineBlended = colorDodgeBlend(cardRgb, shine.rgb);
    cardRgb = mix(cardRgb, shineBlended, shine.a * foilMask * uniforms.opacity * cardMask);

    // === .card__shine:after layer ===
    let afterShine = pokemonVShineLayer(cardUV, true);
    let afterBlended = softLightBlend(cardRgb, afterShine.rgb);
    cardRgb = mix(cardRgb, afterBlended, afterShine.a * foilMask * uniforms.opacity * cardMask);

    let beamMerge = pokemonVBeamOverlap(cardUV);
    cardRgb = screenBlend(cardRgb, beamMerge * foilMask * uniforms.opacity * cardMask);

    // === GLARE LAYER ===
    let glare = glareGradient(cardUV);
    let glareFiltered = applyFilter(glare.rgb, 0.9, 1.75, 1.0);
    let glareBlended = hardLightBlend(cardRgb, glareFiltered);
    // CSS: opacity: calc(var(--card-opacity) * 0.5), mix-blend-mode: hard-light
    cardRgb = mix(cardRgb, glareBlended, glare.a * uniforms.opacity * 0.5 * cardMask);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,Gn=`struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    perspective: f32,
    opacity: f32,
    foilBrightness: f32,
    patternScaleX: f32,
    patternScaleY: f32,
    _pad0: f32,
    _pad1: f32,
    _pad2: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;
@group(0) @binding(5) var glitterTexture: texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) localPos: vec2f,
};

fn rotateX(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

fn rotateY(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
}

@vertex
fn vertexMain(@location(0) pos: vec2f, @location(1) uv: vec2f) -> VertexOutput {
    var output: VertexOutput;
    let canvasAspect = uniforms.resolution.x / uniforms.resolution.y;
    var p = vec3f(pos, 0.0);
    p = rotateX(p, uniforms.rotation.y);
    p = rotateY(p, uniforms.rotation.x);
    let w = uniforms.perspective - p.z;
    output.position = vec4f((p.x / canvasAspect) * uniforms.perspective, p.y * uniforms.perspective, 0.0, w);
    output.uv = uv;
    output.localPos = pos;
    return output;
}

fn sdRoundedRect(p: vec2f, b: vec2f, r: f32) -> f32 {
    let q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2f(0.0))) - r;
}

fn getCardSize() -> vec2f {
    let cardAspect = 0.718;
    let panePadding = 48.0 * uniforms.dpr;
    let maxWidthFromHeight = 0.6;
    let maxWidthFromPane = max((uniforms.resolution.x - panePadding) / uniforms.resolution.y, 0.0);
    let cardWidth = min(maxWidthFromHeight, maxWidthFromPane);
    return vec2f(cardWidth, cardWidth / cardAspect);
}

fn farthestCornerDist(p: vec2f) -> f32 {
    let d0 = distance(p, vec2f(0.0, 0.0));
    let d1 = distance(p, vec2f(1.0, 0.0));
    let d2 = distance(p, vec2f(0.0, 1.0));
    let d3 = distance(p, vec2f(1.0, 1.0));
    return max(max(d0, d1), max(d2, d3));
}

fn linearStep(edge0: f32, edge1: f32, x: f32) -> f32 {
    return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

fn screenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return 1.0 - (1.0 - base) * (1.0 - blend);
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), blend)
    );
}

fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
}

fn softLightChannel(base: f32, blend: f32) -> f32 {
    let low = base - (1.0 - 2.0 * blend) * base * (1.0 - base);
    let d = select(((16.0 * base - 12.0) * base + 4.0) * base, sqrt(max(base, 0.0)), base > 0.25);
    let high = base + (2.0 * blend - 1.0) * (d - base);
    return mix(low, high, step(0.5, blend));
}

fn softLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return vec3f(
        softLightChannel(base.r, blend.r),
        softLightChannel(base.g, blend.g),
        softLightChannel(base.b, blend.b)
    );
}

fn exclusionBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base + blend - 2.0 * base * blend;
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.00001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(1.0));
}

fn rgb2hsl(c: vec3f) -> vec3f {
    let maxC = max(max(c.r, c.g), c.b);
    let minC = min(min(c.r, c.g), c.b);
    let l = (maxC + minC) * 0.5;

    if (maxC == minC) {
        return vec3f(0.0, 0.0, l);
    }

    let d = maxC - minC;
    let s = select(d / (2.0 - maxC - minC), d / (maxC + minC), l > 0.5);

    var h: f32;
    if (maxC == c.r) {
        h = (c.g - c.b) / d + select(0.0, 6.0, c.g < c.b);
    } else if (maxC == c.g) {
        h = (c.b - c.r) / d + 2.0;
    } else {
        h = (c.r - c.g) / d + 4.0;
    }
    h /= 6.0;

    return vec3f(h, s, l);
}

fn hue2rgb(p: f32, q: f32, t: f32) -> f32 {
    var tt = t;
    if (tt < 0.0) { tt += 1.0; }
    if (tt > 1.0) { tt -= 1.0; }
    if (tt < 1.0/6.0) { return p + (q - p) * 6.0 * tt; }
    if (tt < 1.0/2.0) { return q; }
    if (tt < 2.0/3.0) { return p + (q - p) * (2.0/3.0 - tt) * 6.0; }
    return p;
}

fn hsl2rgb(hsl: vec3f) -> vec3f {
    if (hsl.y == 0.0) {
        return vec3f(hsl.z);
    }
    let q = select(hsl.z + hsl.y - hsl.z * hsl.y, hsl.z * (1.0 + hsl.y), hsl.z < 0.5);
    let p = 2.0 * hsl.z - q;
    return vec3f(
        hue2rgb(p, q, hsl.x + 1.0/3.0),
        hue2rgb(p, q, hsl.x),
        hue2rgb(p, q, hsl.x - 1.0/3.0)
    );
}

fn hueBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseHSL = rgb2hsl(base);
    let blendHSL = rgb2hsl(blend);
    return hsl2rgb(vec3f(blendHSL.x, baseHSL.y, baseHSL.z));
}

fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

fn alphaOver(bottom: vec4f, top: vec4f) -> vec4f {
    let a = top.a + bottom.a * (1.0 - top.a);
    let rgb = (top.rgb * top.a + bottom.rgb * bottom.a * (1.0 - top.a)) / max(a, 0.0001);
    return vec4f(rgb, a);
}

fn backgroundSampleUv(uv: vec2f, size: vec2f, pos: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - size) * pos;
    return (uv - origin) / size;
}

fn cssBackgroundPosition() -> vec2f {
    return vec2f(
        mix(0.37, 0.63, uniforms.pointer.x),
        mix(0.33, 0.67, uniforms.pointer.y)
    );
}

const SUNPILLAR_1: vec3f = vec3f(0.973, 0.459, 0.459);
const SUNPILLAR_2: vec3f = vec3f(0.969, 0.878, 0.376);
const SUNPILLAR_3: vec3f = vec3f(0.608, 0.969, 0.376);
const SUNPILLAR_4: vec3f = vec3f(0.518, 1.0, 0.835);
const SUNPILLAR_5: vec3f = vec3f(0.478, 0.569, 0.969);
const SUNPILLAR_6: vec3f = vec3f(0.780, 0.459, 0.973);

fn sunpillarGradient(y: f32) -> vec3f {
    let t = fract(y * 2.857);
    if (t < 0.143) { return mix(SUNPILLAR_1, SUNPILLAR_2, t / 0.143); }
    if (t < 0.286) { return mix(SUNPILLAR_2, SUNPILLAR_3, (t - 0.143) / 0.143); }
    if (t < 0.429) { return mix(SUNPILLAR_3, SUNPILLAR_4, (t - 0.286) / 0.143); }
    if (t < 0.571) { return mix(SUNPILLAR_4, SUNPILLAR_5, (t - 0.429) / 0.143); }
    if (t < 0.714) { return mix(SUNPILLAR_5, SUNPILLAR_6, (t - 0.571) / 0.143); }
    return mix(SUNPILLAR_6, SUNPILLAR_1, (t - 0.714) / 0.286);
}

fn diagonalStripePhase(layerUv: vec2f, repeatSize: f32) -> f32 {
    let angle = radians(115.0);
    let dir = vec2f(sin(angle), -cos(angle));
    let t = dot(layerUv, dir);
    return fract(t / repeatSize);
}

// Calculate perspective stretch factor based on fragment depth
// Parts of the card closer to viewer (smaller W) appear larger
fn getPerspectiveStretch(localPos: vec2f) -> f32 {
    // Reconstruct the 3D position after rotation (same as vertex shader)
    var p = vec3f(localPos, 0.0);
    p = rotateX(p, uniforms.rotation.y);
    p = rotateY(p, uniforms.rotation.x);
    // W value - smaller = closer to camera = more stretch
    let w = uniforms.perspective - p.z;
    // Normalize relative to base perspective (when card is flat, w = perspective)
    // Invert so closer = larger stretch factor
    let baseStretch = uniforms.perspective / w;
    // Amplify the effect - raise to power and scale
    return pow(baseStretch, 20.0);
}

fn diagonalStripeColor(layerUv: vec2f) -> vec3f {
    let cycle = diagonalStripePhase(layerUv, 0.12);
    let dark = vec3f(0.055, 0.082, 0.18);
    let gray = vec3f(0.557, 0.612, 0.612);
    let cyan = vec3f(0.525, 0.725, 0.725);
    let s1 = 0.317;
    let s2 = 0.375;
    let s3 = 0.433;
    let s4 = 0.833;
    if (cycle < s1) { return mix(dark, gray, cycle / s1); }
    if (cycle < s2) { return mix(gray, cyan, (cycle - s1) / (s2 - s1)); }
    if (cycle < s3) { return mix(cyan, gray, (cycle - s2) / (s3 - s2)); }
    if (cycle < s4) { return mix(gray, dark, (cycle - s3) / (s4 - s3)); }
    return dark;
}

// Beam mask - creates wider, softer beam effect
// stretch: perspective stretch factor (not used for width anymore - uniform beams)
// repeatSize: larger = fewer beams
fn diagonalBeamMask(layerUv: vec2f, stretch: f32, repeatSize: f32) -> f32 {
    let cycle = diagonalStripePhase(layerUv, repeatSize);
    let distToPeak = abs(cycle - 0.375);
    // Scale beam width by perspective stretch - wider when closer to camera
    // Use max() to ensure far beams don't get too thin
    let coreWidth = max(0.04 * stretch, 0.025);
    let haloWidth = max(0.09 * stretch, 0.05);
    // Core beam - tight center
    let core = 1.0 - smoothstep(0.0, coreWidth, distToPeak);
    // Halo - soft glow
    let halo = 1.0 - smoothstep(max(0.02 * stretch, 0.012), haloWidth, distToPeak);
    return clamp(core * 0.8 + halo * 0.5, 0.0, 1.0);
}

fn baseRadialGradient(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let dark = vec4f(0.0, 0.0, 0.0, 0.1);
    let pale = vec4f(0.0, 0.0, 0.0, 0.25);
    return vec4f(0.0, 0.0, 0.0, mix(dark.a, pale.a, linearStep(0.12, 1.2, t)));
}

fn overlayRadialGradient(uv: vec2f) -> vec3f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let pale = vec3f(0.918, 0.882, 0.863);
    let black = vec3f(0.0, 0.0, 0.0);
    return mix(pale, black, linearStep(0.10, 0.70, t));
}

fn glareGradient(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.812, 0.807, 0.788, 0.30);
    let dark = vec4f(0.138, 0.116, 0.102, 1.0);
    return vec4f(mix(light.rgb, dark.rgb, linearStep(0.0, 1.8, t)), mix(light.a, dark.a, linearStep(0.0, 1.8, t)));
}

fn composeAltArtLayer(
    uv: vec2f,
    diagonalSize: vec2f,
    beamOffset: vec2f,
    isBackLayer: bool,
    pointerFromCenter: f32,
    stretch: f32,
) -> vec3f {
    let foil = textureSampleLevel(foilTexture, linearSampler, uv, 0.0).rgb;
    let diagonalUv = backgroundSampleUv(uv, diagonalSize, beamOffset);
    let radialUv = backgroundSampleUv(uv, vec2f(2.0, 1.0), beamOffset);
    let sunSize = select(vec2f(2.0, 7.0), vec2f(2.0, 4.0), isBackLayer);
    let sunOffset = select(vec2f(0.0, beamOffset.y), vec2f(0.0, -beamOffset.y), isBackLayer);
    let sun = sunpillarGradient(backgroundSampleUv(uv, sunSize, sunOffset).y);
    let diagonal = diagonalStripeColor(diagonalUv);
    let radial = baseRadialGradient(radialUv).a;

    var layer = vec3f(radial);
    // Remove diagonal stripe for front layer to avoid thin beam lines
    // Back: reduced to avoid dark bands
    if (isBackLayer) {
        layer = hardLightBlend(layer, mix(vec3f(0.5), diagonal, 0.15));
    }
    layer = hueBlend(layer, sun);
    layer = softLightBlend(layer, foil);

    // CSS uses brightness that varies with pointer position
    let frontBrightness = 0.8 + pointerFromCenter * 0.4;
    let backBrightness = 1.0 + pointerFromCenter * 0.4;

    var filtered = select(
        applyFilter(layer, frontBrightness, 1.4, 2.25),
        applyFilter(layer, backBrightness, 1.5, 1.25),
        isBackLayer
    );

    // Add beam highlights for front layer only
    // Back layer beams are applied separately after exclusion blend
    // Fade beams based on tilt - less visible when card is flat
    if (!isBackLayer) {
        let tiltAmount = length(uniforms.rotation) * 5.0;  // Scale rotation to useful range
        let beamFade = clamp(tiltAmount, 0.0, 1.0);
        let beam = diagonalBeamMask(diagonalUv, stretch, 0.22);
        let beamColor = sun * 1.2;
        filtered = screenBlend(filtered, beamColor * beam * beamFade);
    }

    return filtered;
}

fn getBackBeamHighlight(uv: vec2f, beamOffset: vec2f, stretch: f32) -> vec3f {
    let diagonalUv = backgroundSampleUv(uv, vec2f(3.0, 1.0), beamOffset);
    // Use same sun color calculation as front layer for consistent colors
    let bg = cssBackgroundPosition();
    let sunUv = backgroundSampleUv(uv, vec2f(2.0, 7.0), vec2f(0.0, bg.y));
    let sun = sunpillarGradient(sunUv.y);
    let beam = diagonalBeamMask(diagonalUv, stretch, 0.22);  // Same as front beams - closer together
    return sun * 1.2 * beam;
}

fn beforeOverlay(uv: vec2f) -> vec3f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = overlayRadialGradient(uv);
    let alpha = 0.75 * (1.0 - linearStep(0.0, 0.4, t));
    return light * alpha;
}

@fragment
fn fragmentMain(@location(0) uv: vec2f, @location(1) localPos: vec2f) -> @location(0) vec4f {
    let cardSize = getCardSize();
    let cornerRadius = 0.04;
    let pxToLocal = 2.0 * uniforms.dpr / uniforms.resolution.y;

    let dist = sdRoundedRect(localPos, cardSize, cornerRadius);

    let shadowOffset = 22.0 * pxToLocal;
    let shadowBlur = 34.0 * pxToLocal;
    let shadowSpread = -7.0 * pxToLocal;
    let shadowPos = localPos - vec2f(0.0, -shadowOffset);
    let shadowSize = cardSize + vec2f(shadowSpread);
    let shadowRadius = max(cornerRadius + shadowSpread, 0.0);
    let shadowDist = sdRoundedRect(shadowPos, shadowSize, shadowRadius);
    let shadowAlpha = 1.0 - smoothstep(-shadowBlur, shadowBlur, shadowDist);
    let shadowColor = vec4f(0.0, 0.0, 0.0, shadowAlpha);

    let cardUV = vec2f(
        (localPos.x / (cardSize.x * 2.0)) + 0.5,
        0.5 - (localPos.y / (cardSize.y * 2.0))
    );

    let textureColor = textureSampleLevel(cardTexture, linearSampler, cardUV, 0.0);
    let maskColor = textureSampleLevel(maskTexture, linearSampler, cardUV, 0.0);
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);
    let foilMask = maskColor.a;

    // CSS var(--pointer-from-center) is distance from center normalized to ~1 at corners
    let pointerFromCenter = length(uniforms.pointer - vec2f(0.5)) / 0.70710678;
    let shineOpacity = clamp((1.35 * uniforms.opacity) - pointerFromCenter * 0.15, 0.0, 1.0);

    // Calculate perspective stretch - beams are wider where card is closer to camera
    let stretch = getPerspectiveStretch(localPos);

    let bg = cssBackgroundPosition();
    let beamPos = vec2f(bg.x + (bg.y * 0.2), bg.y);
    // Use same diagonal size for both layers so beams have identical width
    let diagonalSize = vec2f(3.0, 1.0);
    let frontLayer = composeAltArtLayer(cardUV, diagonalSize, beamPos, false, pointerFromCenter, stretch);
    let backLayer = composeAltArtLayer(cardUV, diagonalSize, -beamPos, true, pointerFromCenter, stretch);

    var cardRgb = textureColor.rgb;
    let frontShine = colorDodgeBlend(cardRgb, frontLayer);
    cardRgb = mix(cardRgb, frontShine, shineOpacity * foilMask * cardMask);

    let backShine = exclusionBlend(cardRgb, backLayer);
    cardRgb = mix(cardRgb, backShine, shineOpacity * 0.65 * foilMask * cardMask);

    // Apply back beam highlights after exclusion blend using screen
    // Use -beamPos so back beams are in different positions and move opposite to front
    // Fade beams based on tilt - less visible when card is flat
    let tiltAmount = length(uniforms.rotation) * 5.0;
    let beamFade = clamp(tiltAmount, 0.0, 1.0);
    let backBeam = getBackBeamHighlight(cardUV, -beamPos, stretch);
    cardRgb = screenBlend(cardRgb, backBeam * shineOpacity * beamFade * foilMask * cardMask);

    let before = beforeOverlay(cardUV);
    let beforeBlend = overlayBlend(cardRgb, before);
    cardRgb = mix(cardRgb, beforeBlend, 0.75 * shineOpacity * cardMask);

    let glare = glareGradient(cardUV);
    let glareFiltered = applyFilter(glare.rgb, 1.0, 1.2, 1.0);
    let glareBlended = hardLightBlend(cardRgb, glareFiltered);
    cardRgb = mix(cardRgb, glareBlended, glare.a * 0.75 * cardMask);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,$n=`struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    perspective: f32,
    opacity: f32,
    foilBrightness: f32,
    patternScaleX: f32,
    patternScaleY: f32,
    _pad0: f32,
    _pad1: f32,
    _pad2: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;
@group(0) @binding(5) var glitterTexture: texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) localPos: vec2f,
};

fn rotateX(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

fn rotateY(p: vec3f, angle: f32) -> vec3f {
    let s = sin(angle);
    let c = cos(angle);
    return vec3f(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
}

@vertex
fn vertexMain(@location(0) pos: vec2f, @location(1) uv: vec2f) -> VertexOutput {
    var output: VertexOutput;
    let canvasAspect = uniforms.resolution.x / uniforms.resolution.y;
    var p = vec3f(pos, 0.0);
    p = rotateX(p, uniforms.rotation.y);
    p = rotateY(p, uniforms.rotation.x);
    let w = uniforms.perspective - p.z;
    output.position = vec4f((p.x / canvasAspect) * uniforms.perspective, p.y * uniforms.perspective, 0.0, w);
    output.uv = uv;
    output.localPos = pos;
    return output;
}

fn sdRoundedRect(p: vec2f, b: vec2f, r: f32) -> f32 {
    let q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, vec2f(0.0))) - r;
}

fn getCardSize() -> vec2f {
    let cardAspect = 0.718;
    let panePadding = 48.0 * uniforms.dpr;
    let maxWidthFromHeight = 0.6;
    let maxWidthFromPane = max((uniforms.resolution.x - panePadding) / uniforms.resolution.y, 0.0);
    let cardWidth = min(maxWidthFromHeight, maxWidthFromPane);
    return vec2f(cardWidth, cardWidth / cardAspect);
}

fn farthestCornerDist(p: vec2f) -> f32 {
    let d0 = distance(p, vec2f(0.0, 0.0));
    let d1 = distance(p, vec2f(1.0, 0.0));
    let d2 = distance(p, vec2f(0.0, 1.0));
    let d3 = distance(p, vec2f(1.0, 1.0));
    return max(max(d0, d1), max(d2, d3));
}

fn linearStep(edge0: f32, edge1: f32, x: f32) -> f32 {
    return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

fn screenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return 1.0 - (1.0 - base) * (1.0 - blend);
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), blend)
    );
}

fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
}

fn softLightChannel(base: f32, blend: f32) -> f32 {
    let low = base - (1.0 - 2.0 * blend) * base * (1.0 - base);
    let d = select(((16.0 * base - 12.0) * base + 4.0) * base, sqrt(max(base, 0.0)), base > 0.25);
    let high = base + (2.0 * blend - 1.0) * (d - base);
    return mix(low, high, step(0.5, blend));
}

fn softLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return vec3f(
        softLightChannel(base.r, blend.r),
        softLightChannel(base.g, blend.g),
        softLightChannel(base.b, blend.b)
    );
}

fn exclusionBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base + blend - 2.0 * base * blend;
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.00001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(1.0));
}

fn rgb2hsl(c: vec3f) -> vec3f {
    let maxC = max(max(c.r, c.g), c.b);
    let minC = min(min(c.r, c.g), c.b);
    let l = (maxC + minC) * 0.5;

    if (maxC == minC) {
        return vec3f(0.0, 0.0, l);
    }

    let d = maxC - minC;
    let s = select(d / (2.0 - maxC - minC), d / (maxC + minC), l > 0.5);

    var h: f32;
    if (maxC == c.r) {
        h = (c.g - c.b) / d + select(0.0, 6.0, c.g < c.b);
    } else if (maxC == c.g) {
        h = (c.b - c.r) / d + 2.0;
    } else {
        h = (c.r - c.g) / d + 4.0;
    }
    h /= 6.0;

    return vec3f(h, s, l);
}

fn hue2rgb(p: f32, q: f32, t: f32) -> f32 {
    var tt = t;
    if (tt < 0.0) { tt += 1.0; }
    if (tt > 1.0) { tt -= 1.0; }
    if (tt < 1.0/6.0) { return p + (q - p) * 6.0 * tt; }
    if (tt < 1.0/2.0) { return q; }
    if (tt < 2.0/3.0) { return p + (q - p) * (2.0/3.0 - tt) * 6.0; }
    return p;
}

fn hsl2rgb(hsl: vec3f) -> vec3f {
    if (hsl.y == 0.0) {
        return vec3f(hsl.z);
    }
    let q = select(hsl.z + hsl.y - hsl.z * hsl.y, hsl.z * (1.0 + hsl.y), hsl.z < 0.5);
    let p = 2.0 * hsl.z - q;
    return vec3f(
        hue2rgb(p, q, hsl.x + 1.0/3.0),
        hue2rgb(p, q, hsl.x),
        hue2rgb(p, q, hsl.x - 1.0/3.0)
    );
}

fn hueBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseHSL = rgb2hsl(base);
    let blendHSL = rgb2hsl(blend);
    return hsl2rgb(vec3f(blendHSL.x, baseHSL.y, baseHSL.z));
}

fn applyFilter(color: vec3f, brightness: f32, contrast: f32, saturate: f32) -> vec3f {
    var c = color * brightness;
    c = (c - 0.5) * contrast + 0.5;
    let gray = dot(c, vec3f(0.2126, 0.7152, 0.0722));
    c = mix(vec3f(gray), c, saturate);
    return clamp(c, vec3f(0.0), vec3f(1.0));
}

fn alphaOver(bottom: vec4f, top: vec4f) -> vec4f {
    let a = top.a + bottom.a * (1.0 - top.a);
    let rgb = (top.rgb * top.a + bottom.rgb * bottom.a * (1.0 - top.a)) / max(a, 0.0001);
    return vec4f(rgb, a);
}

fn backgroundSampleUv(uv: vec2f, size: vec2f, pos: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - size) * pos;
    return (uv - origin) / size;
}

fn cssBackgroundPosition() -> vec2f {
    return vec2f(
        mix(0.37, 0.63, uniforms.pointer.x),
        mix(0.33, 0.67, uniforms.pointer.y)
    );
}

const SUNPILLAR_1: vec3f = vec3f(0.973, 0.459, 0.459);
const SUNPILLAR_2: vec3f = vec3f(0.969, 0.878, 0.376);
const SUNPILLAR_3: vec3f = vec3f(0.608, 0.969, 0.376);
const SUNPILLAR_4: vec3f = vec3f(0.518, 1.0, 0.835);
const SUNPILLAR_5: vec3f = vec3f(0.478, 0.569, 0.969);
const SUNPILLAR_6: vec3f = vec3f(0.780, 0.459, 0.973);

fn sunpillarGradient(y: f32) -> vec3f {
    let t = fract(y * 2.857);
    if (t < 0.143) { return mix(SUNPILLAR_1, SUNPILLAR_2, t / 0.143); }
    if (t < 0.286) { return mix(SUNPILLAR_2, SUNPILLAR_3, (t - 0.143) / 0.143); }
    if (t < 0.429) { return mix(SUNPILLAR_3, SUNPILLAR_4, (t - 0.286) / 0.143); }
    if (t < 0.571) { return mix(SUNPILLAR_4, SUNPILLAR_5, (t - 0.429) / 0.143); }
    if (t < 0.714) { return mix(SUNPILLAR_5, SUNPILLAR_6, (t - 0.571) / 0.143); }
    return mix(SUNPILLAR_6, SUNPILLAR_1, (t - 0.714) / 0.286);
}

fn diagonalStripePhase(layerUv: vec2f, repeatSize: f32) -> f32 {
    let angle = radians(115.0);
    let dir = vec2f(sin(angle), -cos(angle));
    let t = dot(layerUv, dir);
    return fract(t / repeatSize);
}

// Calculate perspective stretch factor based on fragment depth
// Parts of the card closer to viewer (smaller W) appear larger
fn getPerspectiveStretch(localPos: vec2f) -> f32 {
    // Reconstruct the 3D position after rotation (same as vertex shader)
    var p = vec3f(localPos, 0.0);
    p = rotateX(p, uniforms.rotation.y);
    p = rotateY(p, uniforms.rotation.x);
    // W value - smaller = closer to camera = more stretch
    let w = uniforms.perspective - p.z;
    // Normalize relative to base perspective (when card is flat, w = perspective)
    // Invert so closer = larger stretch factor
    let baseStretch = uniforms.perspective / w;
    // Amplify the effect - raise to power and scale
    return pow(baseStretch, 20.0);
}

fn diagonalStripeColor(layerUv: vec2f) -> vec3f {
    let cycle = diagonalStripePhase(layerUv, 0.12);
    let dark = vec3f(0.055, 0.082, 0.18);
    let gray = vec3f(0.557, 0.612, 0.612);
    let cyan = vec3f(0.525, 0.725, 0.725);
    let s1 = 0.317;
    let s2 = 0.375;
    let s3 = 0.433;
    let s4 = 0.833;
    if (cycle < s1) { return mix(dark, gray, cycle / s1); }
    if (cycle < s2) { return mix(gray, cyan, (cycle - s1) / (s2 - s1)); }
    if (cycle < s3) { return mix(cyan, gray, (cycle - s2) / (s3 - s2)); }
    if (cycle < s4) { return mix(gray, dark, (cycle - s3) / (s4 - s3)); }
    return dark;
}

// Beam mask - creates wider, softer beam effect
// stretch: perspective stretch factor (not used for width anymore - uniform beams)
// repeatSize: larger = fewer beams
fn diagonalBeamMask(layerUv: vec2f, stretch: f32, repeatSize: f32) -> f32 {
    let cycle = diagonalStripePhase(layerUv, repeatSize);
    let distToPeak = abs(cycle - 0.375);
    // Scale beam width by perspective stretch - wider when closer to camera
    // Use max() to ensure far beams don't get too thin
    let coreWidth = max(0.04 * stretch, 0.025);
    let haloWidth = max(0.09 * stretch, 0.05);
    // Core beam - tight center
    let core = 1.0 - smoothstep(0.0, coreWidth, distToPeak);
    // Halo - soft glow
    let halo = 1.0 - smoothstep(max(0.02 * stretch, 0.012), haloWidth, distToPeak);
    return clamp(core * 0.8 + halo * 0.5, 0.0, 1.0);
}

fn baseRadialGradient(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let dark = vec4f(0.0, 0.0, 0.0, 0.1);
    let pale = vec4f(0.0, 0.0, 0.0, 0.25);
    return vec4f(0.0, 0.0, 0.0, mix(dark.a, pale.a, linearStep(0.12, 1.2, t)));
}

fn overlayRadialGradient(uv: vec2f) -> vec3f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let pale = vec3f(0.918, 0.882, 0.863);
    let black = vec3f(0.0, 0.0, 0.0);
    return mix(pale, black, linearStep(0.10, 0.70, t));
}

fn glareGradient(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.812, 0.807, 0.788, 0.30);
    let dark = vec4f(0.138, 0.116, 0.102, 1.0);
    return vec4f(mix(light.rgb, dark.rgb, linearStep(0.0, 1.8, t)), mix(light.a, dark.a, linearStep(0.0, 1.8, t)));
}

fn composeAltArtLayer(
    uv: vec2f,
    diagonalSize: vec2f,
    beamOffset: vec2f,
    isBackLayer: bool,
    pointerFromCenter: f32,
    stretch: f32,
) -> vec3f {
    let foil = textureSampleLevel(foilTexture, linearSampler, uv, 0.0).rgb;
    let diagonalUv = backgroundSampleUv(uv, diagonalSize, beamOffset);
    let radialUv = backgroundSampleUv(uv, vec2f(2.0, 1.0), beamOffset);
    let sunSize = select(vec2f(2.0, 7.0), vec2f(2.0, 4.0), isBackLayer);
    let sunOffset = select(vec2f(0.0, beamOffset.y), vec2f(0.0, -beamOffset.y), isBackLayer);
    let sun = sunpillarGradient(backgroundSampleUv(uv, sunSize, sunOffset).y);
    let diagonal = diagonalStripeColor(diagonalUv);
    let radial = baseRadialGradient(radialUv).a;

    var layer = vec3f(radial);
    // Remove diagonal stripe for front layer to avoid thin beam lines
    // Back: reduced to avoid dark bands
    if (isBackLayer) {
        layer = hardLightBlend(layer, mix(vec3f(0.5), diagonal, 0.15));
    }
    layer = hueBlend(layer, sun);
    layer = softLightBlend(layer, foil);

    // CSS uses brightness that varies with pointer position
    let frontBrightness = 0.8 + pointerFromCenter * 0.4;
    let backBrightness = 1.0 + pointerFromCenter * 0.4;

    var filtered = select(
        applyFilter(layer, frontBrightness, 1.4, 2.25),
        applyFilter(layer, backBrightness, 1.5, 1.25),
        isBackLayer
    );

    // Add beam highlights for front layer only
    // Back layer beams are applied separately after exclusion blend
    // Fade beams based on tilt - less visible when card is flat
    if (!isBackLayer) {
        let tiltAmount = length(uniforms.rotation) * 5.0;  // Scale rotation to useful range
        let beamFade = clamp(tiltAmount, 0.0, 1.0);
        let beam = diagonalBeamMask(diagonalUv, stretch, 0.22);
        let beamColor = sun * 1.2;
        filtered = screenBlend(filtered, beamColor * beam * beamFade);
    }

    return filtered;
}

fn getBackBeamHighlight(uv: vec2f, beamOffset: vec2f, stretch: f32) -> vec3f {
    let diagonalUv = backgroundSampleUv(uv, vec2f(3.0, 1.0), beamOffset);
    // Use same sun color calculation as front layer for consistent colors
    let bg = cssBackgroundPosition();
    let sunUv = backgroundSampleUv(uv, vec2f(2.0, 7.0), vec2f(0.0, bg.y));
    let sun = sunpillarGradient(sunUv.y);
    let beam = diagonalBeamMask(diagonalUv, stretch, 0.22);  // Same as front beams - closer together
    return sun * 1.2 * beam;
}

fn beforeOverlay(uv: vec2f) -> vec3f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = overlayRadialGradient(uv);
    let alpha = 0.75 * (1.0 - linearStep(0.0, 0.4, t));
    return light * alpha;
}

@fragment
fn fragmentMain(@location(0) uv: vec2f, @location(1) localPos: vec2f) -> @location(0) vec4f {
    let cardSize = getCardSize();
    let cornerRadius = 0.04;
    let pxToLocal = 2.0 * uniforms.dpr / uniforms.resolution.y;

    let dist = sdRoundedRect(localPos, cardSize, cornerRadius);

    let shadowOffset = 22.0 * pxToLocal;
    let shadowBlur = 34.0 * pxToLocal;
    let shadowSpread = -7.0 * pxToLocal;
    let shadowPos = localPos - vec2f(0.0, -shadowOffset);
    let shadowSize = cardSize + vec2f(shadowSpread);
    let shadowRadius = max(cornerRadius + shadowSpread, 0.0);
    let shadowDist = sdRoundedRect(shadowPos, shadowSize, shadowRadius);
    let shadowAlpha = 1.0 - smoothstep(-shadowBlur, shadowBlur, shadowDist);
    let shadowColor = vec4f(0.0, 0.0, 0.0, shadowAlpha);

    let cardUV = vec2f(
        (localPos.x / (cardSize.x * 2.0)) + 0.5,
        0.5 - (localPos.y / (cardSize.y * 2.0))
    );

    let textureColor = textureSampleLevel(cardTexture, linearSampler, cardUV, 0.0);
    let maskColor = textureSampleLevel(maskTexture, linearSampler, cardUV, 0.0);
    let cardMask = 1.0 - smoothstep(-0.002, 0.002, dist);
    let foilMask = maskColor.a;

    // CSS var(--pointer-from-center) is distance from center normalized to ~1 at corners
    let pointerFromCenter = length(uniforms.pointer - vec2f(0.5)) / 0.70710678;
    let shineOpacity = clamp((1.35 * uniforms.opacity) - pointerFromCenter * 0.15, 0.0, 1.0);

    // Calculate perspective stretch - beams are wider where card is closer to camera
    let stretch = getPerspectiveStretch(localPos);

    let bg = cssBackgroundPosition();
    let beamPos = vec2f(bg.x + (bg.y * 0.2), bg.y);
    // Use same diagonal size for both layers so beams have identical width
    let diagonalSize = vec2f(3.0, 1.0);
    let frontLayer = composeAltArtLayer(cardUV, diagonalSize, beamPos, false, pointerFromCenter, stretch);
    let backLayer = composeAltArtLayer(cardUV, diagonalSize, -beamPos, true, pointerFromCenter, stretch);

    var cardRgb = textureColor.rgb;
    let frontShine = colorDodgeBlend(cardRgb, frontLayer);
    cardRgb = mix(cardRgb, frontShine, shineOpacity * foilMask * cardMask);

    let backShine = exclusionBlend(cardRgb, backLayer);
    cardRgb = mix(cardRgb, backShine, shineOpacity * 0.65 * foilMask * cardMask);

    // Apply back beam highlights after exclusion blend using screen
    // Use -beamPos so back beams are in different positions and move opposite to front
    // Fade beams based on tilt - less visible when card is flat
    let tiltAmount = length(uniforms.rotation) * 5.0;
    let beamFade = clamp(tiltAmount, 0.0, 1.0);
    let backBeam = getBackBeamHighlight(cardUV, -beamPos, stretch);
    cardRgb = screenBlend(cardRgb, backBeam * shineOpacity * beamFade * foilMask * cardMask);

    let before = beforeOverlay(cardUV);
    let beforeBlend = overlayBlend(cardRgb, before);
    cardRgb = mix(cardRgb, beforeBlend, 0.75 * shineOpacity * cardMask);

    let glare = glareGradient(cardUV);
    let glareFiltered = applyFilter(glare.rgb, 1.0, 1.2, 1.0);
    let glareBlended = hardLightBlend(cardRgb, glareFiltered);
    cardRgb = mix(cardRgb, glareBlended, glare.a * 0.75 * cardMask);

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);

    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,In={id:"glare",shaderCode:Bn},Hn={id:"plain",shaderCode:An},Wn={id:"reverse-holo",shaderCode:Fn},Nn={id:"amazing-rare",shaderCode:zn},Yn={id:"galaxy-cosmos-holo",shaderCode:_n,auxiliaryTextureUrls:["img/cosmos-bottom.png","img/cosmos-middle-trans.png","img/cosmos-top-trans.png"]},Xn={id:"holofoil-rare",shaderCode:Tn},qn={id:"radiant-holo",shaderCode:Mn},jn={id:"rainbow-rare",shaderCode:Vn},Kn={id:"secret-rare",shaderCode:En},Zn={id:"trainer-gallery-holo",shaderCode:On},Jn={id:"pokemon-v",shaderCode:Dn,auxiliaryTextureUrl:"img/grain.webp"},Qn={id:"pokemon-v-alternate-art",shaderCode:Gn},et={id:"pokemon-v-full-art",shaderCode:$n},nt={"Reverse Holo non-rares":Wn,"Holofoil Rare":Xn,"Trainer Gallery (V)":Hn,"Holofoil Amazing Rare":Nn,"Galaxy/Cosmos Holofoil":Yn,"Trainer Gallery Holofoil":Zn,"Radiant Holofoil":qn,"Rainbow Rare":jn,"Secret Rare (Gold)":Kn,"Pokemon V":Jn,"Pokemon V (Alternate Art)":Qn,"Pokemon V (Full Art)":et};function ye(n){return nt[n]??In}function tt(n){const e=new Set((n.types??[]).map(t=>t.toLowerCase()));return e.has("lightning")?.7:e.has("darkness")?.8:e.has("metal")?.6:.55}function rt(n){const e=(n.subtypes??[]).map(t=>t.toLowerCase());return n.supertype.toLowerCase()==="trainer"?2:e.some(t=>t.startsWith("stage"))?1:0}async function at({canvas:n,webgpuPane:e}){if(!navigator.gpu)throw alert("WebGPU not supported on this browser."),new Error("WebGPU not supported");const t=await navigator.gpu.requestAdapter();if(!t)throw alert("No appropriate GPUAdapter found."),new Error("No appropriate GPUAdapter found");const r=await t.requestDevice(),i=n.getContext("webgpu");if(!i)throw new Error("Unable to acquire WebGPU context");let o=window.devicePixelRatio||1;const c=navigator.gpu.getPreferredCanvasFormat(),v={device:r,format:c,alphaMode:"premultiplied"};i.configure(v);const m=r.createSampler({magFilter:"linear",minFilter:"linear"}),s=.718,d=1.2,g=new Float32Array([-1*d,-1/s*d,0,1,1*d,-1/s*d,1,1,1*d,1/s*d,1,0,-1*d,1/s*d,0,0]),b=new Uint16Array([0,1,2,0,2,3]),x=r.createBuffer({size:g.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});r.queue.writeBuffer(x,0,g);const P=r.createBuffer({size:b.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});r.queue.writeBuffer(P,0,b);const L=r.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),y=r.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:5,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:6,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:7,visibility:GPUShaderStage.FRAGMENT,texture:{}}]}),f=r.createPipelineLayout({bindGroupLayouts:[y]}),l=new Map;function a(u){const p=r.createShaderModule({code:u.shaderCode});return r.createRenderPipeline({layout:f,vertex:{module:p,entryPoint:"vertexMain",buffers:[{arrayStride:16,attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:8,format:"float32x2"}]}]},fragment:{module:p,entryPoint:"fragmentMain",targets:[{format:c,blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-list"}})}function h(u){let p=l.get(u.id);return p||(p=a(u),l.set(u.id,p)),p}const C=new Map;async function U(u){let p=C.get(u);return p||(p=await W(R(u)),C.set(u,p)),p}async function B(u){const p=u.auxiliaryTextureUrls??[u.auxiliaryTextureUrl??"img/glitter.png"],w=[p[0]??"img/glitter.png",p[1]??"img/glitter.png",p[2]??"img/glitter.png"];return Promise.all(w.map(U))}function F(u,p,w,k){return r.createBindGroup({layout:y,entries:[{binding:0,resource:{buffer:L}},{binding:1,resource:m},{binding:2,resource:u.createView()},{binding:3,resource:p.createView()},{binding:4,resource:w.createView()},{binding:5,resource:k[0].createView()},{binding:6,resource:k[1].createView()},{binding:7,resource:k[2].createView()}]})}let z=V([255,255,255,255]),O=V([0,0,0,255]),D=V([0,0,0,0]);const re=ye("");let ae=h(re),Y=await B(re),ie=F(z,O,D,Y),G=.5,$=.5,X=0,q=0,j=0,K=0,Z=0,J=0,oe=.55,le=.476,se=.476,ce=0,de=0,fe=0;const ke=performance.now();let I=1,M=1,H;function ue(){window.clearTimeout(H),G=.5,$=.5,X=0,q=0,Z=0}function Le(u=500){window.clearTimeout(H),H=window.setTimeout(ue,u)}function Re(){const u=n.getBoundingClientRect(),p=Math.min(u.height*.6,u.width-48),w=p/s,k=u.left+(u.width-p)/2,_=u.top+(u.height-w)/2;return{width:p,height:w,cardLeft:k,cardTop:_}}function pe(u){window.clearTimeout(H),G=Math.min(Math.max(u.x,0),1),$=Math.min(Math.max(u.y,0),1);const p=G-.5,w=$-.5;X=-(p*100)/3.5*(Math.PI/180),q=-(w*100)/3.5*(Math.PI/180),Z=1}function Pe(u){const p=Re(),w={x:(u.clientX-p.cardLeft)/p.width,y:(u.clientY-p.cardTop)/p.height};return pe(w),w}function Ue(){Le()}function Q(){o=window.devicePixelRatio||1;const u=e.getBoundingClientRect();I=Math.max(1,Math.round(u.width*o)),M=Math.max(1,Math.round(u.height*o)),(n.width!==I||n.height!==M)&&(n.width=I,n.height=M,i.configure(v))}new ResizeObserver(Q).observe(e),window.addEventListener("resize",Q),Q();function V(u){const p=r.createTexture({size:[1,1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});return r.queue.writeTexture({texture:p},new Uint8Array(u),{bytesPerRow:4},[1,1]),p}async function W(u){const p=await fetch(u);if(!p.ok)throw new Error(`Unable to load texture: ${u}`);const w=await p.blob(),k=await createImageBitmap(w),_=r.createTexture({size:[k.width,k.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});return r.queue.copyExternalImageToTexture({source:k},{texture:_},[k.width,k.height]),k.close(),_}async function Ae(u,p,w,k){const _=ye(p),T=h(_),he=N(w,"foils",p,k),ve=N(w,"masks",p,k),[Te,Fe,ze]=await Promise.all([W(u),he?W(he):Promise.resolve(V([0,0,0,255])),ve?W(ve):Promise.resolve(V([0,0,0,0]))]),Me=z,Ve=O,Ee=D;z=Te,O=Fe,D=ze,ae=T,Y=await B(_),oe=tt(w);const me=Se(w);ce=me.cosmosPixels.x,de=me.cosmosPixels.y,fe=rt(w),ie=F(z,O,D,Y),Me.destroy(),Ve.destroy(),Ee.destroy()}function Be(){j+=(X-j)*.15,K+=(q-K)*.15,J+=(Z-J)*.15;const u=(performance.now()-ke)/1e3,p=600*(2*o/M),w=new Float32Array([I,M,G,$,j,K,u,o,p,J,oe,le,se,ce,de,fe]);r.queue.writeBuffer(L,0,w);const k=r.createCommandEncoder(),_=i.getCurrentTexture().createView(),T=k.beginRenderPass({colorAttachments:[{view:_,clearValue:{r:.2235,g:.2314,b:.2706,a:1},loadOp:"clear",storeOp:"store"}]});T.setPipeline(ae),T.setBindGroup(0,ie),T.setVertexBuffer(0,x),T.setIndexBuffer(P,"uint16"),T.drawIndexed(b.length),T.end(),r.queue.submit([k.finish()])}function _e(u,p){le=u,se=p}return{updateTexture:Ae,setPointer:pe,handlePointerMove:Pe,handlePointerLeave:Ue,resetPointer:ue,render:Be,setPatternParams:_e}}async function it(){Oe();const n=document.createElement("a");n.className="github-link",n.href="https://github.com/jeantimex/pokemon-cards-webgpu",n.target="_blank",n.rel="noreferrer noopener",n.setAttribute("aria-label","GitHub profile for jeantimex"),n.innerHTML=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2a10 10 0 0 0-3.16 19.48c.5.09.68-.22.68-.48v-1.68c-2.78.61-3.37-1.17-3.37-1.17-.46-1.18-1.11-1.49-1.11-1.49-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.66.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.93.36.31.69.92.69 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"/>
    </svg>
    <span>jeantimex</span>
  `,document.body.appendChild(n);const e=document.querySelector("#webgpu-canvas"),t=document.querySelector("#css-card"),r=document.querySelector("#css-card-image"),i=document.querySelector(".pane-css .card__front"),o=document.querySelector(".pane-css .card__rotator"),c=document.querySelector(".pane-webgpu"),m=await(await fetch(R("cards.json"))).json(),d=cn(m,new Set),g=Pn(d,m),b=dn({cssCard:t,cssCardImage:r,cssCardFront:i,cssCardRotator:o}),x=await at({canvas:e,webgpuPane:c}),P=async(y,f)=>{const l=De(y.images.large);b.updateCard(y,l,f,d.variants[f]),await x.updateTexture(l,f,y,d.variants[f])};Cn({cardLibrary:d,cards:m,initialCategory:g.category,initialCardId:g.card.id,onCardChange:P,onSelectionChange:(y,f)=>{Un(f,y)},webgpuRenderer:x}),o.addEventListener("pointermove",y=>{const f=b.handlePointerMove(y);x.setPointer(f)}),o.addEventListener("pointerleave",()=>{b.handlePointerLeave(),x.handlePointerLeave()}),o.addEventListener("blur",()=>{b.handleBlur(),x.resetPointer()}),c.addEventListener("pointermove",y=>{const f=x.handlePointerMove(y);b.setPointer(f)}),c.addEventListener("pointerleave",()=>{x.handlePointerLeave(),b.handlePointerLeave()}),window.addEventListener("blur",()=>{x.resetPointer(),b.handleBlur()});function L(){b.tick(),x.render(),requestAnimationFrame(L)}requestAnimationFrame(L)}it();
