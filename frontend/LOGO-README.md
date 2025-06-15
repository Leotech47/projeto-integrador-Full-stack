# Como adicionar o logo da Leo Tech

## Passo 1: Copiar o logo
1. Salve a imagem `logo-leotech.png` fornecida
2. Copie o arquivo para o diretório: `frontend/public/logo-leotech.png`

## Passo 2: Verificar se está funcionando
1. Inicie o servidor frontend
2. Acesse qualquer página do site
3. O logo da Leo Tech deve aparecer no cabeçalho

## Observações:
- O logo foi configurado para aparecer em um círculo de 50x50px
- Se a imagem não carregar, um fallback com "LT" será exibido
- O logo aparece em todas as páginas que usam o componente ProfessionalHeader

## Estrutura atual:
- ✅ ProfessionalHeader.js - Atualizado para usar o logo
- ✅ Fallback configurado caso a imagem não carregue
- ✅ Dimensões adequadas (50x50px)
- ✅ Estilo circular com sombra
