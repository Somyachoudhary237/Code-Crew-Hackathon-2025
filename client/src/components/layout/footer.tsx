import { Link } from "wouter";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-white transition">About Calm Corners</a>
                </Link>
              </li>
              <li>
                <a 
                  href="https://codecrew2025.com" 
                  className="text-gray-300 hover:text-white transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About Developer
                </a>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-white transition">Partnerships</a>
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition"
                >
                  Careers
                </a>
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-400">
              Calm Corners was developed to help students and professionals find comfortable, quiet spaces to work and study. Our mission is to connect people with the perfect environment for productivity and focus.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help">
                  <a className="text-gray-300 hover:text-white transition">Help Center</a>
                </Link>
              </li>
              <li>
                <Link href="/help">
                  <a className="text-gray-300 hover:text-white transition">Frequently Asked Questions</a>
                </Link>
              </li>
              <li>
                <Link href="/help">
                  <a className="text-gray-300 hover:text-white transition">Booking Guide</a>
                </Link>
              </li>
              <li>
                <Link href="/help">
                  <a className="text-gray-300 hover:text-white transition">Finding Spaces</a>
                </Link>
              </li>
              <li>
                <Link href="/help">
                  <a className="text-gray-300 hover:text-white transition">Account Management</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="mt-1 mr-3 text-primary h-5 w-5" />
                <span>codecrew2025@gmail.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="mt-1 mr-3 text-primary h-5 w-5" />
                <span>+91 93010 71262</span>
              </li>
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3 text-primary h-5 w-5" />
                <span>Indore, M.P, India</span>
              </li>
            </ul>
            <Link href="/contact">
              <Button className="mt-4">Contact Us</Button>
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">© 2025 Calm Corners. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
