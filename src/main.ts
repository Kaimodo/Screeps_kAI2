import * as Config from "settings/config";
import { ErrorMapper } from "utils/ErrorMapper";
import * as utils from "utils/utils";

import { ConsoleCommands } from "utils/consolecommands";

import * as M from "settings/memory";

import * as RoomManager from "components/RoomManager";

import * as Inscribe from "screeps-inscribe";

import * as Traveler from "utils/traveler/traveler";

console.log(`[${Inscribe.color("New Script loaded", "red")}]`);
export const loop = ErrorMapper.wrapLoop(() => {
  if (M.m().memVersion === undefined || M.m().memVersion !== M.MemoryVersion) {
    utils.memoryInit();
  }
  if (!M.m().uuid || M.m().uuid > 1000) {
    M.m().uuid = 0;
  }
  // console.log(`Current game tick is ${Game.time}`);
  global.cc = ConsoleCommands;
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
  for (const i in Game.rooms) {
    const room: Room = Game.rooms[i];
    const rm: M.RoomMemory = M.m().rooms[room.name];
    if (rm === undefined) {
      console.log(`[${Inscribe.color("Init room mem for " + room.name, "Green")}]`);
      Memory.rooms[room.name] = {};
      RoomManager.initRoomMemory(room, room.name);
    } else {
      RoomManager.run(room, rm);
    }
    if (Game.time % 10 === 0) {
      RoomManager.cleanupAssignMiners(rm);
    }
  }
  // Automatically delete memory of missing creeps
  utils.clearStaleCreepMemory();

  utils.log_info();
});
