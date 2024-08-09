let wood = 0
let tree = 100
let woodperclick = 1
let rock = 100
let stone = 0
let grass = 10000
let rope = 0
let fireunlocked = false
let axeunlocked = false

document.getElementById("getwood").onclick=function(){
  if (tree>=woodperclick){
    wood=wood+woodperclick;
    tree=tree-woodperclick;
    document.getElementById("woodamount").textContent="You have "+wood+" wood.";
    document.getElementById("treeamount").textContent="Number of trees: "+tree;
  }else if(tree>0){
    wood+=tree;
    tree=0;
    document.getElementById("woodamount").textContent="You have "+wood+" wood.";
    document.getElementById("treeamount").textContent="Number of trees: "+tree;   
  }else{
    window.alert("There are no more trees left!");
  }
}
document.getElementById("getstone").onclick=function(){
  if(rock>0){
stone++;
    rock--;
    document.getElementById("stoneamount").textContent="You have "+stone+" stone."
    document.getElementById("rockamount").textContent="Number of rocks: "+rock;
  }
  else{
window.alert("There are no more rocks left!");
  }
}
document.getElementById("getrope").onclick=function(){
  if(grass>0){
   grass--;
   rope++;
   document.getElementById("ropeamount").textContent= "You have "+rope+" rope.";
document.getElementById("grassamount").textContent="Clumps of grass: "+grass;
  }
  else{
  window.alert("There is no more grass!")
  }
}


document.getElementById("researchfire").onclick=function(){
  if (wood>49 && fireunlocked==false&&stone>9&&rope>24){
 fireunlocked = true
    wood-=50
    stone-=10
    rope-=25
  
    document.getElementById("woodamount").textContent="You have "+wood+" wood."
    document.getElementById("stoneamount").textContent="You have "+stone+" stone."
    document.getElementById("ropeamount").textContent="You have "+rope+" rope."

    window.alert("You have began researching fire!");
    window.setTimeout(UnlockFire, 5000);
  }
  else{
window.alert("You do not have enough resources or you have already unlocked the technology!");
  }
}
function UnlockFire(){
     window.alert("You have unlocked fire! Fireplace building unlocked!");
}

document.getElementById("buildaxe").onclick=function(){
  if(wood>1&&stone>2&&rope>9&&axeunlocked==false){
    axeunlocked=true
    wood-=2
    stone-=3
    rope-=10

    document.getElementById("woodamount").textContent="You have "+wood+" wood."
    document.getElementById("stoneamount").textContent="You have "+stone+" stone."
    document.getElementById("ropeamount").textContent="You have "+rope+" rope."
    
    window.alert("You have begun building an axe!")
    window.setTimeout(BuiltAxe, 3000)
  }
  else{
    window.alert("You do not have the resources or you have already built the tool!")
  }

}
function BuiltAxe(){
  window.alert("You have built an axe!")
  woodperclick+=4
}
