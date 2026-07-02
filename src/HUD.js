export default class HUD{
constructor(){
this.el=document.createElement('div');
Object.assign(this.el.style,{position:'absolute',left:'20px',bottom:'20px',color:'#fff',font:'bold 22px Arial',background:'rgba(0,0,0,.35)',padding:'10px 14px',borderRadius:'8px'});
document.body.appendChild(this.el);}
update(speed){this.el.innerHTML=`Speed: ${speed.toFixed(0)} KM/H`;}}
