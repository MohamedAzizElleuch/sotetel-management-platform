import { useState } from "react"
import { Link } from "react-router-dom"
import { saveAs } from "file-saver"
import { Loader2, Download, Mail } from "lucide-react"
import { motion } from "framer-motion"

import api from "@/services/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const AdminDashboard = () => {
  const [downloading, setDownloading] = useState(false)

  const downloadDashboardPDF = async () => {
    try {
      setDownloading(true)
      const response = await api.get("/admin/dashboard/pdf", {
        responseType: "blob",
      })
      const blob = new Blob([response.data], { type: "application/pdf" })
      saveAs(blob, "dashboard-report.pdf")
    } catch (error) {
      console.error("❌ Failed to download dashboard PDF:", error)
    } finally {
      setDownloading(false)
    }
  }

  const actions = [
    {
      label: "Voir les messages de contact",
      to: "/admin/messages",
      variant: "outline",
      icon: <Mail className="w-4 h-4" />,
    },
    {
      label: "Télécharger le PDF du tableau de bord",
      onClick: downloadDashboardPDF,
      icon: <Download className="w-4 h-4" />,
      variant: "default",
    },
    {
      label: "Mon Profil",
      to: "/profile",
      variant: "secondary",
    },
    {
      label: "Gérer l’inventaire",
      to: "/admin/inventory",
      variant: "default",
    },
    {
      label: "Gérer les utilisateurs",
      to: "/admin/users",
      variant: "outline",
    },
    {
      label: "Gérer les tâches",
      to: "/admin/assign-tasks",
      variant: "default",
    },
    {
      label: "Voir les journaux d’inventaire",
      to: "/admin/inventory/logs",
      variant: "ghost",
    },
    {
      label: "Gérer les factures",
      to: "/admin/invoices",
      variant: "default",
    },
    {
      label: "Factures impayées",
      to: "/admin/invoices/unpaid",
      variant: "destructive",
    },
    {
      label: "Offres de prix",
      to: "/admin/offres-de-prix",
      variant: "secondary",
    },
    {
      label: "Gérer les actualités",
      to: "/admin/actualites",
      variant: "default",
    },
  ]

  return (
    <div className="p-6 md:p-10 bg-muted min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-foreground">
        Tableau de bord – Admin
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="rounded-2xl border shadow-sm hover:shadow-md transition duration-300">
              <CardContent className="p-6">
                {action.to ? (
                  <Button
                    asChild
                    variant={action.variant}
                    className="w-full h-14 text-base"
                  >
                    <Link to={action.to}>
                      {action.icon && <span className="mr-2">{action.icon}</span>}
                      {action.label}
                    </Link>
                  </Button>
                ) : (
                  <Button
                    onClick={action.onClick}
                    disabled={downloading}
                    variant={action.variant}
                    className="w-full h-14 text-base"
                  >
                    {downloading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Téléchargement...
                      </>
                    ) : (
                      <>
                        {action.icon && <span className="mr-2">{action.icon}</span>}
                        {action.label}
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
