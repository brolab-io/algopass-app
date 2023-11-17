import algosdk, { SignedTransaction } from "algosdk";
import nacl from "tweetnacl";
export const isProfileNotFound = (error: any) => {
  if ("status" in error && error.status === 404) {
    return true;
  }
  if ("message" in error && error.message.includes("dynamic index segment miscalculation")) {
    return true;
  }
  return false;
};

export function verifySignedTransaction(stxn: SignedTransaction) {
  if (stxn.sig === undefined) return false;

  const pk_bytes = stxn.txn.from.publicKey;

  const sig_bytes = new Uint8Array(stxn.sig);

  const txn_bytes = algosdk.encodeObj(stxn.txn.get_obj_for_encoding());
  const msg_bytes = new Uint8Array(txn_bytes.length + 2);
  msg_bytes.set(Buffer.from("TX"));
  msg_bytes.set(txn_bytes, 2);

  return nacl.sign.detached.verify(msg_bytes, sig_bytes, pk_bytes);
}