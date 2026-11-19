(() => {
 const photos=[...document.querySelectorAll('.photo img')],box=document.getElementById('lightbox'),large=document.getElementById('lightboxImage');
 photos.forEach(img=>{
   const card=img.closest('figure');
   img.addEventListener('error',()=>{if(card)card.hidden=true;});
   img.addEventListener('click',()=>{if(!img.naturalWidth)return;large.src=img.src;large.alt=img.alt;box.hidden=false});
 });
 const close=()=>{box.hidden=true;large.removeAttribute('src')};
 document.getElementById('closeLightbox')?.addEventListener('click',close);
 box?.addEventListener('click',e=>{if(e.target===box)close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 const wish=document.getElementById('wishButton'),sign=document.getElementById('signoff');
 wish?.addEventListener('click',()=>{if(sign)sign.textContent='Wishing you a year as extraordinary as you are. ❤️';wish.innerHTML='WISH SENT <b>✦</b>';});
 // Begin silently in the button's user gesture for mobile Safari permission.
 // After ten seconds, rewind and unmute so the song starts audibly from 0:00.
 const gate=document.getElementById('surpriseGate'),enter=document.getElementById('surpriseButton'),audio=document.getElementById('birthdayAudio');
 if(gate&&enter) enter.addEventListener('click',()=>{
   if(audio){
     audio.loop=true; audio.muted=true; audio.volume=1;
     const p=audio.play(); if(p&&p.catch)p.catch(()=>{});
     window.setTimeout(()=>{audio.currentTime=0;audio.muted=false;},10000);
   }
   gate.hidden=true; document.body.classList.add('surprise-entered');
 },{once:true});
})();