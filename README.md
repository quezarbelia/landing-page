# landing-page

## Deployment

### GitHub Pages (Free - Recommended)
1. Go to https://github.com/quezarbelia/landing- page/settings/ pages
2. Source: Deploy from a branch > Branch: main, / (root)
3. Save
4. **Live URL**: https://quezarbelia. github. io/landing- page

### For Vercel Deploy
Run manually:
```bash
npx vercel -- prod -- token $VERCEL_TOKEN
```
Or provide Vercel token as environment variable.

## Features
- localStorage persistence for contact form data
- Automatic ticket generation (TK-XXXXXXXX-XXXX)
- WhatsApp contact button
- Mobile-first responsive design
- Fade-in animations