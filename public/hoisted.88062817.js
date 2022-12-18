function g(t){return t===null?"null":typeof t}function y(t){return!!t&&typeof t=="object"}function w(t){if(t===void 0)return"";if(t===null||typeof t=="object"&&!t.constructor)return"Object";var e=/function ([^(]*)/.exec(t.constructor.toString());return e&&e.length>1?e[1]:""}function v(t,e,n){return t==="null"||t==="undefined"?t:(t!=="string"&&t!=="stringifiable"||(n='"'+n.replace(/"/g,'\\"')+'"'),t==="function"?e.toString().replace(/[\r\n]/g,"").replace(/\{.*\}/,"")+"{\u2026}":n)}function j(t){var e="";return y(t)?(e=w(t),Array.isArray(t)&&(e+="["+t.length+"]")):e=v(g(t),t,t),e}function s(t){return"json-formatter-"+t}function i(t,e,n){var r=document.createElement(t);return e&&r.classList.add(s(e)),n!==void 0&&(n instanceof Node?r.appendChild(n):r.appendChild(document.createTextNode(String(n)))),r}(function(t){if(t&&typeof window<"u"){var e=document.createElement("style");e.setAttribute("media","screen"),e.innerHTML=t,document.head.appendChild(e)}})(`.json-formatter-row {
  font-family: monospace;
}
.json-formatter-row,
.json-formatter-row a,
.json-formatter-row a:hover {
  color: black;
  text-decoration: none;
}
.json-formatter-row .json-formatter-row {
  margin-left: 1rem;
}
.json-formatter-row .json-formatter-children.json-formatter-empty {
  opacity: 0.5;
  margin-left: 1rem;
}
.json-formatter-row .json-formatter-children.json-formatter-empty:after {
  display: none;
}
.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-object:after {
  content: "No properties";
}
.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-array:after {
  content: "[]";
}
.json-formatter-row .json-formatter-string,
.json-formatter-row .json-formatter-stringifiable {
  color: green;
  white-space: pre;
  word-wrap: break-word;
}
.json-formatter-row .json-formatter-number {
  color: blue;
}
.json-formatter-row .json-formatter-boolean {
  color: red;
}
.json-formatter-row .json-formatter-null {
  color: #855A00;
}
.json-formatter-row .json-formatter-undefined {
  color: #ca0b69;
}
.json-formatter-row .json-formatter-function {
  color: #FF20ED;
}
.json-formatter-row .json-formatter-date {
  background-color: rgba(0, 0, 0, 0.05);
}
.json-formatter-row .json-formatter-url {
  text-decoration: underline;
  color: blue;
  cursor: pointer;
}
.json-formatter-row .json-formatter-bracket {
  color: blue;
}
.json-formatter-row .json-formatter-key {
  color: #00008B;
  padding-right: 0.2rem;
}
.json-formatter-row .json-formatter-toggler-link {
  cursor: pointer;
}
.json-formatter-row .json-formatter-toggler {
  line-height: 1.2rem;
  font-size: 0.7rem;
  vertical-align: middle;
  opacity: 0.6;
  cursor: pointer;
  padding-right: 0.2rem;
}
.json-formatter-row .json-formatter-toggler:after {
  display: inline-block;
  transition: transform 100ms ease-in;
  content: "\u25BA";
}
.json-formatter-row > a > .json-formatter-preview-text {
  opacity: 0;
  transition: opacity 0.15s ease-in;
  font-style: italic;
}
.json-formatter-row:hover > a > .json-formatter-preview-text {
  opacity: 0.6;
}
.json-formatter-row.json-formatter-open > .json-formatter-toggler-link .json-formatter-toggler:after {
  transform: rotate(90deg);
}
.json-formatter-row.json-formatter-open > .json-formatter-children:after {
  display: inline-block;
}
.json-formatter-row.json-formatter-open > a > .json-formatter-preview-text {
  display: none;
}
.json-formatter-row.json-formatter-open.json-formatter-empty:after {
  display: block;
}
.json-formatter-dark.json-formatter-row {
  font-family: monospace;
}
.json-formatter-dark.json-formatter-row,
.json-formatter-dark.json-formatter-row a,
.json-formatter-dark.json-formatter-row a:hover {
  color: white;
  text-decoration: none;
}
.json-formatter-dark.json-formatter-row .json-formatter-row {
  margin-left: 1rem;
}
.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty {
  opacity: 0.5;
  margin-left: 1rem;
}
.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty:after {
  display: none;
}
.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-object:after {
  content: "No properties";
}
.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-array:after {
  content: "[]";
}
.json-formatter-dark.json-formatter-row .json-formatter-string,
.json-formatter-dark.json-formatter-row .json-formatter-stringifiable {
  color: #31F031;
  white-space: pre;
  word-wrap: break-word;
}
.json-formatter-dark.json-formatter-row .json-formatter-number {
  color: #66C2FF;
}
.json-formatter-dark.json-formatter-row .json-formatter-boolean {
  color: #EC4242;
}
.json-formatter-dark.json-formatter-row .json-formatter-null {
  color: #EEC97D;
}
.json-formatter-dark.json-formatter-row .json-formatter-undefined {
  color: #ef8fbe;
}
.json-formatter-dark.json-formatter-row .json-formatter-function {
  color: #FD48CB;
}
.json-formatter-dark.json-formatter-row .json-formatter-date {
  background-color: rgba(255, 255, 255, 0.05);
}
.json-formatter-dark.json-formatter-row .json-formatter-url {
  text-decoration: underline;
  color: #027BFF;
  cursor: pointer;
}
.json-formatter-dark.json-formatter-row .json-formatter-bracket {
  color: #9494FF;
}
.json-formatter-dark.json-formatter-row .json-formatter-key {
  color: #23A0DB;
  padding-right: 0.2rem;
}
.json-formatter-dark.json-formatter-row .json-formatter-toggler-link {
  cursor: pointer;
}
.json-formatter-dark.json-formatter-row .json-formatter-toggler {
  line-height: 1.2rem;
  font-size: 0.7rem;
  vertical-align: middle;
  opacity: 0.6;
  cursor: pointer;
  padding-right: 0.2rem;
}
.json-formatter-dark.json-formatter-row .json-formatter-toggler:after {
  display: inline-block;
  transition: transform 100ms ease-in;
  content: "\u25BA";
}
.json-formatter-dark.json-formatter-row > a > .json-formatter-preview-text {
  opacity: 0;
  transition: opacity 0.15s ease-in;
  font-style: italic;
}
.json-formatter-dark.json-formatter-row:hover > a > .json-formatter-preview-text {
  opacity: 0.6;
}
.json-formatter-dark.json-formatter-row.json-formatter-open > .json-formatter-toggler-link .json-formatter-toggler:after {
  transform: rotate(90deg);
}
.json-formatter-dark.json-formatter-row.json-formatter-open > .json-formatter-children:after {
  display: inline-block;
}
.json-formatter-dark.json-formatter-row.json-formatter-open > a > .json-formatter-preview-text {
  display: none;
}
.json-formatter-dark.json-formatter-row.json-formatter-open.json-formatter-empty:after {
  display: block;
}
`);var O=/(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/,C=/\d{2}:\d{2}:\d{2} GMT-\d{4}/,P=/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/,p=window.requestAnimationFrame||function(t){return t(),0},l={hoverPreviewEnabled:!1,hoverPreviewArrayCount:100,hoverPreviewFieldCount:5,animateOpen:!0,animateClose:!0,theme:null,useToJSON:!0,sortPropertiesBy:null},b=function(){function t(e,n,r,o){n===void 0&&(n=1),r===void 0&&(r=l),this.json=e,this.open=n,this.config=r,this.key=o,this._isOpen=null,this.config.hoverPreviewEnabled===void 0&&(this.config.hoverPreviewEnabled=l.hoverPreviewEnabled),this.config.hoverPreviewArrayCount===void 0&&(this.config.hoverPreviewArrayCount=l.hoverPreviewArrayCount),this.config.hoverPreviewFieldCount===void 0&&(this.config.hoverPreviewFieldCount=l.hoverPreviewFieldCount),this.config.useToJSON===void 0&&(this.config.useToJSON=l.useToJSON),this.key===""&&(this.key='""')}return Object.defineProperty(t.prototype,"isOpen",{get:function(){return this._isOpen!==null?this._isOpen:this.open>0},set:function(e){this._isOpen=e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isDate",{get:function(){return this.json instanceof Date||this.type==="string"&&(O.test(this.json)||P.test(this.json)||C.test(this.json))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isUrl",{get:function(){return this.type==="string"&&this.json.indexOf("http")===0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isArray",{get:function(){return Array.isArray(this.json)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isObject",{get:function(){return y(this.json)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isEmptyObject",{get:function(){return!this.keys.length&&!this.isArray},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isEmpty",{get:function(){return this.isEmptyObject||this.keys&&!this.keys.length&&this.isArray},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"useToJSON",{get:function(){return this.config.useToJSON&&this.type==="stringifiable"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"hasKey",{get:function(){return this.key!==void 0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"constructorName",{get:function(){return w(this.json)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"type",{get:function(){return this.config.useToJSON&&this.json&&this.json.toJSON?"stringifiable":g(this.json)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"keys",{get:function(){if(this.isObject){var e=Object.keys(this.json);return!this.isArray&&this.config.sortPropertiesBy?e.sort(this.config.sortPropertiesBy):e}return[]},enumerable:!0,configurable:!0}),t.prototype.toggleOpen=function(){this.isOpen=!this.isOpen,this.element&&(this.isOpen?this.appendChildren(this.config.animateOpen):this.removeChildren(this.config.animateClose),this.element.classList.toggle(s("open")))},t.prototype.openAtDepth=function(e){e===void 0&&(e=1),e<0||(this.open=e,this.isOpen=e!==0,this.element&&(this.removeChildren(!1),e===0?this.element.classList.remove(s("open")):(this.appendChildren(this.config.animateOpen),this.element.classList.add(s("open")))))},t.prototype.getInlinepreview=function(){var e=this;if(this.isArray)return this.json.length>this.config.hoverPreviewArrayCount?"Array["+this.json.length+"]":"["+this.json.map(j).join(", ")+"]";var n=this.keys,r=n.slice(0,this.config.hoverPreviewFieldCount).map(function(a){return a+":"+j(e.json[a])}),o=n.length>=this.config.hoverPreviewFieldCount?"\u2026":"";return"{"+r.join(", ")+o+"}"},t.prototype.render=function(){this.element=i("div","row");var e=this.isObject?i("a","toggler-link"):i("span");if(this.isObject&&!this.useToJSON&&e.appendChild(i("span","toggler")),this.hasKey&&e.appendChild(i("span","key",this.key+":")),this.isObject&&!this.useToJSON){var n=i("span","value"),r=i("span"),o=i("span","constructor-name",this.constructorName);if(r.appendChild(o),this.isArray){var a=i("span");a.appendChild(i("span","bracket","[")),a.appendChild(i("span","number",this.json.length)),a.appendChild(i("span","bracket","]")),r.appendChild(a)}n.appendChild(r),e.appendChild(n)}else{(n=this.isUrl?i("a"):i("span")).classList.add(s(this.type)),this.isDate&&n.classList.add(s("date")),this.isUrl&&(n.classList.add(s("url")),n.setAttribute("href",this.json));var f=v(this.type,this.json,this.useToJSON?this.json.toJSON():this.json);n.appendChild(document.createTextNode(f)),e.appendChild(n)}if(this.isObject&&this.config.hoverPreviewEnabled){var m=i("span","preview-text");m.appendChild(document.createTextNode(this.getInlinepreview())),e.appendChild(m)}var d=i("div","children");return this.isObject&&d.classList.add(s("object")),this.isArray&&d.classList.add(s("array")),this.isEmpty&&d.classList.add(s("empty")),this.config&&this.config.theme&&this.element.classList.add(s(this.config.theme)),this.isOpen&&this.element.classList.add(s("open")),this.element.appendChild(e),this.element.appendChild(d),this.isObject&&this.isOpen&&this.appendChildren(),this.isObject&&!this.useToJSON&&e.addEventListener("click",this.toggleOpen.bind(this)),this.element},t.prototype.appendChildren=function(e){var n=this;e===void 0&&(e=!1);var r=this.element.querySelector("div."+s("children"));if(r&&!this.isEmpty)if(e){var o=0,a=function(){var f=n.keys[o],m=new t(n.json[f],n.open-1,n.config,f);r.appendChild(m.render()),(o+=1)<n.keys.length&&(o>10?a():p(a))};p(a)}else this.keys.forEach(function(f){var m=new t(n.json[f],n.open-1,n.config,f);r.appendChild(m.render())})},t.prototype.removeChildren=function(e){e===void 0&&(e=!1);var n=this.element.querySelector("div."+s("children"));if(e){var r=0,o=function(){n&&n.children.length&&(n.removeChild(n.children[0]),(r+=1)>10?o():p(o))};p(o)}else n&&(n.innerHTML="")},t}();const u="https://the-infinity-train-api.deno.dev/api",h=t=>document.querySelector(t),A=h(".form-send-api"),N=h(".input-api"),c=h(".response"),k=async t=>{if(t==="init"){const o=await(await fetch(`${u}/test`)).text();return o}return await(await fetch(`${u}${t}`)).json()},x=await k("init"),E=new b(x,3,{theme:"white"});c.appendChild(E.render());A.addEventListener("submit",async t=>{t.preventDefault(),c.firstChild&&c.removeChild(c.firstChild);const e=await k(N.value),n=new b(e,3,{theme:"white"});c.appendChild(n.render())});
