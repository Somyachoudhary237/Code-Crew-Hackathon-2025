import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Logo } from "@/components/logo";
import { makePath } from "@/lib/base-path";
import { 
  Home, 
  CalendarCheck, 
  Heart, 
  User, 
  UserPlus, 
  HelpCircle, 
  Mail, 
  Info, 
  X,
  LogOut,
  Globe,
  Users,
  BookOpen,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
    onClose();
  };

  return (
    <div 
      className={`fixed inset-0 bg-white z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out overflow-y-auto`}
    >
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo size={32} />
            <span className="script-font text-primary font-semibold text-xl tracking-wide">Calm Corners</span>
          </div>
          <button onClick={onClose} className="text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <div className="py-4">
        <h2 className="px-4 text-gray-500 font-medium mb-2">MAIN NAVIGATION</h2>
        
        <Link 
          href="/"
          onClick={onClose}
          className={`flex items-center px-4 py-3 ${location === "/" ? "bg-primary text-white" : "text-gray-800 hover:bg-gray-100"}`}
        >
          <Home className="mr-3 h-5 w-5" />
          <span>Home</span>
        </Link>
        
        <Link 
          href="/spaces"
          onClick={onClose}
          className={`flex items-center px-4 py-3 ${location === "/spaces" ? "bg-primary text-white" : "text-gray-800 hover:bg-gray-100"}`}
        >
          <BookOpen className="mr-3 h-5 w-5" />
          <span>Study Spaces</span>
        </Link>

        <Link 
          href="/help"
          onClick={onClose}
          className={`flex items-center px-4 py-3 ${location === "/help" ? "bg-primary text-white" : "text-gray-800 hover:bg-gray-100"}`}
        >
          <HelpCircle className="mr-3 h-5 w-5" />
          <span>Help Center</span>
        </Link>
        
        <Link 
          href="/contact"
          onClick={onClose}
          className={`flex items-center px-4 py-3 ${location === "/contact" ? "bg-primary text-white" : "text-gray-800 hover:bg-gray-100"}`}
        >
          <Mail className="mr-3 h-5 w-5" />
          <span>Contact Us</span>
        </Link>
        
        <Link 
          href="/preferences"
          onClick={onClose}
          className={`flex items-center px-4 py-3 bg-[#d5c3a1] text-black font-medium ${location === "/preferences" ? "bg-[#c9b48e]" : ""}`}
        >
          <Calendar className="mr-3 h-5 w-5" />
          <span>Book Now</span>
        </Link>
        
        <Accordion type="single" collapsible className="border-b border-t py-2">
          <AccordionItem value="about" className="border-none">
            <AccordionTrigger className="py-2 px-4 hover:bg-gray-100 hover:no-underline">
              <div className="flex items-center">
                <Info className="mr-3 h-5 w-5" />
                <span>About</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
                  <div 
                className="flex items-center px-4 py-3 pl-12 text-gray-800 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  window.location.href = makePath("/about?section=website");
                  onClose();
                }}
              >
                <Globe className="mr-3 h-5 w-5" />
                <span>About Website</span>
              </div>
              <div 
                className="flex items-center px-4 py-3 pl-12 text-gray-800 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  window.location.href = makePath("/about?section=developers");
                  onClose();
                }}
              >
                <Users className="mr-3 h-5 w-5" />
                <span>About Developers</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {user && (
          <>
            <h2 className="px-4 text-gray-500 font-medium mt-6 mb-2">MY ACCOUNT</h2>
            
            <Link href="/bookings" 
              onClick={onClose}
              className={`flex items-center px-4 py-3 ${location === "/bookings" ? "bg-primary text-white" : "text-gray-800 hover:bg-gray-100"}`}
            >
              <CalendarCheck className="mr-3 h-5 w-5" />
              <span>My Bookings</span>
            </Link>
            
            <Link href="/favorites" 
              onClick={onClose}
              className={`flex items-center px-4 py-3 ${location === "/favorites" ? "bg-primary text-white" : "text-gray-800 hover:bg-gray-100"}`}
            >
              <Heart className="mr-3 h-5 w-5" />
              <span>Favorites</span>
            </Link>
            
            <div className="px-4 py-4">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full flex items-center justify-center menu-button"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </>
        )}
        
        {!user && (
          <>
            <h2 className="px-4 text-gray-500 font-medium mt-6 mb-2">ACCOUNT</h2>
            
            <Link href="/auth" 
              onClick={onClose}
              className={`flex items-center px-4 py-3 ${location === "/auth" ? "bg-primary text-white" : "text-gray-800 hover:bg-gray-100"}`}
            >
              <User className="mr-3 h-5 w-5" />
              <span>Sign In</span>
            </Link>
            
            <Link href="/auth?register=true" 
              onClick={onClose}
              className={`flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100`}
            >
              <UserPlus className="mr-3 h-5 w-5" />
              <span>Register</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
