import * as Inscribe from "screeps-inscribe";
import * as Config from "settings/config";

import * as M from "settings/memory";

export function log_info() {
  // Periodic logging of useful info
  if (Game.time % 100 === 0) {
    // CPU: limit: 30, tickLimit: 500, bucket: 10000, used: 4.08803
    console.log(
      `[${Inscribe.color(Config.roomName, "skyblue")}]| Game-Tick: ${Game.time}` + "| CPU Used: " + Game.cpu.getUsed()
    );
  }
}

export function CpuUsedParsing(): void {
  let stringified = JSON.stringify(Memory);
  let startCpu = Game.cpu.getUsed();
  JSON.parse(stringified);
  console.log(`[${Inscribe.color("CPU spent on Memory parsing:" + (Game.cpu.getUsed() - startCpu), "Blue")}]`);
}

export function logFive(): boolean {
  if (Game.time % 100 === 0) {
    return true;
  } else {
    return false;
  }
}
export function clearStaleCreepMemory() {
  if (Game.time % 100 === 0) {
    // log.info("Checking creep mem: " + Game.time);
    for (const name in Memory.creeps) {
      if (!Game.creeps[name]) {
        console.log(`[${Inscribe.color("Clearing non-existing creep memory:" + name, "Blue")}]`);
        delete Memory.creeps[name];
      }
    }
  }
}

export function memoryInit() {
  console.log(`[${Inscribe.color("Initing Game", "Blue")}]`);
  delete Memory.flags;
  delete Memory.spawns;
  delete Memory.creeps;
  delete Memory.rooms;

  const mem = M.m();
  mem.creeps = {};
  mem.rooms = {};

  mem.uuid = 0;
  // mem.logLevel = M.LogLevel.Low;
  mem.memVersion = M.MemoryVersion;
}
