import{a as e,u as o,b as t,p as r,l as s,A as l,y as a,m as n}from"../index.4bf87375.js";import{A as i}from"./AuthErrorHandler.55d4b9a8.js";import{L as c}from"./LoadingIndicator.f4e3707b.js";const u=(e,o)=>{const{name:t,value:r}=o.target;return{...e,[t]:r}};export default function(){const m=e(),{logout:p,resetErrors:d,user:f,updateUserDetails:g}=o(e=>({logout:e.logout,resetErrors:e.resetErrors,updateUserDetails:e.updateUserDetails,user:e.user})),b=t(),[$,v]=r(u,{image:f.image,username:f.username,bio:f.bio,email:f.email,password:""}),[h,w]=s(!1),y=l(async()=>{(function(e){let o=void 0,t=e[0],r=1;for(;r<e.length;){const s=e[r],l=e[r+1];if(r+=2,("optionalAccess"===s||"optionalCall"===s)&&null==t)return;"access"===s||"optionalAccess"===s?(o=t,t=l(t)):"call"!==s&&"optionalCall"!==s||(t=l((...e)=>t.call(o,...e)),o=void 0)}return t})([b,"access",e=>e.current,"optionalAccess",e=>e.checkValidity,"call",e=>e()])&&(w(!0),await g($),m.route("/@"+$.username))},[m,$,g]);return a(()=>{d()},[d]),n`<div class="settings-page"><div class="container page"><div class="row"><div class="col-md-6 offset-md-3 col-xs-12"><h1 class="text-xs-center">Your Settings</h1><${i}/><form ref=${b} onSubmit=${y} action="javascript:"><fieldset><fieldset class="form-group"><input class="form-control" type="url" name="image" placeholder="URL of profile picture" value=${$.image} onInput=${v}/></fieldset><fieldset class="form-group"><input class="form-control form-control-lg" type="text" name="username" placeholder="Username" value=${$.username} onInput=${v}/></fieldset><fieldset class="form-group"><textarea class="form-control form-control-lg" name="bio" placeholder="Short bio about you" rows=${8} value=${$.bio} onInput=${v}/></fieldset><fieldset class="form-group"><input class="form-control form-control-lg" type="email" name="email" placeholder="Email" required value=${$.email} onInput=${v}/></fieldset><fieldset class="form-group"><input class="form-control form-control-lg" type="password" name="password" placeholder="Password" required pattern=".{8,}" autocomplete="new-password" value=${$.password} onInput=${v}/></fieldset><button class="btn btn-lg btn-primary pull-xs-right" type="submit">Update Settings<${c} show=${h} style=${{marginLeft:"0.5rem"}} strokeColor="#fff" width="1em"/></button></fieldset></form><hr/><button class="btn btn-outline-danger" onClick=${()=>{p(),m.route("/")}}>Or click here to logout.</button></div></div></div></div>`}