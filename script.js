const canvas = document.getElementById("tela")
let ctx = canvas.getContext("2d")
let p1_pos, p2_pos
let p1_pontos, p2_pontos
let p1_key
const h=450, w=600
const p_w=20, p_h=70
const p1_x=10, p2_x=(w - p_w - 10)
const velocidade = 5
let bola_y_orientacao, bola_x_orientacao, bola_x, bola_y
let gameOver = false
let vencedor = ""

var iniciar = document.getElementById("iniciar")
var reiniciar = document.getElementById("reiniciar")


function jogo(){
        
        p1_pos = p2_pos = (h/2)-(p_h/2)

        p1_pontos = 0
        p2_pontos = 0

        //loop de 60fps
        setInterval(loop,1000/60)

        iniciarBola()
        iniciar.disabled = true
        reiniciar.disabled = false
        
    
}

function loop(){
    verificarVencedor()
    if(gameOver==false){
        desenhar()
        escreverPontos()
        controlePlayer()
        controleIA()
        movimentoBola()
        pontuar()
        
    }else{
        fimDeJogo()        
    }

}

async function iniciarBola(){
    bola_x_orientacao = Math.pow(2, Math.floor(Math.random()*2)+1)-3
    bola_y_orientacao = Math.pow(2, Math.floor(Math.random()*2)+1)-3
    bola_x = w/2
    bola_y = h/2
}

function desenharRect(x,y,w,h,cor="#fff"){
    ctx.fillStyle = cor
    ctx.fillRect(x,y,w,h)
    ctx.fillStyle = "#000"
}

function desenharLinha(){
    ctx.beginPath()
    ctx.setLineDash([5,5])
    ctx.moveTo((w/2),h-450)
    ctx.lineTo((w/2),h)
    ctx.lineWidth = 5
    ctx.setLineDash([10,10])
    ctx.strokeStyle = "#fff"   
    ctx.stroke()
}

function desenhar(){
    desenharRect(0,0,w,h,"#000")//fundo
    desenharRect(p1_x,p1_pos,p_w,p_h)//player 1
    desenharRect(p2_x,p2_pos,p_w,p_h)//player 2
    desenharRect(bola_x,bola_y,10,10)//bola
    desenharLinha()
}

document.addEventListener("keydown" ,function(event){
    if(event.keyCode == 87 || event.keyCode == 83){
        p1_key = event.keyCode
    }
})


function controlePlayer(){
    if(p1_key == 87 && p1_pos > 0){//controle do player
        p1_pos -= velocidade
    }else if(p1_key == 83 && p1_pos + p_h < h){
        p1_pos += velocidade
    }
}

function controleIA(){
    if(p2_pos>(bola_y-(p_h/2)) && p2_pos > 0){
        p2_pos -= velocidade/1.25
    }else if(p2_pos<(bola_y-(p_h/2)) && p1_pos + p_h < h){
        p2_pos += velocidade/1.25
    }

}
function movimentoBola(){
    if(bola_x >= p1_x && bola_x <= p1_x && bola_y >= p1_pos && bola_y <= p1_pos+p_h){//se acertar o p1
        bola_x_orientacao = 1
    }else if(bola_x >= p2_x && bola_x <= p2_x && bola_y >= p2_pos && bola_y <= p2_pos+p_h){//se acertar o p2
        bola_x_orientacao = -1
    }

    //se a bola bater no chao ou teto
    if(bola_y + 10 >= h || bola_y <= 0) bola_y_orientacao *= -1

    //move a bola no x e y
    bola_x += velocidade * bola_x_orientacao
    bola_y += velocidade * bola_y_orientacao


}

function pontuar(){
    if(bola_x>w+100){
        p1_pontos++
        iniciarBola()
    }else if(bola_x < -100){
        p2_pontos++
        iniciarBola()
    }
}

function escreverPontos(){
    ctx.font = "50px monospace"
    ctx.fillStyle = "#fff"
    ctx.fillText(p1_pontos, w/4, 50)
    ctx.fillText(p2_pontos, 3*(w/4-7), 50)
}

function verificarVencedor(){
    if(p1_pontos>=10){        
        vencedor = "JOGADOR"
        gameOver = true
    }else if(p2_pontos>=10){
        vencedor = "COMPUTADOR"
        gameOver = true
    }
        
}

function reiniciarJogo(){
    window.location.reload(false)
}

function fimDeJogo(){
    desenharRect(0,0,w,h,"#000")
    ctx.font = "60px monospace"
    ctx.fillStyle = "#fff"
    ctx.fillText("FIM DE JOGO", w/5, h/2)
    ctx.font = "30px monospace"
    ctx.fillText(`VENCEDOR: ${vencedor}`, w/4, h/4)
    iniciar.disabled = true
    reiniciar.disabled = false

}

function desenharInicial(){
    desenharRect(0,0,w,h,"#000")
    ctx.font = "70px monospace"
    ctx.fillStyle = "#fff"
    ctx.fillText("PONG WAVE", w/5, h/2)
    
}

desenharInicial()