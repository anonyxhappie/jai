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

 // A deliberate tap on SOUND ON starts playback on mobile browsers.
 // Once started, the soundtrack loops and later interactions cannot control it.
 const audio=document.getElementById('birthdayAudio');
 const soundButton=document.getElementById('soundOn');
 const soundLabel=document.getElementById('soundLabel');
 if(audio && soundButton){
   audio.loop=true;
   soundButton.addEventListener('click',async()=>{
     if(!audio.paused)return;
     soundButton.disabled=true;
     if(soundLabel)soundLabel.textContent='STARTING…';
     try{
       await audio.play();
       soundButton.classList.add('is-on');
       soundButton.setAttribute('aria-label','Birthday music is on');
       if(soundLabel)soundLabel.textContent='SOUND ON';
     }catch(error){
       soundButton.disabled=false;
       if(soundLabel)soundLabel.textContent='TAP FOR SOUND';
     }
   });
 }
})();