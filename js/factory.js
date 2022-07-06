export class Factory {
    constructor() {
        this.binnacle = [];
        this.verbose = true
    }

    create(object, props) {
        // object index fallback
        if (!this.binnacle[object])
            this.binnacle[object] = [];
        // object instantiation
        const id = this.binnacle[object].length;
        const instanceFromType = new object({id, ...props})
        // object registration
        this.binnacle[object].push(instanceFromType);
        const lastElementFromType = this.binnacle[object][this.binnacle.length];
        // dispatch object
        this.verbose && console.log(`- ${lastElementFromType.name} - Created.`);
        return lastElementFromType;
    }

    test() {
        console.log('Factory test:');
    }
}
