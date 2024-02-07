// JavaScript Document
let scaleButton = 0;
let countButton = 0;
var x = "x"
var o = "o"
var count = 0;
var o_win = 0;
var x_win = 0;

function clickButton(ev) {
    for(let i = 0; i < countButton; i++){    
        if(logic(i,scaleButton, 'o')){
            console.log("1")
            alert('O has won the game. Start a new game')
            resetClass()
        } else if(logic(i,scaleButton, 'x')){
            console.log("2")
            alert('X wins has won the game. Start a new game')
            resetClass()
        } else if (count == countButton) {
            console.log("3")
            alert('Its a tie. It will restart.')
            resetClass()
            count = 0
        } else if ($(ev).hasClass('disable')) {
            // console.log("4")
        } else if (count % 2 == 0) {
            console.log("5")
            count++
            $(ev).text(o)
            $(ev).addClass('disable o btn-primary')
            if (logic(i,scaleButton, 'o')){
                alert('O wins')
                count = 0
                o_win++
                $('#o_win').text(o_win)
            }
        } else {
            console.log("6")
            count++
            $(ev).text(x)
            $(ev).addClass('disable x btn-info')
            if (logic(i,scaleButton, 'x')){
                alert('X wins')
                count = 0
                x_win++
                $('#x_win').text(x_win)
            }
        }
        
    }
};

function hasXO(btn, code){
    return $(`#btn-${btn}`).hasClass(code);
}

function logicOne(i, code){
    return hasXO(i, code) && hasXO(i + 1, code) && hasXO(i + 2, code)
}

function logicTwo(i, scaleButton, code){
    return hasXO(i, code) && hasXO(i + scaleButton, code) && hasXO(i + (scaleButton * 2), code)
}

function logicThree(i, scaleButton, code){
    return hasXO(i, code) && hasXO(i + (scaleButton + 1), code) && hasXO(i + ((scaleButton + 1) * 2), code)
}

function logicFour(i, scaleButton, code){
    return hasXO(i, code) && hasXO(i + (scaleButton - 1), code) && hasXO(i + ((scaleButton - 1) * 2), code)
}

function logic(i, scaleButton, code){
    console.log("i = ", i, " scaleButton = ", scaleButton, " code = ", code)
    return logicOne(i,code) || logicTwo(i, scaleButton,code) || logicThree(i, scaleButton,code) || logicFour(i, scaleButton,code)
}

function resetClass(){
    $("#game li").text("+");
    $("#game li").removeClass('disable o x btn-primary btn-info')
}

function startNewGame(scale){
    scaleButton = scale
    countButton = scale * scale
    $("#game").empty();
    
    for(let i = 0; i<(countButton); i++){
        $("#game").append(`<li id=btn-${i} class='btn span1' onclick='clickButton(this)'>+</li>`)
        $("#tableGame").css("width", scale * ($(`#btn-${i}`).width() + 20));
    }

    resetClass()
    count = 0
}

function resetGame() {
    let scale = prompt("Please enter scale", "3, 6, 9, etc");
    if (scale != null) {
        startNewGame(parseInt(scale))
    }
}