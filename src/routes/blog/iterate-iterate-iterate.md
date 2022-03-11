---
title: Iterate, Iterate, Iterate
subtitle: I learned the hard way, again...
date: "2022-03-10"
updated: "2022-03-10"
tags:
    - Web development
category: note
layout: note
---
<script>
    import Link from '$lib/components/markdown/Link.svelte'
</script>

Today, I was reminded of something very important when it comes to programming. I've been in quarantine all week, spending most of my time on the rework for my personal website that you're reading this on right now. I'm really happy with how it turned out, but a couple of hours ago, I was extremely frustrated. Frustrated because my brand new website wouldn't deploy on Vercel. 

The thing was, I hadn't even connected the git repository to my Github until the website was completely finished. I made 4 commits and 0 push requests. I was just working on making it as good as possible, and then it would magically deploy to Vercel and I would get a nice dopamine rush. Then I tried deploying it, and I got an error message. I recognized the error message from a couple of weeks before, when I was in the exact same situation. Back then, I had spent more than a day searching the corners of the internet for a solution, without any luck. I gave up in the end, so you can probably imagine I was pretty unhappy seeing the same error message today. 

I instantly assumed the problem had "something to do with endpoints", although I couldn't find anything about it being a problem, anywhere. Didn't really have a good reason for thinking that in the first place. In fact, the problem could literally be anything, because I hadn't checked *at all* whether there were any problems along the way. I had no clue where to even start looking.

So I went to the gym, as I had planned, and that relaxed me a bit. Walking back from the gym, I made a plan: I would incrementally copy and paste parts of my website into a new repo. Every time I added something, I would push to github and set up automatic deploy to Vercel from the very start. 

So I did, and everything went well. It took me under an hour to fix something I had previously spent more than a day. Not by solving the actual problem, but by **ignoring** the problem. 

I know, working on programming projects is *supposed* to be incremental. I basically came up with the obvious thing to do. Still, finding out the hard way may stop me from forgetting it.

**P.S. <Link href="https://koenraijer-f1eek7b15-koenraijer.vercel.app/">Permalink to the old design</Link>
