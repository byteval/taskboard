/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('TaskBoard.Application', {
    extend: 'Ext.app.Application',
    name: 'TaskBoard',

    stores: [
        'TaskStore'
    ],

    generateInitialTasks: function() {
        console.log('generateInitialTasks');
        var names = ['Андрей', 'Сергей', 'Мария'];
        var priorities = ['MUST', 'SHOULD', 'COULD'];
        var statuses = ['PLAN', 'IN PROGRESS', 'TESTING', 'DONE'];
        var tasks = [];
        for (var i = 0; i < 10; ++i) {
            tasks.push({
                number: 'TSK-' + (1000 + i),
                title: 'Задача ' + (i + 1),
                name: names[Math.floor(Math.random() * names.length)],
                status: statuses[Math.floor(Math.random() * statuses.length)],
                priority: priorities[Math.floor(Math.random() * priorities.length)],
                date: Ext.Date.format(new Date(), 'Y-m-d')
            });
        }
        return tasks;
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },

    launch: function () {
        this.store = Ext.getStore('TaskStore');
        if (this.store && this.store.getCount() === 0) {
            this.store.add(this.generateInitialTasks());
        }
        Ext.create('TaskBoard.view.TaskBoard', {
            renderTo: Ext.getBody(),
            height: '100vh',
            width: '100vw'
        });
    }
});
