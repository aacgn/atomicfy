<template>
    <div></div>
</template>

<script>
export default {
  name: "Callback",
  mounted(){
    const URLParser = new URL(window.location.href);
    const URLSearchParamsParser =  new URLSearchParams(URLParser.hash.substring(1));

    const authorizedUserData = {
        accessToken: URLSearchParamsParser.get("access_token"),
        expiresIn: URLSearchParamsParser.get("expires_in")
    }

    if (window.opener.parent) {

        const postMessageData = {
            hasAtomicSignature: true,
            event: "custom_event",
            data: {
                name: "authorizedUser",
                data: authorizedUserData
            }
        }

        window.opener.parent.postMessage(postMessageData, "*");
    }

    if (window.opener)
        window.close();
  }
};
</script>