const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ClaudeResponse {
  id: string;
  type: string;
  role: string;
  content: Array<{
    type: string;
    text: string;
  }>;
  model: string;
  stop_reason: string;
  stop_sequence: string | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

export async function callClaude(
  messages: ClaudeMessage[],
  systemPrompt?: string
): Promise<string> {
  if (!CLAUDE_API_KEY) {
    throw new Error('VITE_CLAUDE_API_KEY is not configured');
  }

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Claude API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data: ClaudeResponse = await response.json();
    const textContent = data.content.find(c => c.type === 'text');
    
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    return textContent.text;
  } catch (error) {
    console.error('Claude API call failed:', error);
    throw error;
  }
}

export async function generateAstralInterpretation(chartData: any): Promise<string> {
  const systemPrompt = `Tu es un expert en astrologie. Fournis une interprétation détaillée et personnalisée 
du thème astral de l'utilisateur basée sur ses données astrales. Sois poétique et inspirant.`;

  const userMessage = `Voici mes données astrales: ${JSON.stringify(chartData, null, 2)}. 
Génère une interprétation complète de mon thème astral.`;

  return callClaude([{ role: 'user', content: userMessage }], systemPrompt);
}

export async function generateCompatibilityAnalysis(chart1: any, chart2: any): Promise<string> {
  const systemPrompt = `Tu es un expert en astrologie relationnelle. Analyse la compatibilité 
entre deux thèmes astraux et fournis des insights profonds sur leur dynamique.`;

  const userMessage = `Analyse la compatibilité entre ces deux thèmes astraux:
Thème 1: ${JSON.stringify(chart1, null, 2)}
Thème 2: ${JSON.stringify(chart2, null, 2)}`;

  return callClaude([{ role: 'user', content: userMessage }], systemPrompt);
}
