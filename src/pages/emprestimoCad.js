import React, {useState, useEffect} from 'react';

import {View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Picker, Platform
} from 'react-native';

import api from '../services/api';

export default function EmprestimoCad(){

    const [dataDoEmprestimo, setDataDoEmprestimo] = useState('');
    const [dataDaDevolucao, setDataDaDevolucao] = useState('');
    const [valorDoEmprestimo, setValorDoEmprestimo] = useState('');
    const [idLivro, setIdLivro] = useState('');
    const [idCliente, setIdCliente] = useState('');


    const [livros, setLivros] = useState([]);
    const RepositoriesLivros = () => {
        
        
        useEffect(() => {
          async function carregarLivros() {
            const response = await api.get('/livros');
      
            setLivros(response.data);
          }
          carregarLivros();
        }, []);
      
    };

    RepositoriesLivros();

    const [clientes, setClientes] = useState([]);
    const RepositoriesClientes = () => {
        
        
        useEffect(() => {
          async function carregarClientes() {
            const response = await api.get('/clientes');
      
            setClientes(response.data);
          }
          carregarClientes();
        }, []);
      
    };

    RepositoriesClientes();

        async function handleSubmit() {
        try {
            const response = await api.post('/emprestimos', 
        {
            dataDoEmprestimo, 
            dataDaDevolucao, 
            valorDoEmprestimo, 
            livro: {
                id : idLivro
            },
            cliente: {
                id : idCliente
            }
        });

        Alert.alert('Emprestimo salvo com sucesso!');
        setDataDoEmprestimo('');
        setDataDaDevolucao('');
        setValorDoEmprestimo('');
        setIdLivro('');
        setIdCliente('');
            
        } catch (error) {
            console.log(error)
            Alert.alert('Erro ao realizar operação, tente novamente mais tarde!')                    
        }
    }

    return(
        <KeyboardAvoidingView enabled={Platform.OS == 'ios'}
            behavior="padding" style={styles.container}>
                <Text style={styles.titulo}>Cadastro de Emprestimo</Text>
                <View style={styles.form}>
                    <TextInput style={styles.input}
                        placeholder="Data Emprestimo"
                        placeholderTextColor="#999"
                        value={dataDoEmprestimo}
                        onChangeText={setDataDoEmprestimo}
                        keyboardType="numeric" />

                    <TextInput style={styles.input}
                        placeholder="Data Devoluçao"
                        placeholderTextColor="#999"
                        value={dataDaDevolucao}
                        onChangeText={setDataDaDevolucao}
                        keyboardType="numeric" />

                    <TextInput style={styles.input}
                        placeholder="Valor Emprestimo"
                        placeholderTextColor="#999"
                        value={valorDoEmprestimo}
                        onChangeText={setValorDoEmprestimo}
                        keyboardType="numeric" />

                    <Picker selectedValue={idLivro}
                        onValueChange={setIdLivro}>
                            {
                                livros.map((livro) => {
                                    return <Picker.Item key={livro.id} 
                                        label={livro.nome} value={livro.id} />
                                })
                            }
                    </Picker>

                    <Picker selectedValue={idCliente}
                        onValueChange={setIdCliente}>
                            {
                                clientes.map((cliente) => {
                                    return <Picker.Item key={cliente.id} 
                                        label={cliente.nome} value={cliente.id} />
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