define('scheduling.tasks.model',["app", "backbone", "core/dataGrid"], function (app, Backbone, DataGrid) {

    var Model = Backbone.Model.extend({});

    return Backbone.Collection.extend({

        initialize: function () {
            var self = this;
            this.filter = new DataGrid.Filter.Base();
            this.filter.bind("apply", function () {
                self.fetch();
            });
        },

        parse: function (data) {
            if (this.meta && this.meta["@odata.count"])
                this.filter.set("totalCount", this.meta["@odata.count"]);

            return data;
        },

        url: function () {
            var qs = this.filter.toOData();
            qs.$orderby = "finishDate desc";
            qs.$filter = "scheduleShortid eq '" + this.scheduleShortid + "'";

            return "odata/tasks?" + $.param(qs);
        },

        model: Model
    });
});




define('scheduling.model',["app", "core/basicModel", "underscore", "scheduling.tasks.model"], function (app, ModelBase, _, TasksModel) {

    return ModelBase.extend({

        fetch: function (options) {
            var self = this;

            this.tasks.scheduleShortid = self.get("shortid");

            function fetchSchedule(options) {
                app.dataProvider.get("odata/templates").then(function (templates) {
                    self.templates = templates.map(function (t) {
                        return {shortid: t.shortid, name: t.name};
                    });
                    self.templates.unshift({name: "-- select template --"});
                    if (self.get("shortid")) {
                        return app.dataProvider.get("odata/schedules?$filter=shortid eq '" + self.get("shortid") + "'").then(function (schedules) {
                            var schedule = schedules[0];
                            self.set(schedule);
                            self.set("templateName", _.findWhere(templates, {shortid: schedule.templateShortid}).name);
                            options.success();
                        });
                    } else {
                        self.set("templateName", "-- select template --");
                        options.success();
                    }
                });
            }

            fetchSchedule({
                success: function () {
                    self.trigger("sync");
                    if (self.tasks.scheduleShortid) {
                        self.tasks.fetch(options);
                    } else {
                        options.success();
                    }
                }
            });
        },

        odata: "schedules",

        defaults: {
            enabled: true
        },

        initialize: function () {
            this.tasks = new TasksModel();
        },

        toString: function () {
            return "Schedule " + (this.get("name") || "");
        }
    });
});
define('scheduling.list.model',["app", "backbone", "core/dataGrid", "scheduling.model"], function (app, Backbone, DataGrid, DataModel) {
    return Backbone.Collection.extend({

        url: function () {
            var qs = this.filter.toOData();
            qs.$orderby = "modificationDate desc";
            return "odata/schedules?" + $.param(qs);
        },

        initialize: function () {
            var self = this;
            this.filter = new DataGrid.Filter.Base();
            this.filter.bind("apply", function () {
                self.fetch();
            });
        },

        parse: function (data) {
            if (this.meta && this.meta["@odata.count"])
                this.filter.set("totalCount", this.meta["@odata.count"]);

            return data;
        },

        model: DataModel
    });
});




define('scheduling.list.view',["marionette", "core/dataGrid", "core/view.base"], function (Marionette, DataGrid, ViewBase) {
    return ViewBase.extend({
        template: "scheduling-list",

        initialize: function () {
            this.listenTo(this.collection, "sync", this.render);
            this.listenTo(this.collection, "remove", this.render);
        },

        onDomRefresh: function () {
            this.dataGrid = DataGrid.show({
                collection: this.collection,
                filter: this.collection.filter,
                idKey: "shortid",
                onShowDetail: function (id) {
                    window.location.hash = "extension/scheduling/detail/" + id;
                },
                el: $("#schemaGridBox"),
                headerTemplate: "scheduling-list-header",
                rowsTemplate: "scheduling-list-rows"
            });
        }
    });
}); 
define('scheduling.list.toolbar.view',["jquery", "app", "core/utils", "core/view.base", "underscore"],
    function ($, app, Utils, LayoutBase) {
        return LayoutBase.extend({
            template: "scheduling-list-toolbar",
            
            initialize: function () {
            },
         
            
            events: {
                "click #deleteCommand": "deleteCommand"
            },
            
            deleteCommand: function() {
                this.contentView.dataGrid.deleteItems();
            }
        });
    });


define('scheduling.detail.view',["marionette", "core/view.base", "underscore", "core/dataGrid", "jquery", "app"], function(Marionette, ViewBase, _, DataGrid, $, app) {
    return ViewBase.extend({
        template: "scheduling-detail",

        initialize: function() {
            var self = this;
            _.bindAll(this, "getTemplates");
            this.listenTo(this.model, "sync", this.render);
        },

        getTemplates: function () {
            return this.model.templates;
        },

        validateLeaving: function() {
            return !this.model.hasChangesSyncLastSync();
        },

        onDomRefresh: function () {
            var self = this;
            this.dataGrid = DataGrid.show({
                collection: this.model.tasks,
                filter: this.model.tasks.filter,
                idKey: "_id",
                el: $("#tasksGridBox"),
                headerTemplate: "scheduling-tasks-header",
                rowsTemplate: "scheduling-tasks-rows",
                showSelection: false,
                showSearch: false,
                onRender: function() {
                    self.$el.find(".reportDownload").click(function() {
                        if ($(this).attr("data-error")) {
                            $.dialog({
                                header: "Error",
                                content: $(this).attr("data-error"),
                                hideSubmit: true,
                                error: true
                            });
                            return;
                        }
                        var taskId = $(this).attr("data-id");
                        app.dataProvider.get("odata/reports?$filter=taskId eq '" + taskId + "'").then(function(reports) {
                            var report = reports[0];
                            window.open(app.serverUrl + "reports/" + report._id + "/content", "_blank");
                        });
                    });
                }
            });
        }
    });
});
define('scheduling.toolbar.view',["jquery", "app", "core/utils", "core/view.base"],
    function ($, app, Utils, LayoutBase) {
        return LayoutBase.extend({
            template: "scheduling-toolbar",

            initialize: function () {
                $(document).on('keydown.data-detail', this.hotkey.bind(this));
            },

            events: {
                "click #saveCommand": "save"
            },

            save: function () {
                if (!this.validate())
                    return;

                var self = this;
                this.model.save({}, {
                    success: function () {
                        app.trigger("schedule-saved", self.model);
                        self.model.fetch({
                            success: function () {
                                self.contentView.render();
                            }
                        });
                    },
                    error: function(m, e) {
                        e.handled = true;
                        $.dialog({
                            header: "Error",
                            content: "Saving Schedule failed. Maybe you have wrong cron syntax.",
                            hideSubmit: true,
                            error: true
                        });
                    }
                });
            },

            hotkey: function (e) {
                if (e.ctrlKey && e.which === 83) {
                    this.save();
                    e.preventDefault();
                    return false;
                }
            },

            onValidate: function () {
                var res = [];

                if (!this.model.get("name"))
                    res.push({
                        message: "Name cannot be empty"
                    });

                if (!this.model.get("cron"))
                    res.push({
                        message: "Cron cannot be empty"
                    });

                if (!this.model.get("templateShortid"))
                    res.push({
                        message: "Choose a template"
                    });

                return res;
            },

            onClose: function () {
                $(document).off(".schedule-detail");
            }
        });
    });
define(["app", "marionette", "backbone",
        "scheduling.list.model", "scheduling.list.view", "scheduling.list.toolbar.view",
        "scheduling.model", "scheduling.detail.view",
        "scheduling.toolbar.view"],
    function (app, Marionette, Backbone, ListModel, ListView, ListToolbarView, Model, DetailView,
              ToolbarView) {

        app.module("scheduling", function (module) {
            var Router = Backbone.Router.extend({
                initialize: function () {
                    app.listenTo(app, "schedule-saved", function (model) {
                        window.location.hash = "/extension/scheduling/detail/" + model.get("shortid");
                    });
                },

                routes: {
                    "extension/scheduling/list": "scheduling",
                    "extension/scheduling/detail/:id": "schedulingDetail",
                    "extension/scheduling/detail": "schedulingDetail"
                },

                scheduling: function () {
                    this.navigate("/extension/scheduling/list");

                    var model = new ListModel();
                    app.layout.showToolbarViewComposition(new ListView({ collection: model }), new ListToolbarView({ collection: model }));
                    model.fetch();
                },

                schedulingDetail: function (id) {
                    var model = new Model();

                    if (id != null) {
                        model.set("shortid", id);
                    }

                    model.fetch({
                        success: function () {
                            app.layout.showToolbarViewComposition(new DetailView({model: model}), new ToolbarView({model: model}));
                        }
                    });
                }
            });

            app.scheduling.on("created", function () {
                app.data.router.scheduling();
            });

            app.scheduling.router = new Router();

            app.on("menu-render", function (context) {
                if (!app.settings.tenant || app.settings.tenant.isAdmin)
                    context.result += "<li><a href='#/extension/scheduling/list'>Scheduling</a></li>";
            });

            app.on("menu-actions-render", function (context) {
                if (!app.settings.tenant || app.settings.tenant.isAdmin)
                    context.result += "<li><a id='createScheduleCommand' href='#/extension/scheduling/detail' class='validate-leaving'>Create Schedule</a></li>";
            });
        });
    });
