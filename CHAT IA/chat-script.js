/* ============================================
   CHAT ASISTENTE TECNM MONCLOVA - JAVASCRIPT
   ============================================ */

// ============================================
// SELECCIÓN DE ELEMENTOS DEL DOM
// ============================================
const chatButton = document.getElementById('chatButton');
const chatContainer = document.getElementById('chatContainer');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typingIndicator');

// ============================================
// BASE DE CONOCIMIENTOS DEL CHATBOT
// ============================================
const knowledge = {
    carreras: {
        keywords: ['carrera', 'carreras', 'ingenierías', 'ingenieria', 'estudiar', 'oferta educativa'],
        response: `El TecNM Campus Monclova ofrece las siguientes ingenierías:

🔹 Ingeniería Informática
🔹 Ingeniería Electrónica
🔹 Ingeniería en Gestión Empresarial
🔹 Ingeniería Industrial
🔹 Ingeniería Mecánica
🔹 Ingeniería en Energías Renovables
🔹 Maestría en Ingeniería Industrial

¿Sobre cuál te gustaría saber más?`
    },
    inscripcion: {
        keywords: ['inscripción', 'inscribir', 'ficha', 'fichas', 'registro', 'admision'],
        response: `📋 Para inscribirte al TecNM Monclova:

1. Obtén tu ficha en nuestro sistema
2. Presenta el examen de admisión
3. Espera los resultados
4. Realiza tu inscripción oficial

Puedes consultar las convocatorias activas en nuestra página principal. ¿Necesitas ayuda con algún paso específico?`
    },
    pagos: {
        keywords: ['pago', 'pagos', 'costo', 'cuota', 'colegiaturas', 'transferencia'],
        response: `💰 Información de Pagos:

• Puedes realizar pagos en línea
• Aceptamos transferencias bancarias
• Consulta los costos de servicios en la sección de Pagos
• Descarga tu recibo de pago

¿Necesitas información sobre algún pago específico?`
    },
    servicios: {
        keywords: ['servicio', 'servicios', 'biblioteca', 'bolsa de trabajo', 'titulacion', 'servicio social'],
        response: `🏛️ Servicios disponibles:

• Biblioteca y Revistas Digitales
• Bolsa de Trabajo
• Servicio Social
• Titulación
• Apoyo Académico

¿Qué servicio te interesa conocer?`
    },
    horarios: {
        keywords: ['horario', 'horarios', 'clases', 'calendario'],
        response: `📅 Los horarios están disponibles en la sección de Descargas de nuestra página. Puedes consultarlos por carrera y semestre. ¿Necesitas ayuda para encontrarlos?`
    },
    contacto: {
        keywords: ['contacto', 'telefono', 'direccion', 'ubicacion', 'donde'],
        response: `📍 TecNM Campus Monclova
Monclova, Coahuila, México

Puedes encontrar más información de contacto en nuestra sección de Directorio. ¿Necesitas hablar con algún departamento específico?`
    },
    becas: {
        keywords: ['beca', 'becas', 'apoyo economico', 'financiero'],
        response: `🎓 Información sobre Becas:

Consulta el lineamiento de becas 2022 en nuestra sección de enlaces. También puedes acudir al departamento de Servicios Escolares para más información sobre apoyos disponibles.`
    }
};

// ============================================
// FUNCIONES DE CONTROL DEL CHAT
// ============================================

/**
 * Abre el chat al hacer clic en el botón flotante
 */
chatButton.addEventListener('click', () => {
    chatContainer.classList.add('active');
});

/**
 * Cierra el chat al hacer clic en la X
 */
chatClose.addEventListener('click', () => {
    chatContainer.classList.remove('active');
});

// ============================================
// FUNCIÓN PRINCIPAL: ENVIAR MENSAJE
// ============================================

/**
 * Envía un mensaje del usuario y genera respuesta del bot
 */
function sendMessage() {
    const message = chatInput.value.trim();
    
    if (message) {
        // Mostrar mensaje del usuario
        addMessage(message, 'user');
        
        // Limpiar el input
        chatInput.value = '';
        
        // Simular respuesta del bot con delay
        setTimeout(() => {
            showTyping();
            
            setTimeout(() => {
                hideTyping();
                const response = getResponse(message);
                addMessage(response, 'bot');
            }, 1500);
        }, 500);
    }
}

/**
 * Event listener para el botón de enviar
 */
sendButton.addEventListener('click', sendMessage);

/**
 * Event listener para presionar Enter en el input
 */
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// ============================================
// OPCIONES RÁPIDAS
// ============================================

/**
 * Maneja los clicks en las opciones rápidas
 */
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-option')) {
        const option = e.target.dataset.option;
        const message = e.target.textContent;
        
        // Mostrar como mensaje del usuario
        addMessage(message, 'user');
        
        // Generar respuesta del bot
        setTimeout(() => {
            showTyping();
            
            setTimeout(() => {
                hideTyping();
                const response = knowledge[option]?.response || getResponse(option);
                addMessage(response, 'bot');
            }, 1500);
        }, 500);
    }
});

// ============================================
// FUNCIONES DE VISUALIZACIÓN DE MENSAJES
// ============================================

/**
 * Agrega un mensaje al área de chat
 * @param {string} text - Contenido del mensaje
 * @param {string} sender - 'user' o 'bot'
 */
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    
    const typing = document.getElementById('typingIndicator');
    chatMessages.insertBefore(messageDiv, typing);
    
    // Scroll automático hacia abajo
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Muestra el indicador de "escribiendo..."
 */
function showTyping() {
    typingIndicator.classList.add('active');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Oculta el indicador de "escribiendo..."
 */
function hideTyping() {
    typingIndicator.classList.remove('active');
}

// ============================================
// SISTEMA DE RESPUESTAS INTELIGENTE
// ============================================

/**
 * Genera una respuesta basada en el mensaje del usuario
 * @param {string} message - Mensaje del usuario
 * @returns {string} - Respuesta del bot
 */
function getResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Detectar saludos
    if (lowerMessage.match(/hola|hi|buenos dias|buenas tardes|buenas noches|hey/)) {
        return '¡Hola! 😊 ¿En qué puedo ayudarte hoy?';
    }
    
    // Detectar despedidas
    if (lowerMessage.match(/adios|gracias|bye|hasta luego|chao/)) {
        return '¡De nada! Si tienes más preguntas, no dudes en escribirme. ¡Hasta pronto! 👋';
    }
    
    // Buscar en la base de conocimientos
    for (const [key, data] of Object.entries(knowledge)) {
        for (const keyword of data.keywords) {
            if (lowerMessage.includes(keyword)) {
                return data.response;
            }
        }
    }
    
    // Respuesta predeterminada cuando no entiende
    return `Entiendo tu pregunta. Te recomiendo:

• Visitar nuestra página principal para más información
• Llamar a nuestras oficinas
• Consultar la sección específica del tema que te interesa

¿Hay algo más en lo que pueda ayudarte?`;
}

// ============================================
// CÓDIGO DE INICIALIZACIÓN
// ============================================

console.log('🤖 Chat Asistente TecNM Monclova inicializado correctamente');