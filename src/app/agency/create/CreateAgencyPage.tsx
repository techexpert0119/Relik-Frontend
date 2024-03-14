import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import ChipInput from '@/components/ChipInputs';
import UploadImage from '../../../components/UploadImage';
import { Button } from '@/components/ui/button';
import {
  createAgencyMutation,
  editAgencyMutation,
  getSingleAgency,
} from '@/services/api/agency-service';
import { toast } from '@/components/ui/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import { useEffect } from 'react';

const urlRegex =
  /^(?:(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9\-_]+(?:\.[a-zA-Z]{2,})+|(?:www\.)[a-zA-Z0-9\-_]+(?:\.[a-zA-Z]{2,})+)$/;
export const agencyAccountFormSchema = z
  .object({
    businessName: z.string().min(3).max(50),
    // subscriptionId: z.string().min(1, { message: 'Required' }),
    photo: z.string().optional(),
    businessUrl: z.string().refine((value) => urlRegex.test(value), {
      message: 'Invalid website URL',
    }),
    nameOfCelebrities: z
      .array(z.string())
      .max(5, { message: 'Max 5 allowed' })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.nameOfCelebrities?.length) {
        const isWrong = data.nameOfCelebrities?.some(
          (str) => !/^[a-zA-Z\s]+$/.test(str)
        );
        if (isWrong) {
          return false;
        }
      }

      return true;
    },
    {
      path: ['nameOfCelebrities'],
      message: 'Names should contain only alphabets',
    }
  );

export const agencyAccountEditFormSchema = z.object({
  businessName: z.string().min(3).max(50),
  photo: z.string().optional(),
  businessUrl: z.string().refine((value) => urlRegex.test(value), {
    message: 'Invalid website URL',
  }),
});

const CreateAgencyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addUserAgency } = useAuthStore();
  const getSingleAgencyQuery = getSingleAgency(id || '');
  const editAgency = editAgencyMutation(id || '');
  const createAgency = createAgencyMutation();
  const formtypeSchema = id
    ? agencyAccountEditFormSchema
    : agencyAccountFormSchema;
  const form = useForm<z.infer<typeof formtypeSchema>>({
    resolver: zodResolver(formtypeSchema),
    defaultValues: {
      businessName: '',
      // subscriptionId: '',
      photo: '',
      businessUrl: '',
      nameOfCelebrities: [],
    },
  });
  useEffect(() => {
    if (id) {
      getSingleAgencyQuery.refetch().then((data) => {
        form.reset({
          businessName: data?.data?.businessName,
          businessUrl: data?.data?.businessUrl,
          photo: data?.data?.photo,
        });
      });
    }
  }, [id]);
  const onSubmit = (values: z.infer<typeof agencyAccountFormSchema>) => {
    if (id) {
      editAgency.mutate(
        {
          photo: values?.photo,
          businessName: values?.businessName,
          businessUrl: values?.businessUrl,
        },
        {
          onSuccess: (data) => {
            if (data?.status === 200) {
              toast({
                variant: 'success',
                description: 'Agency updated successfully!',
                title: 'Success',
              });
              addUserAgency(data?.data?.allGenciesOfUser);
              navigate('/agencies');
            }
          },
          onError: () => {
            toast({
              variant: 'destructive',
              description: 'Error happened while creationg agency',
              title: 'Error',
            });
          },
        }
      );
    } else {
      createAgency.mutate(values, {
        onSuccess: (data) => {
          if (data?.status === 201) {
            toast({
              variant: 'success',
              description: 'Agency created successfully!',
              title: 'Success',
            });
            addUserAgency(data?.data?.allGenciesOfUser);
            navigate('/agencies');
          }
        },
        onError: () => {
          toast({
            variant: 'destructive',
            description: 'Error happened while creationg agency',
            title: 'Error',
          });
        },
      });
    }
  };

  return (
    <main className="flex flex-col  my-4 container">
      <section className="  mt-6 flex flex-col gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row gap-8 justify-between">
              <div className="flex flex-col gap-1">
                <h1 className="text-midnight font-medium text-lg">
                  Complete agency profile
                </h1>
              </div>

              <div className="flex  flex-col sm:flex-row gap-4 justify-end">
                <Button className="px-4" type="submit" size="sm">
                  Save
                </Button>
              </div>
            </div>
            <Separator />
            <fieldset className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem className="row">
                    <FormLabel className="label">Business name</FormLabel>
                    <div className="input-container">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your business name here"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessUrl"
                render={({ field }) => (
                  <FormItem className="row">
                    <FormLabel className="label">Business URL</FormLabel>
                    <div className="input-container">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your business URL here"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              {!id && (
                <FormField
                  control={form.control}
                  name="nameOfCelebrities"
                  render={() => (
                    <FormItem className="row">
                      <FormLabel className="label" id="nameOfCelebrities">
                        Names of celebrities under your managementt
                      </FormLabel>
                      <div className="input-container">
                        <FormControl>
                          <ChipInput
                            id="nameOfCelebrities"
                            onSelect={(data) =>
                              form.setValue('nameOfCelebrities', data, {
                                shouldDirty: true,
                              })
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              )}

              {/* <Separator/> */}

              {/* <FormField
              control={form.control}
              name="subscriptionId"
              render={() => (
                <FormItem className="row">
                  <FormLabel className="label" htmlFor="subscriptionId">
                    Subscription Package
                  </FormLabel>
                  <div className="input-container">
                    <FormControl>
                      <SubscriptionPicker
                        id="subscriptionId"
                        onSubSelect={(sub) => {
                          form.setValue('subscriptionId', sub._id);
                          form.clearErrors('subscriptionId');
                        }}
                      />
                    </FormControl>
                    <FormMessage/>
                  </div>
                </FormItem>
              )}
            /> */}

              <FormItem className="row">
                <FormLabel
                  className="label flex flex-col gap-2"
                  htmlFor="pickAvatar"
                >
                  <div>Your photo</div>
                  <div className="text-sm text-gray-500 font-normal">
                    This picture will be used as a default profile picture on
                    all of your screens. You can keep it empty.
                  </div>
                </FormLabel>
                <FormField
                  control={form.control}
                  name="photo"
                  render={() => (
                    <UploadImage
                      id="pickAvatar"
                      showPreview
                      image={form?.watch('photo')}
                      setImage={(image) =>
                        form.setValue('photo', image, {
                          shouldDirty: true,
                        })
                      }
                    />
                  )}
                />
                <FormMessage />
              </FormItem>
            </fieldset>
          </form>
        </Form>
      </section>
    </main>
  );
};

export default CreateAgencyPage;
