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
 // Start playback in the tap gesture. Seek after metadata is available:
 // setting currentTime before metadata loads is ignored by some browsers.
 const gate=document.getElementById('surpriseGate'),enter=document.getElementById('surpriseButton'),audio=document.getElementById('birthdayAudio');
 if(gate&&enter) enter.addEventListener('click',()=>{
   if(audio){
     audio.loop=true;
     const seekToTen=()=>{
       try{if(Number.isFinite(audio.duration)&&audio.duration>10)audio.currentTime=10;}catch(error){}
     };
     if(audio.readyState>=1)seekToTen();
     else audio.addEventListener('loadedmetadata',seekToTen,{once:true});
     const playback=audio.play();
     if(playback&&playback.catch)playback.catch(()=>{});
   }
   gate.hidden=true;
   document.body.classList.add('surprise-entered');
 },{once:true});
})();