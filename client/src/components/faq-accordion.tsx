import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  category: string;
  description?: string;
}

export function FAQAccordion({ items, category, description }: FAQAccordionProps) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">{category}</h2>
      {description && <p className="text-gray-500 mb-4">{description}</p>}
      
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
