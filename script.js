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
let axeresearch = false;
let hammerresearch = false;
let forestexplored = 0;
let exploreforest = false;
let stuff = 0
let maxstuff = 200;
let developresearch = false;
let researchbuildings = false;
let buildhouse = false;
//let berrieseaten = 0;
let houselevel = 1;
let upgradehouse = false;

/*
//devmode
wood=1000;
stone=1000;
plants= 1000;
rope = 1000;
energy = 1000;
*/

function Update(){
  document.getElementById("woodamount").textContent="You have "+wood+" pieces of wood.";
  document.getElementById("treeamount").textContent=`Number of trees: ${tree}/${maxtree}`;
  document.getElementById("woodperclick").textContent="Wood per click: "+woodperclick;
  document.getElementById("rockamount").textContent="Number of rocks: "+rock;
  document.getElementById("stoneamount").textContent="You have "+stone+" stone(s).";
  document.getElementById("stoneperclick").textContent="Stone per click: "+stoneperclick;
  document.getElementById("grassamount").textContent=`Clumps of grass: ${grass}/${maxgrass}`;
  document.getElementById("plantamount").textContent= "You have "+plants+" plant(s).";
  document.getElementById("plantsperclick").textContent="Plant(s) per click: "+plantsperclick;
  document.getElementById("ropeamount").textContent= "You have "+rope+" rope.";
  document.getElementById("ropeperclick").textContent="Rope per click: "+ropeperclick;
  document.getElementById("berries").textContent="Berries: "+berries;
  document.getElementById("berriesperclick").textContent="Berries per click: "+berriesperclick;
  document.getElementById("energy").textContent="Energy: "+energy+"/100";
  document.getElementById("wildberries").textContent=`Wild berries: ${wildberries}/${maxwildberries}`;
  document.getElementById("forestexplored").textContent=forestexplored+"% explored";
  document.getElementById("storage").textContent=`You are using ${stuff}/${maxstuff} of your space.`;
document.getElementById("houselevel").textContent=`Level ${houselevel}/100`
}

function getResource(resource, source, perclick, name, space, maxspace, spacename){
  if (source>=perclick&&(maxspace-space)>=perclick){
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

document.getElementById("resbuildings").onclick=function(){
  researchbuildings=Create(25, 10, 10, 0, 25, 5000, researchbuildings, "buildings", "resbuildings", ResearchBuildings, "researching");
}

function ResearchBuildings(){
  window.alert("You have researched buildings! Buildings section unlocked!");
  document.getElementById("firediv").style.display="block";
  document.getElementById("resbuildings").style.display="none";
  document.getElementById("buildings").style.display="block";
}

document.getElementById("fire").onclick=function(){
  fireresearch=Create(50, 10, 25, 0, 25, 5000, fireresearch, "fire", "fire", ResearchFire, "researching");
}

function ResearchFire(){
  window.alert("You have researched fire! Campfire building unlocked!");
  document.getElementById("firediv").style.display="none";
  document.getElementById("campfire").style.display="block";
}

document.getElementById("craftaxe").onclick=function(){
  axecraft=Create(5, 5, 0, 10, 15, 3000, axecraft, "an axe", "craftaxe", CraftAxe, "crafting");
}

function CraftAxe(){
 window.alert("You have crafted an axe! Wood per click increased by 4.");
 document.getElementById("axe").style.display="none";
 document.getElementById("toolsspace").style.display="none";
 woodperclick+=4;
 Update();
}

document.getElementById("crafthammer").onclick=function(){
  hammercraft=Create(5, 15, 0, 5, 20, 4000, hammercraft, "a hammer", "crafthammer", CraftHammer, "crafting");
}

function CraftHammer(){
  window.alert("You have crafted a hammer! Stone per click increased by 4.");
  document.getElementById("hammer").style.display="none";
  document.getElementById("toolsspace").style.display="none";
  stoneperclick+=4;
  Update();
}

document.getElementById("ropemaking").onclick=function(){
  roperesearch=Create(5, 5, 20, 0, 10, 2000, roperesearch, "rope making", "ropemaking", ResearchRope, "researching");
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
  window.alert("You have researched toolmaking! Tools section unlocked! You are able to research hammer making and axe making!");
  document.getElementById("toolsdiv").style.display="none";
  document.getElementById("tools").style.display="block";
  document.getElementById("hammerdiv").style.display="block";
  document.getElementById("axediv").style.display="block";
}

document.getElementById("hammermaking").onclick=function(){
  hammerresearch=Create(10, 25, 0, 5, 20, 4000, hammerresearch, "hammer making", "hammermaking", ResearchHammer, "researching");
}

function ResearchHammer(){
  window.alert("You have researched hammer making! Hammer unlocked!");
  document.getElementById("hammerdiv").style.display="none";
  document.getElementById("hammer").style.display="block";
  if(document.getElementById("axe").style.display=="block"){
    document.getElementById("toolsspace").style.display="block";
  }
}

document.getElementById("axemaking").onclick=function(){
  axeresearch=Create(10, 15, 0, 10, 20, 4000, axeresearch, "axe making", "axemaking", ResearchAxe, "researching");
}

function ResearchAxe(){
  window.alert("You have researched axe making! Axe unlocked!");
  document.getElementById("axediv").style.display="none";
  document.getElementById("axe").style.display="block";
  if(document.getElementById("hammer").style.display=="block"){
    document.getElementById("toolsspace").style.display="block";
  }
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

document.getElementById("eat").onclick=function(){
  
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
