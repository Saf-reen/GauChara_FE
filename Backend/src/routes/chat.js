const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Predefined responses for the chatbot
const botResponses = {
  greetings: [
    "Namaste! 🙏 Welcome to GauChara. How can I assist you today?",
    "Hello! I'm here to help you learn about our sacred initiative for Gaumata.",
  ],
  about: "GauChara is a sacred initiative of the Savadia Foundation, dedicated to the nourishment of Bos Indicus cows. We provide nutritious feed, ensure their health and well-being through high-quality silage, and promote sustainable care practices. 🐄",
  donate: "You can support our cause by visiting our Donate page! We accept donations via:\n• Credit/Debit Cards (Visa, Mastercard, AmEx)\n• PayPal for international donors\n• Bank Transfer (SWIFT for international)\n\nEvery contribution helps us care for more sacred cows. 💝",
  volunteer: "We welcome volunteers! You can help with:\n• Cow feeding programs\n• Gaushala maintenance\n• Community education\n• Fundraising events\n\nPlease visit our Contact page to express your interest. 🤝",
  contact: "You can reach us at:\n📧 Email: savadiafoundation@gmail.com\n📞 Phone: +91 123 456 7890\n📍 Address: Savadia Foundation, Gujarat, India\n\nWe'd love to hear from you!",
  programs: "Our main programs include:\n1. Nutritious Silage Distribution\n2. Gaushala Support Program\n3. Health & Veterinary Care\n4. Sustainable Farming Education\n5. Community Outreach\n\nEach program is designed to ensure the welfare and dignity of Gaumata.",
  impact: "Through your generous support, we have:\n• Nourished 5,000+ cows\n• Supported 100+ gaushalas\n• Distributed 50,000+ kg of silage\n• Trained 500+ volunteers\n\nYour contribution makes a real difference!",
  default: "Thank you for your message! For more detailed information, please visit our About page or contact us directly. We're here to help! 🙏"
};

// Simple keyword matching for intent detection
const detectIntent = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.match(/\b(hi|hello|hey|namaste|greetings)\b/)) {
    return 'greetings';
  }
  if (lowerMessage.match(/\b(about|who|what is|tell me|gauchara|mission)\b/)) {
    return 'about';
  }
  if (lowerMessage.match(/\b(donate|donation|give|contribute|support|payment|money)\b/)) {
    return 'donate';
  }
  if (lowerMessage.match(/\b(volunteer|help|join|participate|work)\b/)) {
    return 'volunteer';
  }
  if (lowerMessage.match(/\b(contact|reach|email|phone|address|call)\b/)) {
    return 'contact';
  }
  if (lowerMessage.match(/\b(program|initiative|project|activity|service)\b/)) {
    return 'programs';
  }
  if (lowerMessage.match(/\b(impact|result|achievement|number|stat)\b/)) {
    return 'impact';
  }
  
  return 'default';
};

// Validation middleware
const validateMessage = [
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ max: 500 }).withMessage('Message must be less than 500 characters')
    .escape()
];

// POST /api/chat - Send message to chatbot
router.post('/', validateMessage, (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array().map(e => e.msg) 
      });
    }

    const { message } = req.body;
    const intent = detectIntent(message);
    
    let response;
    if (intent === 'greetings') {
      response = botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)];
    } else {
      response = botResponses[intent];
    }

    res.json({
      success: true,
      response,
      intent,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process message.' 
    });
  }
});

// GET /api/chat/quick-replies - Get suggested quick replies
router.get('/quick-replies', (req, res) => {
  res.json({
    success: true,
    quickReplies: [
      "Tell me about GauChara",
      "How can I donate?",
      "Volunteer opportunities",
      "Contact information",
      "Your programs",
      "Impact & achievements"
    ]
  });
});

module.exports = router;
