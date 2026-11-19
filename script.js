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

 // Use the exact YouTube soundtrack selected by the user. Playback stays inside
 // YouTube's official embedded player; no audio is downloaded or re-hosted.
 const sound=document.getElementById('soundToggle');
 const frame=document.getElementById('youtubeFrame');
 const play=document.getElementById('playYoutube');
 let active=false;
 const embed='https://www.youtube-nocookie.com/embed/IxDvpoCmAaY?autoplay=1&playsinline=1&rel=0';
 const setSound=(on)=>{
   active=on;
   if(sound){
     sound.textContent=on?'SOUND ON':'PLAY BGM';
     sound.setAttribute('aria-pressed',String(on));
   }
 };
 const playTrack=()=>{
   if(!frame)return;
   frame.innerHTML='<iframe title="Jai birthday soundtrack" src="'+embed+'" allow="autoplay; encrypted-media; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
   setSound(true);
   document.getElementById('soundtrack')?.scrollIntoView({behavior:'smooth',block:'center'});
 };
 const stopTrack=()=>{
   if(frame)frame.innerHTML='<div class="youtube-placeholder"><span class="play-mark">▶</span><p>THE SOUNDTRACK IS READY</p><button id="playYoutube" type="button">PLAY THE MUSIC</button></div>';
   setSound(false);
   document.getElementById('playYoutube')?.addEventListener('click',playTrack,{once:true});
 };
 sound?.addEventListener('click',()=>active?stopTrack():playTrack());
 play?.addEventListener('click',playTrack);
 setSound(false);
})();