// sidebar3: reveal scrollbars while scrolling — pairs with /scrollbars.css.
// One capture-phase document listener; tags the scrolled container with
// .is-scrolling and clears it ~700ms after the last scroll event. No polling.
(function(){
  const timers=new WeakMap();
  document.addEventListener('scroll',(e)=>{
    let el=e.target;
    if(el===document||el===window) el=document.scrollingElement||document.documentElement;
    if(!el||!el.classList) return;
    el.classList.add('is-scrolling');
    clearTimeout(timers.get(el));
    timers.set(el,setTimeout(()=>el.classList.remove('is-scrolling'),700));
  },true);
})();
