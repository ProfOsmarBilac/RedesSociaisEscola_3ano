import { criarGrafico, getCSS, incluirTexto } from "./common.js"

async function redesSociaisFavoritasMinhaEscola() {
    const dadosLocaisString = localStorage.getItem('respostaRedesSociais')
    if (dadosLocaisString) {
        const dadosLocais = JSON.parse(dadosLocaisString)
        processarDados(dadosLocais)
    } else {
        const url = 'https://script.googleusercontent.com/a/macros/escola.pr.gov.br/echo?user_content_key=gtayqqaHN-md_aEj7smUcNg-yV9JZWr0rfEMNrDV-9B79TA11E7OOjLnPOyjljMTxIT00np4dVGl7siQwoNriIccjjPSIYwuOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKBGCNaBo701naU8cM07sy4y4YFj_89rZFXtx-mIxL_3LIqX_cc5ja8RuWWc6SSZCFX0yZ5wEJ3bJDu1ZjVmSuQxeyzY-uVdYwJoRk-erlvp1Gq25Nk4eXRdayAobVoa2-CagQEneoX2wQ&lib=MJhumvQ7MKFm_474HSSxR_V2Mk0qrAlLK'
        const res = await fetch(url)
        const dados = await res.json()
        localStorage.setItem('respostaRedesSociais', JSON.stringify(dados))
        processarDados(dadosLocais)
    }
}

function processarDados(dados) {
    const redesSociais = dados.slice(1).map(redes => redes[1])
    const contagemRedesSociais = redesSociais.reduce((acc, redesSociais) => {
        acc[redesSociais] = (acc[redesSociais] || 0) + 1
        return acc
    }, {})
    const valores = Object.values(contagemRedesSociais)
    const labels = Object.keys(contagemRedesSociais)

    const data = [
        {
            values: valores,
            labels: labels,
            type: 'pie',
            textinfo: 'label+percent'
        }
    ]

    const layout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        height: 700,
        title: {
            text: 'Redes sociais que as pessoas da minha escola mais gostam',
            x: 0,
            font: {
                color: getCSS('--primary-color'),
                family: getCSS('--font'),
                size: 30
            }
        },
        legend: {
            font: {
                color: getCSS('--primary-color'),
                size: 16
            }
        }
    }

   criarGrafico(data, layout)
   incluirTexto(`Comparando os dois gráficos de setores, desta pesquisa amostral, percebe-se que as redes sociais mais usadas no mundo, são: <span>Instagram</span> e <span>WhatsApp</span>. Enquanto que, na pequena representatividade da minha escola, a redes que se destacaram foram o <span>TikTok</span> e o <span>Instagram</span>. Assim, podemos afirmar que o <span>Instagram</span> mantém-se em alta no seu uso, pois a pesquisa global foi em data bem anterior à local.`)
}

redesSociaisFavoritasMinhaEscola()