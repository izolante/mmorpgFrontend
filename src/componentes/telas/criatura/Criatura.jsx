import { useState, useEffect } from "react";
import CriaturaContext from "./CriaturaContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Criatura() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({codigo : "", nome : "",
                descricao : "", sigla: ""});
    const [listaLocais, setListaLocals] = useState([]);

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/criaturas/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => console.log('Erro: ' + err))
    }      
    
    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/criaturas`,
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
        recuperaCriaturas();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    const recuperaCriaturas = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/criaturas`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }    
 
    const recuperaLocais = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/locais`)
            .then(response => response.json())
            .then(data => setListaLocals(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${process.env.REACT_APP_ENDERECO_API}/criaturas/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json =>
                        setAlerta({ status: json.status, message: json.message }))
                recuperaCriaturas();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    useEffect(() => {
        recuperaCriaturas();
        recuperaLocais();
    }, []);

    return (
        <CriaturaContext.Provider value={ 
            {
                alerta, setAlerta, 
                listaObjetos, setListaObjetos,
                recuperaLocais,
                remover,
                objeto, setObjeto, 
                editar, setEditar,
                recuperar,
                acaoCadastrar, handleChange, listaLocais
            }
        }>
            <Tabela/>
            <Form/>
        </CriaturaContext.Provider>
    )


}

export default Criatura;