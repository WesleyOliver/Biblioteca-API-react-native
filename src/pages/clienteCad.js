import React, {useState} from 'react';

import {View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Picker, Platform
} from 'react-native';

import { RadioButton } from 'react-native-paper'


import api from '../services/api';

export default function ClienteCad(){

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [sexo, setSexo] = useState('');
    
    const [idEndereco, setIdEndereco] = useState('');



    const [enderecos, setEnderecos] = useState([]);

    async function carregarEnderecos(){
        const response = await api.get('/enderecos');
        setEnderecos(response.data);
    }

    carregarEnderecos();
    
    async function handleSubmit() {
        try {
            const response = await api.post('/clientes',
                {
                    nome,
                    cpf,
                    email,
                    telefone,
                    sexo,
                    endereco: {
                        id: idEndereco
                    }
                });

            Alert.alert('Cliente salvo com sucesso!');
            setNome('');
            setCpf('');
            setEmail('');
            setTelefone('');
            setSexo('');
            setIdEndereco('');

        } catch (error) {
            console.log(error)
            Alert.alert('Erro ao realizar operação, tente novamente mais tarde!')

        }
    }

    return(
        <KeyboardAvoidingView enabled={Platform.OS == 'ios'}
            behavior="padding" style={styles.container}>
                <Text style={styles.titulo}>Cadastro de Cliente</Text>
                <View style={styles.form}>
                    <TextInput style={styles.input}
                        placeholder="Nome do Cliente"
                        placeholderTextColor="#999"
                        value={nome}
                        onChangeText={setNome} />

                    <TextInput style={styles.input}
                        placeholder="CPF"
                        placeholderTextColor="#999"
                        value={cpf}
                        onChangeText={setCpf} 
                        keyboardType="numeric"/>

                    <TextInput style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}/>

                    <TextInput style={styles.input}
                        placeholder="Telefone"
                        placeholderTextColor="#999"
                        value={telefone}
                        onChangeText={setTelefone}
                        keyboardType="numeric" />        

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

                    <Text style={styles.label}>Endereço:</Text>
                    <Picker selectedValue={idEndereco}
                        onValueChange={setIdEndereco}>
                            {
                                enderecos.map((endereco) => {
                                    return <Picker.Item key={endereco.id} 
                                        label={endereco.rua} value={endereco.id} />
                                })
                            }
                    </Picker>

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
        fontSize: 16,
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