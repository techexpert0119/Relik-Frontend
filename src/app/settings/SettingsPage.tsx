import Container from '@/components/ui/container';
import PlatxForm from './_components/platxForm';
import StripeForm from './_components/stripeForm';
import platx from '../../assets/images/platx.webp';
import stripe from '../../assets/images/stripe.png';
export default function Settings() {
  return (
    <Container>
      <p className="font-bold pt-4 font-sans">Settings</p>
      <hr className="my-8" />

      <div className="flex flex-col gap-5 md:flex-row">
        <div className="basis-[40%]">
          <div className="w-[100px] h-4 relative mb-2">
            <img alt="platix" src={platx} />
          </div>
          <h1 className="font-semibold">PlatX-Pay Integration</h1>
          <p className="mt-1 text-description">
            To use PlatX-Pay product links, please login as PlatX-Pay Vendor.
          </p>
        </div>
        <div className="basis-[60%]">
          <PlatxForm />
        </div>
      </div>

      <hr className="my-8" />

      <div className="flex flex-col gap-5 md:flex-row">
        <div className="basis-[40%]">
          <div className="w-[100px] h-[42.5px] mb-2 relative">
            <img alt="stripe" src={stripe} />
          </div>
          <h1 className="font-semibold">Stripe Integration</h1>
          <p className="mt-1 text-description">
            To use Stripe Payment for Product Link Types, please provide <br />
            Stripe API data.
          </p>
        </div>
        <div className="basis-[60%]">
          <StripeForm />
        </div>
      </div>
    </Container>
  );
}
