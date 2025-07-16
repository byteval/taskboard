Ext.define('TaskBoard.model.Task', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'number', type: 'string' }, // TSK-XXXX
        { name: 'title', type: 'string' },
        { name: 'name', type: 'string' }, // Андрей, Сергей, Мария
        { name: 'status', type: 'string' }, // PLAN, IN PROGRESS, TESTING, DONE
        { name: 'priority', type: 'string' }, // MUST, SHOULD, COULD
        { name: 'date', type: 'date', dateFormat: 'Y-m-d' }
    ]
}); 