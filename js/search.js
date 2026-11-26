(function(){
var s=document.currentScript,base=(s&&s.getAttribute("data-base"))||"",idx=null,loading=false,sel=-1;
var btn=document.getElementById("srch-btn");if(!btn)return;
var o=document.createElement("div");o.className="srch";o.setAttribute("role","dialog");o.setAttribute("aria-modal","true");o.setAttribute("aria-label","Rechercher dans le site");
o.innerHTML='<div class="srch-box"><div class="srch-top"><input type="search" placeholder="Rechercher : fiches, armes, sécurité…" aria-label="Mots recherchés" autocomplete="off"><button type="button">Fermer</button></div><div class="srch-res" aria-live="polite"></div></div>';
document.body.appendChild(o);
var inp=o.querySelector("input"),res=o.querySelector(".srch-res");
function norm(t){return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[’']/g," ");}
function esc(t){return t.replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function load(cb){if(idx)return cb();if(loading)return;loading=true;var sc=document.createElement("script");sc.src=base+"js/search-index.js";sc.onload=function(){idx=(window.MTS_IDX||[]).map(function(e){e.nt=norm(e.t);e.np=norm(e.p);e.nx=norm(e.x);return e;});cb();};document.head.appendChild(sc);}
function open(){o.classList.add("open");document.documentElement.style.overflow="hidden";inp.value="";res.innerHTML='<div class="srch-msg">Tapez un ou plusieurs mots.</div>';setTimeout(function(){inp.focus();},30);load(function(){if(inp.value)run();});}
function close(){o.classList.remove("open");document.documentElement.style.overflow="";btn.focus();}
function snip(e,ws){var i=-1;for(var k=0;k<ws.length&&i<0;k++)i=e.nx.indexOf(ws[k]);var a=Math.max(0,i-60),t=e.x.slice(a,a+190);var h=esc(t);
 ws.forEach(function(w){var n=norm(t),out="",p=0,j;while((j=n.indexOf(w,p))>=0){out+=esc(t.slice(p,j))+"<mark>"+esc(t.slice(j,j+w.length))+"</mark>";p=j+w.length;}h=out+esc(t.slice(p));});
 return(a>0?"… ":"")+h+(a+190<e.x.length?" …":"");}
function run(){if(!idx){res.innerHTML='<div class="srch-msg">Chargement…</div>';return;}
 var ws=norm(inp.value).split(/\s+/).filter(function(w){return w.length>1;});sel=-1;
 if(!ws.length){res.innerHTML='<div class="srch-msg">Tapez un ou plusieurs mots.</div>';return;}
 var r=[];idx.forEach(function(e){var sc=0;for(var k=0;k<ws.length;k++){var w=ws[k],ok=false;if(e.nt.indexOf(w)>=0){sc+=10;ok=true;}if(e.np.indexOf(w)>=0){sc+=3;ok=true;}var c=e.nx.split(w).length-1;if(c){sc+=Math.min(c,5);ok=true;}if(!ok)return;}r.push([sc,e]);});
 r.sort(function(a,b){return b[0]-a[0];});
 if(!r.length){res.innerHTML='<div class="srch-msg">Aucun résultat pour « '+esc(inp.value)+' ».</div>';return;}
 res.innerHTML=r.slice(0,30).map(function(x){var e=x[1];return'<a href="'+base+e.u+'"><b>'+esc(e.t)+'</b><small>'+esc(e.p)+'</small><p>'+snip(e,ws)+'</p></a>';}).join("")+(r.length>30?'<div class="srch-msg">'+r.length+' résultats : précisez la recherche.</div>':"");}
function mark(){var a=res.querySelectorAll("a");a.forEach(function(x,i){x.classList.toggle("sel",i===sel);});if(a[sel])a[sel].scrollIntoView({block:"nearest"});}
btn.addEventListener("click",open);
o.querySelector(".srch-top button").addEventListener("click",close);
o.addEventListener("click",function(e){if(e.target===o)close();if(e.target.closest("a"))close();});
inp.addEventListener("input",run);
inp.addEventListener("keydown",function(e){var a=res.querySelectorAll("a");
 if(e.key==="ArrowDown"){sel=Math.min(sel+1,a.length-1);mark();e.preventDefault();}
 else if(e.key==="ArrowUp"){sel=Math.max(sel-1,0);mark();e.preventDefault();}
 else if(e.key==="Enter"){var t=a[sel<0?0:sel];if(t){close();location.href=t.href;}}});
document.addEventListener("keydown",function(e){
 if(e.key==="Escape"&&o.classList.contains("open"))close();
 else if(!o.classList.contains("open")&&(e.key==="/"||(e.key==="k"&&(e.ctrlKey||e.metaKey)))&&!/INPUT|TEXTAREA|SELECT/.test((e.target.tagName||""))){e.preventDefault();open();}});
var tt=document.createElement("button");tt.type="button";tt.className="totop";tt.setAttribute("aria-label","Haut de page");tt.title="Haut de page";tt.innerHTML="&#8593;";document.body.appendChild(tt);
tt.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"});});
function tog(){tt.classList.toggle("on",window.scrollY>600);}window.addEventListener("scroll",tog,{passive:true});tog();
})();
