const canvas = document.getElementById("game-canvas")
const contexto = canvas.getContext("2d")

const quadraImage = new Image()
quadraImage.src = "./images/quadrapadrao.jpg"
const bolaImage = new Image()
bolaImage.src = "./images/bola.png"

class Objeto{
    constructor(imagem,x,y,w,h){
        this.imagem = imagem
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
    renderSelf(){
        contexto.drawImage(this.imagem, this.x, this.y, this.w, this.h)
    }
}

class PosicaoJogadores extends Objeto{
    constructor(imagem,x,y,w,h){
        super(imagem,x,y,w,h)
    }
    renderSelf(){
        contexto.drawImage(this.imagem, this.x, this.y, this.w, this.h)
        contexto.fillStyle = 'red';
        contexto.fillRect(this.x, this.y, 100, 100);
    }
}

posicao1Esquerda = new PosicaoJogadores(bolaImage, 200, 700, 100, 100)
posicao6Esquerda = new PosicaoJogadores(bolaImage, 400, 450, 100, 100)
posicao5Esquerda = new PosicaoJogadores(bolaImage, 200, 200, 100, 100)
posicao4Esquerda = new PosicaoJogadores(bolaImage, 650, 200, 100, 100)
posicao3Esquerda = new PosicaoJogadores(bolaImage, 750, 450, 100, 100)
posicao2Esquerda = new PosicaoJogadores(bolaImage, 650, 700, 100, 100)


class ObjetoBola extends Objeto{
    constructor(imagem,x,y,w,h){
        super(imagem,x,y,w,h)
    }
    atualizaPosicao(req){
        if(this.x != req.x){
            if(this.x < req.x){
                this.x = this.x + 5
            }else{
                this.x = this.x - 5
            }
        }
        if(this.y != req.y){
            if(this.y < req.y){
                this.y = this.y + 5
            }else {
                this.y = this.y - 5 
            }
        }
    }
}

quadra = new Objeto(quadraImage,0,0,1800,1000)
// Área do jogo começa realmente em x: 125 e y: 105
// Temina em x: 1545 e y: 745
bola = new ObjetoBola(bolaImage, 1025, 705, 130, 155)

function fazColisao(bola, posicao){
    if(bola.x == posicao.x && bola.y == posicao.y){
        console.log('Recebeu!!!!')
    }
}


function gameLoop(){
    quadra.renderSelf()
    bola.renderSelf()
    posicao1Esquerda.renderSelf()
    posicao6Esquerda.renderSelf()
    posicao5Esquerda.renderSelf()
    posicao4Esquerda.renderSelf()
    posicao3Esquerda.renderSelf()
    posicao2Esquerda.renderSelf()
    fazColisao(bola, posicao6Esquerda)
    bola.atualizaPosicao({x: 400, y: 450})
    requestAnimationFrame(gameLoop)
}
gameLoop()
