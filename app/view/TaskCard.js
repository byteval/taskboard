Ext.define('TaskBoard.view.TaskCard', {
    extend: 'Ext.view.View',
    xtype: 'taskcard',
    requires: [
        'TaskBoard.view.TaskEditWindow'
    ],
    cls: 'task-card-view',
    itemTpl: [
        '<div class="task-card {priorityClass}">',
        '<div class="task-id">{number}</div>',
        '<div class="task-title">{title}</div>',
        '</div>'
    ],
    itemSelector: 'div.task-card',
    listeners: {
        itemclick: function(view, record, item, index, e) {
            var win = Ext.create('TaskBoard.view.TaskEditWindow', {
                viewModel: { data: { task: record } }
            });
            win.down('form').loadRecord(record);
            win.show();
        }
    },
    prepareData: function(data) {
        data.priorityClass = data.priority ? 'priority-' + data.priority.toLowerCase() : '';
        return data;
    }
}); 