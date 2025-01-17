/* eslint-disable */

export const protobufPackage = "runtime";

/** / The most primitive workload in Aurae, a standard executable process. */
export interface Executable {
  name: string;
  command: string;
  description: string;
  cellName: string;
}

/** / An isolation resource used to divide a system into smaller resource boundaries. */
export interface Cell {
  /**
   * / Resource parameters for control groups (cgroups)
   * / Build on the [cgroups-rs](https://github.com/kata-containers/cgroups-rs) crate.
   * / See [examples](https://github.com/kata-containers/cgroups-rs/blob/main/tests/builder.rs)
   */
  name: string;
  /**
   * / A comma-separated list of CPU IDs where the task in the control group
   * can run. Dashes between numbers indicate ranges.
   */
  cpuCpus: string;
  /**
   * /  Cgroups can be guaranteed a minimum number of "CPU shares"
   * /  when a system is busy.  This does not limit a cgroup's CPU
   * /  usage if the CPUs are not busy.  For further information,
   * /  see Documentation/scheduler/sched-design-CFS.rst (or
   * /  Documentation/scheduler/sched-design-CFS.txt in Linux 5.2
   * /  and earlier).
   * /
   * / Weight of how much of the total CPU time should this control
   *  group get. Note that this is hierarchical, so this is weighted
   *  against the siblings of this control group.
   */
  cpuShares: number;
  /**
   * / Same syntax as the cpus field of this structure, but applies to
   *  memory nodes instead of processors.
   */
  cpuMems: string;
  /** In one period, how much can the tasks run in nanoseconds. */
  cpuQuota: number;
}

export interface AllocateCellRequest {
  cell: Cell | undefined;
}

export interface AllocateCellResponse {
  cellName: string;
  /**
   * / A bool that will be set to true if the cgroup was created with
   * / cgroup v2 controller.
   */
  cgroupV2: boolean;
}

export interface FreeCellRequest {
  cellName: string;
}

export interface FreeCellResponse {
}

export interface StartCellRequest {
  /** TODO Consider set of executables */
  executable: Executable | undefined;
}

export interface StartCellResponse {
}

export interface StopCellRequest {
  cellName: string;
  executableName: string;
}

export interface StopCellResponse {
}

function createBaseExecutable(): Executable {
  return { name: "", command: "", description: "", cellName: "" };
}

export const Executable = {
  fromJSON(object: any): Executable {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      command: isSet(object.command) ? String(object.command) : "",
      description: isSet(object.description) ? String(object.description) : "",
      cellName: isSet(object.cellName) ? String(object.cellName) : "",
    };
  },

  toJSON(message: Executable): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.command !== undefined && (obj.command = message.command);
    message.description !== undefined && (obj.description = message.description);
    message.cellName !== undefined && (obj.cellName = message.cellName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Executable>, I>>(object: I): Executable {
    const message = createBaseExecutable();
    message.name = object.name ?? "";
    message.command = object.command ?? "";
    message.description = object.description ?? "";
    message.cellName = object.cellName ?? "";
    return message;
  },
};

function createBaseCell(): Cell {
  return { name: "", cpuCpus: "", cpuShares: 0, cpuMems: "", cpuQuota: 0 };
}

export const Cell = {
  fromJSON(object: any): Cell {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      cpuCpus: isSet(object.cpuCpus) ? String(object.cpuCpus) : "",
      cpuShares: isSet(object.cpuShares) ? Number(object.cpuShares) : 0,
      cpuMems: isSet(object.cpuMems) ? String(object.cpuMems) : "",
      cpuQuota: isSet(object.cpuQuota) ? Number(object.cpuQuota) : 0,
    };
  },

  toJSON(message: Cell): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.cpuCpus !== undefined && (obj.cpuCpus = message.cpuCpus);
    message.cpuShares !== undefined && (obj.cpuShares = Math.round(message.cpuShares));
    message.cpuMems !== undefined && (obj.cpuMems = message.cpuMems);
    message.cpuQuota !== undefined && (obj.cpuQuota = Math.round(message.cpuQuota));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Cell>, I>>(object: I): Cell {
    const message = createBaseCell();
    message.name = object.name ?? "";
    message.cpuCpus = object.cpuCpus ?? "";
    message.cpuShares = object.cpuShares ?? 0;
    message.cpuMems = object.cpuMems ?? "";
    message.cpuQuota = object.cpuQuota ?? 0;
    return message;
  },
};

function createBaseAllocateCellRequest(): AllocateCellRequest {
  return { cell: undefined };
}

export const AllocateCellRequest = {
  fromJSON(object: any): AllocateCellRequest {
    return { cell: isSet(object.cell) ? Cell.fromJSON(object.cell) : undefined };
  },

  toJSON(message: AllocateCellRequest): unknown {
    const obj: any = {};
    message.cell !== undefined && (obj.cell = message.cell ? Cell.toJSON(message.cell) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AllocateCellRequest>, I>>(object: I): AllocateCellRequest {
    const message = createBaseAllocateCellRequest();
    message.cell = (object.cell !== undefined && object.cell !== null) ? Cell.fromPartial(object.cell) : undefined;
    return message;
  },
};

function createBaseAllocateCellResponse(): AllocateCellResponse {
  return { cellName: "", cgroupV2: false };
}

export const AllocateCellResponse = {
  fromJSON(object: any): AllocateCellResponse {
    return {
      cellName: isSet(object.cellName) ? String(object.cellName) : "",
      cgroupV2: isSet(object.cgroupV2) ? Boolean(object.cgroupV2) : false,
    };
  },

  toJSON(message: AllocateCellResponse): unknown {
    const obj: any = {};
    message.cellName !== undefined && (obj.cellName = message.cellName);
    message.cgroupV2 !== undefined && (obj.cgroupV2 = message.cgroupV2);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AllocateCellResponse>, I>>(object: I): AllocateCellResponse {
    const message = createBaseAllocateCellResponse();
    message.cellName = object.cellName ?? "";
    message.cgroupV2 = object.cgroupV2 ?? false;
    return message;
  },
};

function createBaseFreeCellRequest(): FreeCellRequest {
  return { cellName: "" };
}

export const FreeCellRequest = {
  fromJSON(object: any): FreeCellRequest {
    return { cellName: isSet(object.cellName) ? String(object.cellName) : "" };
  },

  toJSON(message: FreeCellRequest): unknown {
    const obj: any = {};
    message.cellName !== undefined && (obj.cellName = message.cellName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FreeCellRequest>, I>>(object: I): FreeCellRequest {
    const message = createBaseFreeCellRequest();
    message.cellName = object.cellName ?? "";
    return message;
  },
};

function createBaseFreeCellResponse(): FreeCellResponse {
  return {};
}

export const FreeCellResponse = {
  fromJSON(_: any): FreeCellResponse {
    return {};
  },

  toJSON(_: FreeCellResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FreeCellResponse>, I>>(_: I): FreeCellResponse {
    const message = createBaseFreeCellResponse();
    return message;
  },
};

function createBaseStartCellRequest(): StartCellRequest {
  return { executable: undefined };
}

export const StartCellRequest = {
  fromJSON(object: any): StartCellRequest {
    return { executable: isSet(object.executable) ? Executable.fromJSON(object.executable) : undefined };
  },

  toJSON(message: StartCellRequest): unknown {
    const obj: any = {};
    message.executable !== undefined &&
      (obj.executable = message.executable ? Executable.toJSON(message.executable) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StartCellRequest>, I>>(object: I): StartCellRequest {
    const message = createBaseStartCellRequest();
    message.executable = (object.executable !== undefined && object.executable !== null)
      ? Executable.fromPartial(object.executable)
      : undefined;
    return message;
  },
};

function createBaseStartCellResponse(): StartCellResponse {
  return {};
}

export const StartCellResponse = {
  fromJSON(_: any): StartCellResponse {
    return {};
  },

  toJSON(_: StartCellResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StartCellResponse>, I>>(_: I): StartCellResponse {
    const message = createBaseStartCellResponse();
    return message;
  },
};

function createBaseStopCellRequest(): StopCellRequest {
  return { cellName: "", executableName: "" };
}

export const StopCellRequest = {
  fromJSON(object: any): StopCellRequest {
    return {
      cellName: isSet(object.cellName) ? String(object.cellName) : "",
      executableName: isSet(object.executableName) ? String(object.executableName) : "",
    };
  },

  toJSON(message: StopCellRequest): unknown {
    const obj: any = {};
    message.cellName !== undefined && (obj.cellName = message.cellName);
    message.executableName !== undefined && (obj.executableName = message.executableName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StopCellRequest>, I>>(object: I): StopCellRequest {
    const message = createBaseStopCellRequest();
    message.cellName = object.cellName ?? "";
    message.executableName = object.executableName ?? "";
    return message;
  },
};

function createBaseStopCellResponse(): StopCellResponse {
  return {};
}

export const StopCellResponse = {
  fromJSON(_: any): StopCellResponse {
    return {};
  },

  toJSON(_: StopCellResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StopCellResponse>, I>>(_: I): StopCellResponse {
    const message = createBaseStopCellResponse();
    return message;
  },
};

/** TODO Pods Service */
export interface Pods {
}

/** TODO Instances Service */
export interface Instances {
}

/** TODO Spawn Service */
export interface Spawn {
}

/**
 * / Cells is the most fundamental isolation boundary for Aurae.
 * / A cell is an isolate set of resources of the system which can be
 * / used to run workloads.
 * /
 * / A cell is composed of a unique cgroup namespace, and unshared kernel namespaces.
 */
export interface CellService {
  /**
   * / Reserve requested system resources for a new cell.
   * / For cells specifically this will allocate and reserve cgroup resources only.
   */
  allocate(request: AllocateCellRequest): Promise<AllocateCellResponse>;
  /** / Free up previously requested resources for an existing cell */
  free(request: FreeCellRequest): Promise<FreeCellResponse>;
  /**
   * / Start a new Executable inside of an existing cell. Can be called
   * / in serial to start more than one executable in the same cell.
   */
  start(request: StartCellRequest): Promise<StartCellResponse>;
  /**
   * / Stop one or more Executables inside of an existing cell.
   * / Can be called in serial to stop/retry more than one executable.
   */
  stop(request: StopCellRequest): Promise<StopCellResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
