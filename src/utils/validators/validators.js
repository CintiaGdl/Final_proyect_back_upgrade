const validationPassword = (password) => {
    const response = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;
    return response.test(String(password));
}

const validationEmail = (email) => {
    const response = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return response.test(String(email).toLocaleLowerCase());
}

const validationId = (id, user) => {
    return user._id === id ? true : false;
}

// const validationRole = (role, user) => {
//     if  (user._role === "basic") {
//         user._role = 'basic';
//     }
//     else if (user._role === 'store') {
//         user._role = 'store';
//     }
//     else if (user._role === 'admin') {
//         user._role = 'admin';
//     }
// }

module.exports = {
    validationPassword,
    validationEmail,
    validationId
}