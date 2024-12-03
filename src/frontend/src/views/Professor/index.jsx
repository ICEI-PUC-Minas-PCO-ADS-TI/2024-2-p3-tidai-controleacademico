import { useEffect, useState } from 'react';
import '../../styles/menuUsuarios.css';

export default function IndexProf() {

    const [nomeUsuario, setNomeUsuario] = useState('');

    // Quando o componente for montado, pega o nome do usuário do localStorage
    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (usuario) {
            setNomeUsuario(usuario.nome);  // Armazena o nome do usuário no estado
        }
    }, []);  // O useEffect será chamado apenas uma vez, quando o componente for montado

    return (
        <div className="container height-100 d-flex flex-column justify-content-center align-items-center text-center">
            <div class="h-10">
                <img src="https://static.vecteezy.com/ti/vetor-gratis/p1/15668053-modelo-de-design-de-logotipo-da-faculdade-ilustracaoial-logotipo-da-faculdade-da-universidade-distintivos-emblemas-sinais-estoque-logotipo-do-campus-da-faculdade-gratis-vetor.jpg"
                    alt="Logo da UNIBH" class="login-logo" />
            </div>
            <h1>Seja Bem-Vindo, {nomeUsuario || 'Usuário'} !</h1>
            <p className="motivational-quote"><i>"O sucesso é a soma de pequenos esforços repetidos dia após dia."</i></p>
        </div>
    );

}
