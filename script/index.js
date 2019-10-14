"use strict";





//
function submitFormData() {
    let url = "https://script.google.com/macros/s/AKfycbzB2-Xue2sbiBfx8ANUNGmfe_4FmBxz5hxCP1Q2fyejFuMVCe0/exec";
    let redirectURL = "http://sandbox.sslcommerz.com/gwprocess/v4/gw.php";
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

    if (firstName && lastName && gender && email && phone && city && country && speaking && ticketType && p1DietFields && p1TShirtFields) {

        event.preventDefault();

        let priceBeforeDiscount = ticketType=="individual"
            ? 20
            : ticketType=="community"
                ? 40
                : ticketType=="corporate"
                    ? 200
                    : -1;

        let priceAfterDiscount = coupon[coupon.length-1]==="0"
            ? priceBeforeDiscount * 0.5
            : coupon[coupon.length-1]==="1"
                ? priceBeforeDiscount * 0
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
            + "&" + "p2_diet="       + ( p1DietFields.length   > 1 ? p1DietFields[0].value   : "" )
            + "&" + "p2_tshirt="     + ( p1TShirtFields.length > 1 ? p1TShirtFields[0].value : "" )
            + "&" + "p2_diet="       + ( p2DietFields.length   > 1 ? p2DietFields[0].value   : "" )
            + "&" + "p2_tshirt="     + ( p2TShirtFields.length > 1 ? p2TShirtFields[0].value : "" )
            + "&" + "p3_diet="       + ( p3DietFields.length   > 1 ? p3DietFields[0].value   : "" )
            + "&" + "p3_tshirt="     + ( p3TShirtFields.length > 1 ? p3TShirtFields[0].value : "" )
            + "&" + "organization="  + ( orgFields.length      > 1 ? orgFields[0].value      : "" )
            + "&" + "coupon="        + coupon;
            
        let xHReq = new XMLHttpRequest();

        xHReq.onreadystatechange = function () {
            if (this.readyState==4 && this.status==200) {
                let response = JSON.parse(xHReq.response);
                location.href = redirectURL 
                    + "?" + "Q=PAY" 
                    + "&" + "SESSIONKEY=" + response.sessionkey;
            }
        }

        xHReq.open("GET", (url + "?" + data), true);
        xHReq.send();

    }
}
