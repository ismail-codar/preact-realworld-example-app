import{a as s,l as a,y as i,m as o,u as l,L as t}from"../index.4bf87375.js";import{A as e,P as n}from"./Pagination.45513a40.js";import{L as c}from"./LoadingIndicator.f4e3707b.js";import{a as r}from"./article.12519bc5.js";import{a as d,b as f,c as u}from"./profile.4c5b4947.js";import{D as v}from"./constants.74db8a6c.js";function m(s){let a=void 0,i=s[0],o=1;for(;o<s.length;){const l=s[o],t=s[o+1];if(o+=2,("optionalAccess"===l||"optionalCall"===l)&&null==i)return;"access"===l||"optionalAccess"===l?(a=i,i=t(i)):"call"!==l&&"optionalCall"!==l||(i=t((...s)=>i.call(a,...s)),a=void 0)}return i}export default function(p){const $=m([p,"access",s=>s.username,"optionalAccess",s=>s.replace,"call",s=>s(/^@/,"")])||"",{url:g}=s(),[b,w]=a({}),[h,y]=a([]),[A,j]=a(0),[x,C]=a(1),[P,L]=a(!1);return i(()=>{!async function(){w(await u($))}()},[$]),i(()=>{!async function(){L(!0);const{articles:s,articlesCount:a}=await r(x,{[/.*\/favorites/g.test(g)?"favorited":"author"]:$});y(s),j(a),L(!1)}()},[g,x,$]),o`<div class="profile-page"><div class="user-info"><div class="container"><div class="row"><div class="col-xs-12 col-md-10 offset-md-1"><img src=${b.image||v} class="user-img"/><h4>${$}</h4><p>${b.bio}</p>${$==l(s=>m([s,"access",s=>s.user,"optionalAccess",s=>s.username]))?o`<${t} href="/settings" class="btn btn-sm btn-outline-secondary action-btn"><i class="ion-gear-a"/>Edit Profile Settings<//>`:o`<button class="btn btn-sm btn-outline-secondary action-btn" onClick=${async()=>{b.following?(w(s=>({...s,following:!1})),await d($)):(w(s=>({...s,following:!0})),await f($))}}><i class="ion-plus-round"/>${b.following?"Unfollow":"Follow"} ${$}</button>`}</div></div></div></div><div class="container"><div class="row"><div class="col-xs-12 col-md-10 offset-md-1"><div class="articles-toggle"><ul class="nav nav-pills outline-active"><li class="nav-item"><${t} href=${"/@"+b.username}>My Articles<//></li><li class="nav-item"><${t} href=${`/@${b.username}/favorites`}>Favorited Articles<//></li></ul></div>${P?o`<${c} show=${P} style=${{margin:"1rem auto",display:"flex"}} width="2em"/>`:h.length>0?h.map(s=>o`<${e} key=${s.slug} article=${s}/>`):o`<div class="article-preview">No articles are here... yet.</div>`}<${n} count=${A} page=${x} setPage=${C}/></div></div></div></div>`}