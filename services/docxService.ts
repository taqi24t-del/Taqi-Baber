
import { Service } from "../types";

// mammoth is available globally via script tag in index.html
declare var mammoth: any;

export async function parseDocxServices(file: File): Promise<Service[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = result.value;
    
    // Create a temporary element to parse the HTML table
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const table = doc.querySelector('table');
    
    if (!table) {
      // Fallback: try to extract from text if no table
      const text = doc.body.innerText || "";
      return parseFromText(text);
    }

    const rows = Array.from(table.querySelectorAll('tr'));
    const services: Service[] = [];

    // Skip header row if it looks like one
    const startIndex = rows[0]?.innerText.toLowerCase().includes('service') ? 1 : 0;

    for (let i = startIndex; i < rows.length; i++) {
      const cells = Array.from(rows[i].querySelectorAll('td'));
      if (cells.length >= 2) {
        services.push({
          id: Math.random().toString(36).substr(2, 9),
          name: cells[0].innerText.trim(),
          description: cells[1].innerText.trim(),
          price: cells[2]?.innerText.trim() || "TBD",
          duration: cells[3]?.innerText.trim() || "30-60 min"
        });
      }
    }

    return services;
  } catch (error) {
    console.error("Error parsing DOCX:", error);
    throw new Error("Could not parse DOCX file. Please ensure it contains a service table.");
  }
}

function parseFromText(text: string): Service[] {
  // Simple regex-based fallback for unstructured text
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  return lines.slice(0, 5).map(line => ({
    id: Math.random().toString(36).substr(2, 9),
    name: line.split(/[-:]/)[0]?.trim() || "Service",
    description: "Extracted from document",
    price: line.match(/₹?\d+/)?.[0] || "Call for price"
  }));
}
