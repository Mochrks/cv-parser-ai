"use client";
import React, { useRef, useState } from 'react';
import { File } from 'lucide-react';
import { CloudUpload } from 'lucide-react';
import countTokens from '@/test/countTokens';
interface FileItem {
    name: string;
    content: string;
    size: number;
}

export default function UploadFile() {
    const [files, setFiles] = useState<FileItem | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [output, setOutput] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [template, setTemplate] = useState('template1');

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles?.[0]) {
            await processFile(droppedFiles[0]);
        }
    };

    const handleFileUpload = async (fileList: FileList | null) => {
        if (fileList?.[0]) {
            await processFile(fileList[0]);
        }
    };

    const processFile = async (file: File) => {
        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setFiles({
                name: file.name,
                content: e.target?.result as string,
                size: file.size
            });
        };
        reader.readAsDataURL(file);
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const extractToJson = async () => {
        if (!files) {
            console.error('No file to upload');
            return;
        }

        setIsLoading(true);
        try {
            console.log('Sending PDF for processing...');
            const processResponse = await fetch('/api/process-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fileContent: files.content
                }),
            });

            if (!processResponse.ok) {
                throw new Error(`Failed to process PDF: ${processResponse.statusText}`);
            }

            const { text } = await processResponse.json();
            console.log(text);
            console.log('PDF processed successfully');

            console.log('Generating JSON...');
            const tokenCountText = countTokens(text, 'gpt-4o-mini');
            console.log(`Count token result pdf parse: ${tokenCountText}`);

            const jsonResponse = await fetch('/api/generate-json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text, template }),
            });

            if (!jsonResponse.ok) {
                throw new Error(`Failed to generate JSON: ${jsonResponse.statusText}`);
            }

            const result = await jsonResponse.json();
            setOutput(JSON.stringify(result, null, 2));
            console.log(result);
            console.log('JSON generated successfully');

        } catch (error) {
            console.error('Error:', error);
            setOutput(`Error processing file: `);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full p-10">
            <h1 className="text-4xl font-bold text-center py-10">Upload File Generate To Json </h1>
            <div
                className={`mx-auto max-w-5xl border-2 border-dashed rounded-lg p-8 text-center 
                ${dragActive ? 'border-primary' : 'border-gray-300'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={openFileDialog}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                />
                <div className='flex items-center justify-center py-6'>
                    <CloudUpload className='w-[60px] h-[60px]' />
                </div>

                <p>Drag and drop your PDF file here or click to select file</p>
                {files && (
                    <div className="mt-4">
                        <h4 className="text-sm font-semibold mb-2">Uploaded File:</h4>
                        <ul className="text-left">
                            <li className="text-sm">
                                <File className="inline mr-2 h-4 w-4" />
                                {files.name} ({formatFileSize(files.size)})
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center justify-center mt-10">
                <label htmlFor="template" className="block text-sm font-semibold mb-2">Select Template:</label>
                <select
                    id="template"
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="border rounded p-2 bg-blue-700"
                >
                    <option value="template1">Template 1</option>
                    <option value="template2">Template 2</option>
                </select>
            </div>

            <div className='w-full text-center py-10'>
                <button
                    onClick={extractToJson}
                    disabled={isLoading || !files}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:text-gray-400"
                >
                    {isLoading ? 'Processing...' : 'Generate JSON'}
                </button>
            </div>
            {output && (
                <div className='w-full text-left pt-10'>
                    <pre className="bg-gray-100 p-4 rounded overflow-auto text-black">
                        {output}
                    </pre>
                </div>
            )}
        </div>
    );
};