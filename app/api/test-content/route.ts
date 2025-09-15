import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');
    
    if (!filePath) {
      return NextResponse.json({ error: 'No path provided' }, { status: 400 });
    }
    
    // Construct the full path to the file in the public directory
    const fullPath = path.join(process.cwd(), 'public', filePath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ 
        error: 'File not found', 
        path: fullPath,
        requestedPath: filePath 
      }, { status: 404 });
    }
    
    // Read the file
    const content = fs.readFileSync(fullPath, 'utf-8');
    
    return NextResponse.json({ 
      success: true, 
      path: filePath,
      exists: true,
      contentLength: content.length 
    });
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
