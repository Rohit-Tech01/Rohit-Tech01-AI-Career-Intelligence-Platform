import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import * as XLSX from 'xlsx';

export const generateProfessionalPDF = (data: any) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('Career Analysis Report', 20, 20);
  
  doc.setFontSize(12);
  doc.text(`Name: ${data.name || 'N/A'}`, 20, 40);
  doc.text(`Education: ${data.education || 'N/A'}`, 20, 50);
  doc.text(`Field of Study: ${data.fieldOfStudy || 'N/A'}`, 20, 60);
  
  doc.setFontSize(14);
  doc.text('Skills', 20, 80);
  doc.setFontSize(10);
  data.skills?.forEach((skill: string, index: number) => {
    doc.text(`- ${skill}`, 20, 90 + (index * 10));
  });
  
  doc.save('career-report.pdf');
};

export const generateProfessionalWord = (data: any) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: 'Career Analysis Report',
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({
          text: `Name: ${data.name || 'N/A'}`,
        }),
        new Paragraph({
          text: `Education: ${data.education || 'N/A'}`,
        }),
        new Paragraph({
          text: `Field of Study: ${data.fieldOfStudy || 'N/A'}`,
        }),
        new Paragraph({
          text: 'Skills',
          heading: HeadingLevel.HEADING_2,
        }),
        ...(data.skills || []).map((skill: string) => 
          new Paragraph({
            text: `- ${skill}`,
          })
        ),
      ],
    }],
  });

  Packer.toBlob(doc).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'career-report.docx';
    a.click();
    window.URL.revokeObjectURL(url);
  });
};

export const generateProfessionalExcel = (data: any) => {
  const wb = XLSX.utils.book_new();
  
  const wsData = [
    ['Career Analysis Report'],
    [''],
    ['Name', data.name || 'N/A'],
    ['Education', data.education || 'N/A'],
    ['Field of Study', data.fieldOfStudy || 'N/A'],
    [''],
    ['Skills'],
    ...(data.skills || []).map((skill: string) => [skill]),
  ];
  
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, 'Career Report');
  
  XLSX.writeFile(wb, 'career-report.xlsx');
};
