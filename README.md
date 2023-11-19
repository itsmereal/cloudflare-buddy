# Cloudflare Buddy Chrome Extension

Quickly create new DNS records for your domains that are added on Cloudflare. Simply add your API Token with correct permissions and you are good to go. You can add 'A' and 'CNAME' records.

## How to get Cloudflare API Token:
1. Login to your Cloudflare account
2. Visit https://dash.cloudflare.com/profile/api-tokens
3. Click "Create Token" button
4. Scroll down to "Create Custom Token" and click "Get Started" button
5. Give your API Token a name so you can identify it later
6. From "Permissions" select "Zone" -> "DNS" -> "Read" and add one more as "Zone" -> "DNS" -> "Write"
7. From "Account Resources" keep "Include" -> "All Accounts" or specify account that you want to manage.
8. You may keep other settings as is or change them according to your needs.
9. Proceed to next steps and copy the API Token.

## How to use 

The extension is currently under review on the Google Chrome Webstore. Meanwhile you can follow the following steps to manually add the extension to your Google Chrome browser.

1. Download the latest release zip file and extract the contents
2. Open Google Chrome and navigate to the Mange Extensions page or enter "chrome://extensions/" on the address bar
3. Enable developer mode from the top right
4. Drag and drop the Cloudflare Buddy folder on the Manage Extensions page to add the extension.

Note: Your API Token is saved on your browsers local storage and not uploaded anywhere else.
