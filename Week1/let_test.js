function iterateVar() {
    for(var i = 0; i < 10; i++) {
      console.log(i);
    }
    console.log(i) //will print i
  }
  function iterateLet() {
    for(let i = 0; i < 10; i++) {
      console.log(i);
    }  
    console.log(i) //will throw an error, variable i is out of scope here
  } 
 //  using var
 iterateVar()
 //using let
 iterateLet()

