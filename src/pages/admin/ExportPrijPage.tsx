import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import Sidebar from "./sidebar"

const ExportPrijPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />  {/* Correctly integrating the Sidebar */}
      <div className="flex-1 p-6">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Export přij.</h1>
          <Card>
            <CardHeader>
              <CardTitle>Export přijímacího řízení</CardTitle>
              <CardDescription>Export dat přijímacího řízení</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Tato sekce je ve vývoji. Zde bude možné exportovat data přijímacího řízení.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ExportPrijPage
