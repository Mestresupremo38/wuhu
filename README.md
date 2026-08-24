# JOVI Precision Camera - Sprint 3

Simulador web da interface de câmera JOVI. A versão da Sprint 3 migra o protótipo Vanilla para React, preservando o visual, as animações e as funcionalidades existentes.

## Tecnologias utilizadas

- React com componentes funcionais;
- Vite;
- JavaScript;
- CSS Vanilla;
- `localStorage`;
- Google Fonts: Inter e Space Grotesk;
- Material Symbols Outlined.

## Funcionalidades

- Seleção dos modos Night, Portrait, Photo, Video e Mais;
- Tela com 12 modos adicionais;
- Alternância entre câmera frontal e traseira;
- Animação de captura;
- Galeria com imagem armazenada localmente;
- Sugestões da JOVI AI para a fotografia;
- Chatbot com respostas simuladas;
- Modo guiado;
- Modo automático;
- Persistência do modo, câmera selecionada e histórico do chat no navegador.

## Estrutura do projeto

- `src/components/camera`: visor, cabeçalho, seletor, controles e modos;
- `src/components/ai`: menu, chatbot, modo guiado e modo automático;
- `src/components/gallery`: galeria e sugestões;
- `src/data`: respostas e planos simulados;
- `src/utils/storage.js`: leitura e gravação do `localStorage`;
- `src/css/style.css`: design original do protótipo;
- `legacy-sprint2`: cópia executável da versão HTML, CSS e JavaScript Vanilla.

## Como instalar

É necessário ter Node.js e npm instalados.

```bash
npm install
```

## Como executar em desenvolvimento

```bash
npm run dev
```

Abra no navegador o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Como gerar a versão de produção

```bash
npm run build
```

Os arquivos de produção serão criados na pasta `dist`.

## Como testar a versão de produção

```bash
npm run preview
```

## Dados armazenados

O projeto usa `localStorage` para guardar o modo de câmera ativo, a escolha entre câmera frontal e traseira e as mensagens do chatbot. Os dados ficam apenas no navegador do usuário e não são enviados para um servidor.

## Uso de Math

O chatbot seleciona uma resposta com `Math.random()` e `Math.floor()`. O tempo de espera da resposta também utiliza `Math.random()` para simular uma conversa.

## Usuários e senhas

O projeto não possui autenticação. Não são necessários usuários ou senhas para teste.

## Uso de IA na solução

A IA aparece na experiência da JOVI AI por meio do chatbot, das orientações de fotografia, do modo guiado e do modo automático. Nesta versão acadêmica, as respostas e análises são simuladas localmente com regras, listas de respostas e seleção aleatória; não há envio de imagens ou mensagens para um modelo externo.

## Deploy na Vercel

O link será adicionado pelo integrante responsável após a publicação na Vercel.

## Integrantes

- Leonardo Ferreira - RM 571311
- Daniel Ribeiro - RM 571746
- Gustavo Ducatti - RM 570932
- Felipi Godoy - RM 573741
- Jecky Cossio - RM 572226
