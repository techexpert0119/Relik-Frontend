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
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean().default(false).optional(),
});

export default function PlatxForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
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
              name="email"
              render={({ field }) => (
                <FormItem className="max-w-[505px]">
                  <FormLabel
                    className="block font-semibold leading-6 mb-2 text-base"
                    htmlFor="email"
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email *"
                        autoComplete="email"
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
              name="password"
              render={({ field }) => (
                <FormItem className="max-w-[505px]">
                  <FormLabel
                    className="block font-semibold leading-6 mb-2 text-base"
                    htmlFor="password"
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        placeholder="Password *"
                        className="focus-visible:ring-transparent border-[0.5px] border-[#d0d5dd] px-[14px] py-[10px]"
                        autoComplete="current-password"
                        type="password"
                        {...field}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        type="submit"
                        className="absolute top-0 bottom-0 my-auto text-gray-500 right-2"
                      ></Button>
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
