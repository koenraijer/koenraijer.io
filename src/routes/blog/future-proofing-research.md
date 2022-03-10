---
title: On future-proofing the format of science.
subtitle: By joining forces with data science to build web-based data visualizations. 
date: "2021-12-28"
updated: "2022-03-08"
tags: 
    - Research
    - Data science
category: essay
layout: post
---

<script>
    import Link from '$lib/components/markdown/Link.svelte'
    import Image from '$lib/components/Image.svelte'
    import Blockquote from '$lib/components/markdown/Blockquote.svelte'
</script>

Are researchers too busy researching to notice bad actors running with their hard work? A <Link href="https://www.nature.com/articles/s41562-021-01217-2">recent Nature article</Link> titled "How conspiracists exploited COVID-19 science" [^1], explains their strategies. The doubt and caution on which science is built, are easy to hijack for someone's malevolent intent. Here's another <Link href="https://www.vox.com/science-and-health/2019/6/11/18652225/hype-science-press-releases">article by Vox</Link>, titled "Hyped-up science erodes trust"[^2]. When the university press serves as a researchers hype man, the chance of finding nuance in any subsequent news article is close to zero. 

Although both articles approach the problem from different directions, their conclusion is the same: scientists need to do better at informing the public. Why aren't we doing well, and how do we change it? 

I found three reasons:
- Research is PDF-based, not web-based.
- Statistics are not a priority in medical school
- Researchers should spend more time facing society. 


**TLDR**; we should use web-based data visualizations to inform the public. We should learn R and Python, not SPSS, and we should learn to work together with data scientists. 


## Research is PDF-based, not web-based.

Research has been stored and shared in PDF format since the 90s.
Before that, there were several different document formats, all incompatible with each other. When the PDF became widely adopted, anyone could create, read, store and share the same file format. Because the PDF modeled print, it needn't do more than paper. Paper isn't interactive, so PDF didn't have to be either. Then we got the internet, where all kinds of things became possible that paper could never do. 


Check out these beautiful data visualizations to get an idea:
- <Link href="https://connorrothschild.github.io/bob-ross-art-gallery/">Bob Ross Art Gallery</Link>
- <Link href="https://pudding.cool/2019/06/science_etc_2/">The Anti-Vaccine Chronicles</Link>
- <Link href="https://pudding.cool/projects/vocabulary/">The Largest Vocabulary In Hip Hop</Link>

Looking at what's possible in a browser, why don't we just move research to the internet?

Too fast. PDF has some essential characteristics: immutability, accessibility, and continuity. Immutability means being sure a paper has not been tinkered with. Accessibility and continuity are both crucial to the incremental nature of research. The value of a paper published today builds on decades of earlier research. A 2021 paper cites a 2005 paper, which cites a 1992 paper and so forth, all the way back. Everyone should be able to find and open all those papers. Without its foundation, the house crumbles.


Although blockchain could help improve web immutability, we're not ready to abandon PDF yet. 

## Statistics are not a priority in medical school


While people study data science for years, I had less than 20 lectures total about statistics. They taught us SPSS, which is irrelevant and under-maintained legacy-software [^3]. 


Why is it so bad? 
- It's boring and unintuitive. It's no fun trying to remember what sub-sub-sub-menu has the function you need. 
- It makes ugly, static graphs.
- It's closed source, which means we can't add new functionality ourselves. 

I'm convinced we should learn something like R or Python instead. It shouldn't be too hard to get a grip on, even without prior programming experience. We could even flatten the learning curve by having medical and data science students work together. This approach will improve understanding of statistics in medical students. They will also have more fun doing it. 


Now, not every doctor or researcher needs to be a data scientist. They should speak each other's language, though. And that's not optional. Data manipulation will grow too complex for researchers to do by themselves. They'll need data scientists to give them a hand. 

## Researchers should spend time facing society. 

Tax money funds more than a third of medical research [^4], and there's a certain responsibility that comes with that. Governments don't just give away money for free, they expect some form of value in return. How do we measure value? Some will say research finds its way into new therapies and products. Others will argue that science is for truth-finding, and it doesn't need to be practical. In both cases, it's beneficial to make research understandable for everyone. 

I don't mean we should teach people how they should live. There's enough of that already. We're here to give information people understand, so they can create their own moral to the story. 


There is some nuance here I'm leaving out. The simpler the information is, the more complexity you abstract away from the reader. This leaves us with an opinionated final product. The translator has to choose how to word what a study is about. 


But, who better to translate research than the researchers themselves? If they won't do it, someone else will. 


## Moving forward
As much as I wanted to declare the PDF redundant going into this, it definitely is not. In fact, I think PDFs are crucial to the way we do science. 

But, researchers also have a responsibility to inform tax payers about their work. Data scientists can help researchers do that by building web-based data visualizations. 

In the future, collaborating with data scientists will become integral to research. Medical schools should anticipate that by teaching Python and R. Not SPSS. This will deepen our understanding of statistics, and improve communication between data scientists, doctors and researchers. Let's future-proof medical research!


## Addendum: prerequisites for a new science format
Without knowing what the new format will be, I think it should meet the following criteria: 
1.	**Easy to distribute**. Anyone, anywhere, should be able to create, read, store and share it. No closed-source, paid technologies. 
2.	**Fully contained**. All the code necessary for full functionality should be inside of the new format. No reliance on the internet (after downloading).
3.	**Full mobile functionality**. No more zooming in on PDF files.
4.	**Accessible (a11y)**. Graphs are very hard to interpret for screen readers. People with visual impairments mostly rely on other people to explain graphs to them. 

Nice to have:

1.	**Interactivity**. Allows graphs to hold more detail, without convoluting the whole.
2.	**Easy to learn**. Learning should be smooth and fun.


[^1]: Jamieson, K.H., 2021. How conspiracists exploited COVID-19 science.  Nature Human Behaviour 5, 1464–1465.. doi:10.1038/s41562-021-01217-2. 
[^2]: https://www.vox.com/science-and-health/2019/6/11/18652225/hype-science-press-releases 
[^3]: Neuroscience, stats and coding. https://lindeloev.net/spss-is-dying/.
[^4]: Chakma, J., Sun, G.H., Steinberg, J.D., Sammut, S.M., Jagsi, R., 2014. Asia's Ascent — Global Trends in Biomedical R&D Expenditures. New England Journal of Medicine 370, 3–6.. doi:10.1056/nejmp1311068



