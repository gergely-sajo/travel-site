exports.handler = function (event, context, callback) {
    const secretContent = `
    <h3>Welcome</h3>
    <p>The password you entered were correct.</p>
    `
    
    let body

    if (event.body) {
        body = JSON.parse(event.body)
    } else {
        body = {}
    }

    if (body.password == "password") {
        callback(null, {
            statusCode: 200,
            body: secretContent
        })
    } else {
        callback(null, {
            statusCode: 401
        })
    }
}