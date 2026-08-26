

/*
    The cart is stored here.

    If a customer adds a flower more than once,
    the quantity will increase instead of creating
    another separate item.
*/

let cart = [];


/* =========================================
   ADD FLOWER TO CART
========================================= */

function addToCart(name, price, icon) {

    const existingFlower = cart.find(
        function (flower) {
            return flower.name === name;
        }
    );


    if (existingFlower) {

        existingFlower.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            icon: icon,

            quantity: 1

        });

    }


    updateCart();

    openCart();
}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartNumber =
        document.getElementById("cartNumber");

    const cartTotal =
        document.getElementById("cartTotal");


    cartItems.innerHTML = "";


    let total = 0;

    let numberOfItems = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

    }


    cart.forEach(
        function (flower, index) {

            total +=
                flower.price * flower.quantity;

            numberOfItems +=
                flower.quantity;


            const item =
                document.createElement("div");

            item.className = "cart-product";


            item.innerHTML = `

                <div class="cart-product-icon">
                    ${flower.icon}
                </div>

                <div class="cart-product-info">

                    <h4>
                        ${flower.name}
                    </h4>

                    <p>
                        Rs. ${flower.price}
                        × ${flower.quantity}
                    </p>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${index})"
                    >
                        Remove
                    </button>

                </div>

            `;


            cartItems.appendChild(item);

        }
    );


    cartNumber.textContent =
        numberOfItems;

    cartTotal.textContent =
        total.toLocaleString();


    const checkoutTotal =
        document.getElementById("checkoutTotal");

    if (checkoutTotal) {

        checkoutTotal.textContent =
            total.toLocaleString();

    }
}


/* =========================================
   REMOVE ITEM
========================================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    document
        .getElementById("sideCart")
        .classList.add("open");

}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    document
        .getElementById("sideCart")
        .classList.remove("open");

}


/* =========================================
   SEARCH
========================================= */

function searchFlowers() {

    const searchBox =
        document.getElementById("searchBox");

    const searchText =
        searchBox.value
        .toLowerCase()
        .trim();


    const flowers =
        document.querySelectorAll(".flower-card");


    flowers.forEach(
        function (flower) {

            const flowerName =
                flower
                .getAttribute("data-name")
                .toLowerCase();


            if (
                flowerName.includes(searchText)
                ||
                searchText === ""
            ) {

                flower.style.display = "";

            } else {

                flower.style.display = "none";

            }

        }
    );

}


/*
    This also allows the customer to press
    ENTER inside the search box.
*/

document
    .getElementById("searchBox")
    .addEventListener(
        "keypress",
        function (event) {

            if (event.key === "Enter") {

                searchFlowers();

            }

        }
    );


/* =========================================
   BOUQUET BUTTON
========================================= */

function contactForBouquet() {

    window.location.href =
        "mailto:ammadhussain136@gmail.com" +
        "?subject=Bouquet%20Order%20Question";

}


/* =========================================
   SHOW CHECKOUT
========================================= */

function showCheckout() {

    if (cart.length === 0) {

        alert(
            "Please add a flower to your cart first."
        );

        return;

    }


    closeCart();


    document
        .getElementById("checkoutOverlay")
        .classList.add("show");


    updateCart();

}


/* =========================================
   CLOSE CHECKOUT
========================================= */

function closeCheckout() {

    document
        .getElementById("checkoutOverlay")
        .classList.remove("show");

}


/* =========================================
   CREATE ORDER INFORMATION
========================================= */

function createOrderText() {

    const name =
        document.getElementById("customerName").value;

    const phone =
        document.getElementById("customerPhone").value;

    const email =
        document.getElementById("customerEmail").value;

    const address =
        document.getElementById("customerAddress").value;

    const city =
        document.getElementById("customerCity").value;

    const notes =
        document.getElementById("customerNotes").value;


    let orderItems = "";

    let total = 0;


    cart.forEach(
        function (flower) {

            const itemTotal =
                flower.price * flower.quantity;

            total += itemTotal;


            orderItems +=
                flower.name +
                " x " +
                flower.quantity +
                " = Rs. " +
                itemTotal +
                "\n";

        }
    );


    const orderText =

        "NEW FLOWER ORDER\n\n" +

        "CUSTOMER DETAILS\n" +
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Email: " + email + "\n\n" +

        "DELIVERY ADDRESS\n" +
        "Address: " + address + "\n" +
        "City: " + city + "\n\n" +

        "ORDER\n" +
        orderItems + "\n" +

        "TOTAL: Rs. " +
        total + "\n\n" +

        "ADDITIONAL NOTES\n" +
        notes;


    return {
        text: orderText,
        email: email,
        name: name,
        phone: phone,
        address: address,
        city: city,
        notes: notes,
        total: total
    };

}


/* =========================================
   PLACE ORDER
========================================= */

document
    .getElementById("orderForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const order =
                createOrderText();


            /*
                IMPORTANT:

                This part opens the customer's
                email application and prepares
                an order email.

                The shop email is:
                ammadhussain136@gmail.com

                For automatic sending without
                opening an email application,
                connect this form to a backend
                or an email service such as
                EmailJS/Formspree.
            */


            const shopEmail =
                "ammadhussain136@gmail.com";


            const subject =
                encodeURIComponent(
                    "New Flower Order - " +
                    order.name
                );


            const body =
                encodeURIComponent(
                    order.text
                );


            const mailLink =
                "mailto:" +
                shopEmail +
                "?subject=" +
                subject +
                "&body=" +
                body;


            /*
                Open the customer's email program.
            */

            window.location.href =
                mailLink;


            /*
                Clear the cart after the order
                information has been prepared.
            */

            cart = [];

            updateCart();

            closeCheckout();


            alert(
                "Your order details have been prepared. " +
                "Please send the email that opens next."
            );

        }
    );


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeCart();

            closeCheckout();

        }

    }
);
