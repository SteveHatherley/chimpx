chimpx.grid.Lists = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'chimpx-grid-lists'
        ,url: chimpx.config.connector_url
        ,baseParams: {
            action: 'mgr/list/getlist'
        }
        ,fields: [
            'id','web_id','name','date_created','member_count','stats'
        ]
        ,autoHeight: true
        ,paging: true
        ,remoteSort: true
        ,columns: [{
            header: _('chimpx.list_name')
            ,dataIndex: 'name'
            ,width: 250
        },{
            header: _('chimpx.list_member_count')
            ,dataIndex: 'member_count'
            ,width: 50
        },{
            header: _('chimpx.list_date_created')
            ,dataIndex: 'date_created'
            ,width: 100
        }]
    });
    chimpx.grid.Lists.superclass.constructor.call(this,config);
};
Ext.extend(chimpx.grid.Lists,MODx.grid.Grid, {
    getMenu: function(){
        var m = [{
                text: _('chimpx.view_member_list')
                , handler: this.listMembers
        }]
        this.addContextMenuItem(m);
        return true;
    },
    listMembers: function(btn, e){
        if (!this.menu.record || !this.menu.record.id) return false;
        var r = this.menu.record;




    }
});
Ext.reg('chimpx-grid-lists',chimpx.grid.Lists);