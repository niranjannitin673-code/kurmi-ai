# Proxy Setup — OpenAI, Gemini, DeepSeek ko kaam karne ke liye (free, 2 minute)

## Yeh zaroori kyun hai
OpenAI, Gemini, aur DeepSeek **jaan-boojh kar** browsers se direct API calls block karte hain
(CORS security policy) — sirf apne server se allow karte hain. Ye KURMI AI ka bug nahi hai.
Sirf **Groq** aur **Anthropic** hi browser se seedha kaam karte hain.

Free workaround: Cloudflare Workers pe ek chhota "proxy" chalao jo aapke request ko
forward karta hai — 100% free, koi credit card nahi chahiye.

## Steps (phone ya computer, dono se ho sakta hai)

1. **dash.cloudflare.com** pe jao → free account banao
2. Left sidebar mein **Workers & Pages** → **Create** → **Create Worker**
3. Koi bhi naam do (e.g. `kurmi-proxy`) → **Deploy**
4. Deploy hone ke baad **Edit Code** dabao
5. Wahan jo bhi default code hai use **poora delete** karo
6. Is package mein di gayi `proxy-worker.js` file kholo, uska **poora content copy** karo, aur paste kar do
7. Top-right **Deploy** dabao
8. Ab aapko ek URL milega jaise: `https://kurmi-proxy.yourname.workers.dev`

## KURMI AI mein set karo

1. App kholo → Developer Corner → API Keys tab
2. **"Proxy URL"** field mein wahi URL paste karo: `https://kurmi-proxy.yourname.workers.dev/`
3. **Save All Keys** dabao

Bas ho gaya — ab OpenAI, Gemini, DeepSeek bhi kaam karenge. Groq aur Anthropic pehle se
hi seedhe kaam karte hain, unke liye proxy ki zaroorat nahi.

## Security note
Ye worker sirf teen fixed hosts (OpenAI, Gemini, DeepSeek) ko hi forward karta hai —
koi aur jagah request nahi bhej sakta, isliye safe hai.

## Update (naye free providers add hone ke baad)
Agar aapne Cerebras/Mistral/OpenRouter/HuggingFace add kiye hain, apna deployed worker
**dobara update karna hoga** taaki naye hosts allow ho:

1. Cloudflare dashboard → apna worker → Edit Code (ya Lee se kaho)
2. Is package ki latest `proxy-worker.js` ka poora content paste karo (isme ab 7 hosts allowed hain)
3. Deploy dabao — URL wahi rahega, Proxy URL field change karne ki zaroorat nahi
