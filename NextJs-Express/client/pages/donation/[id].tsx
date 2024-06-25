import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Layoutt from '../../components/Layoutt';

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

const DonationPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [donation, setDonation] = useState<Donation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Donation>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const fetchDonation = async () => {
        const { data, error } = await supabase
          .from<any, Donation>('donations')
          .select('*')
          .eq('id', id)
          .single();
        if (error) {
          setError(error.message);
          setLoading(false);
        } else {
          setDonation(data);
          setForm(data);
          setLoading(false);
        }
      };
      fetchDonation();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase
      .from('donations')
      .update(form)
      .eq('id', id);

    if (error) {
      setError(error.message);
    } else {
      setDonation((prevDonation) => {
        if (!prevDonation) return null;
        return {
          ...prevDonation,
          ...form,
        };
      });
      setIsEditing(false);
    }
  };

  if (loading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layoutt>
      <button
        className="mb-4 p-2 bg-gray-500 text-white rounded"
        onClick={() => router.back()}
      >
        Back
      </button>
      <div className="bg-white p-8 rounded-md shadow-md w-full">
        <div className="flex items-center mb-6">
          <div className="text-2xl font-bold">
            ${donation?.donation_amount} USD
          </div>
          <div className={`text-base font-semibold ml-4 ${donation?.status === 'Succeeded' ? 'text-green-500' : 'text-gray-500'}`}>
            {donation?.status}
          </div>
        </div>
        <div className="flex justify-between mb-6">
          <div>
            <p className="text-xs text-gray-500">Last Update</p>
            <p className="text-base font-bold mt-1">
              {donation?.donation_date ? new Date(donation.donation_date).toLocaleString() : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Supporter</p>
            <p className="text-base font-bold mt-1">{donation?.supporter_name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Campaign</p>
            <p className="text-base font-bold mt-1">{donation?.campaign}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Payment method</p>
            <div className="flex items-center mt-1">
              {donation?.payment_method === 'Visa' && <img src="/icons/visa.svg" alt="Visa" className="inline-block ml-2 w-6 h-6" />}
              {donation?.payment_method === 'Mastercard' && <img src="/icons/mastercard.svg" alt="Mastercard" className="inline-block ml-2 w-6 h-6" />}
              <span className="ml-2">**** {donation?.payment_id?.slice(-4)}</span>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-bold">Donation Information</h2>
          <p className="mt-2"><strong>Donation ID:</strong> {donation?.id}</p>
          <p className="mt-2"><strong>Supporter:</strong> {donation?.supporter_name}</p>
          <p className="mt-2"><strong>Campaign:</strong> {donation?.campaign}</p>
          <p className="mt-2"><strong>Designation:</strong> {donation?.designation || 'N/A'}</p>
          <p className="mt-2"><strong>Donation date:</strong> {donation?.donation_date ? new Date(donation.donation_date).toLocaleString() : 'N/A'}</p>
          <p className="mt-2"><strong>Success date:</strong> {donation?.success_date ? new Date(donation.success_date).toLocaleString() : 'N/A'}</p>
          <p className="mt-2"><strong>Frequency:</strong> {donation?.frequency}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-bold">Payment & Fees</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <div>
              <p className="mt-2"><strong>Donation amount:</strong> ${donation?.donation_amount}</p>
              <p className="mt-2"><strong>Before fees covered:</strong> ${donation?.before_fees_covered}</p>
              <p className="mt-2"><strong>Platform fee:</strong> ${donation?.platform_fee}</p>
              <p className="mt-2"><strong>Payment processing fee:</strong> ${donation?.payment_processing_fee}</p>
              <p className="mt-2"><strong>Payout amount:</strong> ${donation?.payout_amount}</p>
            </div>
            <div>
              <p className="mt-2"><strong>Payment processor:</strong> {donation?.payment_processor}</p>
              <p className="mt-2"><strong>Payment ID:</strong> {donation?.payment_id}</p>
            </div>
          </div>
        </div>
        <button
          className="mt-6 p-2 bg-blue-500 text-white rounded"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Edit Donation Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm" htmlFor="supporter_name">Supporter Name</label>
                <input
                  id="supporter_name"
                  name="supporter_name"
                  type="text"
                  value={form.supporter_name || ''}
                  onChange={handleChange}
                  className="border p-2 w-full text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm" htmlFor="campaign">Campaign</label>
                <input
                  id="campaign"
                  name="campaign"
                  type="text"
                  value={form.campaign || ''}
                  onChange={handleChange}
                  className="border p-2 w-full text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm" htmlFor="designation">Designation</label>
                <input
                  id="designation"
                  name="designation"
                  type="text"
                  value={form.designation || ''}
                  onChange={handleChange}
                  className="border p-2 w-full text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm" htmlFor="frequency">Frequency</label>
                <select
                  id="frequency"
                  name="frequency"
                  value={form.frequency || ''}
                  onChange={handleChange}
                  className="border p-2 w-full text-sm"
                >
                  <option value="One time">One time</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="p-2 bg-gray-500 text-white rounded mr-2 text-sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded text-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layoutt>
  );
};

export default DonationPage;
