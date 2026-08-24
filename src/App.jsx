import { useState, useEffect } from "react"

function App() {

  const [tarefas, setTarefa] = useState([])
  const [carregando, setCarregando] = useState(true)

  // 'useEffect' com fetch (requisição assíncrona)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?limit=200')
      .then((resposta) => resposta.json())
      .then((dados) => {
        setTarefa(dados) // Salva os dados vindos da API no estado em tampo real do site
        setCarregando(false) // desativa a mensagem carragando
      })
  }, []) // Array vazio para executar apenas UMA vez ao abrir a tela 

  return (
    <>
      <div className="bg-light min-vh-100 py-5">
        <div className="container">

          <div className="text-center mb-5">
            <h1 className="fw-bold text-primary">
              Tarefas vindas da API
            </h1>

            <p className="text-muted">
              Consumindo dados de <strong>JSONPlaceholder</strong> via fetch e useEffect
            </p>
          </div>

          <div className="card shadow border-0 rounded-4">
            <div className="card-header bg-primary text-white py-3 rounded-top-4">
              <h5 className="mb-0">
                Lista de tarefas
              </h5>
            </div>

            <div className="card-body p-0">

              {carregando ? (
                <div className="text-center py-5">
                  <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                  >
                    <span className="visually-hidden">
                      Carregando...
                    </span>
                  </div>

                  <p className="text-muted mb-0">
                    Carregando tarefas...
                  </p>
                </div>
              ) : (
                <ul className="list-group list-group-flush">
                  {tarefas.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item d-flex justify-content-between align-items-center py-3 px-4"
                    >
                      <div className="d-flex align-items-center">
                        <span className="badge bg-secondary rounded-pill me-3">
                          {item.id}
                        </span>

                        <span className={item.completed ? "text-decoration-line-through text-muted" : ""}>
                          {item.title}
                        </span>
                      </div>

                      <span
                        className={`badge ${item.completed
                            ? "bg-success"
                            : "bg-warning text-dark"
                          }`}
                      >
                        {item.completed ? "Concluído" : "Pendente"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

            </div>
          </div>

          {!carregando && (
            <div className="text-center mt-4">
              <span className="badge bg-dark fs-6">
                {tarefas.length} tarefas carregadas
              </span>
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default App
