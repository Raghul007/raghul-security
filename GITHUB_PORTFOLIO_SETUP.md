# GitHub-Based Portfolio System Setup Guide

## Overview
Your portfolio now uses GitHub as the file storage system. All your resume, cover letter, achievements, and profile data are stored in a GitHub repository and fetched dynamically. This ensures your portfolio is always up-to-date and accessible from anywhere.

## Repository Structure
Create a GitHub repository named `portfolio-data` with the following structure:

```
portfolio-data/
├── resume/
│   ├── Raghul_R_Resume_2024.pdf
│   └── (other resume files)
├── cover-letter/
│   ├── Raghul_R_CoverLetter_2024.pdf
│   └── (other cover letter files)
├── achievements/
│   ├── AWS_Certified_Security_Specialist.pdf
│   ├── CompTIA_Security_Plus_Certificate.jpg
│   ├── Microsoft_Azure_Security_Certificate.png
│   └── (other achievement files)
└── profile.json
```

## Setup Instructions

### 1. Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `portfolio-data`
3. Make it **public** (so the API can access it without authentication)
4. Initialize with a README

### 2. Create Folder Structure
Create the following folders in your repository:
- `resume/` - For your resume files
- `cover-letter/` - For your cover letter files
- `achievements/` - For your achievement and certificate files

### 3. Add Your Files

#### Resume Files
- **Location**: `portfolio-data/resume/`
- **Supported formats**: PDF, DOC, DOCX
- **Naming**: Use descriptive names like `Raghul_R_Resume_2024.pdf`
- **Display**: The first file found will be displayed

#### Cover Letter Files
- **Location**: `portfolio-data/cover-letter/`
- **Supported formats**: PDF, DOC, DOCX
- **Naming**: Use descriptive names like `Raghul_R_CoverLetter_2024.pdf`
- **Display**: The first file found will be displayed

#### Achievements & Certificates
- **Location**: `portfolio-data/achievements/`
- **Supported formats**: PDF, JPG, JPEG, PNG, GIF
- **Naming**: Use descriptive names like:
  - `AWS_Certified_Security_Specialist.pdf`
  - `CompTIA_Security_Plus_Certificate.jpg`
  - `Microsoft_Azure_Security_Certificate.png`
- **Display**: All files will be displayed in a grid

### 4. Create Profile Data (Optional)
Create a `profile.json` file in the root of your repository:

```json
{
  "name": "Raghul R",
  "role": "Security Engineer",
  "bio": "Passionate Security Engineer specializing in Identity and Access Management, Security Operations Centre, and Vulnerability Management.",
  "email": "raghulrajesh2019@gmail.com",
  "linkedin": "https://www.linkedin.com/in/raghul",
  "github": "https://github.com/raghul07102002",
  "photoUrl": "/src/assets/raghul-profile.jpg"
}
```

## How It Works

### File Fetching
- The portfolio automatically fetches files from your GitHub repository
- Files are loaded dynamically when users visit each section
- No local storage needed - everything is fetched from GitHub

### Contact Me Feature
- Users can fill out a contact form with their name, email, purpose, and message
- Messages are sent directly to your email: `raghulrajesh2019@gmail.com`
- Form includes validation and loading states

### Real-time Updates
- When you update files in your GitHub repository, the portfolio automatically reflects the changes
- No need to redeploy or restart the application
- Changes are visible immediately

## Benefits

### ✅ Always Up-to-Date
- Files are fetched from GitHub in real-time
- No need to redeploy when updating content
- Changes are visible immediately

### ✅ Version Control
- All files are tracked in Git
- Easy to see changes over time
- Rollback capability if needed

### ✅ Accessibility
- Files accessible from anywhere
- No dependency on local file system
- Works across different devices and browsers

### ✅ Contact Integration
- Direct email integration
- Professional contact form
- Messages delivered to your inbox

## File Management

### Adding New Files
1. Upload files to the appropriate folder in your GitHub repository
2. Use descriptive filenames
3. Files will appear in your portfolio automatically

### Updating Existing Files
1. Replace the old file with a new one in GitHub
2. Keep the same filename or update as needed
3. Changes are reflected immediately

### Removing Files
1. Delete files from the GitHub repository
2. Files will be removed from the portfolio display
3. No manual cleanup needed

## Contact Me Setup

### Email Delivery
The contact form sends emails directly to `raghulrajesh2019@gmail.com`. The system includes:

- **Form Fields**: Name, Email, Purpose, Message
- **Validation**: All fields are required
- **Loading States**: Shows progress while sending
- **Error Handling**: Graceful fallback if sending fails
- **Success Feedback**: Confirmation when message is sent

### Email Service Integration
For production use, integrate with:
- **EmailJS**: Easy integration with Gmail
- **SendGrid**: Professional email service
- **Nodemailer**: Node.js email library
- **AWS SES**: Amazon's email service

## Troubleshooting

### Files Not Loading
1. Check repository is public
2. Verify folder structure is correct
3. Ensure filenames don't have special characters
4. Check GitHub API rate limits

### Contact Form Issues
1. Verify email service configuration
2. Check form validation
3. Test with different email addresses
4. Check spam folder for messages

### Performance Issues
1. Optimize file sizes (keep under 5MB)
2. Use appropriate file formats
3. Consider CDN for large files

## Next Steps

1. **Create Repository**: Set up `portfolio-data` repository on GitHub
2. **Add Files**: Upload your resume, cover letter, and achievements
3. **Test Portfolio**: Verify all files load correctly
4. **Set Up Email**: Configure email service for contact form
5. **Update Content**: Regularly update your files as needed

## Security Considerations

- Repository is public (required for API access)
- No sensitive information should be stored
- Use professional content only
- Consider using a separate private repository for sensitive data

Your portfolio is now fully GitHub-integrated and will automatically stay up-to-date with your latest files!
