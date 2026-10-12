# Yolkling

A virtual pet that grows with you.

This is the landing page for Yolkling, an iOS virtual pet that does well when you do. Sleep, walk, check in, put your phone down, and your yolkling thrives.

Live at [yolkling.com](https://yolkling.com).

## Run it

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Going live

One setting decides what the buttons do.

| `NEXT_PUBLIC_APP_STORE_URL` | The page shows |
| --- | --- |
| empty | a waitlist |
| the App Store link | a download button |

## Where things are

| Path | What it is |
| --- | --- |
| `app/body.ts` | the words and sections of the page |
| `app/yolk.css` | the styles |
| `app/engine.ts` | draws and animates the yolkling |
| `app/config.ts` | the going-live setting |
| `app/add/[code]` | invite links, `yolkling.com/add/<code>` |
| `app/press`, `privacy`, `support`, `terms` | the small pages |

Built with Next.js and React. Deployed on Vercel.
