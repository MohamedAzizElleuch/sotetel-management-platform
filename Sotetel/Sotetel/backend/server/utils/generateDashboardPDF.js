const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateDashboardPDF(data) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Charger le logo
  const logoPath = path.join(__dirname, '../assets/logo.png');
  const logoBase64 = fs.existsSync(logoPath)
    ? fs.readFileSync(logoPath).toString('base64')
    : '';
  const logoImage = logoBase64 ? `data:image/png;base64,${logoBase64}` : '';

  // Heure locale
  const localTime = new Date().toLocaleString('fr-TN', {
    timeZone: 'Africa/Tunis',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            padding: 40px;
            background: #f0f2f5;
            color: #333;
          }
          h1 {
            text-align: center;
            color: #1f2937;
            margin-bottom: 40px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .header img {
            max-height: 80px;
            margin-bottom: 10px;
          }
          .time {
            font-size: 14px;
            color: #555;
          }
          .section {
            background: #fff;
            padding: 25px 30px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            margin-bottom: 30px;
          }
          .section h2 {
            color: #0d6efd;
            font-size: 22px;
            margin-bottom: 15px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 8px;
          }
          .kpi {
            font-size: 16px;
            margin: 6px 0;
          }
          ul {
            padding-left: 20px;
          }
          canvas {
            margin-top: 20px;
            max-width: 100%;
          }
        </style>
      </head>
      <body>
        <div class="header">
          ${logoImage ? `<img src="${logoImage}" alt="Logo de l'entreprise" />` : ''}
          <div class="time">${localTime}</div>
        </div>

        <h1>Rapport du Tableau de Bord SOTETEL</h1>

        <div class="section">
          <h2>Vue d'ensemble des tâches</h2>
          <div class="kpi">Total des tâches: ${data.totalTasks}</div>
          <div class="kpi">Terminées: ${data.completedTasks}</div>
          <div class="kpi">En attente: ${data.pendingTasks}</div>
          <div class="kpi">Taux de complétion: ${parseFloat(data.completionRate).toFixed(2)}%</div>
        </div>

        <div class="section">
          <h2>Résumé des factures</h2>
          <div class="kpi">Total des factures: ${data.totalInvoices}</div>
          <div class="kpi">Payées: ${data.paidInvoices}</div>
          <div class="kpi">Impayées: ${data.unpaidInvoices}</div>
        </div>

        <div class="section">
          <h2>Alerte de stock faible</h2>
          <ul>
            ${
              data.lowStockItems && data.lowStockItems.length > 0
                ? data.lowStockItems
                    .map(item => `<li>${item.name} (Quantité: ${item.quantity})</li>`)
                    .join('')
                : '<li>Pas d\'articles en stock faible</li>'
            }
          </ul>
        </div>

        <div class="section">
          <h2>Insights visuels</h2>
          <canvas id="taskChart" width="600" height="300"></canvas>
          <canvas id="invoiceChart" width="600" height="300"></canvas>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script>
          const taskChartCtx = document.getElementById('taskChart').getContext('2d');
          new Chart(taskChartCtx, {
            type: 'bar',
            data: {
              labels: ['Terminées', 'En attente'],
              datasets: [{
                label: 'Tâches',
                data: [${data.completedTasks}, ${data.pendingTasks}],
                backgroundColor: ['#198754', '#ffc107']
              }]
            },
            options: {
              responsive: false,
              plugins: {
                legend: { display: false }
              }
            }
          });

          const invoiceChartCtx = document.getElementById('invoiceChart').getContext('2d');
          new Chart(invoiceChartCtx, {
            type: 'doughnut',
            data: {
              labels: ['Payées', 'Impays'],
              datasets: [{
                data: [${data.paidInvoices}, ${data.unpaidInvoices}],
                backgroundColor: ['#0d6efd', '#dc3545']
              }]
            },
            options: {
              responsive: false,
              plugins: {
                legend: { position: 'bottom' }
              }
            }
          });
        </script>
      </body>
    </html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await new Promise(resolve => setTimeout(resolve, 1500));

  const pdfDir = path.join(__dirname, '../pdfs');
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }

  const outputPath = path.join(pdfDir, 'rapport_du_tableau_de_bord.pdf');
  await page.pdf({ path: outputPath, format: 'A4' });

  await browser.close();
  return outputPath;
}

module.exports = generateDashboardPDF;
