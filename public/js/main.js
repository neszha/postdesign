/* eslint-disable func-names */
/* global $, AOS */

// Open Sub Menu
$('.drp_btn').click(function () {
    $(this).siblings('.sub_menu').slideToggle();
});

// Preloader JS
function preloader_fade() {
    $('#preloader').fadeOut('slow');
}

$(document).ready(() => {
    window.setTimeout(preloader_fade(), 500); // call fade in .5 seconds
});

// All Slider Js
$('#screen_slider').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    autoplay: true,
    smartSpeed: 2500,
    center: true,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 5,
        },
    },
});

// Pricing Section Year Month Jquery
$(document).ready(() => {
    $('.tog_block').click(() => {
        $('.tog_btn').toggleClass('month_active');
        $('.month').toggleClass('active');
        $('.years').toggleClass('active');

        $('.monthly_plan').toggleClass('active');
        $('.yearly_plan').toggleClass('active');
    });
});

$(document).ready(() => {
    // Add minus icon for collapse element which is open by default
    $('.collapse.show').each(function () {
        $(this)
            .prev('.card-header')
            .find('.icon_faq')
            .addClass('icofont-minus')
            .removeClass('icofont-plus');
    });

    // Toggle plus minus icon on show hide of collapse element
    $('.collapse').on('show.bs.collapse', function () {
        $(this).prev('.card-header').find('.icon_faq').removeClass('icofont-plus').addClass('icofont-minus');
    })
        .on('hide.bs.collapse', function () {
            $(this).prev('.card-header').find('.icon_faq').removeClass('icofont-minus').addClass('icofont-plus');
        });

    $('.collapse').on('show.bs.collapse', function () {
        $(this).prev('.card-header').children('h2').children('.btn').addClass('active');
    })
        .on('hide.bs.collapse', function () {
            $(this).prev('.card-header').children('h2').children('.btn').removeClass('active');
        });
});

// Scrool-top
$(document).ready(() => {
    const toTop = $('.go_top');
    toTop.on('click', () => {
        $('html, body').animate({ scrollTop: $('html, body').offset().top }, 400);
    });

    $(window).scroll(function () {
    // declare variable
        const topPos = $(this).scrollTop();

        // if user scrolls down - show scroll to top button
        if (topPos > 750) {
            $(toTop).css('opacity', '1');
        } else {
            $(toTop).css('opacity', '0');
        }
    });
});

// Fix Header Js
$(window).scroll(() => {
    if ($(window).scrollTop() >= 250) {
        $('header').addClass('fix_style');
    } else {
        $('header').removeClass('fix_style');
    }
    if ($(window).scrollTop() >= 260) {
        $('header').addClass('fixed');
    } else {
        $('header').removeClass('fixed');
    }
});

// Close btn on click
$(document).ready(() => {
    $('.navbar-toggler').click(function () {
        if ($(this).children('span').children('.ico_menu').hasClass('icofont-navigation-menu')) {
            $(this).children('span').children('.ico_menu').removeClass('icofont-navigation-menu').addClass('icofont-close');
        } else {
            $(this).children('span').children('.ico_menu').removeClass('icofont-close').addClass('icofont-navigation-menu');
        }
    });
});

(function () {
    $('.toggle-wrap').on('click', function () {
        $(this).toggleClass('active');
        $('aside').animate({ width: 'toggle' }, 200);
    });
}());

// INITIALIZE AOS
AOS.init();
