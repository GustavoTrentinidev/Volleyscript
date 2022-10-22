const canvas = document.getElementById("game-canvas")
const contexto = canvas.getContext("2d")

const quadraImage = new Image()
quadraImage.src = "./images/quadrapadrao.jpg"
const bolaImage = new Image()
bolaImage.src = "./images/bolaaparada.png"
const positionImage = new Image()
positionImage.src = "./images/posicaoimg.png"
const telaDeInicio = new Image()
telaDeInicio.src = "./images/telainicio.png"

class Objeto{
    constructor(imagem,x,y,w,h){
        this.imagem = imagem
        if(this instanceof PosicaoJogadores){
            this._x = x
            this._y = y
        }else{
            this.x = x
            this.y = y
        }
        this.w = w
        this.h = h
    }
    renderSelf(){
        contexto.drawImage(this.imagem, this.x, this.y, this.w, this.h)
        // contexto.fillStyle = 'red'
        // contexto.fillRect(850, 780, 100, 100);
    }
}

class PosicaoJogadores extends Objeto{
    constructor(imagem,x,y,w,h,rl){
        super(imagem,x,y,w,h)
        this.rl = rl
    }
    get x(){
        return this._x
    }
    get y(){
        return this._y
    }
    
    
}

posicao1Esquerda = new PosicaoJogadores(positionImage, 200, 700, 100, 100,'l')
posicao6Esquerda = new PosicaoJogadores(positionImage, 400, 450, 100, 100,'l')
posicao5Esquerda = new PosicaoJogadores(positionImage, 200, 200, 100, 100,'l')
posicao4Esquerda = new PosicaoJogadores(positionImage, 650, 200, 100, 100,'l')
posicao3Esquerda = new PosicaoJogadores(positionImage, 750, 450, 100, 100,'l')
posicao2Esquerda = new PosicaoJogadores(positionImage, 650, 700, 100, 100,'l')

posicao1Direita = new PosicaoJogadores(positionImage, 1500, 200, 100, 100, 'r')
posicao6Direita = new PosicaoJogadores(positionImage, 1300, 450, 100, 100, 'r')
posicao5Direita = new PosicaoJogadores(positionImage, 1500, 700, 100, 100, 'r')
posicao4Direita = new PosicaoJogadores(positionImage, 1050, 700, 100, 100, 'r')
posicao3Direita = new PosicaoJogadores(positionImage, 950, 450, 100, 100, 'r')
posicao2Direita = new PosicaoJogadores(positionImage, 1050, 200, 100, 100, 'r')



const posicoes = 
[posicao1Esquerda, posicao6Esquerda, posicao5Esquerda, posicao4Esquerda, posicao3Esquerda, posicao2Esquerda,
posicao1Direita, posicao6Direita, posicao5Direita, posicao4Direita, posicao3Direita, posicao2Direita]

var posicoes_esquerda = []
var posicoes_direita = []
var index_posicoes = 0
for (let posicao of posicoes){
    if(index_posicoes <= 5){
        posicoes_esquerda.push(posicao)
    }else{
        posicoes_direita.push(posicao)
    }
    index_posicoes++
}

class ObjetoBola extends Objeto{
    req = {}
    bolaAndando = false
    primeiroMovimento = 0
    XIgualAZero = false
    posicaoInicial = {}
    constructor(imagem,x,y,w,h){
        super(imagem,x,y,w,h)
    }
    verificaBolaAndando(){
        if(this.x == this.req.x && this.y == this.req.y){
            this.bolaAndando = false
            this.primeiroMovimento = 0
            jogo.logica()
        }else{
            this.bolaAndando = true
            jogo.limitadorDaLogica = 0
        }
    }
    atualizaPosicao(req){
        if(this.primeiroMovimento == 0){
            this.posicaoInicial = {x: this.x, y: this.y}
        }
        let diferencaDoX = req.x - this.posicaoInicial.x
        let diferencaDoY = req.y - this.posicaoInicial.y
        let diferencaDoXAtual = this.x - this.posicaoInicial.x
        if (diferencaDoXAtual < 0){
            diferencaDoXAtual *= -1
        }
        if (diferencaDoX < 0){
            diferencaDoX *= -1
        }
        if (diferencaDoY < 0){
            diferencaDoY *= -1
        }
        let tan = diferencaDoY/diferencaDoX
        
        if(this.primeiroMovimento == 0 && diferencaDoX == 0){
            this.XIgualAZero = true
        }
        let dist = tan * diferencaDoXAtual

        // console.log('Posição de saída: ',this.posicaoInicial)
        // console.log('Posição de ida: ', req)
        // console.log("Tangente", tan)

        // console.log("Diferença X", diferencaDoX)
        // console.log("Diferença Y", diferencaDoY)
        // console.log("Dist x:", diferencaDoXAtual)
        // console.log("dist y:", dist)

        // console.log("X:", this.x)
        // console.log("Y:", this.y)

        if(this.XIgualAZero){
            if(this.y != req.y){
                if(this.y < req.y){
                    this.y += 5
                }else if(this.y > req.y) {
                    this.y -= 5
                }
            }
            if(this.y == req.y){
                this.XIgualAZero = false
            }
        }else{
            if(this.x != req.x){
                if(this.x < req.x && this.y < req.y){
                    this.x += 5
                    this.y = this.posicaoInicial.y + dist 
                }
                else if(this.x < req.x && this.y > req.y){
                    this.x += 5
                    this.y = this.posicaoInicial.y - dist 
                }
                else if (this.x > req.x && this.y < req.y){
                    this.x -= 5
                    this.y = this.posicaoInicial.y + dist 
                }
                else if (this.x > req.x && this.y > req.y){
                    this.x -= 5
                    this.y = this.posicaoInicial.y - dist 
                }
            }
            else {
                this.y = req.y
            }    
        }
        this.primeiroMovimento += 1

        
    }
}

quadra = new Objeto(quadraImage,0,0,1800,1000)
// Área do jogo começa realmente em x: 125 e y: 105
// Temina em x: 1545 e y: 745
telaComeçar = new Objeto(telaDeInicio,0,0,1800,1000)
bola = new ObjetoBola(bolaImage, posicao1Direita.x, posicao1Direita.y, 100, 100)

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
            timeEsquerda.jogadores.forEach((player)=>{
                player.renderSelf()
            })
            timeDireita.jogadores.forEach((player)=>{
                player.renderSelf()
            })
            bola.renderSelf()
            bola.verificaBolaAndando()
            if(bola.x != bola.req.x || bola.y != bola.req.y){
                bola.atualizaPosicao({x: bola.req.x, y: bola.req.y})
            } //Bola anda constantemente quando posição for diferente da requisição
            //tocouNaBola()
        }
    }
}


var eventos = ["keydown" , "click"]
eventos.forEach((evento) => {
    window.addEventListener(evento, ()=>{
        if(showScreen != screens.gameScreen){
            changeScreen(screens.gameScreen)
            jogo.caraoucoroa()
        }
    })
})
changeScreen(screens.startScreen)
gameLoop()


class Time{
    sets = 0
    pontos = 0
    num_jogada = 1
    verificaLadoProDisplay(){
        if(this.ladoQuadra == 'direita'){
            this.displayPontos = document.getElementById('pontosDireita')
            this.displaySet = document.getElementById('setsDireita')
        }else{
            this.displayPontos = document.getElementById('pontosEsquerda')
            this.displaySet = document.getElementById('setsEsquerda')
        }
    }
    constructor(nome, jogadores, ladoQuadra){
        this.nome = nome
        this.jogadores = jogadores
        this.ladoQuadra = ladoQuadra
        this.verificaLadoProDisplay()
    }
    set displayPontosTime(pontuacao){
        console.log(this.pontos , pontuacao)
        this.pontos = pontuacao
        this.displayPontos.innerHTML = this.pontos
    }
    set displaySetsTime(sets){
        this.sets = sets
        this.displaySet.innerHTML = this.sets
    }

    realizarRodizio(){
        let index0 = this.jogadores[0]
        this.jogadores.splice(0,1)
        this.jogadores.push(index0)
        if(this.ladoQuadra == 'direita'){
            this.jogadores[5].andarRodizio(posicao1Direita)
            this.jogadores[4].andarRodizio(posicao6Direita)
            this.jogadores[3].andarRodizio(posicao5Direita)
            this.jogadores[2].andarRodizio(posicao4Direita)
            this.jogadores[1].andarRodizio(posicao3Direita)
            this.jogadores[0].andarRodizio(posicao2Direita)
        } else if (this.ladoQuadra == 'esquerda'){
            this.jogadores[0].andarRodizio(posicao1Esquerda)
            this.jogadores[5].andarRodizio(posicao6Esquerda)
            this.jogadores[4].andarRodizio(posicao5Esquerda)
            this.jogadores[3].andarRodizio(posicao4Esquerda)
            this.jogadores[2].andarRodizio(posicao3Esquerda)
            this.jogadores[1].andarRodizio(posicao2Esquerda)
        }
    }
    saque(){
        this.jogadores.forEach((player) => {
            if(this.ladoQuadra == 'esquerda'){
                if((player.x == posicao1Esquerda.x) && (player.y == posicao1Esquerda.y)){
                    bola.x = player.x
                    bola.y = player.y
                    player.sacar()
                }
            }else{
                if((player.x == posicao1Direita.x) && (player.y == posicao1Direita.y)){
                    bola.x = player.x
                    bola.y = player.y
                    player.sacar()
                }
            }
        })
    }
}

let JOGADORES_PARADOS = []
class Jogador{
    hasBola = false
    constructor(nome = null,imagem, posicao){
        this.nome = nome
        this.imagem = imagem
        this.x = posicao.x
        this.y = posicao.y
    }
    posicaoAntesDeAndar = {}
    primeiroMovimento = true
    spriteMovement = {sx:0,sy:0}
    movements = [
        {sx:0,sy:0}, // Parado [0]
        {sx:380,sy:0}, // Manchete direita [1]
        {sx:380,sy:100}, // Toque direita [2]
        {sx:380,sy:200}, // Corte direita [3]
        {sx:380,sy:300}, // Saque direita [4]
        {sx:120,sy:200}, // Passo Direita 1 [5]
        {sx:250,sy:200}, // Passo Direita 2 [6]
        {sx:120,sy:300}, // Passo Esquerda 1 [7]
        {sx:240,sy:300}, // Passo Esquerda 2 [8]
        {sx:120,sy:100}, // Passo Cima 1 [9]
        {sx:250,sy:100}, // Passo Cima 2 [10]
        {sx:120,sy:0}, // Passo Baixo 1 [11]
        {sx:250,sy:0}, // Passo Baixo 2 [12]    
        {sx:505,sy:0}, // Manchete esquerda [13]
        {sx:505,sy:100}, // Toque esquerda [14]
        {sx:505,sy:200}, // Corte esquerda [15]
        {sx:505,sy:300} // Saque esquerda [16]
    ]
    renderSelf(){
        contexto.drawImage(this.imagem, this.spriteMovement.sx, this.spriteMovement.sy, 100, 100, this.x, this.y, 100, 100)
    }
    mudarSpriteJogada(spritePosicaoJogada){
        this.spriteMovement = spritePosicaoJogada
        setTimeout(()=>{
            this.spriteMovement = this.movements[0]
        },500)
    }
    passos = true
    mudarSpritesAndada(movimento1, movimento2){
            if(this.passos){
                this.spriteMovement = movimento1
            } else{
                this.spriteMovement = movimento2
            }
        this.passos = !this.passos
    }
    mudarConformeLado(direita,esquerda){
        if(bola.req.x > this.x){
            this.mudarSpriteJogada(direita)
        }else if(bola.req.x < this.x){
            this.mudarSpriteJogada(esquerda)
        } else if(bola.req.x == this.x){
            if(timeEsquerda.jogadores.includes(this)){
                this.mudarSpriteJogada(direita)
            }else{
                this.mudarSpriteJogada(esquerda)
            }
        }
    }
    jogadorParado = true
    andarRodizio(novaposicao){
        this.jogadorParado = false
        JOGADORES_PARADOS = []
        if(this.primeiroMovimento){
            this.posicaoAntesDeAndar = {x:this.x, y: this.y}
            this.primeiroMovimento = false
        }
        let intervalo = setInterval(() => {
            if(timeDireita.jogadores.includes(this)){
                if(this.x < novaposicao.x){
                    if(this.x != novaposicao.x){
                        if(this.x > novaposicao.x){
                            this.mudarSpritesAndada(this.movements[7],this.movements[8])
                            this.x -= 1
                        }else{
                            this.mudarSpritesAndada(this.movements[5],this.movements[6])
                            this.x += 1
                        }               
                    }
                    else if(this.y != novaposicao.y){
                        if(this.y> novaposicao.y){
                            this.y -= 1
                            this.mudarSpritesAndada(this.movements[9],this.movements[10])
                        }else{
                            this.mudarSpritesAndada(this.movements[11],this.movements[12])
                            this.y += 1
                        }
                    }
                    else {
                        this.x = novaposicao.x
                        this.y = novaposicao.y
                        clearInterval(intervalo) 
                        this.primeiroMovimento = true
                        this.spriteMovement = this.movements[0]
                        this.jogadorParado = true
                        this.verificaTodosOsJogadoresParados()
                    }
                }else{
                    if(this.y != novaposicao.y){
                        if(this.y> novaposicao.y){
                            this.mudarSpritesAndada(this.movements[9],this.movements[10])
                            this.y -= 1
                        }else{
                            this.mudarSpritesAndada(this.movements[11],this.movements[12])
                            this.y += 1
                        }
                    }else if(this.x != novaposicao.x){
                        if(this.x > novaposicao.x){
                            this.mudarSpritesAndada(this.movements[7],this.movements[8])
                            this.x -= 1
                        }else{
                            this.mudarSpritesAndada(this.movements[5],this.movements[6])
                            this.x += 1
                        }               
                    }
                    else {
                        this.x = novaposicao.x
                        this.y = novaposicao.y
                        clearInterval(intervalo) 
                        this.primeiroMovimento = true
                        this.spriteMovement = this.movements[0]
                        this.jogadorParado = true
                        this.verificaTodosOsJogadoresParados()
                    }
                }
            }else{
                if(this.x > novaposicao.x){
                    if(this.x != novaposicao.x){
                        if(this.x > novaposicao.x){
                            this.mudarSpritesAndada(this.movements[7],this.movements[8])
                            this.x -= 1
                        }else{
                            this.mudarSpritesAndada(this.movements[5],this.movements[6])
                            this.x += 1
                        }               
                    }
                    else if(this.y != novaposicao.y){
                        if(this.y> novaposicao.y){
                            this.mudarSpritesAndada(this.movements[9],this.movements[10])
                            this.y -= 1
                        }else{
                            this.mudarSpritesAndada(this.movements[11],this.movements[12])
                            this.y += 1
                        }
                    }
                    else {
                        this.x = novaposicao.x
                        this.y = novaposicao.y
                        clearInterval(intervalo) 
                        this.primeiroMovimento = true
                        this.spriteMovement = this.movements[0]
                        this.jogadorParado=true
                        this.verificaTodosOsJogadoresParados()
                    }
                }else{
                    if(this.y != novaposicao.y){
                        if(this.y> novaposicao.y){
                            this.mudarSpritesAndada(this.movements[9],this.movements[10])
                            this.y -= 1
                        }else{
                            this.mudarSpritesAndada(this.movements[11],this.movements[12])
                            this.y += 1
                        }
                    }else if(this.x != novaposicao.x){
                        if(this.x > novaposicao.x){
                            this.mudarSpritesAndada(this.movements[7],this.movements[8])
                            this.x -= 1
                        }else{
                            this.mudarSpritesAndada(this.movements[5],this.movements[6])
                            this.x += 1
                        }               
                    }
                    else {
                        this.x = novaposicao.x
                        this.y = novaposicao.y
                        clearInterval(intervalo) 
                        this.primeiroMovimento = true
                        this.spriteMovement = this.movements[0]
                        this.jogadorParado = true
                        this.verificaTodosOsJogadoresParados()
                    }
                }
            }
        })
    }
    verificaTodosOsJogadoresParados(){
        TODOS_OS_JOGADORES.forEach(jogador=>{ // if not includes jogador
            if(jogador.jogadorParado && !JOGADORES_PARADOS.includes(jogador)){
                JOGADORES_PARADOS.push(jogador)
            }
        })
        if(JOGADORES_PARADOS.length == 12){
            jogo.quandoTodosPararemDeAndar()
        }
    }
    sacar(){
        if(timeEsquerda.jogadores.indexOf(this)){
            bola.req = gerarPosReq(1545, 745)
            jogo.ultimo_time_a_tocar_na_bola = timeEsquerda
        }else{
            bola.req = gerarPosReq(1545, 745)
            jogo.ultimo_time_a_tocar_na_bola = timeDireita
        }
        this.mudarConformeLado(this.movements[4],this.movements[16])
    }
    receber(){
        if(timeEsquerda.jogadores.indexOf(this) != -1){
            if(this.x == posicao3Esquerda.x && this.y == posicao3Esquerda.y){
                if(numeroAleatorio(1) == 0){
                    bola.req = {x: posicao2Esquerda.x, y: posicao2Esquerda.y}
                } else{
                    bola.req = {x: posicao4Esquerda.x, y: posicao4Esquerda.y}
                }
            }else{
                if(numeroAleatorio(3) == 0){
                    bola.req = gerarPosReq(1545, 745)
                }else {
                    bola.req = {x: posicao3Esquerda.x, y: posicao3Esquerda.y}
                }
            }
        }else {
            if(this.x == posicao3Direita.x && this.y == posicao3Direita.y){
                if(numeroAleatorio(1) == 0){
                    bola.req = {x: posicao2Direita.x, y: posicao2Direita.y}
                } else{
                    bola.req = {x: posicao4Direita.x, y: posicao4Direita.y}
                }
            }else{
                if(numeroAleatorio(3) == 0){
                    bola.req = gerarPosReq(1545, 745)
                }else {
                    bola.req = {x: posicao3Direita.x, y: posicao3Direita.y}
                }
            }
        }
        this.mudarConformeLado(this.movements[1],this.movements[13])
    }
    levantar(){
        if(timeEsquerda.jogadores.includes(this)){
            // console.log('esquerda!')
            if(numeroAleatorio(3 == 0)){
                bola.req = gerarPosReq(1545, 745)
            }else{
                if(this.x == posicao4Esquerda.x && this.y == posicao4Esquerda.y){
                    bola.req = {x: posicao2Esquerda.x, y: posicao2Esquerda.y}
                }else if (this.x == posicao2Esquerda.x && this.y == posicao2Esquerda.y){
                    bola.req = {x: posicao4Esquerda.x, y: posicao4Esquerda.y}
                } else{
                    if(numeroAleatorio(1)==0){
                        bola.req = {x: posicao2Esquerda.x, y: posicao2Esquerda.y}
                    }else{
                        bola.req = {x: posicao4Esquerda.x, y: posicao4Esquerda.y}
                    }
                }
            }
        }else{
            // console.log('direita!')
            if(numeroAleatorio(3 == 0)){
                bola.req = gerarPosReq(1545, 745)
            }else{
                if(this.x == posicao4Direita.x && this.y == posicao4Direita.y){
                    bola.req = {x: posicao2Direita.x, y: posicao2Direita.y}
                }else if (this.x == posicao2Direita.x && this.y == posicao2Direita.y){
                    bola.req = {x: posicao4Direita.x, y: posicao4Direita.y}
                } else{
                    if(numeroAleatorio(1)==0){
                        bola.req = {x: posicao2Direita.x, y: posicao2Direita.y}
                    }else{
                        bola.req = {x: posicao4Direita.x, y: posicao4Direita.y}
                    }
                }
            }
        }
        this.mudarConformeLado(this.movements[2],this.movements[14])
    }
    cortar(){
        if(timeEsquerda.jogadores.includes(this)){
            bola.req = gerarPosReq(1545,745)
        }else{
            bola.req = gerarPosReq(850,745)
        }
        this.mudarConformeLado(this.movements[3],this.movements[15])
    }
}

function gerarPosReq(xnum, ynum){
    let x = numeroAleatorio(xnum)
    let y = numeroAleatorio(ynum)
    while(x % 10 != 0){
        x = numeroAleatorio(xnum)
    }
    while(y % 5 != 0){
        y = numeroAleatorio(ynum)
    }
    return {x: x, y: y}
}

const imagemGustavo = new Image()
imagemGustavo.src = "./images/jogadores/TRENTAS.png"
const imagemVelho = new Image()
imagemVelho.src = "./images/jogadores/VELHO.png"
const imagemAmanda = new Image()
imagemAmanda.src = "./images/jogadores/AMANDA.png"
const imagemNicolas = new Image()
imagemNicolas.src = "./images/jogadores/NICOLAIS.png"
const imagemLip = new Image()
imagemLip.src = "./images/jogadores/LIPASCERTO.png"
const imagemBorn = new Image()
imagemBorn.src = "./images/jogadores/BORN.png"


const born = new Jogador("Born", imagemBorn, posicao1Direita)
const velho = new Jogador("Velho", imagemVelho, posicao2Direita)
const gustavo = new Jogador("Trentini", imagemGustavo, posicao3Direita)
const amanda = new Jogador("Amanda", imagemAmanda, posicao4Direita)
const nicolas = new Jogador("Nicolas", imagemNicolas, posicao5Direita)
const lip = new Jogador("Lip", imagemLip, posicao6Direita)

const imagemRandons = new Image()
imagemRandons.src = "./images/jogadores/LIPASCERTO.png"

const random1 = new Jogador("Random1", imagemRandons, posicao1Esquerda)
const random2 = new Jogador("Random2", imagemRandons, posicao2Esquerda)
const random3 = new Jogador("Random3", imagemRandons, posicao3Esquerda)
const random4 = new Jogador("Random4", imagemRandons, posicao4Esquerda)
const random5 = new Jogador("Random5", imagemRandons, posicao5Esquerda)
const random6 = new Jogador("Random6", imagemRandons, posicao6Esquerda)

timeDireita = new Time('JPA',[born, velho, gustavo, amanda, nicolas, lip], 'direita')
timeEsquerda = new Time('BRA',[random1, random2, random3, random4, random5, random6], 'esquerda')
times = [timeEsquerda, timeDireita]
TODOS_OS_JOGADORES = [born, velho, gustavo, amanda, nicolas, lip, random1, random2, random3, random4, random5, random6]
function numeroAleatorio(range){
    return Math.round(Math.random() * range) 
}

class Jogo{
    jogo_jogada = 0
    ultimo_time_a_marcar = null
    time_que_sacou = null
    ultimo_time_a_tocar_na_bola = null
    time_que_ganhou_o_set = null
    limitadorDaLogica = 0 // Permite que o método logica() rode apenas UMA vez ao parar da bola!
    constructor(timeEsquerda, timeDireita){
        if(!(timeEsquerda instanceof Time) || !(timeDireita instanceof Time)){
            throw new Error('Os times devem ser uma instancia da classe Time')
        }else{
            timeEsquerda = timeEsquerda
            timeDireita = timeDireita
        }
    }
    logica(){
        if(this.limitadorDaLogica == 0){
            if(!bola.bolaAndando){ // Verifica se a bola está parada
                let jogadorDaEsquerda = this.bolaComJogador(timeEsquerda)
                let jogadorDaDireita = this.bolaComJogador(timeDireita)
                if(jogadorDaEsquerda){ // Verifica se a bola está com algum jogador no time da Esquerda
                    console.log(jogadorDaEsquerda.nome)
                    if(this.ultimo_time_a_tocar_na_bola != timeEsquerda && timeEsquerda.num_jogada == 4){
                        timeEsquerda.num_jogada = 1  
                    }
                    if(this.jogo_jogada > 1 || this.time_que_sacou != timeEsquerda){
                        if(timeEsquerda.num_jogada == 1){
                            jogadorDaEsquerda.receber()
                            timeEsquerda.num_jogada += 1
                            this.jogo_jogada += 1
                            this.ultimo_time_a_tocar_na_bola = timeEsquerda
                        }else if (timeEsquerda.num_jogada == 2){
                            jogadorDaEsquerda.levantar()
                            timeEsquerda.num_jogada += 1
                            this.jogo_jogada += 1
                            this.ultimo_time_a_tocar_na_bola = timeEsquerda
                        } else if (timeEsquerda.num_jogada == 3){
                            jogadorDaEsquerda.cortar()
                            timeEsquerda.num_jogada += 1
                            this.jogo_jogada += 1
                            this.ultimo_time_a_tocar_na_bola = timeEsquerda
                        } else{ 
                            this.aumentarPontuacao(timeDireita)
                        }
                    }else{
                        this.aumentarPontuacao(timeDireita)
                    }
                }else if(jogadorDaDireita){ // Verifica se a bola está com algum jogador no time da Direita
                    console.log(jogadorDaDireita.nome)
                    if(this.ultimo_time_a_tocar_na_bola != timeDireita && timeDireita.num_jogada == 4){
                        timeDireita.num_jogada = 1  
                    }
                    if(this.jogo_jogada > 1 || this.time_que_sacou != timeDireita){
                        if(timeDireita.num_jogada == 1){
                            jogadorDaDireita.receber()
                            timeDireita.num_jogada += 1
                            this.jogo_jogada += 1
                            this.ultimo_time_a_tocar_na_bola = timeDireita
                        }else if (timeDireita.num_jogada == 2){
                            jogadorDaDireita.levantar()
                            timeDireita.num_jogada += 1
                            this.jogo_jogada += 1
                            this.ultimo_time_a_tocar_na_bola = timeDireita
                        } else if (timeDireita.num_jogada == 3){
                            jogadorDaDireita.cortar()
                            timeDireita.num_jogada += 1
                            this.jogo_jogada += 1
                            this.ultimo_time_a_tocar_na_bola = timeDireita
                        } else {
                            this.aumentarPontuacao(timeEsquerda)
                        }
                    } else{
                        this.aumentarPontuacao(timeEsquerda)
                    }
                }else{ // Verifica se a bola está no chão
                    console.log('No chão')
                    if(this.ultimo_time_a_tocar_na_bola == timeDireita){
                        if(bola.x > 100 && bola.y > 120 && bola.y < 780 && bola.x <= 850){ //Verifica se a bola caiu do lado esquerdo
                            this.aumentarPontuacao(timeDireita)
                        } else{
                            this.aumentarPontuacao(timeEsquerda)
                        }
                    }else{
                        if(bola.x > 100 && bola.y > 120 && bola.y < 780 && bola.x >= 850){ //Verifica se a bola caiu do lado direito
                            this.aumentarPontuacao(timeEsquerda)
                        }else {
                            this.aumentarPontuacao(timeDireita)
                        }
                    }
                }
            }
        }
        this.limitadorDaLogica = 1
    }
    bolaComJogador(time){
        let jogagadorzasso
        time.jogadores.forEach(jogador=>{
            if(bola.x < jogador.x + 150 && bola.y < jogador.y + 150 && bola.x > jogador.x - 150 && bola.y > jogador.y - 150){
                // console.log(jogador.nome, time.ladoQuadra)
                jogagadorzasso = jogador
            }
        })
        return jogagadorzasso
    }

    quandoTodosPararemDeAndar(){
        if((timeEsquerda.sets != 0 || timeDireita.sets != 0) && (timeEsquerda.pontos == 0 && timeDireita.pontos == 0)){
            setTimeout(()=>{
                this.comecarRally(this.time_que_ganhou_o_set)
            },1000)
        }else{
            setTimeout(()=>{
                this.comecarRally(this.ultimo_time_a_marcar)
            },1000)
        }
    }
    setarPlacar(){
        timeEsquerda.verificaLadoProDisplay()
        timeDireita.verificaLadoProDisplay()
        let nomeEsquerda = document.querySelectorAll('.nome')[0] 
        let pontosEsquerda = document.getElementById('pontosEsquerda')
        let setsEsquerda = document.getElementById('setsEsquerda')
        let nomeDireita = document.querySelectorAll('.nome')[1]
        let pontosDireita = document.getElementById('pontosDireita')
        let setsDireita = document.getElementById('setsDireita')
        nomeEsquerda.innerHTML = timeEsquerda.nome
        pontosEsquerda.innerHTML = timeEsquerda.pontos
        setsEsquerda.innerHTML = timeEsquerda.sets
        nomeDireita.innerHTML = timeDireita.nome
        pontosDireita.innerHTML = timeDireita.pontos
        setsDireita.innerHTML = timeDireita.sets
    }
    mudarLadosDosTimes(){
        let aux = timeEsquerda
        timeEsquerda = timeDireita
        timeEsquerda.ladoQuadra = "esquerda"
        timeDireita = aux
        timeDireita.ladoQuadra = "direita"
        timeEsquerda.jogadores.forEach((jogador)=>{
            posicoes_direita.forEach((posicao,index)=>{
                if(jogador.x == posicao.x && jogador.y == posicao.y ){
                    // jogador.x = posicoes_esquerda[index].x
                    // jogador.y = posicoes_esquerda[index].y
                    jogador.andarRodizio(posicoes_esquerda[index])
                }
            })
        })
        timeDireita.jogadores.forEach((jogador)=>{
            posicoes_esquerda.forEach((posicao,index)=>{
                if(jogador.x == posicao.x && jogador.y == posicao.y){
                    // jogador.x = posicoes_direita[index].x
                    // jogador.y = posicoes_direita[index].y
                    jogador.andarRodizio(posicoes_direita[index])
                }
            })
        })
        this.setarPlacar()
    }
    novoSet(){
        timeDireita.displayPontosTime = 0
        timeEsquerda.displayPontosTime = 0
        this.mudarLadosDosTimes()
        // this.comecarRally(this.time_que_ganhou_o_set)
        // this.time_que_ganhou_o_set = null
    }
    verificaPontos(){
        if(timeDireita.pontos >= 2 || timeEsquerda.pontos >= 2){
            if((timeDireita.pontos - timeEsquerda.pontos) >= 2 || (timeEsquerda.pontos - timeDireita.pontos) >= 2){
                if(timeDireita.pontos > timeEsquerda.pontos){
                    timeDireita.displaySetsTime = timeDireita.sets += 1
                    this.time_que_ganhou_o_set = timeDireita
                    this.novoSet()
                    return true
                }else{
                    timeEsquerda.displaySetsTime = timeEsquerda.sets += 1   
                    this.time_que_ganhou_o_set = timeEsquerda  
                    this.novoSet()
                    return true
                }
            }
        }
        return false
    }

    aumentarPontuacao(time){
        time.displayPontosTime = time.pontos + 1
        this.verificaPontos()
        if(this.ultimo_time_a_marcar != time && !this.verificaPontos()){
            time.realizarRodizio()
        }else{
            setTimeout(()=>{
                this.comecarRally(time)
            },1000)
        }
        this.ultimo_time_a_marcar = time
        this.time_que_sacou = null
       
    }
    caraoucoroa(){
        if(numeroAleatorio(1) == 0){
            this.time_que_sacou = timeEsquerda
            this.comecarRally(timeEsquerda)
        }else {
            this.time_que_sacou = timeDireita
            this.comecarRally(timeDireita)
        }
    }
    comecarRally(time){
        this.jogo_jogada = 0
        timeDireita.num_jogada = 1
        timeEsquerda.num_jogada = 1
        time.saque()
        this.jogo_jogada += 1
        this.time_que_sacou = time
        this.ultimo_time_a_tocar_na_bola = time
    }
}
timeDireita.realizarRodizio()
const jogo = new Jogo(timeEsquerda, timeDireita)
