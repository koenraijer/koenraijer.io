import {writable} from 'svelte/store'

export const seo = writable(
    {
        title: "Koen's website",
        description: "Personal website of a medicine student who dabbles in web development and data science. Also building websites for charity.",
        openGraphURL: 'https://www.koenraijer.io/avatar.webp',

    }
)