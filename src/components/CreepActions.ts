import * as Config from "settings/config";

import * as Memry from "settings/memory";

// http://codegists.com/code/screeps-source-keeper-lair/

// A wrapper for `Creep.moveTo()`.
export function moveTo(creep: Creep, target: Structure | RoomPosition): number {
  let result: number = 0;

  // Execute moves by cached paths at first
  result = creep.moveTo(target);

  return result;
}

// Returns true if the `ticksToLive` of a creep has dropped below the renew limit set in config.
export function needsRenew(creep: Creep): boolean {
  if (creep.ticksToLive !== undefined) {
    return creep.ticksToLive < Config.DEFAULT_MIN_LIFE_BEFORE_NEEDS_REFILL;
  } else {
    return false;
  }
}

// Shorthand method for `renewCreep()`.
export function tryRenew(creep: Creep, spawn: StructureSpawn): number {
  return spawn.renewCreep(creep);
}

// Moves a creep to a designated renew spot (in this case the spawn).
export function moveToRenew(creep: Creep, spawn: StructureSpawn): void {
  if (tryRenew(creep, spawn) === ERR_NOT_IN_RANGE) {
    creep.moveTo(spawn);
  }
}

// Attempts transferring available resources to the creep.
export function getEnergy(creep: Creep, roomObject: RoomObject): void {
  let energy: Resource = <Resource>roomObject;

  if (energy) {
    if (creep.pos.isNearTo(energy)) {
      creep.pickup(energy);
    } else {
      moveTo(creep, energy.pos);
    }
  }
}

// Returns true if a creep's `working` memory entry is set to true, and false otherwise.
export function canWork(creep: Creep): boolean {
  let working = creep.memory.working;

  if (working && _.sum(creep.carry) === 0) {
    creep.memory.working = false;
    return false;
  } else if (!working && _.sum(creep.carry) === creep.carryCapacity) {
    creep.memory.working = true;
    return true;
  } else {
    return creep.memory.working;
  }
}
