import {writable} from 'svelte/store'

export const seo = writable(
    {
        title: "Koen Raijer",
        description: "I'm a medicine student who dabbles in web development and data science. Currently building websites for charity.",
        openGraphURL: 'https://www.koenraijer.io/blog/ogimage_avatar.png'
    }
)