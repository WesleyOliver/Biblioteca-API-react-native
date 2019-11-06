import React, { useState } from 'react';

import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert} 
    from 'react-native';

import { Platform } from '@unimodules/core';
import { useScreens } from 'react-native-screens';
import api from '../services/api';

export default function EnderecoCad(){

    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [quadra, setQuadra] = useState('');
    const [lote, setLote] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');

    async function handleSubmit(){
        try{
            const response = await api.post('/enderecos',
            {
                rua,
                bairro, 
                quadra, 
                lote, 
                numero, 
                complemento, 
                cidade, 
                estado, 
                pais
        });
        
        Alert.alert('Endereço salvo com sucesso!');
            setRua('');
            setBairro('');
            setQuadra(''); 
            setLote('');
            setNumero('');
            setComplemento('');
            setCidade('');
            setEstado(''); 
            setPais('');

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
                <Text style={styles.titulo}>Cadastro de endereço</Text>
                <TextInput style={styles.input}
                    placeholder="Nome do Rua"
                    placeholderTextColor="#999"
                    value={rua}
                    onChangeText={setRua} />

                <TextInput style={styles.input}
                    placeholder="Bairro"
                    placeholderTextColor="#999"
                    value={bairro}
                    onChangeText={setBairro} />

                <TextInput style={styles.input}
                    placeholder="Quadra"
                    placeholderTextColor="#999"
                    value={quadra}
                    onChangeText={setQuadra} />

                <TextInput style={styles.input}
                    placeholder="Lote"
                    placeholderTextColor="#999"
                    value={lote}
                    onChangeText={setLote} />

                <TextInput style={styles.input}
                    placeholder="Número"
                    placeholderTextColor="#999"
                    value={numero}
                    onChangeText={setNumero} /> 

                <TextInput style={styles.input}
                    placeholder="Complemento"
                    placeholderTextColor="#999"
                    value={complemento}
                    onChangeText={setComplemento} />  

                <TextInput style={styles.input}
                    placeholder="Cidade"
                    placeholderTextColor="#999"
                    value={cidade}
                    onChangeText={setCidade} /> 

                <TextInput style={styles.input}
                    placeholder="Estado"
                    placeholderTextColor="#999"
                    value={estado}
                    onChangeText={setEstado} />

                <TextInput style={styles.input}
                    placeholder="País"
                    placeholderTextColor="#999"
                    value={pais}
                    onChangeText={setPais} />
                    
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