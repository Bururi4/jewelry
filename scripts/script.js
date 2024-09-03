'use strict'

window.onload = function () {
    new WOW({
        animateClass: 'animate__animated',
    }).init();

    // const tabs = document.querySelectorAll('.third-section-catalog-navbar-item');
    // const tabsContent = document.querySelectorAll('.third-section-items');
    //
    // for (let i = 0; i < tabs.length; i++) (function (n) {
    //     tabs[n].addEventListener('click', function () {
    //         for (let j = 0; j < tabs.length; j++) {
    //             tabs[j].classList.remove('active');
    //             tabsContent[j].classList.remove('active');
    //         }
    //         tabs[n].classList.add('active');
    //         tabsContent[n].classList.add('active');
    //     })
    // })(i)

    const tabs = $('.third-section-catalog-navbar');
    const tabsContent = $('.third-section-items');

    tabs.click((e) => {
        const children = tabs[0].children;
        const target = e.target;
        for (let i = 0; i < children.length; i++) {
            $(children[i]).removeClass('active');
            $(tabsContent[i]).removeClass('active');
        }
        $(target).addClass('active');
        $(tabsContent[$(target).index()]).addClass('active');

        target.parentElement.classList.remove('toggle');

        const parent = $('.select-button');
        parent.attr('data-type', target.getAttribute('data-type'));
        parent.text(target.innerText);
    })

    let nameFirstCalc = $('#name-first-calcform');
    let phoneFirstCalc = $('#phone-first-calcform');
    let emailFirstCalc = $('#email-first-calcform');
    let textareaFirstCalc = $('#textarea-first-calcform');

    let nameSecondCalc = $('#name-second-calcform');
    let phoneSecondCalc = $('#phone-second-calcform');
    let emailSecondCalc = $('#email-second-calcform');
    let textareaSecondCalc = $('#textarea-second-caclform');

    let nameCheckForm = $('#name-check-form');
    let phoneCheckForm = $('#phone-check-form');
    let emailCheckForm = $('#email-check-form');
    let textareaCheckForm = $('#textarea-check-form');

    const errorInput = $('.error-input');
    const calcForm = $('#first-sec-calc');
    const calculation = $('#calculation');
    const thirdSecCalc = $('#third-sec-calc');
    const calcButton = $('#calc-button');
    const calcButt = $('#calc-butt');
    const checkPriceForm = $('#check-price');
    const buttonCheck = $('.button-check-price');

    const onSubmit = function (name, phone, email, textarea, suffix) {
        let hasError = false;
        errorInput.hide();
        if (!name.val()) {
            name.next().show();
            hasError = true;
            name.css('border-color', 'red');
        }
        if (!phone.val()) {
            phone.next().show();
            hasError = true;
            phone.css('border-color', 'red');
        }
        if (!email.val()) {
            email.next().show();
            hasError = true;
            email.css('border-color', 'red');
        }
        if (!textarea.val()) {
            textarea.next().show();
            hasError = true;
            textarea.css('border-color', 'red');
        }
        if (name.val() && phone.val() && email.val() && textarea.val()) {
            hasError = false;
        }

        if (!hasError) {
            $.ajax({
                method: 'POST',
                url: 'https://testologia.site/checkout',
                data: {
                    name: name.val(),
                    phone: phone.val(),
                    email: email.val(),
                    textarea: textarea.val()
                }
            })
                .done(function (msg) {
                    if (msg.success) {
                        switch (suffix) {
                            case 1:
                                $('#calc-text-first-form').css('display', 'none');
                                $('#calc-form-first').css('display', 'none');
                                $('#first-thank-you').css('display', 'block');
                                break;
                            case 2:
                                $('#calc-text-second-form').css('display', 'none');
                                $('#calc-form-second').css('display', 'none');
                                $('#second-thank-you').css('display', 'block');
                                break;
                            default:
                                $('.check-price-title').css('display', 'none');
                                $('.check-price-text').css('display', 'none');
                                $('.check-price-form').css('display', 'none');
                                $('#third-thank-you').css('display', 'block');
                                break;
                        }
                    } else {
                        alert('Возникла ошибка!');
                    }
                });
        }
    };

    const inputs = {
        name: () => {
            nameFirstCalc.css('border-color', 'transparent');
            $('.error-input').hide();
        },

    }

    const hide = (element) => {
        element.val('');
        resetError(element);
    }

    const resetError = (element) => {
        element.css('border-color', 'transparent');
        $('.error-input').hide();
    }

    const onCloseForm = function (element) {
        element.css('display', 'none');
        $('body').css('overflow', 'auto');
        errorInput.hide();
        hide(nameFirstCalc);
        hide(phoneFirstCalc);
        hide(emailFirstCalc);
        hide(textareaFirstCalc);
        hide(nameSecondCalc);
        hide(phoneSecondCalc);
        hide(emailSecondCalc);
        hide(textareaSecondCalc);
        hide(nameCheckForm);
        hide(phoneCheckForm);
        hide(emailCheckForm);
        hide(textareaCheckForm);

        $('#calc-text-first-form').css('display', 'block');
        $('#calc-form-first').css('display', 'flex');
        $('#first-thank-you').css('display', 'none');

        $('#calc-text-second-form').css('display', 'block');
        $('#calc-form-second').css('display', 'flex');
        $('#second-thank-you').css('display', 'none');

        $('.check-price-title').css('display', 'block');
        $('.check-price-text').css('display', 'block');
        $('.check-price-form').css('display', 'flex');
        $('#third-thank-you').css('display', 'none');

        checkbox.forEach(item => {
            item.prop('checked', false);
        })
    };

    $('#first-calcform-button-submit').click((e) => {
        e.preventDefault();
        onSubmit(nameFirstCalc, phoneFirstCalc, emailFirstCalc, textareaFirstCalc, 1)
    });
    $('#second-calcform-button-submit').click((e) => {
        e.preventDefault();
        onSubmit(nameSecondCalc, phoneSecondCalc, emailSecondCalc, textareaSecondCalc, 2)
    });
    $('#check-form-button-submit').click((e) => {
        e.preventDefault();
        onSubmit(nameCheckForm, phoneCheckForm, emailCheckForm, textareaCheckForm, 3)
    });

    const checkbox = [
        $('.calc-form-checkbox'),
        // $('.calc-form-checkbox-second'),
        // $('.calc-form-checkbox-2'),
        // $('.calc-form-checkbox-second-2'),
    ];

    const closeClick = (element) => $('.calculation-form-close').click(() => onCloseForm(element));

    const onChange = function (event, control) {
        if (event.target.value) {
            resetError(control)
        }
    };

    const openForm = function (form, name, phone, email, textarea) {
        form.css('display', 'block');
        closeClick(form);
        name.on("change", (event) => onChange(event, name));
        phone.on("change", (event) => onChange(event, phone));
        email.on("change", (event) => onChange(event, email));
        textarea.on("change", (event) => onChange(event, textarea));
        $('body').css('overflow', 'hidden');
    };

    calculation.click(() => openForm (calcForm, nameFirstCalc, phoneFirstCalc, emailFirstCalc, textareaFirstCalc));

    calcButton.click(() => openForm (thirdSecCalc, nameSecondCalc, phoneSecondCalc, emailSecondCalc, textareaSecondCalc));
    calcButt.click(() => openForm (thirdSecCalc, nameSecondCalc, phoneSecondCalc, emailSecondCalc, textareaSecondCalc));

    buttonCheck.click(() => openForm (checkPriceForm, nameCheckForm, phoneCheckForm, emailCheckForm, textareaCheckForm));

    $('#footer-button').click(function () {
        const eMailSub = $('#footer-input');
        if (!eMailSub.val()) {
            eMailSub.css('border-color', 'red');
        } else {
            $('.footer-email-subscription-action').css('display', 'none');
            $('.footer-email-subscription-success').css('display', 'block');
        }
    });


    $('.burger').click(e => {
        $('#menu-first').addClass('open');
    });

    document.querySelectorAll('#menu-first *').forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu-first').classList.remove('open');
        }
    });

    const on = (listener, query, fn) => {
        document.querySelectorAll(query).forEach(item => {
            item.addEventListener(listener, el => {
                fn(el);
            })
        })
    };

    on('click', '.select-button', item => {
        const next = item.target.nextElementSibling;
        next.classList.toggle('toggle');
    });
}

