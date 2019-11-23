import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert} 
    from 'react-native';
import { Platform } from '@unimodules/core';
import { useScreens } from 'react-native-screens';
import api from '../services/api';

export default function GeneroCad() {

    const [descricao, setDescricao] = useState('');

    async function handleSubmit() {
        try {
            const response = await api.post('/generos', 
        {
            descricao
        });

        Alert.alert('Genero salvo com sucesso!');
        setDescricao('');

            
        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao realizar operação, tente novamente mais tarde!');                   
        }
    }
    return(
        <KeyboardAvoidingView 
            enabled={Platform.OS == 'ios'} 
            behavior="padding"
            style={styles.container} >
            <Text style={styles.titulo}>Cadastro de Genero</Text>
            <View style={styles.form}>                

                <TextInput style={styles.input}
                    placeholder="Descrição do genero"
                    placeholderTextColor="#999"
                    value={descricao}
                    onChangeText={setDescricao} />
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
    }
});