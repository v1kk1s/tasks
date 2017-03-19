class Athlete {

  constructor({ strength = 0, endurance = 0 }) {
    this.strength = strength;
    this.endurance = endurance;
  }

  warmUp() {
    console.log('I am running');

    return this.endurance += 1;
  }

  training() {
    console.log('I am training');

    this.endurance += 5;
    this.strength += 5;

    return { strength: this.strength, endurance: this.endurance }
  }

  evangelism() {
    console.log('Training is cool!');
  }
}

class CrossFitter extends Athlete {

  constructor(props) {
    super(props);
  }

  warmUp() {
    // endurance * 2

    console.log('Im sweatin');

    return this.endurance;
  }

  training() {
    // everything * 2

    console.log('Im Niagara');

    return { endurance: this.endurance, strength: this.strength };
  }

  evangelism() {
    // parent's evangelism

    console.log('Let me tell you about our mighty lord - Burpee');
  }
}

const stallone = new Athlete({ strength: 1, endurance: 1});
const froning = new CrossFitter({ strength: 1, endurance: 1});
