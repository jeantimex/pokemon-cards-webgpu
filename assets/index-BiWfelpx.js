(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&n(h)}).observe(document,{childList:!0,subtree:!0});function i(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=i(r);fetch(r.href,o)}})();function k(t){const e=t.startsWith("/")?t.slice(1):t;return new URL(e,document.baseURI).href}function ne(){const t=document.documentElement.style;t.setProperty("--asset-grain",`url(${k("img/grain.webp")})`),t.setProperty("--asset-glitter",`url(${k("img/glitter.png")})`),t.setProperty("--asset-cosmos-bottom",`url(${k("img/cosmos-bottom.png")})`),t.setProperty("--asset-cosmos-middle-trans",`url(${k("img/cosmos-middle-trans.png")})`),t.setProperty("--asset-cosmos-top-trans",`url(${k("img/cosmos-top-trans.png")})`),t.setProperty("--asset-illusion",`url(${k("img/illusion.png")})`),t.setProperty("--asset-illusion-mask",`url(${k("img/illusion-mask.png")})`),t.setProperty("--asset-geometric",`url(${k("img/geometric.png")})`),t.setProperty("--asset-trainerbg",`url(${k("img/trainerbg.png")})`),t.setProperty("--asset-vmaxbg",`url(${k("img/vmaxbg.jpg")})`),t.setProperty("--asset-ancient",`url(${k("img/ancient.png")})`)}function re(t){const e=new URL(t);return k(`cards${e.pathname}`)}function W(t,e,i){var o,h;const n=t.rarity.toLowerCase(),r=t.number.toLowerCase().startsWith("sv");return i==="reverse-holo"?`${n} reverse holo`:e==="Shiny Vault"&&r?n==="rare holo vmax"||(o=t.subtypes)!=null&&o.includes("VMAX")?"rare shiny vmax":n==="rare holo v"||(h=t.subtypes)!=null&&h.includes("V")?"rare shiny v":"rare shiny":e==="VMax (Alternate/Rainbow)"?"rare rainbow alt":n}const oe={"amazing rare":{etch:"etched",style:"swsecret"},"rare holo cosmos":{etch:"holo",style:"cosmos"},"rare holo":{etch:"holo",style:"swholo"},"rare holo v":{etch:"holo",style:"sunpillar"},"rare holo vmax":{etch:"etched",style:"sunpillar"},"rare holo vstar":{etch:"etched",style:"sunpillar"},"rare ultra":{etch:"etched",style:"sunpillar"},"rare secret":{etch:"etched",style:"swsecret"},"rare rainbow":{etch:"etched",style:"swsecret"},"rare shiny":{etch:"etched",style:"sunpillar"},"rare shiny v":{etch:"etched",style:"sunpillar"},"rare shiny vmax":{etch:"etched",style:"swsecret"}};function se(t,e){var i;return e.endsWith("reverse holo")?{etch:"holo",style:"reverse"}:e==="trainer gallery rare holo"?{etch:"holo",style:"rainbow"}:e==="rare holo v"?{etch:t.number.match(/^[tg]g/i)?"etched":"holo",style:"sunpillar"}:e==="rare rainbow alt"?{etch:"etched",style:(i=t.subtypes)!=null&&i.includes("VMAX")?"swsecret":"sunpillar"}:oe[e]??null}function j(t,e,i,n){const r=W(t,i,n),o=r==="trainer gallery rare holo"?"rare holo":r,a=o==="rare holo"&&(r==="trainer gallery rare holo"||t.number.match(/^[tg]g/i))?{etch:"holo",style:"rainbow"}:se(t,o);if(!a)return"";const y=t.number.toString().toLowerCase().replace("swsh","").padStart(3,"0"),u=t.set.toString().toLowerCase().replace(/(tg|gg|sv)/,""),d=(a==null?void 0:a.etch)??"holo",l=(a==null?void 0:a.style)??"cosmos";return k(`foils/${u}/${e}/upscaled/${y}_foil_${d}_${l}_2x.webp`)}function x(t,e,i,n="standard"){return{name:t,description:e,cards:i,variant:n}}function le(t){return x("Common & Uncommon","All cards get a 3d rotation with CSS based on the cursor position. The default basic non-holo cards simply apply a flare/glare effect.",t.slice(1,4))}function ae(t){return x("Galaxy/Cosmos Holofoil","Special image background of a galaxy effect with a gradient rainbow set to color-dodge & color-burn on top.",t.slice(13,16))}function ce(t){return x("Holofoil Amazing Rare","Unique shiny foil that extends past the frame and is much shinier than a regular holo effect, and textured.",t.slice(76,85))}function he(t){return x("Holofoil Rare","Holo cards have an additional vertical beam holo effect. This uses a combintation of repeating gradients and filters.",t.slice(7,13))}function de(t){return x("Trainer Gallery Holofoil","Kind of metallic effect with iridescent shine. Achieved with a large color dodge linear gradient.",t.filter(e=>e.rarity.toLowerCase()==="trainer gallery rare holo").sort((e,i)=>e.name.localeCompare(i.name)))}function ue(t){const e=t.find(i=>i.id==="swsh12pt5-160");return x("Secret Rare (Gold)","GOLD! Here we apply two glitter layers on top of each other with a overlay effect and slide the two layers in opposite directions.",[t[58],t[59],t[60],t[61],t[62],t[63],e].filter(i=>!!i))}function pe(t){return x("Shiny Vault","Foil background is a shiny silver color. Applied with radial gradients to darken the foil over the background.",t.slice(85,91))}function ge(t){return x("Pokemon V (Alternate Art)","Practically the same holo effect as the Ultra Rare (Full Art) cards. The only difference is the pattern texture.",t.slice(28,34))}function me(t){return x("Pokemon V","Diagonal holographic effect which that appears to travel in opposite directions when you tilt the card.",t.slice(22,25))}function fe(t){return x("Pokemon V (Full Art)","Similar to the Pokemon V effect, but they have additional texture when looked at from certain angles.",t.slice(25,28))}function ye(t){return x("Radiant Holofoil","The newest holofoil added to the series! Uses a criss-cross linear gradient pattern that moves across the card.",t.slice(16,19))}function ve(t){return x("Rainbow Rare","Super glittery effect on top of pastel gradients. Achieved with background glitter and color-burn/hard-light blends.",t.slice(52,58))}function we(t){return x("Reverse Holo non-rares","Reverse holo cards come in many shapes and sizes. The background uses a foil and a mask layer along with a glare.",[...t.slice(4,7),...t.slice(70,76)],"reverse-holo")}function be(t){return x("VMax (Alternate/Rainbow)","Vibrant and glittery overlay. Achieved with a background image of glitter/sparkles sandwiching linear gradients.",t.slice(40,43).filter(e=>e.rarity.toLowerCase()==="rare rainbow").sort((e,i)=>e.name.localeCompare(i.name)))}function xe(t){return x("VMax","The gradient effect of Pokemon VMax is more subtle, using a larger background gradient which moves more slowly.",t.slice(37,40).filter(e=>e.rarity.toLowerCase()==="rare holo vmax").sort((e,i)=>e.name.localeCompare(i.name)))}function Ce(t){return x("VStar","Diagonal gradients overlaying a texture. Brighter with a pastel hue, making the gradient and texture more subtle.",t.slice(43,46).filter(e=>e.rarity.toLowerCase()==="rare holo vstar").sort((e,i)=>e.name.localeCompare(i.name)))}function _e(t){return x("Trainer Gallery (VMax)","Generally quite similar to the normal V and VMax cards, with a different background texture.",t.slice(64,70).filter(e=>e.rarity.toLowerCase()==="rare holo vmax").sort((e,i)=>e.name.localeCompare(i.name)))}function $e(t){return x("Trainer Gallery (V)","Generally quite similar to the normal V and VMax cards, with a different background texture.",t.slice(64,70).filter(e=>e.rarity.toLowerCase()==="rare holo v").sort((e,i)=>e.name.localeCompare(i.name)))}function Ee(t){return x("Trainer Holo","Diagonal gradients overlaying a texture, quite similar to the Ultra Rare cards but generally brighter.",t.filter(e=>{var i;return e.rarity.toLowerCase()==="rare ultra"&&((i=e.subtypes)==null?void 0:i.includes("Supporter"))}).sort((e,i)=>e.name.localeCompare(i.name)))}function Ae(t){return[]}function Se(t,e){const i=[ue(t),le(t),we(t),he(t),de(t),ae(t),ce(t),ye(t),me(t),fe(t),ge(t),ve(t),pe(t),xe(t),be(t),Ce(t),$e(t),_e(t),Ee(t),...Ae()].map(u=>({...u,cards:u.cards.filter(d=>!e.has(d.id)).sort((d,l)=>d.name.localeCompare(l.name))})).filter(u=>u.cards.length>0).sort((u,d)=>u.name.localeCompare(d.name)),n=Object.fromEntries(i.map(u=>[u.name,u.cards])),r=Object.fromEntries(i.map(u=>[u.name,u.description])),o=Object.fromEntries(i.map(u=>[u.name,u.variant])),h=i.map(u=>u.name),a=h[0],y=n[a][0];return{categories:n,descriptions:r,variants:o,categoryNames:h,initialCategory:a,initialCard:y}}function ke({cssCard:t,cssCardImage:e,cssCardFront:i,cssCardRotator:n}){function r(s,m=0,A=100){return Math.min(Math.max(s,m),A)}function o(s,m=3){return parseFloat(s.toFixed(m))}function h(s,m,A,_,P){return o(_+(P-_)*(s-m)/(A-m))}function a(s){return["card","interactive",...(s.types??[]).map(m=>m.toLowerCase())].join(" ")}const y=new Map;function u(s){let m=y.get(s.id);return m||(m={x:Math.random(),y:Math.random()},y.set(s.id,m)),m}let d={pointerX:50,pointerY:50,rotateX:0,rotateY:0,backgroundX:50,backgroundY:50,opacity:0},l={...d},w;function E(s){const m=r(Math.sqrt((s.pointerY-50)*(s.pointerY-50)+(s.pointerX-50)*(s.pointerX-50))/50,0,1);t.style.setProperty("--pointer-x",`${s.pointerX}%`),t.style.setProperty("--pointer-y",`${s.pointerY}%`),t.style.setProperty("--pointer-from-center",String(m)),t.style.setProperty("--pointer-from-top",String(s.pointerY/100)),t.style.setProperty("--pointer-from-left",String(s.pointerX/100)),t.style.setProperty("--card-opacity",String(s.opacity)),t.style.setProperty("--rotate-x",`${s.rotateX}deg`),t.style.setProperty("--rotate-y",`${s.rotateY}deg`),t.style.setProperty("--background-x",`${s.backgroundX}%`),t.style.setProperty("--background-y",`${s.backgroundY}%`),t.style.setProperty("--card-scale","1"),t.style.setProperty("--translate-x","0px"),t.style.setProperty("--translate-y","0px")}function $(s=500){window.clearTimeout(w),w=window.setTimeout(()=>{t.classList.remove("interacting"),d={pointerX:50,pointerY:50,rotateX:0,rotateY:0,backgroundX:50,backgroundY:50,opacity:0}},s)}function g(s,m,A,_){const P=u(s),F={x:Math.floor(P.x*734),y:Math.floor(P.y*1280)};t.className=`${a(s)} loading`;const O=j(s,"masks",A,_),R=j(s,"foils",A,_);t.classList.toggle("masked",!!O),t.dataset.number=s.number.toLowerCase(),t.dataset.set=s.set,t.dataset.subtypes=(s.subtypes??[]).join(" ").toLowerCase(),t.dataset.supertype=s.supertype.toLowerCase(),t.dataset.rarity=W(s,A,_),t.dataset.trainerGallery=String(!!s.number.match(/^[tg]g/i)),n.setAttribute("aria-label",`Expand the Pokemon Card; ${s.name}.`),e.alt=`Front design of the ${s.name} Pokemon Card, with the stats and info around the edge`,i.style.setProperty("--seedx",String(P.x)),i.style.setProperty("--seedy",String(P.y)),i.style.setProperty("--cosmosbg",`${F.x}px ${F.y}px`),O?(i.style.setProperty("--mask",`url(${O})`),i.style.setProperty("--foil",`url(${R})`)):(i.style.removeProperty("--mask"),i.style.removeProperty("--foil")),e.onload=()=>{t.classList.remove("loading")},e.src=m}function f(s){window.clearTimeout(w),t.classList.add("interacting");const m=n.getBoundingClientRect(),A={x:s.clientX-m.left,y:s.clientY-m.top},_={x:r(o(100/m.width*A.x)),y:r(o(100/m.height*A.y))},P={x:_.x-50,y:_.y-50};d={backgroundX:h(_.x,0,100,37,63),backgroundY:h(_.y,0,100,33,67),rotateX:o(-(P.x/3.5)),rotateY:o(P.y/3.5),pointerX:o(_.x),pointerY:o(_.y),opacity:1}}function p(){$()}function c(){$(0)}function b(){l={pointerX:l.pointerX+(d.pointerX-l.pointerX)*.15,pointerY:l.pointerY+(d.pointerY-l.pointerY)*.15,rotateX:l.rotateX+(d.rotateX-l.rotateX)*.15,rotateY:l.rotateY+(d.rotateY-l.rotateY)*.15,backgroundX:l.backgroundX+(d.backgroundX-l.backgroundX)*.15,backgroundY:l.backgroundY+(d.backgroundY-l.backgroundY)*.15,opacity:l.opacity+(d.opacity-l.opacity)*.15},E(l)}return{updateCard:g,handlePointerMove:f,handlePointerLeave:p,handleBlur:c,tick:b}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class V{constructor(e,i,n,r,o="div"){this.parent=e,this.object=i,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(o),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),V.nextNameID=V.nextNameID||0,this.$name.id=`lil-gui-name-${++V.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",h=>h.stopPropagation()),this.domElement.addEventListener("keyup",h=>h.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("lil-disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const i=this.parent.add(this.object,this.property,e);return i.name(this._name),this.destroy(),i}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Pe extends V{constructor(e,i,n){super(e,i,n,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function z(t){let e,i;return(e=t.match(/(#|0x)?([a-f0-9]{6})/i))?i=e[2]:(e=t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),i?"#"+i:!1}const Le={isPrimitive:!0,match:t=>typeof t=="string",fromHexString:z,toHexString:z},T={isPrimitive:!0,match:t=>typeof t=="number",fromHexString:t=>parseInt(t.substring(1),16),toHexString:t=>"#"+t.toString(16).padStart(6,0)},Ve={isPrimitive:!1,match:t=>Array.isArray(t)||ArrayBuffer.isView(t),fromHexString(t,e,i=1){const n=T.fromHexString(t);e[0]=(n>>16&255)/255*i,e[1]=(n>>8&255)/255*i,e[2]=(n&255)/255*i},toHexString([t,e,i],n=1){n=255/n;const r=t*n<<16^e*n<<8^i*n<<0;return T.toHexString(r)}},Me={isPrimitive:!1,match:t=>Object(t)===t,fromHexString(t,e,i=1){const n=T.fromHexString(t);e.r=(n>>16&255)/255*i,e.g=(n>>8&255)/255*i,e.b=(n&255)/255*i},toHexString({r:t,g:e,b:i},n=1){n=255/n;const r=t*n<<16^e*n<<8^i*n<<0;return T.toHexString(r)}},Fe=[Le,T,Ve,Me];function Re(t){return Fe.find(e=>e.match(t))}class De extends V{constructor(e,i,n,r){super(e,i,n,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Re(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const o=z(this.$text.value);o&&this._setValueFromHexString(o)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const i=this._format.fromHexString(e);this.setValue(i)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class I extends V{constructor(e,i,n){super(e,i,n,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Oe extends V{constructor(e,i,n,r,o,h){super(e,i,n,"lil-number"),this._initInput(),this.min(r),this.max(o);const a=h!==void 0;this.step(a?h:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,i=!0){return this._step=e,this._stepExplicit=i,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let i=(e-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let c=parseFloat(this.$input.value);isNaN(c)||(this._stepExplicit&&(c=this._snap(c)),this.setValue(this._clamp(c)))},n=c=>{const b=parseFloat(this.$input.value);isNaN(b)||(this._snapClampSetValue(b+c),this.$input.value=this.getValue())},r=c=>{c.key==="Enter"&&this.$input.blur(),c.code==="ArrowUp"&&(c.preventDefault(),n(this._step*this._arrowKeyMultiplier(c))),c.code==="ArrowDown"&&(c.preventDefault(),n(this._step*this._arrowKeyMultiplier(c)*-1))},o=c=>{this._inputFocused&&(c.preventDefault(),n(this._step*this._normalizeMouseWheel(c)))};let h=!1,a,y,u,d,l;const w=5,E=c=>{a=c.clientX,y=u=c.clientY,h=!0,d=this.getValue(),l=0,window.addEventListener("mousemove",$),window.addEventListener("mouseup",g)},$=c=>{if(h){const b=c.clientX-a,s=c.clientY-y;Math.abs(s)>w?(c.preventDefault(),this.$input.blur(),h=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(b)>w&&g()}if(!h){const b=c.clientY-u;l-=b*this._step*this._arrowKeyMultiplier(c),d+l>this._max?l=this._max-d:d+l<this._min&&(l=this._min-d),this._snapClampSetValue(d+l)}u=c.clientY},g=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",$),window.removeEventListener("mouseup",g)},f=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",r),this.$input.addEventListener("wheel",o,{passive:!1}),this.$input.addEventListener("mousedown",E),this.$input.addEventListener("focus",f),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const e=(p,c,b,s,m)=>(p-c)/(b-c)*(m-s)+s,i=p=>{const c=this.$slider.getBoundingClientRect();let b=e(p,c.left,c.right,this._min,this._max);this._snapClampSetValue(b)},n=p=>{this._setDraggingStyle(!0),i(p.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",o)},r=p=>{i(p.clientX)},o=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",o)};let h=!1,a,y;const u=p=>{p.preventDefault(),this._setDraggingStyle(!0),i(p.touches[0].clientX),h=!1},d=p=>{p.touches.length>1||(this._hasScrollBar?(a=p.touches[0].clientX,y=p.touches[0].clientY,h=!0):u(p),window.addEventListener("touchmove",l,{passive:!1}),window.addEventListener("touchend",w))},l=p=>{if(h){const c=p.touches[0].clientX-a,b=p.touches[0].clientY-y;Math.abs(c)>Math.abs(b)?u(p):(window.removeEventListener("touchmove",l),window.removeEventListener("touchend",w))}else p.preventDefault(),i(p.touches[0].clientX)},w=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",l),window.removeEventListener("touchend",w)},E=this._callOnFinishChange.bind(this),$=400;let g;const f=p=>{if(Math.abs(p.deltaX)<Math.abs(p.deltaY)&&this._hasScrollBar)return;p.preventDefault();const b=this._normalizeMouseWheel(p)*this._step;this._snapClampSetValue(this.getValue()+b),this.$input.value=this.getValue(),clearTimeout(g),g=setTimeout(E,$)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",d,{passive:!1}),this.$slider.addEventListener("wheel",f,{passive:!1})}_setDraggingStyle(e,i="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",e),document.body.classList.toggle("lil-dragging",e),document.body.classList.toggle(`lil-${i}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:i,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(i=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),i+-n}_arrowKeyMultiplier(e){let i=this._stepExplicit?1:10;return e.shiftKey?i*=10:e.altKey&&(i/=10),i}_snap(e){let i=0;return this._hasMin?i=this._min:this._hasMax&&(i=this._max),e-=i,e=Math.round(e/this._step)*this._step,e+=i,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Te extends V{constructor(e,i,n,r){super(e,i,n,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(i=>{const n=document.createElement("option");n.textContent=i,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),i=this._values.indexOf(e);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?e:this._names[i],this}}class Ue extends V{constructor(e,i,n){super(e,i,n,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Ye=`.lil-gui {
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
}`;function He(t){const e=document.createElement("style");e.innerHTML=t;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(e,i):document.head.appendChild(e)}let N=!1;class B{constructor({parent:e,autoPlace:i=e===void 0,container:n,width:r,title:o="Controls",closeFolders:h=!1,injectStyles:a=!0,touchStyles:y=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(o),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),y&&this.domElement.classList.add("lil-allow-touch-styles"),!N&&a&&(He(Ye),N=!0),n?n.appendChild(this.domElement):i&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this._closeFolders=h}add(e,i,n,r,o){if(Object(n)===n)return new Te(this,e,i,n);const h=e[i];switch(typeof h){case"number":return new Oe(this,e,i,n,r,o);case"boolean":return new Pe(this,e,i);case"string":return new Ue(this,e,i);case"function":return new I(this,e,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,e,`
	value:`,h)}addColor(e,i,n=1){return new De(this,e,i,n)}addFolder(e){const i=new B({parent:this,title:e});return this.root._closeFolders&&i.close(),i}load(e,i=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof I||n._name in e.controllers&&n.load(e.controllers[n._name])}),i&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof I)){if(n._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);i.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);i.folders[n._title]=n.save()}),i}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("lil-transition");const n=o=>{o.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const r=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!e),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(i=>{e=e.concat(i.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(i=>{e=e.concat(i.foldersRecursive())}),e}}function Xe({cardLibrary:t,cards:e,initialCategory:i,initialCardId:n,onCardChange:r,onSelectionChange:o}){var $;const h=new B({title:"Card Library"}),a={category:t.categoryNames.includes(i)?i:t.initialCategory,activeId:n},y=document.createElement("div");y.className="gui-description";const u=g=>Object.fromEntries(t.categories[g].map(f=>[f.name,f.id])),d=async(g,f)=>{a.category=f,a.activeId=g.id,y.textContent=t.descriptions[f],w.options(u(f)),w.updateDisplay(),o==null||o(g,f),await r(g,f)};($=h.add(a,"category",t.categoryNames).name("Type").onChange(async g=>{const f=t.categories[g];f.length>0&&await d(f[0],g)}).domElement.parentElement)==null||$.appendChild(y),y.textContent=t.descriptions[a.category];const w=h.add(a,"activeId",u(a.category)).name("Select Card").onChange(async g=>{const f=e.find(p=>p.id===g);f&&await d(f,a.category)}),E=t.categories[a.category].find(g=>g.id===n)??t.categories[a.category][0];E&&(a.activeId=E.id,d(E,a.category))}const Ie="secret-rare-gold",ze="swsh12pt5-160";function K(t){return t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function Be(t,e){return t.categoryNames.find(i=>i===e)??t.categoryNames.find(i=>K(i)===e)}function Ge(t,e){const i=new URLSearchParams(window.location.search),n=i.get("type")??Ie,r=Be(t,n)??t.initialCategory,o=t.categories[r],h=i.get("card")??ze,a=o.find(y=>y.id===h)??o[0]??e[0];return{category:r,card:a}}function qe(t,e){const i=new URL(window.location.href);i.searchParams.set("type",K(t)),i.searchParams.set("card",e.id),history.replaceState({},"",i)}const je=`struct Uniforms {
    resolution: vec2f,
    pointer: vec2f,
    rotation: vec2f,
    time: f32,
    dpr: f32,
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
    
    let perspective = 2.0;
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
`;async function Ne({canvas:t,webgpuPane:e}){if(!navigator.gpu)throw alert("WebGPU not supported on this browser."),new Error("WebGPU not supported");const i=await navigator.gpu.requestAdapter();if(!i)throw alert("No appropriate GPUAdapter found."),new Error("No appropriate GPUAdapter found");const n=await i.requestDevice(),r=t.getContext("webgpu");if(!r)throw new Error("Unable to acquire WebGPU context");let o=window.devicePixelRatio||1;const h=navigator.gpu.getPreferredCanvasFormat(),a={device:n,format:h,alphaMode:"premultiplied"};r.configure(a);const y=n.createSampler({magFilter:"linear",minFilter:"linear"}),u=n.createShaderModule({code:je}),d=.718,l=1.2,w=new Float32Array([-1*l,-1/d*l,0,1,1*l,-1/d*l,1,1,1*l,1/d*l,1,0,-1*l,1/d*l,0,0]),E=new Uint16Array([0,1,2,0,2,3]),$=n.createBuffer({size:w.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});n.queue.writeBuffer($,0,w);const g=n.createBuffer({size:E.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});n.queue.writeBuffer(g,0,E);const f=n.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),p=n.createRenderPipeline({layout:"auto",vertex:{module:u,entryPoint:"vertexMain",buffers:[{arrayStride:16,attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:8,format:"float32x2"}]}]},fragment:{module:u,entryPoint:"fragmentMain",targets:[{format:h,blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-list"}});let c=null,b=null,s=.5,m=.5,A=0,_=0,P=0,F=0;const O=performance.now();let R=1,U=1,Y,H=!1;function G(){window.clearTimeout(Y),s=.5,m=.5,A=0,_=0}function q(v=500){window.clearTimeout(Y),Y=window.setTimeout(()=>{G()},v)}function Z(){const v=t.getBoundingClientRect(),C=Math.min(v.height*.6,v.width-48),L=C/d,S=v.left+(v.width-C)/2,M=v.top+(v.height-L)/2;return{left:S,top:M,right:S+C,bottom:M+L,width:C,height:L,cardLeft:S,cardTop:M}}function J(v,C){s=Math.min(Math.max(v,0),1),m=Math.min(Math.max(C,0),1);const L=s-.5,S=m-.5;A=-L*(Math.PI/6),_=-S*(Math.PI/6)}function Q(v){const C=Z();if(!(v.clientX>=C.left&&v.clientX<=C.right&&v.clientY>=C.top&&v.clientY<=C.bottom)){H&&(H=!1,q());return}H=!0,window.clearTimeout(Y);const S=(v.clientX-C.cardLeft)/C.width,M=(v.clientY-C.cardTop)/C.height;J(S,M)}function ee(){H=!1,q()}function X(){o=window.devicePixelRatio||1;const v=e.getBoundingClientRect();R=Math.max(1,Math.round(v.width*o)),U=Math.max(1,Math.round(v.height*o)),(t.width!==R||t.height!==U)&&(t.width=R,t.height=U,r.configure(a))}new ResizeObserver(X).observe(e),window.addEventListener("resize",X),X();async function te(v){const L=await(await fetch(v)).blob(),S=await createImageBitmap(L);c&&c.destroy(),c=n.createTexture({size:[S.width,S.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),n.queue.copyExternalImageToTexture({source:S},{texture:c},[S.width,S.height]),b=n.createBindGroup({layout:p.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:f}},{binding:1,resource:y},{binding:2,resource:c.createView()}]})}function ie(){P+=(A-P)*.15,F+=(_-F)*.15;const v=(performance.now()-O)/1e3,C=new Float32Array([R,U,s,m,P,F,v,o]);if(n.queue.writeBuffer(f,0,C),!b)return;const L=n.createCommandEncoder(),M={colorAttachments:[{view:r.getCurrentTexture().createView(),clearValue:{r:.2235,g:.2314,b:.2706,a:1},loadOp:"clear",storeOp:"store"}]},D=L.beginRenderPass(M);D.setPipeline(p),D.setBindGroup(0,b),D.setVertexBuffer(0,$),D.setIndexBuffer(g,"uint16"),D.drawIndexed(E.length),D.end(),n.queue.submit([L.finish()])}return{updateTexture:te,handlePointerMove:Q,handlePointerLeave:ee,resetPointer:G,render:ie}}async function We(){ne();const t=document.querySelector("#webgpu-canvas"),e=document.querySelector("#css-card"),i=document.querySelector("#css-card-image"),n=document.querySelector(".pane-css .card__front"),r=document.querySelector(".pane-css .card__rotator"),o=document.querySelector(".pane-webgpu"),a=await(await fetch(k("cards.json"))).json(),u=Se(a,new Set),d=Ge(u,a),l=ke({cssCard:e,cssCardImage:i,cssCardFront:n,cssCardRotator:r}),w=await Ne({canvas:t,webgpuPane:o}),E=async(g,f)=>{const p=re(g.images.large);l.updateCard(g,p,f,u.variants[f]),await w.updateTexture(p)};Xe({cardLibrary:u,cards:a,initialCategory:d.category,initialCardId:d.card.id,onCardChange:E,onSelectionChange:(g,f)=>{qe(f,g)}}),r.addEventListener("pointermove",g=>{l.handlePointerMove(g)}),r.addEventListener("pointerleave",()=>{l.handlePointerLeave()}),r.addEventListener("blur",()=>{l.handleBlur()}),t.addEventListener("pointermove",g=>{w.handlePointerMove(g)}),t.addEventListener("pointerleave",()=>{w.handlePointerLeave()}),window.addEventListener("blur",()=>{w.resetPointer()});function $(){l.tick(),w.render(),requestAnimationFrame($)}requestAnimationFrame($)}We();
