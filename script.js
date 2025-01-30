// Send message when the "Send" button is clicked
document.getElementById("send-btn").addEventListener("click", function () {
    sendMessage();
});

// Send message when Enter key is pressed (key code 13)
document.getElementById("chatbox").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Prevent form submission if within a form
        sendMessage();
    }
});

// Function to handle sending the message
function sendMessage() {
    let inputField = document.getElementById("chatbox");
    let sendButton = document.getElementById("send-btn");
    let message = inputField.value.trim();

    if (message) {
        let chatContainer = document.querySelector(".chat-container");

        // Create user message
        let userMsg = document.createElement("div");
        userMsg.className = "chat-message user-message";
        userMsg.textContent = message;
        chatContainer.appendChild(userMsg);

        // Disable input and send button until chatbot responds
        inputField.disabled = true;
        sendButton.disabled = true;

        // Clear input field
        inputField.value = "";

        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Simulate chatbot response after delay
        simulateBotResponses(message, chatContainer, inputField, sendButton);
    }
};

let lastKeyword = null; // Store the last keyword used by the user
let firstMessage = true; // Track if it's the first message

function simulateBotResponses(userMessage, chatContainer, inputField, sendButton) {
    // List of predefined responses with keywords
    const responses = {
        "hi": "Hello! How are you feeling today?",
        "hello": "Hello! How are you feeling today?",
        "good": "I'm glad to hear that! What's been going well?",
        "sad": "I'm really sorry you're feeling that way. Want to talk more about it?",
        "stressed": "It sounds like things are tough. Let's work through it together. What's been stressing you out?",
        "tired": "It can be really draining. Have you had time to rest lately?",
        "happy": "That's awesome! What's making you feel happy today?",
        "not sure": "It's okay if you're not sure. Let's take it one step at a time. How can I help?",
        "bye": "Take care! Remember, I'm here if you need to talk again.",
        "anxious": "I understand that anxiety can be overwhelming. Want to share what's making you feel anxious?",
        "lonely": "I'm really sorry you're feeling alone. You don't have to go through this by yourself. Want to talk about it?",
        "angry": "It's okay to feel angry sometimes. What's been making you feel this way?",
        "frustrated": "I hear you. It can be frustrating when things aren't going as planned. Want to vent about it?",
        "confused": "It's alright to feel confused. Sometimes things don't make sense. What's been on your mind?",
        "grateful": "It's wonderful that you're feeling grateful. What's making you feel thankful today?",
        "hopeless": "I'm really sorry you're feeling hopeless. It's important to talk about it. How can I support you?",
        "excited": "That's amazing! What's got you feeling so excited?",
        "overwhelmed": "It's understandable to feel overwhelmed. Let's break things down. What's the most pressing thing on your mind?",
        "relaxed": "That's great! Taking time to relax is so important. What helped you feel this way?",
        "unmotivated": "Sometimes it's hard to get started. What's been making it difficult for you?",
        "thankful": "Feeling thankful can make a big difference. What are you thankful for today?",
        "lost": "Feeling lost can be tough. Would you like to talk about what's been making you feel that way?",
        "stuck": "It sounds like you're feeling stuck. Let's try to work through it together. What's keeping you from moving forward?",
        "bored": "Boredom can feel frustrating. Want to brainstorm some fun activities or ideas to get you out of the rut?",
        "thanks": "No problem, I'm always here to help!",
    };

    // Default response if the user's message doesn't match any predefined options
    const defaultResponse = "I'm here to listen. Tell me more.";

    // Check if the user message contains any of the keywords in the responses object
    let botResponse = defaultResponse; // Start with the default response
    let responseFound = false;
    let matchedKeyword = null;

    // First message logic
    if (firstMessage) {
        // If no keyword is found in the first message, send the !responseFound message
        for (let keyword in responses) {
            if (userMessage.toLowerCase().includes(keyword)) {
                matchedKeyword = keyword;
                responseFound = true;
                botResponse = responses[keyword];
                break;
            }
        }

        if (!responseFound) {
            botResponse = "I didn't quite understand that. Can you share a bit more?";
            firstMessage = false; // After the first message, don't consider it the "first message" anymore
        }
    } else {
        // For subsequent messages, check if a keyword is found or if a previous keyword was used
        for (let keyword in responses) {
            if (userMessage.toLowerCase().includes(keyword)) {
                matchedKeyword = keyword;
                responseFound = true;
                botResponse = responses[keyword];
                break;
            }
        }

        if (!responseFound) {
            // If no keyword is found and this is not the first message, use default response or ask more
            botResponse = lastKeyword ? defaultResponse : "I didn't quite understand that. Can you share a bit more?";
        }
    }

    // If a keyword is found, update the lastKeyword
    if (matchedKeyword) {
        lastKeyword = matchedKeyword;
    }

    // Simulate bot message after a delay
    setTimeout(() => {
        let botMsg = document.createElement("div");
        botMsg.className = "chat-message bot-message";
        botMsg.textContent = botResponse;
        chatContainer.appendChild(botMsg);

        // Re-enable input and send button after chatbot responds
        inputField.disabled = false;
        sendButton.disabled = false;
        inputField.focus();

        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1000);
}
