import Vue from 'vue';

class EventBus {
    static eventBuses = {};
  
    static getEventBus(name) {
      if (!this.eventBuses[name]) {
        this.eventBuses[name] = new Vue();
      }
      return this.eventBuses[name];
    }
  
    static on(event, callback, name = 'default') {
      this.getEventBus(name).$on(event, callback);
    }
  
    static off(event, callback, name = 'default') {
      this.getEventBus(name).$off(event, callback);
    }
  
    static emit(event, ...args) {
      this.getEventBus('default').$emit(event, ...args);
    }
  }
  