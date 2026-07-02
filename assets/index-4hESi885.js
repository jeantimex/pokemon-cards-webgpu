(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(l){if(l.ep)return;l.ep=!0;const i=t(l);fetch(l.href,i)}})();function R(n){const e=n.startsWith("/")?n.slice(1):n;return new URL(e,document.baseURI).href}function Ee(){const n=document.documentElement.style;n.setProperty("--asset-grain",`url(${R("img/grain.webp")})`),n.setProperty("--asset-glitter",`url(${R("img/glitter.png")})`),n.setProperty("--asset-cosmos-bottom",`url(${R("img/cosmos-bottom.png")})`),n.setProperty("--asset-cosmos-middle-trans",`url(${R("img/cosmos-middle-trans.png")})`),n.setProperty("--asset-cosmos-top-trans",`url(${R("img/cosmos-top-trans.png")})`),n.setProperty("--asset-illusion",`url(${R("img/illusion.png")})`),n.setProperty("--asset-illusion-mask",`url(${R("img/illusion-mask.png")})`),n.setProperty("--asset-geometric",`url(${R("img/geometric.png")})`),n.setProperty("--asset-trainerbg",`url(${R("img/trainerbg.png")})`),n.setProperty("--asset-vmaxbg",`url(${R("img/vmaxbg.jpg")})`),n.setProperty("--asset-ancient",`url(${R("img/ancient.png")})`)}function Ie(n){const e=new URL(n);return R(`cards${e.pathname}`)}function ke(n,e,t){var i,c;const r=n.rarity.toLowerCase(),l=n.number.toLowerCase().startsWith("sv");return t==="reverse-holo"?`${r} reverse holo`:e==="Shiny Vault"&&l?r==="rare holo vmax"||(i=n.subtypes)!=null&&i.includes("VMAX")?"rare shiny vmax":r==="rare holo v"||(c=n.subtypes)!=null&&c.includes("V")?"rare shiny v":"rare shiny":e==="VMax (Alternate/Rainbow)"?"rare rainbow alt":r}const qe={"amazing rare":{etch:"etched",style:"swsecret"},"rare holo cosmos":{etch:"holo",style:"cosmos"},"rare holo":{etch:"holo",style:"swholo"},"rare holo v":{etch:"holo",style:"sunpillar"},"rare holo vmax":{etch:"etched",style:"sunpillar"},"rare holo vstar":{etch:"etched",style:"sunpillar"},"rare ultra":{etch:"etched",style:"sunpillar"},"rare secret":{etch:"etched",style:"swsecret"},"rare rainbow":{etch:"etched",style:"swsecret"},"rare shiny":{etch:"etched",style:"sunpillar"},"rare shiny v":{etch:"etched",style:"sunpillar"},"rare shiny vmax":{etch:"etched",style:"swsecret"}};function Ne(n,e){var t;return e.endsWith("reverse holo")?{etch:"holo",style:"reverse"}:e==="trainer gallery rare holo"?{etch:"holo",style:"rainbow"}:e==="rare holo v"?{etch:n.number.match(/^[tg]g/i)?"etched":"holo",style:"sunpillar"}:e==="rare rainbow alt"?{etch:"etched",style:(t=n.subtypes)!=null&&t.includes("VMAX")?"swsecret":"sunpillar"}:qe[e]??null}function H(n,e,t,r){const l=ke(n,t,r),i=l==="trainer gallery rare holo"?"rare holo":l,h=i==="rare holo"&&(l==="trainer gallery rare holo"||n.number.match(/^[tg]g/i))?{etch:"holo",style:"rainbow"}:Ne(n,i);if(!h)return"";const g=n.number.toString().toLowerCase().replace("swsh","").padStart(3,"0"),s=n.set.toString().toLowerCase().replace(/(tg|gg|sv)/,""),f=(h==null?void 0:h.etch)??"holo",m=(h==null?void 0:h.style)??"cosmos";return R(`foils/${s}/${e}/upscaled/${g}_foil_${f}_${m}_2x.webp`)}function w(n,e,t,r="standard"){return{name:n,description:e,cards:t,variant:r}}function We(n){return w("Common & Uncommon","All cards get a 3d rotation with CSS based on the cursor position. The default basic non-holo cards simply apply a flare/glare effect.",n.slice(1,4))}function He(n){return w("Galaxy/Cosmos Holofoil","Special image background of a galaxy effect with a gradient rainbow set to color-dodge & color-burn on top.",n.slice(13,16))}function $e(n){return w("Holofoil Amazing Rare","Unique shiny foil that extends past the frame and is much shinier than a regular holo effect, and textured.",n.slice(76,85))}function Ye(n){return w("Holofoil Rare","Holo cards have an additional vertical beam holo effect. This uses a combintation of repeating gradients and filters.",n.slice(7,13))}function Xe(n){return w("Trainer Gallery Holofoil","Kind of metallic effect with iridescent shine. Achieved with a large color dodge linear gradient.",n.filter(e=>e.rarity.toLowerCase()==="trainer gallery rare holo").sort((e,t)=>e.name.localeCompare(t.name)))}function je(n){const e=n.find(t=>t.id==="swsh12pt5-160");return w("Secret Rare (Gold)","GOLD! Here we apply two glitter layers on top of each other with a overlay effect and slide the two layers in opposite directions.",[n[58],n[59],n[60],n[61],n[62],n[63],e].filter(t=>!!t))}function Ke(n){return w("Shiny Vault","Foil background is a shiny silver color. Applied with radial gradients to darken the foil over the background.",n.slice(85,91))}function Ze(n){return w("Pokemon V (Alternate Art)","Practically the same holo effect as the Ultra Rare (Full Art) cards. The only difference is the pattern texture.",n.slice(28,34))}function Je(n){return w("Pokemon V","Diagonal holographic effect which that appears to travel in opposite directions when you tilt the card.",n.slice(22,25))}function Qe(n){return w("Pokemon V (Full Art)","Similar to the Pokemon V effect, but they have additional texture when looked at from certain angles.",n.slice(25,28))}function en(n){return w("Radiant Holofoil","The newest holofoil added to the series! Uses a criss-cross linear gradient pattern that moves across the card.",n.slice(16,19))}function nn(n){return w("Rainbow Rare","Super glittery effect on top of pastel gradients. Achieved with background glitter and color-burn/hard-light blends.",n.slice(52,58))}function tn(n){return w("Reverse Holo non-rares","Reverse holo cards come in many shapes and sizes. The background uses a foil and a mask layer along with a glare.",[...n.slice(4,7),...n.slice(70,76)],"reverse-holo")}function rn(n){return w("VMax (Alternate/Rainbow)","Vibrant and glittery overlay. Achieved with a background image of glitter/sparkles sandwiching linear gradients.",n.slice(40,43).filter(e=>e.rarity.toLowerCase()==="rare rainbow").sort((e,t)=>e.name.localeCompare(t.name)))}function an(n){return w("VMax","The gradient effect of Pokemon VMax is more subtle, using a larger background gradient which moves more slowly.",n.slice(37,40).filter(e=>e.rarity.toLowerCase()==="rare holo vmax").sort((e,t)=>e.name.localeCompare(t.name)))}function ln(n){return w("VStar","Diagonal gradients overlaying a texture. Brighter with a pastel hue, making the gradient and texture more subtle.",n.slice(43,46).filter(e=>e.rarity.toLowerCase()==="rare holo vstar").sort((e,t)=>e.name.localeCompare(t.name)))}function on(n){return w("Trainer Gallery (VMax)","Generally quite similar to the normal V and VMax cards, with a different background texture.",n.slice(64,70).filter(e=>e.rarity.toLowerCase()==="rare holo vmax").sort((e,t)=>e.name.localeCompare(t.name)))}function sn(n){return w("Trainer Gallery (V)","Generally quite similar to the normal V and VMax cards, with a different background texture.",n.slice(64,70).filter(e=>e.rarity.toLowerCase()==="rare holo v").sort((e,t)=>e.name.localeCompare(t.name)))}function cn(n){return w("Trainer Holo","Diagonal gradients overlaying a texture, quite similar to the Ultra Rare cards but generally brighter.",n.filter(e=>{var t;return e.rarity.toLowerCase()==="rare ultra"&&((t=e.subtypes)==null?void 0:t.includes("Supporter"))}).sort((e,t)=>e.name.localeCompare(t.name)))}function fn(n){return[]}function dn(n,e){const t=[je(n),We(n),tn(n),Ye(n),Xe(n),He(n),$e(n),en(n),Je(n),Qe(n),Ze(n),nn(n),Ke(n),an(n),rn(n),ln(n),sn(n),on(n),cn(n),...fn()].map(s=>({...s,cards:s.cards.filter(f=>!e.has(f.id)).sort((f,m)=>f.name.localeCompare(m.name))})).filter(s=>s.cards.length>0).sort((s,f)=>s.name.localeCompare(f.name)),r=Object.fromEntries(t.map(s=>[s.name,s.cards])),l=Object.fromEntries(t.map(s=>[s.name,s.description])),i=Object.fromEntries(t.map(s=>[s.name,s.variant])),c=t.map(s=>s.name),h=c[0],g=r[h][0];return{categories:r,descriptions:l,variants:i,categoryNames:c,initialCategory:h,initialCard:g}}function xe(n,e){let t=e;for(let r=0;r<n.length;r+=1)t^=n.charCodeAt(r),t=Math.imul(t,16777619);return t>>>0}function ye(n){return n/4294967295}function Ce(n){const e=`${n.id}:${n.set}:${n.number}`,t=ye(xe(e,2166136261)),r=ye(xe(e,709607)),l={x:Math.floor(t*734),y:Math.floor(r*1280)};return{x:t,y:r,cosmosPixels:l}}function un({cssCard:n,cssCardImage:e,cssCardFront:t,cssCardRotator:r}){function l(a,v=0,k=100){return Math.min(Math.max(a,v),k)}function i(a,v=3){return parseFloat(a.toFixed(v))}function c(a,v,k,U,A){return i(U+(A-U)*(a-v)/(k-v))}function h(a){return["card","interactive",...(a.types??[]).map(v=>v.toLowerCase())].join(" ")}let g={pointerX:50,pointerY:50,rotateX:0,rotateY:0,backgroundX:50,backgroundY:50,opacity:0},s={...g},f;function m(a){const v=l(Math.sqrt((a.pointerY-50)*(a.pointerY-50)+(a.pointerX-50)*(a.pointerX-50))/50,0,1);n.style.setProperty("--pointer-x",`${a.pointerX}%`),n.style.setProperty("--pointer-y",`${a.pointerY}%`),n.style.setProperty("--pointer-from-center",String(v)),n.style.setProperty("--pointer-from-top",String(a.pointerY/100)),n.style.setProperty("--pointer-from-left",String(a.pointerX/100)),n.style.setProperty("--card-opacity",String(a.opacity)),n.style.setProperty("--rotate-x",`${a.rotateX}deg`),n.style.setProperty("--rotate-y",`${a.rotateY}deg`),n.style.setProperty("--background-x",`${a.backgroundX}%`),n.style.setProperty("--background-y",`${a.backgroundY}%`),n.style.setProperty("--card-scale","1"),n.style.setProperty("--translate-x","0px"),n.style.setProperty("--translate-y","0px")}function b(a=500){window.clearTimeout(f),f=window.setTimeout(()=>{n.classList.remove("interacting"),g={pointerX:50,pointerY:50,rotateX:0,rotateY:0,backgroundX:50,backgroundY:50,opacity:0}},a)}function x(a,v,k,U){const A=Ce(a);n.className=`${h(a)} loading`;const F=H(a,"masks",k,U),z=H(a,"foils",k,U);n.classList.toggle("masked",!!F),n.dataset.number=a.number.toLowerCase(),n.dataset.set=a.set,n.dataset.subtypes=(a.subtypes??[]).join(" ").toLowerCase(),n.dataset.supertype=a.supertype.toLowerCase(),n.dataset.rarity=ke(a,k,U),n.dataset.trainerGallery=String(!!a.number.match(/^[tg]g/i)),r.setAttribute("aria-label",`Expand the Pokemon Card; ${a.name}.`),e.alt=`Front design of the ${a.name} Pokemon Card, with the stats and info around the edge`,t.style.setProperty("--seedx",String(A.x)),t.style.setProperty("--seedy",String(A.y)),t.style.setProperty("--cosmosbg",`${A.cosmosPixels.x}px ${A.cosmosPixels.y}px`),F?(t.style.setProperty("--mask",`url(${F})`),t.style.setProperty("--foil",`url(${z})`)):(t.style.removeProperty("--mask"),t.style.removeProperty("--foil")),e.onload=()=>{n.classList.remove("loading")},e.src=v}function B(a){window.clearTimeout(f),n.classList.add("interacting");const v={x:l(i(a.x*100)),y:l(i(a.y*100))},k={x:v.x-50,y:v.y-50};g={backgroundX:c(v.x,0,100,37,63),backgroundY:c(v.y,0,100,33,67),rotateX:i(-(k.x/3.5)),rotateY:i(k.y/3.5),pointerX:i(v.x),pointerY:i(v.y),opacity:1}}function L(a){const v=r.getBoundingClientRect(),k={x:a.clientX-v.left,y:a.clientY-v.top},U={x:l(k.x/v.width,0,1),y:l(k.y/v.height,0,1)};return B(U),U}function y(){b()}function d(){b(0)}function o(){s={pointerX:s.pointerX+(g.pointerX-s.pointerX)*.15,pointerY:s.pointerY+(g.pointerY-s.pointerY)*.15,rotateX:s.rotateX+(g.rotateX-s.rotateX)*.15,rotateY:s.rotateY+(g.rotateY-s.rotateY)*.15,backgroundX:s.backgroundX+(g.backgroundX-s.backgroundX)*.15,backgroundY:s.backgroundY+(g.backgroundY-s.backgroundY)*.15,opacity:s.opacity+(g.opacity-s.opacity)*.15},m(s)}return{updateCard:x,setPointer:B,handlePointerMove:L,handlePointerLeave:y,handleBlur:d,tick:o}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class P{constructor(e,t,r,l,i="div"){this.parent=e,this.object=t,this.property=r,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(i),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(l),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),P.nextNameID=P.nextNameID||0,this.$name.id=`lil-gui-name-${++P.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",c=>c.stopPropagation()),this.domElement.addEventListener("keyup",c=>c.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(r)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("lil-disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class pn extends P{constructor(e,t,r){super(e,t,r,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function te(n){let e,t;return(e=n.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=n.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=n.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const vn={isPrimitive:!0,match:n=>typeof n=="string",fromHexString:te,toHexString:te},O={isPrimitive:!0,match:n=>typeof n=="number",fromHexString:n=>parseInt(n.substring(1),16),toHexString:n=>"#"+n.toString(16).padStart(6,0)},hn={isPrimitive:!1,match:n=>Array.isArray(n)||ArrayBuffer.isView(n),fromHexString(n,e,t=1){const r=O.fromHexString(n);e[0]=(r>>16&255)/255*t,e[1]=(r>>8&255)/255*t,e[2]=(r&255)/255*t},toHexString([n,e,t],r=1){r=255/r;const l=n*r<<16^e*r<<8^t*r<<0;return O.toHexString(l)}},gn={isPrimitive:!1,match:n=>Object(n)===n,fromHexString(n,e,t=1){const r=O.fromHexString(n);e.r=(r>>16&255)/255*t,e.g=(r>>8&255)/255*t,e.b=(r&255)/255*t},toHexString({r:n,g:e,b:t},r=1){r=255/r;const l=n*r<<16^e*r<<8^t*r<<0;return O.toHexString(l)}},mn=[vn,O,hn,gn];function bn(n){return mn.find(e=>e.match(n))}class xn extends P{constructor(e,t,r,l){super(e,t,r,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=bn(this.initialValue),this._rgbScale=l,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const i=te(this.$text.value);i&&this._setValueFromHexString(i)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class ne extends P{constructor(e,t,r){super(e,t,r,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",l=>{l.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class yn extends P{constructor(e,t,r,l,i,c){super(e,t,r,"lil-number"),this._initInput(),this.min(l),this.max(i);const h=c!==void 0;this.step(h?c:this._getImplicitStep(),h),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let o=parseFloat(this.$input.value);isNaN(o)||(this._stepExplicit&&(o=this._snap(o)),this.setValue(this._clamp(o)))},r=o=>{const a=parseFloat(this.$input.value);isNaN(a)||(this._snapClampSetValue(a+o),this.$input.value=this.getValue())},l=o=>{o.key==="Enter"&&this.$input.blur(),o.code==="ArrowUp"&&(o.preventDefault(),r(this._step*this._arrowKeyMultiplier(o))),o.code==="ArrowDown"&&(o.preventDefault(),r(this._step*this._arrowKeyMultiplier(o)*-1))},i=o=>{this._inputFocused&&(o.preventDefault(),r(this._step*this._normalizeMouseWheel(o)))};let c=!1,h,g,s,f,m;const b=5,x=o=>{h=o.clientX,g=s=o.clientY,c=!0,f=this.getValue(),m=0,window.addEventListener("mousemove",B),window.addEventListener("mouseup",L)},B=o=>{if(c){const a=o.clientX-h,v=o.clientY-g;Math.abs(v)>b?(o.preventDefault(),this.$input.blur(),c=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(a)>b&&L()}if(!c){const a=o.clientY-s;m-=a*this._step*this._arrowKeyMultiplier(o),f+m>this._max?m=this._max-f:f+m<this._min&&(m=this._min-f),this._snapClampSetValue(f+m)}s=o.clientY},L=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",B),window.removeEventListener("mouseup",L)},y=()=>{this._inputFocused=!0},d=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",l),this.$input.addEventListener("wheel",i,{passive:!1}),this.$input.addEventListener("mousedown",x),this.$input.addEventListener("focus",y),this.$input.addEventListener("blur",d)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const e=(d,o,a,v,k)=>(d-o)/(a-o)*(k-v)+v,t=d=>{const o=this.$slider.getBoundingClientRect();let a=e(d,o.left,o.right,this._min,this._max);this._snapClampSetValue(a)},r=d=>{this._setDraggingStyle(!0),t(d.clientX),window.addEventListener("mousemove",l),window.addEventListener("mouseup",i)},l=d=>{t(d.clientX)},i=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",l),window.removeEventListener("mouseup",i)};let c=!1,h,g;const s=d=>{d.preventDefault(),this._setDraggingStyle(!0),t(d.touches[0].clientX),c=!1},f=d=>{d.touches.length>1||(this._hasScrollBar?(h=d.touches[0].clientX,g=d.touches[0].clientY,c=!0):s(d),window.addEventListener("touchmove",m,{passive:!1}),window.addEventListener("touchend",b))},m=d=>{if(c){const o=d.touches[0].clientX-h,a=d.touches[0].clientY-g;Math.abs(o)>Math.abs(a)?s(d):(window.removeEventListener("touchmove",m),window.removeEventListener("touchend",b))}else d.preventDefault(),t(d.touches[0].clientX)},b=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",m),window.removeEventListener("touchend",b)},x=this._callOnFinishChange.bind(this),B=400;let L;const y=d=>{if(Math.abs(d.deltaX)<Math.abs(d.deltaY)&&this._hasScrollBar)return;d.preventDefault();const a=this._normalizeMouseWheel(d)*this._step;this._snapClampSetValue(this.getValue()+a),this.$input.value=this.getValue(),clearTimeout(L),L=setTimeout(x,B)};this.$slider.addEventListener("mousedown",r),this.$slider.addEventListener("touchstart",f,{passive:!1}),this.$slider.addEventListener("wheel",y,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",e),document.body.classList.toggle("lil-dragging",e),document.body.classList.toggle(`lil-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:r}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,r=-e.wheelDelta/120,r*=this._stepExplicit?1:10),t+-r}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Sn extends P{constructor(e,t,r,l){super(e,t,r,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(l)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const r=document.createElement("option");r.textContent=t,this.$select.appendChild(r)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class wn extends P{constructor(e,t,r){super(e,t,r,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",l=>{l.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var kn=`.lil-gui {
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
}`;function Cn(n){const e=document.createElement("style");e.innerHTML=n;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let Se=!1;class re{constructor({parent:e,autoPlace:t=e===void 0,container:r,width:l,title:i="Controls",closeFolders:c=!1,injectStyles:h=!0,touchStyles:g=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(i),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),g&&this.domElement.classList.add("lil-allow-touch-styles"),!Se&&h&&(Cn(kn),Se=!0),r?r.appendChild(this.domElement):t&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),l&&this.domElement.style.setProperty("--width",l+"px"),this._closeFolders=c}add(e,t,r,l,i){if(Object(r)===r)return new Sn(this,e,t,r);const c=e[t];switch(typeof c){case"number":return new yn(this,e,t,r,l,i);case"boolean":return new pn(this,e,t);case"string":return new wn(this,e,t);case"function":return new ne(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,c)}addColor(e,t,r=1){return new xn(this,e,t,r)}addFolder(e){const t=new re({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(r=>{r instanceof ne||r._name in e.controllers&&r.load(e.controllers[r._name])}),t&&e.folders&&this.folders.forEach(r=>{r._title in e.folders&&r.load(e.folders[r._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(r=>{if(!(r instanceof ne)){if(r._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${r._name}"`);t.controllers[r._name]=r.save()}}),e&&this.folders.forEach(r=>{if(r._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${r._title}"`);t.folders[r._title]=r.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("lil-transition");const r=i=>{i.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",r))};this.$children.addEventListener("transitionend",r);const l=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!e),requestAnimationFrame(()=>{this.$children.style.height=l+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(r=>r.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}function Ln({cardLibrary:n,cards:e,initialCategory:t,initialCardId:r,onCardChange:l,onSelectionChange:i,webgpuRenderer:c}){var d;const h=new re({title:"Card Library"});h.close();const g={patternWidth:.2,patternHeight:.4};function s(o){o==="Radiant Holofoil"&&(c==null||c.setPatternParams(g.patternWidth,g.patternHeight))}const f={category:n.categoryNames.includes(t)?t:n.initialCategory,activeId:r},m=document.createElement("div");m.className="gui-description";const b=o=>Object.fromEntries(n.categories[o].map(a=>[a.name,a.id])),x=async(o,a)=>{f.category=a,f.activeId=o.id,m.textContent=n.descriptions[a],L.options(b(a)),L.updateDisplay(),s(a),i==null||i(o,a),await l(o,a)};(d=h.add(f,"category",n.categoryNames).name("Type").onChange(async o=>{const a=n.categories[o];a.length>0&&await x(a[0],o)}).domElement.parentElement)==null||d.appendChild(m),m.textContent=n.descriptions[f.category];const L=h.add(f,"activeId",b(f.category)).name("Select Card").onChange(async o=>{const a=e.find(v=>v.id===o);a&&await x(a,f.category)}),y=n.categories[f.category].find(o=>o.id===r)??n.categories[f.category][0];y&&(f.activeId=y.id,x(y,f.category))}const Rn="secret-rare-gold",Bn="swsh12pt5-160";function Le(n){return n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function Un(n,e){return n.categoryNames.find(t=>t===e)??n.categoryNames.find(t=>Le(t)===e)}function Pn(n,e){const t=new URLSearchParams(window.location.search),r=t.get("type")??Rn,l=Un(n,r)??n.initialCategory,i=n.categories[l],c=t.get("card")??Bn,h=i.find(g=>g.id===c)??i[0]??e[0];return{category:l,card:h}}function An(n,e){const t=new URL(window.location.href);t.searchParams.set("type",Le(n)),t.searchParams.set("card",e.id),history.replaceState({},"",t)}const _n=`struct Uniforms {
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
    shinyKind: f32,
    hasMask: f32,
    _pad0: f32,
    _pad1: f32,
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

fn linearStep(edge0: f32, edge1: f32, x: f32) -> f32 {
    return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

fn pointerFromCenter() -> f32 {
    return clamp(length(uniforms.pointer - vec2f(0.5)) / 0.5, 0.0, 1.0);
}

fn backgroundSampleUv(uv: vec2f, size: vec2f, pos: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - size) * pos;
    return (uv - origin) / size;
}

// CSS linear-gradient projection: angle in degrees (0 = to top, clockwise),
// box is the background layer's dimensions (only the aspect matters).
fn cssLinearGradientT(layerUv: vec2f, angleDeg: f32, box: vec2f) -> f32 {
    let a = radians(angleDeg);
    let dir = vec2f(sin(a), -cos(a));
    let p = (layerUv - vec2f(0.5)) * box;
    let lineLength = abs(dir.x) * box.x + abs(dir.y) * box.y;
    return dot(p, dir) / lineLength + 0.5;
}

fn multiplyBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base * blend;
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
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(1.0));
}

fn colorBurnBlend(base: vec3f, blend: vec3f) -> vec3f {
    let burned = 1.0 - min((vec3f(1.0) - base) / max(blend, vec3f(0.0001)), vec3f(1.0));
    return select(burned, vec3f(0.0), blend <= vec3f(0.0));
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

// CSS background-blend-mode compositing: the blend result only applies where
// the backdrop has coverage; over transparent backdrop the source paints as-is.
// mode: 0 multiply, 1 color-burn, 2 lighten
fn compositeBackgroundLayer(bottom: vec4f, top: vec4f, mode: i32) -> vec4f {
    var blended: vec3f;
    if (mode == 0) {
        blended = multiplyBlend(bottom.rgb, top.rgb);
    } else if (mode == 1) {
        blended = colorBurnBlend(bottom.rgb, top.rgb);
    } else {
        blended = lightenBlend(bottom.rgb, top.rgb);
    }
    let co = top.a * (1.0 - bottom.a) * top.rgb
        + top.a * bottom.a * blended
        + (1.0 - top.a) * bottom.a * bottom.rgb;
    let ao = top.a + bottom.a * (1.0 - top.a);
    return vec4f(co / max(ao, 0.00001), ao);
}

// repeating-linear-gradient(82deg, 12 stops at 4% spacing): a rainbow that
// runs up and mirrors back down. Tile spans 4%..48% (period 44%, 11 intervals).
fn rainbowColor(index: i32) -> vec3f {
    switch (((index % 11) + 11) % 11) {
        case 0: { return vec3f(0.860, 0.799, 0.340); }
        case 1: { return vec3f(0.472, 0.780, 0.220); }
        case 2: { return vec3f(0.225, 0.755, 0.719); }
        case 3: { return vec3f(0.284, 0.391, 0.816); }
        case 4: { return vec3f(0.667, 0.280, 0.820); }
        case 5: { return vec3f(0.799, 0.221, 0.549); }
        case 6: { return vec3f(0.799, 0.221, 0.549); }
        case 7: { return vec3f(0.667, 0.280, 0.820); }
        case 8: { return vec3f(0.284, 0.391, 0.816); }
        case 9: { return vec3f(0.225, 0.755, 0.719); }
        default: { return vec3f(0.472, 0.780, 0.220); }
    }
}

// The 12th stop wraps back to the 1st color, so interval 10 ends on stop 0.
fn rainbow82(uv: vec2f, pos: vec2f, cardBox: vec2f) -> vec3f {
    let layerUv = backgroundSampleUv(uv, vec2f(4.0, 9.0), pos);
    let tRaw = cssLinearGradientT(layerUv, 82.0, cardBox * vec2f(4.0, 9.0));
    let phase = fract((tRaw - 0.04) / 0.44) * 11.0;
    let idx = i32(floor(phase));
    let f = phase - floor(phase);
    let c0 = rainbowColor(idx);
    let c1 = select(rainbowColor(idx + 1), vec3f(0.860, 0.799, 0.340), idx == 10);
    return mix(c0, c1, f);
}

// The galaxy textures tile with a per-card pixel offset (--cosmosbg).
fn cosmosUv(uv: vec2f) -> vec2f {
    let offset = vec2f(uniforms.cosmosOffsetX, uniforms.cosmosOffsetY) / vec2f(734.0, 1024.0);
    return fract(uv - offset);
}

// Element bottom layer: radial with per-stop alpha (0.5 / 0.3 / 1.0).
fn shineRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.780, 1.000, 1.000, 0.5);
    let mid = vec4f(0.510, 0.630, 0.630, 0.3);
    let dark = vec4f(0.0, 0.0, 0.0, 1.0);
    if (t < 0.40) {
        return mix(light, mid, linearStep(0.05, 0.40, t));
    }
    return mix(mid, dark, linearStep(0.40, 1.30, t));
}

// Artwork clip: 0 = basic (--clip), 1 = stage (--clip-stage approximated as
// its bounding inset), 2 = trainer (--clip-trainer).
fn artworkClip(uv: vec2f) -> f32 {
    if (uniforms.clipMode < 0.5) {
        return select(0.0, 1.0, uv.x >= 0.08 && uv.x <= 0.92 && uv.y >= 0.0985 && uv.y <= 0.4715);
    }
    if (uniforms.clipMode < 1.5) {
        let base = uv.x >= 0.08 && uv.x <= 0.92 && uv.y >= 0.16 && uv.y <= 0.4715;
        let topLeft = uv.x >= 0.12 && uv.x < 0.17 && uv.y >= mix(0.16, 0.12, linearStep(0.12, 0.17, uv.x)) && uv.y <= 0.4715;
        let topMid = uv.x >= 0.17 && uv.x < 0.54 && uv.y >= 0.12 && uv.y <= 0.4715;
        let topRight = uv.x >= 0.54 && uv.x < 0.57 && uv.y >= mix(0.12, 0.0985, linearStep(0.54, 0.57, uv.x)) && uv.y <= 0.4715;
        let right = uv.x >= 0.57 && uv.x <= 0.915 && uv.y >= 0.0985 && uv.y <= 0.4715;
        return select(0.0, 1.0, base || topLeft || topMid || topRight || right);
    }
    return select(0.0, 1.0, uv.x >= 0.085 && uv.x <= 0.915 && uv.y >= 0.145 && uv.y <= 0.518);
}

// Combined shine content of the element and its pseudo-layers, before the
// parent filter. Each pseudo has its own filter, then blends into the group.
fn combinedShine(uv: vec2f, cardBox: vec2f) -> vec3f {
    let galaxyUv = cosmosUv(uv);
    let pfl = clamp(uniforms.pointer.x, 0.0, 1.0);
    let pft = clamp(uniforms.pointer.y, 0.0, 1.0);

    // Element: cosmos-bottom (color-burn) over rainbow (multiply) over radial.
    let bottomTex = textureSampleLevel(cosmosBottomTexture, linearSampler, galaxyUv, 0.0);
    var layer = shineRadial(uv);
    let rainbowA = rainbow82(uv, vec2f(0.10 + pfl * 0.80, 0.10 + pft * 0.80), cardBox);
    layer = compositeBackgroundLayer(layer, vec4f(rainbowA, 1.0), 0);
    layer = compositeBackgroundLayer(layer, bottomTex, 1);

    // :before — cosmos-middle (lighten) over rainbow, overlay into the group.
    let middleTex = textureSampleLevel(cosmosMiddleTexture, linearSampler, galaxyUv, 0.0);
    let rainbowB = rainbow82(uv, vec2f(0.15 + pfl * 0.70, 0.15 + pft * 0.70), cardBox);
    var before = compositeBackgroundLayer(vec4f(rainbowB, 1.0), middleTex, 2);
    let beforeFiltered = applyFilter(before.rgb, 1.25, 1.75, 0.8);
    var group = overlayBlend(layer.rgb, beforeFiltered);

    // :after — cosmos-top (multiply) over rainbow, multiply into the group.
    let topTex = textureSampleLevel(cosmosTopTexture, linearSampler, galaxyUv, 0.0);
    let rainbowC = rainbow82(uv, vec2f(0.20 + pfl * 0.60, 0.20 + pft * 0.60), cardBox);
    var after = compositeBackgroundLayer(vec4f(rainbowC, 1.0), topTex, 0);
    let afterFiltered = applyFilter(after.rgb, 1.25, 1.75, 0.8);
    group = multiplyBlend(group, afterFiltered);

    // Parent filter: brightness(1) contrast(1) saturate(0.8).
    return applyFilter(group, 1.0, 1.0, 0.8);
}

// Glare element: radial with per-stop alpha (0.8 -> 1.0), overlay blend.
fn glareRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.900, 0.960, 1.000, 0.8);
    let dark = vec4f(0.180, 0.170, 0.230, 1.0);
    return mix(light, dark, linearStep(0.05, 1.50, t));
}

// Glare :after: soft-light radial, opacity 1 - pointer-from-top * 0.75.
fn glareAfterRadial(uv: vec2f) -> vec3f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec3f(0.973, 0.920, 1.000);
    let dark = vec3f(0.10, 0.10, 0.10);
    return mix(light, dark, linearStep(0.05, 0.60, t));
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
    let foilMask = select(1.0, maskColor.a, uniforms.hasMask > 0.5);
    let clipMask = artworkClip(cardUV);
    let pfc = pointerFromCenter();
    let cardBox = vec2f(0.718, 1.0);

    var cardRgb = textureColor.rgb;

    let shine = combinedShine(cardUV, cardBox);
    cardRgb = mix(
        cardRgb,
        colorDodgeBlend(cardRgb, shine),
        clipMask * foilMask * uniforms.opacity * cardMask
    );

    // Glare group: :after soft-lights over the glare radial, parent filter on
    // the composite, overlay onto the card at (0.25 + pfc) * card-opacity.
    let glareBg = glareRadial(cardUV);
    let glareAfter = applyFilter(glareAfterRadial(cardUV), 0.75, 2.5, 2.0);
    var afterOpacity = 1.0 - clamp(uniforms.pointer.y, 0.0, 1.0) * 0.75;
    // Stage/supporter cards clip the glare :after to the artwork.
    if (uniforms.clipMode > 0.5) {
        afterOpacity *= clipMask;
    }
    let glareRgb = applyFilter(
        mix(glareBg.rgb, softLightBlend(glareBg.rgb, glareAfter), afterOpacity),
        0.75, 2.0, 2.0
    );
    let glareAlpha = afterOpacity + glareBg.a * (1.0 - afterOpacity);
    cardRgb = mix(
        cardRgb,
        overlayBlend(cardRgb, glareRgb),
        glareAlpha * clamp(0.25 + pfc, 0.0, 1.0) * uniforms.opacity * cardMask
    );

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);
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
    patternScaleX: f32,
    patternScaleY: f32,
    cosmosOffsetX: f32,
    cosmosOffsetY: f32,
    clipMode: f32,
    shinyKind: f32,
    hasMask: f32,
    _pad0: f32,
    _pad1: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
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

fn linearStep(edge0: f32, edge1: f32, x: f32) -> f32 {
    return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

fn cssBackgroundPosition() -> vec2f {
    return vec2f(
        mix(0.37, 0.63, uniforms.pointer.x),
        mix(0.33, 0.67, uniforms.pointer.y)
    );
}

fn backgroundSampleUv(uv: vec2f, size: vec2f, pos: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - size) * pos;
    return (uv - origin) / size;
}

// CSS linear-gradient projection: angle in degrees (0 = to top, clockwise),
// box is the background layer's dimensions (only the aspect matters).
fn cssLinearGradientT(layerUv: vec2f, angleDeg: f32, box: vec2f) -> f32 {
    let a = radians(angleDeg);
    let dir = vec2f(sin(a), -cos(a));
    let p = (layerUv - vec2f(0.5)) * box;
    let lineLength = abs(dir.x) * box.x + abs(dir.y) * box.y;
    return dot(p, dir) / lineLength + 0.5;
}

fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), blend)
    );
}

fn screenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return 1.0 - (1.0 - base) * (1.0 - blend);
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(1.0));
}

fn luminosityBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseLum = dot(base, vec3f(0.299, 0.587, 0.114));
    let blendLum = dot(blend, vec3f(0.299, 0.587, 0.114));
    return clamp(base + (blendLum - baseLum), vec3f(0.0), vec3f(1.0));
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

// --violet, --blue, --green, --yellow, --red from base.css.
fn holoRainbowColor(index: i32) -> vec3f {
    switch (((index % 5) + 5) % 5) {
        case 0: { return vec3f(0.788, 0.161, 0.945); }
        case 1: { return vec3f(0.051, 0.741, 0.914); }
        case 2: { return vec3f(0.129, 0.914, 0.522); }
        case 3: { return vec3f(0.933, 0.875, 0.063); }
        default: { return vec3f(0.973, 0.055, 0.208); }
    }
}

// 110deg gradient with 15 evenly-spaced stops (5 colors x 3): 14 intervals.
fn holoRainbow(uv: vec2f, cardBox: vec2f) -> vec3f {
    let bg = cssBackgroundPosition();
    let pos = vec2f((0.5 - bg.x) * 2.6 + 0.5, (0.5 - bg.y) * 3.5 + 0.5);
    let layerUv = backgroundSampleUv(uv, vec2f(4.0, 4.0), pos);
    let t = clamp(cssLinearGradientT(layerUv, 110.0, cardBox * 4.0), 0.0, 1.0) * 14.0;
    let idx = i32(floor(min(t, 13.0)));
    let f = t - floor(t);
    return mix(holoRainbowColor(idx), holoRainbowColor(idx + 1), f);
}

// Vertical scanlines: 90deg repeating gradient, 2px dark / 2px light (#666),
// measured in CSS layout pixels.
fn scanlines(uv: vec2f) -> vec3f {
    let cardSize = getCardSize();
    let cardWidthPx = max(cardSize.x * uniforms.resolution.y / uniforms.dpr, 1.0);
    let px = uv.x * cardWidthPx;
    return select(vec3f(0.4), vec3f(0.0), fract(px / 4.0) < 0.5);
}

// :before bar gradient: black background with two gray beams per tile.
// Stops at 6% / 9% / 10.5% / 12% / 15% of the gradient line, tile ends at
// tileEnd (42% for the first layer, 30% for the second).
fn barGradient(x: f32, tileEnd: f32) -> vec3f {
    let barColor = vec3f(0.7);
    let barBg = vec3f(0.0);
    let period = tileEnd - 0.06;
    let p = fract((x - 0.06) / period) * period;
    if (p < 0.03) { return mix(barBg, barColor, linearStep(0.0, 0.03, p)); }
    if (p < 0.045) { return mix(barColor, barBg, linearStep(0.03, 0.045, p)); }
    if (p < 0.06) { return mix(barBg, barColor, linearStep(0.045, 0.06, p)); }
    if (p < 0.09) { return mix(barColor, barBg, linearStep(0.06, 0.09, p)); }
    return barBg;
}

// :before — two 90deg beam layers, screen-blended, then hard-light.
fn beamLayer(uv: vec2f) -> vec3f {
    let bg = cssBackgroundPosition();
    let pos1 = vec2f((0.5 - bg.x) * 1.65 + 0.5 + bg.y * 0.5, bg.x);
    let pos2 = vec2f((0.5 - bg.x) * -0.9 + 0.5 - bg.y * 0.75, bg.y);
    let x1 = backgroundSampleUv(uv, vec2f(2.0, 2.0), pos1).x;
    let x2 = backgroundSampleUv(uv, vec2f(2.0, 2.0), pos2).x;
    let layer = screenBlend(barGradient(x2, 0.30), barGradient(x1, 0.42));
    return applyFilter(layer, 1.15, 1.1, 1.0);
}

// :after — luminosity radial with per-stop alpha (0.8 / 0.1 / 1.0).
fn luminosityRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.90, 0.90, 0.90, 0.8);
    let mid = vec4f(0.78, 0.78, 0.78, 0.1);
    let dark = vec4f(0.0, 0.0, 0.0, 1.0);
    if (t < 0.25) {
        return mix(light, mid, linearStep(0.0, 0.25, t));
    }
    return mix(mid, dark, linearStep(0.25, 0.90, t));
}

// Artwork clip: 0 = basic (--clip), 1 = stage, 2 = trainer/item/supporter.
fn artworkClip(uv: vec2f) -> f32 {
    if (uniforms.clipMode < 0.5) {
        return select(0.0, 1.0, uv.x >= 0.08 && uv.x <= 0.92 && uv.y >= 0.0985 && uv.y <= 0.4715);
    }
    if (uniforms.clipMode < 1.5) {
        let base = uv.x >= 0.08 && uv.x <= 0.92 && uv.y >= 0.16 && uv.y <= 0.4715;
        let topLeft = uv.x >= 0.12 && uv.x < 0.17 && uv.y >= mix(0.16, 0.12, linearStep(0.12, 0.17, uv.x)) && uv.y <= 0.4715;
        let topMid = uv.x >= 0.17 && uv.x < 0.54 && uv.y >= 0.12 && uv.y <= 0.4715;
        let topRight = uv.x >= 0.54 && uv.x < 0.57 && uv.y >= mix(0.12, 0.0985, linearStep(0.54, 0.57, uv.x)) && uv.y <= 0.4715;
        let right = uv.x >= 0.57 && uv.x <= 0.915 && uv.y >= 0.0985 && uv.y <= 0.4715;
        return select(0.0, 1.0, base || topLeft || topMid || topRight || right);
    }
    return select(0.0, 1.0, uv.x >= 0.085 && uv.x <= 0.915 && uv.y >= 0.145 && uv.y <= 0.518);
}

// Base .card__glare radial: white(0.8) 10%, white(0.65) 20%, black(0.5) 90%.
fn glareRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    if (t < 0.10) {
        return vec4f(1.0, 1.0, 1.0, 0.8);
    }
    if (t < 0.20) {
        return vec4f(1.0, 1.0, 1.0, mix(0.8, 0.65, linearStep(0.10, 0.20, t)));
    }
    let f = linearStep(0.20, 0.90, t);
    return vec4f(vec3f(1.0 - f), mix(0.65, 0.5, f));
}

// Glare :after radial: cyan-white 5%, gray(0.25) 55%, black(0.36) 110%.
fn glareAfterRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.90, 1.00, 1.00, 1.0);
    let mid = vec4f(0.39, 0.39, 0.39, 0.25);
    let dark = vec4f(0.0, 0.0, 0.0, 0.36);
    if (t < 0.55) {
        return mix(light, mid, linearStep(0.05, 0.55, t));
    }
    return mix(mid, dark, linearStep(0.55, 1.10, t));
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
    let foilMask = select(1.0, maskColor.a, uniforms.hasMask > 0.5);
    let clipMask = artworkClip(cardUV);
    let cardBox = vec2f(0.718, 1.0);

    // Shine group: rainbow (overlay) over scanlines, beams hard-light,
    // luminosity radial, then the parent filter over the composite.
    var group = overlayBlend(scanlines(cardUV), holoRainbow(cardUV, cardBox));
    group = hardLightBlend(group, beamLayer(cardUV));
    let lumRadial = luminosityRadial(cardUV);
    let lumFiltered = applyFilter(lumRadial.rgb, 0.6, 4.0, 1.0);
    group = mix(group, luminosityBlend(group, lumFiltered), lumRadial.a);
    group = applyFilter(group, 1.1, 1.1, 1.2);

    var cardRgb = textureColor.rgb;
    cardRgb = mix(
        cardRgb,
        colorDodgeBlend(cardRgb, group),
        clipMask * foilMask * uniforms.opacity * cardMask
    );

    // Glare group: :after overlays onto the base glare radial, parent filter
    // brightness(0.8) contrast(1.5), overlay onto the card at 0.8 opacity.
    let glareBg = glareRadial(cardUV);
    var glareAfter = glareAfterRadial(cardUV);
    var afterAlpha = glareAfter.a;
    // Stage/trainer cards clip the glare :after to the artwork.
    if (uniforms.clipMode > 0.5) {
        afterAlpha *= clipMask;
    }
    let glareAfterFiltered = applyFilter(glareAfter.rgb, 0.6, 3.0, 1.0);
    let glareRgb = applyFilter(
        mix(glareBg.rgb, overlayBlend(glareBg.rgb, glareAfterFiltered), afterAlpha),
        0.8, 1.5, 1.0
    );
    let glareAlpha = afterAlpha + glareBg.a * (1.0 - afterAlpha);
    cardRgb = mix(
        cardRgb,
        overlayBlend(cardRgb, glareRgb),
        glareAlpha * 0.8 * uniforms.opacity * cardMask
    );

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);
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
`,Mn=`struct Uniforms {
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
    cosmosOffsetX: f32,
    cosmosOffsetY: f32,
    clipMode: f32,
    shinyKind: f32,
    hasMask: f32,
    _pad0: f32,
    _pad1: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;
@group(0) @binding(5) var illusionTexture: texture_2d<f32>;

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

fn pointerFromCenter() -> f32 {
    return clamp(length(uniforms.pointer - vec2f(0.5)) / 0.5, 0.0, 1.0);
}

fn cssBackgroundPosition() -> vec2f {
    return vec2f(
        mix(0.37, 0.63, uniforms.pointer.x),
        mix(0.33, 0.67, uniforms.pointer.y)
    );
}

fn backgroundSampleUv(uv: vec2f, size: vec2f, pos: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - size) * pos;
    return (uv - origin) / size;
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

fn exclusionBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base + blend - 2.0 * base * blend;
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
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
    return vec3f(h / 6.0, s, l);
}

fn hue2rgb(p: f32, q: f32, t: f32) -> f32 {
    var tt = t;
    if (tt < 0.0) { tt += 1.0; }
    if (tt > 1.0) { tt -= 1.0; }
    if (tt < 1.0 / 6.0) { return p + (q - p) * 6.0 * tt; }
    if (tt < 1.0 / 2.0) { return q; }
    if (tt < 2.0 / 3.0) { return p + (q - p) * (2.0 / 3.0 - tt) * 6.0; }
    return p;
}

fn hsl2rgb(hsl: vec3f) -> vec3f {
    if (hsl.y == 0.0) {
        return vec3f(hsl.z);
    }
    let q = select(hsl.z + hsl.y - hsl.z * hsl.y, hsl.z * (1.0 + hsl.y), hsl.z < 0.5);
    let p = 2.0 * hsl.z - q;
    return vec3f(
        hue2rgb(p, q, hsl.x + 1.0 / 3.0),
        hue2rgb(p, q, hsl.x),
        hue2rgb(p, q, hsl.x - 1.0 / 3.0)
    );
}

fn hueBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseHsl = rgb2hsl(base);
    let blendHsl = rgb2hsl(blend);
    return hsl2rgb(vec3f(blendHsl.x, baseHsl.y, baseHsl.z));
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

const SUNPILLAR_1: vec3f = vec3f(0.973, 0.459, 0.459);
const SUNPILLAR_2: vec3f = vec3f(0.969, 0.878, 0.376);
const SUNPILLAR_3: vec3f = vec3f(0.608, 0.969, 0.376);
const SUNPILLAR_4: vec3f = vec3f(0.518, 1.0, 0.835);
const SUNPILLAR_5: vec3f = vec3f(0.478, 0.569, 0.969);
const SUNPILLAR_6: vec3f = vec3f(0.780, 0.459, 0.973);

fn sunpillarColor(index: i32, afterLayer: bool) -> vec3f {
    let wrapped = ((index % 6) + 6) % 6;
    let shifted = select(wrapped, (wrapped + 5) % 6, afterLayer);
    switch shifted {
        case 0: { return SUNPILLAR_1; }
        case 1: { return SUNPILLAR_2; }
        case 2: { return SUNPILLAR_3; }
        case 3: { return SUNPILLAR_4; }
        case 4: { return SUNPILLAR_5; }
        default: { return SUNPILLAR_6; }
    }
}

fn verticalSunpillar(layerUv: vec2f, afterLayer: bool) -> vec3f {
    let t = fract((1.0 - layerUv.y) / 0.35) * 7.0;
    let idx = i32(floor(t));
    let f = fract(t);
    return mix(sunpillarColor(idx, afterLayer), sunpillarColor(idx + 1, afterLayer), f);
}

fn diagonalStripePhase(layerUv: vec2f) -> f32 {
    let angle = radians(115.0);
    let dir = vec2f(sin(angle), -cos(angle));
    return fract(dot(layerUv, dir) / 0.12);
}

fn diagonalStripeColor(layerUv: vec2f) -> vec3f {
    let cycle = diagonalStripePhase(layerUv);
    let dark = vec3f(0.055, 0.082, 0.18);
    let gray = vec3f(0.557, 0.612, 0.612);
    let cyan = vec3f(0.525, 0.725, 0.725);
    if (cycle < 0.317) { return mix(dark, gray, cycle / 0.317); }
    if (cycle < 0.375) { return mix(gray, cyan, (cycle - 0.317) / 0.058); }
    if (cycle < 0.433) { return mix(cyan, gray, (cycle - 0.375) / 0.058); }
    if (cycle < 0.833) { return mix(gray, dark, (cycle - 0.433) / 0.4); }
    return dark;
}

fn shineRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    var alpha: f32;
    if (t < 0.12) {
        alpha = 0.1;
    } else if (t < 0.20) {
        alpha = mix(0.1, 0.15, linearStep(0.12, 0.20, t));
    } else {
        alpha = mix(0.15, 0.25, linearStep(0.20, 1.20, t));
    }
    return vec4f(0.0, 0.0, 0.0, alpha);
}

fn glareGradient(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let white = vec4f(1.0, 1.0, 1.0, 1.0);
    let grayish = vec4f(0.533, 0.541, 0.549, 0.33);
    let dark = vec4f(0.2, 0.2, 0.2, 0.9);
    if (t < 0.45) {
        return mix(white, grayish, linearStep(0.0, 0.45, t));
    }
    return mix(grayish, dark, linearStep(0.45, 1.30, t));
}

// CSS background-blend-mode compositing: the blend result only applies where
// the backdrop has coverage; over transparent backdrop the source paints as-is.
fn compositeBackgroundLayer(bottom: vec4f, top: vec4f, mode: i32) -> vec4f {
    var blended: vec3f;
    if (mode == 0) {
        blended = softLightBlend(bottom.rgb, top.rgb);
    } else if (mode == 1) {
        blended = hueBlend(bottom.rgb, top.rgb);
    } else if (mode == 2) {
        blended = hardLightBlend(bottom.rgb, top.rgb);
    } else {
        blended = exclusionBlend(bottom.rgb, top.rgb);
    }
    let co = top.a * (1.0 - bottom.a) * top.rgb
        + top.a * bottom.a * blended
        + (1.0 - top.a) * bottom.a * bottom.rgb;
    let ao = top.a + bottom.a * (1.0 - top.a);
    return vec4f(co / max(ao, 0.00001), ao);
}

fn sampleFoilOrIllusion(uv: vec2f) -> vec4f {
    if (uniforms.hasMask > 0.5) {
        return textureSampleLevel(foilTexture, linearSampler, uv, 0.0);
    }
    return textureSampleLevel(illusionTexture, linearSampler, fract(uv / 0.33), 0.0);
}

// Raw (unfiltered) shine background stack:
// foil (soft-light) over sunpillar (hue) over diagonal stripe (hard-light)
// over a pointer-following radial. Filters are applied by the caller, because
// in CSS the :after layer is filtered first, blended (exclusion) into the
// shine element, and the element's own filter applies to that composite.
fn shineLayer(uv: vec2f, afterLayer: bool) -> vec3f {
    let bg = cssBackgroundPosition();
    let noMask = uniforms.hasMask < 0.5;
    let diagonalPos = vec2f(bg.x + bg.y * 0.2, bg.y);
    let layerDiagonalPos = select(diagonalPos, -diagonalPos, afterLayer);
    let sunSize = select(vec2f(2.0, 7.0), vec2f(2.0, 4.0), afterLayer);
    let diagonalSize = select(vec2f(3.0, 1.0), vec2f(1.95, 1.0), afterLayer);

    var layer = shineRadial(backgroundSampleUv(uv, vec2f(2.0, 1.0), bg));
    let diagonal = vec4f(diagonalStripeColor(backgroundSampleUv(uv, diagonalSize, layerDiagonalPos)), 1.0);
    let sun = vec4f(verticalSunpillar(backgroundSampleUv(uv, sunSize, vec2f(0.0, bg.y)), afterLayer), 1.0);
    let foil = sampleFoilOrIllusion(uv);

    layer = compositeBackgroundLayer(layer, diagonal, 2);
    layer = compositeBackgroundLayer(layer, sun, 1);
    layer = compositeBackgroundLayer(layer, foil, select(0, 3, noMask));

    return layer.rgb;
}

fn combinedShine(uv: vec2f) -> vec3f {
    let noMask = uniforms.hasMask < 0.5;
    let pfc = pointerFromCenter();
    let front = shineLayer(uv, false);
    let after = shineLayer(uv, true);

    if (noMask) {
        let afterFiltered = applyFilter(after, pfc * 0.5 + 0.8, 1.6, 1.4);
        let combined = exclusionBlend(front, afterFiltered);
        return applyFilter(combined, pfc * 0.3 + 0.35, 2.0, 1.5);
    }
    let afterFiltered = applyFilter(after, pfc * 0.4 + 0.8, 1.5, 1.25);
    let combined = exclusionBlend(front, afterFiltered);
    return applyFilter(combined, pfc * 0.4 + 0.4, 1.4, 2.25);
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
    let foilMask = select(1.0, maskColor.a, uniforms.hasMask > 0.5);
    let shineMask = foilMask * cardMask;

    var cardRgb = textureColor.rgb;

    let shine = combinedShine(cardUV);
    cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, shine), shineMask * uniforms.opacity);

    let glare = glareGradient(cardUV);
    let glareFiltered = applyFilter(glare.rgb, 0.9, 1.75, 1.0);
    cardRgb = mix(
        cardRgb,
        hardLightBlend(cardRgb, glareFiltered),
        glare.a * uniforms.opacity * 0.4 * cardMask
    );

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);
    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,In=`struct Uniforms {
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
    shinyKind: f32,
    hasMask: f32,
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

fn linearStep(edge0: f32, edge1: f32, x: f32) -> f32 {
    return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

fn pointerFromCenter() -> f32 {
    return clamp(length(uniforms.pointer - vec2f(0.5)) / 0.5, 0.0, 1.0);
}

fn cssBackgroundPosition() -> vec2f {
    return vec2f(
        mix(0.37, 0.63, uniforms.pointer.x),
        mix(0.33, 0.67, uniforms.pointer.y)
    );
}

fn backgroundSampleUv(uv: vec2f, size: vec2f, pos: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - size) * pos;
    return (uv - origin) / size;
}

fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), blend)
    );
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(1.0));
}

fn luminosityBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseLum = dot(base, vec3f(0.299, 0.587, 0.114));
    let blendLum = dot(blend, vec3f(0.299, 0.587, 0.114));
    return clamp(base + (blendLum - baseLum), vec3f(0.0), vec3f(1.0));
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

// CSS linear-gradient projection: angle in degrees (0 = to top, clockwise),
// box is the background layer's dimensions (only the aspect matters).
// Returns t in [0,1] across the gradient line for points inside the box.
fn cssLinearGradientT(layerUv: vec2f, angleDeg: f32, box: vec2f) -> f32 {
    let a = radians(angleDeg);
    let dir = vec2f(sin(a), -cos(a));
    let p = (layerUv - vec2f(0.5)) * box;
    let lineLength = abs(dir.x) * box.x + abs(dir.y) * box.y;
    return dot(p, dir) / lineLength + 0.5;
}

// linear-gradient(-30deg / -60deg, r-clr 1..7 repeated three times + r-clr-1):
// 22 stops evenly spaced, i.e. 21 intervals cycling through 7 colors.
fn rainbowColor(index: i32) -> vec3f {
    switch (((index % 7) + 7) % 7) {
        case 0: { return vec3f(0.581, 0.159, 0.159); }
        case 1: { return vec3f(0.597, 0.459, 0.183); }
        case 2: { return vec3f(0.350, 0.560, 0.140); }
        case 3: { return vec3f(0.140, 0.560, 0.560); }
        case 4: { return vec3f(0.140, 0.560, 0.560); }
        case 5: { return vec3f(0.168, 0.390, 0.612); }
        default: { return vec3f(0.367, 0.140, 0.480); }
    }
}

fn rainbowGradient(t: f32) -> vec3f {
    let tt = clamp(t, 0.0, 1.0) * 21.0;
    let idx = i32(floor(min(tt, 20.0)));
    let f = tt - floor(tt);
    return mix(rainbowColor(idx), rainbowColor(idx + 1), f);
}

// repeating-linear-gradient(133deg, 7 hsla stops at 6% spacing):
// tile spans 6%..42%, i.e. period 36% with 6 intervals.
fn hueStripeColor(index: i32) -> vec3f {
    switch (((index % 7) + 7) % 7) {
        case 0: { return vec3f(0.685, 0.404, 0.796); }
        case 1: { return vec3f(0.874, 0.306, 0.286); }
        case 2: { return vec3f(0.845, 0.771, 0.215); }
        case 3: { return vec3f(0.493, 0.789, 0.251); }
        case 4: { return vec3f(0.310, 0.690, 0.665); }
        case 5: { return vec3f(0.540, 0.632, 1.000); }
        default: { return vec3f(0.693, 0.419, 0.801); }
    }
}

fn hueStripeGradient(tRaw: f32) -> vec3f {
    let phase = fract((tRaw - 0.06) / 0.36) * 6.0;
    let idx = i32(floor(phase));
    let f = phase - floor(phase);
    return mix(hueStripeColor(idx), hueStripeColor(idx + 1), f);
}

// background-size: 25% 25% tiling with background-position: center.
fn sampleGlitter(uv: vec2f) -> vec4f {
    return textureSampleLevel(glitterTexture, linearSampler, fract((uv - vec2f(0.375)) / 0.25), 0.0);
}

// Shine element background: 0.75-alpha hue stripes (luminosity) over
// glitter (overlay) over the -30deg rainbow gradient.
fn shineBackground(uv: vec2f, cardBox: vec2f) -> vec3f {
    let bg = cssBackgroundPosition();
    let rainbowUv = backgroundSampleUv(uv, vec2f(4.0, 4.0), bg * 1.5);
    var layer = rainbowGradient(cssLinearGradientT(rainbowUv, -30.0, cardBox * 4.0));

    let glitter = sampleGlitter(uv);
    layer = mix(layer, overlayBlend(layer, glitter.rgb), glitter.a);

    let hueUv = backgroundSampleUv(uv, vec2f(2.0, 4.0), vec2f(0.0, bg.y));
    let hue = hueStripeGradient(cssLinearGradientT(hueUv, 133.0, cardBox * vec2f(2.0, 4.0)));
    return mix(layer, luminosityBlend(layer, hue), 0.75);
}

// :after layer: glitter (overlay) over the -60deg rainbow, own filter.
// mask-image is forced to none in CSS, so this covers the whole card.
fn afterLayer(uv: vec2f, cardBox: vec2f) -> vec3f {
    let bg = cssBackgroundPosition();
    let rainbowUv = backgroundSampleUv(uv, vec2f(4.0, 4.0), -bg * 1.5);
    var layer = rainbowGradient(cssLinearGradientT(rainbowUv, -60.0, cardBox * 4.0));

    let glitter = sampleGlitter(uv);
    layer = mix(layer, overlayBlend(layer, glitter.rgb), glitter.a);

    return applyFilter(layer, pointerFromCenter() * 0.5 + 0.6, 3.0, 1.0);
}

// Trainer-gallery VMAX glare: hard-light radial, opacity driven by pointer.
fn glareGradient(uv: vec2f) -> vec3f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec3f(0.930, 0.920, 0.870);
    let mid = vec3f(0.380, 0.420, 0.408);
    let dark = vec3f(0.0, 0.0, 0.0);
    if (t < 0.5) {
        return mix(light, mid, linearStep(0.0, 0.5, t));
    }
    return mix(mid, dark, linearStep(0.5, 1.2, t));
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
    let hasMask = uniforms.hasMask > 0.5;
    let foilMask = select(1.0, maskColor.a, hasMask);

    let pfc = pointerFromCenter();
    // Only the layer aspect matters for gradient geometry.
    let cardBox = vec2f(0.718, 1.0);

    var shine = shineBackground(cardUV, cardBox);

    // :before — foil texture, color-dodge, confined to the mask.
    if (hasMask) {
        let foil = textureSampleLevel(foilTexture, linearSampler, cardUV, 0.0);
        let foilFiltered = applyFilter(foil.rgb, 1.5, 1.5, 1.0);
        let beforeOpacity = (pfc + 0.6) * 0.4;
        shine = mix(shine, colorDodgeBlend(shine, foilFiltered), beforeOpacity * foilMask);
    }

    let after = afterLayer(cardUV, cardBox);
    let afterOpacity = clamp(1.2 - pfc * 0.5, 0.0, 1.0);

    // Inside the mask: full stack (background + before + after), parent filter on top.
    let shineIn = applyFilter(
        mix(shine, colorDodgeBlend(shine, after), afterOpacity),
        pfc * 0.3 + 0.3, 3.0, 1.8
    );
    // Outside the mask: only the unmasked :after paints.
    let shineOut = applyFilter(after, pfc * 0.3 + 0.3, 3.0, 1.8);

    var cardRgb = textureColor.rgb;
    cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, shineIn), foilMask * uniforms.opacity * cardMask);
    cardRgb = mix(
        cardRgb,
        colorDodgeBlend(cardRgb, shineOut),
        (1.0 - foilMask) * afterOpacity * uniforms.opacity * cardMask
    );

    let glare = glareGradient(cardUV);
    cardRgb = mix(
        cardRgb,
        hardLightBlend(cardRgb, glare),
        pfc * 0.85 * uniforms.opacity * cardMask
    );

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);
    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,qn=`struct Uniforms {
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
    shinyKind: f32,
    hasMask: f32,
    _pad0: f32,
    _pad1: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;
@group(0) @binding(5) var trainerBgTexture: texture_2d<f32>;

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

fn pointerFromCenter() -> f32 {
    return clamp(length(uniforms.pointer - vec2f(0.5)) / 0.5, 0.0, 1.0);
}

fn cssBackgroundPosition() -> vec2f {
    return vec2f(
        mix(0.37, 0.63, uniforms.pointer.x),
        mix(0.33, 0.67, uniforms.pointer.y)
    );
}

fn backgroundSampleUv(uv: vec2f, size: vec2f, pos: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - size) * pos;
    return (uv - origin) / size;
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

fn exclusionBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base + blend - 2.0 * base * blend;
}

fn multiplyBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base * blend;
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(1.0));
}

fn colorBurnBlend(base: vec3f, blend: vec3f) -> vec3f {
    let burned = 1.0 - min((vec3f(1.0) - base) / max(blend, vec3f(0.0001)), vec3f(1.0));
    return select(burned, vec3f(0.0), blend <= vec3f(0.0));
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
    return vec3f(h / 6.0, s, l);
}

fn hue2rgb(p: f32, q: f32, t: f32) -> f32 {
    var tt = t;
    if (tt < 0.0) { tt += 1.0; }
    if (tt > 1.0) { tt -= 1.0; }
    if (tt < 1.0 / 6.0) { return p + (q - p) * 6.0 * tt; }
    if (tt < 1.0 / 2.0) { return q; }
    if (tt < 2.0 / 3.0) { return p + (q - p) * (2.0 / 3.0 - tt) * 6.0; }
    return p;
}

fn hsl2rgb(hsl: vec3f) -> vec3f {
    if (hsl.y == 0.0) {
        return vec3f(hsl.z);
    }
    let q = select(hsl.z + hsl.y - hsl.z * hsl.y, hsl.z * (1.0 + hsl.y), hsl.z < 0.5);
    let p = 2.0 * hsl.z - q;
    return vec3f(
        hue2rgb(p, q, hsl.x + 1.0 / 3.0),
        hue2rgb(p, q, hsl.x),
        hue2rgb(p, q, hsl.x - 1.0 / 3.0)
    );
}

fn hueBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseHsl = rgb2hsl(base);
    let blendHsl = rgb2hsl(blend);
    return hsl2rgb(vec3f(blendHsl.x, baseHsl.y, baseHsl.z));
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

const SUNPILLAR_1: vec3f = vec3f(0.973, 0.459, 0.459);
const SUNPILLAR_2: vec3f = vec3f(0.969, 0.878, 0.376);
const SUNPILLAR_3: vec3f = vec3f(0.608, 0.969, 0.376);
const SUNPILLAR_4: vec3f = vec3f(0.518, 1.0, 0.835);
const SUNPILLAR_5: vec3f = vec3f(0.478, 0.569, 0.969);
const SUNPILLAR_6: vec3f = vec3f(0.780, 0.459, 0.973);

fn sunpillarColor(index: i32, afterLayer: bool) -> vec3f {
    let wrapped = ((index % 6) + 6) % 6;
    let shifted = select(wrapped, (wrapped + 5) % 6, afterLayer);
    switch shifted {
        case 0: { return SUNPILLAR_1; }
        case 1: { return SUNPILLAR_2; }
        case 2: { return SUNPILLAR_3; }
        case 3: { return SUNPILLAR_4; }
        case 4: { return SUNPILLAR_5; }
        default: { return SUNPILLAR_6; }
    }
}

fn verticalSunpillar(layerUv: vec2f, afterLayer: bool) -> vec3f {
    let t = fract((1.0 - layerUv.y) / 0.35) * 7.0;
    let idx = i32(floor(t));
    let f = fract(t);
    return mix(sunpillarColor(idx, afterLayer), sunpillarColor(idx + 1, afterLayer), f);
}

fn diagonalStripePhase(layerUv: vec2f) -> f32 {
    let angle = radians(115.0);
    let dir = vec2f(sin(angle), -cos(angle));
    return fract(dot(layerUv, dir) / 0.12);
}

fn diagonalStripeColor(layerUv: vec2f) -> vec3f {
    let cycle = diagonalStripePhase(layerUv);
    let dark = vec3f(0.055, 0.082, 0.18);
    let gray = vec3f(0.557, 0.612, 0.612);
    let cyan = vec3f(0.525, 0.725, 0.725);
    if (cycle < 0.317) { return mix(dark, gray, cycle / 0.317); }
    if (cycle < 0.375) { return mix(gray, cyan, (cycle - 0.317) / 0.058); }
    if (cycle < 0.433) { return mix(cyan, gray, (cycle - 0.375) / 0.058); }
    if (cycle < 0.833) { return mix(gray, dark, (cycle - 0.433) / 0.4); }
    return dark;
}

fn shineRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    var alpha: f32;
    if (t < 0.12) {
        alpha = 0.1;
    } else if (t < 0.20) {
        alpha = mix(0.1, 0.15, linearStep(0.12, 0.20, t));
    } else {
        alpha = mix(0.15, 0.25, linearStep(0.20, 1.20, t));
    }
    return vec4f(0.0, 0.0, 0.0, alpha);
}

// CSS background-blend-mode compositing: the blend result only applies where
// the backdrop has coverage; over transparent backdrop the source paints as-is.
fn compositeBackgroundLayer(bottom: vec4f, top: vec4f, mode: i32) -> vec4f {
    var blended: vec3f;
    if (mode == 0) {
        blended = softLightBlend(bottom.rgb, top.rgb);
    } else if (mode == 1) {
        blended = hueBlend(bottom.rgb, top.rgb);
    } else if (mode == 2) {
        blended = hardLightBlend(bottom.rgb, top.rgb);
    } else {
        blended = colorBurnBlend(bottom.rgb, top.rgb);
    }
    let co = top.a * (1.0 - bottom.a) * top.rgb
        + top.a * bottom.a * blended
        + (1.0 - top.a) * bottom.a * bottom.rgb;
    let ao = top.a + bottom.a * (1.0 - top.a);
    return vec4f(co / max(ao, 0.00001), ao);
}

// Masked cards use the per-card foil; unmasked supporters fall back to the
// trainerbg texture tiled at 20% with color-burn.
fn sampleFoilOrTrainerBg(uv: vec2f) -> vec4f {
    if (uniforms.hasMask > 0.5) {
        return textureSampleLevel(foilTexture, linearSampler, uv, 0.0);
    }
    return textureSampleLevel(trainerBgTexture, linearSampler, fract(uv / 0.2), 0.0);
}

// Raw (unfiltered) v-full-art shine stack shared by the element and :after.
fn shineLayer(uv: vec2f, afterLayer: bool) -> vec3f {
    let bg = cssBackgroundPosition();
    let noMask = uniforms.hasMask < 0.5;
    let diagonalPos = vec2f(bg.x + bg.y * 0.2, bg.y);
    let layerDiagonalPos = select(diagonalPos, -diagonalPos, afterLayer);
    let sunSize = select(vec2f(2.0, 7.0), vec2f(2.0, 4.0), afterLayer);
    let diagonalSize = select(vec2f(3.0, 1.0), vec2f(1.95, 1.0), afterLayer);

    var layer = shineRadial(backgroundSampleUv(uv, vec2f(2.0, 1.0), bg));
    let diagonal = vec4f(diagonalStripeColor(backgroundSampleUv(uv, diagonalSize, layerDiagonalPos)), 1.0);
    let sun = vec4f(verticalSunpillar(backgroundSampleUv(uv, sunSize, vec2f(0.0, bg.y)), afterLayer), 1.0);
    let foil = sampleFoilOrTrainerBg(uv);

    layer = compositeBackgroundLayer(layer, diagonal, 2);
    layer = compositeBackgroundLayer(layer, sun, 1);
    layer = compositeBackgroundLayer(layer, foil, select(0, 3, noMask));

    return layer.rgb;
}

// :before — white radial glow (0% -> transparent at 80%), screen blend,
// opacity 0.5, explicitly unmasked in the CSS.
fn beforeGlowAlpha(uv: vec2f) -> f32 {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    return (1.0 - linearStep(0.0, 0.8, t)) * 0.5;
}

// Supporter glare: v-full-art radial colors in a 170% x 170% centered layer,
// multiply blend with brightness(1.5) contrast(1.4).
fn glareColor(uv: vec2f) -> vec3f {
    let size = vec2f(1.7, 1.7);
    let layerUv = backgroundSampleUv(uv, size, vec2f(0.5, 0.5));
    let boxAspect = vec2f(0.718, 1.0) * size;
    let d = length((layerUv - uniforms.pointer) * boxAspect);
    let c0 = abs(vec2f(0.0, 0.0) - uniforms.pointer) * boxAspect;
    let c1 = abs(vec2f(1.0, 0.0) - uniforms.pointer) * boxAspect;
    let c2 = abs(vec2f(0.0, 1.0) - uniforms.pointer) * boxAspect;
    let c3 = abs(vec2f(1.0, 1.0) - uniforms.pointer) * boxAspect;
    let farthest = max(max(length(c0), length(c1)), max(length(c2), length(c3)));
    let t = d / max(farthest, 0.001);

    let light = vec3f(0.750, 0.750, 0.750);
    let mid = vec3f(0.332, 0.356, 0.367);
    let dark = vec3f(0.140, 0.060, 0.113);
    if (t < 0.60) {
        return mix(light, mid, linearStep(0.05, 0.60, t));
    }
    return mix(mid, dark, linearStep(0.60, 1.50, t));
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
    let hasMask = uniforms.hasMask > 0.5;
    let foilMask = select(1.0, maskColor.a, hasMask);

    let pfc = pointerFromCenter();
    let front = shineLayer(cardUV, false);
    let after = shineLayer(cardUV, true);
    let beforeAlpha = beforeGlowAlpha(cardUV);

    var shineIn: vec3f;
    var shineOut: vec3f;
    if (hasMask) {
        let afterFiltered = applyFilter(after, pfc * 0.4 + 0.85, 2.0, 0.5);
        var combined = mix(front, vec3f(1.0), beforeAlpha);
        combined = exclusionBlend(combined, afterFiltered);
        shineIn = applyFilter(combined, pfc * 0.05 + 0.8, 1.75, 1.2);
        // Outside the mask only the unmasked white :before glow paints.
        shineOut = applyFilter(vec3f(1.0), pfc * 0.05 + 0.8, 1.75, 1.2);
    } else {
        let afterFiltered = applyFilter(after, pfc * 0.05 + 0.6, 1.5, 1.2);
        var combined = mix(front, vec3f(1.0), beforeAlpha);
        combined = exclusionBlend(combined, afterFiltered);
        shineIn = applyFilter(combined, pfc * 0.05 + 0.6, 1.5, 1.2);
        shineOut = shineIn;
    }

    var cardRgb = textureColor.rgb;
    cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, shineIn), foilMask * uniforms.opacity * cardMask);
    cardRgb = mix(
        cardRgb,
        colorDodgeBlend(cardRgb, shineOut),
        (1.0 - foilMask) * beforeAlpha * uniforms.opacity * cardMask
    );

    let glare = applyFilter(glareColor(cardUV), 1.5, 1.4, 1.0);
    cardRgb = mix(
        cardRgb,
        multiplyBlend(cardRgb, glare),
        0.75 * uniforms.opacity * cardMask
    );

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);
    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,Nn=`struct Uniforms {
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
    shinyKind: f32,
    hasMask: f32,
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

fn linearStep(edge0: f32, edge1: f32, x: f32) -> f32 {
    return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

fn pointerFromCenter() -> f32 {
    return clamp(length(uniforms.pointer - vec2f(0.5)) / 0.5, 0.0, 1.0);
}

fn cssBackgroundPosition() -> vec2f {
    return vec2f(
        mix(0.37, 0.63, uniforms.pointer.x),
        mix(0.33, 0.67, uniforms.pointer.y)
    );
}

fn backgroundSampleUv(uv: vec2f, size: vec2f, pos: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - size) * pos;
    return (uv - origin) / size;
}

fn overlayBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), base)
    );
}

fn hardLightBlend(base: vec3f, blend: vec3f) -> vec3f {
    return mix(
        2.0 * base * blend,
        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
        step(vec3f(0.5), blend)
    );
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(1.0));
}

fn luminosityBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseLum = dot(base, vec3f(0.299, 0.587, 0.114));
    let blendLum = dot(blend, vec3f(0.299, 0.587, 0.114));
    return clamp(base + (blendLum - baseLum), vec3f(0.0), vec3f(1.0));
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

// CSS linear-gradient projection: angle in degrees (0 = to top, clockwise),
// box is the background layer's dimensions (only the aspect matters).
// Returns t in [0,1] across the gradient line for points inside the box.
fn cssLinearGradientT(layerUv: vec2f, angleDeg: f32, box: vec2f) -> f32 {
    let a = radians(angleDeg);
    let dir = vec2f(sin(a), -cos(a));
    let p = (layerUv - vec2f(0.5)) * box;
    let lineLength = abs(dir.x) * box.x + abs(dir.y) * box.y;
    return dot(p, dir) / lineLength + 0.5;
}

// linear-gradient(-30deg / -60deg, r-clr 1..7 repeated three times + r-clr-1):
// 22 stops evenly spaced, i.e. 21 intervals cycling through 7 colors.
fn rainbowColor(index: i32) -> vec3f {
    switch (((index % 7) + 7) % 7) {
        case 0: { return vec3f(0.581, 0.159, 0.159); }
        case 1: { return vec3f(0.597, 0.459, 0.183); }
        case 2: { return vec3f(0.350, 0.560, 0.140); }
        case 3: { return vec3f(0.140, 0.560, 0.560); }
        case 4: { return vec3f(0.140, 0.560, 0.560); }
        case 5: { return vec3f(0.168, 0.390, 0.612); }
        default: { return vec3f(0.367, 0.140, 0.480); }
    }
}

fn rainbowGradient(t: f32) -> vec3f {
    let tt = clamp(t, 0.0, 1.0) * 21.0;
    let idx = i32(floor(min(tt, 20.0)));
    let f = tt - floor(tt);
    return mix(rainbowColor(idx), rainbowColor(idx + 1), f);
}

// repeating-linear-gradient(133deg, 7 hsla stops at 6% spacing):
// tile spans 5%..35%, i.e. period 30% with 6 intervals (base --space: 5%).
fn hueStripeColor(index: i32) -> vec3f {
    switch (((index % 7) + 7) % 7) {
        case 0: { return vec3f(0.685, 0.404, 0.796); }
        case 1: { return vec3f(0.874, 0.306, 0.286); }
        case 2: { return vec3f(0.845, 0.771, 0.215); }
        case 3: { return vec3f(0.493, 0.789, 0.251); }
        case 4: { return vec3f(0.310, 0.690, 0.665); }
        case 5: { return vec3f(0.540, 0.632, 1.000); }
        default: { return vec3f(0.693, 0.419, 0.801); }
    }
}

fn hueStripeGradient(tRaw: f32) -> vec3f {
    let phase = fract((tRaw - 0.05) / 0.30) * 6.0;
    let idx = i32(floor(phase));
    let f = phase - floor(phase);
    return mix(hueStripeColor(idx), hueStripeColor(idx + 1), f);
}

// background-size: 25% 25% tiling with background-position: center.
fn sampleGlitter(uv: vec2f) -> vec4f {
    return textureSampleLevel(glitterTexture, linearSampler, fract((uv - vec2f(0.375)) / 0.25), 0.0);
}

// Shine element background: 0.75-alpha hue stripes (luminosity) over
// glitter (overlay) over the -30deg rainbow gradient.
fn shineBackground(uv: vec2f, cardBox: vec2f) -> vec3f {
    let bg = cssBackgroundPosition();
    let rainbowUv = backgroundSampleUv(uv, vec2f(4.0, 4.0), bg * 1.5);
    var layer = rainbowGradient(cssLinearGradientT(rainbowUv, -30.0, cardBox * 4.0));

    let glitter = sampleGlitter(uv);
    layer = mix(layer, overlayBlend(layer, glitter.rgb), glitter.a);

    let hueUv = backgroundSampleUv(uv, vec2f(2.0, 4.0), vec2f(0.0, bg.y));
    let hue = hueStripeGradient(cssLinearGradientT(hueUv, 133.0, cardBox * vec2f(2.0, 4.0)));
    return mix(layer, luminosityBlend(layer, hue), 0.75);
}

// :after layer: glitter (overlay) over the -60deg rainbow, own filter.
// mask-image is forced to none in CSS, so this covers the whole card.
fn afterLayer(uv: vec2f, cardBox: vec2f) -> vec3f {
    let bg = cssBackgroundPosition();
    let rainbowUv = backgroundSampleUv(uv, vec2f(4.0, 4.0), -bg * 1.5);
    var layer = rainbowGradient(cssLinearGradientT(rainbowUv, -60.0, cardBox * 4.0));

    let glitter = sampleGlitter(uv);
    layer = mix(layer, overlayBlend(layer, glitter.rgb), glitter.a);

    return applyFilter(layer, pointerFromCenter() * 0.5 + 0.6, 3.0, 1.0);
}

// Rainbow-alt glare: radial with per-stop alpha (0.75 / 0.65 / 1.0),
// overlay blend with brightness(0.9) contrast(2) at 0.75 opacity.
fn glareGradient(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.920, 0.913, 0.880, 0.75);
    let mid = vec4f(0.240, 0.360, 0.300, 0.65);
    let dark = vec4f(0.0, 0.0, 0.0, 1.0);
    if (t < 0.45) {
        return mix(light, mid, linearStep(0.0, 0.45, t));
    }
    return mix(mid, dark, linearStep(0.45, 1.0, t));
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
    let hasMask = uniforms.hasMask > 0.5;
    let foilMask = select(1.0, maskColor.a, hasMask);

    let pfc = pointerFromCenter();
    // Only the layer aspect matters for gradient geometry.
    let cardBox = vec2f(0.718, 1.0);

    var shine = shineBackground(cardUV, cardBox);

    // :before — foil texture, color-dodge, confined to the mask.
    if (hasMask) {
        let foil = textureSampleLevel(foilTexture, linearSampler, cardUV, 0.0);
        let foilFiltered = applyFilter(foil.rgb, 1.5, 1.5, 1.0);
        let beforeOpacity = (pfc + 0.6) * 0.4;
        shine = mix(shine, colorDodgeBlend(shine, foilFiltered), beforeOpacity * foilMask);
    }

    let after = afterLayer(cardUV, cardBox);
    let afterOpacity = clamp(1.2 - pfc * 0.5, 0.0, 1.0);

    // Inside the mask: full stack (background + before + after), parent filter on top.
    let shineIn = applyFilter(
        mix(shine, colorDodgeBlend(shine, after), afterOpacity),
        pfc * 0.3 + 0.3, 3.0, 1.8
    );
    // Outside the mask: only the unmasked :after paints.
    let shineOut = applyFilter(after, pfc * 0.3 + 0.3, 3.0, 1.8);

    var cardRgb = textureColor.rgb;
    cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, shineIn), foilMask * uniforms.opacity * cardMask);
    cardRgb = mix(
        cardRgb,
        colorDodgeBlend(cardRgb, shineOut),
        (1.0 - foilMask) * afterOpacity * uniforms.opacity * cardMask
    );

    let glare = glareGradient(cardUV);
    let glareFiltered = applyFilter(glare.rgb, 0.9, 2.0, 1.0);
    cardRgb = mix(
        cardRgb,
        overlayBlend(cardRgb, glareFiltered),
        glare.a * 0.75 * uniforms.opacity * cardMask
    );

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);
    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,Wn=`struct Uniforms {
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
    shinyKind: f32,
    hasMask: f32,
    _pad0: f32,
    _pad1: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;
@group(0) @binding(5) var ancientTexture: texture_2d<f32>;

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

fn pointerFromCenter() -> f32 {
    return clamp(length(uniforms.pointer - vec2f(0.5)) / 0.5, 0.0, 1.0);
}

fn cssBackgroundPosition() -> vec2f {
    return vec2f(
        mix(0.37, 0.63, uniforms.pointer.x),
        mix(0.33, 0.67, uniforms.pointer.y)
    );
}

fn backgroundSampleUv(uv: vec2f, size: vec2f, pos: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - size) * pos;
    return (uv - origin) / size;
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

fn exclusionBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base + blend - 2.0 * base * blend;
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
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
    return vec3f(h / 6.0, s, l);
}

fn hue2rgb(p: f32, q: f32, t: f32) -> f32 {
    var tt = t;
    if (tt < 0.0) { tt += 1.0; }
    if (tt > 1.0) { tt -= 1.0; }
    if (tt < 1.0 / 6.0) { return p + (q - p) * 6.0 * tt; }
    if (tt < 1.0 / 2.0) { return q; }
    if (tt < 2.0 / 3.0) { return p + (q - p) * (2.0 / 3.0 - tt) * 6.0; }
    return p;
}

fn hsl2rgb(hsl: vec3f) -> vec3f {
    if (hsl.y == 0.0) {
        return vec3f(hsl.z);
    }
    let q = select(hsl.z + hsl.y - hsl.z * hsl.y, hsl.z * (1.0 + hsl.y), hsl.z < 0.5);
    let p = 2.0 * hsl.z - q;
    return vec3f(
        hue2rgb(p, q, hsl.x + 1.0 / 3.0),
        hue2rgb(p, q, hsl.x),
        hue2rgb(p, q, hsl.x - 1.0 / 3.0)
    );
}

fn hueBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseHsl = rgb2hsl(base);
    let blendHsl = rgb2hsl(blend);
    return hsl2rgb(vec3f(blendHsl.x, baseHsl.y, baseHsl.z));
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

const SUNPILLAR_1: vec3f = vec3f(0.973, 0.459, 0.459);
const SUNPILLAR_2: vec3f = vec3f(0.969, 0.878, 0.376);
const SUNPILLAR_3: vec3f = vec3f(0.608, 0.969, 0.376);
const SUNPILLAR_4: vec3f = vec3f(0.518, 1.0, 0.835);
const SUNPILLAR_5: vec3f = vec3f(0.478, 0.569, 0.969);
const SUNPILLAR_6: vec3f = vec3f(0.780, 0.459, 0.973);

fn sunpillarColor(index: i32, afterLayer: bool) -> vec3f {
    let wrapped = ((index % 6) + 6) % 6;
    let shifted = select(wrapped, (wrapped + 5) % 6, afterLayer);
    switch shifted {
        case 0: { return SUNPILLAR_1; }
        case 1: { return SUNPILLAR_2; }
        case 2: { return SUNPILLAR_3; }
        case 3: { return SUNPILLAR_4; }
        case 4: { return SUNPILLAR_5; }
        default: { return SUNPILLAR_6; }
    }
}

fn verticalSunpillar(layerUv: vec2f, afterLayer: bool) -> vec3f {
    let t = fract((1.0 - layerUv.y) / 0.35) * 7.0;
    let idx = i32(floor(t));
    let f = fract(t);
    return mix(sunpillarColor(idx, afterLayer), sunpillarColor(idx + 1, afterLayer), f);
}

fn diagonalStripePhase(layerUv: vec2f) -> f32 {
    let angle = radians(115.0);
    let dir = vec2f(sin(angle), -cos(angle));
    return fract(dot(layerUv, dir) / 0.12);
}

fn diagonalStripeColor(layerUv: vec2f) -> vec3f {
    let cycle = diagonalStripePhase(layerUv);
    let dark = vec3f(0.055, 0.082, 0.18);
    let gray = vec3f(0.557, 0.612, 0.612);
    let cyan = vec3f(0.525, 0.725, 0.725);
    if (cycle < 0.317) { return mix(dark, gray, cycle / 0.317); }
    if (cycle < 0.375) { return mix(gray, cyan, (cycle - 0.317) / 0.058); }
    if (cycle < 0.433) { return mix(cyan, gray, (cycle - 0.375) / 0.058); }
    if (cycle < 0.833) { return mix(gray, dark, (cycle - 0.433) / 0.4); }
    return dark;
}

fn shineRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    var alpha: f32;
    if (t < 0.12) {
        alpha = 0.1;
    } else if (t < 0.20) {
        alpha = mix(0.1, 0.15, linearStep(0.12, 0.20, t));
    } else {
        alpha = mix(0.15, 0.25, linearStep(0.20, 1.20, t));
    }
    return vec4f(0.0, 0.0, 0.0, alpha);
}

// CSS background-blend-mode compositing: the blend result only applies where
// the backdrop has coverage; over transparent backdrop the source paints as-is.
fn compositeBackgroundLayer(bottom: vec4f, top: vec4f, mode: i32) -> vec4f {
    var blended: vec3f;
    if (mode == 0) {
        blended = softLightBlend(bottom.rgb, top.rgb);
    } else if (mode == 1) {
        blended = hueBlend(bottom.rgb, top.rgb);
    } else if (mode == 2) {
        blended = hardLightBlend(bottom.rgb, top.rgb);
    } else {
        blended = exclusionBlend(bottom.rgb, top.rgb);
    }
    let co = top.a * (1.0 - bottom.a) * top.rgb
        + top.a * bottom.a * blended
        + (1.0 - top.a) * bottom.a * bottom.rgb;
    let ao = top.a + bottom.a * (1.0 - top.a);
    return vec4f(co / max(ao, 0.00001), ao);
}

// Masked cards use the per-card foil; unmasked ones fall back to the ancient
// texture tiled at 18% x 15% with exclusion.
fn sampleFoilOrAncient(uv: vec2f) -> vec4f {
    if (uniforms.hasMask > 0.5) {
        return textureSampleLevel(foilTexture, linearSampler, uv, 0.0);
    }
    return textureSampleLevel(ancientTexture, linearSampler, fract(uv / vec2f(0.18, 0.15)), 0.0);
}

// Raw (unfiltered) VStar shine stack. Unlike v-full-art, the diagonal stripe
// position has no bgY skew: front at (bgX, bgY), :after at (-bgX, -bgY).
fn shineLayer(uv: vec2f, afterLayer: bool) -> vec3f {
    let bg = cssBackgroundPosition();
    let noMask = uniforms.hasMask < 0.5;
    let layerDiagonalPos = select(bg, -bg, afterLayer);
    let sunSize = select(vec2f(2.0, 7.0), vec2f(2.0, 4.0), afterLayer);
    let diagonalSize = select(vec2f(3.0, 1.0), vec2f(1.95, 1.0), afterLayer);

    var layer = shineRadial(backgroundSampleUv(uv, vec2f(2.0, 1.0), bg));
    let diagonal = vec4f(diagonalStripeColor(backgroundSampleUv(uv, diagonalSize, layerDiagonalPos)), 1.0);
    let sun = vec4f(verticalSunpillar(backgroundSampleUv(uv, sunSize, vec2f(0.0, bg.y)), afterLayer), 1.0);
    let foil = sampleFoilOrAncient(uv);

    layer = compositeBackgroundLayer(layer, diagonal, 2);
    layer = compositeBackgroundLayer(layer, sun, 1);
    layer = compositeBackgroundLayer(layer, foil, select(0, 3, noMask));

    return layer.rgb;
}

// :before — pastel radial, hard-light at 0.8 opacity, painted above :after.
fn beforeRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.786, 0.809, 0.814, 0.75);
    let mid = vec4f(0.488, 0.465, 0.535, 0.25);
    let dark = vec4f(0.535, 0.465, 0.523, 1.0);
    if (t < 0.45) {
        return mix(light, mid, linearStep(0.0, 0.45, t));
    }
    return mix(mid, dark, linearStep(0.45, 1.20, t));
}

fn combinedShine(uv: vec2f) -> vec3f {
    let noMask = uniforms.hasMask < 0.5;
    let pfc = pointerFromCenter();
    let front = shineLayer(uv, false);
    let after = shineLayer(uv, true);

    let afterFiltered = applyFilter(after, pfc * 0.75 + 0.5, 1.5, 1.5);
    var combined = exclusionBlend(front, afterFiltered);

    let before = beforeRadial(uv);
    combined = mix(combined, hardLightBlend(combined, before.rgb), before.a * 0.8);

    if (noMask) {
        return applyFilter(combined, pfc * 0.25 + 0.35, 1.8, 1.75);
    }
    return applyFilter(combined, pfc * 0.75 + 0.25, 2.0, 1.25);
}

// VStar glare: hard-light radial, opacity scales with pointer-from-center.
fn glareGradient(uv: vec2f) -> vec3f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec3f(0.810, 0.945, 0.990);
    let mid = vec3f(0.612, 0.588, 0.612);
    let dark = vec3f(0.150, 0.150, 0.150);
    if (t < 0.60) {
        return mix(light, mid, linearStep(0.05, 0.60, t));
    }
    return mix(mid, dark, linearStep(0.60, 1.50, t));
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
    let hasMask = uniforms.hasMask > 0.5;
    let pfc = pointerFromCenter();

    // VStar mask = etch mask ADDED to a radial (0 at pointer -> 0.5 at 120%),
    // so the shine shows softly everywhere and fully in the etched areas.
    let radialT = distance(cardUV, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let radialMask = 0.5 * linearStep(0.0, 1.2, radialT);
    let foilMask = select(1.0, min(maskColor.a + radialMask, 1.0), hasMask);

    var cardRgb = textureColor.rgb;

    let shine = combinedShine(cardUV);
    cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, shine), foilMask * uniforms.opacity * cardMask);

    let glareBrightness = select(0.55, 0.7, hasMask);
    let glare = applyFilter(glareGradient(cardUV), glareBrightness, 2.0, 1.0);
    cardRgb = mix(
        cardRgb,
        hardLightBlend(cardRgb, glare),
        pfc * 0.75 * uniforms.opacity * cardMask
    );

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);
    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,Hn=`struct Uniforms {
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
`,Yn=`struct Uniforms {
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
`,Xn=`struct Uniforms {
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
    shinyKind: f32,
    hasMask: f32,
    _pad0: f32,
    _pad1: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;
@group(0) @binding(5) var vmaxBgTexture: texture_2d<f32>;

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

fn pointerFromCenter() -> f32 {
    return clamp(length(uniforms.pointer - vec2f(0.5)) / 0.5, 0.0, 1.0);
}

fn cssBackgroundPosition() -> vec2f {
    return vec2f(
        mix(0.37, 0.63, uniforms.pointer.x),
        mix(0.33, 0.67, uniforms.pointer.y)
    );
}

fn backgroundSampleUv(uv: vec2f, size: vec2f, pos: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - size) * pos;
    return (uv - origin) / size;
}

// CSS linear-gradient projection: angle in degrees (0 = to top, clockwise),
// box is the background layer's dimensions (only the aspect matters).
fn cssLinearGradientT(layerUv: vec2f, angleDeg: f32, box: vec2f) -> f32 {
    let a = radians(angleDeg);
    let dir = vec2f(sin(a), -cos(a));
    let p = (layerUv - vec2f(0.5)) * box;
    let lineLength = abs(dir.x) * box.x + abs(dir.y) * box.y;
    return dot(p, dir) / lineLength + 0.5;
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

fn differenceBlend(base: vec3f, blend: vec3f) -> vec3f {
    return abs(base - blend);
}

fn lightenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return max(base, blend);
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
    return select(dodged, vec3f(1.0), blend >= vec3f(1.0));
}

fn luminosityBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseLum = dot(base, vec3f(0.299, 0.587, 0.114));
    let blendLum = dot(blend, vec3f(0.299, 0.587, 0.114));
    return clamp(base + (blendLum - baseLum), vec3f(0.0), vec3f(1.0));
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
    return vec3f(h / 6.0, s, l);
}

fn hue2rgb(p: f32, q: f32, t: f32) -> f32 {
    var tt = t;
    if (tt < 0.0) { tt += 1.0; }
    if (tt > 1.0) { tt -= 1.0; }
    if (tt < 1.0 / 6.0) { return p + (q - p) * 6.0 * tt; }
    if (tt < 1.0 / 2.0) { return q; }
    if (tt < 2.0 / 3.0) { return p + (q - p) * (2.0 / 3.0 - tt) * 6.0; }
    return p;
}

fn hsl2rgb(hsl: vec3f) -> vec3f {
    if (hsl.y == 0.0) {
        return vec3f(hsl.z);
    }
    let q = select(hsl.z + hsl.y - hsl.z * hsl.y, hsl.z * (1.0 + hsl.y), hsl.z < 0.5);
    let p = 2.0 * hsl.z - q;
    return vec3f(
        hue2rgb(p, q, hsl.x + 1.0 / 3.0),
        hue2rgb(p, q, hsl.x),
        hue2rgb(p, q, hsl.x - 1.0 / 3.0)
    );
}

fn hueBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseHsl = rgb2hsl(base);
    let blendHsl = rgb2hsl(blend);
    return hsl2rgb(vec3f(blendHsl.x, baseHsl.y, baseHsl.z));
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

// CSS background-blend-mode compositing: the blend result only applies where
// the backdrop has coverage; over transparent backdrop the source paints as-is.
// mode: 0 soft-light, 1 hue, 2 hard-light, 3 difference, 4 luminosity
fn compositeBackgroundLayer(bottom: vec4f, top: vec4f, mode: i32) -> vec4f {
    var blended: vec3f;
    if (mode == 0) {
        blended = softLightBlend(bottom.rgb, top.rgb);
    } else if (mode == 1) {
        blended = hueBlend(bottom.rgb, top.rgb);
    } else if (mode == 2) {
        blended = hardLightBlend(bottom.rgb, top.rgb);
    } else if (mode == 3) {
        blended = differenceBlend(bottom.rgb, top.rgb);
    } else {
        blended = luminosityBlend(bottom.rgb, top.rgb);
    }
    let co = top.a * (1.0 - bottom.a) * top.rgb
        + top.a * bottom.a * blended
        + (1.0 - top.a) * bottom.a * bottom.rgb;
    let ao = top.a + bottom.a * (1.0 - top.a);
    return vec4f(co / max(ao, 0.00001), ao);
}

const SUNPILLAR_1: vec3f = vec3f(0.973, 0.459, 0.459);
const SUNPILLAR_2: vec3f = vec3f(0.969, 0.878, 0.376);
const SUNPILLAR_3: vec3f = vec3f(0.608, 0.969, 0.376);
const SUNPILLAR_4: vec3f = vec3f(0.518, 1.0, 0.835);
const SUNPILLAR_5: vec3f = vec3f(0.478, 0.569, 0.969);
const SUNPILLAR_6: vec3f = vec3f(0.780, 0.459, 0.973);

// The :after box uses the base.css :after custom-property rotation (+5).
fn sunpillarColor(index: i32) -> vec3f {
    let shifted = ((((index % 6) + 6) % 6) + 5) % 6;
    switch shifted {
        case 0: { return SUNPILLAR_1; }
        case 1: { return SUNPILLAR_2; }
        case 2: { return SUNPILLAR_3; }
        case 3: { return SUNPILLAR_4; }
        case 4: { return SUNPILLAR_5; }
        default: { return SUNPILLAR_6; }
    }
}

fn verticalSunpillar(layerUv: vec2f) -> vec3f {
    let t = fract((1.0 - layerUv.y) / 0.35) * 7.0;
    let idx = i32(floor(t));
    let f = fract(t);
    return mix(sunpillarColor(idx), sunpillarColor(idx + 1), f);
}

// Element layer 4 (bottom): pastel radial, four stops all at alpha 0.6.
fn pastelRadial(layerUv: vec2f) -> vec3f {
    let t = distance(layerUv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let cyan = vec3f(0.595, 0.892, 0.945);
    let mint = vec3f(0.634, 0.906, 0.756);
    let lavender = vec3f(0.696, 0.519, 0.861);
    let pink = vec3f(0.877, 0.563, 0.589);
    if (t < 0.25) { return mix(cyan, mint, linearStep(0.0, 0.25, t)); }
    if (t < 0.50) { return mix(mint, lavender, linearStep(0.25, 0.50, t)); }
    return mix(lavender, pink, linearStep(0.50, 0.75, t));
}

// Element layer 3: repeating-linear-gradient(133deg, navy(0.5) 0%, gray 2.5%,
// green 5%, gray 7.5%, navy(0.5) 10%, navy(0.5) 15%) — color + alpha.
fn stripe133(tRaw: f32) -> vec4f {
    let navy = vec3f(0.056, 0.084, 0.184);
    let gray = vec3f(0.450, 0.550, 0.550);
    let green = vec3f(0.391, 0.525, 0.175);
    let ph = fract(tRaw / 0.15) * 0.15;
    if (ph < 0.025) {
        let f = linearStep(0.0, 0.025, ph);
        return vec4f(mix(navy, gray, f), mix(0.5, 1.0, f));
    }
    if (ph < 0.05) {
        return vec4f(mix(gray, green, linearStep(0.025, 0.05, ph)), 1.0);
    }
    if (ph < 0.075) {
        return vec4f(mix(green, gray, linearStep(0.05, 0.075, ph)), 1.0);
    }
    if (ph < 0.10) {
        let f = linearStep(0.075, 0.10, ph);
        return vec4f(mix(gray, navy, f), mix(1.0, 0.5, f));
    }
    return vec4f(navy, 0.5);
}

// Element layer 2: repeating-linear-gradient(-33deg, 5 colors at 6% spacing),
// tile spans 6%..36% of the gradient line.
fn rainbowColor(index: i32) -> vec3f {
    switch (((index % 5) + 5) % 5) {
        case 0: { return vec3f(0.799, 0.163, 0.141); }
        case 1: { return vec3f(0.424, 0.510, 0.856); }
        case 2: { return vec3f(0.175, 0.605, 0.576); }
        case 3: { return vec3f(0.112, 0.588, 0.136); }
        default: { return vec3f(0.710, 0.248, 0.892); }
    }
}

fn rainbow33(tRaw: f32) -> vec3f {
    let phase = fract((tRaw - 0.06) / 0.30) * 5.0;
    let idx = i32(floor(phase));
    let f = phase - floor(phase);
    return mix(rainbowColor(idx), rainbowColor(idx + 1), f);
}

// :after bottom layer: the v-full-art 133deg stripe (12% cycle).
fn afterStripeColor(layerUv: vec2f, box: vec2f) -> vec3f {
    let cycle = fract(cssLinearGradientT(layerUv, 133.0, box) / 0.12);
    let dark = vec3f(0.055, 0.082, 0.18);
    let gray = vec3f(0.557, 0.612, 0.612);
    let cyan = vec3f(0.525, 0.725, 0.725);
    if (cycle < 0.317) { return mix(dark, gray, cycle / 0.317); }
    if (cycle < 0.375) { return mix(gray, cyan, (cycle - 0.317) / 0.058); }
    if (cycle < 0.433) { return mix(cyan, gray, (cycle - 0.375) / 0.058); }
    if (cycle < 0.833) { return mix(gray, dark, (cycle - 0.433) / 0.4); }
    return dark;
}

fn sampleFoil(uv: vec2f) -> vec4f {
    if (uniforms.hasMask > 0.5) {
        return textureSampleLevel(foilTexture, linearSampler, uv, 0.0);
    }
    // No-mask fallback: vmaxbg tiled at 60% x 30%.
    return textureSampleLevel(vmaxBgTexture, linearSampler, fract(uv / vec2f(0.6, 0.3)), 0.0);
}

// Shine element background: foil (difference) over rainbow (luminosity) over
// 133deg stripe (soft-light) over the pastel radial (alpha 0.6).
fn shineBackground(uv: vec2f, cardBox: vec2f) -> vec4f {
    let bg = cssBackgroundPosition();

    let radialUv = backgroundSampleUv(uv, vec2f(2.0, 2.0), bg);
    var layer = vec4f(pastelRadial(radialUv), 0.6);

    let stripeUv = backgroundSampleUv(uv, vec2f(6.0, 6.0), bg);
    let stripe = stripe133(cssLinearGradientT(stripeUv, 133.0, cardBox * 6.0));
    layer = compositeBackgroundLayer(layer, stripe, 0);

    let rainbowUv = backgroundSampleUv(uv, vec2f(11.0, 11.0), bg);
    let rainbow = rainbow33(cssLinearGradientT(rainbowUv, -33.0, cardBox * 11.0));
    layer = compositeBackgroundLayer(layer, vec4f(rainbow, 1.0), 4);

    // Foil luma boosted so the etched marks read as strongly as the CSS pane.
    let foil = sampleFoil(uv);
    let boostedFoil = vec4f(min(foil.rgb * 1.5, vec3f(1.0)), foil.a);
    layer = compositeBackgroundLayer(layer, boostedFoil, 3);
    return layer;
}

// :after — shifted sunpillar (hue) over the v-full-art stripe, saturate(1.5),
// blended lighten into the shine element at 0.3 + 0.5 * pointer-from-center.
fn afterLayer(uv: vec2f, cardBox: vec2f) -> vec3f {
    let bg = cssBackgroundPosition();
    let stripeUv = backgroundSampleUv(uv, vec2f(3.0, 1.0), bg);
    var layer = vec4f(afterStripeColor(stripeUv, cardBox * vec2f(3.0, 1.0)), 1.0);
    let sunUv = backgroundSampleUv(uv, vec2f(2.0, 7.0), vec2f(0.0, bg.y));
    layer = compositeBackgroundLayer(layer, vec4f(verticalSunpillar(sunUv), 1.0), 1);
    return applyFilter(layer.rgb, 1.0, 1.0, 1.5);
}

// VMAX glare: radial white(0.75) 0% -> black(1.0) 120%, hard-light,
// opacity 0.2 + 0.8 * pointer-from-center.
fn glareLayer(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let f = linearStep(0.0, 1.2, t);
    return vec4f(vec3f(1.0 - f), mix(0.75, 1.0, f));
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
    let foilMask = select(1.0, maskColor.a, uniforms.hasMask > 0.5);

    let pfc = pointerFromCenter();
    let cardBox = vec2f(0.718, 1.0);

    let shine = shineBackground(cardUV, cardBox);
    let after = afterLayer(cardUV, cardBox);
    let afterOpacity = 0.3 + pfc * 0.5;

    let combined = mix(shine.rgb, lightenBlend(shine.rgb, after), afterOpacity);
    let shineFiltered = applyFilter(combined, pfc * 0.4 + 0.4, 2.0, 1.0);

    var cardRgb = textureColor.rgb;
    cardRgb = mix(
        cardRgb,
        colorDodgeBlend(cardRgb, shineFiltered),
        foilMask * uniforms.opacity * cardMask
    );

    let glare = glareLayer(cardUV);
    cardRgb = mix(
        cardRgb,
        hardLightBlend(cardRgb, glare.rgb),
        glare.a * (0.2 + pfc * 0.8) * uniforms.opacity * cardMask
    );

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);
    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,jn=`struct Uniforms {
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
    shinyKind: f32,
    hasMask: f32,
    _pad0: f32,
    _pad1: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var linearSampler: sampler;
@group(0) @binding(2) var cardTexture: texture_2d<f32>;
@group(0) @binding(3) var foilTexture: texture_2d<f32>;
@group(0) @binding(4) var maskTexture: texture_2d<f32>;
@group(0) @binding(5) var glitterTexture: texture_2d<f32>;
@group(0) @binding(6) var illusionTexture: texture_2d<f32>;
@group(0) @binding(7) var grainTexture: texture_2d<f32>;

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

fn pointerFromCenter() -> f32 {
    return clamp(length(uniforms.pointer - vec2f(0.5)) / 0.5, 0.0, 1.0);
}

fn cssBackgroundPosition() -> vec2f {
    return vec2f(
        mix(0.37, 0.63, uniforms.pointer.x),
        mix(0.33, 0.67, uniforms.pointer.y)
    );
}

fn backgroundSampleUv(uv: vec2f, size: vec2f, pos: vec2f) -> vec2f {
    let origin = (vec2f(1.0) - size) * pos;
    return (uv - origin) / size;
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

fn differenceBlend(base: vec3f, blend: vec3f) -> vec3f {
    return abs(base - blend);
}

fn multiplyBlend(base: vec3f, blend: vec3f) -> vec3f {
    return base * blend;
}

fn darkenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return min(base, blend);
}

fn lightenBlend(base: vec3f, blend: vec3f) -> vec3f {
    return max(base, blend);
}

fn colorBurnBlend(base: vec3f, blend: vec3f) -> vec3f {
    return 1.0 - min((1.0 - base) / max(blend, vec3f(0.0001)), vec3f(1.0));
}

fn colorDodgeBlend(base: vec3f, blend: vec3f) -> vec3f {
    let dodged = min(base / max(vec3f(1.0) - blend, vec3f(0.0001)), vec3f(1.0));
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
    return vec3f(h / 6.0, s, l);
}

fn hue2rgb(p: f32, q: f32, t: f32) -> f32 {
    var tt = t;
    if (tt < 0.0) { tt += 1.0; }
    if (tt > 1.0) { tt -= 1.0; }
    if (tt < 1.0 / 6.0) { return p + (q - p) * 6.0 * tt; }
    if (tt < 1.0 / 2.0) { return q; }
    if (tt < 2.0 / 3.0) { return p + (q - p) * (2.0 / 3.0 - tt) * 6.0; }
    return p;
}

fn hsl2rgb(hsl: vec3f) -> vec3f {
    if (hsl.y == 0.0) {
        return vec3f(hsl.z);
    }
    let q = select(hsl.z + hsl.y - hsl.z * hsl.y, hsl.z * (1.0 + hsl.y), hsl.z < 0.5);
    let p = 2.0 * hsl.z - q;
    return vec3f(
        hue2rgb(p, q, hsl.x + 1.0 / 3.0),
        hue2rgb(p, q, hsl.x),
        hue2rgb(p, q, hsl.x - 1.0 / 3.0)
    );
}

fn hueBlend(base: vec3f, blend: vec3f) -> vec3f {
    let baseHsl = rgb2hsl(base);
    let blendHsl = rgb2hsl(blend);
    return hsl2rgb(vec3f(blendHsl.x, baseHsl.y, baseHsl.z));
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

const SUNPILLAR_1: vec3f = vec3f(0.973, 0.459, 0.459);
const SUNPILLAR_2: vec3f = vec3f(0.969, 0.878, 0.376);
const SUNPILLAR_3: vec3f = vec3f(0.608, 0.969, 0.376);
const SUNPILLAR_4: vec3f = vec3f(0.518, 1.0, 0.835);
const SUNPILLAR_5: vec3f = vec3f(0.478, 0.569, 0.969);
const SUNPILLAR_6: vec3f = vec3f(0.780, 0.459, 0.973);

fn sunpillarColor(index: i32, afterLayer: bool) -> vec3f {
    let wrapped = ((index % 6) + 6) % 6;
    let shifted = select(wrapped, (wrapped + 5) % 6, afterLayer);
    switch shifted {
        case 0: { return SUNPILLAR_1; }
        case 1: { return SUNPILLAR_2; }
        case 2: { return SUNPILLAR_3; }
        case 3: { return SUNPILLAR_4; }
        case 4: { return SUNPILLAR_5; }
        default: { return SUNPILLAR_6; }
    }
}

fn verticalSunpillar(layerUv: vec2f, afterLayer: bool) -> vec3f {
    let t = fract((1.0 - layerUv.y) / 0.35) * 7.0;
    let idx = i32(floor(t));
    let f = fract(t);
    return mix(sunpillarColor(idx, afterLayer), sunpillarColor(idx + 1, afterLayer), f);
}

fn angledSunpillar(layerUv: vec2f, angleDeg: f32, afterLayer: bool) -> vec3f {
    let angle = radians(angleDeg);
    let dir = vec2f(sin(angle), -cos(angle));
    let t = fract(dot(layerUv, dir) / 0.35) * 7.0;
    let idx = i32(floor(t));
    let f = fract(t);
    return mix(sunpillarColor(idx, afterLayer), sunpillarColor(idx + 1, afterLayer), f);
}

fn diagonalStripePhase(layerUv: vec2f) -> f32 {
    let angle = radians(115.0);
    let dir = vec2f(sin(angle), -cos(angle));
    return fract(dot(layerUv, dir) / 0.12);
}

fn diagonalStripeColor(layerUv: vec2f) -> vec3f {
    let cycle = diagonalStripePhase(layerUv);
    let dark = vec3f(0.055, 0.082, 0.18);
    let gray = vec3f(0.557, 0.612, 0.612);
    let cyan = vec3f(0.525, 0.725, 0.725);
    if (cycle < 0.317) { return mix(dark, gray, cycle / 0.317); }
    if (cycle < 0.375) { return mix(gray, cyan, (cycle - 0.317) / 0.058); }
    if (cycle < 0.433) { return mix(cyan, gray, (cycle - 0.375) / 0.058); }
    if (cycle < 0.833) { return mix(gray, dark, (cycle - 0.433) / 0.4); }
    return dark;
}

fn diagonalStripePhaseWithRepeat(layerUv: vec2f, repeatSize: f32) -> f32 {
    let angle = radians(115.0);
    let dir = vec2f(sin(angle), -cos(angle));
    return fract(dot(layerUv, dir) / repeatSize);
}

fn pokemonVDiagonalBeamMask(layerUv: vec2f) -> f32 {
    let cycle = diagonalStripePhaseWithRepeat(layerUv, 0.12);
    let distToPeak = abs(cycle - 0.375);
    let core = 1.0 - smoothstep(0.0, 0.12, distToPeak);
    let halo = 1.0 - smoothstep(0.06, 0.34, distToPeak);
    return clamp(core * 0.65 + halo * 0.5, 0.0, 1.0);
}

fn pokemonVDiagonalBeamHalo(layerUv: vec2f) -> f32 {
    let cycle = diagonalStripePhaseWithRepeat(layerUv, 0.12);
    let distToPeak = abs(cycle - 0.375);
    let broad = 1.0 - smoothstep(0.08, 0.43, distToPeak);
    let edge = smoothstep(0.035, 0.18, distToPeak);
    return broad * edge;
}

fn pokemonVBackBeamMask(layerUv: vec2f) -> f32 {
    let cycle = diagonalStripePhaseWithRepeat(layerUv, 0.24);
    let distToPeak = abs(cycle - 0.375);
    let core = 1.0 - smoothstep(0.0, 0.033, distToPeak);
    let halo = 1.0 - smoothstep(0.02, 0.075, distToPeak);
    return clamp(core * 1.2 + halo * 0.16, 0.0, 1.0);
}

fn pokemonVBackBeamHalo(layerUv: vec2f) -> f32 {
    let cycle = diagonalStripePhaseWithRepeat(layerUv, 0.24);
    let distToPeak = abs(cycle - 0.375);
    let broad = 1.0 - smoothstep(0.03, 0.18, distToPeak);
    let edge = smoothstep(0.015, 0.075, distToPeak);
    return broad * edge;
}

fn pokemonVCompositeBackgroundLayer(bottom: vec4f, top: vec4f, blendMode: i32) -> vec4f {
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

fn pokemonVBaseRadialGradient(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    var alpha: f32;
    if (t < 0.12) {
        alpha = 0.1;
    } else if (t < 0.20) {
        alpha = mix(0.1, 0.15, linearStep(0.12, 0.20, t));
    } else {
        alpha = mix(0.15, 0.25, linearStep(0.20, 1.20, t));
    }
    return vec4f(0.0, 0.0, 0.0, alpha);
}

fn samplePokemonVGrain(uv: vec2f) -> vec4f {
    let cardSize = getCardSize();
    let cardWidthPx = max(cardSize.x * uniforms.resolution.y / uniforms.dpr, 1.0);
    let grainWidth = 500.0 / cardWidthPx;
    let grainUv = backgroundSampleUv(uv, vec2f(grainWidth, 1.0), vec2f(0.5, 0.5));
    return textureSampleLevel(grainTexture, linearSampler, fract(grainUv), 0.0);
}

fn samplePokemonVFineGrain(uv: vec2f) -> vec4f {
    let cardSize = getCardSize();
    let cardWidthPx = max(cardSize.x * uniforms.resolution.y / uniforms.dpr, 1.0);
    let grainWidth = 500.0 / cardWidthPx;
    let grainUv = backgroundSampleUv(uv, vec2f(grainWidth, 1.0), vec2f(0.5, 0.5));
    return textureSampleLevel(
        grainTexture,
        linearSampler,
        fract(grainUv * vec2f(1.85, 1.35) + vec2f(0.17, 0.39)),
        0.0
    );
}

fn pokemonVBeamOverlap(uv: vec2f) -> vec3f {
    let bg = cssBackgroundPosition();
    let frontUv = backgroundSampleUv(uv, vec2f(3.0, 1.0), bg);
    let backUv = backgroundSampleUv(uv, vec2f(3.0, 1.0), -bg);
    let frontBeam = pokemonVDiagonalBeamMask(frontUv);
    let backBeam = pokemonVBackBeamMask(backUv);
    let overlap = pow(clamp(frontBeam * backBeam, 0.0, 1.0), 0.72);

    let grain = samplePokemonVGrain(uv);
    let fineGrain = samplePokemonVFineGrain(uv);
    let grainLuma = dot(grain.rgb, vec3f(0.299, 0.587, 0.114));
    let fineGrainLuma = dot(fineGrain.rgb, vec3f(0.299, 0.587, 0.114));
    let particle = 0.34 + smoothstep(0.08, 0.3, grainLuma) * 0.9 +
        smoothstep(0.12, 0.34, fineGrainLuma) * 1.55;

    let sunColor = verticalSunpillar(backgroundSampleUv(uv, vec2f(2.0, 7.0), vec2f(0.0, bg.y)), false);
    let mergeTint = mix(sunColor * 1.35, vec3f(1.0, 0.94, 0.7), overlap * 0.45);
    return mergeTint * overlap * particle * 1.25;
}

fn pokemonVShineLayer(uv: vec2f, afterLayer: bool) -> vec4f {
    let bg = cssBackgroundPosition();
    let diagonalPos = select(bg, -bg, afterLayer);
    let sunSize = select(vec2f(2.0, 7.0), vec2f(2.0, 4.0), afterLayer);
    let diagonalSize = select(vec2f(3.0, 1.0), vec2f(1.95, 1.0), afterLayer);

    let grain = samplePokemonVGrain(uv);
    let fineGrain = samplePokemonVFineGrain(uv);
    let sunUv = backgroundSampleUv(uv, sunSize, vec2f(0.0, bg.y));
    let diagonalUv = backgroundSampleUv(uv, diagonalSize, diagonalPos);
    let frontRotationDiagonalUv = backgroundSampleUv(uv, vec2f(3.0, 1.0), diagonalPos);
    let boostedBeamUv = select(diagonalUv, frontRotationDiagonalUv, afterLayer);
    let sunColor = verticalSunpillar(sunUv, false);
    let sun = vec4f(sunColor, 1.0);
    let diagonal = vec4f(diagonalStripeColor(diagonalUv), 1.0);
    let radial = pokemonVBaseRadialGradient(backgroundSampleUv(uv, vec2f(2.0, 1.0), bg));

    var layer = radial;
    layer = pokemonVCompositeBackgroundLayer(layer, diagonal, 2);
    layer = pokemonVCompositeBackgroundLayer(layer, sun, 1);
    layer = pokemonVCompositeBackgroundLayer(layer, grain, 0);

    var filtered = select(
        applyFilter(layer.rgb, 0.8, 2.95, 0.65),
        applyFilter(layer.rgb, 1.0, 2.5, 1.75),
        afterLayer
    );
    let beam = select(pokemonVDiagonalBeamMask(boostedBeamUv), pokemonVBackBeamMask(boostedBeamUv), afterLayer);
    let beamHalo = select(pokemonVDiagonalBeamHalo(boostedBeamUv), pokemonVBackBeamHalo(boostedBeamUv), afterLayer);
    let grainLuma = dot(grain.rgb, vec3f(0.299, 0.587, 0.114));
    let fineGrainLuma = dot(fineGrain.rgb, vec3f(0.299, 0.587, 0.114));
    let particleGrain = smoothstep(0.06, 0.26, grainLuma);
    let particleGrainFine = smoothstep(0.05, 0.21, fineGrainLuma);
    let particleFlecks = smoothstep(0.12, 0.36, max(grainLuma, fineGrainLuma));
    let edgeFlecks = pow(smoothstep(0.1, 0.34, fineGrainLuma), 1.65);
    let frontParticleMask = 0.32 + particleGrain * 1.12 + particleFlecks * 2.85;
    let backParticleMask = 0.07 + particleGrain * 0.92 + particleGrainFine * 1.18 + particleFlecks * 3.55;
    let particleMask = select(frontParticleMask, backParticleMask, afterLayer);
    let beamStrength = select(1.38, 1.45, afterLayer);
    let frontTint = mix(sunColor * 1.35, vec3f(1.0, 0.95, 0.76), particleFlecks * 0.38);
    let backTint = mix(sunColor * 1.15, vec3f(0.65, 0.86, 1.0), 0.32 + particleFlecks * 0.22);
    let beamTint = select(frontTint, backTint, afterLayer);
    filtered = screenBlend(filtered, beamTint * beam * particleMask * beamStrength);
    let fleckStrength = select(1.52, 1.175, afterLayer);
    let frontFleckTint = mix(sunColor * 1.45, vec3f(1.0, 0.86, 0.45), edgeFlecks * 0.55);
    let backFleckTint = mix(sunColor * 1.2, vec3f(0.7, 0.9, 1.0), 0.4);
    let fleckTint = select(frontFleckTint, backFleckTint, afterLayer);
    let backFleckDensity = particleGrainFine * 1.12 + edgeFlecks * 1.25;
    let fleckBeam = select(beamHalo + beam * 0.35, beam * (0.28 + edgeFlecks * 0.78 + backFleckDensity), afterLayer);
    filtered = screenBlend(filtered, fleckTint * fleckBeam * edgeFlecks * fleckStrength);
    return vec4f(filtered, layer.a);
}

fn pokemonVGlareGradient(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let white = vec4f(1.0, 1.0, 1.0, 1.0);
    let grayish = vec4f(0.533, 0.541, 0.549, 0.33);
    let dark = vec4f(0.2, 0.2, 0.2, 0.9);
    if (t < 0.45) {
        return mix(white, grayish, linearStep(0.0, 0.45, t));
    }
    return mix(grayish, dark, linearStep(0.45, 1.30, t));
}

fn shinyRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
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

fn whiteOverlayRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    return vec4f(1.0, 1.0, 1.0, 1.0 - linearStep(0.0, 0.40, t));
}

fn compositeBackgroundLayer(bottom: vec4f, top: vec4f, mode: i32) -> vec4f {
    var blended: vec3f;
    if (mode == 0) {
        blended = softLightBlend(bottom.rgb, top.rgb);
    } else if (mode == 1) {
        blended = hueBlend(bottom.rgb, top.rgb);
    } else if (mode == 2) {
        blended = hardLightBlend(bottom.rgb, top.rgb);
    } else if (mode == 3) {
        blended = overlayBlend(bottom.rgb, top.rgb);
    } else {
        blended = colorBurnBlend(bottom.rgb, top.rgb);
    }
    let rgb = mix(bottom.rgb, blended, top.a);
    let alpha = top.a + bottom.a * (1.0 - top.a);
    return vec4f(rgb, alpha);
}

fn sampleFoilOrIllusion(uv: vec2f) -> vec4f {
    if (uniforms.hasMask > 0.5) {
        return textureSampleLevel(foilTexture, linearSampler, uv, 0.0);
    }
    return textureSampleLevel(illusionTexture, linearSampler, fract(uv / 0.33), 0.0);
}

fn shinyRareLayer(uv: vec2f, afterLayer: bool) -> vec4f {
    let bg = cssBackgroundPosition();
    let noMask = uniforms.hasMask < 0.5;
    let diagonalPos = vec2f(bg.x + bg.y * 0.2, bg.y);
    let afterDiagonalPos = -diagonalPos;
    let sunSize = select(vec2f(2.0, 7.0), vec2f(2.0, 4.0), afterLayer);
    let diagonalSize = select(vec2f(3.0, 1.0), vec2f(1.95, 1.0), afterLayer);
    let layerDiagonalPos = select(diagonalPos, afterDiagonalPos, afterLayer);

    var layer = shinyRadial(backgroundSampleUv(uv, vec2f(2.0, 1.0), bg));
    let diagonal = vec4f(diagonalStripeColor(backgroundSampleUv(uv, diagonalSize, layerDiagonalPos)), 1.0);
    let sun = vec4f(verticalSunpillar(backgroundSampleUv(uv, sunSize, vec2f(0.0, bg.y)), afterLayer), 1.0);
    let foil = sampleFoilOrIllusion(uv);

    layer = compositeBackgroundLayer(layer, diagonal, 2);
    layer = compositeBackgroundLayer(layer, sun, 1);
    layer = compositeBackgroundLayer(layer, foil, select(0, 4, noMask));

    var filtered: vec3f;
    if (noMask) {
        if (uniforms.shinyKind > 0.5 && afterLayer) {
            filtered = applyFilter(layer.rgb, pointerFromCenter() * 0.5 + 0.8, 1.6, 1.4);
        } else {
            filtered = select(
                applyFilter(layer.rgb, pointerFromCenter() * 0.3 + 0.35, 2.0, 1.5),
                applyFilter(layer.rgb, pointerFromCenter() * 0.4 + 0.5, 1.4, 1.2),
                afterLayer
            );
        }
    } else if (uniforms.shinyKind < 0.5) {
        filtered = select(
            applyFilter(layer.rgb, pointerFromCenter() * 0.4 + 0.4, 1.4, 2.25),
            applyFilter(layer.rgb, pointerFromCenter() * 0.4 + 0.8, 1.5, 1.25),
            afterLayer
        );
    } else {
        filtered = select(
            applyFilter(layer.rgb, pointerFromCenter() * 0.4 + 0.4, 1.4, 2.25),
            applyFilter(layer.rgb, pointerFromCenter() * 0.4 + 0.8, 1.5, 1.25),
            afterLayer
        );
    }

    return vec4f(filtered, layer.a);
}

fn rainbowVmaxColor(index: i32) -> vec3f {
    switch (((index % 7) + 7) % 7) {
        case 0: { return vec3f(0.581, 0.159, 0.159); }
        case 1: { return vec3f(0.597, 0.424, 0.183); }
        case 2: { return vec3f(0.35, 0.56, 0.14); }
        case 3: { return vec3f(0.14, 0.56, 0.56); }
        case 4: { return vec3f(0.14, 0.56, 0.56); }
        case 5: { return vec3f(0.218, 0.35, 0.612); }
        default: { return vec3f(0.345, 0.14, 0.48); }
    }
}

fn vmaxRainbowGradient(layerUv: vec2f) -> vec3f {
    let angle = radians(-30.0);
    let dir = vec2f(cos(angle), sin(angle));
    let t = fract(dot(layerUv, dir)) * 21.0;
    let idx = i32(floor(t));
    return mix(rainbowVmaxColor(idx), rainbowVmaxColor(idx + 1), fract(t));
}

fn vmaxMainRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let dark = vec4f(0.098, 0.096, 0.105, 1.0);
    let pale = vec4f(0.795, 0.8, 0.805, 0.1);
    let white = vec4f(0.95, 0.95, 0.95, 0.98);
    if (t < 0.10) { return dark; }
    if (t < 0.50) { return mix(dark, pale, linearStep(0.10, 0.50, t)); }
    return mix(pale, white, linearStep(0.50, 0.90, t));
}

fn vmaxBeforeRadial(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.91, 0.909, 0.915, 0.95);
    let gray = vec4f(0.676, 0.681, 0.684, 0.5);
    let black = vec4f(0.0, 0.0, 0.0, 1.0);
    if (t < 0.10) { return light; }
    if (t < 0.50) { return mix(light, gray, linearStep(0.10, 0.50, t)); }
    return mix(gray, black, linearStep(0.50, 1.20, t));
}

fn vmaxMainLayer(uv: vec2f) -> vec4f {
    let bg = cssBackgroundPosition() * 1.5;
    let glitterA = textureSampleLevel(glitterTexture, linearSampler, fract((uv - vec2f(0.4, 0.45)) / 0.28), 0.0);
    let glitterB = textureSampleLevel(glitterTexture, linearSampler, fract((uv - vec2f(0.55, 0.55)) / 0.28), 0.0);
    let rawRainbow = vmaxRainbowGradient(backgroundSampleUv(uv, vec2f(4.0, 4.0), bg));
    let rainbowLuma = dot(rawRainbow, vec3f(0.2126, 0.7152, 0.0722));
    let rainbow = vec4f(mix(vec3f(rainbowLuma), rawRainbow, 0.42), 1.0);
    var layer = vmaxMainRadial(uv);
    layer = compositeBackgroundLayer(layer, rainbow, 4);
    layer = compositeBackgroundLayer(layer, glitterB, 3);
    layer = compositeBackgroundLayer(layer, glitterA, 0);
    return vec4f(applyFilter(layer.rgb, 0.86, 1.0, 0.55), layer.a * 0.68);
}

fn vmaxBeforeLayer(uv: vec2f) -> vec4f {
    let foil = textureSampleLevel(foilTexture, linearSampler, uv, 0.0);
    var layer = vmaxBeforeRadial(uv);
    layer = compositeBackgroundLayer(layer, foil, 4);
    return vec4f(applyFilter(layer.rgb, 1.0, 1.0, 0.4), layer.a * 0.35);
}

fn vmaxAfterLayer(uv: vec2f) -> vec4f {
    let bg = cssBackgroundPosition();
    let pos = vec2f(0.5 + (0.5 - bg.x) * 3.0, 0.5 + (0.5 - bg.y) * 3.0);
    let layerUv = backgroundSampleUv(uv, vec2f(4.0, 8.0), pos);
    let color = angledSunpillar(layerUv, -30.0, true);
    let filtered = applyFilter(color, 0.75 - pointerFromCenter() * 0.5, 1.0, 0.65);
    return vec4f(filtered, 0.26);
}

fn artworkClip(uv: vec2f) -> f32 {
    if (uniforms.clipMode < 0.5) {
        return select(0.0, 1.0, uv.x >= 0.08 && uv.x <= 0.92 && uv.y >= 0.0985 && uv.y <= 0.4715);
    }
    if (uniforms.clipMode < 1.5) {
        let base = uv.x >= 0.08 && uv.x <= 0.92 && uv.y >= 0.16 && uv.y <= 0.4715;
        let topLeft = uv.x >= 0.12 && uv.x < 0.17 && uv.y >= mix(0.16, 0.12, linearStep(0.12, 0.17, uv.x)) && uv.y <= 0.4715;
        let topMid = uv.x >= 0.17 && uv.x < 0.54 && uv.y >= 0.12 && uv.y <= 0.4715;
        let topRight = uv.x >= 0.54 && uv.x < 0.57 && uv.y >= mix(0.12, 0.0985, linearStep(0.54, 0.57, uv.x)) && uv.y <= 0.4715;
        let right = uv.x >= 0.57 && uv.x <= 0.915 && uv.y >= 0.0985 && uv.y <= 0.4715;
        return select(0.0, 1.0, base || topLeft || topMid || topRight || right);
    }
    return select(0.0, 1.0, uv.x >= 0.085 && uv.x <= 0.915 && uv.y >= 0.145 && uv.y <= 0.518);
}

fn shinyRareGlare(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let white = vec4f(1.0, 1.0, 1.0, 1.0);
    let dark = vec4f(0.157, 0.143, 0.153, 1.0);
    return mix(white, dark, linearStep(0.0, 1.50, t));
}

fn shinyVGlare(uv: vec2f) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = vec4f(0.9, 0.9, 0.9, 1.0);
    let mid = vec4f(0.428, 0.451, 0.458, 1.0);
    let dark = vec4f(0.14, 0.06, 0.113, 1.0);
    if (t < 0.05) { return light; }
    if (t < 0.80) { return mix(light, mid, linearStep(0.05, 0.80, t)); }
    return mix(mid, dark, linearStep(0.80, 1.50, t));
}

fn vmaxGlare(uv: vec2f, strong: bool) -> vec4f {
    let t = distance(uv, uniforms.pointer) / max(farthestCornerDist(uniforms.pointer), 0.001);
    let light = select(vec4f(0.898, 0.897, 0.903, 0.45), vec4f(0.898, 0.897, 0.903, 0.75), strong);
    let mid = select(vec4f(0.285, 0.302, 0.315, 0.45), vec4f(0.285, 0.302, 0.315, 0.65), strong);
    let dark = select(vec4f(0.0, 0.0, 0.0, 0.33), vec4f(0.0, 0.0, 0.0, 0.75), strong);
    if (t < 0.45) { return mix(light, mid, linearStep(0.0, 0.45, t)); }
    return mix(mid, dark, linearStep(0.45, select(1.20, 1.00, strong), t));
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
    let foilMask = select(1.0, maskColor.a, uniforms.hasMask > 0.5);
    let clipMask = artworkClip(cardUV);

    var cardRgb = textureColor.rgb;
    let isVmax = uniforms.shinyKind > 1.5;

    if (isVmax) {
        let shine = vmaxMainLayer(cardUV);
        cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, shine.rgb), shine.a * foilMask * uniforms.opacity * cardMask);

        let before = vmaxBeforeLayer(cardUV);
        cardRgb = mix(cardRgb, lightenBlend(cardRgb, before.rgb), before.a * uniforms.opacity * cardMask);

        let after = vmaxAfterLayer(cardUV);
        cardRgb = mix(cardRgb, hueBlend(cardRgb, after.rgb), after.a * foilMask * uniforms.opacity * cardMask);

        let glare = vmaxGlare(cardUV, false);
        let glareFiltered = applyFilter(glare.rgb, 1.09, 1.3, 1.0);
        cardRgb = mix(cardRgb, overlayBlend(cardRgb, glareFiltered), glare.a * uniforms.opacity * cardMask);

        let glareAfter = vmaxGlare(cardUV, true);
        let glareAfterFiltered = applyFilter(glareAfter.rgb, 1.1, 1.3, 1.0);
        cardRgb = mix(cardRgb, overlayBlend(cardRgb, glareAfterFiltered), glareAfter.a * 1.08 * foilMask * uniforms.opacity * cardMask);
    } else {
        let shineMask = foilMask * clipMask * cardMask;

        let shine = pokemonVShineLayer(cardUV, false);
        cardRgb = mix(cardRgb, colorDodgeBlend(cardRgb, shine.rgb), shine.a * shineMask * uniforms.opacity);

        let afterShine = pokemonVShineLayer(cardUV, true);
        cardRgb = mix(
            cardRgb,
            softLightBlend(cardRgb, afterShine.rgb),
            afterShine.a * shineMask * uniforms.opacity
        );

        cardRgb = screenBlend(cardRgb, pokemonVBeamOverlap(cardUV) * shineMask * uniforms.opacity);

        let glare = pokemonVGlareGradient(cardUV);
        let glareFiltered = applyFilter(glare.rgb, 0.9, 1.75, 1.0);
        cardRgb = mix(
            cardRgb,
            hardLightBlend(cardRgb, glareFiltered),
            glare.a * uniforms.opacity * 0.5 * shineMask
        );
    }

    let finalCard = vec4f(cardRgb, textureColor.a * cardMask);
    let finalColor = alphaOver(shadowColor, finalCard);
    if (finalColor.a <= 0.0) { discard; }
    return finalColor;
}
`,Kn={id:"glare",shaderCode:_n},Zn={id:"reverse-holo",shaderCode:zn},Jn={id:"amazing-rare",shaderCode:Mn},Qn={id:"galaxy-cosmos-holo",shaderCode:Tn,auxiliaryTextureUrls:["img/cosmos-bottom.png","img/cosmos-middle-trans.png","img/cosmos-top-trans.png"]},et={id:"holofoil-rare",shaderCode:Fn},nt={id:"radiant-holo",shaderCode:Vn},tt={id:"rainbow-rare",shaderCode:On},rt={id:"secret-rare",shaderCode:Dn},at={id:"trainer-gallery-holo",shaderCode:Gn},lt={id:"trainer-gallery-v",shaderCode:En,auxiliaryTextureUrl:"img/illusion.png"},it={id:"trainer-gallery-v-max",shaderCode:In},ot={id:"trainer-holo",shaderCode:qn,auxiliaryTextureUrl:"img/trainerbg.png"},st={id:"pokemon-v",shaderCode:Hn,auxiliaryTextureUrl:"img/grain.webp"},ct={id:"pokemon-v-alternate-art",shaderCode:$n},ft={id:"pokemon-v-full-art",shaderCode:Yn},dt={id:"v-star",shaderCode:Wn,auxiliaryTextureUrl:"img/ancient.png"},ut={id:"v-max-alt",shaderCode:Nn},pt={id:"v-max",shaderCode:Xn,auxiliaryTextureUrl:"img/vmaxbg.jpg"},vt={id:"shiny-vault",shaderCode:jn,auxiliaryTextureUrls:["img/glitter.png","img/illusion.png","img/grain.webp"]},ht={"Reverse Holo non-rares":Zn,"Holofoil Rare":et,"Trainer Gallery (V)":lt,"Trainer Gallery (VMax)":it,"Trainer Holo":ot,"Holofoil Amazing Rare":Jn,"Galaxy/Cosmos Holofoil":Qn,"Trainer Gallery Holofoil":at,"Radiant Holofoil":nt,"Rainbow Rare":tt,"Secret Rare (Gold)":rt,"Pokemon V":st,"Pokemon V (Alternate Art)":ct,"Pokemon V (Full Art)":ft,VMax:pt,"VMax (Alternate/Rainbow)":ut,VStar:dt,"Shiny Vault":vt};function we(n){return ht[n]??Kn}function gt(n){const e=new Set((n.types??[]).map(t=>t.toLowerCase()));return e.has("lightning")?.7:e.has("darkness")?.8:e.has("metal")?.6:.55}function mt(n){const e=(n.subtypes??[]).map(t=>t.toLowerCase());return n.supertype.toLowerCase()==="trainer"?2:e.some(t=>t.startsWith("stage"))?1:0}function bt(n,e){if(n!=="Shiny Vault"||!e.number.toLowerCase().startsWith("sv"))return 0;const t=new Set((e.subtypes??[]).map(r=>r.toLowerCase()));return t.has("vmax")?2:t.has("v")?1:0}async function xt({canvas:n,webgpuPane:e}){if(!navigator.gpu)throw alert("WebGPU not supported on this browser."),new Error("WebGPU not supported");const t=await navigator.gpu.requestAdapter();if(!t)throw alert("No appropriate GPUAdapter found."),new Error("No appropriate GPUAdapter found");const r=await t.requestDevice(),l=n.getContext("webgpu");if(!l)throw new Error("Unable to acquire WebGPU context");let i=window.devicePixelRatio||1;const c=navigator.gpu.getPreferredCanvasFormat(),h={device:r,format:c,alphaMode:"premultiplied"};l.configure(h);const g=r.createSampler({magFilter:"linear",minFilter:"linear"}),s=.718,f=1.2,m=new Float32Array([-1*f,-1/s*f,0,1,1*f,-1/s*f,1,1,1*f,1/s*f,1,0,-1*f,1/s*f,0,0]),b=new Uint16Array([0,1,2,0,2,3]),x=r.createBuffer({size:m.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});r.queue.writeBuffer(x,0,m);const B=r.createBuffer({size:b.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});r.queue.writeBuffer(B,0,b);const L=r.createBuffer({size:80,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),y=r.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:5,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:6,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:7,visibility:GPUShaderStage.FRAGMENT,texture:{}}]}),d=r.createPipelineLayout({bindGroupLayouts:[y]}),o=new Map;function a(p){const u=r.createShaderModule({code:p.shaderCode});return r.createRenderPipeline({layout:d,vertex:{module:u,entryPoint:"vertexMain",buffers:[{arrayStride:16,attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:8,format:"float32x2"}]}]},fragment:{module:u,entryPoint:"fragmentMain",targets:[{format:c,blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-list"}})}function v(p){let u=o.get(p.id);return u||(u=a(p),o.set(p.id,u)),u}const k=new Map;async function U(p){let u=k.get(p);return u||(u=await W(R(p)),k.set(p,u)),u}async function A(p){const u=p.auxiliaryTextureUrls??[p.auxiliaryTextureUrl??"img/glitter.png"],S=[u[0]??"img/glitter.png",u[1]??"img/glitter.png",u[2]??"img/glitter.png"];return Promise.all(S.map(U))}function F(p,u,S,C){return r.createBindGroup({layout:y,entries:[{binding:0,resource:{buffer:L}},{binding:1,resource:g},{binding:2,resource:p.createView()},{binding:3,resource:u.createView()},{binding:4,resource:S.createView()},{binding:5,resource:C[0].createView()},{binding:6,resource:C[1].createView()},{binding:7,resource:C[2].createView()}]})}let z=V([255,255,255,255]),D=V([0,0,0,255]),G=V([0,0,0,0]);const ae=we("");let le=v(ae),$=await A(ae),ie=F(z,D,G,$),E=.5,I=.5,Y=0,X=0,j=0,K=0,Z=0,J=0,oe=.55,se=.476,ce=.476,fe=0,de=0,ue=0,pe=0,ve=0;const Re=performance.now();let q=1,M=1,N;function he(){window.clearTimeout(N),E=.5,I=.5,Y=0,X=0,Z=0}function Be(p=500){window.clearTimeout(N),N=window.setTimeout(he,p)}function Ue(){const p=n.getBoundingClientRect(),u=Math.min(p.height*.6,p.width-48),S=u/s,C=p.left+(p.width-u)/2,_=p.top+(p.height-S)/2;return{width:u,height:S,cardLeft:C,cardTop:_}}function ge(p){window.clearTimeout(N),E=Math.min(Math.max(p.x,0),1),I=Math.min(Math.max(p.y,0),1);const u=E-.5,S=I-.5;Y=-(u*100)/3.5*(Math.PI/180),X=-(S*100)/3.5*(Math.PI/180),Z=1}function Pe(p){const u=Ue(),S={x:(p.clientX-u.cardLeft)/u.width,y:(p.clientY-u.cardTop)/u.height};return ge(S),S}function Ae(){Be()}function Q(){i=window.devicePixelRatio||1;const p=e.getBoundingClientRect();q=Math.max(1,Math.round(p.width*i)),M=Math.max(1,Math.round(p.height*i)),(n.width!==q||n.height!==M)&&(n.width=q,n.height=M,l.configure(h))}new ResizeObserver(Q).observe(e),window.addEventListener("resize",Q),Q();function V(p){const u=r.createTexture({size:[1,1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});return r.queue.writeTexture({texture:u},new Uint8Array(p),{bytesPerRow:4},[1,1]),u}async function W(p){const u=await fetch(p);if(!u.ok)throw new Error(`Unable to load texture: ${p}`);const S=await u.blob(),C=await createImageBitmap(S),_=r.createTexture({size:[C.width,C.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});return r.queue.copyExternalImageToTexture({source:C},{texture:_},[C.width,C.height]),C.close(),_}async function _e(p,u,S,C){const _=we(u),T=v(_),me=H(S,"foils",u,C),ee=H(S,"masks",u,C),[ze,Me,Ve]=await Promise.all([W(p),me?W(me):Promise.resolve(V([0,0,0,255])),ee?W(ee):Promise.resolve(V([0,0,0,0]))]),Oe=z,De=D,Ge=G;z=ze,D=Me,G=Ve,le=T,$=await A(_),oe=gt(S);const be=Ce(S);fe=be.cosmosPixels.x,de=be.cosmosPixels.y,ue=mt(S),pe=bt(u,S),ve=ee?1:0,ie=F(z,D,G,$),Oe.destroy(),De.destroy(),Ge.destroy()}function Te(){j+=(Y-j)*.15,K+=(X-K)*.15,J+=(Z-J)*.15;const p=(performance.now()-Re)/1e3,u=600*(2*i/M),S=new Float32Array([q,M,E,I,j,K,p,i,u,J,oe,se,ce,fe,de,ue,pe,ve,0,0]);r.queue.writeBuffer(L,0,S);const C=r.createCommandEncoder(),_=l.getCurrentTexture().createView(),T=C.beginRenderPass({colorAttachments:[{view:_,clearValue:{r:.2235,g:.2314,b:.2706,a:1},loadOp:"clear",storeOp:"store"}]});T.setPipeline(le),T.setBindGroup(0,ie),T.setVertexBuffer(0,x),T.setIndexBuffer(B,"uint16"),T.drawIndexed(b.length),T.end(),r.queue.submit([C.finish()])}function Fe(p,u){se=p,ce=u}return{updateTexture:_e,setPointer:ge,handlePointerMove:Pe,handlePointerLeave:Ae,resetPointer:he,render:Te,setPatternParams:Fe}}async function yt(){Ee();const n=document.createElement("a");n.className="github-link",n.href="https://github.com/jeantimex/pokemon-cards-webgpu",n.target="_blank",n.rel="noreferrer noopener",n.setAttribute("aria-label","GitHub profile for jeantimex"),n.innerHTML=`
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2a10 10 0 0 0-3.16 19.48c.5.09.68-.22.68-.48v-1.68c-2.78.61-3.37-1.17-3.37-1.17-.46-1.18-1.11-1.49-1.11-1.49-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.66.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.93.36.31.69.92.69 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"/>
    </svg>
    <span>jeantimex</span>
  `,document.body.appendChild(n);const e=document.querySelector("#webgpu-canvas"),t=document.querySelector("#css-card"),r=document.querySelector("#css-card-image"),l=document.querySelector(".pane-css .card__front"),i=document.querySelector(".pane-css .card__rotator"),c=document.querySelector(".pane-webgpu"),g=await(await fetch(R("cards.json"))).json(),f=dn(g,new Set),m=Pn(f,g),b=un({cssCard:t,cssCardImage:r,cssCardFront:l,cssCardRotator:i}),x=await xt({canvas:e,webgpuPane:c}),B=async(y,d)=>{const o=Ie(y.images.large);b.updateCard(y,o,d,f.variants[d]),await x.updateTexture(o,d,y,f.variants[d])};Ln({cardLibrary:f,cards:g,initialCategory:m.category,initialCardId:m.card.id,onCardChange:B,onSelectionChange:(y,d)=>{An(d,y)},webgpuRenderer:x}),i.addEventListener("pointermove",y=>{const d=b.handlePointerMove(y);x.setPointer(d)}),i.addEventListener("pointerleave",()=>{b.handlePointerLeave(),x.handlePointerLeave()}),i.addEventListener("blur",()=>{b.handleBlur(),x.resetPointer()}),c.addEventListener("pointermove",y=>{const d=x.handlePointerMove(y);b.setPointer(d)}),c.addEventListener("pointerleave",()=>{x.handlePointerLeave(),b.handlePointerLeave()}),window.addEventListener("blur",()=>{x.resetPointer(),b.handleBlur()});function L(){b.tick(),x.render(),requestAnimationFrame(L)}requestAnimationFrame(L)}yt();
