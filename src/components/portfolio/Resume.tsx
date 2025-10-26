import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { githubFileSystemService } from '@/services/githubFileSystemService';
import { toast } from 'sonner';

interface ResumeProps {
  onClose: () => void;
}

const Resume = ({ onClose }: ResumeProps) => {
  const [resumeData, setResumeData] = useState<{ name: string; url: string; type: string; downloadUrl: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResumeData = async () => {
      try {
        const resume = await githubFileSystemService.loadResume();
        setResumeData(resume);
      } catch (error) {
        console.error('Error loading resume:', error);
        toast.error('Failed to load resume from GitHub');
      } finally {
        setLoading(false);
      }
    };

    loadResumeData();
  }, []);

  const handleDownload = () => {
    if (resumeData) {
      // Create a temporary link element for download
      const link = document.createElement('a');
      link.href = resumeData.downloadUrl;
      link.download = resumeData.name;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Resume downloaded!');
    } else {
      toast.error('No resume available to download');
    }
  };

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
            className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-12 card-glow text-center"
          >
            <h2 className="text-3xl font-orbitron text-primary cyber-glow mb-8">
              RESUME
            </h2>

            <div className="space-y-6">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : resumeData ? (
                <div className="mb-8">
                  {resumeData.type === 'application/pdf' ? (
                    <iframe
                      src={resumeData.url}
                      className="w-full h-[600px] rounded-lg border border-primary/30"
                      title="Resume Preview"
                    />
                  ) : (
                    <div className="p-8 bg-primary/10 rounded-lg border border-primary/30">
                      <p className="text-foreground/80 text-center">
                        File: {githubFileSystemService.getDisplayName(resumeData.name)}
                      </p>
                      <p className="text-sm text-muted-foreground text-center mt-2">
                        Preview not available for this file type. Use download button.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 bg-muted/20 rounded-lg border border-primary/30">
                  <p className="text-foreground/80 text-lg mb-4">
                    No resume file found in the portfolio folder.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Please add your resume file to the <code className="bg-muted px-2 py-1 rounded">portfolio-data/resume/</code> folder in your GitHub repository.
                  </p>
                </div>
              )}

              <div className="flex justify-center items-center pt-8">
                <Button
                  onClick={handleDownload}
                  disabled={!resumeData}
                  className="bg-primary hover:bg-primary/80 text-background font-orbitron min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-5 h-5 mr-2" />
                  DOWNLOAD RESUME
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-8 text-center">
                To update your resume, replace the file in the <code className="bg-muted px-2 py-1 rounded">portfolio-data/resume/</code> folder in your GitHub repository.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

    </motion.div>
  );
};

export default Resume;
