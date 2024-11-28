/* code here... */

document.getElementById("btn_getJwtSource").onclick = function () {
    const value = document.getElementById("jwt-source").value

    const {header,payload,sign} = jwtDecode(value)

    document.querySelector(".header").innerText  = header
    document.querySelector(".payload").innerText  = payload
    document.querySelector(".verify_sign").innerText  = sign
}

document.getElementById("btn_clean").onclick = function () {
    
    document.getElementById("jwt-source").value = ""

    document.querySelector(".header").innerText  = ""
    document.querySelector(".payload").innerText  = ""
    document.querySelector(".verify_sign").innerText  = ""
}


class InvalidTokenError extends Error {
}
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).replace(/(.)/g, (m, p) => {
        let code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
            code = "0" + code;
        }
        return "%" + code;
    }));
}
function base64UrlDecode(str) {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += "==";
            break;
        case 3:
            output += "=";
            break;
        default:
            throw new Error("base64 string is not of the correct length");
    }
    try {
        return b64DecodeUnicode(output);
    }
    catch (err) {
        return atob(output);
    }
}
function jwtDecode(token) {
    if (typeof token !== "string") {
        throw new InvalidTokenError("Invalid token specified: must be a string");
    }
    const parts = token.split(".");
   
    if (parts.length !== 3) {
        throw new InvalidTokenError("Invalid token specified: must be three parts");
    }
    
    for(part of parts){
        if (typeof part !== "string") {
            throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
        }        
    }

    return {
        header: base64UrlDecode(parts[0]),
        payload: base64UrlDecode(parts[1]),
        sign: parts[2]
    }
    
    // let decoded;
    // try {
    //     decoded = base64UrlDecode(part);
    //     return decoded
    // }
    // catch (e) {
    //     throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);
    // }    
}
