const sendToken = (vendor, statusCode, res) => {

    //Creating JWT Token
    const token = vendor.getJwtToken();


    //setting cookies
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000 ),
        httpOnly: true,
    }

    res.status(statusCode)
    .cookie('token', token, options)
    .json({
        success: true,
        token,
        vendor
    })
}

module.exports = sendToken;