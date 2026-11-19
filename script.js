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

 // Start automatically; if the browser blocks audible autoplay, retry on the
 // visitor's first interaction. There is intentionally no playback control.
 const audio=document.getElementById('birthdayAudio');
 if(audio){
   audio.loop=true;
   const startMusic=()=>{
     audio.play().then(()=>{
       document.removeEventListener('pointerdown',startMusic);
       document.removeEventListener('keydown',startMusic);
       document.removeEventListener('touchstart',startMusic);
     }).catch(()=>{});
   };
   startMusic();
   document.addEventListener('pointerdown',startMusic,{passive:true});
   document.addEventListener('touchstart',startMusic,{passive:true});
   document.addEventListener('keydown',startMusic);
 }
})();