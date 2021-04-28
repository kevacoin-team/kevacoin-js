import { RequestManager, HTTPTransport, Client } from "@open-rpc/client-js";
import { Nullable } from "./structures/general";

export interface KevaConfig {
  namespace: string;
  credentials: {
    username: string;
    password: string;
  };
}

export enum RPCCommands {
  // Free/Read Actions
  GetWalletInfo = "getwalletinfo",
  GetServerAddress = "getaccountaddress",

  // Cost/Create actions
  CreateNamespace = "keva_namespace",
}

const encode = (username: string, pwd: string) => {
  return Buffer.from(`${username}:${pwd}`, "utf-8").toString("base64");
};

export class KevaClient {
  // These fields will be populated on construction
  private wallet: Nullable<string> = null;
  public namespace: string;

  private client: Client;

  constructor(conf: KevaConfig) {
    const { username, password } = conf.credentials;
    this.namespace = conf.namespace;

    const transport = new HTTPTransport("http://localhost:5001", {
      headers: {
        Authorization: `Basic ${encode(username, password)}`,
      },
    });
    this.client = new Client(new RequestManager([transport]));
  }

  async init() {
    // TODO:
    const wallet = process.env.KEVA_WALLET_ADDRESS;
    // Should only happen if an address has not been created for you (i.e. new application)
    if (wallet === undefined || wallet === "") {
      throw new Error("[keva-js] No wallet account found");
    }

    this.wallet = wallet;
  }

  public async getWalletInfo(): Promise<Record<string, unknown>> {
    const result = await this.client.request({
      method: RPCCommands.GetWalletInfo,
    });
    return result;
  }

  public async runMiscCommand<T>(command: string, ...params: unknown[]) {
    const result = await this.client.request({
      method: command,
      params,
    });

    //! Make sure you have the proper type here or you'll get unexpected results
    return result as T;
  }
}
