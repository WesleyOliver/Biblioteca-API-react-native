import React, { useState } from 'react';

import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert} 
    from 'react-native';

import { RadioButton } from 'react-native-paper'

import { Platform } from '@unimodules/core';
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
            <Text style={styles.titulo}>Cadastro de Autor</Text>
            <View style={styles.form}>
        
                <TextInput style={styles.input}
                    placeholder="Nome do Autor"
                    placeholderTextColor="#999"
                    value={nome}
                    onChangeText={setNome} />

                <View style={styles.radioSexo}>
                
                    <RadioButton.Group
                        onValueChange={setSexo}
                        value={sexo} >
                        <View style={styles.radioSexoOption}>
                            <Text>Masculino</Text>
                            <RadioButton value="MASCULINO" />
                        </View>
                        <View style={styles.radioSexoOption}>
                            <Text>Feminino</Text>
                            <RadioButton value="FEMININO" />
                        </View>
                    </RadioButton.Group>
                </View>
                    
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
        backgroundColor: '#FFFFF0',
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
        width: 150,
        backgroundColor: '#87CEEB',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7
    },
    botaoTexto: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    radioSexo: {
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    radioSexoOption: {
        marginRight: 30,
        marginLeft: 30
    }
});