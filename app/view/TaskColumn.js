Ext.define('TaskBoard.view.TaskColumn', {
    extend: 'Ext.panel.Panel',
    xtype: 'taskcolumn',
    requires: [
        'TaskBoard.view.TaskCard'
    ],
    layout: 'vbox',
    scrollable: true,
    initComponent: function () {
        this.title = this.status;

        // Получаем основное хранилище
        var mainStore = this.lookupViewModel().getStore('tasks');

        // Создаем новое хранилище с фильтром по статусу для текущей колонки
        var filteredStore = Ext.create('Ext.data.Store', {
            model: 'TaskBoard.model.Task',
            filters: [{
                property: 'status',
                value: this.status
            }]
        });

        // Синхронизируем данные из основного хранилища в фильтрованное
        var syncFiltered = function () {
            filteredStore.setData(mainStore.getRange());
        };

        mainStore.on('datachanged', syncFiltered);
        syncFiltered();

        this.items = [{
            xtype: 'taskcard',
            reference: 'tasksView',
            store: filteredStore,
            listeners: {
                refresh: this.initDragSources,
                afterrender: this.initDragSources,
                scope: this
            }
        }];

        this.callParent(arguments);
        this.on('afterrender', this.setupDropTarget, this);
    },
    /**
     * Настраивает DropTarget для приёма перетаскиваемых карточек задач
     */
    setupDropTarget: function (panel) {
        panel.dropTarget = new Ext.dd.DropTarget(panel.getEl(), {
            group: 'task-cards',

            notifyDrop: function (ddSource, e, data) {
                var record = data && data.record;

                // Сохраняем статус таски если он изменился
                if (record && record.get('status') !== panel.status) {
                    record.set('status', panel.status);

                    if (record.store) {
                        record.store.sync();
                    }

                    return true;
                }

                return false;
            }
        });
    },
    /**
     * Инициализирует DragSource для всех тасков
     */
    initDragSources: function () {
        var dataview = this.down('taskcard');
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
                            repairXY: Ext.fly(node).getXY(),
                            record: record
                        };
                    }
                });
            }
        });
    }
});
