(() => {
  const frame = document.getElementById("portrait");
  const photo = document.getElementById("hero-photo");
  if (!frame || !photo) return;
  const reveal = () => { frame.hidden = false; };
  photo.addEventListener("load", reveal, { once: true });
  photo.addEventListener("error", () => { frame.hidden = true; }, { once: true });
  if (photo.complete && photo.naturalWidth > 0) reveal();
})();