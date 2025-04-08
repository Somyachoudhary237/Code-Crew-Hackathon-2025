import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { QrCode } from "lucide-react";

interface SpaceQRCodeProps {
  space: {
    id: number;
    name: string;
  };
}

export function SpaceQRCode({ space }: SpaceQRCodeProps) {
  const [open, setOpen] = useState(false);
  
  // Create a URL that would typically point to your space details page
  const spaceUrl = `${window.location.origin}/spaces/${space.id}`;
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-blue-600 hover:text-blue-700 hover:bg-transparent"
        >
          <QrCode className="h-4 w-4 mr-1" /> QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md cream-background">
        <DialogHeader>
          <DialogTitle className="text-center script-font text-xl">
            {space.name}
          </DialogTitle>
          <DialogDescription className="text-center">
            Scan this QR code to quickly access this study space
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 p-4">
          <div className="bg-white p-4 rounded-md">
            <QRCodeSVG 
              value={spaceUrl}
              size={200}
              level="H"
              includeMargin={true}
              fgColor="#000"
              bgColor="#FFF"
            />
          </div>
          <p className="text-sm text-center text-gray-500">
            This QR code can be scanned to view details and availability for this study space
          </p>
        </div>
        <div className="flex justify-center">
          <DialogClose asChild>
            <Button className="bg-[#d5c3a1] hover:bg-[#c9b48e] text-black">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}