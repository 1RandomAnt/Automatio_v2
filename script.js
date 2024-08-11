let tree= 1000
let wood = 0
let woodperclick = 1
let rock = 100
let stone = 0
let stoneperclick = 1
let grass = 10000
let plants = 0
let plantsperclick = 1
let rope = 0
let ropeperclick = 1
let food = 0
let foodperclick = 1
let energy = 100
let wildfood= 1000
let fireresearch = false
let axecraft = false
let toolsresearch = false
let Buildings = document.getElementById("buildings");
let roperesearch = false

function Update(){
  document.getElementById("woodamount").textContent="You have "+wood+" wood.";
  document.getElementById("treeamount").textContent="Number of trees: "+tree;
  document.getElementById("woodperclick").textContent="Wood per click: "+woodperclick;
  document.getElementById("rockamount").textContent="Number of rocks: "+rock;
  document.getElementById("stoneamount").textContent="You have "+stone+" stone."
  document.getElementById("stoneperclick").textContent="Stone per click: "+stoneperclick;
  document.getElementById("grassamount").textContent="Clumps of grass: "+grass;
  document.getElementById("plantamount").textContent= "You have "+plants+" plant(s).";
  document.getElementById("plantsperclick").textContent="Plants per click: "+plantsperclick;
  document.getElementById("ropeamount").textContent= "You have "+rope+" rope.";
  document.getElementById("ropeperclick").textContent="Rope per click: "+ropeperclick;
  document.getElementById("foodamount").textContent="Food: "+food;
  document.getElementById("foodperclick").textContent="Food per click: "+foodperclick;
  document.getElementById("energy").textContent="Energy: "+energy+"/100"
  document.getElementById("wildfood").textContent="Food in the wild: "+wildfood
}

function getResource(resource, source, perclick, name){
  if (source>=perclick){
    resource+=perclick;
    source-=perclick;
    return [resource, source];
  }else if(source>0){
    resource+=source;
    source=0;
    return [resource, source];
  }else{
    window.alert(`There are no more ${name} left!`);
  }
}

document.getElementById("getwood").onclick=function(){
  [wood, tree] = getResource(wood, tree, woodperclick, "trees");
  Update();
}

document.getElementById("getstone").onclick=function(){
  [stone, rock] = getResource(stone, rock, stoneperclick, "rocks");
  Update();
}

document.getElementById("getplant").onclick=function(){
  [plants, grass] = getResource(plants, grass, plantsperclick, "grasses");
  Update();
}

document.getElementById("forage").onclick=function(){
  [food, wildfood]= getResource(food, wildfood, foodperclick, "food in the wild");
  Update();
}

document.getElementById("makerope").onclick=function(){
  [rope, plants] = getResource(rope, plants, ropeperclick, "plants");
  Update();
}

function Create(Rwood, Rstone, Rplants, Rrope, Renergy, time, researching, name, id, func, action){
  
  let response = "y"

  if(wood>=Rwood && stone>=Rstone && plants>=Rplants && rope>=Rrope && energy>Renergy && researching==false){
    if(energy<Renergy+10){
    response=window.prompt("Are you sure? Your energy will be reduced to less than 10 if you perform this action! (y/n)")
    }
    if(response=="y"){
      wood-=Rwood
      stone-=Rstone
      plants-=Rplants
      energy-=Renergy
      Update();
      window.alert(`You have began ${action} ${name}!`);
      document.getElementById(id).textContent=`${action.charAt(0).toUpperCase()+action.slice(1)}...`
      window.setTimeout(func, time);
      return true;
      } 
      else{
        return false;
      }
  }
  else if(researching==true){
    window.alert(`You are already ${action} ${name}!`);
    return true;
  }
  else if(energy<Renergy){
    window.alert("You do not have enough energy!");
    return false;
  }
  else {
    window.alert("You do not have enough resources!");
    return false;
  }
}

document.getElementById("fire").onclick=function(){
  fireresearch=Create(50, 10, 25, 0, 50, 5000, fireresearch, "fire", "fire", ResearchFire, "researching");
}

function ResearchFire(){
     window.alert("You have researched fire! Campfire building unlocked!");
     document.getElementById("firediv").style.display="none"
     Buildings.style.display="block";
}

document.getElementById("axe").onclick=function(){
  axecraft=Create(2, 3, 0, 10, 30, 3000, axecraft, "an axe", "axe", CraftAxe, "crafting");
}

function CraftAxe(){
 window.alert("You have crafted an axe!")
 document.getElementById("axe").style.display="none"
 woodperclick+=4
 Update();
}

document.getElementById("ropemaking").onclick=function(){
  roperesearch=Create(5, 5, 20, 0, 20, 2000, roperesearch, "rope making", "ropemaking", ResearchRope, "researching");
}
function ResearchRope(){
  window.alert("You have researched rope making! Rope unlocked! You are able to research basic tools!");
  document.getElementById("ropediv").style.display="none"
  document.getElementById("rope").style.display="block"
  document.getElementById("toolsdiv").style.display="block"
}

document.getElementById("basictools").onclick=function(){
  toolsresearch=Create(10, 5, 0, 15, 50, 5000, toolsresearch, "basic tools", "basictools", ResearchTools, "researching");
}

function ResearchTools(){
  window.alert("You have researched basic tools! Tools section unlocked!");
  document.getElementById("toolsdiv").style.display="none"
  document.getElementById("tools").style.display="block"
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
    window.alert("You are very tired! You need to eat some food soon, or you will lose!")
  }
}
window.setTimeout(Tick, 1000)

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

document.getElementById("campfire").onclick=function(){
  window.alert("Coming soon...")
}
