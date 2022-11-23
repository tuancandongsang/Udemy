
const isLogin = true

export default function (context) {
    // console.log('[middleware mobile]', Object.keys(context));
    context.isMobile = false
    let userAgent = "";
    if (context.req) {
        userAgent = context.req.headers['user-agent']
    } else {
        userAgent = navigator.userAgent
    }
    if (/mobile/i.test(userAgent)) {
        context.isMobile = true
        // return "mobile"
    }

    if(!isLogin) {
        context.redirect('/login')
    }
}



