export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const getStorageUrl = (wallet: string) => {
  if (!wallet) return ''
  return `${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL}/storage/v1/object/public/algopass/${wallet}.png?${new Date().getTime()}`
}