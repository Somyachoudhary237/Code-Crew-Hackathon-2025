import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";
import { Logo } from "@/components/logo";
import { motion, AnimatePresence } from "framer-motion";
import { makePath } from "@/lib/base-path";
import { 
  AlignJustify, 
  ChevronDown, 
  LogOut,
  Home,
  BookOpen,
  HelpCircle,
  Mail,
  Info,
  User as UserIcon,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const goToAbout = (section: string) => {
    // Navigate to the about page with section query parameter
    window.location.href = makePath(`/about?section=${section}`);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const linkVariants = {
    initial: { y: 0 },
    hover: { 
      y: -3,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`${scrolled ? 'bg-[#1e3a8a] shadow-lg' : 'blue-header'} sticky top-0 z-50 transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden mr-4 text-white"
            onClick={toggleMobileMenu}
          >
            <AlignJustify className="h-6 w-6" />
          </motion.button>
          <Link href="/" className="flex items-center gap-2">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center"
            >
              <Logo size={36} />
            </motion.div>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="script-font text-white font-semibold text-3xl tracking-wide"
            >
              Calm Corners
            </motion.span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <motion.div whileHover="hover" initial="initial" variants={linkVariants}>
            <Link href="/" className={`text-white hover:text-cream-background px-3 py-2 rounded-md ${location === "/" ? "text-cream-background font-medium border-b-2 border-cream-background" : ""} transition-all duration-300`}>
              <span className="body-font">Home</span>
            </Link>
          </motion.div>
          <motion.div whileHover="hover" initial="initial" variants={linkVariants}>
            <Link href="/spaces" className={`text-white hover:text-cream-background px-3 py-2 rounded-md ${location === "/spaces" ? "text-cream-background font-medium border-b-2 border-cream-background" : ""} transition-all duration-300`}>
              <span className="body-font">Study Spaces</span>
            </Link>
          </motion.div>
          <motion.div whileHover="hover" initial="initial" variants={linkVariants}>
            <Link href="/help" className={`text-white hover:text-cream-background px-3 py-2 rounded-md ${location === "/help" ? "text-cream-background font-medium border-b-2 border-cream-background" : ""} transition-all duration-300`}>
              <span className="body-font">Help Center</span>
            </Link>
          </motion.div>
          <motion.div whileHover="hover" initial="initial" variants={linkVariants}>
            <Link href="/contact" className={`text-white hover:text-cream-background px-3 py-2 rounded-md ${location === "/contact" ? "text-cream-background font-medium border-b-2 border-cream-background" : ""} transition-all duration-300`}>
              <span className="body-font">Contact Us</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} initial={{ scale: 1 }}>
            <Link href="/preferences" className={`bg-gradient-to-r from-[#d5c3a1] to-[#e6d9bf] text-black hover:from-[#c9b48e] hover:to-[#d8c7a5] px-4 py-2 rounded-full shadow-md ${location === "/preferences" ? "from-[#c9b48e] to-[#d8c7a5] font-medium" : ""} transition-all duration-300`}>
              <span className="body-font font-medium">Book Now</span>
            </Link>
          </motion.div>
          
          <motion.div whileHover="hover" initial="initial" variants={linkVariants}>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-white hover:text-cream-background px-3 py-2 rounded-md transition-all duration-300">
                <span className="body-font">About</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="cream-background">
                <DropdownMenuItem onClick={() => goToAbout('website')} className="body-font">
                  About Website
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => goToAbout('developers')} className="body-font">
                  About Developers
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
          
          {user && (
            <>
              <motion.div whileHover="hover" initial="initial" variants={linkVariants}>
                <Link href="/bookings" className={`text-white hover:text-cream-background px-3 py-2 rounded-md ${location === "/bookings" ? "text-cream-background font-medium border-b-2 border-cream-background" : ""} transition-all duration-300`}>
                  <span className="body-font">My Bookings</span>
                </Link>
              </motion.div>
              <motion.div whileHover="hover" initial="initial" variants={linkVariants}>
                <Link href="/favorites" className={`text-white hover:text-cream-background px-3 py-2 rounded-md ${location === "/favorites" ? "text-cream-background font-medium border-b-2 border-cream-background" : ""} transition-all duration-300`}>
                  <span className="body-font">Favorites</span>
                </Link>
              </motion.div>
            </>
          )}
        </div>
        
        <div className="flex items-center">
          {user ? (
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white hidden md:block body-font">Hello, {user.username}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="hidden md:flex menu-button bg-white bg-opacity-20 backdrop-blur-sm shadow-md border-white border-opacity-30"
                    >
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span className="body-font">Account</span>
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 cream-background shadow-lg rounded-lg overflow-hidden">
                  <DropdownMenuLabel className="body-font">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user && (
                    <>
                      <DropdownMenuItem onClick={() => window.location.href = makePath("/bookings")} className="body-font hover:bg-blue-50 transition-colors duration-200">
                        <Calendar className="mr-2 h-4 w-4 text-[#4361EE]" />
                        My Bookings
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.location.href = makePath("/favorites")} className="body-font hover:bg-blue-50 transition-colors duration-200">
                        <BookOpen className="mr-2 h-4 w-4 text-[#FF6B6B]" />
                        Favorites
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={() => window.location.href = makePath("/")} className="body-font hover:bg-blue-50 transition-colors duration-200">
                    <Home className="mr-2 h-4 w-4 text-[#4361EE]" />
                    Home
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = makePath("/spaces")} className="body-font hover:bg-blue-50 transition-colors duration-200">
                    <BookOpen className="mr-2 h-4 w-4 text-[#38B000]" />
                    Study Spaces
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = makePath("/help")} className="body-font hover:bg-blue-50 transition-colors duration-200">
                    <HelpCircle className="mr-2 h-4 w-4 text-[#8B4513]" />
                    Help Center
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = makePath("/contact")} className="body-font hover:bg-blue-50 transition-colors duration-200">
                    <Mail className="mr-2 h-4 w-4 text-[#4361EE]" />
                    Contact Us
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = makePath("/about")} className="body-font hover:bg-blue-50 transition-colors duration-200">
                    <Info className="mr-2 h-4 w-4 text-[#FF6B6B]" />
                    About
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="body-font text-red-500 hover:bg-red-50 transition-colors duration-200">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="md:hidden menu-button bg-white bg-opacity-20 backdrop-blur-sm"
                >
                  <span className="body-font">Sign Out</span>
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="menu-button bg-white bg-opacity-20 backdrop-blur-sm shadow-md border-white border-opacity-30"
                    >
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span className="body-font">Menu</span>
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 cream-background shadow-lg rounded-lg overflow-hidden">
                  <DropdownMenuItem onClick={() => window.location.href = makePath("/")} className="body-font hover:bg-blue-50 transition-colors duration-200">
                    <Home className="mr-2 h-4 w-4 text-[#4361EE]" />
                    Home
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = makePath("/spaces")} className="body-font hover:bg-blue-50 transition-colors duration-200">
                    <BookOpen className="mr-2 h-4 w-4 text-[#38B000]" />
                    Study Spaces
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = makePath("/help")} className="body-font hover:bg-blue-50 transition-colors duration-200">
                    <HelpCircle className="mr-2 h-4 w-4 text-[#8B4513]" />
                    Help Center
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = makePath("/contact")} className="body-font hover:bg-blue-50 transition-colors duration-200">
                    <Mail className="mr-2 h-4 w-4 text-[#4361EE]" />
                    Contact Us
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = makePath("/about")} className="body-font hover:bg-blue-50 transition-colors duration-200">
                    <Info className="mr-2 h-4 w-4 text-[#FF6B6B]" />
                    About
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => window.location.href = makePath("/auth")} className="body-font hover:bg-blue-50 text-[#4361EE] font-medium transition-colors duration-200">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Sign In
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          )}
        </div>
      </div>

      <MobileMenu isOpen={mobileMenuOpen} onClose={toggleMobileMenu} />
    </motion.header>
  );
}
