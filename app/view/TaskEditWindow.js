Ext.define('TaskBoard.view.TaskEditWindow', {
    extend: 'Ext.window.Window',
    modal: true,
    width: 400,
    layout: 'fit',
    items: [{
        xtype: 'form',
        reference: 'editForm',
        bodyPadding: 10,
        items: [
            { name: 'number', fieldLabel: 'Номер задачи', xtype: 'textfield', allowBlank: false },
            { name: 'title', fieldLabel: 'Название', xtype: 'textfield', allowBlank: false },
            { name: 'name', fieldLabel: 'Имя', xtype: 'combo', store: ['Андрей', 'Сергей', 'Мария'], forceSelection: true },
            { name: 'status', fieldLabel: 'Статус', xtype: 'combo', store: ['PLAN', 'IN PROGRESS', 'TESTING', 'DONE'], forceSelection: true },
            { name: 'priority', fieldLabel: 'Важность', xtype: 'combo', store: ['MUST', 'SHOULD', 'COULD'], forceSelection: true },
            { name: 'date', fieldLabel: 'Дата', xtype: 'datefield', format: 'Y-m-d' }
        ]
    }],
    buttons: [
        {
            text: 'Сохранить',
            handler: function (btn) {
                var win = btn.up('window');
                var form = win.down('form');
                var rec = form.getRecord();
                if (form.isValid()) {
                    form.updateRecord(rec);
                    rec.store.sync();
                    win.close();
                }
            }
        },
        { text: 'Отмена', handler: function (btn) { btn.up('window').close(); } }
    ]
}); 