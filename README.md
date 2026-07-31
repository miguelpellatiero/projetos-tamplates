# NEXO — Site institucional

Site estático (HTML + CSS + JS puro, sem frameworks) pronto para abrir no VSCode.

## Estrutura de arquivos

```
site/
├── index.html          → página principal
├── privacidade.html     → política de privacidade (LGPD)
├── css/style.css        → todo o estilo (tema, cores, responsivo)
├── js/script.js         → interações, animações e formulário
└── README.md
```

## Como rodar localmente

1. Abra a pasta `site/` no VSCode.
2. Instale a extensão **Live Server** (ou rode `python3 -m http.server` dentro da pasta).
3. Abra `index.html` com o Live Server — o site já é responsivo, teste redimensionando a janela ou usando o modo de dispositivo do navegador (F12 → ícone de celular).

Não há build, dependências de npm ou passo de compilação — é só HTML/CSS/JS puro, por isso o carregamento é leve.

## O que personalizar antes de publicar

- **Nome da marca "NEXO"**: escolhido como placeholder (remete a "conexão", combinando com sites + automações). Troque em `index.html`, `privacidade.html` e no `<title>`/meta tags pelo nome real da sua empresa.
- **Contatos**: e-mail, WhatsApp e endereço estão com dados de exemplo em `index.html` (seção `#contato` e rodapé) e em `privacidade.html`.
- **Redes sociais**: os links do rodapé (`href="#"`) precisam ser substituídos pelos seus perfis reais.
- **Portfólio**: a seção `#portfolio` usa cartões ilustrativos (mockups em CSS). Substitua por prints reais de projetos entregues assim que tiver.
- **Estatísticas/depoimentos**: propositalmente não incluí números ou depoimentos fictícios (ex. "+500 clientes"), para não passar informação falsa. Adicione essa prova social depois, com dados reais.

## Formulário de contato + automação com n8n

O formulário em `#contato` já está pronto para ser conectado a um **Webhook do n8n**:

1. No seu n8n, crie um workflow com um nó **Webhook** (método POST).
2. Copie a URL do webhook.
3. Em `js/script.js`, preencha a constante:
   ```js
   const CONTACT_ENDPOINT = "https://SEU-N8N/webhook/contato";
   ```
4. A partir daí, cada envio do formulário chega no seu n8n em JSON (`nome`, `email`, `telefone`, `tipo`, `mensagem`, `consentimentoLGPD`, `origem`, `enviadoEm`) e você pode ligar o fluxo a planilha, CRM, e-mail ou WhatsApp.

Enquanto `CONTACT_ENDPOINT` estiver vazio, o formulário valida os campos normalmente mas não envia dados para nenhum servidor (modo demonstração).

## Segurança — o que já está incluído e o que falta configurar no servidor

Este é um site **estático** (front-end). Isso já elimina boa parte dos riscos comuns (sem banco de dados exposto, sem backend vulnerável). Mesmo assim, incluí boas práticas de front-end:

- Cabeçalho `Content-Security-Policy` básico via `<meta>` em `index.html` (restringe de onde scripts/estilos podem carregar). **Ajuste a diretiva `connect-src`** com o domínio real do seu webhook n8n.
- `referrer-policy` restritivo.
- Formulário com validação HTML5 + JavaScript antes do envio.
- Nenhum dado é salvo em `localStorage`/`sessionStorage` além da escolha de cookies (que é local ao navegador do próprio visitante).

**Recomendações para quando for hospedar (fora do escopo deste HTML/CSS/JS):**

- Sirva o site sempre via **HTTPS** (Netlify, Vercel, Cloudflare Pages e a maioria dos hosts já fazem isso automaticamente).
- Configure os cabeçalhos de segurança (`Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security`) também no servidor/CDN, não só via `<meta>` — o `<meta>` é um reforço, não substitui a configuração no servidor.
- Se o formulário passar a gravar dados em algum banco (via n8n, backend próprio etc.), garanta que esse serviço também siga a LGPD: acesso restrito, criptografia em repouso, e um processo definido para atender pedidos de exclusão/portabilidade dos titulares.
- Revise `privacidade.html` com um responsável jurídico antes de publicar — o texto é um modelo funcional, mas os campos entre colchetes (`[razão social]`, `[CNPJ]`, `[endereço]`, ferramentas usadas) precisam ser preenchidos com dados reais da empresa.

## LGPD implementada no front-end

- Banner de cookies na primeira visita, com opção de aceitar tudo ou apenas essenciais.
- Checkbox de consentimento **obrigatório** no formulário de contato, com link para a política de privacidade.
- Página `privacidade.html` cobrindo: controlador, dados coletados, base legal, finalidade, compartilhamento, cookies, retenção e direitos do titular (art. 18 da LGPD).

## Deploy

Como é um site 100% estático, pode subir direto em:

- **Vercel** / **Netlify**: arraste a pasta ou conecte um repositório Git.
- **Cloudflare Pages** ou **GitHub Pages**.

Nenhuma configuração de build é necessária — publique os arquivos como estão.
