let tree = 0;
let maxtree = 0;
let wood = 0;
let woodperclick = 1;
let rock = 0;
let stone = 0;
let stoneperclick = 1;
let grass = 0;
let maxgrass = 0;
let plants = 0;
let plantsperclick = 1;
let rope = 0;
let ropeperclick = 1;
let berries = 0;
let berriesperclick = 1;
let energy = 100;
let wildberries= 100;
let maxwildberries = 100;
let branches = 100;
let fireresearch = false;
let axecraft = false;
let hammercraft = false;
let toolsresearch = false;
let roperesearch = false;
let axedesign = false;
let hammerdesign = false;
let forestexplored = 0;
let exploreforest = false;
let stuff = 0;
let maxstuff = 200;
let developresearch = false;
let researchhouse = false;
let buildhouse = false;
//let berrieseaten = 0;
let clicks = 0;
let houselevel = 1;
let upgradehouse = false;

let forestunlocked = false;
let techunlocked = false;

let spearcraft = false;
let speardesign = false;

let hunting = false;
let huntamount = 0;
let meat = 0;

let buildworkbench = false;
let workbenchlevel = 1;
let upgradeworkbench = false;

/*
//devmode
wood=1000;
stone=1000;
plants= 1000;
rope = 1000;
energy = 1000;
clicks = 100;
maxstuff = 10000;
*/

woodamt = document.getElementById("woodamt");
treeamt = document.getElementById("treeamt");
woodperclickamt = document.getElementById("woodperclickamt");
rockamt = document.getElementById("rockamt");
stoneamt = document.getElementById("stoneamt");
stoneperclickamt = document.getElementById("stoneperclickamt");
grassamt = document.getElementById("grassamt");
plantamt = document.getElementById("plantamt");
plantsperclickamt = document.getElementById("plantsperclickamt")
ropeamt = document.getElementById("ropeamt");
ropeperclickamt = document.getElementById("ropeperclickamt");
berriesamt = document.getElementById("berriesamt");
berriesperclickamt = document.getElementById("berriesperclickamt");
energyamt = document.getElementById("energyamt");
wildberriesamt = document.getElementById("wildberriesamt");
meatamt = document.getElementById("meatamt");

forestexploredamt = document.getElementById("forestexploredamt");
storageamt = document.getElementById("storageamt");
houselevelamt = document.getElementById("houselevelamt");
workbenchlevelamt = document.getElementById("workbenchlevelamt");

forestdiv = document.getElementById("forestdiv");

function Update(){
  woodamt.textContent="You have "+wood+" pieces of wood.";
  treeamt.textContent=`Number of trees: ${tree}/${maxtree}`;
  woodperclickamt.textContent="Wood per click: "+woodperclick;
  rockamt.textContent="Number of rocks: "+rock;
  stoneamt.textContent="You have "+stone+" stone(s).";
  stoneperclickamt.textContent="Stone per click: "+stoneperclick;
  grassamt.textContent=`Clumps of grass: ${grass}/${maxgrass}`;
  plantamt.textContent= "You have "+plants+" plant(s).";
  plantsperclickamt.textContent="Plant(s) per click: "+plantsperclick;
  ropeamt.textContent= "You have "+rope+" rope.";
  ropeperclickamt.textContent="Rope per click: "+ropeperclick;
  berriesamt.textContent="Berries: "+berries;
  berriesperclickamt.textContent="Berries per click: "+berriesperclick;
  energyamt.textContent="Energy: "+energy+"/100";
  wildberriesamt.textContent=`Wild berries: ${wildberries}/${maxwildberries}`;
  meatamt.textContent=`Meat: ${meat}`;
  forestexploredamt.textContent=forestexplored+"% explored";
  storageamt.textContent=`You are using ${stuff}/${maxstuff} of your space.`;
  houselevelamt.textContent=`Level ${houselevel}/100`;
  workbenchlevelamt.textContent=`Level ${workbenchlevel}/3`;

  if(clicks>=25&&forestunlocked==false){
    forestdiv.style.display="block";
    forestunlocked = true;
  }

  if(clicks>=100 && techunlocked==false){
    research.style.display="block";
    techunlocked = true;
  }
}

function getResource(resource, source, perclick, name, space, maxspace, spacename){
  if (source>=perclick&&(maxspace-space)>=perclick){
    clicks++;
    resource+=perclick;
    source-=perclick;
    if(name!="plants"){
    space+=perclick;
    }
    return [resource, source, space];
  }else if(source<perclick){
    window.alert(`There is not enough ${name} left!`);
  }
  else{
    window.alert(`You already have the maximum amount of ${spacename} you can have!`);
  }
}

document.getElementById("getwood").onclick=function(){
  [wood, tree, stuff] = getResource(wood, tree, woodperclick, "trees", stuff, maxstuff, "material");
  Update();
}

document.getElementById("getstone").onclick=function(){
  [stone, rock, stuff] = getResource(stone, rock, stoneperclick, "rocks", stuff, maxstuff, "material");
  Update();
}

document.getElementById("getplant").onclick=function(){
  [plants, grass, stuff] = getResource(plants, grass, plantsperclick, "clumps of grass", stuff, maxstuff, "material");
  Update();
}

document.getElementById("forage").onclick=function(){
  [berries, wildberries, stuff]= getResource(berries, wildberries, berriesperclick, "wild berries", stuff, maxstuff, "material");
  Update();
}


document.getElementById("hunt").onclick=function(){
  hunting=Create(0, 0, 0, 0, 10, 5000, hunting, "in the forest", "hunt", Hunt, "hunting");
  }

function Hunt(){
  
  if((Math.floor(Math.random()*4)+1)==1){
    
    huntamount = Math.floor(Math.random()*10)+1;
    window.alert(`The hunt was sucessful! You have gained ${huntamount} meat!`);

    if(huntamount>(maxstuff-stuff)){
      window.alert(`You only have enough space for ${maxstuff-stuff} meat!`);
      meat+=maxstuff-stuff;
      stuff=maxstuff;
    }
    else{
      meat+=huntamount;
      stuff+=huntamount;
    }
    Update();
  }
  else{
    window.alert(`The hunt was unsucessful! Better luck next time!`);
  }
  
  document.getElementById("hunt").textContent="Hunt: Requires 10 energy, takes 5 seconds.";
  hunting=false;
}


document.getElementById("makerope").onclick=function(){
  [rope, plants, stuff] = getResource(rope, plants, ropeperclick, "plants", stuff, maxstuff, "material");
  Update();
}

function Create(Rwood, Rstone, Rplants, Rrope, Renergy, time, researching, name, id, func, action){
  
  let response = "y";

  if(wood>=Rwood && stone>=Rstone && plants>=Rplants && rope>=Rrope && energy>Renergy && researching==false){
    if(energy<Renergy+10){
    response=window.prompt("Are you sure? Your energy will be reduced to less than 10 if you perform this action! (y/n)");
    }

    if(response=="y"){
      wood-=Rwood;
      stone-=Rstone;
      plants-=Rplants;
      rope-=Rrope
      energy-=Renergy;
      stuff-=(Rwood+Rstone+Rplants+Rrope);
      Update();
      window.alert(`You have begun ${action} ${name}!`);
      document.getElementById(id).textContent=`${action.charAt(0).toUpperCase()+action.slice(1)}...`;
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

document.getElementById("reshouse").onclick=function(){
  researchhouse=Create(25, 10, 10, 0, 25, 5000, researchhouse, "housing", "reshouse", ResearchHouse, "researching");
}

function ResearchHouse(){
  window.alert("You have researched housing! House unlocked!");
  document.getElementById("reshouse").style.display="none";
  document.getElementById("buildhouse").style.display="block";
}

document.getElementById("fire").onclick=function(){
  fireresearch=Create(50, 10, 25, 0, 25, 5000, fireresearch, "fire", "fire", ResearchFire, "researching");
}

function ResearchFire(){
  window.alert("You have researched fire! Campfire building unlocked! You are able to research housing!");
  document.getElementById("housediv").style.display="block";
  document.getElementById("buildings").style.display="block";
  document.getElementById("firediv").style.display="none";
  document.getElementById("campfire").style.display="block";
}

document.getElementById("craftaxe").onclick=function(){
  axecraft = Create(10, 20, 0, 10, 20, 4000, axecraft, "an axe", "craftaxe", CraftAxe, "crafting");
}

function CraftAxe(){
 window.alert("You have crafted an axe! Wood per click increased by 4.");
 document.getElementById("axe").style.display="none";
 document.getElementById("toolsspace").style.display="none";
 woodperclick+=4;
 Update();
}

document.getElementById("crafthammer").onclick=function(){
  hammercraft = Create(10, 30, 0, 10, 20, 4000, hammercraft, "a hammer", "crafthammer", CraftHammer, "crafting");
}

function CraftHammer(){
  window.alert("You have crafted a hammer! Stone per click increased by 4.");
  document.getElementById("hammer").style.display="none";
  document.getElementById("toolsspace").style.display="none";
  stoneperclick+=4;
  Update();
}

document.getElementById("craftspear").onclick=function(){
  spearcraft=Create(20, 10, 0, 5, 10, 2000, spearcraft, "a spear", "craftspear", CraftSpear, "crafting");
}

function CraftSpear(){
  window.alert("You have crafted a spear! Hunting unlocked!");
  document.getElementById("spear").style.display="none";
  document.getElementById("hunt").style.display="block";
  document.getElementById("meatamt").style.display="block";
  document.getElementById("eatmeat").style.display="block";
}


document.getElementById("ropemaking").onclick=function(){
  roperesearch=Create(0, 0, 20, 0, 10, 2000, roperesearch, "rope making", "ropemaking", ResearchRope, "researching");
}

function ResearchRope(){
  window.alert("You have researched rope making! Rope unlocked! You are able to research toolmaking!");
  document.getElementById("ropediv").style.display="none";
  document.getElementById("rope").style.display="block";
  document.getElementById("toolsdiv").style.display="block";
}

document.getElementById("toolmaking").onclick=function(){
  toolsresearch=Create(10, 5, 0, 15, 25, 5000, toolsresearch, "toolmaking", "toolmaking", ResearchTools, "researching");
}

function ResearchTools(){
  window.alert("You have researched toolmaking! Tools section unlocked! Workbench unlocked!");
  document.getElementById("toolsdiv").style.display="none";
  document.getElementById("tools").style.display="block";
  document.getElementById("buildings").style.display="block";
  document.getElementById("buildworkbench").style.display="block";
}

document.getElementById("designhammer").onclick=function(){
  hammerdesign = Create(5, 15, 0, 5, 10, 2000, hammerdesign, "a hammer", "designhammer", DesignHammer, "designing");
}

function DesignHammer(){
  window.alert("You have designed a hammer! Hammer unlocked!");
  document.getElementById("hammerdiv").style.display="none";
  document.getElementById("hammer").style.display="block";
  if(document.getElementById("axe").style.display=="block"){
    document.getElementById("toolsspace").style.display="block";
  }
}

document.getElementById("designaxe").onclick=function(){
  axedesign = Create(5, 10, 0, 5, 10, 2000, axedesign, "an axe", "designaxe", DesignAxe, "designing");
}

function DesignAxe(){
  window.alert("You have designed an axe! Axe unlocked!");
  document.getElementById("axediv").style.display="none";
  document.getElementById("axe").style.display="block";
  if(document.getElementById("hammer").style.display=="block"){
    document.getElementById("toolsspace").style.display="block";
  }
}


document.getElementById("designspear").onclick=function(){
  speardesign = Create(10, 5, 0, 3, 5, 1000, speardesign, "a spear", "designspear", DesignSpear, "designing");
}

function DesignSpear(){
  window.alert("You have designed a spear! Spear unlocked!");
  document.getElementById("speardiv").style.display="none";
  document.getElementById("spear").style.display="block";
}

function Tick(){
  
  window.setTimeout(Tick, 1000);
  energy--;
  
  if(wildberries<maxwildberries){
    if(wildberries+maxwildberries/100<maxwildberries){
      wildberries+=(maxwildberries/100);
    }
    else{
      wildberries=maxwildberries;
    }
  }
  
  if(0<tree && tree<maxtree){
    tree++;
  }
  if(0<grass && grass<maxgrass){
    grass++;
  }
  Update();

  if(energy==0){
    window.location.replace("Defeat.html");
  }
  else if(energy==50){
    window.alert("Your are getting tired. You should probably eat some food.");
  }
  if(energy==10){
    window.alert("You are very tired! You need to eat some food soon, or you will lose!");
  }
}

document.getElementById("eatberries").onclick=function(){
  /*
  if(energy<98){
  [energy, berries, berrieseaten] = getResource(energy, berries, 1, "berries", berrieseaten, 99999999999999999, "energy");
  Update();
  }
  else{
    window.alert("You are already full!");
  }
  */
  if(berries>0&&energy<100){
    berries--;
    stuff--;
    if(energy==99){
      energy=100;
    }
    else{
      energy+=2;
    }
    Update();
  }
  else if(berries==0){
    window.alert("You do not have any more berries left!");
  }
  else{
    window.alert("You are already full!");
  }
  
}

document.getElementById("eatmeat").onclick=function(){

  if(meat>0&&energy<100){
    meat--;
    stuff--;
    if(energy>80){
      energy=100;
    }
    else{
      energy+=20;
    }
    Update();
  }
  else if(meat==0){
    window.alert("You do not have any more meat left!");
  }
  else{
    window.alert("You are already full!");
  }
  
}

document.getElementById("campfire").onclick=function(){
  window.alert("Coming soon...");
}

document.getElementById("exploreforest").onclick=function(){

  if(forestexplored<100){
    exploreforest=Create(0, 0, 0, 0, 25, 5000, exploreforest, "the forest", "exploreforest", ExploreForest, "exploring");
  }
  else{
    window.alert("The forest is already fully explored!");
  }
  }

function ExploreForest(){
  forestexplored+=10;
  window.alert(`After exploring the forest, it is now ${forestexplored}% explored! New resources uncovered!`);
  document.getElementById("exploreforest").textContent="Explore Forest: Requires 25 energy, takes 5 seconds.";
  exploreforest=false;
  document.getElementById("forest").style.display="block";
  document.getElementById("forestresources").style.display="block";

  tree+=100;
  rock+=100;
  grass+=100;
  wildberries+=100;
  maxwildberries+=100;
  maxtree+=100;
  maxgrass+=100;
  Update();
}

window.setTimeout(Tick, 1000);
document.getElementById("research").onclick=function(){
  developresearch=Create(0, 0, 0, 0, 10, 2000, developresearch, "research", "research", DevelopResearch, "developing");
}

function DevelopResearch(){
  window.alert("You have developed research! Technology section unlocked!");
  document.getElementById("technology").style.display="block";
  document.getElementById("research").style.display="none";
}

document.getElementById("buildhouse").onclick=function(){
  buildhouse=Create(50, 10, 10, 0, 50, 10000, buildhouse, "a house", "buildhouse", BuildHouse, "building");
}

function BuildHouse(){
  window.alert("You have built a house! Max storage increased by 100!");
  document.getElementById("buildhouse").style.display="none";
  document.getElementById("house").style.display="block";
  maxstuff+=100;
  Update();
}
  
document.getElementById("upgradehouse").onclick=function(){

  if(houselevel<100){
    upgradehouse=Create(25, 5, 10, 0, 30, 6000, upgradehouse, "your house", "upgradehouse", UpgradeHouse, "upgrading");
  }
  else{
    window.alert("The house is fully upgraded!");
  }
}

function UpgradeHouse(){
  houselevel++;
  window.alert(`You have upgraded your house to level ${houselevel}! Max storage increased by 100!`);

  document.getElementById("upgradehouse").textContent="Upgrade House: Requires 25 wood, 5 stone, 10 plants and 30 energy. Takes 6 seconds.";
  upgradehouse=false;
  maxstuff+=100;
  Update();
}

document.getElementById("buildworkbench").onclick=function(){
  buildworkbench=Create(20, 10, 0, 0, 25, 5000, buildworkbench, "a workbench", "buildworkbench", BuildWorkbench, "building");
}

function BuildWorkbench(){
  window.alert("You have built a workbench! Spear design unlocked!");
  document.getElementById("speardiv").style.display="block";
  document.getElementById("buildworkbench").style.display="none";
  document.getElementById("workbench").style.display="block";
}
  
document.getElementById("upgradeworkbench").onclick=function(){

  if(workbenchlevel<3){
    upgradeworkbench=Create(10, 5, 0, 0, 20, 4000, upgradeworkbench, "your workbench", "upgradeworkbench", UpgradeWorkbench, "upgrading");
  }
  else{
    window.alert("The workbench is fully upgraded!");
  }
}

function UpgradeWorkbench(){
  workbenchlevel++;
  if(workbenchlevel==2){
    window.alert(`You have upgraded your workbench to level 2! Axe design unlocked!`);
    document.getElementById("axediv").style.display="block";
  }
  else if(workbenchlevel==3){
    window.alert(`You have upgraded your workbench to level 3! Hammer design unlocked!`);
    document.getElementById("hammerdiv").style.display="block";
  }

  document.getElementById("upgradeworkbench").textContent="Upgrade Workbench: Requires 10 wood, 5 stone and 20 energy. Takes 4 seconds.";
  upgradeworkbench=false;
}
