/* Yolkling postboard data. The agent appends new REAL reply targets above the marker line.
   Item types: tweet | reply | reddit_post | reddit_comment.
   reply / reddit_comment carry a real target_url, target_who, context (what they said), and dir ("out" = you reaching out, "in" = someone who replied to you).

   CONTENT MIX (important): generate MOSTLY replies and reddit comments. At most ONE new post (a tweet OR a reddit_post) per day, everything else is replies and comments. On Reddit, comment a LOT (genuine, mostly no plug) to build karma.
   DIFFERENTIATION: reddit grills fast, so always have an honest answer ready for "how is this different from Finch / Pou / Tamagotchi / Forest / a habit tracker". Pull from DIFFERENTIATION.md and use it especially in dir:"in" drafts (people replying to or grilling the user's posts).
   VOICE + LENGTH (critical, this is what keeps the account un-flagged): real reddit and x comments are SHORT, one line, plain and casual, often lowercase. BEFORE drafting, READ the actual post AND the existing replies, then sound exactly like the people already in that thread. Keep every reply to ONE short human line. No mini-essays, no "curious where that ends up" engagement-bait, no AI tells, NO EM DASHES EVER.
   HOW TO WRITE IT: if a witty, marketing-clever angle genuinely fits the post, use it, that is the gold and what gets you noticed. if a clever angle does NOT fit, do not skip the target, just write a normal, genuine, human one-liner that adds something or is warmly supportive (mostly no plug) purely to get engagement up. the goal is to sound like a real person who happened to relate, never like an ad. */
window.POSTBOARD_ITEMS = [

  /* ---- the one invited reply (real) ---- */
  { id:"x-ionleu", platform:"x", type:"reply", dir:"out",
    target_url:"https://x.com/ionleu/status/2067132132108255702",
    target_who:"@ionleu", context:"drop ur startup link",
    tweet_id:"2067132132108255702",
    text:"a one of a kind creature you hatch from your vibe. it grows when you look after yourself and gets sleepy when you doomscroll. basically an app that wants you off your phone. ios, waitlist's at yolkling.com 🥚",
    added:"seed" },

  /* ---- build in public tweets (space out ~1 a day) ---- */
  { id:"tw-day1", platform:"x", type:"tweet", added:"seed",
    text:"day one of yolkling being real on the internet. a little creature that grows when you take care of yourself and gets sleepy when you doomscroll. the weird part of building it was making something that genuinely wants you to close the app." },
  { id:"tw-shapes", platform:"x", type:"tweet", added:"seed",
    text:"i can't draw, so every yolkling is built from simple shapes in code. a handful of parts makes millions of unique ones. constraints are a gift honestly." },
  { id:"tw-offphone", platform:"x", type:"tweet", added:"seed",
    text:"someone asked why an app would want you off your phone. because every other app wants the opposite. your little guy lights up when you go outside. that's the whole pitch." },
  { id:"tw-referral", platform:"x", type:"tweet", added:"seed",
    text:"if you invite a friend to yolkling you both get a founding-flock creature. only exists while we're tiny, never sold later. the early people should get something the latecomers can't buy." },

  /* ---- reddit posts (read each sub's rules before posting) ---- */
  { id:"r-sideproject", platform:"reddit", type:"reddit_post", sub:"SideProject", added:"seed",
    title:"i built a little creature that grows when you take care of yourself and gets sleepy when you doomscroll",
    body:"hey guys. i've been building this thing called yolkling. it's a tiny one of a kind creature (picture a little yolk with a face) that you hatch, and it grows when you do normal human stuff like sleep, drink water, get some sunlight, text people back. when you doomscroll it gets sleepy. so it's basically an app that is rooting for you to put your phone down, which is a weird thing to build but i kept wanting it to exist.\n\nthey're all unique, no two look the same, and they're social. your creature visits your friends' creatures and leaves little postcards. building that part was the most fun i've had on this.\n\ni'm one person doing this. i'm not trying to make a lot of money, just enough that i'm not paying out of pocket for infra. it'll be free to hatch always, and the only money is cheap optional cosmetics.\n\nit's ios first for now. there's a waitlist up if you want to see how it turns out, i won't bug you, it's literally just the release announcement. landing page is yolkling.com.\n\nmostly i'd love feedback on the concept and the landing page ui. and genuinely curious: what feature would make you or someone you know actually pay a few bucks for a thing like this?",
    note:"r/SideProject is built for this, but still read the sidebar. reply to every comment like a human." },
  { id:"r-cozygamers", platform:"reddit", type:"reddit_post", sub:"cozygamers", added:"seed",
    title:"making a cozy little creature you raise by actually taking care of yourself, would love this community's honest take",
    body:"hi cozygamers. i'm making a tiny app called yolkling, a one of a kind little creature you hatch and raise, except it grows when you do gentle real life stuff (sleep, water, sunlight, texting people back) and gets sleepy when you doomscroll. it's meant to be the opposite of an attention trap, something cozy that's quietly on your side.\n\nthey're all unique and they visit your friends' creatures and leave little postcards. no ads, no dark patterns, free to hatch.\n\ni know this community has great taste and a low tolerance for anything that smells like a growth hack, so i'm genuinely here for the honest read: does this sound cozy or does the 'self care' angle make it feel like a chore? what would make a creature like this worth keeping open past week one?",
    note:"IMPORTANT: r/cozygamers has strict self-promo rules and often a dedicated self-promo day or thread. check the sidebar and post in the right place, or hold this until you've been active in the sub. do not drop it in the main feed blind." },
  { id:"r-iosapps", platform:"reddit", type:"reddit_post", sub:"iosapps", added:"seed",
    title:"[In Development] Yolkling, a one of a kind creature that grows when you look after yourself, ios first",
    body:"hey. solo dev here. building an ios app called yolkling. you hatch a tiny one of a kind creature (a little yolk with a face) and it grows when you take care of yourself, sleep, water, sunlight, getting back to people. it gets sleepy when you doomscroll. the whole point is to nudge you off your phone, gently, no guilt tripping.\n\nevery creature is unique and they visit each other and leave postcards, so there's a soft social layer that isn't a feed.\n\nnot on the store yet, there's a waitlist at yolkling.com and a testflight soon. free to hatch, money is only cheap optional cosmetics.\n\nwould really value ios-user feedback on two things: does the 'app that wants you off your phone' idea actually land or sound contradictory, and what would make you keep a virtual pet open past week one?",
    note:"check r/iosapps current rules and required flair for self-promo / dev posts before posting." }

  ,
  /* ---- round 1: genuine r/SideProject comments (karma, no plug) ---- */
  { id:"r-sp-aiagent", platform:"reddit", type:"reddit_comment", dir:"out", sub:"SideProject",
    target_url:"https://www.reddit.com/r/SideProject/comments/1u78ysc/i_built_a_full_content_site_with_an_ai_coding/",
    target_who:"r/SideProject post", context:"built an seo content site with an ai coding agent in one sitting, and it refused to fake the results",
    text:"did it push back on its own or did you steer it there?",
    added:"round 1" },
  { id:"r-sp-pokemon", platform:"reddit", type:"reddit_comment", dir:"out", sub:"SideProject",
    target_url:"https://www.reddit.com/r/SideProject/comments/1u89uky/my_side_project_pokémon_stock_tracker/",
    target_who:"r/SideProject post", context:"pokemon stock tracker, react front + fastapi on a home pc, really proud of it",
    text:"fastapi on a home pc lol nice. why pokemon stock specifically?",
    added:"round 1" },
  { id:"r-sp-wordle", platform:"reddit", type:"reddit_comment", dir:"out", sub:"SideProject",
    target_url:"https://www.reddit.com/r/SideProject/comments/1u7waz8/i_built_a_modern_wordle_with_real_multiplayer_1v1/",
    target_who:"r/SideProject post", context:"modern wordle with real multiplayer, 1v1 duels and a party mode for up to 10 on your tv, free no ads no account",
    text:"tv party mode is the move. how's the realtime holding up with 10 people?",
    added:"round 1" },
  { id:"r-sp-validate", platform:"reddit", type:"reddit_comment", dir:"out", sub:"SideProject",
    target_url:"https://www.reddit.com/r/SideProject/comments/1u3ccv1/most_people_validate_ideas_the_wrong_way/",
    target_who:"r/SideProject post", context:"most people validate ideas wrong, asking 'do people like this' is useless because people are polite",
    text:"a signup or a payment is the only real yes imo. the rest is people being polite.",
    added:"round 1" },

  /* === AGENT APPENDS NEW REAL REPLY TARGETS ABOVE THIS LINE === */
];
