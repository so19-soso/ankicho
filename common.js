const S={get(k,d){try{const v=JSON.parse(localStorage.getItem('ankicho:'+k));return v==null?d:v}catch(e){return d}},set(k,v){try{localStorage.setItem('ankicho:'+k,JSON.stringify(v))}catch(e){}}};
function applyTheme(){const t=S.get('theme',{p:'lavender',m:'auto'}),r=document.documentElement;r.dataset.p=t.p;r.dataset.m=t.m;return t}
applyTheme();
function parseCSV(t){t=t.replace(/^\uFEFF/,'');const rows=[];let r=[],f='',q=false;
for(let i=0;i<t.length;i++){const c=t[i];
if(q){if(c=='"'){if(t[i+1]=='"'){f+='"';i++}else q=false}else f+=c}
else if(c=='"'&&f==='')q=true;
else if(c==','){r.push(f);f=''}
else if(c=='\n'||c=='\r'){if(c=='\r'&&t[i+1]=='\n')i++;r.push(f);rows.push(r);r=[];f=''}
else f+=c}
if(f!==''||r.length){r.push(f);rows.push(r)}
return rows}
function toCSV(rows){return rows.map(r=>r.map(f=>/[",\n\r]/.test(f)?'"'+f.replace(/"/g,'""')+'"':f).join(',')).join('\r\n')}
function download(name,text){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\uFEFF'+text],{type:'text/csv;charset=utf-8'}));a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
