(() => {
 const nav = document.querySelector('#menu');
 const hamburger = document.querySelector('.hamb');
 function setMenu(open){if(!nav||!hamburger)return; nav.classList.toggle('is-open',open);hamburger.setAttribute('aria-expanded',String(open));}
 hamburger?.addEventListener('click',()=>setMenu(hamburger.getAttribute('aria-expanded')!=='true'));
 nav?.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false);});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&hamburger?.getAttribute('aria-expanded')==='true'){setMenu(false);hamburger.focus();}});
 const cfg=window.K1_CONFIG||{};
 function allowed(raw,kind){if(!raw||typeof raw!=='string'||!raw.trim())return null;try{const u=new URL(raw,location.href);if(kind==='post')return u.protocol==='https:'&&location.protocol==='https:'&&u.origin===location.origin?u:null;return u.protocol==='https:'||(kind==='partner'&&u.protocol==='mailto:')?u:null;}catch{return null;}}
 const partner=allowed(cfg.partnerUrl,'partner'), partnerEl=document.querySelector('[data-partner]');
 if(partner&&partnerEl){partnerEl.href=partner.href;partnerEl.hidden=false;}
 const form=document.querySelector('#notify-form');
 const endpoint=allowed(cfg.signupEndpoint,'post'), privacy=allowed(cfg.privacyUrl,'privacy');
 if(!form||!endpoint||!privacy||!cfg.noticeVersion?.trim()||!cfg.consentText?.trim())return;
 const fallback=document.querySelector('#notify-fallback'), desc=document.querySelector('#signup-detail');
 const policy=form.querySelector('[data-privacy]'), consentCopy=form.querySelector('[data-consent]');
 policy.href=privacy.href;policy.hidden=false;consentCopy.textContent=cfg.consentText;
 desc.textContent='K1의 첫 출시 소식을 이메일로 안내해 드립니다. 이 신청은 주문이 아닙니다.';
 fallback.hidden=true;form.hidden=false;
 const status=form.querySelector('[role=status]'), submit=form.querySelector('button[type=submit]');
 form.addEventListener('submit',async e=>{e.preventDefault();if(submit.disabled||!form.reportValidity())return;
 const email=form.elements.email.value.trim();submit.disabled=true;status.textContent='신청을 보내는 중입니다.';
 try{const resp=await fetch(endpoint.href,{method:'POST',mode:'same-origin',credentials:'same-origin',redirect:'error',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({email,consent:true,noticeVersion:cfg.noticeVersion})});
 if(resp.status===409){status.textContent='이미 신청된 주소이거나 신청을 처리할 수 없습니다.';return;}
 if(!resp.ok)throw Error('response');const data=await resp.json();if(data?.ok!==true)throw Error('response');form.reset();status.textContent='출시 알림 신청이 완료됐습니다.';
 }catch{status.textContent='지금은 신청을 처리할 수 없습니다. 잠시 후 다시 시도해 주세요.';}finally{submit.disabled=false;}});
})();