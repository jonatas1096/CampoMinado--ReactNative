import React from "react";
import { View, StyleSheet, Text } from "react-native";
import params from "./Parameters";
import Mine from "./Mine";

export default props => {

    const {mined, opened, nearMines, exploded} = props //Isso aqui é aquela fita de "Destructing"
    
    //Acima é o meio que usamos para saber o que a mina é. Seja ela aberta, fechada ou se tem minas próximas.
    //Com base nisso, abaixo aplicamos o respectivo estilo para ela.
    const styleField = [styles.field]

    if (opened) styleField.push(styles.opened) //Se estiver com a propriedade field lá no "App.js", a gente coloca mais um estilo.
    if (exploded) styleField.push(styles.exploded) //Se estiver explodida, aplicamos outro estilo.
    if (styleField.length === 1) styleField.push(styles.regular) //Esse tem que ficar por ultimo, em ultimo caso o campo vai ser padrãozinho.
    
    //Isso é uma lógica para mudar a cor do campo com base na quantidade de minas que tem ao redor dele.
    let color = null
    if (nearMines > 0){
        if (nearMines == 1) color = '#2A28D7'
        if (nearMines == 2) color = '#2B520F'
        if (nearMines > 2 && nearMines < 6) color = '#F9060A'
        if (nearMines >= 6) color = '#F221A9'
    }


    //Aqui retornamos o campo em si, e vai depender das condições que ele vai estar.
    return(
        <View style={styleField}>
            {!mined && opened && nearMines > 0 ? //Condição
                <Text style={[styles.label, {color: color}]}>
                    {nearMines} 
                </Text>
            :false  //else -> false.
        }
            {mined && opened ? <Mine /> : false} 
        </View>
    )

}


const styles = StyleSheet.create({

    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize,
    },

    regular:{
        backgroundColor: '#999',
        borderLeftColor: '#CCC',
        borderTopColor: '#CCC',
        borderRightColor: '#333',
        borderBottomColor: '#333',
    },

    opened:{
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center',
    },

    label:{
        fontWeight: 'bold',
        fontSize: params.fontSize,
    },

    exploded:{
        backgroundColor: 'red',
        borderColor: 'red',
    }
})
