
var job_maker = require('job.maker');


var jobTypes = {
    'Job(Upgrade)': {
        'needs': {
            'Resource(CreepWithEnergy)': {'job': 'Job(GatherEnergy)', 'affinity': 'Affinity(Nearby)'},
            'Resource(Controller)': {'job': 'Job(CreateController)', 'affinity': 'Affinity(Nearby)'},
        },
        /**
         * @param {Creep} creepWithEnergy
         * @param {StructureController} controller
         */
        'method': function(creepWithEnergy, controller) {
            if (creepWithEnergy.upgradeController(controller) == ERR_NOT_IN_RANGE)
                creepWithEnergy.moveTo(controller)
            else
                return true
        }
    },
    'Job(GatherEnergy)': {
        'needs': {
            'Resource(CreepWithoutEnergy)': {'job': 'Job(SpawnCreep)', 'affinity': 'Affinity(Near)'},
            'Resource(EnergySource)': {'job': null, 'affinity': 'Affinity(Near)'},
        },
        'optional': {
            'Resource(FastEnergySource)': {}
        },
        'method': function(creepWithoutEnergy, energySource) {
            if (energySource.transferEnergy(creepWithoutEnergy) == ERR_NOT_IN_RANGE)
                creepWithoutEnergy.moveTo(energySource)
            
            return creepWithoutEnergy.carry.energy == creepWithoutEnergy.carryCapacity
        }
    }
}

var world = {}

function resourceExists(resource, world) {
    
}

function createSubJobs(job, world) {
    var jobType = jobTypes[job.name]
    
    if (!jobType) {
        console.log("Unknown job " + job.name)
        return
    }
    
    for (var need in jobType.needs) {
        var resource = resourceExists(need, world)
        if (!resource) {
            var newJob = jobType.needs[need].job
        }
    }
}

module.exports.loop = function () {
    var jobFlags = Game.flags
    var jobs = {}
    
    for (var name in Game.flags)
        if (name.startsWith('Job'))
            jobs[name] = Game.flags[name].memory
    
    for (var jobName in jobs) {
        var job = jobs[jobName]
        if (!job.name)
            job.name = jobName
    
        createSubJobs(job)
    }
    
    // var world = {}
    // world.structures = []
    // world.controllers = []
    
    // for (var structure_id in Game.structures) {
    //     var structure = Game.structures[structure_id]
    //     world.structures.push(structure)
    //     if (structure.structureType == STRUCTURE_CONTROLLER)
    //         world.controllers.push(structure)
    // }

    // var jobs = job_maker.createJobs(world)
    // var jobs_by_id = {}
    //for (var job of jobs)
    //    jobs_by_id[job.name] = job

    //for (var job of Memory.jobs)
    //    if (job.creep && jobs_by_id[job.name]) {
    //        jobs_by_id[job.name].creep = job.creep
    //    }

    if (jobs && jobs.length)
        console.log(jobs)
}
