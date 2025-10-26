import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { githubFileSystemService } from '@/services/githubFileSystemService';
import { toast } from 'sonner';

interface AchievementsProps {
  onClose: () => void;
}

interface Achievement {
  name: string;
  url: string;
  type: string;
  downloadUrl: string;
}

const Achievements = ({ onClose }: AchievementsProps) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAchievementsData = async () => {
      try {
        const achievementsData = await githubFileSystemService.loadAchievements();
        setAchievements(achievementsData);
      } catch (error) {
        console.error('Error loading achievements:', error);
        toast.error('Failed to load achievements from GitHub');
      } finally {
        setLoading(false);
      }
    };

    loadAchievementsData();
  }, []);

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

        <div className="max-w-7xl mx-auto p-8 pt-24">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-orbitron text-center text-primary cyber-glow mb-12"
          >
            ACHIEVEMENTS
          </motion.h1>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : achievements.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="p-8 bg-muted/20 rounded-lg border border-primary/30 max-w-2xl mx-auto">
                <p className="text-muted-foreground text-lg mb-4">
                  No achievement files found in the portfolio folder.
                </p>
                <p className="text-sm text-muted-foreground">
                  Please add your achievement and certificate files to the <code className="bg-muted px-2 py-1 rounded">portfolio-data/achievements/</code> folder in your GitHub repository.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.name}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-4 card-glow hover:border-primary transition-all"
                >
                  <div className="aspect-[4/3] bg-muted rounded-lg mb-3 overflow-hidden">
                    {githubFileSystemService.isPdfFile(achievement.name) ? (
                      <div className="w-full h-full flex items-center justify-center text-primary">
                        <span className="text-4xl">📄</span>
                      </div>
                    ) : (
                      <img
                        src={achievement.url}
                        alt={githubFileSystemService.getDisplayName(achievement.name)}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <p className="text-sm font-medium text-foreground truncate mb-2">
                    {githubFileSystemService.getDisplayName(achievement.name)}
                  </p>

                  <div className="flex gap-2">
                    <a
                      href={achievement.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 px-3 bg-primary/10 text-primary hover:bg-primary hover:text-background rounded transition-colors text-sm"
                    >
                      View
                    </a>
                    <a
                      href={achievement.downloadUrl}
                      download={achievement.name}
                      className="flex-1 text-center py-2 px-3 bg-accent/10 text-accent hover:bg-accent hover:text-white rounded transition-colors text-sm"
                    >
                      Download
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              To update your achievements, add or remove files in the <code className="bg-muted px-2 py-1 rounded">portfolio-data/achievements/</code> folder in your GitHub repository.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Achievements;
