var modal1constraints = {
    firstname: {
        presence: true
        // message: "disallow"
    },
    lastname: {
        presence: true
        // message: "disallow"
    },
    businessname: {
        presence: true
    //     message: "disallow"
    },
    address: {
        presence: true
        // message: "disallow"
    },
    workphone: {
        presence: true
        // message: "disallow"
    },
    mobilephone: {
        presence: true
        // message: "disallow"
    }
};

var modal2constraints = {
    date: {
        presence: true
    },
    memo: {
        presence: true
    }
};

//validate modal1
// validate(formvariables.customer,modal1constraints);
//validate modal2
// validate(formvariables.followups,modal2constraints);