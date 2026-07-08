# KURMI AI — Setup Guide

## Ismein kya complete hai
- Google Sign-In + Firestore cloud sync ka real code (Firebase, aapki apni free Firebase project chahiye)
- ChatGPT-style word-by-word streaming reply
- Multi-modal input — image + file + voice ek saath
- Memory system (localStorage + Firestore sync jab login ho)
- Multi-provider fallback chain (Groq, OpenAI, Gemini, Anthropic, DeepSeek) + Wikipedia fallback
- Real `manifest.json` + `service-worker.js` — proper installable PWA (jab hosted ho)

## Zaroori sach (please read)
Yeh sab files sirf ek folder hain — inhe kaam karne ke liye **internet pe host** karna padega (HTTPS). Isse:
1. Chrome/Android "Add to Home Screen" ka real install button dikhega
2. Firebase Google login kaam karega
3. Aage APK banana possible hoga

Bina hosting ke (sirf HTML file kholne se) app chalega lekin **install nahi hoga** — yeh browser/Android ka rule hai, mera limitation nahi.

## Step 1 — Free hosting (5 minute, no card)
Sabse aasan: **GitHub Pages**
1. github.com pe naya repo banao (public)
2. Is folder ki saari files (kurmi_ai.html, manifest.json, service-worker.js, icon-*.png) upload karo
3. Settings → Pages → Branch select karo → Save
4. Kuch minute mein URL milega: `https://username.github.io/repo/kurmi_ai.html`

(Firebase Hosting ya Netlify bhi chalega, same idea.)

## Step 2 — Firebase real backend (Google login + cloud data)
1. console.firebase.google.com pe jao → "Add project" (free)
2. Authentication → Sign-in method → Google → Enable karo
3. Firestore Database → Create database (test mode)
4. Project settings → General → "Add app" → Web app → config copy karo
5. `kurmi_ai.html` mein `FB_CONFIG` (search karo `Demo_Replace`) ko apni real config se replace karo
6. Authentication → Settings → Authorized domains mein apna GitHub Pages domain add karo

Isके बाद Google se login karte hi data Firestore cloud mein save hoga.

## Step 3 — AI API key (free)
console.groq.com pe free account banao, API key le lo, app ke andar Settings → API Keys mein paste karo.

## Step 4 — Asli APK kaise banaye (free, bina Android Studio)
Single HTML file se direct ".apk" banana possible nahi hai — Android ko real hosted PWA chahiye. Step 1 poora karne ke baad:

1. **pwabuilder.com** pe jao
2. Apna hosted URL paste karo (jo Step 1 se mila)
3. "Package for Store" → Android select karo
4. Signed APK download ho jayega — seedha phone pe install ho sakta hai

Yeh 100% free hai aur real APK deta hai, bina Android Studio install kiye.

## Files in this package
- `kurmi_ai.html` — main app
- `manifest.json` — PWA manifest
- `service-worker.js` — offline caching + install support
- `icon-48/96/192/512.png` — app icons
