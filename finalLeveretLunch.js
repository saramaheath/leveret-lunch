let garden = [
  [2, 3, 1, 4, 2, 2, 3, 1],
  [2, 3, 0, 4, 0, 3, 0, 2],
  [1, 7, 0, 2, 1, 2, 3, 2],
  [9, 3, 0, 4, 3, 0, 3, 1],
  [3, 2, 3, 1, 1, 0, 4, 6],
  [6, 8, 2, 2, 3, 5, 1, 4],
];

function startingPosition(matrix) {
  let yIndex;
  let xIndex;
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      let yOption1 = Math.floor(matrix.length / 2); //default odd middle finder as well
      let yOption2 = Math.floor(matrix.length / 2 - 1);
      let xOption1 = Math.floor(matrix[y].length / 2);
      let xOption2 = Math.floor(matrix[y].length / 2 - 1);
      //both odd lens
      if (matrix.length % 2 === 1 && matrix[y].length % 2 === 1) {
        yIndex = yOption1;
        xIndex = xOption1;
      } else if (matrix.length % 2 === 1 && matrix[y].length % 2 === 0) {
        //y odd, x even
        yIndex = yOption1;

        if (matrix[yIndex][xOption1] > matrix[yIndex][xOption2]) {
          xIndex = xOption1;
        } else {
          xIndex = xOption2;
        }
      } else if (matrix.length % 2 === 0 && matrix[y].length % 2 === 1) {
        //x odd, y even
        xIndex = xOption1;

        if (matrix[yOption1][xIndex] > matrix[yOption2][xIndex]) {
          yIndex = yOption1;
        } else {
          yIndex = yOption2;
        }
      } else {
        //even even
        let optionsArr = [
          matrix[yOption1][xOption1],
          matrix[yOption2][xOption1],
          matrix[yOption1][xOption2],
          matrix[yOption2][xOption2],
        ];
        let highest = -Infinity;
        let index;
        for (let i = 0; i < optionsArr.length; i++) {
          if (optionsArr[i] > highest) {
            highest = optionsArr[i];
            index = i;
          }
        }
        if (index === 0) {
          yIndex = yOption1;
          xIndex = xOption1;
        } else if (index === 1) {
          yIndex = yOption2;
          xIndex = xOption1;
        } else if (index === 2) {
          yIndex = yOption1;
          xIndex = xOption2;
        } else {
          yIndex = yOption2;
          xIndex = xOption2;
        }
      }
    }
  }
  //console.log(matrix[yIndex][xIndex], "starting value");
  return [yIndex, xIndex];
}

function findNextPosition(position, matrix) {
  //if x = 0, you can't go west
  //if y = 0, you can't go north
  //if x + 1 = undefined you can't go east OR if x is at the end of x's length
  //if y + 1 = undefined you can't go south OR if y is at the end of y's length
  let currentIndex = position;
  let [y, x] = currentIndex;
  let currentValue = 0;
  //west
  if (x !== 0 && matrix[y][x - 1] > currentValue) {
    currentValue = matrix[y][x - 1];
    currentIndex = [y, x - 1];
    console.log(currentValue, "current value");
    console.log("west");
  }
  if (y !== 0 && matrix[y - 1][x] > currentValue) {
    currentValue = matrix[y - 1][x];
    currentIndex = [y - 1, x];
    console.log(currentValue, "current value");
    console.log("north");
  }

  if (x !== matrix[y].length - 1 && matrix[y][x + 1] > currentValue) {
    currentValue = matrix[y][x + 1];
    currentIndex = [y, x + 1];
    console.log(currentValue, "current value");
    console.log("east");
  }
  if (y !== matrix.length - 1 && matrix[y + 1][x] > currentValue) {
    currentValue = matrix[y + 1][x];
    currentIndex = [y + 1, x];
    console.log(currentValue, "current value");
    console.log("south");
  }

  if (
    (x === 0 || matrix[y][x - 1] === 0) &&
    (y === 0 || matrix[y - 1][x] === 0) &&
    (x === matrix[y].length - 1 || matrix[y][x + 1] === 0) &&
    (y === matrix.length - 1 || matrix[y + 1][x] === 0)
  ) {
    return "Asleep";
  }

  return currentIndex;
}

function leveretLunch(matrix) {
  let currentPosition = startingPosition(matrix);
  //currentPosition = [3,3]
  console.log(currentPosition, "starting position");

  let [y, x] = currentPosition;
  //y = 3, x = 3
  let carrotCount = matrix[y][x];
  //carrot count = 4
  //cc = 7
  //zero out starting position value
  matrix[y][x] = 0;
  console.log(matrix[y], "check row for zeroing out");
  do {
    currentPosition = findNextPosition(currentPosition, matrix);
    if (currentPosition === "Asleep") {
      break;
    }
    [y, x] = currentPosition;
    console.log(currentPosition, "current position after calling function");
    //current Position = [3, 4]
    //cp = [2, 4]
    carrotCount += matrix[y][x];
    //carrount count += 4
    //carrot count += 3
    console.log(carrotCount, "carrot count");
    //zero out current position before finding next position
    matrix[y][x] = 0;
  } while (currentPosition !== "Asleep");
  return carrotCount;
}

console.log(leveretLunch(garden));

//because we are going into each direction and following thorugh with changing that directional value to zero, it is permanently changed even if we decided to go to a different direction....
//hence why when checking position 2, 3, we are actually seeing 0 instead of 2, so it is choosing to go east

//same with carrot count, it will add additional carrots because we are following through on a direction even if it is not the final direction chosen
