// This is a Game developed on Js.
let xp = 0,
  health = 100,
  gold = 50,
  currentWeapon = 0,
  fighting,
  monsterHealth,
  inventory = ["stick"],
  lessGold = "You do not have enough Gold.";
const button1 = document.querySelector("#button1"),
  button2 = document.querySelector("#button2"),
  button3 = document.querySelector("#button3"),
  text = document.querySelector("#text"),
  xpText = document.querySelector("#xpText"),
  healthText = document.querySelector("#healthText"),
  goldText = document.querySelector("#goldText"),
  monsterStats = document.querySelector("#monsterStats"),
  monsterName = document.querySelector("#monsterName"),
  monsterHealthText = document.querySelector("#monsterHealth"),
  weapons = [
    {
      name: "stick",
      power: 5,
    },
    {
      name: "dagger",
      power: 30,
    },
    {
      name: "claw hammer",
      power: 50,
    },
    {
      name: "sword",
      power: 100,
    },
  ],
  monsters = [
    {
      name: "slime",
      level: 2,
      health: 15,
    },
    {
      name: "fanged beast",
      level: 8,
      health: 60,
    },
    {
      name: "dragon",
      level: 20,
      health: 300,
    },
  ],
  locations = [
    {
      name: "town square",
      "button text": ["Go to store", "Go to cave", "Fight dragon"],
      "button functions": [goStore, goCave, fightDragon],
      text: 'You are in the town square. You see a sign that says "Store".',
    },
    {
      name: "store",
      "button text": [
        "Buy 10 health (10 gold)",
        "Buy weapon (30 gold)",
        "Go to town square",
      ],
      "button functions": [buyHealth, buyWeapon, goTown],
      text: "You enter the store.",
    },
    {
      name: "cave",
      "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
      "button functions": [fightSlime, fightBeast, goTown],
      text: "You enter the cave. You see some monsters.",
    },
    {
      name: "fight",
      "button text": ["Attack", "Dodge", "Run"],
      "button functions": [attack, dodge, goTown],
      text: "You are fighting a monster.",
    },
    {
      name: "kill monster",
      "button text": [
        "Go to town square",
        "Go to town square",
        "Go to town square",
      ],
      "button functions": [goTown, goTown, easterEgg],
      text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
    },
    {
      name: "lose",
      "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
      "button functions": [restart, restart, restart],
      text: "You die. &#x2620;",
    },
    {
      name: "win",
      "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
      "button functions": [restart, restart, restart],
      text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
    },
    {
      name: "easter egg",
      "button text": ["2", "8", "Go to town square?"],
      "button functions": [pickTwo, pickEight, goTown],
      text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
    },
  ];
function goTown() {
  update(locations[0]);
  console.log("goTown");
}
function goStore() {
  update(locations[1]);
  console.log("goStore");
}
function goCave() {
  update(locations[2]);
  console.log("goCave");
}
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  console.log("update");
}
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = lessGold;
  }
  console.log("buyHealth");
}
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = lessGold;
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
  console.log("buyWeapon");
}
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  const monsterStats = document.querySelector("#monsterHealth");
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  console.log("goFight");
}
function fightSlime() {
  fighting = 0;
  goFight();
  console.log("fightSlime");
}
function fightBeast() {
  fighting = 1;
  goFight();
  console.log("fightBeast");
}
function fightDragon() {
  fighting = 2;
  goFight();
  console.log("fightDragon");
}
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
  console.log("sellWeapon");
}
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText +=
    " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
  console.log("attack");
}
function easterEgg() {
  update(locations[7]);
  console.log("easterEgg");
}
function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
  console.log("pick");
}
function pickTwo() {
  pick(2);
}
function pickEight() {
  pick(8);
}
function isMonsterHit() {
  console.log("isMonsterHit");
  return Math.random() > 0.2 || health < 20;
}
function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
  console.log("getMonsterAttackValue");
  return hit > 0 ? hit : 0;
}
function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
  console.log("dodge");
}
function lose() {
  update(locations[5]);
  console.log("lose");
}
function winGame() {
  update(locations[6]);
  console.log("winGame");
}
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
  console.log("defeatMonster");
}
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
  console.log("restart");
}
//initializing buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
