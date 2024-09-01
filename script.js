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
let maxstuff = 100;
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

let knifecraft = false;
let knifedesign = false;

let touchinggrass = false;
let hunter = false;
let builder = false;

let buildcampfire = false;
let cfMeat = 0;
let cfWood = 0;
let cfCookedMeat = 0;

let maxcfMeat = 20;
let maxcfWood = 20;
let maxcfCookedMeat = 20;
let cookedmeat = 0;

let campfirelevel = 1;
let upgradecampfire = false;

const woodamt = document.getElementById("woodamt");
const treeamt = document.getElementById("treeamt");
const woodperclickamt = document.getElementById("woodperclickamt");
const rockamt = document.getElementById("rockamt");
const stoneamt = document.getElementById("stoneamt");
const stoneperclickamt = document.getElementById("stoneperclickamt");
const grassamt = document.getElementById("grassamt");
const plantamt = document.getElementById("plantamt");
const plantsperclickamt = document.getElementById("plantsperclickamt")
const ropeamt = document.getElementById("ropeamt");
const ropeperclickamt = document.getElementById("ropeperclickamt");
const berriesamt = document.getElementById("berriesamt");
const berriesperclickamt = document.getElementById("berriesperclickamt");
const energyamt = document.getElementById("energyamt");
const wildberriesamt = document.getElementById("wildberriesamt");
const meatamt = document.getElementById("meatamt");

const forestexploredamt = document.getElementById("forestexploredamt");
const storageamt = document.getElementById("storageamt");
const houselevelamt = document.getElementById("houselevelamt");
const workbenchlevelamt = document.getElementById("workbenchlevelamt");

const forestdiv = document.getElementById("forestdiv");

const cfMeatamt = document.getElementById("cfMeatamt");
const cfWoodamt = document.getElementById("cfWoodamt");
const cfCookedMeatamt = document.getElementById("cfCookedMeatamt");
const cookedmeatamt = document.getElementById("cookedmeatamt")
const campfirelevelamt = document.getElementById("campfirelevelamt");

function Update(){
  woodamt.textContent="You have "+wood+" piece(s) of wood.";
  treeamt.textContent=`Number of trees: ${tree}/${maxtree}`;
  woodperclickamt.textContent="Wood per click: "+woodperclick;
  rockamt.textContent="Number of rocks: "+rock;
  stoneamt.textContent="You have "+stone+" stone(s).";
  stoneperclickamt.textContent="Stone per click: "+stoneperclick;
  grassamt.textContent=`Clumps of grass: ${grass}/${maxgrass}`;
  plantamt.textContent= "You have "+plants+" plant(s).";
  plantsperclickamt.textContent="Plant(s) per click: "+plantsperclick;
  ropeamt.textContent= "You have "+rope+" rope(s).";
  ropeperclickamt.textContent="Rope per click: "+ropeperclick;
  berriesamt.textContent="Berries: "+berries;
  berriesperclickamt.textContent="Berries per click: "+berriesperclick;
  energyamt.textContent="Energy: "+energy+"/100";
  wildberriesamt.textContent=`Wild berries: ${wildberries}/${maxwildberries}`;
  meatamt.textContent=`Meat: ${meat}`;
  forestexploredamt.textContent=forestexplored+"% explored";
  storageamt.textContent=`You are using ${stuff}/${maxstuff} of your space.`;
  houselevelamt.textContent=`Level ${houselevel}/10`;
  workbenchlevelamt.textContent=`Level ${workbenchlevel}/4`;
  
  cfMeatamt.textContent=`Meat: ${cfMeat}/${maxcfMeat}`;
  cfWoodamt.textContent=`Wood: ${cfWood}/${maxcfWood}`;
  cfCookedMeatamt.textContent=`Cooked Meat: ${cfCookedMeat}/${maxcfCookedMeat}`;
  cookedmeatamt.textContent=`Cooked Meat: ${cookedmeat}`;
  campfirelevelamt.textContent=`Level ${campfirelevel}/10`;

  if(clicks>=25&&forestunlocked==false){
    forestdiv.style.display="block";
    forestunlocked = true;
  }

  if(clicks>=50 && techunlocked==false){
    research.style.display="block";
    techunlocked = true;
  }
}

function getResource(resource, source, perclick, name, space, maxspace, spacename){
  if (source>0 && (maxspace-space)>0){
    clicks++;
    if(source>=perclick && (maxspace-space)>=perclick){
      resource+=perclick;
      source-=perclick;
      if(name!="plants"){
        space+=perclick;
      } 
    }else if (source<(maxspace-space)){
      resource+=source;
      if(name!="plants"){
        space+=source;
      }
      source=0;
    } else {
      if(name=="plants"){
        resource+=source;
        source=0;
      }
      else{
        resource+=(maxspace-space);
        source-=(maxspace-space);
        space=maxspace;
      } 
    }
  } else if(source==0){
    window.alert(`There is not enough ${name} left!`);
  } else {
    if(name=="plants"){
      clicks++;
      if(source<perclick){
        resource+=source;
        source=0;
      }else{
        resource+=perclick;
        source-=perclick;
      }
    } else {
      window.alert(`You already have the maximum amount of ${spacename} you can have!`);
    } 
  }
return [resource, source, space];
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
  if(touchinggrass == false){
    window.alert("Achievement Unlocked: TOUCHING GRASS. Collect a plant.");
    touchinggrass = true;
    document.getElementById("touchinggrass").textContent = "Achievement Unlocked: TOUCHING GRASS. Collect a plant.";
  }
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

  if((Math.floor(Math.random()*5)+1)==1){
    
    if(hunter == false){
      window.alert("Achievement Unlocked: HUNTER. Have a sucessful hunt.");
      hunter = true;
      document.getElementById("hunter").textContent = "Achievement Unlocked: HUNTER. Have a sucessful hunt.";
    }

    huntamount = Math.floor(Math.random()*100)+1;
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
  
  let response = true;

  if(wood>=Rwood && stone>=Rstone && plants>=Rplants && rope>=Rrope && energy>Renergy && researching==false){
    if(energy<Renergy+10){
    response=window.confirm("Are you sure? Your energy will be reduced to less than 10 if you perform this action!");
    }

    if(response==true){
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
  researchhouse=Create(25, 5, 5, 0, 25, 5000, researchhouse, "housing", "reshouse", ResearchHouse, "researching");
}

function ResearchHouse(){
  window.alert("You have researched housing! House unlocked!");
  document.getElementById("reshouse").style.display="none";
  document.getElementById("buildhouse").style.display="block";
}

document.getElementById("fire").onclick=function(){
  fireresearch=Create(15, 10, 5, 0, 25, 5000, fireresearch, "fire", "fire", ResearchFire, "researching");
}

function ResearchFire(){
  window.alert("You have researched fire! Campfire building unlocked! You are able to research housing!");
  document.getElementById("reshouse").style.display="block";
  document.getElementById("buildings").style.display="block";
  document.getElementById("fire").style.display="none";
  document.getElementById("buildcampfire").style.display="block";
}

document.getElementById("craftaxe").onclick=function(){
  axecraft = Create(10, 20, 0, 10, 20, 4000, axecraft, "an axe", "craftaxe", CraftAxe, "crafting");
}

function CraftAxe(){
 window.alert("You have crafted an axe! Wood per click increased by 4.");
 document.getElementById("craftaxe").style.display="none";
 woodperclick+=4;
 Update();
}

document.getElementById("crafthammer").onclick=function(){
  hammercraft = Create(10, 30, 0, 10, 20, 4000, hammercraft, "a hammer", "crafthammer", CraftHammer, "crafting");
}

function CraftHammer(){
  window.alert("You have crafted a hammer! Stone per click increased by 4.");
  document.getElementById("crafthammer").style.display="none";
  stoneperclick+=4;
  Update();
}

document.getElementById("craftspear").onclick=function(){
  spearcraft=Create(20, 10, 0, 5, 10, 2000, spearcraft, "a spear", "craftspear", CraftSpear, "crafting");
}

function CraftSpear(){
  window.alert("You have crafted a spear! Hunting unlocked!");
  document.getElementById("craftspear").style.display="none";
  document.getElementById("hunt").style.display="block";
  document.getElementById("meatamt").style.display="block";
  document.getElementById("eatmeat").style.display="block";
}

document.getElementById("craftknife").onclick=function(){
  knifecraft=Create(10, 10, 0, 5, 10, 2000, knifecraft, "a knife", "craftknife", CraftKnife, "crafting");
}

function CraftKnife(){
  window.alert("You have crafted a knife! Grass per click increased by 4!");
  document.getElementById("craftknife").style.display="none";
  plantsperclick+=4;
  Update();
}

document.getElementById("ropemaking").onclick=function(){
  roperesearch=Create(0, 0, 20, 0, 10, 2000, roperesearch, "rope making", "ropemaking", ResearchRope, "researching");
}

function ResearchRope(){
  window.alert("You have researched rope making! Rope unlocked! You are able to research toolmaking!");
  document.getElementById("ropemaking").style.display="none";
  document.getElementById("rope").style.display="block";
  document.getElementById("toolmaking").style.display="block";
}

document.getElementById("toolmaking").onclick=function(){
  toolsresearch=Create(10, 5, 0, 5, 20, 4000, toolsresearch, "toolmaking", "toolmaking", ResearchTools, "researching");
}

function ResearchTools(){
  window.alert("You have researched toolmaking! Tools section unlocked! Workbench unlocked!");
  document.getElementById("toolmaking").style.display="none";
  document.getElementById("tools").style.display="block";
  document.getElementById("buildings").style.display="block";
  document.getElementById("buildworkbench").style.display="block";
}

document.getElementById("designhammer").onclick=function(){
  hammerdesign = Create(5, 15, 0, 5, 10, 2000, hammerdesign, "a hammer", "designhammer", DesignHammer, "designing");
}

function DesignHammer(){
  window.alert("You have designed a hammer! Hammer unlocked!");
  document.getElementById("designhammer").style.display="none";
  document.getElementById("crafthammer").style.display="block";
}

document.getElementById("designaxe").onclick=function(){
  axedesign = Create(5, 10, 0, 5, 10, 2000, axedesign, "an axe", "designaxe", DesignAxe, "designing");
}

function DesignAxe(){
  window.alert("You have designed an axe! Axe unlocked!");
  document.getElementById("designaxe").style.display="none";
  document.getElementById("craftaxe").style.display="block";
}


document.getElementById("designspear").onclick=function(){
  speardesign = Create(10, 5, 0, 3, 5, 1000, speardesign, "a spear", "designspear", DesignSpear, "designing");
}

function DesignSpear(){
  window.alert("You have designed a spear! Spear unlocked!");
  document.getElementById("designspear").style.display="none";
  document.getElementById("craftspear").style.display="block";
}

document.getElementById("designknife").onclick=function(){
  knifedesign = Create(5, 5, 0, 2, 5, 1000, knifedesign, "a knife", "designknife", DesignKnife, "designing");
}

function DesignKnife(){
  window.alert("You have designed a knife! Knife unlocked!");
  document.getElementById("designknife").style.display="none";
  document.getElementById("craftknife").style.display="block";
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

  if(cfMeat>=campfirelevel&&cfWood>=campfirelevel&&campfirelevel<=(maxcfCookedMeat-cfCookedMeat)){
    cfMeat-=campfirelevel;
    cfWood-=campfirelevel;
    cfCookedMeat+=campfirelevel;
  } else if (cfMeat<=cfWood&&cfMeat<=(maxcfCookedMeat-cfCookedMeat)){
    cfWood-=cfMeat;
    cfCookedMeat+=cfMeat;
    cfMeat=0;
  } else if (cfWood<=(maxcfCookedMeat-cfCookedMeat)){
    cfMeat-=cfWood;
    cfCookedMeat+=cfWood;
    cfWood=0;
  } else {
    cfMeat-=(maxcfCookedMeat-cfCookedMeat);
    cfWood-=(maxcfCookedMeat-cfCookedMeat);
    cfCookedMeat=maxcfCookedMeat;
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
    if(energy>95){
      energy=100;
    }
    else{
      energy+=5;
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

  if(builder == false){
    window.alert("Achievement Unlocked: BUILDER. Build a house.");
    builder = true;
    document.getElementById("builder").textContent = "Achievement Unlocked: BUILDER. Build a house..";
  }

  window.alert("You have built a house! Max storage increased by 100!");
  document.getElementById("buildhouse").style.display="none";
  document.getElementById("house").style.display="block";
  maxstuff+=100;
  Update();
}
  
document.getElementById("upgradehouse").onclick=function(){

  if(houselevel<10){
    upgradehouse=Create(40, 10, 10, 0, 40, 8000, upgradehouse, "your house", "upgradehouse", UpgradeHouse, "upgrading");
  }
  else{
    window.alert("The house is fully upgraded!");
  }
}

function UpgradeHouse(){
  houselevel++;
  window.alert(`You have upgraded your house to level ${houselevel}! Max storage increased by 100!`);

  document.getElementById("upgradehouse").textContent="Upgrade House: Requires 40 wood, 10 stone, 10 plants and 40 energy. Takes 8 seconds.";
  upgradehouse=false;
  maxstuff+=100;
  Update();
}

document.getElementById("buildworkbench").onclick=function(){
  buildworkbench=Create(20, 10, 0, 0, 25, 5000, buildworkbench, "a workbench", "buildworkbench", BuildWorkbench, "building");
}

function BuildWorkbench(){
  window.alert("You have built a workbench! Hammer design unlocked!");
  document.getElementById("designhammer").style.display="block";
  
  document.getElementById("buildworkbench").style.display="none";
  document.getElementById("workbench").style.display="block";
}
  
document.getElementById("upgradeworkbench").onclick=function(){

  if(workbenchlevel<4){
    upgradeworkbench=Create(10, 5, 0, 0, 15, 3000, upgradeworkbench, "your workbench", "upgradeworkbench", UpgradeWorkbench, "upgrading");
  }
  else{
    window.alert("The workbench is fully upgraded!");
  }
}

function UpgradeWorkbench(){
  workbenchlevel++;
  if(workbenchlevel==2){
    window.alert(`You have upgraded your workbench to level 2! Knife design unlocked!`);
    document.getElementById("designknife").style.display="block";
  }
  else if(workbenchlevel==3){
    window.alert(`You have upgraded your workbench to level 3! Axe design unlocked!`);
    document.getElementById("designaxe").style.display="block";
  }
  else if(workbenchlevel==4){
    window.alert(`You have upgraded your workbench to level 4! Spear design unlocked!`);
    document.getElementById("designspear").style.display="block";
}

document.getElementById("upgradeworkbench").textContent="Upgrade Workbench: Requires 10 wood, 5 stone and 20 energy. Takes 4 seconds.";
  upgradeworkbench=false;
}

document.getElementById("achievements").onclick=function(){
  if(document.getElementById("achievements").textContent == "Achievements"){
    document.getElementById("achievements").textContent = "Hide Achievements";
    document.getElementById("achievementsdisplay").style.display = "block";
  }
  else{
    document.getElementById("achievements").textContent = "Achievements";
    document.getElementById("achievementsdisplay").style.display = "none";
  }
}

document.getElementById("pause").onclick=function(){
  window.alert("The game is paused right now! Click the OK button to continue!");
}

document.getElementById("discard").onclick=function(){
  let resource = "";

  while(!(resource=="b"||resource=="m"||resource=="w"||resource=="s"||resource=="p"||resource=="r"||resource=="c"||resource==null)){
    resource = window.prompt("What resource do you want to discard? Press b for berries, m for meat, w for wood, s for stone, p for plants, r for rope, or c for cooked meat. Click cancel if you changed your mind.");
  }

  if(resource==null){
    return;
  } else if (resource == "b"){
    berries = Discard(berries, "berry(ies)");
  } else if (resource == "m"){
    meat = Discard(meat, "piece(s) of meat");
  } else if (resource == "w"){
    wood = Discard(wood, "piece(s) of wood");
  } else if (resource == "s"){
    stone = Discard(stone, "stone(s)");
  } else if (resource == "p"){
    plants = Discard(plants, "plant(s)");
  } else if (resource == "r"){
    rope = Discard(rope, "rope(s)");
  } else {
    cookedmeat = Discard(cookedmeat, "piece(s) of cooked meat");
  }
  Update();
}

function Discard(resource, name){
  let amount = NaN;
  
  while(isNaN(amount)){
    amount = Number(window.prompt(`How many ${name} would you like to discard?`));
  }
  
  if(resource>=amount){
    if(window.confirm(`Are you sure you want to discard ${amount} ${name}?`)){
      resource-=amount;
      stuff-=amount;
      return resource;
    }
    else{
      return resource;
    }
  }else{
    window.alert(`That is more ${name} than you currently have!`);
    return resource;
  }
}

document.getElementById("buildcampfire").onclick=function(){
  buildcampfire=Create(20, 20, 5, 0, 30, 6000, buildcampfire, "a campfire", "buildcampfire", BuildCampfire, "building");
}

function BuildCampfire(){
  window.alert("You have built a campfire! Cooking unlocked!");
  document.getElementById("buildcampfire").style.display="none";
  document.getElementById("campfire").style.display="block";
  document.getElementById("upgradecampfire").style.display="block";
  document.getElementById("meatamt").style.display="block";
  document.getElementById("eatmeat").style.display="block";
  document.getElementById("cookedmeatamt").style.display="block";
  document.getElementById("eatcookedmeat").style.display="block";
}

function Machine(source, resource, storage, space, maxspace, resourcename, action){
  let amount = NaN;

  while(isNaN(amount)){
    amount = Number(window.prompt(`How much ${resourcename} would you like to ${action}?`));
  }
  
  if(amount>source){
    window.alert(`That is more ${resourcename} than you currently have!`);
  } else if (amount>(maxspace-space)){
    source-=(maxspace-space);
    resource+=(maxspace-space);
    storage-=(maxspace-space);
    space=maxspace;
  }else{
    source-=amount;
    resource+=amount;
    storage-=amount;
    space+=amount;
  }
  return [source, resource, storage, space];
}

document.getElementById("addMeat").onclick=function(){
  [meat, cfMeat, stuff, cfMeat] = Machine(meat, cfMeat, stuff, cfMeat, maxcfMeat, "meat", "add");
  Update();
}

document.getElementById("removeMeat").onclick=function(){
  [cfMeat, meat, cfMeat, stuff] = Machine(cfMeat, meat, cfMeat, stuff, maxstuff, "meat", "remove");
  Update();
}

document.getElementById("addWood").onclick=function(){
  [wood, cfWood, stuff, cfWood] = Machine(wood, cfWood, stuff, cfWood, maxcfWood, "wood", "add");
  Update();
}

document.getElementById("removeWood").onclick=function(){
  [cfWood, wood, cfWood, stuff] = Machine(cfWood, wood, cfWood, stuff, maxstuff, "wood", "remove");
  Update();
}

document.getElementById("removeCookedMeat").onclick=function(){
  [cfCookedMeat, cookedmeat, cfCookedMeat, stuff] = Machine(cfCookedMeat, cookedmeat, cfCookedMeat, stuff, maxstuff, "cooked meat", "remove");
  Update();
}

document.getElementById("eatcookedmeat").onclick=function(){

  if(cookedmeat>0&&energy<200){
    cookedmeat--;
    stuff--;
    if(energy>190){
      energy=200;
    }
    else{
      energy+=10;
    }
    Update();
  }
  else if(cookedmeat==0){
    window.alert("You do not have any more cooked meat left!");
  }
  else{
    window.alert("Eating cooked meat only allows you to reach up to 200 energy!");
  }
  
}

document.getElementById("upgradecampfire").onclick=function(){

  if(campfirelevel<10){
    upgradecampfire=Create(5, 10, 5, 0, 10, 2000, upgradecampfire, "your campfire", "upgradecampfire", UpgradeCampfire, "upgrading");
  }
  else{
    window.alert("The campfire is fully upgraded!");
  }
}

function UpgradeCampfire(){
  campfirelevel++;
  window.alert(`You have upgraded your campfire to level ${campfirelevel}! Capacity increased by 20! Items cooked per second increased by 1!`);

  document.getElementById("upgradecampfire").textContent="Upgrade Campfire: Requires 5 wood, 10 stone, 5 plants and 10 energy. Takes 2 seconds.";
  upgradecampfire=false;
  maxcfCookedMeat+=20;
  maxcfMeat+=20;
  maxcfWood+=20;
  Update();
}
