Ext.define('TaskBoard.view.TaskBoard', {
    extend: 'Ext.panel.Panel',
    xtype: 'taskboard',
    requires: [
        'TaskBoard.viewmodel.TaskBoardModel',
        'TaskBoard.view.TaskColumn'
    ],
    viewModel: {
        type: 'taskboard'
    },
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        { xtype: 'taskcolumn', status: 'PLAN', flex: 1, cls: 'taskcolumn' },
        { xtype: 'taskcolumn', status: 'IN PROGRESS', flex: 1, cls: 'taskcolumn' },
        { xtype: 'taskcolumn', status: 'TESTING', flex: 1, cls: 'taskcolumn' },
        { xtype: 'taskcolumn', status: 'DONE', flex: 1, cls: 'taskcolumn' }
    ]
}); 