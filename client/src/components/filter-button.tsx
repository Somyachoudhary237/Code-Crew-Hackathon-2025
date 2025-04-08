import { 
  Book, 
  Coffee, 
  School, 
  Building,
  LucideIcon
} from "lucide-react";

type FilterButtonProps = {
  icon: string;
  label: string;
  onClick: () => void;
};

export function FilterButton({ icon, label, onClick }: FilterButtonProps) {
  const getIcon = () => {
    switch (icon) {
      case 'book':
        return <Book className="h-5 w-5 mr-2 text-primary" />;
      case 'coffee':
        return <Coffee className="h-5 w-5 mr-2 text-primary" />;
      case 'school':
        return <School className="h-5 w-5 mr-2 text-primary" />;
      case 'building':
        return <Building className="h-5 w-5 mr-2 text-primary" />;
      default:
        return <Book className="h-5 w-5 mr-2 text-primary" />;
    }
  };
  
  return (
    <button 
      className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50"
      onClick={onClick}
    >
      {getIcon()}
      <span>{label}</span>
    </button>
  );
}
