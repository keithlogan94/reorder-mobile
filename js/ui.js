


var ui = {};

$(function () {
    address.loadCountriesSelect($('.country-container'));
});

ui.showAccountCreation = function () {
    $('.create-account-info').removeAttr('hidden');
    $('.create-account-info').show();
    $('.next-buttons').hide();
};

ui.processLogin = function () {
    var loginObj = {
        reorder_username: $('#emailInput').val(),
        reorder_password: $('#passwordInput').val()
    };
    if (!loginObj.reorder_username.length)return;
    if (!loginObj.reorder_password.length)return;
    $.when(api.commAPI('AccountMethods','findAccount', loginObj)).done(function (res) {
       ui.showRecipesView();
    }).fail(function () {
        //nothing here
    });

};

ui.buttonPushed = function (which) {
    switch (which) {
        case 'create-account':
            ui.showAccountCreation();
            break;
        default:
            throw "no handler for button push";
    }
};

ui.processCreateAccount = function () {

    var createAccountObj = {
        firstName: $('#firstInput').val(),
        lastName: $('#lastInput').val(),
        phone: $('#phoneInput').val(),
        email: $('#emailInput').val(),
        password: $('#passwordInput').val()
    };
    $.when(api.commAPI('AccountMethods','createAccount', createAccountObj)).done(function (res) {
        /* successfully created account go to
        * logged in experience */
        ui.showRecipesView();
    }).fail(function () {
        //dont go to next view
    });

};

ui.cancelCreateAccount = function () {
    $.each($('input'), function (index, val) {
        $(val).val('');
    });

    $('.create-account-info').hide();
    $('.next-buttons').show();
};

ui.showRecipesView = function () {
    $('body')[0].style.backgroundImage = null;
    $('.view').hide();
    $('.recipe-view').show();
    $('.recipe-view').removeAttr('hidden');
};


ui.simpleDialog = function (obj) {
    if (obj.message === undefined) throw "obj.message must be set";
    if (obj.btnText === undefined) obj.btnText = 'Okay';
    if ($('#dialog').length === 0) throw 'could not find dialog html element';

    $("#dialog").html(obj.message);
    $( "#dialog" ).dialog({
        closeText:"Okay.",
        draggable: false,
        modal: true,
        buttons: [
            {
                text: obj.btnText,
                click: function() {
                    $( this ).dialog( "close" );
                }
            }
        ]
    });
};

ui.updateStateHtml = function (elem) {
    $.when(api.commAPI('NonLoginMethods','getCityStateCountryHtmlFromZip', {zip:elem.value}))
        .done(function (res) {
        $('#auto-fill-country-state-city').html(res.html);
    });
};











