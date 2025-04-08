import { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageTransition } from "@/components/ui/page-transition";
import { User, Code, Database, Server, Globe, Phone, Mail, Github } from "lucide-react";

export default function AboutPage() {
  // Set the document title
  useEffect(() => {
    document.title = "About - Calm Corners";
  }, []);

  return (
    <PageTransition className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Calm Corners</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Learn more about our platform and the team behind it
          </p>
        </div>
        
        <Tabs defaultValue="team" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="team">Our Team</TabsTrigger>
            <TabsTrigger value="platform">The Platform</TabsTrigger>
          </TabsList>
          
          <TabsContent value="team">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
              <p className="text-gray-600 mb-8">
                Calm Corners was created by a talented team of developers passionate about helping students and professionals find the perfect quiet spaces for focused work and study.
              </p>
              
              {/* Team Lead */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="md:col-span-3">
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row items-center">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                          <User className="h-12 w-12 text-primary" />
                        </div>
                        <div className="text-center md:text-left">
                          <h3 className="text-xl font-bold">Anmol Pathak</h3>
                          <p className="text-primary font-medium mb-2">UI/UX Developer</p>
                          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center md:items-start">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-1 text-gray-500" />
                              <span className="text-gray-500">9926556765</span>
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-1 text-gray-500" />
                              <span className="text-gray-500">anmol.pathak@example.com</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Team Members */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Frontend Developer */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center">
                      <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
                        <Code className="h-10 w-10 text-purple-600" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-lg font-bold">Somya Choudhary</h3>
                        <p className="text-purple-600 font-medium mb-2">Frontend Developer</p>
                        <div className="flex flex-col sm:flex-row gap-2 items-center sm:items-start">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-gray-500">9142205919</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Database Developer */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center">
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
                        <Database className="h-10 w-10 text-blue-600" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-lg font-bold">Ashish Dwivedi</h3>
                        <p className="text-blue-600 font-medium mb-2">Database and Backend Developer</p>
                        <div className="flex flex-col sm:flex-row gap-2 items-center sm:items-start">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-gray-500">8349753118</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Backend Developer 1 */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
                        <Server className="h-10 w-10 text-green-600" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-lg font-bold">Mayank Chouhan</h3>
                        <p className="text-green-600 font-medium mb-2">Backend Developer</p>
                        <div className="flex flex-col sm:flex-row gap-2 items-center sm:items-start">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-gray-500">8770810722</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Backend Developer 2 */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
                        <Server className="h-10 w-10 text-green-600" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-lg font-bold">Ganesh Rathore</h3>
                        <p className="text-green-600 font-medium mb-2">Backend Developer</p>
                        <div className="flex flex-col sm:flex-row gap-2 items-center sm:items-start">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-gray-500">9301071262</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="platform">
            <div className="space-y-10">
              <section>
                <h2 className="text-2xl font-bold mb-4">About Calm Corners</h2>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-gray-600 mb-4">
                    Calm Corners is a platform designed to help students and professionals find and book quiet study spaces. In today's fast-paced world, finding a peaceful environment to work or study can be challenging. Our mission is to connect people with the perfect spaces for focused work, whether that's a quiet corner in a library, a dedicated study room, or a peaceful café.
                  </p>
                  <p className="text-gray-600 mb-4">
                    What makes Calm Corners unique is our real-time availability tracking, which allows users to see exactly how busy a space is before they visit. No more arriving at a library to find every seat taken or spending valuable time searching for an available desk.
                  </p>
                  <p className="text-gray-600">
                    Our platform is designed with simplicity and user experience in mind, making it quick and easy to find, compare, and book the perfect study space for your needs.
                  </p>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-gray-600 mb-4">
                    At Calm Corners, our mission is to empower students and professionals to be more productive by providing easy access to quality study spaces. We believe that everyone deserves a peaceful environment to focus, learn, and create.
                  </p>
                  <p className="text-gray-600">
                    We're committed to:
                  </p>
                  <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-600">
                    <li>Connecting users with quality study environments</li>
                    <li>Providing accurate, real-time availability information</li>
                    <li>Making the booking process simple and hassle-free</li>
                    <li>Building community among students and professionals</li>
                    <li>Supporting local libraries, cafés, and other study space providers</li>
                  </ul>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-gray-600 mb-4">
                    Calm Corners is built using modern web technologies to ensure a fast, responsive user experience across all devices:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">Frontend</h3>
                      <ul className="space-y-1 text-gray-600">
                        <li>React with TypeScript</li>
                        <li>TailwindCSS & ShadcnUI</li>
                        <li>Leaflet for mapping</li>
                        <li>React Query for data fetching</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">Backend</h3>
                      <ul className="space-y-1 text-gray-600">
                        <li>Node.js with Express</li>
                        <li>WebSockets for real-time updates</li>
                        <li>JWT authentication</li>
                        <li>RESTful API design</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">Database</h3>
                      <ul className="space-y-1 text-gray-600">
                        <li>Drizzle ORM</li>
                        <li>In-memory storage (Development)</li>
                        <li>PostgreSQL (Production)</li>
                        <li>Zod schema validation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </PageTransition>
  );
}