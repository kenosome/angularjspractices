angular
    .module('notesApp', [])
    .controller('LoginCtrl', ['$http', function ($http) {
        var self = this;
        self.user = {};
        self.message = 'Please Login';
        self.login = function () {
            $http.post('http://localhost:8000/api/login', self.user)
                .then(function (response) {
                    self.message = response.data.msg;
                });
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        //Cada POST data se convierte al estilo JQuery
        $httpProvider.defaults.transformRequest.push(
            function (data) {
                var requestStr;
                if (data) {
                    data = JSON.parse(data);
                    for (var key in data) {
                        if (requestStr) {
                            requestStr += '&' + key + '=' + data[key];
                        }
                        else {
                            requestStr = key + '=' + data[key];
                        }
                    }
                }
                return requestStr;
            }
        );
        // Definir el Content Type como FORM para todas las peticiones POST
        // Esto no lo hace para las peticiones GET
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }]);