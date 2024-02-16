class HashMap {
  constructor(capacity, loadFactor = 0.75) {
    this.size = 0;
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.map = new Array(capacity);
  }

  hash(value) {
    let hash = 0;

    if(value.length === 0) {
      return hash;
    }
    for (let i = 0; i < value.length; i++) {
      const char = value.charCodeAt(i);
      hash ^= (hash * 13) + char;
    }

    return hash;
  }

  resize() {
    const newCapacity = this.capacity * 2;
    const newMap = new Array(newCapacity);
    this.size = 0;
    
    this.map.forEach(obj => {
      const {key, value} = obj;
      let adress = this.hash(key) % newCapacity;

      if(!newMap[adress]) {
        newMap[adress] = {key, value};
        this.size++;
      } else {
        newMap[adress] = {key, value};
      }
    });

    this.map = newMap;
    this.capacity = newCapacity;
  }

  set(key, value) {
    if((this.size + 1) / this.capacity > this.loadFactor) {
      this.resize();
    }

    let adress = this.hash(key) % this.capacity;

    if(!this.map[adress]) {
      this.map[adress] = {key, value};
      this.size++;
    } else {
      this.map[adress] = {key, value};
    }
  }

  display() {
    console.log("size:", this.size);
    console.log("Capacity:", this.capacity);
    console.log("Map:", this.map);
  }

  get(key) {
    let adress = this.hash(key) % this.capacity;
    if(this.map[adress].key === key) {
      return this.map[adress].value;
    } else {
      return null;
    }
  }
  
  has(key) {
    let adress = this.hash(key) % this.capacity;
    if(this.map[adress].key === key) {
      return true;
    }
    return false;
  }

  remove(key) {
    let adress = this.hash(key) % this.capacity;
    if(this.map[adress].key === key) {
      delete this.map[adress];
      this.size--;
    }
  }

  length() {
    return this.size;
  }

  clear() {
    this.capacity = 11;
    this.map = new Array(11);
    this.size = 0;
  }

  keys() {
    console.log("Map contains this keys: ");
    this.map.forEach(obj => console.log(`> ${obj.key}`));
    console.log("------------------------");
  }

  values() {
    console.log("Map contains this values: ");
    this.map.forEach(obj => console.log(`> ${obj.value}`));
    console.log("------------------------")
  }

  entries() {
    let hashArray = [];
    this.map.forEach(obj => {
      const { key, value } = obj;
      hashArray.push([key, value]);
    });
    return hashArray;
  }
}
 
hashMap_ = new HashMap(11);
hashMap_.set("name", 'Robin');
hashMap_.set("integer", 123);
hashMap_.set("animal", "Wolf");
hashMap_.set("work", "Doctor");
hashMap_.set("element", "Ice");
hashMap_.set("fire", "golem");
hashMap_.set("dragon", "toothless");
hashMap_.set("book", "tolkien");
hashMap_.set("441", "english");
hashMap_.values();
hashMap_.display();