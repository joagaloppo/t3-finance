import { api } from "@/utils/api";
import { useEffect } from "react";
import { useWalletStore } from "@/app/walletStore";
import { usePageStore } from "@/app/pageStore";
import Edit from "./edit";
import Spinner from "@/components/ui/spinner";

const Body = () => {
  const walletId = useWalletStore((state) => state.walletId);

  const transactions = useWalletStore((state) => state.transactions);
  const setTransactions = useWalletStore((state) => state.setTransactions);

  const page = usePageStore((state) => state.page);

  const { data, isLoading } = api.transaction.getTen.useQuery({ walletId, skip: page * 10 - 10 });

  useEffect(() => {
    setTransactions(data || []);
  }, [data, setTransactions]);

  return (
    <div className="overflow-hidden">
      <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <div className="w-full divide-y divide-gray-200 dark:divide-gray-700">
          {isLoading && (
            <div className="w-full bg-white">
              <div className="overflow-hidden whitespace-nowrap px-4 py-14 text-center text-sm text-gray-800">
                <Spinner theme="dark" />
              </div>
            </div>
          )}
          {!isLoading && !data?.length && (
            <div className="w-full bg-white">
              <div className="overflow-hidden whitespace-nowrap px-4 py-14 text-center text-sm text-gray-800">
                <span className="block text-center">No transactions found.</span>
              </div>
            </div>
          )}
          {transactions && transactions.map((transaction) => <Edit key={transaction.id} transaction={transaction} />)}
        </div>
      </div>
    </div>
  );
};

export default Body;
