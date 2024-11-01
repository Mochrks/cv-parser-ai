import type { NextApiRequest, NextApiResponse } from 'next';
import { CV_STRUCTURE_INSTRUCTIONS } from '@/utils/cvStructure';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { text } = req.body;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: CV_STRUCTURE_INSTRUCTIONS
                    },
                    {
                        role: "user",
                        content: `Convert the following CV/Resume text into JSON:\n\n${text}`
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            }),
        });

        if (!response.ok) {
            throw new Error('OpenAI API request failed');
        }

        const data = await response.json();
        // return data;
        return res.status(200).json(JSON.parse(data.choices[0].message.content));
    } catch (error) {
        console.error('Error generating JSON:', error);
        return res.status(500).json({ error: 'Failed to generate JSON' });
    }
}