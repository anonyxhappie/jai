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

 // Original South-Indian-cinema-inspired instrumental motif, synthesized locally.
 // No film score, recording, lyrics, or external audio asset is used.
 const sound=document.getElementById('soundToggle');
 let ctx=null,master=null,playing=false,pending=true,starting=false,loopTimer=null,beatTimer=null;
 const toast=(message)=>{
   const el=document.getElementById('toast');if(!el)return;
   el.textContent=message;el.classList.add('show');
   clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),3600);
 };
 const setState=(mode)=>{
   if(!sound)return;
   const active=mode==='on';
   sound.textContent=mode==='blocked'?'TAP FOR SOUND':active?'SOUND ON':'SOUND OFF';
   sound.setAttribute('aria-pressed',String(active));
   sound.classList.toggle('is-playing',active);
   sound.dataset.audioState=mode;
 };
 const tone=(frequency,start,duration,volume,type='sine',endFrequency=frequency)=>{
   const osc=ctx.createOscillator(),gain=ctx.createGain(),filter=ctx.createBiquadFilter();
   osc.type=type;osc.frequency.setValueAtTime(frequency,start);
   if(endFrequency!==frequency)osc.frequency.exponentialRampToValueAtTime(Math.max(20,endFrequency),start+duration);
   filter.type='lowpass';filter.frequency.value=type==='sawtooth'?1500:3200;
   gain.gain.setValueAtTime(.0001,start);
   gain.gain.exponentialRampToValueAtTime(volume,start+.045);
   gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
   osc.connect(filter);filter.connect(gain);gain.connect(master);
   osc.start(start);osc.stop(start+duration+.03);
 };
 const makeDrone=()=>{
   // Warm string-like tonic and fifth, with a subtle upper harmonic shimmer.
   [[73.42,.035,'triangle'],[110,.023,'sine'],[146.83,.012,'triangle'],[220,.008,'sine']].forEach(([hz,vol,type])=>{
     const o=ctx.createOscillator(),g=ctx.createGain(),lp=ctx.createBiquadFilter();
     o.type=type;o.frequency.value=hz;lp.type='lowpass';lp.frequency.value=900;
     g.gain.value=0;g.gain.setValueAtTime(.0001,ctx.currentTime);
     g.gain.linearRampToValueAtTime(vol,ctx.currentTime+2.8);
     o.connect(lp);lp.connect(g);g.connect(master);o.start();
   });
 };
 const melody=[293.66,349.23,392,440,392,349.23,293.66,261.63,293.66,349.23,440,523.25,440,392,349.23,293.66];
 let noteIndex=0,bar=0;
 const playPhrase=()=>{
   if(!playing||!ctx)return;
   const t=ctx.currentTime+.04;
   const hz=melody[noteIndex++%melody.length];
   // A gentle portamento lead, with a soft octave response like a cinematic flute/veena blend.
   tone(hz,t,1.05,.042,'triangle',hz*1.012);
   if(noteIndex%4===0)tone(hz/2,t+.08,1.35,.018,'sine');
   if(noteIndex%8===0)tone(hz*1.5,t+.16,1.6,.012,'sine');
   bar++;
 };
 const percussion=()=>{
   if(!playing||!ctx)return;
   const t=ctx.currentTime;
   // Restrained low cinematic thump and bright, muted tick; no sampled audio.
   tone(58,t,.32,.10,'sine',34);
   if(bar%2===0)tone(880,t+.12,.055,.009,'triangle',620);
 };
 const start=async()=>{
   if(starting)return false;
   starting=true;
   const AC=window.AudioContext||window.webkitAudioContext;
   if(!AC){starting=false;setState('blocked');toast('This browser does not support audio.');return false;}
   try{
     if(!ctx){
       ctx=new AC();
       master=ctx.createGain();master.gain.value=0;master.connect(ctx.destination);
       const comp=ctx.createDynamicsCompressor();
       // Re-route through a gentle compressor for phone speakers.
       master.disconnect();master.connect(comp);comp.connect(ctx.destination);
       makeDrone();
     }
     await ctx.resume();
     if(ctx.state!=='running'){starting=false;pending=true;setState('blocked');return false;}
     if(playing){starting=false;return true;}
     playing=true;pending=false;setState('on');
     const now=ctx.currentTime;
     master.gain.cancelScheduledValues(now);
     master.gain.setValueAtTime(master.gain.value,now);
     master.gain.linearRampToValueAtTime(.82,now+2.2);
     playPhrase();percussion();
     clearInterval(loopTimer);clearInterval(beatTimer);
     loopTimer=setInterval(playPhrase,1150);
     beatTimer=setInterval(percussion,2300);
     starting=false;
     return true;
   }catch(e){starting=false;pending=true;setState('blocked');return false;}
 };
 const stop=()=>{
   if(!ctx||!master){playing=false;setState('off');return;}
   const now=ctx.currentTime;master.gain.cancelScheduledValues(now);
   master.gain.setValueAtTime(master.gain.value,now);
   master.gain.linearRampToValueAtTime(.0001,now+.8);
   playing=false;pending=false;clearInterval(loopTimer);clearInterval(beatTimer);
   setState('off');
   setTimeout(()=>{if(!playing)ctx?.suspend().catch(()=>{});},900);
 };
 sound?.addEventListener('click',()=>{if(playing)stop();else start();});
 // Try to start by default. iOS/Safari may block audible autoplay; the first touch
 // anywhere on the page then starts the score without requiring a separate button tap.
 setState('blocked');
 const tryAutoplay=()=>start();
 if(document.readyState==='complete')tryAutoplay();
 else window.addEventListener('load',tryAutoplay,{once:true});
 const unlock=()=>{
   if(pending&&!playing)start();
   if(!pending||playing){
     document.removeEventListener('pointerdown',unlock);
     document.removeEventListener('keydown',unlock);
     document.removeEventListener('touchstart',unlock);
   }
 };
 document.addEventListener('pointerdown',unlock,{passive:true});
 document.addEventListener('touchstart',unlock,{passive:true});
 document.addEventListener('keydown',unlock);
 document.addEventListener('visibilitychange',()=>{
   if(document.hidden&&playing)stop();
 });
})();