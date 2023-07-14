function TwoPlayer(){
    var p1 = (prompt("Player 1, choose Rock, Paper or Scissors ")).toLowerCase()
    var p2 = (prompt("Player 2, choose Rock, Paper or Scissors ")).toLowerCase()
    if (p1==p2){
        document.write("Player 1 chose "+p1+"<br>")
    document.write("Player 2 chose "+p2+"<br>")
    document.write("It's a draw:( Try again")}

    if (p1=="paper"){
        if(p2=="scissors"){
            document.write("Player 2 wins!")
        } else if(p2=="rock"){
            document.write("Player 1 wins!")
        }
    }

    if (p1=="rock"){
        if(p2=="scissors"){
            document.write("Player 1 wins!")
        } else if(p2=="paper"){
            document.write("Player 2 wins!")
        }
    }

    if (p1=="scissors"){
        if(p2=="paper"){
            document.write("Player 1 wins!")
        } else if(p2=="rock"){
            document.write("Player 2 wins!")
        }
    }

    document.body.style.color = "magenta"
    document.body.style.textAlign = "center"
    document.body.style.fontSize = "200%"
    document.body.style.fontFamily = "Arial, Helvetica, sans-serif"
    document.body.style.backgroundColor = "rgb(121, 218, 177)"
}

function SinglePlayer(){
    var comp=Math.floor(Math.random()*3)+1
    var player = (prompt("Choose 1 for Rock, 2 for Paper or 3 for Scissors ")).toLowerCase()
    if (comp==player){
    document.write("It's a draw:( Try again")}

    else if (player==2){
        if(comp==1){
            document.write("The human wins!")
        } else if(comp==3){
            document.write("The computer wins!")
        }
    }

    else if (player==1){
        if(comp==3){
            document.write("The human wins!")
        } else if(comp==2){
            document.write("The computer wins!")
        }
    }

    else if (player==3){
        if(comp==1){
            document.write("The human wins!")
        } else if(comp==2){
            document.write("The computer wins!")
        }
    }
    console.log(Math.floor(Math.random()*3)+1)

    document.body.style.color = "magenta"
    document.body.style.textAlign = "center"
    document.body.style.fontSize = "200%"
    document.body.style.fontFamily = "Arial, Helvetica, sans-serif"
    document.body.style.backgroundColor = "rgb(121, 218, 177)"
}



