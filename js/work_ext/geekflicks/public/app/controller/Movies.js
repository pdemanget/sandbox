/**
 * The Movies controller.
 */
Ext.define("GeekFlicks.controller.Movies", {
    extend: 'Ext.app.Controller',

    models: [
        'Movie'
    ],

    stores: [
        'Movies'
    ],

    views:  [
        'Movies'
    ],

    init: function () {
        this.control({
            'movieseditor': {
                render: this.onEditorRender,
                edit: this.afterMovieEdit,
                movieEdit: this.onMovieEdit,
                movieDelete: this.onMovieDelete
            },
            'movieseditor button': {
                click: this.addMovie
            }
        });
    },

    onEditorRender: function () {
        //cache a reference to the moviesEditor and rowEditor
        this.moviesEditor = Ext.ComponentQuery.query('movieseditor')[0];
        this.rowEditor = this.moviesEditor.rowEditor;
    },
    
    onMovieEdit: function (evtData) {
        var movieStore = this.getStore('Movies');
        var record = movieStore.getAt(evtData.rowIndex);
        if(record) {
            this.rowEditor.startEdit(record, this.moviesEditor.columns[evtData.colIndex]);
        }
    },

    onMovieDelete: function (evtData) {
        console.log("deleteMovie", evtData.rowIndex, evtData.colIndex);
        var movieStore = this.getStore('Movies');
        var record = movieStore.getAt(evtData.rowIndex);
        if(record) {
            movieStore.remove(record);
            movieStore.sync();
        }
    },

    afterMovieEdit: function () {
        var movieStore = this.getStore('Movies');
        movieStore.sync();
    },


    addMovie: function () {
        var newMovie,
            movieStore = this.getStore('Movies');

        //add blank item to store -- will automatically add new row to grid
        newMovie = movieStore.add({
            title: '',
            year: ''
        })[0];

        //TODO: remove added row if edit is cancelled
        this.rowEditor.startEdit(newMovie, this.moviesEditor.columns[0]);

    }

});
