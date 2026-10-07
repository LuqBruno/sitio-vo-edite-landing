# Estado do projeto — Sítio Vó Edite (Laguna)
Atualizado em: 06/10/2026. Ficha técnica; negociação fica no PIPELINE.md.

- **Natureza:** demo de abordagem para empresa real, não contratada; noindex e aviso de demo no rodapé
- **Pedido de Bruno (06/10/2026):** landing de confraternizações com estrutura, fotos e pedido de data/orçamento; empresas e famílias com o mesmo peso; pedido pelo WhatsApp com mensagem pronta; prévia pública no GitHub Pages autorizada
- **Direção:** "Croqui do sítio", escolhida por Bruno (DIRECAO.md; contrato em .impeccable/surfaces/site-index-html.md, semente 45ae43bf)
- **Stack:** React 19 + TS + Vite 8 + Tailwind 4 + Motion; em `site/`: `npm run dev` (porta 3041), `npm run check`, `npm run build`, `npm run assets`
- **Versão:** 0.1.0 (em construção)

## Feito
- Pesquisa: Instagram, Google Maps, reel do São João (quadros), satélite Esri para a margem; fontes no BRIEFING.md.
- PRODUCT.md, BRIEFING.md, DIRECAO.md; imagens responsivas geradas (`scripts/build-assets.py`).
- Página completa em código: croqui com margem real, estrada, árvores do satélite, 5 lugares tocáveis com foto; pedido (tipo, data com pôr do sol, pessoas, período) que abre o WhatsApp; seções incluso, para quem, galeria, como chegar, rodapé.
- Verificado: `npm run check` passou; primeira dobra desktop 1440 renderizada sem erros no console.

## Não verificado / pendente técnico
- Celular, modo escuro, movimento reduzido, teclado, recortes de foto abrindo, seções abaixo da dobra, build com pré-renderização, `op revisar`, detector do impeccable, revisão independente e DESIGN.md.
- Defeitos vistos na 1ª captura: árvores atrás do título e do texto atrapalham a leitura (limpar a área do título); rótulo "cabanas" encosta no ponto "entrada"; campo de pessoas estreito no desktop.
- Publicação no GitHub Pages (autorizada) ainda não feita.

## Pendências do cliente
- Autorização das fotos e da marca; logo em vetor; capacidade, preços, horários; fotos limpas do salão; conferir posições do croqui.

## Próxima ação
Corrigir os 3 defeitos vistos, revisar celular e demais estados, `npm run build`, `op revisar Sitio_Vo_Edite`, depois publicar a prévia.
