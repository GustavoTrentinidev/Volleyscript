const canvas = document.getElementById("game-canvas")
const contexto = canvas.getContext("2d")

const quadraImage = new Image()
quadraImage.src = "./images/quadrapadrao.jpg"
const bolaImage = new Image()
bolaImage.src = "./images/bola.png"

const telaDeInicio = new Image()
telaDeInicio.src = "./images/telainicio.png"

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
    constructor(imagem,x,y,w,h,rl){
        super(imagem,x,y,w,h)
        this.rl = rl
    }
    renderSelf(){
        //Esse renderSelf() deve ser retirado quando o jogo estiver completo
        contexto.drawImage(this.imagem, this.x, this.y, this.w, this.h)
        if(this.rl == 'l'){
            contexto.fillStyle = 'red';
        } else{
            contexto.fillStyle = 'blue';
        }
        contexto.fillRect(this.x, this.y, 100, 100);
    }
}

posicao1Esquerda = new PosicaoJogadores(bolaImage, 200, 700, 100, 100,'l')
posicao6Esquerda = new PosicaoJogadores(bolaImage, 400, 450, 100, 100,'l')
posicao5Esquerda = new PosicaoJogadores(bolaImage, 200, 200, 100, 100,'l')
posicao4Esquerda = new PosicaoJogadores(bolaImage, 650, 200, 100, 100,'l')
posicao3Esquerda = new PosicaoJogadores(bolaImage, 750, 450, 100, 100,'l')
posicao2Esquerda = new PosicaoJogadores(bolaImage, 650, 700, 100, 100,'l')

posicao1Direita = new PosicaoJogadores(bolaImage, 1500, 200, 100, 100, 'r')
posicao6Direita = new PosicaoJogadores(bolaImage, 1300, 450, 100, 100, 'r')
posicao5Direita = new PosicaoJogadores(bolaImage, 1500, 700, 100, 100, 'r')
posicao4Direita = new PosicaoJogadores(bolaImage, 1050, 700, 100, 100, 'r')
posicao3Direita = new PosicaoJogadores(bolaImage, 950, 450, 100, 100, 'r')
posicao2Direita = new PosicaoJogadores(bolaImage, 1050, 200, 100, 100, 'r')



const posicoes = 
[posicao1Esquerda, posicao6Esquerda, posicao5Esquerda, posicao4Esquerda, posicao3Esquerda, posicao2Esquerda,
posicao1Direita, posicao6Direita, posicao5Direita, posicao4Direita, posicao3Direita, posicao2Direita]

class ObjetoBola extends Objeto{
    constructor(imagem,x,y,w,h){
        super(imagem,x,y,w,h)
    }
    atualizaPosicao(req){
        if(this.x != req.x){
            if(this.x < req.x){
                this.x = this.x + 10
            }else{
                this.x = this.x - 10
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
telaComeçar = new Objeto(telaDeInicio,0,0,1800,1000)
bola = new ObjetoBola(bolaImage, posicao1Direita.x, posicao1Direita.y, 130, 155)

function tocouNaBola(bola, posicao){
    if(bola.x == posicao.x && bola.y == posicao.y){
        console.log('Recebeu!!!!')
        gustavo.hasBola = true
    }
}


function gameLoop(){
    showScreen.renderSelf()
    requestAnimationFrame(gameLoop)
}


let showScreen = {}
function changeScreen(screen){
    console.log(`Mudando para a tela: ${screen.nome}!`)
    showScreen = screen
}
const screens = {
    startScreen:{
        nome: "StartScreen",
        renderSelf(){
            quadra.renderSelf()
            telaComeçar.renderSelf()
        }
    },
    gameScreen:{
        nome: 'GameScreen',
        renderSelf(){
            quadra.renderSelf()
            posicoes.forEach(( posicao )=>{
                posicao.renderSelf()
            })
            gustavo.renderSelf()
            bola.renderSelf()
            bola.atualizaPosicao({x: posicao1Esquerda.x, y: posicao1Esquerda.y})
            tocouNaBola(bola, posicao1Esquerda)
        }
    }
}


var eventos = ["keydown" , "click"]
eventos.forEach((evento) => {
    window.addEventListener(evento, ()=>{
        changeScreen(screens.gameScreen)
    })
})
changeScreen(screens.startScreen)
gameLoop()


class Time{
    sets = 0
    pontos = 0
    constructor(nome, jogadores){
        this.nome = nome
        this.jogadores = jogadores
    }
}
class Jogador{
    hasBola = false
    constructor(nome = null,imagem, posicao){
        this.nome = nome
        this.imagem = imagem
        this.posicao = posicao
    }
    renderSelf(){
        contexto.drawImage(this.imagem, this.posicao.x, this.posicao.y, 100, 100)
    }
}

const imagemGustavo = new Image()
imagemGustavo.src = "./images/jogadores/trentas.jpg"
const imagemVelho = new Image()
imagemVelho.src = "./images/jogadores/velho.jpg"
const imagemAmanda = new Image()
imagemAmanda.src = "./images/jogadores/amanda.jpg"
const imagemNicolas = new Image()
imagemNicolas.src = "./images/jogadores/nicocas.jpg"
const imagemLip = new Image()
imagemLip.src = "./images/jogadores/lip.jpg"
const imagemBorn = new Image()
imagemBorn.src = "./images/jogadores/born.jpg"


const gustavo = new Jogador("Trentini", imagemGustavo, posicao1Direita)
const velho = new Jogador("Velho")
const amanda = new Jogador("Amanda")
const nicolas = new Jogador("Nicolas")
const lip = new Jogador("Lip")
const born = new Jogador("Born")



timeDireita = new Time('Araquamanos',[gustavo, velho, amanda, nicolas, lip, born])
console.log(gustavo.hasBola)