let wood = 0
let tree = 1000
let woodperclick = 1
let rock = 100
let stone = 0
let grass = 10000
let rope = 0
let fireunlocked = false
let axeunlocked = false
let toolsunlocked = false
let Buildings = document.getElementById("buildings");

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

document.getElementById("fire").onclick=function(){
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
  else if(fireunlocked==true){
    window.alert("You have already researched the technology!");
  }
  else{
    window.alert("You do not have enough resources!");
  }
}
function UnlockFire(){
     window.alert("You have unlocked fire! Fireplace building unlocked!");
     Buildings.style.display="block";
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
  else if(axeunlocked==true){
    window.alert("You have already built the tool!");
  }
  else{
    window.alert("You do not have enough resources!");
  }

}

function BuiltAxe(){
  window.alert("You have built an axe!")
  woodperclick+=4
document.getElementById("woodperclick").textContent="Wood per click: "+woodperclick;
}

document.getElementById("basictools").onclick=function(){
  if(wood>9&&stone>4&&rope>14&&toolsunlocked==false){
    toolsunlocked=true
    wood-=10
    stone-=5
    rope-=15

    document.getElementById("woodamount").textContent="You have "+wood+" wood."
    document.getElementById("stoneamount").textContent="You have "+stone+" stone."
    document.getElementById("ropeamount").textContent="You have "+rope+" rope."
    
    window.alert("You have begun researching basic tools!")
    window.setTimeout(UnlockTools, 5000)
  }
  else if(toolsunlocked==true){
    window.alert("You have already researched the technology!");
  }
  else{
    window.alert("You do not have enough resources!");
  }

}

function UnlockTools(){
  window.alert("You have unlocked basic tools! Tools section unlocked!");
  document.getElementById("tools").style.display="block"
}
