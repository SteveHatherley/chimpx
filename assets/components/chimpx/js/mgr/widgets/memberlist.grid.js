chimpx.selectTest = function(e,i){
    console.log('selectTest');
    console.log(e);
    console.log(i);
};


chimpx.combo.Lists =  function(config){
    config = config || {};
    Ext.applyIf(config,{
        id: 'chimpx-combo-Lists'
        ,url: chimpx.config.connector_url
        ,baseParams: {
            action: 'mgr/list/cbolist'
        }
        ,fields: [
            'id','name'
        ],
        valueField: 'id',
        displayField: 'name'
    });
    chimpx.combo.Lists.superclass.constructor.call(this,config);
};
Ext.extend(chimpx.combo.Lists,MODx.combo.ComboBox);
Ext.reg('chimpx-combo-Lists',chimpx.combo.Lists);


var tb = new Ext.Toolbar({
    renderTo: document.body,
    width: 600,
    items: [
        {
            xtype: 'chimpx-combo-Lists',
            name: 'chimpx-combo-Lists',
            handle: this.filterLists
        },
        '->',
        {
            xtype: 'textfield',
            name: 'quick_new_fname',
            emptyText: 'First Name'
        },
        '-',
        {
            xtype: 'textfield',
            name: 'quick_new_lname',
            emptyText: 'Last Name'
        },
        '-',
        {
            xtype: 'textfield',
            name: 'quick_new_email',
            emptyText: 'Email'
        },
        '-',
        {
            xtype: 'button', // default for Toolbars, same as 'tbbutton'
            text: 'Quick Add',
            handler: function(btn, e){
                Ext.Msg.confirm('Hey, you have permission right?', 'This recipient has given me permission to add him/her to my MailChimp Managed List. ', function(cbtn, text){
                    console.log(cbtn);
                    if (cbtn == 'yes'){
                        alert('go ahead');
                    } else {
                        Ext.Msg.confirm('Oh, Do you want to ask for permission?', 'Legally speaking, you cannot add a user to your  mailing list without having received their express permission. Would you like to send a confirmation email to the user? Once confirmed  they will start appearing in this list. Please note if you do not send a confirmation email this user will be discarded.',
                        function(c2btn, text ){
                            if(c2btn == 'yes'){
                                // call chimpx.members.addMember
                            }else{
                                Ext.Msg('Action Canceled. No user was added.');
                            }
                        });
                    }
                });
            }
        }
    ],
    filterLists: function(btn, e){
        console.log('inside filterLists');
        console.log(btn);
        console.log(e);
    }
});

chimpx.grid.memberlist = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'chimpx-grid-memberList'
        ,url: chimpx.config.connector_url
        ,baseParams: {
            action: 'mgr/memberlist/getmembers'
        }
        ,tbar: tb
        ,fields: [
            'email','timestamp'
        ]
        ,autoHeight: true
        ,paging: true
        ,remoteSort: true
        ,columns: [{
            header: _('chimpx.member_email')
            ,dataIndex: 'email'
            ,width: 250
        },{
            header: _('chimpx.member_timestamp')
            ,dataIndex: 'timestamp'
            ,width: 100
        }]
    });
    chimpx.grid.memberlist.superclass.constructor.call(this,config);
};
Ext.extend(chimpx.grid.memberlist,MODx.grid.Grid);
Ext.reg('chimpx-grid-memberlist',chimpx.grid.memberlist);