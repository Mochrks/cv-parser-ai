import type { NextApiRequest, NextApiResponse } from 'next';
import pdfParse from 'pdf-parse';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { fileContent } = req.body;
        
        // Decode base64
        const pdfBuffer = Buffer.from(fileContent.split(',')[1], 'base64');
        
        // Parse PDF
        const pdfData = await pdfParse(pdfBuffer);
        const text = pdfData.text;
        
        return res.status(200).json({ text });
    } catch (error) {
        console.error('Error processing PDF:', error);
        return res.status(500).json({ error: 'Failed to process PDF' });
    }
}