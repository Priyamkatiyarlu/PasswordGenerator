const inputSlider = document.querySelector("[data-lenSlider]");
const lengthDisplay = document.querySelector("[data-passLength]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-dataIndicator]");
const generateBtn = document.querySelector("#gtbtn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~@#$%^&*()_+=[]{}:;",.<>?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
uppercaseCheck.checked=true;

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
}

function getRandInt(min, max){
    return Math.floor(Math.random() * (max - min))+min;
}

function generateRandomNumber(){
    return getRandInt(0,9);
}
function generateLowercase(){
    return String.fromCharCode(getRandInt(97,123));
}
function generateUppercase(){
    return String.fromCharCode(getRandInt(65,91));
}
function generateSymbols(){
    let randNum = getRandInt(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >=8){
        setIndicator("#0f0");
    } else if(
        (hasLower || hasUpper) && (hasNum || hasSym) && passwordLength>=6
    ){
        setIndicator("#ff0");
    }else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="Copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
    }
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2500);
} 
inputSlider.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value)
        copyContent();
});

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkCount++;
    });
    //special cond
    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
});

function shufflepassword(array){
    for(let i = array.length-1; i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=> (str += el));
    return str;
}

generateBtn.addEventListener('click', ()=>{
    if(checkCount==0) {
        return;
    }

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    password="";
    let funcArr=[];
    if(uppercaseCheck.checked){
        // password+=generateUppercase();
        funcArr.push(generateUppercase);
        console.log("uppercaseCheck");
    }
    if(lowercaseCheck.checked){
        // password+=generateLowercase();
        funcArr.push(generateLowercase);
    }
    if(numbersCheck.checked){
        // password+=generateRandomNumber();
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        // password+=generateSymbols();
        funcArr.push(generateSymbols);
    }
    for(let i=0; i<funcArr.length; i++){
        password+=funcArr[i]();
        console.log("inside function");
    }
    for(let i=0; i<passwordLength-funcArr.length; i++){
        let randIndex = getRandInt(0, funcArr.length);
        password+=funcArr[randIndex]();
    }

    password= shufflepassword(Array.from(password));

    passwordDisplay.value = password;

});
// generatebutton.addEventListener('click',()=>{
//     if(checkCount==0){
//         return;
//     }

//     if(passwordLength<checkCount){
//         passwordLength=checkCount;
//         handleSlider();
//     }

//     //finding a password

//     password="";


//     let funcArr= [];
//     if(uppercheck.checked){
//         funcArr.push(generateUppercase);
//     }
//     if(lowercheck.checked){
//         funcArr.push(generateLowercase);
//     }
//     if(numbercheck.checked){
//         funcArr.push(generateRandomNumber);
//     }
//     if(symbolcheck.checked){
//         funcArr.push(generateSymbols);
//     }

//     //compusory addition

//     for(let i=0; i<funcArr.length; i++){
//         password+= funcArr[i]();
//     }

//     //remaining addition
//     for(let i=0; i<passwordLength-funcArr.length; i++){
//         let randint= getRandInt(0, funcArr.length);
//         password+= funcArr[randint]();


//     }

//     passwordDisplay.value= password;

//     // marker();

// });