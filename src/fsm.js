class FSM {
    constructor(config) {  
      this.conf = config;
      this.conf.activeState = this.conf.initial;
      this.stateArr = [];
      this.arrLength = 0;
      this.undoCall=0;
      this.notAvaible=0;

 }
    getState() {        
        return this.conf.activeState;
    }
     
    changeState(state) {
    this.undoCall=0;
    if ( state in this.conf.states) {
        this.conf.activeState = state;
        this.arrLength++;
        this.stateArr[this.arrLength] = state;        
    } else error(function() {});
    return this.conf.activeState;
    }

    trigger(event) {
         this.undoCall=0;
         var key = this.conf.activeState;
            if (this.conf.states[key].transitions[event] ){            
            this.conf.activeState = this.conf.states[key].transitions[event];
            this.arrLength++;
            this.stateArr[this.arrLength]= this.conf.activeState;
        }  else error(function() {});  
    this.notAvaible++;
            return this.conf.activeState;              
 }

    reset() {
        this.conf.activeState = this.conf.initial;
        return this.conf.activeState;    }
     
    getStates(event){
        var arr = [];
        var arr2= [];
        var i=0;      
        for(var key in this.conf.states){
            arr[i] = key;
            i++;
        }
         
            if(!event) return arr;
        for (var i=0, k=0; k<4; k++){
        if (this.conf.states[arr[k]].transitions[event]){
            arr2[i]=arr[k];
            i++;
        }
    }

        return arr2;
    }
     
    undo() {
        if ( !this.arrLength && this.undoCall != 0 || this.conf.activeState=="normal") 
            return false;
        else {
            if(this.arrLength == 1){
            this.conf.activeState = this.conf.initial;
            this.arrLength = 0;
            this.notAvaible--;
        } 
            else {
                this.arrLength--;
                this.conf.activeState = this.stateArr[this.arrLength];
        }
        }
        this.undoCall++;
            return true;
    }
     
    redo() {
        if(!this.arrLength && this.undoCall == 0) return false;
        else { if (this.notAvaible<2 && this.undoCall<1) return false;
            else{
        this.arrLength++;
        this.conf.activeState = this.stateArr[this.arrLength];
        this.undoCall--;
         return true;
     }
    }
    }

    clearHistory() {
    this.arrLength=0;
    this.notAvaible =0;
    this.undoCall=0.5;
    }
}

module.exports = FSM;

