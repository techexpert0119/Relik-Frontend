import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import save from '../../../assets/svg/save.svg';

const formSchema = z.object({
  publicApiKey: z.string().includes('pk_'),
  privateApiKey: z.string().includes('sk_'),
  webhookEndpoint: z.string().includes('whsec_'),
});

export default function StripeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      publicApiKey: '',
      privateApiKey: '',
      webhookEndpoint: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white shadow sm:rounded-tl-md sm:rounded-tr-md"
      >
        <fieldset className="flex flex-col gap-[10px]">
          <div className="p-6">
            <FormField
              control={form.control}
              name="publicApiKey"
              render={({ field }) => (
                <FormItem className="max-w-[505px]">
                  <FormLabel
                    className="block font-semibold leading-6 mb-2 text-base"
                    htmlFor="public_key"
                  >
                    Public API Key
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="public_key"
                        type="public_key"
                        placeholder="pk_XXXXXXXXXXXXXXXXXXXX"
                        autoComplete="public_key"
                        className="focus-visible:ring-transparent border-[0.5px] border-[#d0d5dd] px-[14px] py-[10px]"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="privateApiKey"
              render={({ field }) => (
                <FormItem className="max-w-[505px]">
                  <FormLabel
                    className="block font-semibold leading-6 mb-2 text-base"
                    htmlFor="private_key"
                  >
                    Private API Key
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="private_key"
                        type="private_key"
                        placeholder="sk_XXXXXXXXXXXXXXXXXXXX"
                        autoComplete="private_key"
                        className="focus-visible:ring-transparent border-[0.5px] border-[#d0d5dd] px-[14px] py-[10px]"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="webhookEndpoint"
              render={({ field }) => (
                <FormItem className="max-w-[505px]">
                  <FormLabel
                    className="block font-semibold leading-6 mb-2 text-base"
                    htmlFor="webhookEndpoint"
                  >
                    Private API Key
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="webhookEndpoint"
                        type="webhookEndpoint"
                        placeholder="whsec_XXXXXXXXXXXXXXXXXXXX"
                        autoComplete="webhookEndpoint"
                        className="focus-visible:ring-transparent border-[0.5px] border-[#d0d5dd] px-[14px] py-[10px]"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2 px-4 py-3 bg-[#f9fafb]">
            <Button type="submit" size="sm" className="w-max">
              <div className="text-white w-[12.5px] h-[14px] relative mr-2">
                <img src={save} alt="save" />
              </div>
              Sign in
            </Button>

            <Button
              type="reset"
              size="sm"
              className="w-max bg-white"
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
