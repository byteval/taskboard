Ext.define('TaskBoard.view.TaskColumnController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.taskcolumn',

    initFilteredStore: function (view) {
        var mainStore = view.lookupViewModel().getStore('tasks');
        var filteredStore = Ext.create('Ext.data.Store', {
            model: 'TaskBoard.model.Task',
            filters: [{
                property: 'status',
                value: view.status
            }]
        });

        var syncFiltered = function () {
            filteredStore.setData(mainStore.getRange());
        };

        mainStore.on('datachanged', syncFiltered);
        syncFiltered();

        return filteredStore;
    },

    addTaskCard: function (view, filteredStore) {
        view.removeAll();
        view.add({
            xtype: 'taskcard',
            reference: 'tasksView',
            store: filteredStore,
            listeners: {
                refresh: 'initDragSources',
                afterrender: 'initDragSources',
                scope: this
            }
        });
    },

    setupDropTarget: function (panel) {
        panel = panel || this.getView();
        panel.dropTarget = new Ext.dd.DropTarget(panel.getEl(), {
            group: 'task-cards',
            notifyDrop: function (ddSource, e, data) {
                var record = data && data.record;
                if (record && record.get('status') !== panel.status) {
                    record.set('status', panel.status);
                    return true;
                }
                return false;
            }
        });
    },

    initDragSources: function () {
        var view = this.getView();
        var dataview = view.down('taskcard');
        if (!dataview) {
            return;
        }
        var nodes = dataview.getNodes();
        this.clearDragSources(nodes);
        Ext.defer(function () {
            this.createDragSources(dataview);
        }, 100, this);
    },

    clearDragSources: function (nodes) {
        Ext.Array.forEach(nodes, function (node) {
            if (node.ddSource) {
                node.ddSource.destroy();
                delete node.ddSource;
            }
        });
    },

    createDragSources: function (dataview) {
        var nodes = dataview.getNodes();
        Ext.Array.forEach(nodes, function (node) {
            var record = dataview.getRecord(node);
            if (record && !node.ddSource) {
                node.ddSource = new Ext.dd.DragSource(node, {
                    group: 'task-cards',
                    record: record,
                    getDragData: function (e) {
                        return {
                            sourceEl: node,
                            repairXY: Ext.get(node).getXY(),
                            record: record
                        };
                    }
                });
            }
        });
    }
}); 