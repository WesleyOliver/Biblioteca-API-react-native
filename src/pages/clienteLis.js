import React, { useState } from 'react';

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function ClienteList() {

    const [clientes, setClientes] = useState([]);

    async function carregarClientes() {
        const response = await api.get('/clientes');
        setClientes(response.data);
    }

    carregarClientes();

    return(
        <View style={styles.container}>
           <Text style={styles.titulo}>Lista de Cliente</Text>
           <FlatList data={clientes} 
             style={styles.lista}
             keyExtractor={cliente => `${cliente.id}`}
             renderItem={({item}) => (
                 <View style={styles.container}>
                   <View style={styles.card}>
                     <Text style={styles.label} >Id: {item.id}</Text>
                     <Text style={styles.label}>Nome: {item.nome}</Text>
                     <Text style={styles.label}>CPF: {item.cpf}</Text>
                     <Text style={styles.label}>Email: {item.email}</Text>
                     <Text style={styles.label}>Telefone: {item.telefone}</Text>
                     <Text style={styles.label}>Endereço: {item.endereco.id}</Text>
                     <Text style={styles.label}>Sexo: {item.sexo}</Text>
                     <TouchableOpacity onPress={ async () =>{
                         const id = item.id;
                         await api.delete(`/clientes/${id}`)
                     }}>
                        <Text style={styles.botaoTexto}>Excluir</Text>
                     </TouchableOpacity>
                   </View>
                 </View>
             ) }
            />
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