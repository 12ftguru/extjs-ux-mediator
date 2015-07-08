Ext.define('Ext.ux.mixin.Mediator', {
  extend: 'Ext.Mixin',
  requires: ['Ext.ux.Mediator'],
  mixinConfig: {
    id: 'mediator',
    before: {
      init: 'doInit'
    }
  },
  /*
   * Something to remember here is that the scope for each of these
   * functions will be the component we've been mixed in to, and not
   * some "Mediator" object.
   */
  doInit: function() {
    /* So here, `this` is the component, not the mediator */
    var me = this;
    console.log('Initial Config', me.subscribe, me);
    if (Ext.isObject(me.subscribe)) {
      Ext.Object.each(me.subscribe, me.addSubscription, me);
    }
  },
  publish: function() {
    var me = this;
    return Ext.ux.mixin.MediatorContext.fireEvent.apply(Ext.ux.mixin.MediatorContext, arguments);
  },
  addSubscription: function(name, fn) {
    var me = this;
    if (Ext.isString(fn)) {
      if (Ext.isFunction(me[fn])) {
        fn = me[fn]
      } else {
        //<debug>
        console.warn('Creating Unknown Subscription', fn);
        //</debug>
        fn = me.warnFn;
      }
    }
    if (!Ext.isString(name)) {
      name = name.toString();
    }
    me.addManagedListener(Ext.ux.mixin.MediatorContext, name, fn, me);
  },
  warnFn: function() {
    //<debug>
    console.warn('Unknown Subscription', arguments, this);
    //</debug>
  }
});