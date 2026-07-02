export default class LoadingScreen{
constructor(){
this.el=document.createElement('div');
this.el.style.cssText='position:fixed;inset:0;background:#111;color:#fff;display:flex;align-items:center;justify-content:center;font:24px Arial;z-index:9999';
this.el.textContent='Loading...';
document.body.appendChild(this.el);}
hide(){this.el.remove();}
}