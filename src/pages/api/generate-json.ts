import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { CV_STRUCTURE_INSTRUCTIONS_ONE } from '@/utils/cvStructure';
import { CV_STRUCTURE_INSTRUCTIONS_TWO } from '@/utils/cvStructureTwo';

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text,template } = req.body;

     const instructions = template === 'template2' ? CV_STRUCTURE_INSTRUCTIONS_TWO : CV_STRUCTURE_INSTRUCTIONS_ONE;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: instructions,
        },
        {
          role: "user",
          content: `Convert the following CV/Resume text into JSON:\n\n${text}`,
        },
      ],
      temperature: 0.7,
      // max_tokens: 1000,
      stream: false,
    });

    const resultContent = completion.choices?.[0]?.message?.content;
    if (!resultContent) {
      return res.status(500).json({ error: 'No content received from OpenAI' });
    }

    let parsedContent;
    try {
      parsedContent = JSON.parse(resultContent);
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      return res.status(500).json({ error: 'Failed to parse response as JSON' });
    }

    return res.status(200).json(parsedContent);
  } catch (error) {
    console.error('Error generating JSON:', error);
    return res.status(500).json({ error: error || 'Failed to generate JSON' });
  }
}
