/* ==========================================================================
   OKKII — Widget de chat (n8n)
   Carregado como módulo externo para respeitar a Content-Security-Policy
   definida em <head> (script-src não libera scripts inline).
   ========================================================================== */
import { createChat } from "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js";

createChat({
  webhookUrl: "https://miguelpellatiero.app.n8n.cloud/webhook/005e9ac9-d178-4aa8-91e3-0668c36f018e/chat",
  mode: "window", // bolha flutuante no canto
  loadPreviousSession: true,
  showWelcomeScreen: false,
  initialMessages: [
    "Olá! 👋 Sou o assistente da OKKII.",
    "Posso te contar sobre nossos serviços de desenvolvimento web e automação. Quer tirar dúvidas ou iniciar um projeto?",
  ],
  i18n: {
    en: {
      title: "OKKII • Atendimento",
      subtitle: "Fale com a gente sobre seu projeto.",
      footer: "",
      getStarted: "Nova conversa",
      inputPlaceholder: "Digite sua mensagem...",
      closeButtonTooltip: "Fechar",
    },
  },
});