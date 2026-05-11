# Ad Virgin Island Resort Website

A professional, fully functional resort website with individual pages and working forms.

## Form Setup (Important)

All forms send to **info@advirginislandresort.com** via FormSubmit.co.

**First-time activation:** When someone submits a form for the first time, FormSubmit sends a confirmation email to info@advirginislandresort.com. The resort must click the activation link in that email. After activation, all form submissions (contact messages, booking requests) will be delivered to that inbox.

## Deployment

For forms to work correctly, the site must be hosted on a web server (not opened as file://). Deploy to any static host (Netlify, Vercel, GitHub Pages, or your own server).

If using a custom domain, update the `_next` redirect URLs in the form scripts to match your domain so users are redirected to your thank-you page after submitting.

## Pages

- **index.html** - Home
- **book-room.html** - Accommodations
- **eat-drink.html** - Food & Drinks, Menus, Online Orders
- **events.html** - Events
- **book.html** - Booking form (sends to resort email)
- **about.html** - About + message form (sends to resort email)
- **contact.html** - Contact + message form (sends to resort email). Handles: general inquiries, food orders (?order=food), event planning (?inquiry=event)
- **thank-you.html** - Post-submission confirmation

## Local Testing

Run a local server to test forms (required for form submission):

```
# Python
python -m http.server 8000

# Node (npx)
npx serve
```

Then open http://localhost:8000
