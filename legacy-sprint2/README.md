# Challenge JOVI 2026

Integrantes:
- Leonardo Ferreira (rm: 571311)
- Daniel Ribeiro (rm: 571746)
- Gustavo Ducatti (rm: 570932)
- Felipi Godoy (rm: 573741)
- Jecky Cossio (rm: 572226)


Interface web que simula o aplicativo de câmera nativo de um smartphone Android premium.  
O projeto reproduz fielmente a experiência de um app de câmera moderno, com visor de câmera, seletor de modos, botão de disparo, troca de câmera (flip), galeria e um chatbot de inteligência artificial integrado (**JOVI AI**) que futuramente terá funcionalidades agênticas.

---

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Design System](#design-system)
- [Páginas](#páginas)
  - [index.html — Tela Principal](#indexhtml--tela-principal)
  - [more.html — Modos Extras](#morehtml--modos-extras)
- [Lógica JavaScript](#lógica-javascript)
  - [Navegação entre Modos](#navegação-entre-modos)
  - [Troca de Câmera (Flip)](#troca-de-câmera-flip)
  - [Animação de Captura (Flash)](#animação-de-captura-flash)
  - [Chat JOVI AI](#chat-jovi-ai)
- [Como Executar](#como-executar)
- [Layout Responsivo](#layout-responsivo)

---

## Visão Geral

O **JOVI — Precision Camera** é um protótipo front-end estático que simula a interface de um aplicativo de câmera de smartphone de alta qualidade. A aplicação mantém uma proporção fixa de **1260 × 2800 pixels** (retrato) independentemente do dispositivo em que é visualizada — em telas widescreen (desktop), o contêiner é centralizado horizontalmente com barras laterais pretas; em telas mobile estreitas, ele ocupa 100% da largura.

---

## Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Seletor de Modos** | Barra horizontal com scroll-snap que permite navegar entre os modos: Night, Portrait, Photo, Video e Mais. |
| **Tela "Mais"** | Grade com 12 modos extras da câmera (PRO, Panorama, Câmera Lenta, Time-Lapse, Noite+, Documento, Astro, Profissional, Instantâneo, Comida, Visualização Dupla, Foto em Movimento). |
| **Troca de Câmera** | Botão flip que alterna entre câmera traseira (`imagem1.png`) e câmera frontal (`imagem2.png`) com efeito de espelhamento horizontal. |
| **Captura de Foto** | Botão shutter com animação de flash branco na tela ao ser pressionado. |
| **Chat JOVI AI** | Painel deslizante de chat com inteligência artificial simulada que responde com dicas de fotografia. |
| **Indicadores HDR / 4K60** | Badges no header exibindo status de HDR e resolução 4K a 60fps. |

---

## Estrutura de Arquivos

```
front_sprint2/
├── index.html                  # Tela principal da câmera
├── more.html                   # Tela de modos extras
├── README.md                   # Este arquivo
└── src/
    ├── assets/
    │   ├── imagem1.png          # Foto simulada da câmera traseira (~9.1 MB)
    │   └── imagem2.png          # Foto simulada da câmera frontal (~7.9 MB)
    ├── css/
    │   └── style.css            # Folha de estilos completa (769 linhas)
    └── js/
        └── script.js            # Lógica da aplicação (210 linhas)
```

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura semântica das páginas (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`) |
| **CSS3 (Vanilla)** | Design system completo com variáveis CSS, gradientes, backdrop-filter, glassmorphism, animações keyframe e media queries |
| **JavaScript (Vanilla)** | Lógica de navegação, interações do usuário e chatbot simulado |
| **Google Fonts** | Tipografia: **Inter** (corpo) e **Space Grotesk** (títulos) |
| **Material Symbols Outlined** | Ícones do Google Material Design para todos os botões e elementos de UI |

---

## Design System

### Variáveis CSS (`:root`)

| Variável | Valor | Uso |
|---|---|---|
| `--primary` | `#8ff5ff` | Cor de destaque principal (ciano claro) |
| `--primary-container` | `#00eefc` | Cor de destaque secundária (ciano vibrante) |
| `--background` | `#0e0e0e` | Fundo geral |
| `--surface-lowest` | `#000000` | Superfície mais escura (visor) |
| `--surface-container` | `#191919` | Contêiner de superfície |
| `--on-surface` | `#ffffff` | Texto sobre superfícies escuras |
| `--on-surface-variant` | `#ababab` | Texto secundário |
| `--outline-variant` | `rgba(72,72,72,0.3)` | Bordas sutis |
| `--zinc-900` | `#18181b` | Header e footer (com opacidade) |
| `--white-5 / 10 / 20` | `rgba(255,255,255, ...)` | Camadas de transparência branca |
| `--font-headline` | `Space Grotesk` | Fonte de títulos e labels |
| `--font-body` | `Inter` | Fonte do corpo de texto |

### Efeitos Visuais

- **Glassmorphism**: Header e footer utilizam `backdrop-filter: blur()` com fundos semi-transparentes.
- **Scanline**: Efeito de linhas de varredura sobre o visor da câmera.
- **Gradiente do visor**: Overlay com gradiente escuro no topo e na base para melhor legibilidade.
- **Pulse**: Animação de pulsação no contorno do botão shutter.
- **Transição de modo**: Efeito de blur + escurecimento ao trocar de modo (`mode-transitioning`).
- **Animação de mensagem**: Mensagens do chat AI surgem com fade-in e translate suave (`aiMsgIn`).

---

## Páginas

### `index.html` — Tela Principal

A tela principal da câmera é composta pelas seguintes camadas (de trás para frente):

1. **Viewfinder Layer** (`z-index: 0`): Imagem da câmera (`imagem1.png` ou `imagem2.png`) com efeito de scanline e overlay gradiente.
2. **Header** (`z-index: 50`): Barra superior com botões de configurações, flash, badge HDR e badge de resolução 4K/60.
3. **Mode Picker** (`z-index: 40`): Seletor horizontal de modos com scroll-snap (Night, Portrait, Photo, Video, Mais).
4. **Footer** (`z-index: 50`): Barra inferior com botão de galeria, botão de disparo (shutter) e botão de flip + AI.
5. **AI Overlay** (`z-index: 200`): Painel de chat JOVI AI que desliza de baixo para cima quando ativado.

### `more.html` — Modos Extras

Substitui o visor da câmera por uma grade de 12 ícones de modos extras organizados em 3 colunas:

| Modo | Ícone Material |
|---|---|
| PRO | `aperture` |
| PANORAMA | `panorama` |
| CÂMERA LENTA | `slow_motion_video` |
| TIME-LAPSE | `timelapse` |
| NOITE+ | `nights_stay` |
| DOCUMENTO | `document_scanner` |
| ASTRO | `flare` |
| PROFISSIONAL | `camera_enhance` |
| INSTANTÂNEO | `edit` |
| COMIDA | `restaurant` |
| VISUALIZAÇÃO DUPLA | `split_screen` |
| FOTO EM MOVIMENTO | `motion_photos_on` |

Na tela "Mais", o botão de disparo (shutter) é ocultado (`opacity: 0; pointer-events: none`). Os demais botões de modo redirecionam de volta para `index.html`.

---

## Lógica JavaScript

Todo o código está contido em um único arquivo `src/js/script.js`, encapsulado em um listener `DOMContentLoaded`.


### Navegação entre Modos

- Clicar em um modo (Night, Portrait, Photo, Video) ativa o efeito de transição (blur + escurecimento) e centraliza o item selecionado no scroll horizontal.
- Clicar em **"Mais"** redireciona para `more.html` após 400ms de animação.
- Na página `more.html`, clicar em qualquer modo padrão redireciona de volta para `index.html`.

### Troca de Câmera (Flip)

- Alterna entre `imagem1.png` (traseira) e `imagem2.png` (frontal).
- Aplica `scaleX(-1)` na câmera frontal para simular o espelhamento.
- Utiliza o mesmo efeito de transição (blur + escurecimento) durante a troca.

### Animação de Captura (Flash)

- Ao clicar no botão shutter, cria dinamicamente um `<div>` branco com `z-index: 100`.
- A opacidade sobe para `0.8` e desce para `0` rapidamente, simulando um flash de câmera.
- O elemento é removido do DOM após a animação.

### Chat JOVI AI

- **Abrir**: Clique no botão "AI" no footer → overlay desliza de baixo para cima.
- **Fechar**: Clique no botão "✕" no header do painel.
- **Enviar mensagem**: Digitar texto e pressionar Enter ou clicar no botão de envio.
- **Respostas**: O bot escolhe aleatoriamente entre 8 dicas de fotografia pré-definidas, com um atraso de 800–1500ms para simular "digitação".

Respostas disponíveis do bot:

| # | Resposta |
|---|---|
| 1 | Posso ajudar a melhorar a iluminação da sua foto! |
| 2 | Tente usar o modo retrato para fotos com fundo desfocado. |
| 3 | O modo noite funciona melhor com o celular estabilizado. |
| 4 | Use o HDR para capturar mais detalhes nas sombras. |
| 5 | Quer que eu sugira o melhor modo para esta cena? |
| 6 | A resolução 4K é ideal para fotos com muitos detalhes. |
| 7 | Para panoramas, mova o celular lentamente da esquerda para a direita. |
| 8 | O modo Astro precisa de pelo menos 15 segundos de exposição. |

---

## Como Executar

Este é um projeto **estático** (sem dependências, sem build, sem framework). Para executar:

1. **Clone o repositório**:
   ```bash
   git clone <url-do-repositorio>
   cd front_sprint2
   ```

2. **Abra no navegador**:
   - Abra o arquivo `index.html` diretamente no navegador, **ou**
   - Utilize um servidor local como o **Live Server** (extensão do VS Code):
     - Clique com o botão direito em `index.html` → *Open with Live Server*

> **Nota:** Algumas funcionalidades (como o carregamento de imagens locais e fontes do Google) requerem conexão com a internet.

---

## Layout Responsivo

O layout é controlado pela classe `.app-container` com `aspect-ratio: 1260 / 2800`:

| Cenário | Comportamento |
|---|---|
| **Desktop / telas largas** | O contêiner mantém a proporção de retrato e é centralizado horizontal e verticalmente. Barras pretas aparecem nas laterais. Sombra `box-shadow` aplicada. |
| **Mobile / telas estreitas** | Quando a tela é mais estreita que a proporção 1260/2800, o contêiner ocupa 100% da largura e a altura se ajusta automaticamente. A sombra é removida. |
| **Zoom desabilitado** | O `<meta viewport>` inclui `maximum-scale=1.0, user-scalable=no` para impedir zoom acidental na interface. |

---

> **Projeto desenvolvido como parte de um sprint de front-end e web development.**
