/**
 * The Grid of Movies
 */
Ext.define('GeekFlicks.view.Movies', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.movieseditor',
    selType: 'rowmodel',
    rowEditor: Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 2
            }),
    store: 'Movies',

    initComponent: function () {
        var movieEditor = this;
        this.addEvents(['movieEdit', 'movieDelete']);
        this.columns = [
            {
                header: 'Title',
                dataIndex: 'title',
                editor: {
                    xtype: 'textfield',
                    allowBlank: true
                },
                flex: 1
            },
            {
                header: 'Year',
                dataIndex: 'year',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true
                },
                width: 100
            },
            {
                xtype:'actioncolumn', 
                width:50,
                items: [{
                    icon: 'images/edit.png',  // Use a URL in the icon config
                    tooltip: 'Edit',
                    handler: function(grid, rowIndex, colIndex) {
                        movieEditor.fireEvent('movieEdit', {
                            rowIndex: rowIndex,
                            colIndex: colIndex
                        });
                    }
                },
                {
                    icon: 'images/delete.png',
                    tooltip: 'Delete',
                    handler: function(grid, rowIndex, colIndex) {
                        movieEditor.fireEvent('movieDelete', {
                            rowIndex: rowIndex,
                            colIndex: colIndex
                        });
                    }                
                }]
            }
        ];
        this.plugins = [this.rowEditor];
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Add Movie'
                }
            ]
        }];
        this.callParent(arguments);
    }
});
