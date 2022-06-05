class Room {
    constructor(name) {
      this._name = name;
      this._description = "";
      this._linkedRooms = {};
      this._character = "";
      this._roomItem = "";
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    get character() {
      return this._character
    }
  
    get roomItem() {
      return this._roomItem
    }
  
    set name(value) {
      if (value.length < 4) {
        console.error("Room name is too short.");
        return;
      }
      this._name = value;
    }
  
    set description(value) {
      if (value.length < 4) {
        console.error("Room description is too short.");
        return;
      }
      this._description = value;
    }
  
    set character(value) {
      this._character = value;
    }
  
    set roomItem(value) {
      this._roomItem = value;
    }

    //display room description

    describe() {
      return "You are in the " + this._name + " and you " + this._description;
    }
  
  
    //link rooms

    linkRoom(direction, roomToLink) {
      this._linkedRooms[direction] = roomToLink;
    }
  

    //description of linked rooms

    getDetails() {
      const entries = Object.entries(this._linkedRooms);
      let details = []
      for (const [direction, room] of entries) {
        let text = " The " + room._name + " is to the " + direction;
        details.push(text);
      }
      return details;
    }
  

    //move the adventurer to a new room
    move(direction) {
      if (direction in this._linkedRooms) {
        return this._linkedRooms[direction];
      } else {
        alert("You can't go that way",);
        return this;
      }
    }
  }

  //Adding character
  class Character {
    constructor(name) {
      this._name = name,
      this._description = ""
      this._conversation = ""
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    get conversation() {
      return this._conversation;
    }
  
    set name(value) {
      if (value.length < 4) {
        console.error("Character name is too short.");
        return;
      }
      this._name = value;
    }
  
    set description(value) {
      if (value.length < 4) {
        console.error("Character description is too short.");
        return;
      }
      this._description = value;
    }
  
    set conversation(value) {
      if (value.length < 4) {
        console.error("conversation is too short.");
        return;
      }
      this._conversation = value;
    }

    //character description
    describe() {
      return "You have met " + this._name + ", " + this._name + " is " + this._description;
    }
  
    //character conversation
    converse() {
      return this._name + " says " + "'" + this._conversation + "'";
    }
  }
  
  //Adding item
  class Item {
    constructor(name) {
      this._name = name,
      this._description = ""
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    set name(value) {
      if (value.length < 4) {
        console.error("Item name is too short.");
        return;
      }
      this._name = value;
    }
  
    set description(value) {
      if (value.length < 4) {
        console.error("Item decription is too short.");
        return;
      }
      this._description = value;
    }
  

    //display item description
    describe() {
      return "And there is a " + this._name + this._description;
    }
  }

   
  //create the indiviual room objects and add their descriptions
  const Lounge = new Room("Lounge");
  Lounge.description = " don't see anything apart from a very old and dusty sofa." 
 

  const MainBedroom = new Room("MainBedroom");
  MainBedroom.description = "see a big bed, two beside tables, a wardrobe and a piano.";

  const Kitchen = new Room("Kitchen");
  Kitchen.description = "see the rotten foods and broken kitchen appliences all over the place.";
  
  const BedroomOne = new Room("BedroomOne");
  BedroomOne.description = "a matress on the floor and a small chest beside it.";
  
  //link the rooms together
  Lounge.linkRoom("south", MainBedroom);
  Lounge.linkRoom("east", BedroomOne);
  MainBedroom.linkRoom("north", Lounge);
  MainBedroom.linkRoom("east", Kitchen);
  Kitchen.linkRoom("west", MainBedroom);
  Kitchen.linkRoom("north", BedroomOne);
  BedroomOne.linkRoom("south", Kitchen);
  BedroomOne.linkRoom("west", Lounge);
  
  //add items
  // const Key = new Item("Key");
  // Key.description = " on the wall!";

  //add characters
  const Dave = new Enemy("Dave");
  Dave.conversation = "grrr brains";
  Dave.description = "a smelly Zombie";
  Dave.weakness = "Cheese";









  

 
  
  //add items to rooms
  //Kitchen.roomItem = Key;


  //Subroutine to display information about the current room
  function displayRoomInfo(room) {
    let occupantMsg = "";
    //let itemMsg = "";
    if (room.character == "") {
      if (room.roomItem == "") {
        occupantMsg = "";
      } else {
        occupantMsg = room.roomItem.describe();
      }
    } 
    /*---
    else 
    {
     occupantMsg = room.character.describe() + ". ";
    }
    ---*/
  
    textContent = "<p>" + room.describe() + "</p>" + "<p>" + occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";
  
    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("buttonarea").innerHTML = '><input type="text" id="usertext" />';
    document.getElementById("usertext").focus();
  }
 
  function commandHandler(command, character) {
    switch (command) {
      case "take":
        if (Item.take() === true) {
          msg = "Great! You got the key now";
          alert(msg)
        } else {
          alert("You must get the key!")
        }
        break;
      // case "talk":
      //   msg = character.converse();
      //   alert(msg)
      //   break;
      // case "hug":
      //   msg = character.hug();
      //   alert(msg)
      //   break;
      // default:
      //   alert("not done yet")
      //   break;
      // //blank command box after commands 
    }
  }
  

  //Subroutine to complete inital game set up then handle commands from the user
  function startGame() {
    //set and display start room
    currentRoom = Lounge;
    displayRoomInfo(currentRoom);
  
    //handle commands
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        let command = document.getElementById("usertext").value.toLowerCase();
        const directions = ["north", "south", "east", "west"];
        const commands = ["talk", "take","get", "pick"];
        if (directions.includes(command)) {
          currentRoom = currentRoom.move(command);
          displayRoomInfo(currentRoom);
        } else if (commands.includes(command)) {
          commandHandler(command, currentRoom.character)
        } else {
          document.getElementById("usertext").value = ""
          //change to text message for short time and then reshow
          alert("that is not a valid command please try again")
        }
      }
    });
  }
  