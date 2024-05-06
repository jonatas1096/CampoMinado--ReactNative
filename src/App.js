import React, {Component} from "react";
import { SafeAreaView, View, StyleSheet, Text, Alert } from "react-native";
import params from "./Parameters";
import { 
    createMinedBoard,
    cloneBoard, 
    openField,
    minesExploded,
    wonGame,
    showMines,
    flagField,
    flagsUsed
    } from './FunctionsLogic';
import Header from "./Header";
import MinedField from "./MinedField";
import LevelSelection from "./screens/LevelSelection";

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = this.createState()
    }

    minesAmount = () => {
        const columns = params.getColumnsAmount()
        const rows = params.getRowsAmount()
        return Math.ceil(columns * rows * params.difficultLevel)
    }

    createState = () => {
        const columns = params.getColumnsAmount()
        const rows = params.getRowsAmount()
        return {
            board:  createMinedBoard(rows, columns, this.minesAmount()),
            won: false,
            lost: false,
            showLevelSelection: false,
        }
    }

    onOpenField = (row, column) => {
        const board = cloneBoard(this.state.board)
        openField(board, row, column)
        const lost = minesExploded(board)
        const won = wonGame(board)

        if (lost){
            showMines(board)
            Alert.alert('Você perdeu.')
        }
        if (won){
            Alert.alert('Parabéns, você venceu.')
        }

        this.setState({board, lost, won})
    }

     onSelectField = (row, column) => {
        const board = cloneBoard(this.state.board)
        flagField(board, row, column)
        const won = wonGame(board)

        if (won){
            Alert.alert('Parabéns, você venceu.')
        }

        this.setState({board, won})
    }

    onLevelSelected = level => {
        params.difficultLevel = level
        this.setState(this.createState())
    }

    render() {
        return(
            <SafeAreaView style={Style.container}>
                <LevelSelection visible={this.state.showLevelSelection}
                onFlagPress={() => this.setState({showLevelSelection: true})} 
                onLevelSelected={this.onLevelSelected} 
                onCancel={() => this.setState({showLevelSelection:false})}
                />
                <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)} onNewGame={() => this.setState(this.createState())} onFlagPress={() => this.setState({showLevelSelection:true})}></Header>
                {/* <Text style={Style.welcome}>Welcome to my MineField game!</Text>
                <Text style={Style.gridsizeText}>Grid size: {params.getRowsAmount()} x {params.getColumnsAmount()}</Text> */}

                
                <View style={Style.board}>
                    <MinedField board={this.state.board} onOpenField={this.onOpenField} onSelectField={this.onSelectField}/>
                </View>
            </SafeAreaView>
        )
    }
}


const Style = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    gridsizeText:{
        fontSize: 15,
        fontWeight: "bold",

    },

    board:{
        alignItems: 'center',
        backgroundColor: '#AAA',
    }
})