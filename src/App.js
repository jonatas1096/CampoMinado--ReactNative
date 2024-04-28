import React, {Component} from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import params from "./Parameters";
import Field from "./Field";

export default app =>{
    return(
        <SafeAreaView style={Style.container}>
            <Text style={Style.welcome}>Welcome to my MineField game!</Text>
            <Text style={Style.gridsizeText}>Grid size: {params.getRowsAmount()} x {params.getColumnsAmount()}</Text>

            <Field></Field>
            <Field opened></Field>
            <Field opened nearMines={1}></Field>
            <Field opened nearMines={2}></Field>
            <Field opened nearMines={3}></Field>
            <Field opened nearMines={6}></Field>

            <Field mined/>
            <Field mined opened/>
            <Field mined opened exploded/>
        </SafeAreaView>
    )
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

    }
})