import React from 'react';

const UsuarioDisciplina = (props) => {
    return (
        <>
            <form>
            <div class="container bg-light p-3 my-3">
                            <div class="row mb-3 align-items-center">
                              <h6 class="form-label mt-3">Disciplinas por Semestre</h6>
                            </div>
                          
                            <div class="row align-items-center mb-2">
                              <div class="col-6">
                                <input type="text" class="form-control" id="nome" placeholder="Disciplina" />
                              </div>
                          
                              <div class="col-3">
                                <input type="text" class="form-control" id="semestre" placeholder="Semestre" />
                              </div>
                          
                              <div class="col-2 text-center">
                                <button id="btn_unfilter" type="button" class="btn btn-outline-danger">
                                  <i class="bi bi-trash"></i>
                                </button>
                              </div>
                          
                              <div class="my-3">
                                <button class="btn btn-outline-primary">
                                  +
                                </button>
                              </div>
                            </div>
                          </div>

            </form>
        </>
    )
};

export default UsuarioDisciplina;
