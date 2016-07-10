// Normalize the way energy is handled
Creep.prototype.transferEnergy = (target, amount) => this.transfer(target, RESOURCE_ENERGY, amount)
Source.prototype.transferEnergy = (target, amount) => target.harvest(this)
StructureContainer.prototype.transferEnergy = (target, amount) => this.transfer(target, RESOURCE_ENERGY, amount)


module.exports.createJobs = function(world) {
    var jobs = []
    
    //for (var c of world.controllers)
    //    jobs.push(new JobUpgradeController(c))

    return []// jobs
}


