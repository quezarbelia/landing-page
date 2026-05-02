/**
 * AuraCore Systems - App Configuration
 * Microservicios para Orquestación de Microempresas con IA
 */

export const appConfig = {
  company: {
    name: "AuraCore Systems",
    subtitle: "Microservicios & Orquestación con IA"
  },
  theme: {
    name: "Glacier",
    colors: {
      primary: "#7dd3fc",
      secondary: "#88b4cc",
      tertiary: "#c8a0f0",
      background: "#0a0e1a",
      surface: "#0f1524",
      error: "#ff6b6b",
    },
    glass: {
      opacity: 0.6,
      blur: "16px",
      borderOpacity: 0.1,
    }
  },
  navigation: [
    { label: "Inicio", path: "/" },
    { label: "Servicios", path: "/servicios" },
    { label: "Inventario", path: "/inventario" },
    { label: "Cotización", path: "/pedidos" },
    { label: "Contacto", path: "/contacto" }
  ],
  home: {
    hero: {
      badge: "Orquestación Inteligente V.1.0",
      title: "Microservicios IA para tu Microempresa",
      description: "Orquestación automatizada de procesos empresariales mediante microservicios inteligentes. Transformamos tu negocio con tecnología de última generación.",
      primaryBtn: "Solicitar Cotización",
      secondaryBtn: "Ver Servicios",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "Soluciones de microservicios diseñadas para la orquestación eficiente de microempresas con inteligencia artificial.",
      cards: [
        {
          id: "cloud",
          icon: "cloud",
          title: "Cloud Business Hub",
          description: "Dashboard en la nube con estética glassmorphism para gestionar inventarios, ventas o citas con orquestación inteligente.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80"
        },
        {
          id: "web",
          icon: "language",
          title: "Instant Web Presence",
          description: "Creación y despliegue automático de páginas web modernas con SEO optimizado y agentes IA integrados."
        },
        {
          id: "ai",
          icon: "psychology",
          title: "AI Agent Integration",
          description: "Agentes inteligentes vía OpenRouter como asistentes de atención al cliente o gestores de pedidos automatizados."
        }
      ]
    },
    security: {
      title: "Seguridad Enterprise",
      description: "Encriptación de extremo a extremo y cumplimiento GDPR. Tus datos protegidos siempre.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80"
    }
  },
  dashboard: {
    title: "Panel de Cotizaciones",
    description: "Gestiona tus solicitudes de microservicios y orchestration IA en tiempo real.",
    orders: [],
    metrics: [
      { label: "Pedidos", value: "12", icon: "shopping_cart", color: "primary" },
      { label: "Activos", value: "8", icon: "check_circle", color: "secondary" },
      { label: "Pendientes", value: "4", icon: "schedule", color: "tertiary" }
    ],
    services: [
      { name: "Cloud Hub", description: "Orquestación en la nube", status: "Online", progress: 100, isError: false },
      { name: "AI Agent", description: "Agente de atención", status: "Online", progress: 100, isError: false },
      { name: "Web Builder", description: "Constructor web", status: "Online", progress: 85, isError: false },
      { name: "Analytics", description: "Datos y métricas", status: "Error", progress: 45, isError: true }
    ]
  },
  footer: {
    copyright: "© 2026 AuraCore Systems. Microservicios & Orquestación con IA",
    links: ["Privacidad", "Términos", "Soporte"]
  }
};
