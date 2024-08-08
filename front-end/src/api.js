export const API_URL = 'http://localhost:5000/api'


export function GET_TODAS_SALAS (body) {

    return {
        url: API_URL + '/salas',
        options: {
            method: 'GET'
        }
    }
}

export function POST_NOVA_SALA (body) {
    return {
        url: API_URL + '/salas/cadastrar',
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function POST_NOVO_HORARIO (body) {
    return {
        url: API_URL + '/horarios/alocar',
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function DELETE_SALA (body) {

    return {
        url: API_URL + '/salas/deletar',
        options: {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function GET_TODAS_DISCIPLINAS (body) {

    return {
        url: API_URL + '/disciplinas',
        options: {
            method: 'GET'
        }
    }
}

export function POST_NOVA_DISCIPLINA (body) {

    return {
        url: API_URL + '/disciplinas/cadastrar',
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function DELETE_DISCIPLINA (body) {

    return {
        url: API_URL + '/disciplinas/deletar',
        options: {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function GET_TODAS_TURMAS (body) {

    return {
        url: API_URL + '/turmas',
        options: {
            method: 'GET'
        }
    }
}

export function POST_NOVA_TURMA (body) {

    return {
        url: API_URL + '/turmas/cadastrar',
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function DELETE_TURMA (body) {

    return {
        url: API_URL + '/turmas/deletar',
        options: {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function GET_TODOS_HORARIOS (body) {

    return {
        url: API_URL + '/horarios',
        options: {
            method: 'GET'
        }
    }
}

export function DELETE_HORARIO (body) {

    return {
        url: API_URL + '/horarios/deletar',
        options: {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function GET_TODOS_PROFESSORES (body) {

    return {
        url: API_URL + '/professores',
        options: {
            method: 'GET'
        }
    }
}
export function PUT_UPDATE_PROFESSOR(body) {
    return {
        url: API_URL + '/professores',
        options: {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    };
}

export function PUT_DEFINIR_PROFESSOR_NA_TURMA (body) {
    return {
        url: API_URL + '/turmas/definirProfessor',
        options: {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    };
}

export function PUT_DESALOCAR_TURMA(body) {
    return {
        url: API_URL + '/turmas/desalocar',
        options: {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    };
}




export function POST_NOVO_PROFESSOR (body) {

    return {
        url: API_URL + '/professores/cadastrar',
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

export function DELETE_PROFESSOR (body) {

    return {
        url: API_URL + '/professores/deletar',
        options: {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}