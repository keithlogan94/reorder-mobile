
var api = {};


api.commAPI = function (className, method, dataObject) {
    var whenDone = new $.Deferred();
    dataObject.apikey = 'ab4f1e8d-8de2-4bc4-9fbd-4868f61450f0';
    var data = $.extend({
        className: className,
        method: method
    }, dataObject);
    $.ajax({
        url: 'http://138.91.241.9/reorder/api/',
        method: 'POST',
        async: true,
        data: data
    }).done(function (res) {
        whenDone.resolve(JSON.parse(res));
    }).fail(function (res) {
        if (res.status === 501) {
            //user error
            ui.simpleDialog({message:res.responseText});
        }
        whenDone.reject();
    });
    return whenDone;
};

api.printErrors = function (errors) {
    errors.forEach(function (err) {
        console.error(err);
    });
};


api.validateInput = function (inputObject) {
    for (prop in inputObject) {
        var $elem = $('[name="'+prop+'"]');
        if ($elem.length === 0) throw prop + ' was not attached to elem';
        if ($elem.attr('pattern') != null) {
            var reg = new RegExp($elem.attr('pattern'));
            if (!reg.test()) {
                ui.simpleDialog({message:$elem.attr('title')});
                return false;
            }
        }
    }
    return true;
};

