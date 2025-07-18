Ext.define('TaskBoard.view.TaskColumn', {
    extend: 'Ext.panel.Panel',
    xtype: 'taskcolumn',
    requires: [
        'TaskBoard.view.TaskCard'
    ],
    layout: 'vbox',
    scrollable: true,
    styleUrls: [
        'TaskColumn.scss'
    ],
    controller: 'taskcolumn',
    listeners: {
        afterrender: 'setupDropTarget'
    },
    initComponent: function () {
        this.title = this.status;
        this.callParent(arguments);
        this.getController().addTaskCard(this, this.getController().initFilteredStore(this));
    },
});
