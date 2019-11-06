import React, { useState } from 'react';

import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert} 
    from 'react-native';

import { Platform } from '@unimodules/core';
import { useScreens } from 'react-native-screens';
import api from '../services/api';

export default function AutorCad(){

    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');

    async function handleSubmit(){
        try{
            const response = await api.post('/autores',
            {
            nome,
            sexo
        });
        
        Alert.alert('Autor salvo com sucesso!');
        setNome('');
        setSexo('');

        }catch (error){
            console.log(error);
            Alert.alert('Erro ao realizar operação, tente novamente mais tarde"');
        }
    }

    return(
        <KeyboardAvoidingView 
                enabled={Platform.OS == 'ios'} 
                behavior="padding"
                style={styles.container} >
            <View style={styles.form}>
                <Text style={styles.titulo}>Cadastro de Autor</Text>
                <TextInput style={styles.input}
                    placeholder="Nome do Autor"
                    placeholderTextColor="#999"
                    value={nome}
                    onChangeText={setNome} />

                <TextInput style={styles.input}
                    placeholder="Sexo"
                    placeholderTextColor="#999"
                    value={sexo}
                    onChangeText={setSexo} />
                    
                <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                    <Text style={styles.botaoTexto}>Salvar</Text>
                </TouchableOpacity>
    
            </View>
        </KeyboardAvoidingView>
    );
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    titulo : {
        fontSize: 20,
        marginBottom: 5
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        marginBottom: 20,
        borderRadius: 2
    },
    botao: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    botaoTexto: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});