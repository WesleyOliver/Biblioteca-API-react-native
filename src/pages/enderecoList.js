import React, { useState } from 'react';

import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import api from '../services/api';

export default function EnderecoList() {

    const [enderecos, setEnderecos] = useState([]);

    async function carregarEnderecos(){
        const response = await api.get('/enderecos');
        setEnderecos(response.data);
    }

    carregarEnderecos();

    return( 
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Endereços</Text>
            <FlatList data={enderecos}
                style={styles.lista}
                keyExtractor={endereco => `${endereco.id}`}
                renderItem={({item}) => (
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <Text style={styles.label} >Id: {item.id}</Text>
                            <Text style={styles.label} >Rua: {item.rua}</Text>
                            <Text style={styles.label} >Bairro: {item.bairro}</Text>
                            <Text style={styles.label} >Quadra: {item.quadra}</Text>
                            <Text style={styles.label} >Lote: {item.lote}</Text>
                            <Text style={styles.label} >Número: {item.numero}</Text>
                            <Text style={styles.label} >Complemento: {item.complemento}</Text>
                            <Text style={styles.label} >Cidade: {item.cidade}</Text>
                            <Text style={styles.label} >Estado: {item.estado}</Text>
                            <Text style={styles.label} >País: {item.pais}</Text>
                            <TouchableOpacity onPress= {async () =>{
                                const id = item.id;
                                await api.delete(`/enderecos/${id}`)
                            }}>
                                <Text style={styles.botaoTexto}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )} />
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: '#0000FF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    lista: {
        paddingHorizontal: 20
    },
    titulo: {
        fontSize: 18,
        marginTop: 30,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    label: {
        fontWeight: 'bold',
        color: '#444'
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 10
    },
    botaoTexto: {
        color: '#f05a5b',
        fontWeight: 'bold',
        fontSize: 16
    }
});