import { Link, Outlet } from 'react-router-dom';
import '../../styles/menuUsuarios.css';

export default function AtividadeProf() {
    return (
        <>
        <div class="accordion mb-5" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Módulo 1
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <a href="aula.html">1. Tarefa </a>
                                <p> Disponível até 4 out em 23:59 | -/5 pts</p>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <a href="aula.html">1. Tarefa </a>
                                <p> Disponível até 4 out em 23:59 | -/5 pts</p>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <a href="aula.html">1. Tarefa </a>
                                <p> Disponível até 4 out em 23:59 | -/5 pts</p>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <a href="aula.html">1. Tarefa </a>
                                <p> Disponível até 4 out em 23:59 | -/5 pts</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <form class="row g-3">
                            <div class="col-3">
                                <label for="moduloInput" class="form-label">Módulo</label>
                                <input type="text" class="form-control" id="moduloInput" placeholder="001" disabled></input>
                            </div>
        
                            <div class="col-9">
                                <label for="tituloInput" class="form-label">Título</label>
                                <input type="text" class="form-control" id="tituloInput" placeholder="Título da tarefa"></input>
                            </div>
        
                            <div class="col-6">
                                <label for="valorInput" class="form-label">Valor</label>
                                <input type="number" class="form-control" id="valorInput" placeholder="Ex: 10"></input>
                            </div>
        
                            <div class="col-6">
                                <label for="dataEntregaInput" class="form-label">Data de entrega</label>
                                <input type="date" class="form-control" id="dataEntregaInput"></input>
                            </div>
        
                            <div class="col-12">
                                <label for="descricaoInput" class="form-label">Descrição</label>
                                <textarea class="form-control" id="descricaoInput" rows="3" placeholder="Descrição da tarefa"></textarea>
                            </div>
        
                            <div class="col-12">
                                <label for="arquivoTarefaInput" class="form-label">Arquivo-Tarefa</label>
                                <input type="file" class="form-control" id="arquivoTarefaInput" name="arquivoTarefa"></input>
                            </div>
                        </form>
        </div>
        </>
    );
}
