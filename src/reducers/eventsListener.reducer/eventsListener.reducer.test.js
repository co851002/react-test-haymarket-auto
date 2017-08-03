import eventsListener from './index.js';
import * as Actions from 'actionTypes';

/**
* Test for <eventsListener /> hoc component.
* @test {eventsListener}
*/
describe('EventsListener reducer', () => {

  it('should return initial state null', () => {
    expect(eventsListener()).to.deep.equal(null);
  });

  it('should return correct state with initialState = null and the window object', () => {
    const initialState = null;

    const stateToCompare = {
      'click': {
        'fakeComp': {
          '[object Window]' : 1
        }
      }
    };

    const resultState = eventsListener(initialState, {
      type: Actions.ADD_EVENTS_LISTENER,
      eventType: 'click',
      compName:  'fakeComp',
      target: window.toString()
    });

    expect(resultState).to.deep.equal( stateToCompare );
        
  }); 

  it('should return correct state if the same event (click) is called on the same obj (fakeComp), but with a different target', () => {
    const initialState = null;

    const stateToCompare = {
      'click': {
        'fakeComp': {
          '[object HTMLDocument]' : 1
        }
      }
    };

    const resultState = eventsListener(initialState, {
      type: Actions.ADD_EVENTS_LISTENER,
      eventType: 'click',
      compName:  'fakeComp',
      target: document.toString()
    });

    expect(resultState).to.deep.equal( stateToCompare );

    //Now the state is = stateToCompare, is not null anymore
    const newResultState = eventsListener(stateToCompare, {
      type: Actions.ADD_EVENTS_LISTENER,
      eventType: 'click', //eventType is the same
      compName:  'fakeComp', //compName is the same
      target: window.toString() //target is different!!
    });

    //New state!!
    const stateToCompare2 = {
      'click': {
        'fakeComp': {
          '[object HTMLDocument]' : 1,
          '[object Window]' : 1
        }
      }
    };    

    expect(newResultState).to.deep.equal( stateToCompare2 );
        
    //Let's double check that it increments the reference count on something already there
    const newResultState3 = eventsListener(stateToCompare2, {
      type: Actions.ADD_EVENTS_LISTENER,
      eventType: 'click', //eventType is the same
      compName:  'fakeComp', //compName is the same
      target: window.toString() //target is the same
    });

    const stateToCompare3 = {
      'click': {
        'fakeComp': {
          '[object HTMLDocument]' : 1, 
          '[object Window]' : 2,
        }
      }
    };
    //newResultState3 is the same as stateToCompare2
    expect(newResultState3).to.deep.equal( stateToCompare2 );
    //newResultState3 is NOT stateToCompare3
    expect(newResultState3).to.deep.equal( stateToCompare3 );

  }); 

  it('should remove the compname from the store when there is only one target in the store for the event/compname/target', () => {
    const initialState = {
      'click': {
        'fakeComp': {
          '[object Window]' : 1
        },
        'anotherComp': {
          '[object Window]' : 1
        }
      },
      'keypress': {
        'anotherComp': {
          '[object Window]' : 1
        }
      }
    };

    const stateToCompare = {
      'click': {
        'anotherComp': {
          '[object Window]' : 1
        }
      },
      'keypress': {
        'anotherComp': {
          '[object Window]' : 1
        }
      }
    };

    const resultState = eventsListener(initialState, {
      type: Actions.REMOVE_EVENTS_LISTENER,
      eventType: 'click',
      compName:  'fakeComp',
      target: '[object Window]'
    });

    expect(resultState).to.deep.equal(stateToCompare);
  });

  it('should remove the target from the store when there is more than one target in the store for the event/compname', () => {
    const initialState = {
      'click': {
        'fakeComp': {
          '[object Window]' : 1,
          '[object Document]' : 1
        },
        'anotherComp': {
          '[object Window]' : 1
        }
      },
      'keypress': {
        'anotherComp': {
          '[object Window]' : 1
        }
      }
    };

    const stateToCompare = {
      'click': {
        'fakeComp': {
          '[object Document]' : 1
        },        
        'anotherComp': {
          '[object Window]' : 1
        }
      },
      'keypress': {
        'anotherComp': {
          '[object Window]' : 1
        }
      }
    };

    const resultState = eventsListener(initialState, {
      type: Actions.REMOVE_EVENTS_LISTENER,
      eventType: 'click',
      compName:  'fakeComp',
      target: '[object Window]'
    });

    expect(resultState).to.deep.equal(stateToCompare);
  });

  it('should remove the event key from the store when there is only one compref for that event type', () => {
    const initialState = {
      'click': {
        'fakeComp': {
          '[object Window]' : 1
        }
      },
      'keypress': {
        'anotherComp': {
          '[object Window]' : 1
        }
      }
    };

    const stateToCompare = {
      'keypress': {
        'anotherComp': {
          '[object Window]' : 1
        }
      }
    };

    const resultState = eventsListener(initialState, {
      type: Actions.REMOVE_EVENTS_LISTENER,
      eventType: 'click',
      compName:  'fakeComp',
      target: '[object Window]'
    });

    expect(resultState).to.deep.equal(stateToCompare);
  });

  it('should reduce the reference count when more than once reference to the same target', () => {
    const initialState = {
      'click': {
        'fakeComp': {
          '[object Window]' : 2
        }
      }
    };

    const stateToCompare = {
      'click': {
        'fakeComp': {
          '[object Window]' : 1
        }
      }
    };

    const resultState = eventsListener(initialState, {
      type: Actions.REMOVE_EVENTS_LISTENER,
      eventType: 'click',
      compName:  'fakeComp',
      target: '[object Window]'
    });

    expect(resultState).to.deep.equal(stateToCompare);
  });

  it('should empty the store when there is only one compref and one event type', () => {
    const initialState = {
      'click': {
        'fakeComp': {
          '[object Window]' : 1
        }
      }
    };

    const resultState = eventsListener(initialState, {
      type: Actions.REMOVE_EVENTS_LISTENER,
      eventType: 'click',
      compName:  'fakeComp',
      target: '[object Window]'
    });

    expect(resultState).to.deep.equal(null);
  });
});