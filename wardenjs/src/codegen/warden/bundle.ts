//@ts-nocheck
import * as _83 from "./act/module/module.js";
import * as _84 from "./act/v1beta1/action.js";
import * as _85 from "./act/v1beta1/events.js";
import * as _86 from "./act/v1beta1/genesis.js";
import * as _87 from "./act/v1beta1/params.js";
import * as _88 from "./act/v1beta1/query.js";
import * as _89 from "./act/v1beta1/rule.js";
import * as _90 from "./act/v1beta1/tx.js";
import * as _91 from "./gmp/genesis.js";
import * as _92 from "./gmp/gmp.js";
import * as _93 from "./gmp/query.js";
import * as _94 from "./gmp/tx.js";
import * as _95 from "./warden/module/module.js";
import * as _96 from "./warden/v1beta2/events.js";
import * as _97 from "./warden/v1beta2/genesis.js";
import * as _98 from "./warden/v1beta2/key.js";
import * as _99 from "./warden/v1beta2/keychain.js";
import * as _100 from "./warden/v1beta2/params.js";
import * as _101 from "./warden/v1beta2/query.js";
import * as _102 from "./warden/v1beta2/signature.js";
import * as _103 from "./warden/v1beta2/space.js";
import * as _104 from "./warden/v1beta2/tx.js";
import * as _161 from "./act/v1beta1/tx.amino.js";
import * as _162 from "./gmp/tx.amino.js";
import * as _163 from "./warden/v1beta2/tx.amino.js";
import * as _164 from "./act/v1beta1/tx.registry.js";
import * as _165 from "./gmp/tx.registry.js";
import * as _166 from "./warden/v1beta2/tx.registry.js";
import * as _167 from "./act/v1beta1/query.lcd.js";
import * as _168 from "./gmp/query.lcd.js";
import * as _169 from "./warden/v1beta2/query.lcd.js";
import * as _170 from "./act/v1beta1/query.rpc.Query.js";
import * as _171 from "./gmp/query.rpc.Query.js";
import * as _172 from "./warden/v1beta2/query.rpc.Query.js";
import * as _173 from "./act/v1beta1/tx.rpc.msg.js";
import * as _174 from "./gmp/tx.rpc.msg.js";
import * as _175 from "./warden/v1beta2/tx.rpc.msg.js";
import * as _179 from "./lcd.js";
import * as _180 from "./rpc.query.js";
import * as _181 from "./rpc.tx.js";
export namespace warden {
  export namespace act {
    export const module = {
      ..._83
    };
    export const v1beta1 = {
      ..._84,
      ..._85,
      ..._86,
      ..._87,
      ..._88,
      ..._89,
      ..._90,
      ..._161,
      ..._164,
      ..._167,
      ..._170,
      ..._173
    };
  }
  export const gmp = {
    ..._91,
    ..._92,
    ..._93,
    ..._94,
    ..._162,
    ..._165,
    ..._168,
    ..._171,
    ..._174
  };
  export namespace warden {
    export const module = {
      ..._95
    };
    export const v1beta2 = {
      ..._96,
      ..._97,
      ..._98,
      ..._99,
      ..._100,
      ..._101,
      ..._102,
      ..._103,
      ..._104,
      ..._163,
      ..._166,
      ..._169,
      ..._172,
      ..._175
    };
  }
  export const ClientFactory = {
    ..._179,
    ..._180,
    ..._181
  };
}