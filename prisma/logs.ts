import prisma from "./prisma";

const config = {
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
};

const getToken = async (code: any) => {
  try {
    const URL = "https://api.vercel.com/v2/oauth/access_token";
    console.log("config",config)
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        redirect_uri: config.redirectUri,
      }),
    });

    const json = await res.json();
    console.log("access token",json.access_token)
    return json.access_token;
  } catch (e) {
    console.log("error while fetching token", e);
  }
};


const createLogDrain = async (token: any, body: any) => {
    try {
        const URL = "https://api.vercel.com/v1/integrations/log-drains";

        const res = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(body)
        })
        console.log("res,",res)
        console.log("res json",res.json())
    } catch(e) {
        console.log("error while creating drain logs",e)
    }
}

export {
    getToken,
    createLogDrain
}