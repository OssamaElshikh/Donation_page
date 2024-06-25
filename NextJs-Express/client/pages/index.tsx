import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import Layout from '../components/Layoutt';

type Donation = {
  id: string;
  supporter_name: string;
  campaign: string;
  designation: string | null;
  donation_amount: number;
  before_fees_covered: number | null;
  platform_fee: number | null;
  payment_processing_fee: number | null;
  payout_amount: number | null;
  payment_method: string;
  payment_processor: string | null;
  payment_id: string | null;
  donation_date: string;
  success_date: string | null;
  frequency: string;
  status: string;
};

const HomePage = () => {
  const [data, setData] = useState<Donation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from<any, Donation>('donations')
        .select('*');
      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        setData(data || []);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">All donations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item) => (
          <div key={item.id} className="border p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">{item.campaign}</h2>
            <p>Supporter: {item.supporter_name}</p>
            <p>Amount: ${item.donation_amount}</p>
            <p>
              Payment Method: {item.payment_method}{' '}
              {item.payment_method === 'Visa' && <img src="/icons/visa.svg" alt="Visa" className="inline-block ml-2 w-6 h-6" />}
              {item.payment_method === 'Mastercard' && <img src="/icons/mastercard.svg" alt="Mastercard" className="inline-block ml-2 w-6 h-6" />}
            </p>
            <button
              className="mt-2 p-2 bg-blue-500 text-white rounded"
              onClick={() => router.push(`/donation/${item.id}`)}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default HomePage;
