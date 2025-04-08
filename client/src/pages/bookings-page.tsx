import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useStudySpaces } from "@/hooks/use-study-spaces";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/ui/page-transition";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar, Clock, MapPin, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "wouter";

export default function BookingsPage() {
  const { bookings, isLoadingBookings, cancelBookingMutation } = useStudySpaces();
  const { user } = useAuth();
  const [bookingToCancel, setBookingToCancel] = useState<number | null>(null);
  const [, navigate] = useLocation();

  // Set the document title
  useEffect(() => {
    document.title = "My Bookings - Calm Corners";
  }, []);

  if (!user) {
    return null; // Protected route should handle this
  }

  const handleCancelBooking = () => {
    if (bookingToCancel) {
      cancelBookingMutation.mutate(bookingToCancel);
      setBookingToCancel(null);
    }
  };

  // Filter bookings by status
  const upcomingBookings = bookings?.filter((booking: any) => 
    new Date(booking.startTime) > new Date() && booking.status === "confirmed"
  ) || [];
  
  const pastBookings = bookings?.filter((booking: any) => 
    new Date(booking.startTime) < new Date() || booking.status === "cancelled"
  ) || [];

  // Loading state
  if (isLoadingBookings) {
    return (
      <PageTransition className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Bookings</h1>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-8 w-48" />
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <Button onClick={() => navigate("/spaces")}>Find New Space</Button>
        </div>
        
        {bookings && bookings.length > 0 ? (
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past & Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {upcomingBookings.length > 0 ? (
                <div className="space-y-6">
                  {upcomingBookings.map((booking: any) => (
                    <Card key={booking.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle>{booking.space?.name || "Study Space"}</CardTitle>
                          <Badge variant="success">Confirmed</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-primary mr-2" />
                            <span>
                              {format(new Date(booking.startTime), "MMMM d, yyyy")}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-primary mr-2" />
                            <span>
                              {format(new Date(booking.startTime), "h:mm a")} - {format(new Date(booking.endTime), "h:mm a")}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-primary mr-2" />
                            <span>{booking.space?.address || "Address unavailable"}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-gray-500">
                              Booked on {format(new Date(booking.createdAt), "MMMM d, yyyy")}
                            </span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/spaces?id=${booking.spaceId}`)}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Space
                            </Button>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => setBookingToCancel(booking.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Cancel
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to cancel this booking? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setBookingToCancel(null)}>
                                    No, keep it
                                  </AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={handleCancelBooking}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    {cancelBookingMutation.isPending ? (
                                      <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Cancelling...
                                      </>
                                    ) : (
                                      "Yes, cancel booking"
                                    )}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No upcoming bookings</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    You don't have any upcoming bookings. Browse available study spaces and book one now!
                  </p>
                  <Button onClick={() => navigate("/spaces")}>Find Spaces</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {pastBookings.length > 0 ? (
                <div className="bg-white rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Space</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pastBookings.map((booking: any) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">
                            {booking.space?.name || "Study Space"}
                          </TableCell>
                          <TableCell>
                            {format(new Date(booking.startTime), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell>
                            {format(new Date(booking.startTime), "h:mm a")} - {format(new Date(booking.endTime), "h:mm a")}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={booking.status === "cancelled" ? "destructive" : "secondary"}
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/spaces?id=${booking.spaceId}`)}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No past bookings</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    You don't have any past bookings yet. Your booking history will appear here.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border">
            <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Bookings Yet</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              You haven't made any bookings yet. Explore our available study spaces and reserve your perfect spot!
            </p>
            <Button size="lg" onClick={() => navigate("/spaces")}>Browse Study Spaces</Button>
          </div>
        )}
      </div>
      
      <Footer />
    </PageTransition>
  );
}
