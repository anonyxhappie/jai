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

 // Start immediately on the visitor's tap, positioned at 00:10 in the track.
 const gate=document.getElementById('surpriseGate'),enter=document.getElementById('surpriseButton'),audio=document.getElementById('birthdayAudio');
 if(gate&&enter) enter.addEventListener('click',()=>{
   if(audio){
     audio.loop=true;
     try{audio.currentTime=10;}catch(error){}
     const playback=audio.play();
     if(playback&&playback.catch) playback.catch(()=>{
       const retry=()=>{
         try{audio.currentTime=10;}catch(error){}
         audio.play().catch(()=>{});
       };
       if(audio.readyState>=1)retry();
       else audio.addEventListener('loadedmetadata',retry,{once:true});
     });
   }
   gate.hidden=true;
   document.body.classList.add('surprise-entered');
 },{once:true});
})();