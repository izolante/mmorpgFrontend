import { useState, useEffect } from "react";
import LocalContext from "./LocalContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Local() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({codigo : "", nome : "",
                descricao : "", custo: ""});

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/locais/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => console.log('Erro: ' + err))
    }      
    
    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/locais`,
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
        recuperaLocais();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }
 
    const recuperaLocais = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/locais`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const remover = async objeto => {
        if (window.confirm('Remover este objeto?')) {
            try {
                await fetch(`${process.env.REACT_APP_ENDERECO_API}/locais/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json =>
                        setAlerta({ status: json.status, message: json.message }))
                recuperaLocais();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    useEffect(() => {
        recuperaLocais();
    }, []);

    return (
        <LocalContext.Provider value={ 
            {
                alerta, setAlerta, 
                listaObjetos, setListaObjetos,
                recuperaLocais,
                remover,
                objeto, setObjeto, 
                editar, setEditar,
                recuperar,
                acaoCadastrar, handleChange
            }
        }>
            <Tabela/>
            <Form/>
        </LocalContext.Provider>
    )


}

export default Local;