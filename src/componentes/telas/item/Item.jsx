import { useState, useEffect } from "react";
import ItemContext from "./ItemContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Item() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({codigo : "", nome : "",
                descricao : "", custo: ""});

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/itens/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => console.log('Erro: ' + err))
    }      
    
    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/itens`,
            {
                method : metodo,
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(objeto)
            })
            .then(response => response.json())
            .then(json => {
                setAlerta({status : json.status, message : json.message});
                setObjeto(json.objeto);
                if (!editar){
                    setEditar(true);
                }
            })
        } catch(err) {
            console.log(err.message);
        }
        recuperaItens();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }
 
    const recuperaItens = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/itens`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const remover = async objeto => {
        if (window.confirm('Remover este objeto?')) {
            try {
                await fetch(`${process.env.REACT_APP_ENDERECO_API}/itens/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json =>
                        setAlerta({ status: json.status, message: json.message }))
                recuperaItens();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    useEffect(() => {
        recuperaItens();
    }, []);

    return (
        <ItemContext.Provider value={ 
            {
                alerta, setAlerta, 
                listaObjetos, setListaObjetos,
                recuperaItens,
                remover,
                objeto, setObjeto, 
                editar, setEditar,
                recuperar,
                acaoCadastrar, handleChange
            }
        }>
            <Tabela/>
            <Form/>
        </ItemContext.Provider>
    )


}

export default Item;