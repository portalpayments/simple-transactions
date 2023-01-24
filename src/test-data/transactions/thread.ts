import { DECAF_APP, MIKES_WALLET } from "../../constants";

export const threads = [
  {
    dataServiceDialectsApi: {
      baseUrl: "https://dialectapi.to",
      tokenProvider: {
        delegate: {
          ttl: "PT1440M",
          tokenGenerator: {
            signer: {
              alg: "solana-ed25519",
              dialectWalletAdapter: {
                delegate: {
                  // Omitted
                  keypair: {},
                },
              },
            },
          },
        },
        tokenStore: {
          tokens: {
            // Omitted
            MIKES_WALLET: "fakeToken",
          },
        },
        tokenParser: {
          bodyParser: {},
          tokenHeaderParser: {},
        },
        tokenValidator: {},
        subject: MIKES_WALLET,
        delegateGetPromises: {
          MIKES_WALLET: {},
        },
      },
    },
    textSerde: {},
    encryptionKeysProvider: {
      delegate: {
        dialectWalletAdapter: {
          delegate: {
            // Omitted
            keypair: {},
          },
        },
      },
      encryptionKeysStore: {
        keys: {},
      },
      delegateGetPromises: {},
    },
    address: "ab1c54db-4654-483a-80e9-5f30d2d41a1a",
    me: {
      address: MIKES_WALLET,
      scopes: ["ADMIN", "WRITE"],
    },
    otherMembers: [
      {
        address: DECAF_APP,
        scopes: ["ADMIN", "WRITE"],
      },
    ],
    otherMembersPks: {
      dcafKdWLATod3BLRngsqZ7CrQwcrUxrLjFWYJwYP1Fy: {
        address: DECAF_APP,
        scopes: ["ADMIN", "WRITE"],
      },
    },
    encryptionEnabled: false,
    canBeDecrypted: true,
    updatedAt: "2022-11-05T20:10:08.957Z",
    lastMessage: {
      text: "Thank you for your order! You can find your receipt here: https://www.decaf.so/receipt/XgVU1qK4i4zXKanjHZpr",
      timestamp: "2022-11-05T20:10:08.957Z",
      author: {
        address: DECAF_APP,
        scopes: ["ADMIN", "WRITE"],
      },
    },
    type: "dialect-cloud",
    id: {
      address: "ab1c54db-4654-483a-80e9-5f30d2d41a1a",
      type: "dialect-cloud",
    },
  },
];
