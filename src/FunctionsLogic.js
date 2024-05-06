//Lógicas para o jogo

const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => { //Vai virar uma matriz
        return Array(columns).fill(0).map((_, column) =>{
            return { //Isso aqui na teoria é um objeto sendo retornado
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0,
            }
        })
    })
}

//Espalhando as minas.
const spreadMines = (board, minesAmount) => {

    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0

    while (minesPlanted < minesAmount) {
        const rowSelected = parseInt(Math.random() * rows, 10)
        const columnSelected = parseInt(Math.random() * columns, 10)

        if (!board[rowSelected][columnSelected].mined){
            board[rowSelected][columnSelected].mined = true
            minesPlanted++
        }
    }
}

//Criando o board definitivo e utilizando as duas funções acima
const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns)

    spreadMines(board, minesAmount)
    return board
}


//Clonar o campo
const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return {...field}
        })
    })
}


//Essa função servirá para "pegar" os campos vizinhos do field selecionado
const getNeighbors = (board, row, column) => {
    const neighbors = [] //armazenar os vizinhos
    const rows = [row -1, row, row + 1] //Vizinhos possíveis do field atual
    const columns = [column -1, column, column + 1]

    rows.forEach( r => {
        columns.forEach(c => {
            const diferent = r !== row || c !== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length

            if (diferent && validRow && validColumn){
                neighbors.push(board[r][c])
            }
        })
    })

    return neighbors
}


//Função para saber se os campos vizinhos são seguros
const safeNeighborhood = (board, row, column) => {
    const safes = (result, neightbor) => result && !neightbor.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}


//Abrir o field
const openField = (board, row, column) => {
    const field = board[row][column]
    if (!field.opened){
        field.opened = true

        if(field.mined){
            field.exploded = true
        }
        else if (safeNeighborhood(board, row, column)) {
            getNeighbors(board,row,column)
                .forEach(n => openField(board, n.row, n.column))
        }
        else{
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
}
 

//Descobrir se existe alguma mina explodida (maior que 0).
const fields = board => [].concat(...board)
const minesExploded = board => fields(board).filter(field => field.exploded).length > 0

//Funçãozinha para saber se o usuário já ganhou ou não o jogo
const penddingField = field => (field.mined && !field.flagged)
|| (!field.mined && !field.opened)

const wonGame = board => fields(board).filter(penddingField).length === 0

//Mostrar todas as minas
const showMines = board => fields(board).filter(field => field.mined)
.forEach (field => field.opened = true)


//Marcar o campo com a bandeira
const flagField = (board, row, column) =>{
    const field = board[row][column]
    field.flagged = !field.flagged
}

//Contar quantas bandeiras já foram usadas em jogo
const flagsUsed = board => fields(board).filter(field => field.flagged).length

export {
    createMinedBoard,
    cloneBoard,
    openField,
    minesExploded,
    wonGame,
    showMines,
    flagField,
    flagsUsed
}

