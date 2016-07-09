function ItemService(opt_items) {
    var items = opt_items || [];

    this.list = function () {
        return items;
    };
    this.add = function (item) {
        items.push(item);
    };
}

angular.module('notesApp', [])
    .provider('ItemService', function () {
        var haveDefaultItems = true;

        this.disableDefaultItems = function () {
            haveDefaultItems = false;
        };

        // Esta funcion obtiene nuestras dependencias, no el Provider de arriba.
        this.$get = [function () {
            var optItems = [];
            if (haveDefaultItems) {
                optItems = [
                    { id: 1, label: 'Item 0' },
                    { id: 2, label: 'Item 1' }
                ];
            }
            return new ItemService(optItems);
        }];
    })
    .config(['ItemServiceProvider', function (ItemServiceProvider) {
        // Para ver como el provider puede cambiar la configuracion,
        // cambia el valor de ShouldHaveDefaults a true y ejecuta el ejemplo.
        var ShouldHaveDefaults = true;

        // Obtener configuracion desde el servidor 
        // Definir ShouldHaveDefaults de alguna forma
        // Asume que cambia mágicamente por ahora.
        if (!ShouldHaveDefaults) {
            ItemServiceProvider.disableDefaultItems();
        }
    }])
    .controller('MainCtrl', [function () {
        var self = this;
        self.tab = 'first';
        self.open = function (tab) {
            self.tab = tab;
        };
    }])
    .controller('SubCtrl', ['ItemService', function (ItemService) {
        var self = this;
        self.list = function () {
            return ItemService.list();
        };

        self.add = function () {
            ItemService.add({
                id: self.list().length + 1,
                label: 'Item ' + self.list().length
            });
        };
    }]);