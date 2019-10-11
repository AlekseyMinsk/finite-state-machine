class FSM {
    constructor(config) {  
        this.config = config;
        this.config.initial = config.initial
        this.config.activeState = config.initial;
        this.statesList = [config.initial];
        this.redoStatesList = [config.initial];
        this.lastAction = null;
        this.history = 0;
    }
    getState() {        
        return this.config.activeState;
    }
     
    changeState(state) {
        if(this.config.states[state]) {
            this.config.activeState = state;
            this.statesList.push(state);
            this.lastAction = null;
            this.history++;
        } else {
            error(function() {})
        }
    }

    trigger(event) {
        let currentState = this.getState();
        if(this.config.states[currentState].transitions[event]) {
            this.config.activeState = this.config.states[currentState].transitions[event];
            this.statesList.push(this.config.activeState);
            this.lastAction = null;
            this.history++;
        } else {
            error(function() {});    
        }
        return this.config.activeState;   

    }

    reset() {
      this.config.activeState = this.config.initial;
      this.statesList = [this.config.activeState];
    }
     
    getStates(event){
        let answer = [];
        for (let key in this.config.states) {
            if(this.config.states[key].transitions[event] || !event) {
                answer.push(key);
            }
        }
        return answer;
    }
     
    undo() {
        if(this.statesList.length > 1 && this.history) {
            this.redoStatesList.push(this.config.activeState);
            this.config.activeState = this.statesList[this.statesList.length - 2];
            this.statesList.pop();            
            this.lastAction = "undo";
            return true;      
        } else {   
            return false;
        }
    }
     
    redo() {
        if(this.redoStatesList.length > 1 && this.lastAction && this.history) {
            this.config.activeState = this.redoStatesList[this.redoStatesList.length - 1];
            this.redoStatesList.pop();
            this.statesList.push(this.config.activeState);
            return true;
        } else {
            return false;
        }
    }

    clearHistory() {
        this.history = 0
    }
}

module.exports = FSM;

