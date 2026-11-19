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

 // Start on the first user touch/click. Remove the one-shot listener
 // immediately so later scrolling, taps, and clicks never affect music.
 const audio=document.getElementById('birthdayAudio');
 if(audio){
   audio.loop=true;
   let started=false;
   const startMusic=()=>{
     if(started)return;
     started=true;
     document.removeEventListener('pointerdown',startMusic,true);
     audio.play().catch(()=>{});
   };
   document.addEventListener('pointerdown',startMusic,{capture:true,passive:true});
 }
})();