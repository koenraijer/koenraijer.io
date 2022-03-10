/* Simple endpoint that fetches 1 activity */
export async function get() {
    const data = await fetch('https://www.boredapi.com/api/activity').then((response => response.json()))

    return {
        body: {data}
    }
}
