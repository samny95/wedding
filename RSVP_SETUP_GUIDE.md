# RSVP Setup Guide - Google Sheets Integration

This guide will help you set up a Google Sheets backend to receive RSVP submissions from your wedding website.

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Wedding RSVP Responses"
4. In the first row, add these column headers:
   - A1: `Timestamp`
   - B1: `Side` (신랑/신부)
   - C1: `Name` (성명)
   <!-- - D1: `Phone4` (전화번호 뒷자리) -->
   - D1: `Attendance` (참석여부)
   - E1: `Guests` (참석인원)

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions** > **Apps Script**
2. Delete any existing code
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Check for existing entry with same name and side
    var dataRange = sheet.getDataRange();
    var values = dataRange.getValues();
    var existingRowIndex = -1;
    
    // Start from row 2 (skip header row)
    for (var i = 1; i < values.length; i++) {
      // Check if side (column B) and name (column C) match
      if (values[i][1] === data.side && 
          values[i][2] === data.name) {
        existingRowIndex = i + 1; // Sheet rows are 1-indexed
        break;
      }
    }
    
    if (existingRowIndex > -1) {
      // Update existing row
      sheet.getRange(existingRowIndex, 1, 1, 5).setValues([[
        data.timestamp,
        data.side,
        data.name,
        data.attendance,
        data.guests
      ]]);
    } else {
      // Add new row
      sheet.appendRow([
        data.timestamp,
        data.side,
        data.name,
        data.attendance,
        data.guests
      ]);
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'RSVP webhook is working' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **Save** (💾 icon)
5. Name your project "Wedding RSVP Webhook"

## Step 3: Deploy the Web App

1. Click **Deploy** > **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in the deployment settings:
   - **Description**: "RSVP Webhook v1"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Grant permissions** when prompted:
   - Click **Authorize access**
   - Select your Google account
   - Click **Advanced** if you see a warning
   - Click **Go to [project name] (unsafe)**
   - Click **Allow**
7. **Copy the Web App URL** - it should look like:
   ```
   https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXXXXXX/exec
   ```

## Step 4: Update Your Website Code

1. Open `src/components/rsvp.jsx`
2. Find this line (around line 180):
   ```javascript
   const WEBHOOK_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```
3. Replace it with your Web App URL:
   ```javascript
   const WEBHOOK_URL = "https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXXXXXX/exec";
   ```
4. Save the file

## Step 5: Test the Integration

1. Build and deploy your website:
   ```bash
   npm run clean && npm run deploy
   ```
2. Visit your website
3. Click "참석 의사 전달" button
4. Fill out the form and submit
5. Check your Google Sheet - you should see a new row with the submission!

## Troubleshooting

### Submissions not appearing in the sheet?
- Make sure you copied the correct Web App URL
- Verify the Apps Script deployment is set to "Anyone" can access
- Check the browser console for any errors

### Permission errors?
- Re-deploy the Apps Script with fresh permissions
- Make sure "Execute as" is set to your account

### Want to update the script?
1. Make changes to the Apps Script code
2. Click **Deploy** > **Manage deployments**
3. Click ✏️ Edit next to your deployment
4. Change the version to "New version"
5. Click **Deploy**
6. The URL stays the same, so no need to update your website code!

## Optional Enhancements

### Add email notifications:
Add this to your `doPost` function before the return statement:

```javascript
// Send email notification
MailApp.sendEmail({
  to: "your-email@example.com",
  subject: "New RSVP: " + data.name,
  body: "Side: " + data.side + "\n" +
        "Name: " + data.name + "\n" +
        "Guests: " + data.guests + "\n" +
        "Attendance: " + data.attendance
});
```

### Data validation in Apps Script:
Add validation before appending the row:

```javascript
// Validate data
if (!data.side || !data.name || !data.attendance) {
  throw new Error("Missing required fields");
}

// Validate guests count based on attendance
if (data.attendance === "참석" && (isNaN(data.guests) || parseInt(data.guests) < 1)) {
  throw new Error("Invalid guest count for attending");
}
```

## Viewing Your Responses

Your Google Sheet will automatically update in real-time whenever someone submits an RSVP. You can:
- Share the sheet with your partner
- Create charts to visualize guest counts
- Export to CSV/Excel if needed
- Sort and filter responses by side, attendance, etc.

Enjoy your wedding! 💒❤️
