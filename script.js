let rows = document.querySelectorAll("div.row");
let balls = document.querySelectorAll(".row span");
let redScore = document.querySelector(".red span");
let blueScore = document.querySelector(".blue span");
let r=0,b=0;
let playerBlue = true;
let rightArr = [];
let leftArr = [];
let Points = [0,0,0];
let compar = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

window.addEventListener(`DOMContentLoaded`, () => {
  let startElementRight = 1;
  for(let i = 0; i < rows.length; i++){
    startElementRight += i; 
    rightArr.push(makeArrayRight(startElementRight,rows.length,i));
  }
  
  let startElementLeft = 0;
  for(let n = 0; n < rows.length; n++){
    startElementLeft += n+1; 
    leftArr.push(makeArrayLeft(startElementLeft,rows.length,n));
  }
})

window.addEventListener("click", (el)=> {
  let element = el.target;
  if(element.classList.contains("ball")){
    if(element.classList.contains("used")){
      console.log("this ball used");
    }
    else{
      element.classList.add("used");
      if(playerBlue){
        playerBlue = false;
        element.style.backgroundColor = "red";
        
      }
      else{
        playerBlue = true;
        element.style.backgroundColor = "blue";
      }

      if (checkline(findeParent(el).querySelectorAll("span"))){
        console.log(`you got ${Points[0]}`);
        addScore(playerBlue,Points[0]);
      }
      if(checkRightSlant(element)){
        addScore(playerBlue,Points[1]);
        console.log(`you got ${Points[1]}`);
      }
      if (checkLeftSlant(element)){
        addScore(playerBlue,Points[2]);
        console.log(`you got ${Points[2]}`);
      }
    }
    // console.log(checkRightSlant(element));
    // console.log(checkLeftSlant(element));
    // console.log(checkline(findeParent(el).querySelectorAll("span")));
  }
})

function findeParent(ev){
  let parent = 'div';
  let currentElement = ev.target;
  while(parent != currentElement.tagName.toLowerCase() && 
    currentElement.tagName.toLowerCase() != 'html') {
      currentElement = currentElement.parentElement;
    }
  return currentElement;
}

// ===========================================
// start of functions to check the win condition

// 1- check Check the horizontal line
function checkline (ind){
  array = Array.from(ind);
  Points[0] = array.length;
  for(let i = 0; i < array.length; i ++){
    if(!array[i].classList.contains("used")){
      return false;
    }
  }
  // if it was the last ball in the line -> return true
  for(let j = 0; j < array.length; j++){
    if(!playerBlue){
      array[j].style.backgroundColor = "red";
    }else{
      array[j].style.backgroundColor = "blue";
    }
  }
  return true;
}

// 2- check line Italics to the right
function checkRightSlant(element){
  
  for(let i = 0; i < rightArr.length; i++){
    for(let j = 0; j < rightArr[i].length; j++){
        if(element == balls[rightArr[i][j]-1]){
          Points[1] = rightArr[i].length;
          for(let n = 0; n < rightArr[i].length; n++){
            if(!balls[rightArr[i][n]-1].classList.contains("used")){
              return false;
            }
          }
        }
      }
    }
    // if it was the last ball in the line -> return true
    for(let i = 0; i < rightArr.length; i++){
      if(Points[1] == rightArr[i].length){
        for(let j = 0; j < rightArr[i].length; j++){
          if(!playerBlue){
            balls[rightArr[i][j]-1].style.backgroundColor = "red";
          }else{
            balls[rightArr[i][j]-1].style.backgroundColor = "blue";
          }
        }
      }
    }
    return true;
  }

// 3- check line Italics to the left 
function checkLeftSlant(element){
  for(let i = 0; i < leftArr.length; i++){
    for(let j = 0; j < leftArr[i].length; j++){
        if(element == balls[leftArr[i][j]-1]){
          Points[2] = leftArr[i].length;
          for(let n = 0; n < leftArr[i].length; n++){
            if(!balls[leftArr[i][n]-1].classList.contains("used")){
              return false;
            }
          }
        }
      }
    }
    // if it was the last ball in the line -> return true
    for(let i = 0; i < leftArr.length; i++){
      if(Points[2] == leftArr[i].length){
        for(let j = 0; j < leftArr[i].length; j++){
          if(!playerBlue){
            balls[leftArr[i][j]-1].style.backgroundColor = "red";
          }else{
            balls[leftArr[i][j]-1].style.backgroundColor = "blue";
          }
        }
      }
    }
    return true;
  }

  // end of functions to check the win condition
  // ===========================================

  //making arraies for sape : /
  function makeArrayRight(startElement,elementsNumber,parentIndex){
    let arr = [startElement]
    parentIndex = parentIndex+1;
  
    for(let i = parentIndex; i < elementsNumber; i++){
      startElement += i+1;
      arr.push(startElement);
    }
    return arr;
  
  }
  //making arraies for sape : \
function makeArrayLeft(startElement,elementsNumber,parentIndex){
  let arr = [startElement]
  parentIndex = parentIndex+1;

  for(let i = parentIndex; i < elementsNumber; i++){
    startElement += i;
    arr.push(startElement);
  }
  return arr;
}



//add points function 
function addScore(playerRed,points){
  switch(playerRed){
    case false:
      r += points;
      redScore.innerHTML = (r);
      break;
    case true:
      b += points;
      blueScore.innerHTML = (b);
      break;
  }
}