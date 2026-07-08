JP Event Production v31 — Email Submit Update

This version changes Submit Build Request so the customer’s email app opens immediately with a complete, polished build request already addressed to:

jpeventproduction@gmail.com

Important limitation:
A static GitHub Pages website cannot silently send email by itself without a backend or third-party email service. This version uses the safest no-backend workflow: it pre-fills the email and the customer presses Send.

For true automatic email delivery with no customer email app, connect the Google Apps Script backend or another form/email service later.

Upload the contents of this folder to the GitHub repo root.
