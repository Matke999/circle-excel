import { useCallback } from 'react';

export function useExport() {
  const exportAsPNG = useCallback(async (elementId: string): Promise<void> => {
    const html2canvas = (await import('html2canvas')).default;
    const element = document.getElementById(elementId);
    if (!element) return;
    const canvas = await html2canvas(element);
    const link = document.createElement('a');
    link.download = 'ringsheet.png';
    link.href = canvas.toDataURL();
    link.click();
  }, []);

  const exportAsPDF = useCallback(async (elementId: string): Promise<void> => {
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');
    const element = document.getElementById(elementId);
    if (!element) return;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('ringsheet.pdf');
  }, []);

  return { exportAsPNG, exportAsPDF };
}
