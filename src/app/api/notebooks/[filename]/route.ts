import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  try {
    // Resolve the params promise
    const params = await context.params;
    
    // Get the filename from params
    const filename = params.filename;
    
    // Build the path to the notebook file
    const notebookPath = path.join(process.cwd(), 'Notebook', filename);
    
    // Check if the file exists
    if (!fs.existsSync(notebookPath)) {
      return new NextResponse(
        JSON.stringify({ error: `Notebook file ${filename} not found` }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Read the notebook file
    const notebookContent = fs.readFileSync(notebookPath, 'utf-8');
    
    // Parse the notebook content to ensure it's valid JSON
    const notebookData = JSON.parse(notebookContent);
    
    // Return the notebook data
    return NextResponse.json(notebookData);
  } catch (error) {
    console.error('Error serving notebook:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to serve notebook file' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
