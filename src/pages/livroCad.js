import React, {useState, useEffect} from 'react';

import {View,
        Text, 
        StyleSheet, 
        KeyboardAvoidingView, 
        TextInput, 
        TouchableOpacity, 
        Alert, 
        Picker, 
        Platform
} from 'react-native';

import api from '../services/api';

export default function LivroCad(){

    const [nome, setNome] = useState('');
    const [volume, setVolume] = useState('');
    const [dataPublicacao, setDataPublicacao] = useState('');
    const [valor, setValor] = useState('');
    const [idGenero, setIdGenero] = useState('');
    const [idAutor, setIdAutor] = useState('');
    const [idEditora, setIdEditora] = useState('');



    const [generos, setGeneros] = useState([]);
    const RepositoriesGeneros = () => {
        
        
        useEffect(() => {
          async function carregarGeneros() {
            const response = await api.get('/generos');
      
            setGeneros(response.data);
          }
          
          carregarGeneros();
        }, []);
      
    };

    RepositoriesGeneros();


    const [autores, setAutores] = useState([]);
    const RepositoriesAutores = () => {
        
        
        useEffect(() => {
          async function carregarAutores() {
            const response = await api.get('/autores');
      
            setAutores(response.data);
          }
          
          carregarAutores();
        }, []);
    };

    RepositoriesAutores();

    const [editoras, setEditoras] = useState([]);
    const RepositoriesEditoras = () => {
        
        
        useEffect(() => {
          async function carregarEditoras() {
            const response = await api.get('/editoras');
      
            setEditoras(response.data);
          }
          
          carregarEditoras();
        }, []);
       
    };

    RepositoriesEditoras();


    async function handleSubmit() {
        try {
            const response = await api.post('/livros', 
        {
            nome, 
            volume, 
            dataPublicacao, 
            valor, 
            genero: {
                id : idGenero
            }, 
            autor: {
                id : idAutor
            }, 
            editora: {
                id : idEditora
            }
        });

        Alert.alert('Livro salvo com sucesso!');
        setNome('');
        setVolume('');
        setDataPublicacao('');
        setValor('');
        setIdGenero('');
        setIdAutor('');
        setIdEditora('');
            
        } catch (error) {
            console.log(error)
            Alert.alert('Erro ao realizar operação, tente novamente mais tarde!')                    
        }
    }

    return(
        <KeyboardAvoidingView enabled={Platform.OS == 'ios'}
            behavior="padding" style={styles.container}>
                <Text style={styles.titulo}>Cadastro de Livro</Text>
                <View style={styles.form}>
                    <TextInput style={styles.input}
                        placeholder="Nome do livro"
                        placeholderTextColor="#999"
                        value={nome}
                        onChangeText={setNome} />

                    <TextInput style={styles.input}
                        placeholder="Volume"
                        placeholderTextColor="#999"
                        value={volume}
                        onChangeText={setVolume} 
                        keyboardType="numeric"/>

                    <TextInput style={styles.input}
                        placeholder="Valor"
                        placeholderTextColor="#999"
                        value={valor}
                        onChangeText={setValor}
                        keyboardType="numeric" />

                    <TextInput style={styles.input}
                        placeholder="Data Publicação"
                        placeholderTextColor="#999"
                        value={dataPublicacao}
                        onChangeText={setDataPublicacao}
                        keyboardType="numeric" />

                    <Picker selectedValue={idGenero}
                        onValueChange={setIdGenero}>
                            {
                                generos.map((genero) => {
                                    return <Picker.Item key={genero.id} 
                                        label={genero.descricao} value={genero.id} />
                                })
                            }
                    </Picker>

                    <Picker selectedValue={idAutor}
                        onValueChange={setIdAutor}>
                            {
                                autores.map((autor) => {
                                    return <Picker.Item key={autor.id} 
                                        label={autor.nome} value={autor.id} />
                                })
                            }
                    </Picker>

                    <Picker selectedValue={idEditora}
                        onValueChange={setIdEditora}>
                            {
                                editoras.map((editora) => {
                                    return <Picker.Item key={editora.id} 
                                        label={editora.nome} value={editora.id} />
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