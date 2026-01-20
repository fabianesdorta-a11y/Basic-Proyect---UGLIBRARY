const sampleBooks = [
    { title: "Introducción a la Programación" , author: "José Malavé", rating: 2.1 }, 
    { title: "100 Ejercicios Resultos de Derivadas", author: "Alvaro D.", rating: 1 },
    { title: "La Lógica Booleana", author: "Jorge Esparza", rating: 4 },
    { title: "¿Cómo Aprobar un Examen en 30 minutos? ", author: "Leo G.", rating: 4.0 },
    { title: "El ser Humano como ser Intelectual", author: "Homero Simpson", rating: 4.3 },
    { title: "Historia de Venezuela", author: "Nicolas M.", rating: 4.8 },
    { title: "Física I: El arte de la Caída Libre", author: "S. Suave", rating: 4.1 },

];

const chatResponses = {
    "Opinión del Profe Esparza":"El Profe Esparza es conocido por su claridad y carisma  en la enseñanza de la lógica y demás asignaturas. Sus clases son interactivas y fomentan el pensamiento crítico, lo que facilita la comprensión de conceptos complejos como la lógica booleana. Tomando en cuenta la opinión popular, muchos estudiantes valoran su forma de explicar y fomentar el habla",
    "Resume la historia de Venezuela": "La historia de Venezuela abarca desde las culturas indígenas precolombinas, la colonización española en el siglo XVI, la independencia en 1811 liderada por Simón Bolívar, hasta la era moderna con sus desafíos políticos y económicos.",
    "Recomienda y Resume un libro para derivadas": "Te recomiendo el libro 100 derivadas resueltas de Yo Soy Tu Profe, es un cuaderno de ejercicios diseñado para practicar el cálculo de derivadas, dirigido a estudiantes de matemáticas o cálculo. Comienza con una tabla de reglas básicas de derivación que cubre constantes, funciones potenciales, exponenciales, logarítmicas, trigonométricas y operaciones como sumas, productos y cocientes. A continuación, presenta una lista de 100 funciones para derivar, abarcando desde ejemplos sencillos hasta otros más complejos que involucran composiciones, raíces, funciones trigonométricas inversas y combinaciones de distintas reglas. Finalmente, incluye las soluciones detalladas de cada uno de los ejercicios, proporcionando así un recurso completo para el aprendizaje y la práctica autónoma de la derivación.",
    "hola": "¡Hola! Soy el asistente virtual de UGLIBRARY. ¿En qué puedo ayudarte hoy?",
    "cómo buscar libros": "Para buscar libros, usa la barra de búsqueda en la parte superior. Puedes buscar por título, autor o palabras clave.",
    "cómo subir un libro": "Para subir un libro, ve a la sección 'Cargar tus Propios Libros', completa el formulario y selecciona el archivo. Luego haz clic en 'Subir Libro a la Biblioteca'.",
    "horarios": "La biblioteca virtual está disponible 24/7. Atención personalizada presencial: Lunes a Viernes de 8:00 a 5:00.",
    "contacto": "Contacto: soporteestudiantil@uglibrary.edu.ve o teléfono: +58 212-123-4567. Oficina: Faculatad Ingeniería, tercer piso.",
    "categorías": "Tenemos estas categorías: Ciencias Básicas, Matemáticas, Historia, Ciencias de la Salud, Manuales de todo tipo y Otros.",
    "favoritos": "Para marcar un libro como favorito, haz clic en el icono de corazón al acceder al libro.",
    "configuración": "En Configuración puedes cambiar tu perfil, preferencias de notificación y tema de la interfaz.",
    "historial": "En Historial verás todos los libros que has consultado y las búsquedas realizadas.",
    "ayuda": "Puedo ayudarte con: búsqueda de libros, subir libros, horarios, contacto, registro y más. ¿Qué necesitas?",
    "gracias": "¡De nada! Estoy aquí para ayudarte cuando lo necesites.",
    "adiós": "¡Hasta luego! Recuerda que la biblioteca virtual no duerme, está disponible 24/7.",
    "default": "No entiendo completamente tu pregunta. ¿Puedes dejar de ser autista y decirme claramente en qué necesitas ayuda?",
    "Lógica Booleana": "La lógica booleana es un sistema de álgebra que utiliza valores binarios (verdadero y falso) para representar y manipular proposiciones lógicas. Fue desarrollada por George Boole en el siglo XIX y es fundamental en la informática y la electrónica digital, ya que se utiliza para diseñar circuitos lógicos y realizar operaciones lógicas en computadoras. Con más contexto, La lógica booleana es un sistema matemático fundamental en computación que opera con solo dos valores: verdadero (1) y falso (0), representando estados lógicos. Utiliza operadores como AND (Y), OR (O) y NOT (NO) para combinar estas condiciones, controlando el flujo de programas, el diseño de circuitos digitales y las búsquedas en internet, basándose en la ley binaria de todo o nada para tomar decisiones y manipular datos. ",
};

const registrationModal = document.getElementById('registrationModal');
const registrationForm = document.getElementById('registrationForm');
const sidebar = document.getElementById('sidebar');
const toggleSidebar = document.getElementById('toggleSidebar');
const chatContainer = document.getElementById('chatContainer');
const chatHeader = document.getElementById('chatHeader');
const chatToggle = document.getElementById('chatToggle');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const recommendedBooks = document.getElementById('recommendedBooks');


document.addEventListener('DOMContentLoaded', function() {
    const savedUser = localStorage.getItem('uglibrary_user');
    
    if (savedUser) {
        registrationModal.classList.add('hide')
     
        
    
        const userData = JSON.parse(savedUser);
        console.log(`Bienvenido de nuevo, ${userData.name}`);
        
     
        setTimeout(() => {
            addChatMessage('assistant', `¡Bienvenido de nuevo, ${userData.name}! ¿En qué puedo ayudarte hoy?`);
        }, 500);
    } else {
   
        registrationModal.classList.remove('hide');
    }
    
    
    loadRecommendedBooks();
    initializeChat();
    
    if (!savedUser) {
        setTimeout(() => {
            registrationModal.style.display = 'flex';
        }, 2000);
    }
});


registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userData = {
        name: document.getElementById('studentName').value,
        id: document.getElementById('studentId').value,
        career: document.getElementById('studentCareer').value,
        email: document.getElementById('studentEmail').value,
        registrationDate: new Date().toISOString()
    };
    
    
    localStorage.setItem('uglibrary_user', JSON.stringify(userData));
    
    
    registrationModal.style.display = 'none';
});
   


toggleSidebar.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
    
    
    const icon = toggleSidebar.querySelector('i');
    if (sidebar.classList.contains('collapsed')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-chevron-right');
    } else {
        icon.classList.remove('fa-chevron-right');
        icon.classList.add('fa-bars');
    }
});


chatHeader.addEventListener('click', function() {
    chatContainer.classList.toggle('expanded');
    
    
    const icon = chatToggle.querySelector('i');
    if (chatContainer.classList.contains('expanded')) {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
        
        
        setTimeout(() => {
            chatInput.focus();
        }, 300);
    } else {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    }
});


function initializeChat() {
   
    addChatMessage('assistant', '¡Hola! Soy el asistente virtual de UGLIBRARY. ¿En qué puedo ayudarte hoy?');
    
    
    setTimeout(() => {
        showQuickQuestions();
    }, 500);
}


function showQuickQuestions() {
    const quickQuestions = [
        "¿Cómo buscar libros?",
        "¿Cómo subir un libro?",
        "¿Cuáles son los horarios?",
        "¿Cómo contactar con soporte?",
        "¿Qué categorías hay?"
    ];
    
    
    const quickQuestionsContainer = document.createElement('div');
    quickQuestionsContainer.className = 'quick-questions-container';
    quickQuestionsContainer.innerHTML = '<p>Preguntas frecuentes:</p>';
    
  
    quickQuestions.forEach(question => {
        const button = document.createElement('button');
        button.className = 'quick-question-btn';
        button.textContent = question;
        button.onclick = function() {
            
            chatInput.value = question;
            sendMessage();
        };
        quickQuestionsContainer.appendChild(button);
    });
    
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant-message';
    messageDiv.appendChild(quickQuestionsContainer);
    chatBody.appendChild(messageDiv);
    
    
    chatBody.scrollTop = chatBody.scrollHeight;
}


chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});


function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;
    
    
    addChatMessage('user', message);
    
    
    chatInput.value = '';
    
    
    setTimeout(() => {
        const response = getChatResponse(message);
        addChatMessage('assistant', response);
        
        
        if (message.toLowerCase().includes('hola') || message.toLowerCase().includes('ayuda')) {
            setTimeout(() => {
                showQuickQuestions();
            }, 500);
        }
    }, 800);
}


function getChatResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    
    for (const key in chatResponses) {
        if (key !== 'default' && lowerMessage.includes(key)) {
            return chatResponses[key];
        }
    }
    
    
    const keywords = {
        'buscar': 'cómo buscar libros',
        'encontrar': 'cómo buscar libros',
        'subir': 'cómo subir un libro',
        'cargar': 'cómo subir un libro',
        'horario': 'horarios',
        'hora': 'horarios',
        'contacto': 'contacto',
        'soporte': 'contacto',
        'ayuda': 'ayuda',
        'registro': 'registro',
        'registrar': 'registro',
        'categoría': 'categorías',
        'tipo': 'categorías',
        'favorito': 'favoritos',
        'guardar': 'favoritos',
        'configuración': 'configuración',
        'ajustes': 'configuración',
        'recomienda y resume un libro para derivadas': 'Recomienda y Resume un libro para derivadas', 
        'historia de venezuela':'Resume la historia de Venezuela',
        'profe esparza':'Opinión del Profe Esparza',
        'que es la logica booleana':'Lógica Booleana',

    };
    
    for (const [keyword, responseKey] of Object.entries(keywords)) {
        if (lowerMessage.includes(keyword)) {
            return chatResponses[responseKey];
        }
    }
    
    
    return chatResponses.default;
}


function addChatMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'assistant-message');
    messageDiv.textContent = text;
    
    chatBody.appendChild(messageDiv);
    
    
    chatBody.scrollTop = chatBody.scrollHeight;
}

function loadRecommendedBooks() {
    recommendedBooks.innerHTML = '';
    
    sampleBooks.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        
       
        let stars = '';
        const fullStars = Math.floor(book.rating);
        const hasHalfStar = book.rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(book.rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        bookCard.innerHTML = `
            <div class="book-cover">${book.title}</div>
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
            <div class="book-rating">${stars} (${book.rating})</div>
        `;
        
        recommendedBooks.appendChild(bookCard);
    });
}


document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    addChatMessage('assistant', '¡Libro subido exitosamente! Será revisado por nuestros moderadores antes de aparecer en la biblioteca.');
    
    
    this.reset();
});


document.querySelector('.search-bar input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const query = this.value.trim();
        if (query !== '') {
            
            addChatMessage('user', `Buscar: ${query}`);
            
            setTimeout(() => {
                addChatMessage('assistant', `Estoy buscando información relacionada con "${query}". Te mostraré los resultados en la sección de libros.`);
            }, 800);
        }
    }
});


const style = document.createElement('style');
style.textContent = `
    .quick-questions-container {
        margin-top: 10px;
    }
    
    .quick-questions-container p {
        margin-bottom: 8px;
        font-weight: bold;
        color: #333;
    }
    
    .quick-question-btn {
        background-color: #f0f0f0;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 8px 12px;
        margin: 3px;
        cursor: pointer;
        font-size: 13px;
        transition: background-color 0.3s;
        display: inline-block;
    }
    
    .quick-question-btn:hover {
        background-color: #e0e0e0;
    }
    
    .message.assistant-message {
        max-width: 90%;
    }
    
    .chat-body {
        padding: 15px;
    }
`;
document.head.appendChild(style);