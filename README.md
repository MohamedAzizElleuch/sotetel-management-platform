
```
Sotetel
└─ Sotetel
   └─ Sotetel
      ├─ backend
      │  ├─ package-lock.json
      │  ├─ package.json
      │  └─ server
      │     ├─ .env
      │     ├─ assets
      │     │  └─ logo.png
      │     ├─ config
      │     │  └─ db.js
      │     ├─ controllers
      │     │  ├─ actualiteController.js
      │     │  ├─ adminDashboardController.js
      │     │  ├─ authController.js
      │     │  ├─ inventoryController.js
      │     │  ├─ invoiceController.js
      │     │  ├─ messageController.js
      │     │  ├─ taskController.js
      │     │  └─ userController.js
      │     ├─ invoices
      │     │  └─ invoice_6819cf43ecad00ed712b2d67_1746973015572.pdf
      │     ├─ middleware
      │     │  ├─ authMiddleware.js
      │     │  ├─ isOwnerOrAdmin.js
      │     │  ├─ requireRole.js
      │     │  └─ uploadActualiteImage.js
      │     ├─ models
      │     │  ├─ Actualite.js
      │     │  ├─ InventoryItem.js
      │     │  ├─ InventoryLog.js
      │     │  ├─ Invoice.js
      │     │  ├─ Message.js
      │     │  ├─ Task.js
      │     │  └─ User.js
      │     ├─ package-lock.json
      │     ├─ package.json
      │     ├─ pdfs
      │     ├─ routes
      │     │  ├─ actualiteRoutes.js
      │     │  ├─ adminDashboardRoutes.js
      │     │  ├─ authRoutes.js
      │     │  ├─ inventoryRoutes.js
      │     │  ├─ invoiceRoutes.js
      │     │  ├─ messageRoutes.js
      │     │  ├─ taskRoutes.js
      │     │  └─ userRoutes.js
      │     ├─ server.js
      │     ├─ uploads
      │     │  └─ actualites
      │     │     ├─ actualite-1747246356456-357162944.PNG
      │     │     ├─ actualite-1747246996373-954352163.PNG
      │     │     └─ actualite-1747252145177-571564745.png
      │     └─ utils
      │        ├─ generateDashboardPDF.js
      │        ├─ generateInvoicePDF.js
      │        ├─ isTechnicianAuthorized.js
      │        ├─ logInventoryUsage.js
      │        └─ sendInvoiceEmail.js
      └─ frontend
         ├─ .env
         ├─ components.json
         ├─ eslint.config.js
         ├─ index.html
         ├─ jsconfig.json
         ├─ package-lock.json
         ├─ package.json
         ├─ postcss.config.cjs
         ├─ public
         │  ├─ assets
         │  │  ├─ about-banner.png
         │  │  ├─ about.jpg
         │  │  ├─ certs
         │  │  │  ├─ ccda.png
         │  │  │  ├─ ccdp.png
         │  │  │  ├─ ccie.png
         │  │  │  ├─ ccna-security.png
         │  │  │  ├─ ccna-wireless.png
         │  │  │  ├─ ccnp-1.png
         │  │  │  ├─ ccnp-2.png
         │  │  │  ├─ ccnp-3.png
         │  │  │  ├─ eco.png
         │  │  │  ├─ haccp.png
         │  │  │  ├─ hp-business.png
         │  │  │  ├─ huawei.png
         │  │  │  ├─ iso-27001.png
         │  │  │  ├─ iso-9001.png
         │  │  │  ├─ lightning.png
         │  │  │  ├─ pim.png
         │  │  │  ├─ safety.png
         │  │  │  ├─ security.png
         │  │  │  ├─ tspm.png
         │  │  │  └─ vmware.png
         │  │  ├─ cloud.svg
         │  │  ├─ ethics-photo.jpg
         │  │  ├─ hero-bg.jpg
         │  │  ├─ hero-bgb.jpg
         │  │  ├─ hero-illustration.jpg
         │  │  ├─ hero-illustration.svg
         │  │  ├─ hse-photo.jpg
         │  │  ├─ icon1.svg
         │  │  ├─ icon3.svg
         │  │  ├─ image-internationale.png
         │  │  ├─ image-internationalee.png
         │  │  ├─ logo.png
         │  │  ├─ map.jpg
         │  │  ├─ mapp.jpg
         │  │  ├─ network.svg
         │  │  ├─ partners
         │  │  │  ├─ bws.png
         │  │  │  ├─ cisco.png
         │  │  │  ├─ dell.png
         │  │  │  ├─ grandstream.png
         │  │  │  ├─ hp.png
         │  │  │  ├─ huawei.png
         │  │  │  ├─ nexans.png
         │  │  │  ├─ soroubat.png
         │  │  │  ├─ tmi.png
         │  │  │  ├─ tt.png
         │  │  │  └─ vmware.png
         │  │  ├─ quality-photo.jpg
         │  │  ├─ security.svg
         │  │  ├─ sotetel-cover.png
         │  │  ├─ SOTETEL-ethics-code.pdf
         │  │  ├─ SOTETEL-hse-policy.pdf
         │  │  ├─ sotetel-map-thumbnail.jpg
         │  │  ├─ sotetel-promo.mp4
         │  │  ├─ SOTETEL-quality-policy.pdf
         │  │  ├─ speed.svg
         │  │  ├─ video-thumbnail-new.png
         │  │  └─ y.jpg
         │  └─ vite.svg
         ├─ README.md
         ├─ src
         │  ├─ App.jsx
         │  ├─ assets
         │  │  └─ react.svg
         │  ├─ components
         │  │  ├─ Footer.jsx
         │  │  ├─ LogoutButton.jsx
         │  │  ├─ Navbar.jsx
         │  │  ├─ PrivateRoute.jsx
         │  │  └─ ui
         │  │     ├─ alert-dialog.jsx
         │  │     ├─ button.jsx
         │  │     ├─ card.jsx
         │  │     ├─ dialog.jsx
         │  │     ├─ dropdown-menu.jsx
         │  │     ├─ input.jsx
         │  │     ├─ select.jsx
         │  │     ├─ table.jsx
         │  │     ├─ textarea.jsx
         │  │     ├─ tooltip.jsx
         │  │     └─ use-toast.js
         │  ├─ context
         │  │  └─ AuthContext.jsx
         │  ├─ hooks
         │  ├─ index.css
         │  ├─ lib
         │  │  └─ utils.js
         │  ├─ main.jsx
         │  ├─ pages
         │  │  ├─ Actualite.jsx
         │  │  ├─ ActualiteDetail.jsx
         │  │  ├─ admin
         │  │  │  ├─ AddInventoryItem.jsx
         │  │  │  ├─ AdminDashboard.jsx
         │  │  │  ├─ AdminInvoiceEdit.jsx
         │  │  │  ├─ AdminInvoices.jsx
         │  │  │  ├─ AdminMessageDetail.jsx
         │  │  │  ├─ AdminMessages.jsx
         │  │  │  ├─ AssignTasks.jsx
         │  │  │  ├─ EditInventoryItem.jsx
         │  │  │  ├─ InventoryDashboard.jsx
         │  │  │  ├─ InventoryLogs.jsx
         │  │  │  ├─ LowStockInventory.jsx
         │  │  │  ├─ ManageActualites.jsx
         │  │  │  ├─ MarkPaidInvoices.jsx
         │  │  │  └─ OffresDePrix.jsx
         │  │  ├─ APropos.jsx
         │  │  ├─ auth
         │  │  │  ├─ AdminLogin.jsx
         │  │  │  ├─ AdminRegister.jsx
         │  │  │  ├─ ClientLogin.jsx
         │  │  │  └─ ClientRegister.jsx
         │  │  ├─ client
         │  │  │  ├─ ClientDashboard.jsx
         │  │  │  ├─ ClientQuoteResponses.jsx
         │  │  │  ├─ ClientSeeInvoices.jsx
         │  │  │  ├─ ClientTasks.jsx
         │  │  │  └─ DemandeOffreDePrix.jsx
         │  │  ├─ Contact.jsx
         │  │  ├─ DateEtHistorique.jsx
         │  │  ├─ EngagementEthiqueEtQualite.jsx
         │  │  ├─ IndexPageAdmin.jsx
         │  │  ├─ IndexPageClient.jsx
         │  │  ├─ MissionVisionsValeurs.jsx
         │  │  ├─ PartenaireEtCertification.jsx
         │  │  ├─ Profile.jsx
         │  │  ├─ ServicesPageClient.jsx
         │  │  ├─ sotetelalinternation.jsx
         │  │  └─ technician
         │  │     ├─ TechnicianCompletedTasks.jsx
         │  │     ├─ TechnicianDashboard.jsx
         │  │     └─ TechnicianTaskUpdate.jsx
         │  └─ services
         │     ├─ api.js
         │     └─ authService.js
         ├─ structure.txt
         ├─ tailwind.config.js
         └─ vite.config.js

```