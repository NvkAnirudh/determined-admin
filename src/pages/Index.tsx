
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Database, BookOpen } from "lucide-react"

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-6">DEtermined</h1>
        <p className="text-xl text-gray-300 mb-10">
          Your go-to resource for Data Engineering interview prep and project showcase
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] flex flex-col items-center">
            <Database className="h-12 w-12 mb-4 text-blue-500" />
            <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
            <p className="text-gray-400 mb-6">
              Add new DE prep questions and projects to the database
            </p>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
              <Link to="/admin">Access Admin Panel</Link>
            </Button>
          </div>
          
          <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] flex flex-col items-center">
            <BookOpen className="h-12 w-12 mb-4 text-green-500" />
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-gray-400 mb-6">
              Browse through our collection of interview questions and projects
            </p>
            <Button disabled className="w-full bg-green-600 opacity-70">
              Coming Soon
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
