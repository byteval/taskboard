Ext.define('TaskBoard.viewmodel.TaskBoardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.taskboard',
    requires: [
        'TaskBoard.model.Task',
        'TaskBoard.store.TaskStore'
    ],
    data: {},
    stores: {
        tasks: {
            type: 'taskstore'
        }
    }
}); 