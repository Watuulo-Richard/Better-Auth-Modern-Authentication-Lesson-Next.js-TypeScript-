import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need prior coding experience?",
    answer:
      "No, but you need a strong passion and willingness to learn. Our curriculum is designed to take you from absolute beginner to professional, but it requires dedication.",
  },
  {
    question: "How much time do I need to commit?",
    answer:
      "The Online Team program is intensive. We recommend at least 20-30 hours per week. Consistency is key to surviving the 30-Day Marathon.",
  },
  {
    question: "Is the program free?",
    answer:
      "We offer a free 30-Day Marathon to prove your worth. Successful candidates who graduate from the marathon may be invited to join the core team or advanced paid tracks with income share agreements available.",
  },
  {
    question: "What happens after I join?",
    answer:
      "You'll immediately start the onboarding process, get access to our learning portal, and be assigned your first set of challenges. You'll also join our Discord community of fellow learners.",
  },
  {
    question: "Can I work while doing this?",
    answer:
      "Yes, the program is self-paced but deadline-driven. Many of our students work or study full-time, but you must manage your time effectively to meet the weekly targets.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 bg-black/95 text-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400">Everything you need to know about joining the team.</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/10">
              <AccordionTrigger className="text-lg hover:text-blue-400 transition-colors text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
