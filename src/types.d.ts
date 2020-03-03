import { CreepRoles } from "settings/memory";

// example declaration file - remove these and add your own custom typings

// `global` extension samples
declare global {
  namespace NodeJS {
    interface Global {
      log: any;
      cc: any;
    }
  }
}

interface Global {
  cc: string;
  uuid: number;
  log: any;
  CREEP_BUILD_RANGE: number;
  CREEP_RANGED_ATTACK_RANGE: number;
  CREEP_UPGRADE_RANGE: number;
  CREEP_REPAIR_RANGE: number;
  CREEP_RANGED_HEAL_RANGE: number;
}

declare var global: Global;

declare const __REVISION__: string;

interface GameMemory {
  memVersion: number | undefined;
  uuid: number;
  log: any;

  creeps: {
    [name: string]: any;
  };

  flags: {
    [name: string]: any;
  };

  rooms: {
    [name: string]: RoomMemory;
  };

  spawns: {
    [name: string]: any;
  };
}
interface CreepMemory {
  uuid: number;
  name: string;
  role: CreepRoles;
  roleString: string;
  log: boolean;
  working: boolean;
  gathering: boolean;
  assignedMineTaskId?: number;
  assignedContainerId?: string;
  assignedTargetId?: string;
  isUpgradingController: boolean;
  repairTargetId?: string;
  [key: string]: any;
}
