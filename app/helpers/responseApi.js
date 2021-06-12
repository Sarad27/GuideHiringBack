exports.success = (message, results, statusCode) =>{

    return {
        message,
        error: false,
        code: statusCode,
        results
    }
}

exports.error = (message, statusCode) =>{

    const codes = [200, 201, 400, 401, 404, 403, 422, 500];

    const findCode = codes.find((code) => code === statusCode);

    if(!findCode) statusCode = 500;
    else statusCode = findCode;

    return{
        message,
        error: true,
        code: statusCode
    }
}

exports.validation = (errors) =>{
    return{
        message: "Validation Error",
        error: true,
        code: 422,
        errors
    }
}