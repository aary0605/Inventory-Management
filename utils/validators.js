const validateSignup = function(data)  {

    let errors = [];
    // console.log(data);
    if (!data.Name || data.Name.length < 6)
        errors.push("Username must be at least 6 characters");

    if (data.Name.length > 10)
        errors.push("Username can't exceed 10 characters");
     
    if (!/^[a-zA-Z0-9]+$/.test(data.Name))
        errors.push("Special characters not allowed");

    if (!data.Password || data.Password.length < 6)
        errors.push("Password too short");

    if (data.Password.length > 10)
        errors.push("Password too long");

    if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.Email)
    )
        errors.push("Invalid Email");

    return {
        status: errors.length === 0,
        error: errors
    };
};

module.exports = validateSignup;