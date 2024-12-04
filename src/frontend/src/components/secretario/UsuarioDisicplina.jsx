import React from 'react';

const UsuarioDisciplina = (props) => {
    return (
        <>
            <form>
                <div class="col-12 bg-light">
                    <label for="inputState" class="form-label">Curso</label>
                    <select id="curso" class="form-select">
                        <option defaultValue={0}>Selecione</option>
                        <option>SI</option>
                        <option>Direito</option>
                        <option>ADS</option>
                    </select>

                    <div class='row mt-3'>
                        <div class="col-6">
                            <h6>1° Semestre</h6>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                <label class="form-check-label" for="flexSwitchCheckDefault">Disciplina A</label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                <label class="form-check-label" for="flexSwitchCheckDefault">Disciplina B</label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                <label class="form-check-label" for="flexSwitchCheckDefault">Disciplina C</label>
                            </div>
                        </div>
                        <div class="col-6">

                            <h6>2° Semestre</h6>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                <label class="form-check-label" for="flexSwitchCheckDefault">Disciplina D</label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                <label class="form-check-label" for="flexSwitchCheckDefault">Disciplina E</label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                <label class="form-check-label" for="flexSwitchCheckDefault">Disciplina F</label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
};

export default UsuarioDisciplina;
