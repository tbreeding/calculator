$(document).ready(function() {
  var currEq = [""];
  var currNum = [""];
  var answer = 0;
  var killFirst;
  var flag = false;
  var sciAnswer;
  
  //oh glory! The calc function. Eval()'s the currEq string and displays the answer. Also, sets currEq equal to answer.
  function calc(){
    if(currEq == "") {return;}
    answer = currEq.join("");
    answer = eval(answer) == 'Infinity' || eval(answer) == '-Infinity' ? 'Error! Div/0' : eval(answer);
    if(answer == 'Error! Div/0') {
      updateDisp(1);
      return;
    }
    currEq = [answer];
    if(answer.toString().length >= 8){
      var anLen = answer.toString().length - 1
      var anSci = Math.round((answer / Math.pow(10,anLen)) * 1000) / 1000;
      anSci = anSci.toString();
      anLen = anLen.toString();
      currNum = [anSci + " * 10 ^ " + anLen];
    } else {
      currNum = [answer];
    }
    flag = true;
    updateDisp();
    
  }
 
  //AC button, clears the whole calc
  function allClear() {
    currEq = [""];
    currNum = [""];
    $(".primary p").html("0");
    $(".secondary p").html("0");
    flag = false;
  }
  
  function backspace() {
    if(currEq == "") return;
    if(currEq[currEq.length - 1] == "+" || currEq[currEq.length - 1] == "-" || currEq[currEq.length - 1] == "*" || currEq[currEq.length - 1] == "/") {
          killFirst = currEq.pop();
          currNum = [""];
          for(var i = currEq.length - 1; i >= 0; i--){
            if(currEq[currEq.length - i] == "+" || currEq[currEq.length - i] == "-" || currEq[currEq.length - i] == "*" || currEq[currEq.length - i] == "/"){
                break;
            } else {
            currNum.unshift(currEq[i]);
        }
      }
    } 
    else {
      for(var i = currEq.length - 1; i >= 0; i--){
        if(currEq[currEq.length - 1] == "+" || currEq[currEq.length - 1] == "-" || currEq[currEq.length - 1] == "*" || currEq[currEq.length - 1] == "/"){
            break;
        } else {
           killFirst = currEq.pop(); 
           currNum = [""];
        }
      }
    }
    flag = false;
    $(".primary p").html("0");
    $(".secondary p").html(currEq);
  }
  
  //updates the display and maintains the current strings
  function updateDisp(error) {
    //clear the primary display but keep the equation intact
    if(error) {
      $(".primary p").html(answer);
      $(".secondary p").html("");
      return;
    }
    
    if(currEq[currEq.length - 2] == "+" || currEq[currEq.length - 2] == "-" || currEq[currEq.length - 2] == "*" || currEq[currEq.length - 2] == "/"){
      killFirst = currNum.shift();
      $(".primary p").html("");
    }
    if(currEq[0] == "") {
      killFirst = currEq.shift();
    }
    if(currNum[0] == "") {
      killFirst = currNum.shift();
    }
      $(".secondary p").html(currEq.join(""));
      $(".primary p").html(currNum.join(""));
    if(currNum == "+" || currNum == "-" || currNum == "/" || currNum == "*"){
      currNum == [""];
    }
  }
  
  function form(input) {
    //limit the dispay capacity
    if (currNum.length >= 8) {     
     return;
    }
  switch(input) {
    //don't start with a zero
    case "0": 
      if (currNum == "" || currEq == "") {
        return; break;
      } else {
        currEq.push(input);
        currNum.push(input);
        updateDisp();
        break;
      } 
    //deal with numbers
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      if(flag == true) {
        return;
      }
      currEq.push(input);
      currNum.push(input);
      updateDisp();
      break;
    //deal with operators
    case "+":
    case "-":
    case "*":  
    case "/":
      if(currNum == "" || currEq[currEq.length - 1] == "+" || currEq[currEq.length - 1] == "-" || currEq[currEq.length - 1] == "*" || currEq[currEq.length - 1] == "/")  {
          return;
          break;
      } else {
          flag = false;
          currEq.push(input);
          currNum = [input];
          updateDisp();
          return;
          break;
      }
    //handle the decimal
    case ".":
      if(currEq[currEq.length - 1] == "." || flag == true) {
        return;
        break;
      } else {
        flag = false;
        currEq.push(input);
        currNum.push(input);
        updateDisp();
        break;
      } 
    } //end switch
  }
  //all the click events
  $(".one").click(function(){ form("1"); });
  $(".two").click(function() { form("2"); });
  $(".three").click(function() { form("3"); });
  $(".four").click(function() { form("4"); });
  $(".five").click(function() { form("5"); });
  $(".six").click(function() { form("6"); });
  $(".seven").click(function() { form("7"); });
  $(".eight").click(function() { form("8"); });
  $(".nine").click(function() { form("9"); });
  $(".zero").click(function() { form("0"); });
  $(".dot").click(function() { form("."); });  
  $(".div").click(function() { form("/"); });
  $(".mult").click(function() { form("*"); });
  $(".minus").click(function() { form("-"); });
  $(".plus").click(function() { form("+"); });
  
  $(".ac").click(function(){ allClear(); });
  $(".ce").click(function() { backspace(); });  
  $(".equals").click(function() { calc(); });
});