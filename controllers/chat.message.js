import Message from '../models/message.model.js';

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    const userMessage = await Message.create({
      userId: req.userId,
      sender: 'user',
      text,
    });
    //data

    const botResponses = {
      'hi, what can you do?':
        'I can answer questions, help you navigate the app, and guide you through any feature you want to use.',
      'how do i create an account?':
        'Click the Sign Up button, enter your email, choose a password, and verify your account.',
      'how do i update my profile?':
        'Go to Settings → Profile → Edit. Update your details and save changes.',
      'do you have dark mode?':
        'Yes. Toggle it from Settings → Appearance → Dark Mode.',
      'get me customer support.':
        'Sure. Tell me your issue and I will connect you to the support team.',
      'how do i reset my password?':
        'Click Forgot Password on the login screen and follow the instructions sent to your email.',

      'i forgot my email':
        'Please contact customer support with your registered phone number for verification.',

      'can i change my email address?':
        'Yes. Go to Settings → Account → Email and update your new email address.',

      'how do i delete my account?':
        'Go to Settings → Account → Delete Account. This action is permanent.',
    };

    const normalizedText = text.toLowerCase().trim();
    const botResponse =
      botResponses[normalizedText] || "Sorry , I don't understand";

    const botMessage = await Message.create({
      userId: req.userId,
      sender: 'bot',
      text: botResponse,
    });
    return res.status(200).json({
      userMessage: userMessage.text,
      botMessage: botMessage.text,
    });
  } catch (error) {
    console.log('Error in message controller', error);
    return res.status(500).json({ error: 'Internal server Error' });
  }
};
