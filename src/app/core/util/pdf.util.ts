import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function exportarElementoParaPDF(idElemento: string, nomePDF:string ): void {

  const data = document.getElementById(idElemento);
    const options = {
      background: 'white',
      scale: 3
    };

  html2canvas(data, options).then((canvas) => {

    var img = canvas.toDataURL("image/PNG");
    var doc = new jsPDF('l', 'mm', 'a4');

    // Add image Canvas to PDF
    const bufferX = 5;
    const bufferY = 5;
    const imgProps = (<any>doc).getImageProperties(img);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

    return doc;
  }).then((doc) => {
    doc.save(nomePDF+'.pdf');
  });
}
