// GitHub-based File System Service for Portfolio Files
// This service fetches files from your GitHub repository

interface FileInfo {
  name: string;
  url: string;
  type: string;
  downloadUrl: string;
}

interface GitHubFile {
  name: string;
  path: string;
  download_url: string;
  type: string;
}

class GitHubFileSystemService {
  private owner: string;
  private repo: string;
  private baseUrl: string;

  constructor() {
    // Using your GitHub username and portfolio data repository
    this.owner = 'raghul07102002';
    this.repo = 'portfolio-data';
    this.baseUrl = `https://api.github.com/repos/${this.owner}/${this.repo}`;
  }

  private async makeRequest(endpoint: string): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private getFileType(filename: string): string {
    const extension = filename.toLowerCase().split('.').pop();
    switch (extension) {
      case 'pdf':
        return 'application/pdf';
      case 'doc':
        return 'application/msword';
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      default:
        return 'application/octet-stream';
    }
  }

  async loadResume(): Promise<FileInfo | null> {
    try {
      const files: GitHubFile[] = await this.makeRequest('/contents/resume');
      const resumeFiles = files.filter(file => 
        file.name.toLowerCase().endsWith('.pdf') || 
        file.name.toLowerCase().endsWith('.doc') || 
        file.name.toLowerCase().endsWith('.docx')
      );

      if (resumeFiles.length > 0) {
        const resumeFile = resumeFiles[0]; // Get the first resume file
        return {
          name: resumeFile.name,
          url: `https://raw.githubusercontent.com/${this.owner}/${this.repo}/main/resume/${resumeFile.name}`,
          type: this.getFileType(resumeFile.name),
          downloadUrl: resumeFile.download_url
        };
      }
      
      // Fallback: return a placeholder if no files found
      return {
        name: 'Resume.pdf',
        url: '#',
        type: 'application/pdf',
        downloadUrl: '#'
      };
    } catch (error) {
      console.error('Error loading resume from GitHub:', error);
      // Fallback: return a placeholder if GitHub fails
      return {
        name: 'Resume.pdf',
        url: '#',
        type: 'application/pdf',
        downloadUrl: '#'
      };
    }
  }

  async loadCoverLetter(): Promise<FileInfo | null> {
    try {
      const files: GitHubFile[] = await this.makeRequest('/contents/cover-letter');
      const coverLetterFiles = files.filter(file => 
        file.name.toLowerCase().endsWith('.pdf') || 
        file.name.toLowerCase().endsWith('.doc') || 
        file.name.toLowerCase().endsWith('.docx')
      );

      if (coverLetterFiles.length > 0) {
        const coverLetterFile = coverLetterFiles[0]; // Get the first cover letter file
        return {
          name: coverLetterFile.name,
          url: `https://raw.githubusercontent.com/${this.owner}/${this.repo}/main/cover-letter/${coverLetterFile.name}`,
          type: this.getFileType(coverLetterFile.name),
          downloadUrl: coverLetterFile.download_url
        };
      }
      return null;
    } catch (error) {
      console.error('Error loading cover letter from GitHub:', error);
      return null;
    }
  }

  async loadAchievements(): Promise<FileInfo[]> {
    try {
      const files: GitHubFile[] = await this.makeRequest('/contents/achievements');
      const achievementFiles = files.filter(file => 
        file.name.toLowerCase().endsWith('.pdf') || 
        file.name.toLowerCase().endsWith('.jpg') || 
        file.name.toLowerCase().endsWith('.jpeg') || 
        file.name.toLowerCase().endsWith('.png') || 
        file.name.toLowerCase().endsWith('.gif')
      );

      return achievementFiles.map(file => ({
        name: file.name,
        url: `https://raw.githubusercontent.com/${this.owner}/${this.repo}/main/achievements/${file.name}`,
        type: this.getFileType(file.name),
        downloadUrl: file.download_url
      }));
    } catch (error) {
      console.error('Error loading achievements from GitHub:', error);
      return [];
    }
  }

  async loadProfile(): Promise<any> {
    try {
      const profileFile = await this.makeRequest('/contents/profile.json');
      const response = await fetch(profileFile.download_url);
      return await response.json();
    } catch (error) {
      console.error('Error loading profile from GitHub:', error);
      return null;
    }
  }

  // Helper method to get file display name (without extension)
  getDisplayName(filename: string): string {
    return filename.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
  }

  // Helper method to check if file is an image
  isImageFile(filename: string): boolean {
    const extension = filename.toLowerCase().split('.').pop();
    return ['jpg', 'jpeg', 'png', 'gif'].includes(extension || '');
  }

  // Helper method to check if file is a PDF
  isPdfFile(filename: string): boolean {
    return filename.toLowerCase().endsWith('.pdf');
  }

  // Method to get repository info
  async getRepositoryInfo(): Promise<any> {
    try {
      return await this.makeRequest('');
    } catch (error) {
      console.error('Error loading repository info:', error);
      return null;
    }
  }
}

// Create singleton instance
export const githubFileSystemService = new GitHubFileSystemService();

// Export for testing or multiple instances
export { GitHubFileSystemService };
