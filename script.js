let wood = 0
let tree= 1000
let woodperclick = 1
let rock = 100
let stone = 0
let stoneperclick = 1
let grass = 10000
let plants = 0
let rope = 0
let ropeperclick = 1
let food = 0
let energy = 100
let wildfood= 1000
let fireresearch = false
let axecraft = false
let toolsresearch = false
let Buildings = document.getElementById("buildings");

function Update(){
document.getElementById("woodamount").textContent="You have "+wood+" wood.";
document.getElementById("treeamount").textContent="Number of trees: "+tree;
document.getElementById("woodperclick").textContent="Wood per click: "+woodperclick;
document.getElementById("rockamount").textContent="Number of rocks: "+rock;
document.getElementById("stoneamount").textContent="You have "+stone+" stone."
document.getElementById("stoneperclick").textContent="Stone per click: "+stoneperclick;
document.getElementById("grassamount").textContent="Clumps of grass: "+grass;
document.getElementById("plantamount").textContent= "You have "+plants+" plants.";
document.getElementById("ropeamount").textContent= "You have "+rope+" rope.";
document.getElementById("ropeperclick").textContent="Rope per click: "+ropeperclick;
document.getElementById("foodamount").textContent="Food: "+food;
document.getElementById("energy").textContent="Energy: "+energy+"/100"
document.getElementById("wildfood").textContent="Food in the wild: "+wildfood
}

function getResource(resource, source, perclick){
  if (tree>=woodperclick){
    wood=wood+woodperclick;
    tree=tree-woodperclick;
    Update();
  }else if(tree>0){
    wood+=tree;
    tree=0;
    Update();
  }else{
    window.alert("There are no more trees left!");
  }
    /*  
  if (source>=perclick){
    resource+=perclick;
    source-=perclick;
    Update();
  }else if(source>0){
    resource+=source;
    source=0;
    Update();
  }else{
    window.alert("There are no more trees left!");
  }
  */
}

document.getElementById("getwood").onclick=function(){
 getResource(wood, tree, woodperclick);
}

document.getElementById("getstone").onclick=function(){
  if(rock>0){
    stone++;
    rock--;
    Update();
  }
  else{
window.alert("There are no more rocks left!");
  }
}

document.getElementById("getrope").onclick=function(){
  if(grass>0){
   grass--;
   rope++;
   Update();
  }
  else{
  window.alert("There is no more grass!")
  }
}
document.getElementById("fire").onclick=function(){
  let response = "y"
  if(wood>49 && fireresearch==false&&stone>9&&rope>24&&energy>50){
    if(energy<60){
    response=window.prompt("Are you sure? Your energy will be reduced to less than 10 if you perform this action! (y/n)")
    }
    if(response=="y"){
      fireresearch = true
      wood-=50
      stone-=10
      rope-=25
      energy-=50
      Update();
      window.alert("You have began researching fire!");
      document.getElementById("fire").textContent="Researching..."
      window.setTimeout(ResearchFire, 5000);  
      } 
  }
  else if(fireresearch==true){
    window.alert("You are already researching the technology!");
  }
  else if(energy<51){
    window.alert("You do not have enough energy!");
  }
  else {
    window.alert("You do not have enough resources!");
  }
}
function ResearchFire(){
     window.alert("You have researched fire! Campfire building unlocked!");
     document.getElementById("fire").style.display="none"
     Buildings.style.display="block";
}

document.getElementById("axe").onclick=function(){
  let response = "y"
  if(wood>1&&stone>2&&rope>9&&axecraft==false&&energy>30){
    if(energy<40){
      response=window.prompt("Are you sure? Your energy will be reduced to less than 10 if you perform this action! (y/n)")
    }
    if(response=="y"){
    axecraft=true
    wood-=2
    stone-=3
    rope-=10
    energy-=30
    Update();
    window.alert("You have begun crafting an axe!")
    document.getElementById("axe").textContent="Crafting..."
    window.setTimeout(CraftAxe, 3000) 
    }
  }
  else if(axecraft==true){
   window.alert("You are already already crafting the tool!");
  }
  else if (energy<31){
    window.alert("You do not have enough energy!");
  }
  else{
   window.alert("You do not have enough resources!");
  }

}

function CraftAxe(){
 window.alert("You have crafted an axe!")
 document.getElementById("axe").style.display="none"
 woodperclick+=4
 Update();
}

document.getElementById("basictools").onclick=function(){
  let response = "y"
  if(wood>9&&stone>4&&rope>14&&toolsresearch==false&&energy>50){
    if(energy<60){
      response=window.prompt("Are you sure? Your energy will be reduced to less than 10 if you perform this action! (y/n)")
    }
    if(response=="y"){
    toolsresearch=true
    wood-=10
    stone-=5
    rope-=15
    energy-=50
    Update();
    window.alert("You have begun researching basic tools!")
    document.getElementById("basictools").textContent="Researching..."
    window.setTimeout(ResearchTools, 5000)
    }
  }
  else if(toolsresearch==true){
    window.alert("You are already researching the technology!");
  }
  else if(energy<51){
    window.alert("You do not have enough energy!");
  }
  else{
    window.alert("You do not have enough resources!");
  }

}

function ResearchTools(){
  window.alert("You have researched basic tools! Tools section unlocked!");
  document.getElementById("basictools").style.display="none"
  document.getElementById("tools").style.display="block"
}

document.getElementById("forage").onclick=function(){
  if(wildfood>0){
    wildfood--
    food++
    Update();
  }
  else{
    window.alert("There is no more food to collect!")
  }

}

function Tick(){
  window.setTimeout(Tick, 1000)
  energy--
  wildfood++
  Update();

  if(energy==0){
    window.alert("DEFEAT: Your energy level reached 0.")
  }
  else if(energy==50){
    window.alert("Your are getting tired. You should probably eat some food.")
  }
  if(energy==10){
    window.alert("You are very tired! You need to eat some food soon or you will die!")
  }

}

document.getElementById("eat").onclick=function(){
  if(food>0&&energy<100){
    food-=1;
    energy+=1;
    Update();
  }
  else if(food==0){
    window.alert("You do not have food!")
  }
  else{
    window.alert("You are already full!")
  }
}
window.setTimeout(Tick, 1000)

document.getElementById("campfire").onclick=function(){
  window.alert("Coming soon...")
}
