import { action, observable } from 'mobx'

class GlobalStore {
  @observable startup = false;

  @action setStart = (value) => {
    this.startup = value;
  }
}

const global = new GlobalStore();

export default global;
// const globalStore = observable({
//   startup: false,
//   setStart(value) {
//     this.startup = value
//   }
// })
