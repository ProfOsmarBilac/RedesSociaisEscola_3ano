import { getCSS, tickConfig, criarGrafico} from "./common.js"

async function objetivosUsuarios() {
    const url = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/razoes-globais.json'
    const res = await fetch(url)
    const dados = await res.json()
    const objetivosUso = Object.keys(dados)
    const quantidadeUsuarios = Object.values(dados)

    const data = [
        {
            labels: objetivosUso,
            values: quantidadeUsuarios,
            type: 'pie'
        }
    ]

    const layout = {
            plot_bgcolor: getCSS('--bg-color'),
            paper_bgcolor: getCSS('--bg-color'),
            height: 600,
            width: 870,
            title: {
                text: 'Principal objetivo do uso das redes sociais',
                x: 0,
                font: {
                    color: getCSS('--primary-color'),
                    family: getCSS('--font'),
                    size: 30
                }
            },
            legend: {
                bgcolor: getCSS('--bg-color'),
                font: {
                    color: getCSS('--secondary-color'),
                }
            }
        }
    
    const grafico = document.createElement('div')
    grafico.className = 'grafico'
    document.getElementById('graficos-container').appendChild(grafico)
    Plotly.newPlot(grafico, data, layout)

}  

objetivosUsuarios()