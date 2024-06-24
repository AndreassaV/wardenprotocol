//@ts-nocheck
import * as _2 from "./auth/v1beta1/auth.js";
import * as _3 from "./auth/v1beta1/genesis.js";
import * as _4 from "./auth/v1beta1/query.js";
import * as _5 from "./authz/v1beta1/authz.js";
import * as _6 from "./authz/v1beta1/event.js";
import * as _7 from "./authz/v1beta1/genesis.js";
import * as _8 from "./authz/v1beta1/query.js";
import * as _9 from "./authz/v1beta1/tx.js";
import * as _10 from "./bank/v1beta1/authz.js";
import * as _11 from "./bank/v1beta1/bank.js";
import * as _12 from "./bank/v1beta1/genesis.js";
import * as _13 from "./bank/v1beta1/query.js";
import * as _14 from "./bank/v1beta1/tx.js";
import * as _15 from "./base/abci/v1beta1/abci.js";
import * as _16 from "./base/query/v1beta1/pagination.js";
import * as _17 from "./base/reflection/v2alpha1/reflection.js";
import * as _18 from "./base/v1beta1/coin.js";
import * as _19 from "./crypto/ed25519/keys.js";
import * as _20 from "./crypto/hd/v1/hd.js";
import * as _21 from "./crypto/keyring/v1/record.js";
import * as _22 from "./crypto/multisig/keys.js";
import * as _23 from "./crypto/secp256k1/keys.js";
import * as _24 from "./crypto/secp256r1/keys.js";
import * as _25 from "./distribution/v1beta1/distribution.js";
import * as _26 from "./distribution/v1beta1/genesis.js";
import * as _27 from "./distribution/v1beta1/query.js";
import * as _28 from "./distribution/v1beta1/tx.js";
import * as _29 from "./feegrant/v1beta1/feegrant.js";
import * as _30 from "./feegrant/v1beta1/genesis.js";
import * as _31 from "./feegrant/v1beta1/query.js";
import * as _32 from "./feegrant/v1beta1/tx.js";
import * as _33 from "./gov/v1/genesis.js";
import * as _34 from "./gov/v1/gov.js";
import * as _35 from "./gov/v1/query.js";
import * as _36 from "./gov/v1/tx.js";
import * as _37 from "./gov/v1beta1/genesis.js";
import * as _38 from "./gov/v1beta1/gov.js";
import * as _39 from "./gov/v1beta1/query.js";
import * as _40 from "./gov/v1beta1/tx.js";
import * as _41 from "./group/v1/events.js";
import * as _42 from "./group/v1/genesis.js";
import * as _43 from "./group/v1/query.js";
import * as _44 from "./group/v1/tx.js";
import * as _45 from "./group/v1/types.js";
import * as _46 from "./mint/v1beta1/genesis.js";
import * as _47 from "./mint/v1beta1/mint.js";
import * as _48 from "./mint/v1beta1/query.js";
import * as _49 from "./params/v1beta1/params.js";
import * as _50 from "./params/v1beta1/query.js";
import * as _51 from "./staking/v1beta1/authz.js";
import * as _52 from "./staking/v1beta1/genesis.js";
import * as _53 from "./staking/v1beta1/query.js";
import * as _54 from "./staking/v1beta1/staking.js";
import * as _55 from "./staking/v1beta1/tx.js";
import * as _56 from "./tx/signing/v1beta1/signing.js";
import * as _57 from "./tx/v1beta1/service.js";
import * as _58 from "./tx/v1beta1/tx.js";
import * as _59 from "./upgrade/v1beta1/query.js";
import * as _60 from "./upgrade/v1beta1/tx.js";
import * as _61 from "./upgrade/v1beta1/upgrade.js";
import * as _62 from "./vesting/v1beta1/tx.js";
import * as _63 from "./vesting/v1beta1/vesting.js";
import * as _105 from "./authz/v1beta1/tx.amino.js";
import * as _106 from "./bank/v1beta1/tx.amino.js";
import * as _107 from "./distribution/v1beta1/tx.amino.js";
import * as _108 from "./feegrant/v1beta1/tx.amino.js";
import * as _109 from "./gov/v1/tx.amino.js";
import * as _110 from "./gov/v1beta1/tx.amino.js";
import * as _111 from "./group/v1/tx.amino.js";
import * as _112 from "./staking/v1beta1/tx.amino.js";
import * as _113 from "./upgrade/v1beta1/tx.amino.js";
import * as _114 from "./vesting/v1beta1/tx.amino.js";
import * as _115 from "./authz/v1beta1/tx.registry.js";
import * as _116 from "./bank/v1beta1/tx.registry.js";
import * as _117 from "./distribution/v1beta1/tx.registry.js";
import * as _118 from "./feegrant/v1beta1/tx.registry.js";
import * as _119 from "./gov/v1/tx.registry.js";
import * as _120 from "./gov/v1beta1/tx.registry.js";
import * as _121 from "./group/v1/tx.registry.js";
import * as _122 from "./staking/v1beta1/tx.registry.js";
import * as _123 from "./upgrade/v1beta1/tx.registry.js";
import * as _124 from "./vesting/v1beta1/tx.registry.js";
import * as _125 from "./auth/v1beta1/query.lcd.js";
import * as _126 from "./authz/v1beta1/query.lcd.js";
import * as _127 from "./bank/v1beta1/query.lcd.js";
import * as _128 from "./distribution/v1beta1/query.lcd.js";
import * as _129 from "./feegrant/v1beta1/query.lcd.js";
import * as _130 from "./gov/v1/query.lcd.js";
import * as _131 from "./gov/v1beta1/query.lcd.js";
import * as _132 from "./group/v1/query.lcd.js";
import * as _133 from "./mint/v1beta1/query.lcd.js";
import * as _134 from "./params/v1beta1/query.lcd.js";
import * as _135 from "./staking/v1beta1/query.lcd.js";
import * as _136 from "./tx/v1beta1/service.lcd.js";
import * as _137 from "./upgrade/v1beta1/query.lcd.js";
import * as _138 from "./auth/v1beta1/query.rpc.Query.js";
import * as _139 from "./authz/v1beta1/query.rpc.Query.js";
import * as _140 from "./bank/v1beta1/query.rpc.Query.js";
import * as _141 from "./distribution/v1beta1/query.rpc.Query.js";
import * as _142 from "./feegrant/v1beta1/query.rpc.Query.js";
import * as _143 from "./gov/v1/query.rpc.Query.js";
import * as _144 from "./gov/v1beta1/query.rpc.Query.js";
import * as _145 from "./group/v1/query.rpc.Query.js";
import * as _146 from "./mint/v1beta1/query.rpc.Query.js";
import * as _147 from "./params/v1beta1/query.rpc.Query.js";
import * as _148 from "./staking/v1beta1/query.rpc.Query.js";
import * as _149 from "./tx/v1beta1/service.rpc.Service.js";
import * as _150 from "./upgrade/v1beta1/query.rpc.Query.js";
import * as _151 from "./authz/v1beta1/tx.rpc.msg.js";
import * as _152 from "./bank/v1beta1/tx.rpc.msg.js";
import * as _153 from "./distribution/v1beta1/tx.rpc.msg.js";
import * as _154 from "./feegrant/v1beta1/tx.rpc.msg.js";
import * as _155 from "./gov/v1/tx.rpc.msg.js";
import * as _156 from "./gov/v1beta1/tx.rpc.msg.js";
import * as _157 from "./group/v1/tx.rpc.msg.js";
import * as _158 from "./staking/v1beta1/tx.rpc.msg.js";
import * as _159 from "./upgrade/v1beta1/tx.rpc.msg.js";
import * as _160 from "./vesting/v1beta1/tx.rpc.msg.js";
import * as _176 from "./lcd.js";
import * as _177 from "./rpc.query.js";
import * as _178 from "./rpc.tx.js";
export namespace cosmos {
  export namespace auth {
    export const v1beta1 = {
      ..._2,
      ..._3,
      ..._4,
      ..._125,
      ..._138
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._5,
      ..._6,
      ..._7,
      ..._8,
      ..._9,
      ..._105,
      ..._115,
      ..._126,
      ..._139,
      ..._151
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._10,
      ..._11,
      ..._12,
      ..._13,
      ..._14,
      ..._106,
      ..._116,
      ..._127,
      ..._140,
      ..._152
    };
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._15
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._16
      };
    }
    export namespace reflection {
      export const v2alpha1 = {
        ..._17
      };
    }
    export const v1beta1 = {
      ..._18
    };
  }
  export namespace crypto {
    export const ed25519 = {
      ..._19
    };
    export namespace hd {
      export const v1 = {
        ..._20
      };
    }
    export namespace keyring {
      export const v1 = {
        ..._21
      };
    }
    export const multisig = {
      ..._22
    };
    export const secp256k1 = {
      ..._23
    };
    export const secp256r1 = {
      ..._24
    };
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._25,
      ..._26,
      ..._27,
      ..._28,
      ..._107,
      ..._117,
      ..._128,
      ..._141,
      ..._153
    };
  }
  export namespace feegrant {
    export const v1beta1 = {
      ..._29,
      ..._30,
      ..._31,
      ..._32,
      ..._108,
      ..._118,
      ..._129,
      ..._142,
      ..._154
    };
  }
  export namespace gov {
    export const v1 = {
      ..._33,
      ..._34,
      ..._35,
      ..._36,
      ..._109,
      ..._119,
      ..._130,
      ..._143,
      ..._155
    };
    export const v1beta1 = {
      ..._37,
      ..._38,
      ..._39,
      ..._40,
      ..._110,
      ..._120,
      ..._131,
      ..._144,
      ..._156
    };
  }
  export namespace group {
    export const v1 = {
      ..._41,
      ..._42,
      ..._43,
      ..._44,
      ..._45,
      ..._111,
      ..._121,
      ..._132,
      ..._145,
      ..._157
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._46,
      ..._47,
      ..._48,
      ..._133,
      ..._146
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._49,
      ..._50,
      ..._134,
      ..._147
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._51,
      ..._52,
      ..._53,
      ..._54,
      ..._55,
      ..._112,
      ..._122,
      ..._135,
      ..._148,
      ..._158
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._56
      };
    }
    export const v1beta1 = {
      ..._57,
      ..._58,
      ..._136,
      ..._149
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._59,
      ..._60,
      ..._61,
      ..._113,
      ..._123,
      ..._137,
      ..._150,
      ..._159
    };
  }
  export namespace vesting {
    export const v1beta1 = {
      ..._62,
      ..._63,
      ..._114,
      ..._124,
      ..._160
    };
  }
  export const ClientFactory = {
    ..._176,
    ..._177,
    ..._178
  };
}