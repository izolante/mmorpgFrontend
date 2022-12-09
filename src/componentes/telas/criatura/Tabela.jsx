import { useContext } from "react";
import CriaturaContext from "./CriaturaContext";
import Alerta from "../../Alerta";

function Tabela() {

    const { setObjeto, alerta, setAlerta, listaObjetos, remover,
        setEditar, recuperar } =
        useContext(CriaturaContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Criaturas</h1>
            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => {
                    setObjeto({ codigo: 0, numero: "", descricao: "",
                     capacidade : "", local: "" })
                    setEditar(false);
                    setAlerta({ status: "", message: "" });
                }}>
                Novo <i className="bi bi-pencil-square"></i>
            </button>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && <h1>Nenhuma criatura encontrada</h1>}
            {listaObjetos.length > 0 &&

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">Código</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Nível base</th>
                            <th scope="col">Local</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.codigo}>
                                <td align="center">
                                    <button className="btn btn-info"
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                        onClick={() => {
                                            recuperar(objeto.codigo);
                                            setEditar(true);
                                            setAlerta({ status: "", message: "" });
                                        }}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.descricao}</td>
                                <td>{objeto.nivelbase}</td>
                                <td>{objeto.nomelocal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }

        </div>
    )
}

export default Tabela;