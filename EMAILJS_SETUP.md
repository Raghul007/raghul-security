# EmailJS Setup for Contact Form

## Overview
The Contact Me form uses EmailJS to send emails directly to your inbox. This is a simple and reliable way to handle contact form submissions.

## Setup Instructions

### 1. Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (or your preferred email provider)
4. Follow the setup instructions
5. Note down your Service ID

### 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```
Subject: New Contact Form Submission - {{from_name}}

From: {{from_name}} ({{from_email}})
Purpose: {{purpose}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Note down your Template ID

### 4. Get Public Key
1. Go to "Account" → "General"
2. Copy your Public Key

### 5. Update Contact Form
Update the ContactMe component with your EmailJS credentials:

```typescript
// In src/components/portfolio/ContactMe.tsx
const serviceId = 'your_service_id_here';
const templateId = 'your_template_id_here';
const publicKey = 'your_public_key_here';
```

### 6. Install EmailJS SDK
```bash
npm install @emailjs/browser
```

### 7. Update Contact Form Code
Replace the contact form submission logic with EmailJS:

```typescript
import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      purpose: formData.purpose,
      message: formData.message,
      to_email: 'raghulrajesh2019@gmail.com'
    };

    await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    toast.success('Message sent successfully! I\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      purpose: '',
      message: ''
    });
  } catch (error) {
    console.error('Error sending message:', error);
    toast.error('Failed to send message. Please try again or contact me directly at raghulrajesh2019@gmail.com');
  } finally {
    setIsSubmitting(false);
  }
};
```

## Alternative: Simple API Endpoint

If you prefer not to use EmailJS, you can use the included API endpoint:

1. The contact form already includes a fallback API endpoint
2. Update the API endpoint to use your preferred email service
3. Deploy the API endpoint to your hosting platform

## Testing

1. Fill out the contact form
2. Submit the message
3. Check your email inbox
4. Verify the message was received correctly

## Benefits

- ✅ **Direct Integration**: Messages go straight to your email
- ✅ **No Server Required**: EmailJS handles the email sending
- ✅ **Reliable**: Professional email delivery service
- ✅ **Free Tier**: 200 emails per month on free plan
- ✅ **Easy Setup**: Simple configuration process

## Troubleshooting

### Messages Not Received
1. Check spam folder
2. Verify EmailJS configuration
3. Test with different email addresses
4. Check EmailJS dashboard for errors

### Form Not Submitting
1. Verify all required fields are filled
2. Check browser console for errors
3. Ensure EmailJS credentials are correct
4. Test with different browsers

Your contact form is now ready to receive messages directly to your inbox!
