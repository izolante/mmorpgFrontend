import { useContext } from 'react'
import Alerta from '../../Alerta';
import CriaturaContext from './CriaturaContext';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaLocais }
        = useContext(CriaturaContext);

    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    return (

        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Prédio</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form id="formulario" onSubmit={acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="form-group">
                                <label htmlFor="txtCodido" className="form-label">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control"
                                    id="txtCodido"
                                    name="codigo"
                                    value={objeto.codigo}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="txtNome" className="form-label">
                                    Número
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtNome"
                                    name="nome"
                                    value={objeto.nome}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Campo nome OK!
                                </div>
                                <div className="invalid-feedback">
                                    Campo nome deve ser informado
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="txtDescricao" className="form-label">
                                    Descrição
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtDescricao"
                                    name="descricao"
                                    value={objeto.descricao}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Descrição OK!
                                </div>
                                <div className="invalid-feedback">
                                    Descrição deve ser informada
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="txtNivelbase" className="form-label">
                                    Nível base
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="txtNivelbase"
                                    name="nivelbase"
                                    value={objeto.nivelbase}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Nível base OK!
                                </div>
                                <div className="invalid-feedback">
                                    Nível base deve ser informado
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="selectLocal" className="form-label">
                                    Local
                                </label>
                                <select
                                    required
                                    className="form-control"
                                    id="selectLocal"
                                    value={objeto.local}
                                    name="local"
                                    onChange={handleChange}>
                                    <option disable="true" value="">(Selecione o local)</option>
                                    {listaLocais.map((local) => (
                                        <option key={local.codigo} value={local.codigo}>
                                            {local.nome}
                                        </option>
                                    ))}
                                </select>
                                <div className="valid-feedback">
                                    Local OK
                                </div>
                                <div class="invalid-feedback">
                                    Selecione um local
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success" >
                                Salvar  <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;