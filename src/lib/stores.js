import {writable} from 'svelte/store'
import { browser } from '$app/env';

export const seo = writable(
    {
        title: "Koen Raijer",
        description: "Medicine student and aspiring psychiatrist / data scientist.",
        openGraphURL: 'https://www.koenraijer.io/blog/ogimage_avatar.png'
    }
)

export const active_heading = writable({})

export const page_height = writable({})

export const page_offset = writable({})
 
const defaultValue = 'light';

const initialValue = browser ? window.localStorage.getItem('theme') ?? defaultValue : defaultValue;

export const theme = writable(initialValue);

theme.subscribe((value) => {

  if (browser) {

    window.localStorage.setItem('theme', value);

  }

});

 

export { theme as default };