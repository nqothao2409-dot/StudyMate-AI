/**
 * Gemini AI API utility
 * Handles calls to Google Gemini API with fallback mock data
 */

const callGeminiAPI = async (prompt, apiKey, type = 'text') => {
  // Fallback mock data if no API key
  if (!apiKey) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (type === 'quiz') {
          resolve(JSON.stringify([
            {
              question: 'Thủ đô của Việt Nam là gì?',
              options: ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Huế'],
              correct: 1,
            },
            {
              question: 'Công thức hóa học của nước?',
              options: ['HO', 'H2O', 'CO2', 'O2'],
              correct: 1,
            },
            {
              question: 'Số Pi xấp xỉ bằng bao nhiêu?',
              options: ['3.14', '3.15', '3.12', '3.16'],
              correct: 0,
            },
          ]));
        } else if (type === 'flashcard') {
          resolve(JSON.stringify([
            { front: 'Hello', back: 'Xin chào' },
            { front: 'Apple', back: 'Quả táo' },
            { front: 'School', back: 'Trường học' },
          ]));
        } else {
          resolve(
            'Đây là phản hồi mẫu do bạn chưa nhập API Key. Hãy vào Cài đặt để nhập Gemini API Key và trải nghiệm AI thực sự!'
          );
        }
      }, 1500);
    });
  }

  // Real API call
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('AI Error:', error);
    return 'Có lỗi xảy ra khi kết nối với AI. Vui lòng kiểm tra API Key.';
  }
};

export default callGeminiAPI;
