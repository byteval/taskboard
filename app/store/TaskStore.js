Ext.define('TaskBoard.store.TaskStore', {
    extend: 'Ext.data.Store',
    alias: 'store.taskstore',
    model: 'TaskBoard.model.Task',
    autoLoad: true,
    autoSync: true,
    proxy: {
        type: 'localstorage',
        id: 'taskboard-storage'
    },
    sorters: [
        {
            property: 'name',
            direction: 'ASC'
        },
        {
            property: 'priority',
            direction: 'DESC',
            transform: function(priority) {
                switch(priority) {
                    case 'MUST': return 3;
                    case 'SHOULD': return 2;
                    case 'COULD': return 1;
                    default: return 0;
                }
            }
        }
    ]
});
