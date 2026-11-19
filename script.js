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
 const audio=document.getElementById('birthdayAudio'),toggle=document.getElementById('musicToggle'),label=document.getElementById('musicLabel');
 const setPlaying=playing=>{
   if(!toggle)return;
   toggle.classList.toggle('is-playing',playing);
   toggle.setAttribute('aria-pressed',String(playing));
   toggle.setAttribute('aria-label',playing?'Pause birthday music':'Play birthday music');
   if(label)label.textContent=playing?'MUSIC PLAYING · PAUSE':'PLAY THE MUSIC';
 };
 toggle?.addEventListener('click',async()=>{
   if(!audio)return;
   if(!audio.paused){audio.pause();setPlaying(false);return;}
   try{await audio.play();setPlaying(true);}
   catch(error){if(label)label.textContent='TAP TO TRY MUSIC';setPlaying(false);}
 });
 audio?.addEventListener('pause',()=>setPlaying(false));
 audio?.addEventListener('play',()=>setPlaying(true));
})();