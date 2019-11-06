import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createDrawerNavigator } from 'react-navigation-drawer';

import GeneroCad from './pages/generoCad';
import GeneroList from './pages/generoList';
import AutorList from './pages/autorList';
import AutorCad from './pages/autorCad';
import EditoraList from './pages/editoraList';
import EditoraCad from './pages/editoraCad';
import LivroList from './pages/livroList';
import LivroCad from './pages/livroCad';
import EnderecoList from './pages/enderecoList.js';
import EnderecoCad from './pages/enderecoCad';
import ClienteList from './pages/clienteLis';
import ClienteCad from './pages/clienteCad';
import EmprestimoList from './pages/emprestimoList';
import EmprestimoCad from './pages/emprestimoCad';


const Routes = createAppContainer(
    createDrawerNavigator({
        ListaGenero: {
            screen: GeneroList,
            navigationOptions: {
                drawerLabel: "Lista de Genero"
            }
        },       
        CadastroGenero: {
            screen: GeneroCad,
            navigationOptions: {
                drawerLabel: "Cadastro de Genero"
            }
        },
        ListaAutor:{
            screen: AutorList,
            navigationOptions: {
                drawerLabel: "Lista de Autor"
            }
        },
        CadastroAutor: {
            screen: AutorCad,
            navigationOptions: {
                drawerLabel: "Cadastro de Autor"
            }
        },
        ListaEditora: {
            screen: EditoraList,
            navigationOptions: {
                drawerLabel: "Lista de Editora"
            }
        },
        CadastroEditora: {
            screen: EditoraCad,
            navigationOptions:{
                drawerLabel: "Cadastro de Editora"
            }
        },
        ListaLivro:{
            screen: LivroList,
            navigationOptions: {
                drawerLabel: "Lista de Livro"
            }
        },
        CadastroLivro: {
            screen: LivroCad,
            navigationOptions: {
                drawerLabel: "Cadastro de Livro"
            }
        },
        ListaEndereco:{
            screen: EnderecoList,
            navigationOptions: {
                drawerLabel: "Lista de Endereço"
            }
        },
        CadastroEndereco:{
            screen: EnderecoCad,
            navigationOptions: {
                drawerLabel: "Cadastro de Endereço"
            }
        },
        ListaCliente:{
            screen: ClienteList,
            navigationOptions: {
                drawerLabel: "Lista de Cliente"
            }
        },
        CadastroCliente:{
            screen: ClienteCad,
            navigationOptions: {
                drawerLabel: "Cadastro de Cliente"
            }
        },
        ListaEmprestimo:{
            screen: EmprestimoList,
            navigationOptions: {
                drawerLabel: "Lista de Emprestimo"
            }
        },
        CadastroEmprestimo:{
            screen: EmprestimoCad,
            navigationOptions: {
                drawerLabel: "Cadastro de Emprestimo"
            }
        }
    })
);

export default Routes;