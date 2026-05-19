const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Invoice = require('../models/Invoice');

const formatCurrency = (value) =>
  value.toLocaleString('fr-TN', {
    style: 'currency',
    currency: 'TND',
    minimumFractionDigits: 2,
  });

const drawTable = (doc, items, title) => {
  if (!items || items.length === 0) return;

  doc.addPage();
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#444').text(title, { align: 'left' }).moveDown(0.5);

  const startX = doc.x;
  const colWidths = [160, 80, 100, 100];
  const headers = ['Nom', 'Quantité', 'Prix unitaire', 'Total'];
  const bottomMargin = 60;
  let y = doc.y;

  const drawHeader = () => {
    doc.rect(startX, y, colWidths.reduce((a, b) => a + b), 20).fill('#f0f0f0').stroke();
    doc.fillColor('black').fontSize(11);
    let x = startX;
    headers.forEach((header, i) => {
      doc.text(header, x + 5, y + 5, { width: colWidths[i] - 10 });
      x += colWidths[i];
    });
    y += 20;
  };

  drawHeader();
  doc.fontSize(10);

  for (const item of items) {
    if (y + 20 > doc.page.height - bottomMargin) {
      doc.addPage();
      y = doc.y;
      drawHeader();
    }

    let x = startX;
    const name = item.name ?? 'N/A';
    const quantity = item.quantity != null ? item.quantity : 'N/A';
    const unit = item.unit?.trim() || '';
    const unitText = unit ? `${quantity} ${unit}` : `${quantity}`;
    const unitPrice = item.unitPrice ?? 0;
    const total = item.total ?? 0;

    doc.text(name, x + 5, y); x += colWidths[0];
    doc.text(unitText, x + 5, y); x += colWidths[1];
    doc.text(formatCurrency(unitPrice), x + 5, y); x += colWidths[2];
    doc.text(formatCurrency(total), x + 5, y);
    y += 20;
  }

  doc.moveDown(2);
};

const generateInvoicePDF = async (invoiceId) => {
  try {
    const invoice = await Invoice.findById(invoiceId)
      .populate('client')
      .populate('task');

    if (!invoice) throw new Error('Invoice not found');
    if (!invoice.client) throw new Error('Invoice client not populated');
    if (!invoice.task) throw new Error('Invoice task not populated');

    const doc = new PDFDocument({ margin: 40 });
    const invoiceDir = path.join(__dirname, '../invoices');
    if (!fs.existsSync(invoiceDir)) fs.mkdirSync(invoiceDir);

    const filename = `invoice_${invoice._id}_${Date.now()}.pdf`;
    const outputPath = path.join(invoiceDir, filename);
    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    const logoPath = path.join(__dirname, '../assets/logo.png');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 40, 40, { fit: [80, 80] });
    }

    doc.fontSize(20).font('Helvetica-Bold').text('FACTURE', { align: 'center' }).moveDown();

    const localTime = new Date().toLocaleString('fr-TN', {
      timeZone: 'Africa/Tunis',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    doc.fontSize(10).fillColor('gray').text(`Généré le: ${localTime}`, { align: 'right' }).moveDown();
    doc.fontSize(12).fillColor('black');

    doc.font('Helvetica-Bold').text('ID de la facture: ', { continued: true }).font('Helvetica').text(`${invoice._id}`);
    doc.font('Helvetica-Bold').text('Statut: ', { continued: true }).font('Helvetica');
    if (invoice.status === 'paid') {
      doc.text('Payée');
      doc.font('Helvetica-Bold').text('Payée le: ', { continued: true }).font('Helvetica').text(`${invoice.paidAt?.toLocaleDateString('fr-TN') || 'N/A'}`);
    } else {
      doc.text('Non payée');
    }

    doc.font('Helvetica-Bold').text('Client: ', { continued: true }).font('Helvetica').text(invoice.overriddenClientName || invoice.client?.name || 'N/A');
    doc.font('Helvetica-Bold').text('Email: ', { continued: true }).font('Helvetica').text(invoice.overriddenClientEmail || invoice.client?.email || 'N/A');
    doc.moveDown();

    doc.fontSize(14).font('Helvetica-Bold').text('Informations de la tâche', { align: 'center' }).moveDown(0.5);
    doc.fontSize(12).font('Helvetica');
    doc.text(`Titre: ${invoice.task?.title || 'N/A'}`);
    doc.text(`Description: ${invoice.task?.description || 'N/A'}`);
    doc.text(`Terminée le: ${invoice.task?.updatedAt?.toLocaleDateString('fr-TN') || 'N/A'}`);
    doc.moveDown();

    drawTable(doc, invoice.materialItems, 'Prestations personnalisées');
    drawTable(doc, invoice.lineItems, 'Achats consommés');

    const materialTotal = (invoice.materialItems || []).reduce((sum, i) => sum + (i.total ?? 0), 0);
    const laborTotal = (invoice.lineItems || []).reduce((sum, i) => sum + (i.total ?? 0), 0);

    doc.fontSize(12).font('Helvetica-Bold').text('Résumé des coûts');
    doc.font('Helvetica');
    doc.text(`Prestations personnalisées : ${formatCurrency(materialTotal)}`);
    doc.text(`Achats consommés : ${formatCurrency(laborTotal)}`);
    doc.text(`Prestation: ${formatCurrency(invoice.laborCost || 0)}`);
    doc.text(`Majoration: ${formatCurrency(invoice.serviceFee || 0)}`).moveDown();

    doc.font('Helvetica-Bold').fontSize(14).text(`Total: ${formatCurrency(invoice.amount || 0)}`, { align: 'right' });
    doc.moveDown(2);

    // Add final page with company info (no footer)
    doc.addPage();
    doc.fontSize(16).font('Helvetica-Bold').fillColor('black').text('Sotetel', { align: 'center' }).moveDown(0.5);
    doc.fontSize(12).font('Helvetica').fillColor('black');
    doc.text("Société Tunisienne d'Entreprises de Télécommunications", { align: 'center' });
    doc.moveDown();
    doc.text('Z.I. Poudrière 2, Sfax, Tunisie', { align: 'center' });
    doc.text('Tél : 71 135 100', { align: 'center' });
    doc.text('contact@sotetel.tn', { align: 'center' });

    doc.end();

    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    invoice.pdfFileName = filename;
    await invoice.save();

    return filename;
  } catch (err) {
    console.error('❌ Failed to generate PDF:', err.message);
    throw err;
  }
};

module.exports = generateInvoicePDF;
