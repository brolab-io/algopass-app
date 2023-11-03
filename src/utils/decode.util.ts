import { UserRecord } from "@/contract/AlgopassClient";
import contract from "../contract/algopass.json";
import algosdk from "algosdk";

export const decodeProfile = (data: Uint8Array) => {
  const algoPassContract = new algosdk.ABIContract(contract);
  const profileCodec = algosdk.ABIType.from(
    algoPassContract.getMethodByName("get_profile").returns.type.toString()
  );
  const decoded = profileCodec.decode(data) as unknown as any;
  return UserRecord(decoded);
};
