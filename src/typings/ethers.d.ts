declare module "bn.js" {
  export default class BigNumber {
    constructor(number: string, base: number);
  }
}

declare module "ethers" {
  import BigNumber from "bn.js";
  export class Wallet {
    constructor(privateKey: string, provider?: Provider);
    static createRandom(options?: { extraEntropy?: string }): Wallet;
    static fromEncryptedWallet(
      json: string,
      password: string,
      progressCallback?: (percent: number) => void
    ): Promise<Wallet>;
    static fromMnemonic(mnemonic: string, path?: string): Wallet;
    static fromBrainWallet(
      username: string,
      password: string,
      progressCallback?: (percent: number) => void
    ): Promise<Wallet>;

    address: string;
    privateKey: string;
    provider: Provider;
    getAddress(): string;
    sign(transaction: Transaction): string;
    signMessage(message: void): string;
    encrypt(
      password: string,
      options?: any,
      progressCallback?: (percent: number) => void
    ): string;

    /* Blockchain Operations */
    // These operations require the wallet to have a provider attached to it
    getBalance(blockTag?: string): Promise<BigNumber>;
    getTransactionCount(blockTag?: string): Promise<number>;
    estimateGas(transaction?: Transaction): Promise<BigNumber>;
    sendTransaction(transaction?: Transaction): Promise<void>;
    send(
      addressOrName: string,
      amountWei: BigNumber,
      options?: { gasLimit?: number; gasPrice?: BigNumber }
    ): Promise<string>;

    /* Parsing Transactions */
    parseTransaction(hexStringOrArrayish: string | any[]): Transaction;

    /* Verifying Messages */
    verifyMessage(message: string, signature: string): string;
  }

  export interface Block {
    parentHash?: string;
    hash?: string;
    number: number;
    difficulty: number;
    timestamp: number;
    nonce: string;
    extraData: string;
    gasLimit: BigNumber;
    gasUsed: BigNumber;
    miner: string;
    transactions: string[];
  }
  export type TransactionReceipt = {
    transactionHash: string;
    blockHash: string;
    blockNumber: number;
    transactionIndex: string;
    contractAddress: string | null;
    cumulativeGasUsed: BigNumber;
    gasUsed: BigNumber;
    logs: string[];
    logsBloom: string;
  } & (
    | {
        byzantium: true;
        status: number;
      }
    | {
        byzantium: false;
        root: string;
      });
  export interface Filter {
    fromBlock: number;
    toBlock: number;
    address: string;
    topics: string[];
  }

  export class Provider {
    sendTransaction: (
      signedTransaction: string,
      progressCallback: (hash: string) => void
    ) => Promise<string>;
    getBalance(addressOrName: string, blockTag?: string): Promise<BigNumber>;
    getTransactionCount(
      addressOrName: string,
      blockTag?: string
    ): Promise<number>;
    lookupAddress(address: string): string | null;
    resolveName(ensName: string): string | null;

    getBlockNumber(): Promise<number>;
    getGasPrice(): Promise<BigNumber>;
    getBlock(blockHashOrBlockNumber: string | number): Promise<Block>;
    getTransaction(transactionHash: string): Promise<Transaction>;
    getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt>;

    call(transaction: Transaction): Promise<string>;
    estimateGas(transaction: Transaction): Promise<BigNumber>;

    getCode(addressOrName: string): Promise<string>;
    getStorageAt(
      addressOrName: string,
      position: number,
      blockTag?: string
    ): Promise<string>;
    getLogs(filter: Filter): Promise<string[]>;

    on(
      eventType: string,
      callback: (x: number | BigNumber | Transaction | string[]) => void
    ): void;
    once(
      eventType: string,
      callback: (x: number | BigNumber | Transaction | string[]) => void
    ): void;
    removeListener(
      eventType: string,
      callback: (x: number | BigNumber | Transaction | string[]) => void
    ): void;

    removeAllListeners(eventType: string): void;
    listenerCount(eventType?: string): number;
    resetEventsBlock(blockNumber: number): void;

    waitForTransaction(
      transactionHash: string,
      timeout?: number
    ): Promise<Transaction>;

    name: string;
    chainId: number;
  }

  export interface Transaction {
    /** Recommendation: omit nonce; the provider will query the network */
    nonce?: number;
    /** 21000 will send ether to another user, but to execute contracts
     larger limits are required. The provider.estimateGas can be used for this.
     */
    gasLimit?: number;

    /** Recommendations: omit gasPrice; the provider will query the network */
    gasPrice?: BigNumber;

    /** Required; unless deploying a contract (in which case omit) */
    to: string;

    data?: string;

    value?: BigNumber;

    /** Recommendation: omit chainId; the provider will populate this */
    chaindId?: number;
  }

  export namespace providers {
    export const networks: {
      unspecified: { chainId: 0; name: "unspecified" };
      homestead: {
        chainId: 1;
        ensAddress: "0x314159265dd8dbb310642f98f50c066173c1259b";
        name: "homestead";
      };
      mainnet: {
        chainId: 1;
        ensAddress: "0x314159265dd8dbb310642f98f50c066173c1259b";
        name: "homestead";
      };
      morden: { chainId: 2; name: "morden" };
      ropsten: {
        chainId: 3;
        ensAddress: "0x112234455c3a32fd11230c42e7bccd4a84e02010";
        name: "ropsten";
      };
      testnet: {
        chainId: 3;
        ensAddress: "0x112234455c3a32fd11230c42e7bccd4a84e02010";
        name: "ropsten";
      };
      rinkeby: { chainId: 4; name: "rinkeby" };
      kovan: { chainId: 42; name: "kovan" };
      classic: { chainId: 61; name: "classic" };
    };

    type EthereumNetwork =
      | boolean
      | {
          name: string;
          chainId: string;
          ensAddress?: string;
        }
      | keyof typeof networks;

    export const getDefaultProvider: (network?: EthereumNetwork) => Provider;

    export class EtherScanProvider extends Provider {
      constructor(network?: EthereumNetwork, apiToken?: string);
      apiToken: string | null;
      getEtherPrice(): Promise<number>;
      getHistory(
        addressOrName: string,
        startBlock: number,
        endBlock: number
      ): Promise<Transaction[]>;
    }
    export class JsonRpcProvider extends Provider {
      constructor(url?: string, network?: EthereumNetwork);
      url: string;
      send: (method: any, params: any) => Promise<any>;
    }
    export class InfuraProvider extends Provider {
      constructor(network?: EthereumNetwork, apiAccessToken?: string);
      apiAccessToken: string | null;
    }
    export class Web3Provider extends Provider {
      constructor(web3Provider: any, network?: EthereumNetwork);
      listAccounts(): Promise<string[]>;
      getSigner(address?: string): any;
      provider: any;
    }
    export class FallbackProvider extends Provider {
      constructor(providers: Provider[]);
      readonly providers: Provider[];
    }
  }

  export namespace utils {
    export const bigNumberify: (number: string) => BigNumber;
    export const randomBytes: (number: number) => Uint8Array;
  }

  export class HDNode {
    static mnemonicToEntropy(mnemonic: string): string;
    static entropyToMnemonic(entropy: Uint8Array): string;
    static mnemonicToSeed(mnemonic: string): string;
    static isValidMnemonic(string: string): boolean;
  }
}
