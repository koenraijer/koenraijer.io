const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;
const redirect_uri = "http://localhost:3000/"
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
let token;
let expires_at;
let time_left;

export const get = async () => {

    // Check if there's a token already, and whether it is still valid
    if(token && expires_at > Date.now()) {
        return {
            status: 200,
            body: {token, time_left}
        }
    }
    const { access_token, expires_in } = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
        // Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: 'AQA8dsZz8-lIf2VlXk2c4sXQLcv_O20qhijWjsS6Qr4ZBV0Mp6bjeV9p8ywEtwGD6BR1jpz1TwcJ9CdEq4vJifywslJQt5pRnBycXmUzOVcNLifrMXQVlwIX1YHSyBPnBZc',
        redirect_uri: "http://localhost:3000/",
        client_id: "6a046c3ef5114c09801a2472891e4753",
        client_secret: "7e67de85b6e540959886511a46ee0663"
        })
    }).then(res => res.json());

    token = access_token
    time_left = expires_in
    expires_at = Date.now() + (expires_in * 1000) // expires_in is in seconds, while Date.now() is in milliseconds

        return {
            status: 200,
            body: {token, time_left}
        }   
    };
