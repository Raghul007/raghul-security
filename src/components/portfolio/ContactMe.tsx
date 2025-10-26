import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Mail, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface ContactMeProps {
  onClose: () => void;
}

interface ContactForm {
  name: string;
  email: string;
  purpose: string;
  message: string;
}

const ContactMe = ({ onClose }: ContactMeProps) => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    purpose: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a simple form submission that opens email client
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'mailto:raghulrajesh2019@gmail.com';
      form.target = '_blank';
      
      // Add form fields
      const subjectField = document.createElement('input');
      subjectField.type = 'hidden';
      subjectField.name = 'subject';
      subjectField.value = `Portfolio Contact: ${formData.purpose}`;
      
      const bodyField = document.createElement('input');
      bodyField.type = 'hidden';
      bodyField.name = 'body';
      bodyField.value = `Name: ${formData.name}\nEmail: ${formData.email}\nPurpose: ${formData.purpose}\n\nMessage:\n${formData.message}`;
      
      form.appendChild(subjectField);
      form.appendChild(bodyField);
      document.body.appendChild(form);
      
      // Try to submit the form
      form.submit();
      
      // Clean up
      document.body.removeChild(form);
      
      toast.success('Email client opened! Please send the message.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        purpose: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error opening email client:', error);
      // Fallback to direct mailto
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.purpose}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Purpose: ${formData.purpose}\n\n` +
        `Message:\n${formData.message}`
      );
      
      const mailtoLink = `mailto:raghulrajesh2019@gmail.com?subject=${subject}&body=${body}`;
      window.open(mailtoLink, '_blank');
      
      toast.success('Email client opened! Please send the message.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        purpose: '',
        message: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.purpose.trim() && formData.message.trim();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-40 overflow-y-auto"
    >
      <div className="min-h-screen relative grid-background">
        <Button
          onClick={onClose}
          className="fixed top-8 right-8 z-50 bg-accent hover:bg-accent/80 text-white"
          size="icon"
        >
          <X className="w-6 h-6" />
        </Button>

        <div className="max-w-4xl mx-auto p-8 pt-24">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-12 card-glow"
          >
            <h2 className="text-3xl font-orbitron text-primary cyber-glow mb-8 text-center">
              CONTACT ME
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Your Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-background/50 border-primary/30 focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    className="bg-background/50 border-primary/30 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Purpose *
                </label>
                <Input
                  type="text"
                  value={formData.purpose}
                  onChange={(e) => handleInputChange('purpose', e.target.value)}
                  placeholder="e.g., Job Opportunity, Collaboration, Question"
                  className="bg-background/50 border-primary/30 focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message *
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell me about your project, question, or how I can help you..."
                  className="bg-background/50 border-primary/30 focus:border-primary min-h-[120px] resize-none"
                  required
                />
              </div>

              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="bg-primary hover:bg-primary/80 text-background font-orbitron min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      SEND MESSAGE
                    </div>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-primary/20">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Or reach out to me directly at{' '}
                <a 
                  href="mailto:raghulrajesh2019@gmail.com" 
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  raghulrajesh2019@gmail.com
                </a>
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => {
                    const email = 'raghulrajesh2019@gmail.com';
                    navigator.clipboard.writeText(email);
                    toast.success('Email copied to clipboard!');
                  }}
                  variant="outline"
                  size="sm"
                  className="border-primary/30 text-primary hover:bg-primary hover:text-background"
                >
                  Copy Email
                </Button>
                <Button
                  onClick={() => {
                    const subject = encodeURIComponent('Portfolio Contact');
                    const mailtoLink = `mailto:raghulrajesh2019@gmail.com?subject=${subject}`;
                    window.open(mailtoLink, '_blank');
                  }}
                  variant="outline"
                  size="sm"
                  className="border-accent/30 text-accent hover:bg-accent hover:text-white"
                >
                  Open Email Client
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactMe;
