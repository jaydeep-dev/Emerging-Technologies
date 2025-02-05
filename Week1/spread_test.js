// spread operator turns an array into a call argument
function userTopFriends(firstFriend, secondFriend, thirdFriend) {
    console.log(firstFriend);
    console.log(secondFriend);
    console.log(thirdFriend);
  }
  console.log('\nspread operator turns an array into a call argument:')
  userTopFriends(...['Alice', 'Bob', 'Michelle']);
  //
  //spread operator uses the three dot syntax to collect function arguments as an array.
  function directions(...args) { 
    let [start, ...remaining] = args; 
    let [finish, ...stops] = remaining.reverse(); 
    //
    console.log('\nspread operator uses the three dot syntax to collect function arguments as an array:')
    console.log(`drive through ${args.length} towns`); 
    console.log(`start in ${start}`); 
    console.log(`the destination is ${finish}`); 
    console.log(`stopping ${stops.length} times in between`); 
    } 
    directions("Truckee", "Tahoe City", "Sunnyside", "Homewood", "Tahoma"); 
    //
    // spread operator is used to combine the contents of arrays
    console.log('\nspread operator is used to combine the contents of arrays:')
    const peaks = ["Tallac", "Ralston", "Rose"]; 
    const canyons = ["Ward", "Blackwood"]; 
    const tahoe = [...peaks, ...canyons]; 
    console.log(tahoe.join(", ")); // Tallac, Ralston, Rose, Ward, Blackwood
    //
    // spread operator is used to get the remaining items in the array
    console.log('\nspread operator is used to get the remaining items in the array:')
    const lakes = ["Donner", "Marlette", "Fallen Leaf", "Cascade"]; 
    const [first, ...others] = lakes; 
    console.log(others.join(", ")); // Marlette, Fallen Leaf, Cascade 
    //
    // spread operator is used to combine objects
    console.log('\nspread operator is used to combine objects:')
    const morning = { 
        breakfast: "oatmeal", 
        lunch: "peanut butter and jelly" 
        }; 
        const dinner = "mac and cheese"; 
        const backpackingMeals = {
        ...morning, 
        dinner 	
        }; 
        console.log(backpackingMeals); 
        





  