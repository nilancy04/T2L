import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API with the key from environment
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main() {
  try {
    // Initialize the model (using gemini-pro instead of gemini-2.0-flash)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Generate content
    const result = await model.generateContent({
      contents: [{ text: 'Explain how AI works in a few words' }]
    });

    // Get the response
    const response = await result.response;
    console.log(response.text());
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
main();