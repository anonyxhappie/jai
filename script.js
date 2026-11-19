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

 // Original, locally generated ambient birthday score. No external audio file or autoplay.
 const sound=document.getElementById('soundToggle');
 let audioContext=null, master=null, voices=[], notesTimer=null, playing=false;
 const toast=(message)=>{
   const el=document.getElementById('toast');
   if(!el)return;
   el.textContent=message;el.classList.add('show');
   window.clearTimeout(toast.timer);toast.timer=window.setTimeout(()=>el.classList.remove('show'),3200);
 };
 const setSoundState=(on)=>{
   playing=on;
   sound?.setAttribute('aria-pressed',String(on));
   if(sound){sound.textContent=on?'SOUND ON':'SOUND OFF';sound.classList.toggle('is-playing',on);}
 };
 const startMusic=async()=>{
   const AudioCtx=window.AudioContext||window.webkitAudioContext;
   if(!AudioCtx){toast('Audio is not supported in this browser.');return;}
   try{
     if(!audioContext){
       audioContext=new AudioCtx();
       master=audioContext.createGain();
       master.gain.value=0;
       master.connect(audioContext.destination);
       const filter=audioContext.createBiquadFilter();
       filter.type='lowpass';filter.frequency.value=1250;filter.Q.value=.45;
       filter.connect(master);
       // Soft sustained C-major / A-minor colour, deliberately quiet under the tribute.
       [130.81,196,261.63,329.63].forEach((frequency,index)=>{
         const osc=audioContext.createOscillator(),gain=audioContext.createGain();
         osc.type=index===1?'sine':'triangle';osc.frequency.value=frequency;
         gain.gain.value=[.105,.065,.045,.025][index];
         osc.connect(gain);gain.connect(filter);osc.start();voices.push(osc);
       });
       const lfo=audioContext.createOscillator(),lfoGain=audioContext.createGain();
       lfo.frequency.value=.075;lfoGain.gain.value=180;lfo.connect(lfoGain);lfoGain.connect(filter.frequency);lfo.start();voices.push(lfo);
       const sequence=[392,440,523.25,493.88,392,329.63,349.23,392];
       let step=0;
       const playNote=()=>{
         if(!audioContext||!master||!playing)return;
         const now=audioContext.currentTime,osc=audioContext.createOscillator(),gain=audioContext.createGain();
         osc.type='sine';osc.frequency.value=sequence[step++%sequence.length];
         gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.026,now+.18);
         gain.gain.exponentialRampToValueAtTime(.0001,now+1.7);
         osc.connect(gain);gain.connect(master);osc.start(now);osc.stop(now+1.75);
       };
       master._playNote=playNote;
     }
     await audioContext.resume();
     setSoundState(true);
     const now=audioContext.currentTime;
     master.gain.cancelScheduledValues(now);
     master.gain.setValueAtTime(master.gain.value,now);
     master.gain.linearRampToValueAtTime(.72,now+1.8);
     master._playNote?.();
     window.clearInterval(notesTimer);
     notesTimer=window.setInterval(()=>master?._playNote?.(),2200);
   }catch(error){
     setSoundState(false);
     toast('Tap SOUND again to enable audio in your browser.');
   }
 };
 const stopMusic=()=>{
   if(!audioContext||!master){setSoundState(false);return;}
   const now=audioContext.currentTime;
   master.gain.cancelScheduledValues(now);
   master.gain.setValueAtTime(master.gain.value,now);
   master.gain.linearRampToValueAtTime(.0001,now+.65);
   window.clearInterval(notesTimer);notesTimer=null;
   window.setTimeout(()=>{if(!playing)audioContext?.suspend().catch(()=>{});},750);
   setSoundState(false);
 };
 sound?.addEventListener('click',()=>playing?stopMusic():startMusic());
 document.addEventListener('visibilitychange',()=>{
   if(document.hidden&&playing)stopMusic();
 });
})();