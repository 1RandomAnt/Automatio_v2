let wood = 0
let tree = 1000
let fireunlocked = false

document.getElementById("getwood").onclick=function(){
    wood++;
    tree--;
    document.getElementById("woodamount").textContent="You have "+wood+" wood."
    document.getElementById("treeamount").textContent="Number of trees: "+tree
}

document.getElementById("inventfire").onclick=function(){
    window.alert("You have unlocked fire!")
}