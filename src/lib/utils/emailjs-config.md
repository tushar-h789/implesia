# EmailJS Configuration

## Current Configuration
- **Service ID**: `service_84p2e8c`
- **Template ID**: `template_f1mez8q`
- **Public Key**: `_0R3oIgW1dmKY_H1M`

## Template Variables Used

The ContactUs component sends these variables to your EmailJS template:

- `from_name` - User's name
- `from_email` - User's email address
- `phone` - User's phone number
- `company_name` - User's company name (or "Not provided")
- `due_date` - Project due date (formatted) or "Not specified"
- `message` - User's message

## Important Notes

1. **Template Variable Names**: Make sure your EmailJS template uses these exact variable names:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{phone}}`
   - `{{company_name}}`
   - `{{due_date}}`
   - `{{message}}`

2. **If Your Template Uses Different Names**: 
   - Update the `templateParams` object in `ContactUs.svelte` to match your template variables
   - Or update your EmailJS template to use the variable names listed above

3. **Testing**: 
   - Test the form submission to ensure emails are being sent correctly
   - Check your EmailJS dashboard for delivery status

