
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DEPrepForm from "@/components/forms/DEPrepForm"
import DEProjectForm from "@/components/forms/DEProjectForm"
import { useToast } from "@/components/ui/use-toast"

const Admin = () => {
  const { toast } = useToast()

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-12">DEtermined Admin Panel</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* DE Prep Form */}
          <Card className="bg-[#1A1A1A] border-[#333] text-white">
            <CardHeader>
              <CardTitle>DE Prep Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <DEPrepForm />
            </CardContent>
          </Card>

          {/* DE Projects Form */}
          <Card className="bg-[#1A1A1A] border-[#333] text-white">
            <CardHeader>
              <CardTitle>DE Project Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <DEProjectForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Admin
