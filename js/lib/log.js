define(function () {    
    var log = {};    
    var _this = {};        

    _this.general = {
        max_plateau: 'Se ha sobrepasado el máximo de celdas permitidas.'
    };

    log.message = function (key) {
        if (_this[key]) {
            console.log(_this[key]);
        }        
    }
    return log;
});