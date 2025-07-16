/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
function generateInitialTasks() {
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
}

Ext.define('TaskBoard.Application', {
    extend: 'Ext.app.Application',
    name: 'TaskBoard',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
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
        const store = Ext.create('TaskBoard.store.TaskStore');

        if (store && store.getCount() === 0) {
            var tasks = generateInitialTasks();
            store.add(tasks);
            store.sync();
        }

        Ext.create('TaskBoard.view.TaskBoard', {
            renderTo: Ext.getBody(),
            height: '100vh',
            width: '100vw'
        });
    }
});
