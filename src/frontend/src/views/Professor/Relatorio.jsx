import { Link, Outlet } from 'react-router-dom';
import '../../styles/menuUsuarios.css';

export default function RelatorioProf() {
    return (
        <>
            <div class="height-100">
                <h4>Relatórios</h4>
          
                    <div class="container">
                        <div class="row">
                            <div class="col-6">
                                <select class="form-select form-select-md mb-3" aria-label="Large select example">
                                    <option selected>Selecione o curso</option>
                                    <option value="1">TI</option>
                                    <option value="2">ADS</option>
                                    <option value="3">SI</option>
                                </select>
                            </div>
                            <div class="col-6">
                                <select class="form-select form-select-md" aria-label="Small select example">
                                    <option selected>Selecione a disciplina</option>
                                    <option value="1">NOSQL</option>
                                    <option value="2">TIDAI</option>
                                    <option value="3">FRONTEND</option>
                                </select>
                            </div>
                        </div>

                       
                          
                                <div class="row">
                                    <div class="col-3 mb-4">
                                        <div class="p-3 bg-primary text-white rounded">
                                            <h5>Notas</h5>
                                            <button id="btn_notas" type="button" class="btn btn-light w-100" data-bs-toggle="modal" data-bs-target="#cadastro-usuario">Gerar Relatório</button>
                                        </div>
                                    </div>
                                    <div class="col-3 mb-4">
                                        <div class="p-3 bg-primary text-white rounded">
                                            <h5>Frequência</h5>
                                            <button id="btn_frequencia" type="button" class="btn btn-light w-100" data-bs-toggle="modal" data-bs-target="#cadastro-usuario">Gerar Relatório</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                    </div>
                </>
                );
}
