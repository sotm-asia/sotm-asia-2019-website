"use strict";





//
function submitFormData() {
    let url = "https://script.google.com/macros/s/AKfycbxFXi4TlZle0J6H1U3bmBdYlrhNJ0YY47ehPi3pLztWuPi5LQ/exec";

    let redirectURL = "https://securepay.sslcommerz.com/gwprocess/v4/gw.php";
    let successURL  = "https://stateofthemap.asia/registration-successful.html";

    let form = document.getElementById('form').querySelector('form');

    let firstName      = document.getElementsByName('first_name'   )[0].value;
    let lastName       = document.getElementsByName('last_name'    )[0].value;
    let gender         = document.getElementsByName('gender'       )[0].value;
    let email          = document.getElementsByName('email'        )[0].value;
    let phone          = document.getElementsByName('phone'        )[0].value;
    let city           = document.getElementsByName('city'         )[0].value;
    let country        = document.getElementsByName('country'      )[0].value;
    let speaking       = document.getElementsByName('speaking'     )[0].value;
    let ticketType     = document.getElementsByName('ticket_type'  )[0].value;
    let numTickets     = document.getElementsByName('num_of_ticket')[0].value;
    let coupon         = document.getElementsByName('coupon'       )[0].value;
    let p1DietFields   = document.getElementsByName('p1_diet'      );
    let p1TShirtFields = document.getElementsByName('p1_tshirt'    );
    let p2DietFields   = document.getElementsByName('p2_diet'      );
    let p2TShirtFields = document.getElementsByName('p2_tshirt'    );
    let p3DietFields   = document.getElementsByName('p3_diet'      );
    let p3TShirtFields = document.getElementsByName('p3_tshirt'    );
    let orgFields      = document.getElementsByName('organization' );

    let emailValid = email.split("@").length==2
        ? email.split("@")[0] && email.split("@")[1]
            ? email.split("@")[1].split(".").length==2
                ? email.split("@")[1].split(".")[0] 
                    && email.split("@")[1].split(".")[1]
                : false
            : false
        : false;

    let orgExists = ticketType=="community"
        ? orgFields.length > 0
            ? orgFields[0].value
                ? true
                : false
            : false
        : true;

    if (!emailValid) {
        showInputErrorMessage("email", 1);
    }

    if (!orgExists) {
        showInputErrorMessage("organization", 1);
    }

    event.preventDefault();

    if (firstName && lastName && gender && emailValid && phone && city && country 
        && speaking && ticketType && p1DietFields && p1TShirtFields && orgExists) {

        let priceBeforeDiscount = ticketType=="individual"
            ? 40
            : ticketType=="community"
                ? 20
                : ticketType=="corporate"
                    ? 200
                    : -1;

        let priceAfterDiscount = coupon[coupon.length-1]==="0"
            ? priceBeforeDiscount * 0.5
            : coupon[coupon.length-1]==="1"
                ? priceBeforeDiscount * 0
                : coupon[coupon.length-1]==="2"
                    ? priceBeforeDiscount * 0.75
                    : coupon[coupon.length-1]==="3"
                        ? priceBeforeDiscount * 0.3
                        : priceBeforeDiscount;

        let data = "first_name="     + firstName
            + "&" + "last_name="     + lastName
            + "&" + "gender="        + gender
            + "&" + "email="         + email
            + "&" + "phone="         + phone
            + "&" + "city="          + city
            + "&" + "country="       + country
            + "&" + "speaking="      + speaking
            + "&" + "ticket_type="   + ticketType
            + "&" + "num_of_ticket=" + numTickets
            + "&" + "ticket_price="  + priceAfterDiscount
            + "&" + "p1_diet="       + ( p1DietFields.length   > 0 ? p1DietFields[0].value   : "" )
            + "&" + "p1_tshirt="     + ( p1TShirtFields.length > 0 ? p1TShirtFields[0].value : "" )
            + "&" + "p2_diet="       + ( p2DietFields.length   > 0 ? p2DietFields[0].value   : "" )
            + "&" + "p2_tshirt="     + ( p2TShirtFields.length > 0 ? p2TShirtFields[0].value : "" )
            + "&" + "p3_diet="       + ( p3DietFields.length   > 0 ? p3DietFields[0].value   : "" )
            + "&" + "p3_tshirt="     + ( p3TShirtFields.length > 0 ? p3TShirtFields[0].value : "" )
            + "&" + "organization="  + ( orgFields.length      > 0 ? orgFields[0].value      : "" )
            + "&" + "coupon="        + coupon;

        let xHReq = new XMLHttpRequest();

        xHReq.onreadystatechange = function () {
            if (this.readyState==4 && this.status==200) {
                let response = JSON.parse(xHReq.response);
                if (response.status=="success") {;
                    location.href = priceAfterDiscount==0
                        ? successURL
                        : (redirectURL 
                            + "?" + "Q=PAY" 
                            + "&" + "SESSIONKEY=" + response.sessionkey);
                } else {
                    let isValid = response.status=="success";
                    showCouponValidationMessage(isValid);
                }
            }
        }

        xHReq.open("GET", (url + "?" + data), true);
        xHReq.send();

    }
}





// Change input field style based on whether coupon is valid or not.
function showCouponValidationMessage(isValid) {
    let couponField = document.getElementsByName('coupon')[0];

    // Reset coupon field style, for typing again after invalid message.
    couponField.addEventListener('focus', function () {
        couponField.classList.remove("error");
        couponField.placeholder = "";
    });

    if (isValid) {
        couponField.classList.remove("error");
        couponField.classList.add("success");
    } else {
        couponField.classList.add("error");
        couponField.value = "";
        couponField.placeholder = "Invalid coupon!";
    }
}





function showInputErrorMessage(fieldName, showErrorMsg) {
    let orgField = document.getElementsByName(fieldName)[0];
    if (showErrorMsg) {
        orgField.classList.add("error");
    } else {
        orgField.classList.remove("error");
    }
}





function createSelectTag({name, values, texts, defaultText, extras}) {
    if (name && values && values.length>0) {

        let dropdown = document.createElement('select');
        dropdown.name = name;

        if (defaultText) {
            let data = {
                "value": null,
                "text": defaultText,
                "extras": {
                    "selected": true,
                    "disabled": true,
                },
            };
            dropdown.appendChild( addOptionTag(data) );
        }
        
        if (values.length>0) {
            for (let c=0; c<values.length; ++c) {
                let data = {
                    "value": values[c],
                    "text": texts[c],
                };
                dropdown.appendChild( addOptionTag(data) );
            }
        }

        if (extras) {
            if (extras.required) {
                dropdown.required = true;
            }
        }

        return dropdown;

    }
}





function addOptionTag({value, text, extras}) {
    let option = document.createElement('option');

    option.value     = value || "";
    option.innerText = text  || "";

    if (extras) {
        if (extras.selected) {
            option.selected = true;
        }
        if (extras.disabled) {
            option.disabled = true;
        }
    }

    return option;
}





function createFormBlock() {
    let block = document.createElement('p');
    block.classList.add('block');
    return block;
}





function createFormLabel(labelData) {
    let label = document.createElement('span');
    label.innerText = labelData.labelText;
    if (labelData.classList) {
        for (let c=0; c<labelData.classList.length; ++c) {
            label.classList.add(labelData.classList[c]);
        }
    }
    return label;
}
