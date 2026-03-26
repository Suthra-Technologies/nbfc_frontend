import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const BANK_TITLE = 'MACTS BANK';
const TEAL = [0, 155, 176] as [number, number, number];

// ---------------------------------------------------------------------------
// Generic PDF helper
// ---------------------------------------------------------------------------
export function exportPDF(
    reportTitle: string,
    dateRange: string,
    headers: string[],
    rows: (string | number)[][],
    filename: string
) {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    // Header band
    doc.setFillColor(...TEAL);
    doc.rect(0, 0, 297, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(BANK_TITLE, 148.5, 8, { align: 'center' });
    doc.setFontSize(10);
    doc.text(reportTitle, 148.5, 14, { align: 'center' });

    // Date range
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Period: ${dateRange}`, 14, 25);
    doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, 283, 25, { align: 'right' });

    autoTable(doc, {
        startY: 30,
        head: [headers],
        body: rows.map(r => r.map(c => String(c))),
        styles: { fontSize: 7.5, cellPadding: 2 },
        headStyles: { fillColor: TEAL, textColor: [255, 255, 255], fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 250, 252] },
        tableLineColor: [200, 220, 225],
        tableLineWidth: 0.1,
    });

    // Footer
    const pages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setTextColor(150);
        doc.text(`Page ${i} of ${pages}`, 148.5, 205, { align: 'center' });
    }

    doc.save(`${filename}.pdf`);
}

// ---------------------------------------------------------------------------
// Generic Excel helper
// ---------------------------------------------------------------------------
export function exportExcel(
    reportTitle: string,
    dateRange: string,
    headers: string[],
    rows: (string | number)[][],
    filename: string
) {
    const wb = XLSX.utils.book_new();

    const sheetData: (string | number)[][] = [
        [BANK_TITLE],
        [reportTitle],
        [`Period: ${dateRange}`],
        [`Generated: ${new Date().toLocaleString('en-IN')}`],
        [],
        headers,
        ...rows,
    ];

    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    // Auto-width columns
    const colWidths = headers.map((h, ci) => {
        const maxLen = Math.max(
            h.length,
            ...rows.map(r => String(r[ci] ?? '').length)
        );
        return { wch: Math.min(maxLen + 4, 40) };
    });
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, `${filename}.xlsx`);
}
