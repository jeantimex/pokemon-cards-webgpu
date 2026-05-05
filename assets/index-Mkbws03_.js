(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();function S(t){const e=t.startsWith("/")?t.slice(1):t;return new URL(e,document.baseURI).href}function se(){const t=document.documentElement.style;t.setProperty("--asset-grain",`url(${S("img/grain.webp")})`),t.setProperty("--asset-glitter",`url(${S("img/glitter.png")})`),t.setProperty("--asset-cosmos-bottom",`url(${S("img/cosmos-bottom.png")})`),t.setProperty("--asset-cosmos-middle-trans",`url(${S("img/cosmos-middle-trans.png")})`),t.setProperty("--asset-cosmos-top-trans",`url(${S("img/cosmos-top-trans.png")})`),t.setProperty("--asset-illusion",`url(${S("img/illusion.png")})`),t.setProperty("--asset-illusion-mask",`url(${S("img/illusion-mask.png")})`),t.setProperty("--asset-geometric",`url(${S("img/geometric.png")})`),t.setProperty("--asset-trainerbg",`url(${S("img/trainerbg.png")})`),t.setProperty("--asset-vmaxbg",`url(${S("img/vmaxbg.jpg")})`),t.setProperty("--asset-ancient",`url(${S("img/ancient.png")})`)}function le(t){const e=new URL(t);return S(`cards${e.pathname}`)}function W(t,e,i){var o,a;const r=t.rarity.toLowerCase(),n=t.number.toLowerCase().startsWith("sv");return i==="reverse-holo"?`${r} reverse holo`:e==="Shiny Vault"&&n?r==="rare holo vmax"||(o=t.subtypes)!=null&&o.includes("VMAX")?"rare shiny vmax":r==="rare holo v"||(a=t.subtypes)!=null&&a.includes("V")?"rare shiny v":"rare shiny":e==="VMax (Alternate/Rainbow)"?"rare rainbow alt":r}const ae={"amazing rare":{etch:"etched",style:"swsecret"},"rare holo cosmos":{etch:"holo",style:"cosmos"},"rare holo":{etch:"holo",style:"swholo"},"rare holo v":{etch:"holo",style:"sunpillar"},"rare holo vmax":{etch:"etched",style:"sunpillar"},"rare holo vstar":{etch:"etched",style:"sunpillar"},"rare ultra":{etch:"etched",style:"sunpillar"},"rare secret":{etch:"etched",style:"swsecret"},"rare rainbow":{etch:"etched",style:"swsecret"},"rare shiny":{etch:"etched",style:"sunpillar"},"rare shiny v":{etch:"etched",style:"sunpillar"},"rare shiny vmax":{etch:"etched",style:"swsecret"}};function ce(t,e){var i;return e.endsWith("reverse holo")?{etch:"holo",style:"reverse"}:e==="trainer gallery rare holo"?{etch:"holo",style:"rainbow"}:e==="rare holo v"?{etch:t.number.match(/^[tg]g/i)?"etched":"holo",style:"sunpillar"}:e==="rare rainbow alt"?{etch:"etched",style:(i=t.subtypes)!=null&&i.includes("VMAX")?"swsecret":"sunpillar"}:ae[e]??null}function j(t,e,i,r){const n=W(t,i,r),o=n==="trainer gallery rare holo"?"rare holo":n,c=o==="rare holo"&&(n==="trainer gallery rare holo"||t.number.match(/^[tg]g/i))?{etch:"holo",style:"rainbow"}:ce(t,o);if(!c)return"";const w=t.number.toString().toLowerCase().replace("swsh","").padStart(3,"0"),u=t.set.toString().toLowerCase().replace(/(tg|gg|sv)/,""),d=(c==null?void 0:c.etch)??"holo",l=(c==null?void 0:c.style)??"cosmos";return S(`foils/${u}/${e}/upscaled/${w}_foil_${d}_${l}_2x.webp`)}function C(t,e,i,r="standard"){return{name:t,description:e,cards:i,variant:r}}function he(t){return C("Common & Uncommon","All cards get a 3d rotation with CSS based on the cursor position. The default basic non-holo cards simply apply a flare/glare effect.",t.slice(1,4))}function de(t){return C("Galaxy/Cosmos Holofoil","Special image background of a galaxy effect with a gradient rainbow set to color-dodge & color-burn on top.",t.slice(13,16))}function ue(t){return C("Holofoil Amazing Rare","Unique shiny foil that extends past the frame and is much shinier than a regular holo effect, and textured.",t.slice(76,85))}function pe(t){return C("Holofoil Rare","Holo cards have an additional vertical beam holo effect. This uses a combintation of repeating gradients and filters.",t.slice(7,13))}function ge(t){return C("Trainer Gallery Holofoil","Kind of metallic effect with iridescent shine. Achieved with a large color dodge linear gradient.",t.filter(e=>e.rarity.toLowerCase()==="trainer gallery rare holo").sort((e,i)=>e.name.localeCompare(i.name)))}function me(t){const e=t.find(i=>i.id==="swsh12pt5-160");return C("Secret Rare (Gold)","GOLD! Here we apply two glitter layers on top of each other with a overlay effect and slide the two layers in opposite directions.",[t[58],t[59],t[60],t[61],t[62],t[63],e].filter(i=>!!i))}function fe(t){return C("Shiny Vault","Foil background is a shiny silver color. Applied with radial gradients to darken the foil over the background.",t.slice(85,91))}function ye(t){return C("Pokemon V (Alternate Art)","Practically the same holo effect as the Ultra Rare (Full Art) cards. The only difference is the pattern texture.",t.slice(28,34))}function ve(t){return C("Pokemon V","Diagonal holographic effect which that appears to travel in opposite directions when you tilt the card.",t.slice(22,25))}function we(t){return C("Pokemon V (Full Art)","Similar to the Pokemon V effect, but they have additional texture when looked at from certain angles.",t.slice(25,28))}function be(t){return C("Radiant Holofoil","The newest holofoil added to the series! Uses a criss-cross linear gradient pattern that moves across the card.",t.slice(16,19))}function xe(t){return C("Rainbow Rare","Super glittery effect on top of pastel gradients. Achieved with background glitter and color-burn/hard-light blends.",t.slice(52,58))}function Ce(t){return C("Reverse Holo non-rares","Reverse holo cards come in many shapes and sizes. The background uses a foil and a mask layer along with a glare.",[...t.slice(4,7),...t.slice(70,76)],"reverse-holo")}function _e(t){return C("VMax (Alternate/Rainbow)","Vibrant and glittery overlay. Achieved with a background image of glitter/sparkles sandwiching linear gradients.",t.slice(40,43).filter(e=>e.rarity.toLowerCase()==="rare rainbow").sort((e,i)=>e.name.localeCompare(i.name)))}function $e(t){return C("VMax","The gradient effect of Pokemon VMax is more subtle, using a larger background gradient which moves more slowly.",t.slice(37,40).filter(e=>e.rarity.toLowerCase()==="rare holo vmax").sort((e,i)=>e.name.localeCompare(i.name)))}function Ee(t){return C("VStar","Diagonal gradients overlaying a texture. Brighter with a pastel hue, making the gradient and texture more subtle.",t.slice(43,46).filter(e=>e.rarity.toLowerCase()==="rare holo vstar").sort((e,i)=>e.name.localeCompare(i.name)))}function Ae(t){return C("Trainer Gallery (VMax)","Generally quite similar to the normal V and VMax cards, with a different background texture.",t.slice(64,70).filter(e=>e.rarity.toLowerCase()==="rare holo vmax").sort((e,i)=>e.name.localeCompare(i.name)))}function Se(t){return C("Trainer Gallery (V)","Generally quite similar to the normal V and VMax cards, with a different background texture.",t.slice(64,70).filter(e=>e.rarity.toLowerCase()==="rare holo v").sort((e,i)=>e.name.localeCompare(i.name)))}function ke(t){return C("Trainer Holo","Diagonal gradients overlaying a texture, quite similar to the Ultra Rare cards but generally brighter.",t.filter(e=>{var i;return e.rarity.toLowerCase()==="rare ultra"&&((i=e.subtypes)==null?void 0:i.includes("Supporter"))}).sort((e,i)=>e.name.localeCompare(i.name)))}function Pe(t){return[]}function Le(t,e){const i=[me(t),he(t),Ce(t),pe(t),ge(t),de(t),ue(t),be(t),ve(t),we(t),ye(t),xe(t),fe(t),$e(t),_e(t),Ee(t),Se(t),Ae(t),ke(t),...Pe()].map(u=>({...u,cards:u.cards.filter(d=>!e.has(d.id)).sort((d,l)=>d.name.localeCompare(l.name))})).filter(u=>u.cards.length>0).sort((u,d)=>u.name.localeCompare(d.name)),r=Object.fromEntries(i.map(u=>[u.name,u.cards])),n=Object.fromEntries(i.map(u=>[u.name,u.description])),o=Object.fromEntries(i.map(u=>[u.name,u.variant])),a=i.map(u=>u.name),c=a[0],w=r[c][0];return{categories:r,descriptions:n,variants:o,categoryNames:a,initialCategory:c,initialCard:w}}function Ve({cssCard:t,cssCardImage:e,cssCardFront:i,cssCardRotator:r}){function n(s,f=0,_=100){return Math.min(Math.max(s,f),_)}function o(s,f=3){return parseFloat(s.toFixed(f))}function a(s,f,_,k,V){return o(k+(V-k)*(s-f)/(_-f))}function c(s){return["card","interactive",...(s.types??[]).map(f=>f.toLowerCase())].join(" ")}const w=new Map;function u(s){let f=w.get(s.id);return f||(f={x:Math.random(),y:Math.random()},w.set(s.id,f)),f}let d={pointerX:50,pointerY:50,rotateX:0,rotateY:0,backgroundX:50,backgroundY:50,opacity:0},l={...d},v;function E(s){const f=n(Math.sqrt((s.pointerY-50)*(s.pointerY-50)+(s.pointerX-50)*(s.pointerX-50))/50,0,1);t.style.setProperty("--pointer-x",`${s.pointerX}%`),t.style.setProperty("--pointer-y",`${s.pointerY}%`),t.style.setProperty("--pointer-from-center",String(f)),t.style.setProperty("--pointer-from-top",String(s.pointerY/100)),t.style.setProperty("--pointer-from-left",String(s.pointerX/100)),t.style.setProperty("--card-opacity",String(s.opacity)),t.style.setProperty("--rotate-x",`${s.rotateX}deg`),t.style.setProperty("--rotate-y",`${s.rotateY}deg`),t.style.setProperty("--background-x",`${s.backgroundX}%`),t.style.setProperty("--background-y",`${s.backgroundY}%`),t.style.setProperty("--card-scale","1"),t.style.setProperty("--translate-x","0px"),t.style.setProperty("--translate-y","0px")}function $(s=500){window.clearTimeout(v),v=window.setTimeout(()=>{t.classList.remove("interacting"),d={pointerX:50,pointerY:50,rotateX:0,rotateY:0,backgroundX:50,backgroundY:50,opacity:0}},s)}function g(s,f,_,k){const V=u(s),O={x:Math.floor(V.x*734),y:Math.floor(V.y*1280)};t.className=`${c(s)} loading`;const F=j(s,"masks",_,k),T=j(s,"foils",_,k);t.classList.toggle("masked",!!F),t.dataset.number=s.number.toLowerCase(),t.dataset.set=s.set,t.dataset.subtypes=(s.subtypes??[]).join(" ").toLowerCase(),t.dataset.supertype=s.supertype.toLowerCase(),t.dataset.rarity=W(s,_,k),t.dataset.trainerGallery=String(!!s.number.match(/^[tg]g/i)),r.setAttribute("aria-label",`Expand the Pokemon Card; ${s.name}.`),e.alt=`Front design of the ${s.name} Pokemon Card, with the stats and info around the edge`,i.style.setProperty("--seedx",String(V.x)),i.style.setProperty("--seedy",String(V.y)),i.style.setProperty("--cosmosbg",`${O.x}px ${O.y}px`),F?(i.style.setProperty("--mask",`url(${F})`),i.style.setProperty("--foil",`url(${T})`)):(i.style.removeProperty("--mask"),i.style.removeProperty("--foil")),e.onload=()=>{t.classList.remove("loading")},e.src=f}function m(s){window.clearTimeout(v),t.classList.add("interacting");const f={x:n(o(s.x*100)),y:n(o(s.y*100))},_={x:f.x-50,y:f.y-50};d={backgroundX:a(f.x,0,100,37,63),backgroundY:a(f.y,0,100,33,67),rotateX:o(-(_.x/3.5)),rotateY:o(_.y/3.5),pointerX:o(f.x),pointerY:o(f.y),opacity:1}}function p(s){const f=r.getBoundingClientRect(),_={x:s.clientX-f.left,y:s.clientY-f.top},k={x:n(_.x/f.width,0,1),y:n(_.y/f.height,0,1)};return m(k),k}function h(){$()}function x(){$(0)}function L(){l={pointerX:l.pointerX+(d.pointerX-l.pointerX)*.15,pointerY:l.pointerY+(d.pointerY-l.pointerY)*.15,rotateX:l.rotateX+(d.rotateX-l.rotateX)*.15,rotateY:l.rotateY+(d.rotateY-l.rotateY)*.15,backgroundX:l.backgroundX+(d.backgroundX-l.backgroundX)*.15,backgroundY:l.backgroundY+(d.backgroundY-l.backgroundY)*.15,opacity:l.opacity+(d.opacity-l.opacity)*.15},E(l)}return{updateCard:g,setPointer:m,handlePointerMove:p,handlePointerLeave:h,handleBlur:x,tick:L}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class M{constructor(e,i,r,n,o="div"){this.parent=e,this.object=i,this.property=r,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(o),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(n),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),M.nextNameID=M.nextNameID||0,this.$name.id=`lil-gui-name-${++M.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(r)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("lil-disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const i=this.parent.add(this.object,this.property,e);return i.name(this._name),this.destroy(),i}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Me extends M{constructor(e,i,r){super(e,i,r,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function B(t){let e,i;return(e=t.match(/(#|0x)?([a-f0-9]{6})/i))?i=e[2]:(e=t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),i?"#"+i:!1}const Fe={isPrimitive:!0,match:t=>typeof t=="string",fromHexString:B,toHexString:B},U={isPrimitive:!0,match:t=>typeof t=="number",fromHexString:t=>parseInt(t.substring(1),16),toHexString:t=>"#"+t.toString(16).padStart(6,0)},Te={isPrimitive:!1,match:t=>Array.isArray(t)||ArrayBuffer.isView(t),fromHexString(t,e,i=1){const r=U.fromHexString(t);e[0]=(r>>16&255)/255*i,e[1]=(r>>8&255)/255*i,e[2]=(r&255)/255*i},toHexString([t,e,i],r=1){r=255/r;const n=t*r<<16^e*r<<8^i*r<<0;return U.toHexString(n)}},Re={isPrimitive:!1,match:t=>Object(t)===t,fromHexString(t,e,i=1){const r=U.fromHexString(t);e.r=(r>>16&255)/255*i,e.g=(r>>8&255)/255*i,e.b=(r&255)/255*i},toHexString({r:t,g:e,b:i},r=1){r=255/r;const n=t*r<<16^e*r<<8^i*r<<0;return U.toHexString(n)}},De=[Fe,U,Te,Re];function Ue(t){return De.find(e=>e.match(t))}class Oe extends M{constructor(e,i,r,n){super(e,i,r,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Ue(this.initialValue),this._rgbScale=n,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const o=B(this.$text.value);o&&this._setValueFromHexString(o)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const i=this._format.fromHexString(e);this.setValue(i)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class X extends M{constructor(e,i,r){super(e,i,r,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",n=>{n.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class He extends M{constructor(e,i,r,n,o,a){super(e,i,r,"lil-number"),this._initInput(),this.min(n),this.max(o);const c=a!==void 0;this.step(c?a:this._getImplicitStep(),c),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,i=!0){return this._step=e,this._stepExplicit=i,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let i=(e-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let h=parseFloat(this.$input.value);isNaN(h)||(this._stepExplicit&&(h=this._snap(h)),this.setValue(this._clamp(h)))},r=h=>{const x=parseFloat(this.$input.value);isNaN(x)||(this._snapClampSetValue(x+h),this.$input.value=this.getValue())},n=h=>{h.key==="Enter"&&this.$input.blur(),h.code==="ArrowUp"&&(h.preventDefault(),r(this._step*this._arrowKeyMultiplier(h))),h.code==="ArrowDown"&&(h.preventDefault(),r(this._step*this._arrowKeyMultiplier(h)*-1))},o=h=>{this._inputFocused&&(h.preventDefault(),r(this._step*this._normalizeMouseWheel(h)))};let a=!1,c,w,u,d,l;const v=5,E=h=>{c=h.clientX,w=u=h.clientY,a=!0,d=this.getValue(),l=0,window.addEventListener("mousemove",$),window.addEventListener("mouseup",g)},$=h=>{if(a){const x=h.clientX-c,L=h.clientY-w;Math.abs(L)>v?(h.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(x)>v&&g()}if(!a){const x=h.clientY-u;l-=x*this._step*this._arrowKeyMultiplier(h),d+l>this._max?l=this._max-d:d+l<this._min&&(l=this._min-d),this._snapClampSetValue(d+l)}u=h.clientY},g=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",$),window.removeEventListener("mouseup",g)},m=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",o,{passive:!1}),this.$input.addEventListener("mousedown",E),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const e=(p,h,x,L,s)=>(p-h)/(x-h)*(s-L)+L,i=p=>{const h=this.$slider.getBoundingClientRect();let x=e(p,h.left,h.right,this._min,this._max);this._snapClampSetValue(x)},r=p=>{this._setDraggingStyle(!0),i(p.clientX),window.addEventListener("mousemove",n),window.addEventListener("mouseup",o)},n=p=>{i(p.clientX)},o=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",o)};let a=!1,c,w;const u=p=>{p.preventDefault(),this._setDraggingStyle(!0),i(p.touches[0].clientX),a=!1},d=p=>{p.touches.length>1||(this._hasScrollBar?(c=p.touches[0].clientX,w=p.touches[0].clientY,a=!0):u(p),window.addEventListener("touchmove",l,{passive:!1}),window.addEventListener("touchend",v))},l=p=>{if(a){const h=p.touches[0].clientX-c,x=p.touches[0].clientY-w;Math.abs(h)>Math.abs(x)?u(p):(window.removeEventListener("touchmove",l),window.removeEventListener("touchend",v))}else p.preventDefault(),i(p.touches[0].clientX)},v=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",l),window.removeEventListener("touchend",v)},E=this._callOnFinishChange.bind(this),$=400;let g;const m=p=>{if(Math.abs(p.deltaX)<Math.abs(p.deltaY)&&this._hasScrollBar)return;p.preventDefault();const x=this._normalizeMouseWheel(p)*this._step;this._snapClampSetValue(this.getValue()+x),this.$input.value=this.getValue(),clearTimeout(g),g=setTimeout(E,$)};this.$slider.addEventListener("mousedown",r),this.$slider.addEventListener("touchstart",d,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,i="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",e),document.body.classList.toggle("lil-dragging",e),document.body.classList.toggle(`lil-${i}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:i,deltaY:r}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(i=0,r=-e.wheelDelta/120,r*=this._stepExplicit?1:10),i+-r}_arrowKeyMultiplier(e){let i=this._stepExplicit?1:10;return e.shiftKey?i*=10:e.altKey&&(i/=10),i}_snap(e){let i=0;return this._hasMin?i=this._min:this._hasMax&&(i=this._max),e-=i,e=Math.round(e/this._step)*this._step,e+=i,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Ye extends M{constructor(e,i,r,n){super(e,i,r,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(n)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(i=>{const r=document.createElement("option");r.textContent=i,this.$select.appendChild(r)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),i=this._values.indexOf(e);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?e:this._names[i],this}}class Xe extends M{constructor(e,i,r){super(e,i,r,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",n=>{n.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Be=`.lil-gui {
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
}`;function ze(t){const e=document.createElement("style");e.innerHTML=t;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(e,i):document.head.appendChild(e)}let N=!1;class z{constructor({parent:e,autoPlace:i=e===void 0,container:r,width:n,title:o="Controls",closeFolders:a=!1,injectStyles:c=!0,touchStyles:w=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(o),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),w&&this.domElement.classList.add("lil-allow-touch-styles"),!N&&c&&(ze(Be),N=!0),r?r.appendChild(this.domElement):i&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),n&&this.domElement.style.setProperty("--width",n+"px"),this._closeFolders=a}add(e,i,r,n,o){if(Object(r)===r)return new Ye(this,e,i,r);const a=e[i];switch(typeof a){case"number":return new He(this,e,i,r,n,o);case"boolean":return new Me(this,e,i);case"string":return new Xe(this,e,i);case"function":return new X(this,e,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,e,`
	value:`,a)}addColor(e,i,r=1){return new Oe(this,e,i,r)}addFolder(e){const i=new z({parent:this,title:e});return this.root._closeFolders&&i.close(),i}load(e,i=!0){return e.controllers&&this.controllers.forEach(r=>{r instanceof X||r._name in e.controllers&&r.load(e.controllers[r._name])}),i&&e.folders&&this.folders.forEach(r=>{r._title in e.folders&&r.load(e.folders[r._title])}),this}save(e=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(r=>{if(!(r instanceof X)){if(r._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${r._name}"`);i.controllers[r._name]=r.save()}}),e&&this.folders.forEach(r=>{if(r._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${r._title}"`);i.folders[r._title]=r.save()}),i}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("lil-transition");const r=o=>{o.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",r))};this.$children.addEventListener("transitionend",r);const n=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!e),requestAnimationFrame(()=>{this.$children.style.height=n+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(r=>r.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(i=>{e=e.concat(i.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(i=>{e=e.concat(i.foldersRecursive())}),e}}function Ie({cardLibrary:t,cards:e,initialCategory:i,initialCardId:r,onCardChange:n,onSelectionChange:o}){var $;const a=new z({title:"Card Library"});a.close();const c={category:t.categoryNames.includes(i)?i:t.initialCategory,activeId:r},w=document.createElement("div");w.className="gui-description";const u=g=>Object.fromEntries(t.categories[g].map(m=>[m.name,m.id])),d=async(g,m)=>{c.category=m,c.activeId=g.id,w.textContent=t.descriptions[m],v.options(u(m)),v.updateDisplay(),o==null||o(g,m),await n(g,m)};($=a.add(c,"category",t.categoryNames).name("Type").onChange(async g=>{const m=t.categories[g];m.length>0&&await d(m[0],g)}).domElement.parentElement)==null||$.appendChild(w),w.textContent=t.descriptions[c.category];const v=a.add(c,"activeId",u(c.category)).name("Select Card").onChange(async g=>{const m=e.find(p=>p.id===g);m&&await d(m,c.category)}),E=t.categories[c.category].find(g=>g.id===r)??t.categories[c.category][0];E&&(c.activeId=E.id,d(E,c.category))}const Ge="secret-rare-gold",qe="swsh12pt5-160";function K(t){return t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function je(t,e){return t.categoryNames.find(i=>i===e)??t.categoryNames.find(i=>K(i)===e)}function Ne(t,e){const i=new URLSearchParams(window.location.search),r=i.get("type")??Ge,n=je(t,r)??t.initialCategory,o=t.categories[n],a=i.get("card")??qe,c=o.find(w=>w.id===a)??o[0]??e[0];return{category:n,card:c}}function We(t,e){const i=new URL(window.location.href);i.searchParams.set("type",K(t)),i.searchParams.set("card",e.id),history.replaceState({},"",i)}const Ke=`struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
    perspective: f32,
    _pad0: f32,
    _pad1: f32,
    _pad2: f32,
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
`;async function Ze({canvas:t,webgpuPane:e}){if(!navigator.gpu)throw alert("WebGPU not supported on this browser."),new Error("WebGPU not supported");const i=await navigator.gpu.requestAdapter();if(!i)throw alert("No appropriate GPUAdapter found."),new Error("No appropriate GPUAdapter found");const r=await i.requestDevice(),n=t.getContext("webgpu");if(!n)throw new Error("Unable to acquire WebGPU context");let o=window.devicePixelRatio||1;const a=navigator.gpu.getPreferredCanvasFormat(),c={device:r,format:a,alphaMode:"premultiplied"};n.configure(c);const w=r.createSampler({magFilter:"linear",minFilter:"linear"}),u=r.createShaderModule({code:Ke}),d=.718,l=1.2,v=new Float32Array([-1*l,-1/d*l,0,1,1*l,-1/d*l,1,1,1*l,1/d*l,1,0,-1*l,1/d*l,0,0]),E=new Uint16Array([0,1,2,0,2,3]),$=r.createBuffer({size:v.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});r.queue.writeBuffer($,0,v);const g=r.createBuffer({size:E.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});r.queue.writeBuffer(g,0,E);const m=r.createBuffer({size:48,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),p=r.createRenderPipeline({layout:"auto",vertex:{module:u,entryPoint:"vertexMain",buffers:[{arrayStride:16,attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:8,format:"float32x2"}]}]},fragment:{module:u,entryPoint:"fragmentMain",targets:[{format:a,blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-list"}});let h=te([255,255,255,255]),x=q(),L=.5,s=.5,f=0,_=0,k=0,V=0;const O=performance.now();let F=1,T=1,H;function I(){window.clearTimeout(H),L=.5,s=.5,f=0,_=0}function Z(y=500){window.clearTimeout(H),H=window.setTimeout(()=>{I()},y)}function J(){const y=t.getBoundingClientRect(),b=Math.min(y.height*.6,y.width-48),A=b/d,P=y.left+(y.width-b)/2,R=y.top+(y.height-A)/2;return{left:P,top:R,right:P+b,bottom:R+A,width:b,height:A,cardLeft:P,cardTop:R}}function G(y){window.clearTimeout(H),L=Math.min(Math.max(y.x,0),1),s=Math.min(Math.max(y.y,0),1);const b=L-.5,A=s-.5;f=-(b*100)/3.5*(Math.PI/180),_=-(A*100)/3.5*(Math.PI/180)}function Q(y){const b=J(),A={x:(y.clientX-b.cardLeft)/b.width,y:(y.clientY-b.cardTop)/b.height};return G(A),A}function ee(){Z()}function Y(){o=window.devicePixelRatio||1;const y=e.getBoundingClientRect();F=Math.max(1,Math.round(y.width*o)),T=Math.max(1,Math.round(y.height*o)),(t.width!==F||t.height!==T)&&(t.width=F,t.height=T,n.configure(c))}new ResizeObserver(Y).observe(e),window.addEventListener("resize",Y),Y();function te(y){const b=r.createTexture({size:[1,1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});return r.queue.writeTexture({texture:b},new Uint8Array(y),{bytesPerRow:4},{width:1,height:1}),b}async function ie(y){const b=await fetch(y);if(!b.ok)throw new Error(`Unable to load texture: ${y}`);const A=await b.blob(),P=await createImageBitmap(A),R=r.createTexture({size:[P.width,P.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});return r.queue.copyExternalImageToTexture({source:P},{texture:R},[P.width,P.height]),P.close(),R}function q(){return r.createBindGroup({layout:p.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:m}},{binding:1,resource:w},{binding:2,resource:h.createView()}]})}async function re(y){const b=await ie(y),A=h;h=b,x=q(),A.destroy()}function ne(){k+=(f-k)*.15,V+=(_-V)*.15;const y=(performance.now()-O)/1e3,b=600*(2*o/T),A=new Float32Array([F,T,L,s,k,V,y,o,b,0,0,0]);r.queue.writeBuffer(m,0,A);const P=r.createCommandEncoder(),oe={colorAttachments:[{view:n.getCurrentTexture().createView(),clearValue:{r:.2235,g:.2314,b:.2706,a:1},loadOp:"clear",storeOp:"store"}]},D=P.beginRenderPass(oe);D.setPipeline(p),D.setBindGroup(0,x),D.setVertexBuffer(0,$),D.setIndexBuffer(g,"uint16"),D.drawIndexed(E.length),D.end(),r.queue.submit([P.finish()])}return{updateTexture:re,setPointer:G,handlePointerMove:Q,handlePointerLeave:ee,resetPointer:I,render:ne}}async function Je(){se();const t=document.querySelector("#webgpu-canvas"),e=document.querySelector("#css-card"),i=document.querySelector("#css-card-image"),r=document.querySelector(".pane-css .card__front"),n=document.querySelector(".pane-css .card__rotator"),o=document.querySelector(".pane-webgpu"),c=await(await fetch(S("cards.json"))).json(),u=Le(c,new Set),d=Ne(u,c),l=Ve({cssCard:e,cssCardImage:i,cssCardFront:r,cssCardRotator:n}),v=await Ze({canvas:t,webgpuPane:o}),E=async(g,m)=>{const p=le(g.images.large);l.updateCard(g,p,m,u.variants[m]),await v.updateTexture(p)};Ie({cardLibrary:u,cards:c,initialCategory:d.category,initialCardId:d.card.id,onCardChange:E,onSelectionChange:(g,m)=>{We(m,g)}}),n.addEventListener("pointermove",g=>{const m=l.handlePointerMove(g);v.setPointer(m)}),n.addEventListener("pointerleave",()=>{l.handlePointerLeave(),v.handlePointerLeave()}),n.addEventListener("blur",()=>{l.handleBlur(),v.resetPointer()}),o.addEventListener("pointermove",g=>{const m=v.handlePointerMove(g);l.setPointer(m)}),o.addEventListener("pointerleave",()=>{v.handlePointerLeave(),l.handlePointerLeave()}),window.addEventListener("blur",()=>{v.resetPointer(),l.handleBlur()});function $(){l.tick(),v.render(),requestAnimationFrame($)}requestAnimationFrame($)}Je();
