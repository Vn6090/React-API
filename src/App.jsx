import { useState, useEffect } from "react"

function App() {

  const [ tarefas, setTarefa ] = useState([])
  const [ carregando, setCarregando ] = useState(true)

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
      <div>
        <div>
          <h2>Tarefas vindas da API</h2>
          <p>Consumindo dados de <script>JSONPlaceholder</script> via fetch e useEffect</p>
          {carregando ? (
            <div>Carregando...</div>
          ):(
            <ul>
              {tarefas.map((item) => (
                <li key={item.id}>{item.title}
                  {item.completed ? 'Concluído 🥵' : 'Pendente 🥶'}
                </li>
              )
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default App
